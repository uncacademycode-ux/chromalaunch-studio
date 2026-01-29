import { Link, useNavigate } from "react-router-dom";
import { useCategories } from "@/hooks/useTemplates";
import { ChevronDown, Grid3X3, Loader2 } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const MegaMenu = () => {
  const { data: categories, isLoading } = useCategories();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-muted/50 data-[state=open]:bg-muted/50 h-auto py-2">
            <span className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Templates
            </span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-4">
              <div className="mb-3 pb-3 border-b border-border">
                <NavigationMenuLink asChild>
                  <button
                    onClick={() => handleNavigate("/templates")}
                    className="flex items-center gap-2 text-foreground font-semibold hover:text-primary transition-colors w-full text-left"
                  >
                    <Grid3X3 className="w-5 h-5" />
                    Browse All Templates
                  </button>
                </NavigationMenuLink>
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
                      <NavigationMenuLink key={category} asChild>
                        <button
                          onClick={() => handleNavigate(`/templates?category=${encodeURIComponent(category)}`)}
                          className="px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors capitalize text-left w-full"
                        >
                          {category}
                        </button>
                      </NavigationMenuLink>
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
