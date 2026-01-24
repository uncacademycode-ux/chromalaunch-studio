import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Eye, Download, Heart, Share2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TemplateHero = () => {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link to="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Back to Templates
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="text-muted-foreground">E-commerce</span>
        <span className="text-muted-foreground">/</span>
        <span className="text-foreground font-medium">ShopFlow Pro</span>
      </div>

      {/* Main Preview Image */}
      <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-lg group">
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=700&fit=crop"
          alt="ShopFlow Pro Template Preview"
          className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
            <Button variant="hero" size="lg" className="gap-2">
              <Eye className="w-5 h-5" />
              Live Preview
            </Button>
            <div className="flex gap-2">
              <Button variant="secondary" size="icon" className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
                <Heart className="w-5 h-5 text-white" />
              </Button>
              <Button variant="secondary" size="icon" className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
                <Share2 className="w-5 h-5 text-white" />
              </Button>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-primary text-primary-foreground">Best Seller</Badge>
          <Badge className="bg-accent text-accent-foreground">Featured</Badge>
        </div>
      </div>

      {/* Title and Stats */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            ShopFlow Pro - Modern E-commerce Template
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A premium, fully responsive e-commerce template with stunning animations, 
            dark mode support, and seamless checkout experience.
          </p>
        </div>
        
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-foreground">4.9</span>
            <span className="text-muted-foreground">(2,847 reviews)</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Download className="w-4 h-4" />
            <span>15,420 sales</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Eye className="w-4 h-4" />
            <span>89,234 views</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateHero;
