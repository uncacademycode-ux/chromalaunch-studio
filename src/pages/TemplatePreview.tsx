import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TemplateHero from "@/components/preview/TemplateHero";
import TemplateGallery from "@/components/preview/TemplateGallery";
import TemplateFeatures from "@/components/preview/TemplateFeatures";
import TemplateTechStack from "@/components/preview/TemplateTechStack";
import RelatedTemplates from "@/components/preview/RelatedTemplates";
import TemplateSidebar from "@/components/preview/TemplateSidebar";
import { useTemplate } from "@/hooks/useTemplates";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TemplatePreview = () => {
  const { id } = useParams<{ id: string }>();
  const { data: template, isLoading, error } = useTemplate(id || "");

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <Skeleton className="h-8 w-64 mb-6" />
            <Skeleton className="h-[500px] w-full rounded-2xl mb-6" />
            <div className="grid lg:grid-cols-3 gap-8 mt-12">
              <div className="lg:col-span-2 space-y-12">
                <Skeleton className="h-[400px] w-full rounded-xl" />
                <Skeleton className="h-[300px] w-full rounded-xl" />
              </div>
              <div className="lg:col-span-1">
                <Skeleton className="h-[500px] w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !template) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 mb-8 justify-center">
              <ArrowLeft className="w-4 h-4" />
              Back to Templates
            </Link>
            <h1 className="text-3xl font-display font-bold text-foreground mb-4">
              Template Not Found
            </h1>
            <p className="text-muted-foreground">
              The template you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <TemplateHero template={template} />
          
          <div className="grid lg:grid-cols-3 gap-8 mt-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <TemplateGallery template={template} />
              <TemplateFeatures features={template.features || []} />
              <TemplateTechStack techStack={template.tech_stack || []} />
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <TemplateSidebar />
            </div>
          </div>
          
          <RelatedTemplates />
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default TemplatePreview;
