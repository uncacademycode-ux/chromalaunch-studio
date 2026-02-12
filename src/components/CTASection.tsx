import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-accent blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-primary-foreground blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-8">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-primary-foreground">Limited Time: 30% Off All Templates</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Ready to Build Something Amazing?
          </h2>
          
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Join thousands of creators who've launched successful websites with our premium templates. Start your project today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/templates">
              <Button 
                size="xl" 
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow-orange group"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                variant="ghost" 
                size="xl"
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
