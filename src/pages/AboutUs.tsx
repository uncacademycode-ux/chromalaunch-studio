import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Target, 
  Award, 
  Globe, 
  Heart, 
  Zap,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { value: "50K+", label: "Templates Sold" },
  { value: "12K+", label: "Happy Customers" },
  { value: "500+", label: "Premium Authors" },
  { value: "98%", label: "Satisfaction Rate" },
];

const values = [
  {
    icon: Target,
    title: "Quality First",
    description: "Every template undergoes rigorous review to ensure pixel-perfect design and clean, maintainable code.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "We empower designers and developers worldwide to showcase their creativity and earn from their skills.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We stay ahead of design trends, offering cutting-edge templates that help businesses stand out.",
  },
  {
    icon: Heart,
    title: "Customer Success",
    description: "Your success is our priority. We provide dedicated support and resources to help you thrive.",
  },
];

const team = [
  {
    name: "Sarah Chen",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Marcus Johnson",
    role: "Head of Design",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Emily Rodriguez",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "David Kim",
    role: "Customer Success",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
  },
];

const milestones = [
  { year: "2018", event: "TemplatePro founded with a vision to democratize web design" },
  { year: "2019", event: "Reached 1,000 templates and 5,000 customers" },
  { year: "2021", event: "Launched Author Partner Program with 200+ creators" },
  { year: "2023", event: "Expanded to serve customers in 150+ countries" },
  { year: "2024", event: "Introduced AI-powered template customization tools" },
];

const AboutUs = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-blob-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-blob-float" style={{ animationDelay: "2s" }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <Globe className="w-4 h-4" />
              Trusted by 12,000+ customers worldwide
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Empowering Creators,{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                One Template at a Time
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're on a mission to make professional web design accessible to everyone. 
              From startups to enterprises, we provide the building blocks for stunning digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  TemplatePro was born in 2018 from a simple frustration: why should great web design 
                  be reserved only for those with big budgets or specialized skills?
                </p>
                <p>
                  Our founders, a team of designers and developers, set out to create a marketplace 
                  where quality meets accessibility. We believed that every business, regardless of 
                  size, deserves a stunning online presence.
                </p>
                <p>
                  Today, we're proud to host over 500 talented authors from around the world, 
                  offering templates that span e-commerce, portfolios, landing pages, dashboards, 
                  and more. Each template is carefully vetted to ensure it meets our high standards 
                  for design, code quality, and user experience.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                alt="Team collaboration"
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-xl border border-border/50 shadow-lg">
                <div className="flex items-center gap-3">
                  <Award className="w-10 h-10 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground">Award Winning</div>
                    <div className="text-sm text-muted-foreground">Best Marketplace 2023</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from curating templates to supporting our community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-2xl border border-border/50 hover:shadow-lg transition-shadow animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Our Journey
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-4 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <div className="glass-card p-4 rounded-xl border border-border/50 flex-1 mt-1">
                  <p className="text-foreground">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Meet the Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind TemplatePro who work tirelessly to bring you the best templates.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-2xl border border-border/50 text-center hover:shadow-lg transition-shadow group"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover group-hover:scale-105 transition-transform"
                />
                <h3 className="font-display font-bold text-lg text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass-card p-8 md:p-12 rounded-3xl border border-border/50 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-accent/5" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Browse our collection of premium templates and find the perfect starting point for your next project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button variant="hero" size="lg" className="gap-2">
                    Browse Templates
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="hero-outline" size="lg">
                  Become an Author
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutUs;
