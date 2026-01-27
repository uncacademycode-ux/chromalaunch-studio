import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 hero-gradient-bg" />
      <div className="blob blob-primary w-[500px] h-[500px] -top-32 -left-32" />
      <div className="blob blob-accent w-[400px] h-[400px] top-1/4 -right-20" style={{ animationDelay: '2s' }} />
      <div className="blob blob-secondary w-[350px] h-[350px] bottom-20 left-1/4" style={{ animationDelay: '4s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20 mb-8 animate-fade-up opacity-0" style={{ animationDelay: '0.1s' }}>
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span className="text-sm font-medium text-foreground">Trusted by 50,000+ creators worldwide</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight animate-fade-up opacity-0" style={{ animationDelay: '0.2s' }}>
            Premium Website{" "}
            <span className="gradient-text-primary">Templates</span>{" "}
            for Modern{" "}
            <span className="gradient-text-accent">Creators</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up opacity-0" style={{ animationDelay: '0.3s' }}>
            Launch stunning websites in minutes. Browse thousands of professionally crafted templates for every purpose.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up opacity-0" style={{ animationDelay: '0.4s' }}>
            <Button variant="hero" size="xl" className="group">
              Browse Templates
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="hero-outline" size="xl" className="group">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-up opacity-0" style={{ animationDelay: '0.5s' }}>
            {[
              { value: "12K+", label: "Templates" },
              { value: "50K+", label: "Happy Customers" },
              { value: "4.9", label: "Average Rating" },
              { value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
