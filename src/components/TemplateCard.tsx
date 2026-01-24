import { Button } from "@/components/ui/button";
import { Heart, Eye, Star } from "lucide-react";

interface TemplateCardProps {
  image: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  sales: number;
}

const TemplateCard = ({ image, title, category, price, rating, sales }: TemplateCardProps) => {
  return (
    <div className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Button size="sm" variant="hero" className="shadow-none">
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>
          <Button size="icon" variant="secondary" className="rounded-full">
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        {/* Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {title}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span className="text-sm font-medium text-foreground">{rating}</span>
            <span className="text-sm text-muted-foreground">({sales} sales)</span>
          </div>
          <div className="font-display font-bold text-xl text-primary">${price}</div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
