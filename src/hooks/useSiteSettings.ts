import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface HeroBannerSettings {
  badge_text: string;
  headline_line1_prefix: string;
  headline_line1_highlight: string;
  headline_line2_prefix: string;
  headline_line2_highlight: string;
  subheadline: string;
  cta_primary_text: string;
  cta_primary_link: string;
  cta_secondary_text: string;
  cta_secondary_link: string;
  hero_image_url: string;
  stats: { value: string; label: string; icon: string }[];
}

const DEFAULT_HERO: HeroBannerSettings = {
  badge_text: "🔥 #1 Template Marketplace — 50K+ Creators",
  headline_line1_prefix: "Build ",
  headline_line1_highlight: "Stunning",
  headline_line2_prefix: "Websites ",
  headline_line2_highlight: "Instantly",
  subheadline: "Premium, pixel-perfect templates that launch in minutes. Stop coding from scratch — start shipping faster.",
  cta_primary_text: "Explore Templates",
  cta_primary_link: "/templates",
  cta_secondary_text: "Watch Demo",
  cta_secondary_link: "/contact",
  hero_image_url: "",
  stats: [
    { value: "12K+", label: "Templates", icon: "📦" },
    { value: "50K+", label: "Happy Creators", icon: "🎉" },
    { value: "4.9★", label: "Average Rating", icon: "⭐" },
    { value: "24/7", label: "Expert Support", icon: "🛟" },
  ],
};

export const useHeroBanner = () => {
  return useQuery({
    queryKey: ["site_settings", "hero_banner"],
    queryFn: async (): Promise<HeroBannerSettings> => {
      const { data, error } = await supabase
        .from("site_settings" as any)
        .select("value")
        .eq("key", "hero_banner")
        .single();

      if (error || !data) return DEFAULT_HERO;
      return (data as any).value as HeroBannerSettings;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateHeroBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: HeroBannerSettings) => {
      const { error } = await supabase
        .from("site_settings" as any)
        .update({ value: settings as any, updated_at: new Date().toISOString() } as any)
        .eq("key", "hero_banner");

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site_settings", "hero_banner"] });
    },
  });
};

// ──────────────────────────────────────
// Pricing Section Settings
// ──────────────────────────────────────

export interface PricingSectionSettings {
  badge: string;
  headline: string;
  subheadline: string;
  individual_title: string;
  individual_subtitle: string;
  individual_price_label: string;
  individual_price_note: string;
  individual_features: string[];
  individual_cta_text: string;
  individual_cta_link: string;
  allaccess_title: string;
  allaccess_subtitle: string;
  allaccess_price_note: string;
  allaccess_badge: string;
  allaccess_features: string[];
  allaccess_cta_text: string;
}

const DEFAULT_PRICING: PricingSectionSettings = {
  badge: "Pricing",
  headline: "Simple, Transparent Pricing",
  subheadline: "Buy templates individually or get access to everything with a one-time payment.",
  individual_title: "Individual Templates",
  individual_subtitle: "Buy only what you need",
  individual_price_label: "Varies",
  individual_price_note: "per template",
  individual_features: ["Per-template pricing", "Regular & Extended licenses", "6 Months Support", "Lifetime Updates", "Source files included"],
  individual_cta_text: "Browse Templates",
  individual_cta_link: "/templates",
  allaccess_title: "All Access Pass",
  allaccess_subtitle: "One payment, every template",
  allaccess_price_note: "one-time payment",
  allaccess_badge: "Best Value",
  allaccess_features: ["Access to ALL templates", "All future templates included", "Regular license for all", "Priority Support", "Lifetime Updates", "Source files included"],
  allaccess_cta_text: "Get All Access",
};

export const usePricingSection = () => {
  return useQuery({
    queryKey: ["site_settings", "pricing_section"],
    queryFn: async (): Promise<PricingSectionSettings> => {
      const { data, error } = await supabase
        .from("site_settings" as any)
        .select("value")
        .eq("key", "pricing_section")
        .single();

      if (error || !data) return DEFAULT_PRICING;
      return (data as any).value as PricingSectionSettings;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdatePricingSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: PricingSectionSettings) => {
      const { error } = await supabase
        .from("site_settings" as any)
        .update({ value: settings as any, updated_at: new Date().toISOString() } as any)
        .eq("key", "pricing_section");

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site_settings", "pricing_section"] });
    },
  });
};
