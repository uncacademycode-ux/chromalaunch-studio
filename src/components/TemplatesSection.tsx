import { Button } from "@/components/ui/button";
import TemplateCard from "./TemplateCard";
import { ArrowRight } from "lucide-react";

const templates = [
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    title: "Starter - SaaS Dashboard Template",
    category: "SaaS",
    price: 49,
    rating: 4.9,
    sales: 2340,
  },
  {
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    title: "Storefront - E-Commerce Pro Kit",
    category: "E-Commerce",
    price: 79,
    rating: 4.8,
    sales: 1856,
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    title: "Portfolio Pro - Creative Showcase",
    category: "Portfolio",
    price: 39,
    rating: 4.9,
    sales: 3210,
  },
  {
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
    title: "Corporate - Business Landing Page",
    category: "Business",
    price: 59,
    rating: 4.7,
    sales: 1542,
  },
  {
    image: "https://images.unsplash.com/photo-1522542550221-31fd8575f4ca?w=800&q=80",
    title: "Minimal - Blog & Magazine Theme",
    category: "Blog",
    price: 45,
    rating: 4.8,
    sales: 2890,
  },
  {
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    title: "Agency Plus - Creative Studio Kit",
    category: "Agency",
    price: 69,
    rating: 4.9,
    sales: 1987,
  },
];

const TemplatesSection = () => {
  return (
    <section id="templates" className="py-24 bg-muted/30 relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 blob blob-green opacity-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 blob blob-orange opacity-15" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Featured</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              Trending Templates
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Discover our best-selling templates, handpicked by our design experts
            </p>
          </div>
          <Button variant="outline" size="lg" className="mt-6 md:mt-0 group">
            View All Templates
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <TemplateCard key={index} {...template} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplatesSection;
