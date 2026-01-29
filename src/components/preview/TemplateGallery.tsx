import { useState } from "react";
import { cn } from "@/lib/utils";
import { Template } from "@/hooks/useTemplates";

interface TemplateGalleryProps {
  template: Template;
}

const TemplateGallery = ({ template }: TemplateGalleryProps) => {
  // Combine main image with gallery images
  const allImages = [
    { id: 0, src: template.image_url, label: "Main Preview" },
    ...(template.gallery_images || []).map((src, index) => ({
      id: index + 1,
      src,
      label: `Screenshot ${index + 1}`,
    })),
  ];

  const [activeImage, setActiveImage] = useState(allImages[0]);

  // If only main image, show simpler view
  if (allImages.length === 1) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-foreground">
          Template Preview
        </h2>
        <div className="rounded-xl overflow-hidden border border-border/50 shadow-md">
          <img
            src={template.image_url}
            alt={template.title}
            className="w-full h-[400px] object-cover"
          />
        </div>
      </div>
    );
  }

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
        {allImages.map((image) => (
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
