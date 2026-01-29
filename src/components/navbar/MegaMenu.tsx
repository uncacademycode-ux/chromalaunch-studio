import { Link } from "react-router-dom";
import { useCategories } from "@/hooks/useTemplates";
import { ChevronDown, Grid3X3, Loader2 } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const MegaMenu = () => {
  const { data: categories, isLoading } = useCategories();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-muted/50 data-[state=open]:bg-muted/50">
            <span className="text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-1">
              Templates
              <ChevronDown className="w-4 h-4" />
            </span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-4 bg-background border border-border rounded-lg shadow-lg">
              <div className="mb-3 pb-3 border-b border-border">
                <Link
                  to="/templates"
                  className="flex items-center gap-2 text-foreground font-semibold hover:text-primary transition-colors"
                >
                  <Grid3X3 className="w-5 h-5" />
                  Browse All Templates
                </Link>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Categories
                </p>
                
                {isLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                  </div>
                ) : categories && categories.length > 0 ? (
                  <div className="grid grid-cols-2 gap-1">
                    {categories.map((category) => (
                      <Link
                        key={category}
                        to={`/templates?category=${encodeURIComponent(category)}`}
                        className="px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors capitalize"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground py-2">
                    No categories available
                  </p>
                )}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MegaMenu;
