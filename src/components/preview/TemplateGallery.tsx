import { useState } from "react";
import { cn } from "@/lib/utils";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    label: "Homepage",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    label: "Dashboard",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop",
    label: "Product Page",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=500&fit=crop",
    label: "Cart & Checkout",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop",
    label: "Mobile View",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=500&fit=crop",
    label: "Dark Mode",
  },
];

const TemplateGallery = () => {
  const [activeImage, setActiveImage] = useState(galleryImages[0]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold text-foreground">
        Template Screenshots
      </h2>

      {/* Main Image */}
      <div className="rounded-xl overflow-hidden border border-border/50 shadow-md">
        <img
          src={activeImage.src}
          alt={activeImage.label}
          className="w-full h-[400px] object-cover transition-all duration-300"
        />
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {galleryImages.map((image) => (
          <button
            key={image.id}
            onClick={() => setActiveImage(image)}
            className={cn(
              "relative rounded-lg overflow-hidden border-2 transition-all duration-200",
              activeImage.id === image.id
                ? "border-primary shadow-glow-green"
                : "border-transparent hover:border-primary/50"
            )}
          >
            <img
              src={image.src}
              alt={image.label}
              className="w-full h-16 md:h-20 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <span className="text-xs text-white font-medium">{image.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateGallery;
