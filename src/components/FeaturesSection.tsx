import { 
  Zap, 
  Shield, 
  Palette, 
  Code2, 
  HeadphonesIcon, 
  RefreshCw 
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for performance with lazy loading, code splitting, and CDN delivery.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Built with security best practices and regular updates to keep you protected.",
  },
  {
    icon: Palette,
    title: "Fully Customizable",
    description: "Easy-to-use customization options with detailed documentation included.",
  },
  {
    icon: Code2,
    title: "Clean Code",
    description: "Well-structured, commented code following industry best practices.",
  },
  {
    icon: HeadphonesIcon,
    title: "Premium Support",
    description: "Get help from our expert team with 24/7 priority support.",
  },
  {
    icon: RefreshCw,
    title: "Regular Updates",
    description: "Continuous improvements and new features added regularly.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 hero-gradient-bg opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why Choose Us</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Built for Success
          </h2>
          <p className="text-lg text-muted-foreground">
            Every template comes packed with features designed to help you succeed online
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
