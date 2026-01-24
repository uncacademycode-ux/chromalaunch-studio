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
  Clock
} from "lucide-react";

const TemplateSidebar = () => {
  return (
    <div className="sticky top-24 space-y-6">
      {/* Price Card */}
      <div className="glass-card p-6 rounded-2xl border border-border/50 shadow-lg">
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-4xl font-bold text-foreground">$59</span>
          <span className="text-lg text-muted-foreground line-through">$89</span>
          <Badge className="bg-accent text-accent-foreground ml-2">34% OFF</Badge>
        </div>

        <div className="space-y-3 mb-6">
          <Button variant="hero" size="lg" className="w-full gap-2">
            <ShoppingCart className="w-5 h-5" />
            Purchase Now
          </Button>
          <Button variant="hero-outline" size="lg" className="w-full gap-2">
            <Eye className="w-5 h-5" />
            Live Preview
          </Button>
          <Button variant="ghost" size="lg" className="w-full gap-2">
            <Heart className="w-5 h-5" />
            Add to Wishlist
          </Button>
        </div>

        {/* License Info */}
        <div className="border-t border-border/50 pt-4 space-y-3">
          <h4 className="font-semibold text-foreground text-sm">License Options</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 rounded-lg border border-border/50 cursor-pointer hover:border-primary/50 transition-colors">
              <input type="radio" name="license" defaultChecked className="text-primary" />
              <div className="flex-1">
                <div className="font-medium text-foreground text-sm">Regular License</div>
                <div className="text-xs text-muted-foreground">For a single end product</div>
              </div>
              <span className="font-semibold text-foreground">$59</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-lg border border-border/50 cursor-pointer hover:border-primary/50 transition-colors">
              <input type="radio" name="license" className="text-primary" />
              <div className="flex-1">
                <div className="font-medium text-foreground text-sm">Extended License</div>
                <div className="text-xs text-muted-foreground">For multiple end products</div>
              </div>
              <span className="font-semibold text-foreground">$299</span>
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
            <span className="text-foreground">Jan 15, 2024</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <RefreshCw className="w-4 h-4" />
              <span>Last Update</span>
            </div>
            <span className="text-foreground">Jan 20, 2025</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Download className="w-4 h-4" />
              <span>Downloads</span>
            </div>
            <span className="text-foreground">15,420</span>
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
