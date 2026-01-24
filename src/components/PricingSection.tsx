import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: 29,
    description: "Perfect for individuals starting out",
    features: [
      "1 Template License",
      "6 Months Updates",
      "Basic Support",
      "Documentation Access",
      "Personal Use Only",
    ],
    popular: false,
    cta: "Get Started",
  },
  {
    name: "Professional",
    price: 79,
    description: "Best for freelancers & agencies",
    features: [
      "5 Template Licenses",
      "1 Year Updates",
      "Priority Support",
      "Full Documentation",
      "Commercial Use",
      "Figma Files Included",
    ],
    popular: true,
    cta: "Go Pro",
  },
  {
    name: "Enterprise",
    price: 199,
    description: "For large teams & organizations",
    features: [
      "Unlimited Licenses",
      "Lifetime Updates",
      "24/7 Premium Support",
      "Full Documentation",
      "Commercial Use",
      "Figma + Source Files",
      "White Label Rights",
    ],
    popular: false,
    cta: "Contact Sales",
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-muted/30 relative">
      {/* Background decoration */}
      <div className="absolute top-20 left-1/4 w-72 h-72 blob blob-teal opacity-20" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 blob blob-orange opacity-15" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Pricing</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the perfect plan for your needs. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative p-8 rounded-2xl bg-card border transition-all duration-300 ${
                plan.popular 
                  ? 'border-primary shadow-glow-green scale-105' 
                  : 'border-border hover:border-primary/30 hover:shadow-lg'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-display text-5xl font-bold text-foreground">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.popular ? "hero" : "outline"} 
                size="lg" 
                className="w-full"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
