import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useHeroBanner } from "@/hooks/useSiteSettings";

const HeroSection = () => {
  const { data: hero } = useHeroBanner();

  const badge = hero?.badge_text || "🔥 #1 Template Marketplace — 50K+ Creators";
  const h1p = hero?.headline_line1_prefix || "Build ";
  const h1h = hero?.headline_line1_highlight || "Stunning";
  const h2p = hero?.headline_line2_prefix || "Websites ";
  const h2h = hero?.headline_line2_highlight || "Instantly";
  const sub = hero?.subheadline || "Premium, pixel-perfect templates that launch in minutes. Stop coding from scratch — start shipping faster.";
  const ctaPText = hero?.cta_primary_text || "Explore Templates";
  const ctaPLink = hero?.cta_primary_link || "/templates";
  const ctaSText = hero?.cta_secondary_text || "Watch Demo";
  const ctaSLink = hero?.cta_secondary_link || "/contact";
  const heroImage = hero?.hero_image_url || "";
  const stats = hero?.stats || [
    { value: "12K+", label: "Templates", icon: "📦" },
    { value: "50K+", label: "Happy Creators", icon: "🎉" },
    { value: "4.9★", label: "Average Rating", icon: "⭐" },
    { value: "24/7", label: "Expert Support", icon: "🛟" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 hero-gradient-bg" />
      
      {/* Hero background image */}
      {heroImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Hero banner background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
        </div>
      )}

      {/* Animated glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary">{badge}</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-[0.95] tracking-tight"
          >
            {h1p}
            <span className="gradient-text-primary">{h1h}</span>
            <br />
            {h2p}
            <span className="gradient-text-accent">{h2h}</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            {sub}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Link to={ctaPLink}>
              <Button variant="hero" size="xl" className="group text-lg px-10 py-7 shadow-glow-primary">
                {ctaPText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to={ctaSLink}>
              <Button variant="hero-outline" size="xl" className="group text-lg px-10 py-7">
                <Play className="w-5 h-5" />
                {ctaSText}
              </Button>
            </Link>
          </motion.div>

          {/* Hero Image */}
          {heroImage && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16"
            >
              <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                <img
                  src={heroImage}
                  alt="Hero banner"
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          )}

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="text-center p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="font-display text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom mesh gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </section>
  );
};

export default HeroSection;
