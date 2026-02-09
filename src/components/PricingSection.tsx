import { Button } from "@/components/ui/button";
import { Check, Crown } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { ALL_ACCESS_PRICE } from "@/hooks/useAllAccessPass";

const PricingSection = () => {
  const { setAllAccess } = useCart();
  const navigate = useNavigate();

  const handleBuyAllAccess = () => {
    setAllAccess(true);
    navigate("/checkout");
  };

  return (
    <section id="pricing" className="py-24 bg-muted/30 relative">
      <div className="absolute top-20 left-1/4 w-72 h-72 blob blob-teal opacity-20" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 blob blob-orange opacity-15" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Pricing</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Buy templates individually or get access to everything with a one-time payment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Individual */}
          <div className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
            <div className="text-center mb-8">
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">Individual Templates</h3>
              <p className="text-muted-foreground text-sm mb-4">Buy only what you need</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-display text-5xl font-bold text-foreground">Varies</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">per template</p>
            </div>

            <ul className="space-y-4 mb-8">
              {["Per-template pricing", "Regular & Extended licenses", "6 Months Support", "Lifetime Updates", "Source files included"].map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground">{f}</span>
                </li>
              ))}
            </ul>

            <Button variant="outline" size="lg" className="w-full" onClick={() => navigate("/templates")}>
              Browse Templates
            </Button>
          </div>

          {/* All Access */}
          <div className="relative p-8 rounded-2xl bg-card border border-primary shadow-glow-green scale-105 transition-all duration-300">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-semibold flex items-center gap-1">
              <Crown className="w-3.5 h-3.5" />
              Best Value
            </div>

            <div className="text-center mb-8">
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">All Access Pass</h3>
              <p className="text-muted-foreground text-sm mb-4">One payment, every template</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-display text-5xl font-bold text-foreground">${ALL_ACCESS_PRICE}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">one-time payment</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Access to ALL templates",
                "All future templates included",
                "Regular license for all",
                "Priority Support",
                "Lifetime Updates",
                "Source files included",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground">{f}</span>
                </li>
              ))}
            </ul>

            <Button variant="hero" size="lg" className="w-full" onClick={handleBuyAllAccess}>
              Get All Access — ${ALL_ACCESS_PRICE}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
