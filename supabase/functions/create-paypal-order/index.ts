import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ALL_ACCESS_PRICE = 300;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub;
    const userEmail = claimsData.claims.email;

    const { items, isAllAccess, couponCode, isProHosting, templateTitle } = await req.json();

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    let serverTotal: number;
    let paypalItems: any[];

    if (isProHosting) {
      // Fetch pro hosting price from site_settings
      const { data: settingsData } = await supabaseAdmin
        .from("site_settings")
        .select("value")
        .eq("key", "hosting_platforms")
        .single();

      const proPrice = settingsData?.value?.pro_service?.price || 20;
      serverTotal = proPrice;
      paypalItems = [
        {
          name: "Pro Hosting Service" + (templateTitle ? ` - ${templateTitle}` : ""),
          quantity: "1",
          unit_amount: { currency_code: "USD", value: proPrice.toFixed(2) },
          category: "DIGITAL_GOODS",
        },
      ];
    } else if (isAllAccess) {
      serverTotal = ALL_ACCESS_PRICE;
      paypalItems = [
        {
          name: "All Access Pass",
          quantity: "1",
          unit_amount: { currency_code: "USD", value: "" },
          category: "DIGITAL_GOODS",
        },
      ];
    } else {
      if (!items || !Array.isArray(items) || items.length === 0) {
        return new Response(
          JSON.stringify({ error: "Cart is empty" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const itemIds = items.map((item: any) => item.id);
      const { data: templates, error: tplError } = await supabaseAdmin
        .from("templates")
        .select("id, title, price, extended_price")
        .in("id", itemIds);

      if (tplError || !templates) {
        return new Response(
          JSON.stringify({ error: "Failed to verify template prices" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const priceMap = new Map(templates.map((t: any) => [t.id, t]));
      serverTotal = 0;
      paypalItems = [];

      for (const item of items) {
        const tpl = priceMap.get(item.id);
        if (!tpl) {
          return new Response(
            JSON.stringify({ error: `Template not found: ${item.id}` }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        const price = item.license === "extended" && tpl.extended_price
          ? tpl.extended_price
          : tpl.price;
        serverTotal += price;
        paypalItems.push({
          name: tpl.title,
          quantity: "1",
          unit_amount: { currency_code: "USD", value: "" },
          category: "DIGITAL_GOODS",
        });
      }
    }

    // Apply coupon server-side (not for pro hosting)
    if (couponCode && !isProHosting) {
      const { data: coupon, error: couponError } = await supabaseAdmin
        .from("coupons")
        .select("*")
        .eq("code", couponCode)
        .eq("is_active", true)
        .single();

      if (!couponError && coupon) {
        const now = new Date();
        const notExpired = !coupon.expires_at || new Date(coupon.expires_at) > now;
        const underMaxUses = !coupon.max_uses || coupon.used_count < coupon.max_uses;
        const meetsMinimum = !coupon.min_order_amount || serverTotal >= coupon.min_order_amount;

        if (notExpired && underMaxUses && meetsMinimum) {
          const discount =
            coupon.discount_type === "percentage"
              ? (serverTotal * coupon.discount_value) / 100
              : coupon.discount_value;
          serverTotal = Math.max(0, serverTotal - discount);
        }
      }
    }

    // Set computed values on PayPal items (for non-pro-hosting)
    if (!isProHosting) {
      const perItemValue = (serverTotal / paypalItems.length).toFixed(2);
      let runningTotal = 0;
      for (let i = 0; i < paypalItems.length; i++) {
        if (i === paypalItems.length - 1) {
          paypalItems[i].unit_amount.value = (serverTotal - runningTotal).toFixed(2);
        } else {
          paypalItems[i].unit_amount.value = perItemValue;
          runningTotal += parseFloat(perItemValue);
        }
      }
    }

    const PAYPAL_CLIENT_ID = Deno.env.get("PAYPAL_CLIENT_ID")!;
    const PAYPAL_SECRET = Deno.env.get("PAYPAL_SECRET")!;
    const PAYPAL_API = "https://api-m.sandbox.paypal.com";

    const authResponse = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`)}`,
      },
      body: "grant_type=client_credentials",
    });

    const authData = await authResponse.json();
    if (!authResponse.ok) {
      console.error("PayPal auth error:", authData);
      return new Response(
        JSON.stringify({ error: "Failed to authenticate with PayPal" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const accessToken = authData.access_token;

    const orderResponse = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: serverTotal.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: serverTotal.toFixed(2),
                },
              },
            },
            items: paypalItems,
          },
        ],
        application_context: {
          brand_name: "Template Marketplace",
          shipping_preference: "NO_SHIPPING",
        },
      }),
    });

    const orderData = await orderResponse.json();
    if (!orderResponse.ok) {
      console.error("PayPal order creation error:", orderData);
      return new Response(
        JSON.stringify({ error: "Failed to create PayPal order" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("PayPal order created:", orderData.id, "Server total:", serverTotal);

    return new Response(
      JSON.stringify({ orderId: orderData.id, userId, userEmail }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
