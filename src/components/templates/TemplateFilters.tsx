import { useCategories } from "@/hooks/useTemplates";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter, X } from "lucide-react";

interface TemplateFiltersProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const TemplateFilters = ({ selectedCategory, onCategoryChange }: TemplateFiltersProps) => {
  const { data: categories, isLoading } = useCategories();

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="glass-card p-6 rounded-xl border border-border/50 sticky top-24">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </h3>
          {selectedCategory && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCategoryChange(null)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="w-3 h-3 mr-1" />
              Clear
            </Button>
          )}
        </div>

        {/* Category Filter */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Category</h4>
          
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              <button
                onClick={() => onCategoryChange(null)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  !selectedCategory
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                All Categories
              </button>
              {categories?.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors capitalize ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Placeholder for future filters */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Coming Soon</h4>
          <ul className="text-xs text-muted-foreground/60 space-y-1">
            <li>• Price Range</li>
            <li>• Rating Filter</li>
            <li>• Tech Stack</li>
            <li>• Sort Options</li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default TemplateFilters;
