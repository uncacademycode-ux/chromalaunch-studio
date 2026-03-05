import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LogoCloud from "@/components/LogoCloud";
import ShowcaseBanner from "@/components/ShowcaseBanner";
import CategoriesSection from "@/components/CategoriesSection";
import TemplatesSection from "@/components/TemplatesSection";
import ParallaxBanner from "@/components/ParallaxBanner";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <LogoCloud />
      <ShowcaseBanner />
      <CategoriesSection />
      <TemplatesSection />
      <ParallaxBanner />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
