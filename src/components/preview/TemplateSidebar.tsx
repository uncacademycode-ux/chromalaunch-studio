import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Heart, 
  Eye, 
  Download, 
  Calendar, 
  RefreshCw, 
  FileText,
  MessageCircle,
  Shield,
  Clock,
  Check,
  Crown
} from "lucide-react";
import { useAllAccessPass } from "@/hooks/useAllAccessPass";
import { useParams } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useTemplate } from "@/hooks/useTemplates";

const TemplateSidebar = () => {
  const { id } = useParams();
  const templateId = id || "";
  const { data: template } = useTemplate(templateId);
  const { addToCart, isInCart } = useCart();
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();
  const [selectedLicense, setSelectedLicense] = useState<"regular" | "extended">("regular");
  const { data: allAccessPass } = useAllAccessPass();
  const hasAllAccess = !!allAccessPass;
  const inCart = isInCart(templateId);
  const isFav = isFavorite(templateId);

  const prices = {
    regular: template ? Number(template.price) : 59,
    extended: template?.extended_price ? Number(template.extended_price) : 299,
  };

  const handleAddToCart = () => {
    addToCart({
      id: templateId,
      title: template?.title || "Template",
      image: template?.image_url || "",
      price: prices[selectedLicense],
      license: selectedLicense,
    });
    
    toast({
      title: inCart ? "Cart updated" : "Added to cart",
      description: inCart 
        ? "License has been updated in your cart." 
        : `${template?.title || "Template"} has been added to your cart.`,
    });
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save favorites.",
        variant: "destructive",
      });
      return;
    }
    
    await toggleFavorite(templateId);
    toast({
      title: isFav ? "Removed from favorites" : "Added to favorites",
      description: isFav 
        ? "Template has been removed from your favorites."
        : "Template has been added to your favorites.",
    });
  };

  return (
    <div className="sticky top-24 space-y-6">
      {/* Price Card */}
      <div className="glass-card p-6 rounded-2xl border border-border/50 shadow-lg">
        {hasAllAccess ? (
          <div className="flex items-center gap-2 mb-4">
            <Crown className="w-5 h-5 text-accent" />
            <Badge className="bg-accent text-accent-foreground">All Access Pass</Badge>
          </div>
        ) : (
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-foreground">${prices[selectedLicense]}</span>
            {selectedLicense === "regular" && (
              <>
                <span className="text-lg text-muted-foreground line-through">${Math.round(prices.regular * 1.5)}</span>
                <Badge className="bg-accent text-accent-foreground ml-2">34% OFF</Badge>
              </>
            )}
          </div>
        )}

        <div className="space-y-3 mb-6">
          <Button 
            variant={inCart ? "accent" : "hero"} 
            size="lg" 
            className="w-full gap-2"
            onClick={handleAddToCart}
          >
            {inCart ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
            {inCart ? "Update Cart" : "Add to Cart"}
          </Button>
          <Button variant="hero-outline" size="lg" className="w-full gap-2">
            <Eye className="w-5 h-5" />
            Live Preview
          </Button>
          <Button 
            variant={isFav ? "accent" : "ghost"} 
            size="lg" 
            className="w-full gap-2"
            onClick={handleToggleFavorite}
          >
            <Heart className={`w-5 h-5 ${isFav ? "fill-current" : ""}`} />
            {isFav ? "Remove from Wishlist" : "Add to Wishlist"}
          </Button>
        </div>

        {/* License Info */}
        <div className="border-t border-border/50 pt-4 space-y-3">
          <h4 className="font-semibold text-foreground text-sm">License Options</h4>
          <div className="space-y-2">
            <label 
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedLicense === "regular" 
                  ? "border-primary bg-primary/5" 
                  : "border-border/50 hover:border-primary/50"
              }`}
              onClick={() => setSelectedLicense("regular")}
            >
              <input 
                type="radio" 
                name="license" 
                checked={selectedLicense === "regular"} 
                onChange={() => setSelectedLicense("regular")}
                className="text-primary" 
              />
              <div className="flex-1">
                <div className="font-medium text-foreground text-sm">Regular License</div>
                <div className="text-xs text-muted-foreground">For a single end product</div>
              </div>
              <span className="font-semibold text-foreground">${prices.regular}</span>
            </label>
            <label 
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedLicense === "extended" 
                  ? "border-primary bg-primary/5" 
                  : "border-border/50 hover:border-primary/50"
              }`}
              onClick={() => setSelectedLicense("extended")}
            >
              <input 
                type="radio" 
                name="license" 
                checked={selectedLicense === "extended"}
                onChange={() => setSelectedLicense("extended")}
                className="text-primary" 
              />
              <div className="flex-1">
                <div className="font-medium text-foreground text-sm">Extended License</div>
                <div className="text-xs text-muted-foreground">For multiple end products</div>
              </div>
              <span className="font-semibold text-foreground">${prices.extended}</span>
            </label>
          </div>
        </div>
      </div>

      {/* Item Details */}
      <div className="glass-card p-6 rounded-2xl border border-border/50">
        <h4 className="font-semibold text-foreground mb-4">Item Details</h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Released</span>
            </div>
            <span className="text-foreground">
              {template?.created_at ? new Date(template.created_at).toLocaleDateString() : "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <RefreshCw className="w-4 h-4" />
              <span>Last Update</span>
            </div>
            <span className="text-foreground">
              {template?.updated_at ? new Date(template.updated_at).toLocaleDateString() : "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Download className="w-4 h-4" />
              <span>Downloads</span>
            </div>
            <span className="text-foreground">{template?.sales?.toLocaleString() || 0}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>Documentation</span>
            </div>
            <span className="text-primary font-medium">Well Documented</span>
          </div>
        </div>
      </div>

      {/* Support & Guarantees */}
      <div className="glass-card p-6 rounded-2xl border border-border/50">
        <h4 className="font-semibold text-foreground mb-4">What's Included</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="font-medium text-foreground text-sm">6 Months Support</div>
              <div className="text-xs text-muted-foreground">Free technical support</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <RefreshCw className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="font-medium text-foreground text-sm">Lifetime Updates</div>
              <div className="text-xs text-muted-foreground">Free future updates</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="font-medium text-foreground text-sm">Money Back Guarantee</div>
              <div className="text-xs text-muted-foreground">30-day refund policy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Author Card */}
      <div className="glass-card p-6 rounded-2xl border border-border/50">
        <div className="flex items-center gap-3 mb-4">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
            alt="Author"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-foreground">PixelCraft Studio</div>
            <div className="text-sm text-muted-foreground">Power Elite Author</div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 gap-1">
            <MessageCircle className="w-4 h-4" />
            Contact
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            View Portfolio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSidebar;
