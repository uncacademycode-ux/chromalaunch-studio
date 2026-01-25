import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, Heart, User, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  const { favorites } = useFavorites();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">T</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">TemplatePro</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {isHomePage ? (
              <>
                <a href="#templates" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                  Templates
                </a>
                <a href="#categories" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                  Categories
                </a>
                <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                  Pricing
                </a>
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                  Features
                </a>
              </>
            ) : (
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                Templates
              </Link>
            )}
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              About Us
            </Link>
            <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              FAQ
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user && (
              <Link to="/favorites" className="relative p-2 hover:bg-muted rounded-lg transition-colors">
                <Heart className="w-5 h-5 text-foreground" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>
            )}
            <Link to="/cart" className="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <ShoppingCart className="w-5 h-5 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium truncate">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link to="/auth">
                  <Button variant="accent" size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {user && (
              <Link to="/favorites" className="relative p-2">
                <Heart className="w-5 h-5 text-foreground" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>
            )}
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="w-5 h-5 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button 
              className="p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-up">
            <div className="flex flex-col gap-4">
              {isHomePage ? (
                <>
                  <a href="#templates" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                    Templates
                  </a>
                  <a href="#categories" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                    Categories
                  </a>
                  <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                    Pricing
                  </a>
                  <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                    Features
                  </a>
                </>
              ) : (
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                  Templates
                </Link>
              )}
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                About Us
              </Link>
              <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                FAQ
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                Contact
              </Link>
              <div className="flex gap-3 pt-4">
                {user ? (
                  <Button variant="ghost" size="sm" className="flex-1" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Link to="/auth" className="flex-1">
                      <Button variant="ghost" size="sm" className="w-full">Sign In</Button>
                    </Link>
                    <Link to="/auth" className="flex-1">
                      <Button variant="accent" size="sm" className="w-full">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
