import { 
  ShoppingCart, 
  Briefcase, 
  Layout, 
  FileText, 
  Palette, 
  Smartphone 
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    count: "2,450+",
    description: "Full-featured online stores",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Briefcase,
    title: "Business",
    count: "1,820+",
    description: "Corporate & professional sites",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Layout,
    title: "Landing Pages",
    count: "3,200+",
    description: "High-converting pages",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: FileText,
    title: "Portfolios",
    count: "1,560+",
    description: "Showcase your work",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Palette,
    title: "Creative",
    count: "2,100+",
    description: "Unique artistic designs",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    count: "980+",
    description: "App landing templates",
    color: "bg-accent/10 text-accent",
  },
];

const CategoriesSection = () => {
  return (
    <section id="categories" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Categories</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Find Your Perfect Template
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our curated collection of templates designed for every industry and purpose
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/templates?category=${encodeURIComponent(category.title)}`}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer block"
            >
              <div className={`w-14 h-14 rounded-xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <category.icon className="w-7 h-7" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display text-xl font-bold text-foreground">{category.title}</h3>
                <span className="text-sm font-medium text-primary">{category.count}</span>
              </div>
              <p className="text-muted-foreground">{category.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
