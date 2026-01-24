import TemplateCard from "@/components/TemplateCard";

const relatedTemplates = [
  {
    id: 1,
    title: "StoreFront Elite",
    category: "E-commerce",
    price: 49,
    rating: 4.8,
    sales: 8420,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    featured: false,
  },
  {
    id: 2,
    title: "MarketPlace Hub",
    category: "E-commerce",
    price: 69,
    rating: 4.9,
    sales: 12340,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
    featured: true,
  },
  {
    id: 3,
    title: "CartFlow Modern",
    category: "E-commerce",
    price: 39,
    rating: 4.7,
    sales: 5670,
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop",
    featured: false,
  },
  {
    id: 4,
    title: "ShopifyPro Theme",
    category: "E-commerce",
    price: 79,
    rating: 4.9,
    sales: 18900,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    featured: true,
  },
];

const RelatedTemplates = () => {
  return (
    <div className="mt-16 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            You May Also Like
          </h2>
          <p className="text-muted-foreground mt-1">
            Similar templates from our collection
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedTemplates.map((template) => (
          <TemplateCard key={template.id} {...template} />
        ))}
      </div>
    </div>
  );
};

export default RelatedTemplates;
