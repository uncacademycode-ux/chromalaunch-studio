import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TemplateHero from "@/components/preview/TemplateHero";
import TemplateGallery from "@/components/preview/TemplateGallery";
import TemplateFeatures from "@/components/preview/TemplateFeatures";
import TemplateTechStack from "@/components/preview/TemplateTechStack";
import RelatedTemplates from "@/components/preview/RelatedTemplates";
import TemplateSidebar from "@/components/preview/TemplateSidebar";

const TemplatePreview = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <TemplateHero />
          
          <div className="grid lg:grid-cols-3 gap-8 mt-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <TemplateGallery />
              <TemplateFeatures />
              <TemplateTechStack />
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
