import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TemplateFilters from "@/components/templates/TemplateFilters";
import TemplateCard from "@/components/TemplateCard";
import { useTemplates } from "@/hooks/useTemplates";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, LayoutGrid } from "lucide-react";
import { Input } from "@/components/ui/input";

const Templates = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFromUrl);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: templates, isLoading } = useTemplates({
    category: selectedCategory || undefined,
  });

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  const filteredTemplates = templates?.filter((template) =>
    template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2 flex items-center gap-3">
              <LayoutGrid className="w-8 h-8 text-primary" />
              Template Marketplace
            </h1>
            <p className="text-muted-foreground">
              Discover premium templates for your next project
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <TemplateFilters
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />

            {/* Main Content */}
            <div className="flex-1">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-4 text-sm text-muted-foreground">
                {isLoading ? (
                  <Skeleton className="h-5 w-32" />
                ) : (
                  <span>
                    {filteredTemplates?.length || 0} template{filteredTemplates?.length !== 1 ? "s" : ""} found
                    {selectedCategory && (
                      <span className="ml-1">
                        in <span className="capitalize font-medium text-foreground">{selectedCategory}</span>
                      </span>
                    )}
                  </span>
                )}
              </div>

              {/* Templates Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-3">
                      <Skeleton className="aspect-video w-full rounded-xl" />
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : filteredTemplates && filteredTemplates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredTemplates.map((template) => (
                    <TemplateCard
                      key={template.id}
                      id={template.id}
                      title={template.title}
                      image={template.image_url}
                      price={template.price}
                      category={template.category}
                      rating={template.rating}
                      sales={template.sales}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <LayoutGrid className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No templates found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default Templates;
