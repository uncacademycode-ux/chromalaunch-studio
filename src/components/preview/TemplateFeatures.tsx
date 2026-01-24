import { Check, Sparkles } from "lucide-react";

const features = [
  "Fully Responsive Design - Works on all devices",
  "Dark & Light Mode Support",
  "50+ Pre-built Pages & Components",
  "Seamless Animations & Transitions",
  "SEO Optimized Structure",
  "Cross-browser Compatible",
  "Clean & Well-documented Code",
  "Free Lifetime Updates",
  "RTL Language Support",
  "Payment Gateway Integration Ready",
  "Product Filtering & Search",
  "Wishlist & Cart Functionality",
];

const highlights = [
  {
    title: "Lightning Fast",
    description: "Optimized for speed with lazy loading and code splitting",
    icon: "⚡",
  },
  {
    title: "Pixel Perfect",
    description: "Meticulously crafted design with attention to every detail",
    icon: "✨",
  },
  {
    title: "Easy Customization",
    description: "Tailwind CSS powered with CSS variables for quick theming",
    icon: "🎨",
  },
  {
    title: "Production Ready",
    description: "Battle-tested code ready for deployment",
    icon: "🚀",
  },
];

const TemplateFeatures = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Features & Highlights
        </h2>
        <p className="text-muted-foreground">
          Everything you need to build a stunning e-commerce experience
        </p>
      </div>

      {/* Highlight Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {highlights.map((highlight, index) => (
          <div
            key={index}
            className="glass-card p-4 rounded-xl border border-border/50 hover:shadow-lg transition-shadow animate-fade-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-3xl mb-2">{highlight.icon}</div>
            <h3 className="font-semibold text-foreground mb-1">{highlight.title}</h3>
            <p className="text-sm text-muted-foreground">{highlight.description}</p>
          </div>
        ))}
      </div>

      {/* Features List */}
      <div className="glass-card p-6 rounded-xl border border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">All Features Included</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateFeatures;
