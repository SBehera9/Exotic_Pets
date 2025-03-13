import AboutUsSection from "@/components/Home/AboutUsSection";
import ContactUsSection from "@/components/Home/ContactUsSection";
import FooterSection from "@/components/Home/FooterSection";
import GallerySection from "@/components/Home/GallerySection";
import HeroSection from "@/components/Home/HeroSection";
import PetCategoriesSection from "@/components/Home/PetCategoriesSection";
import PetFoodSection from "@/components/Home/PetFoodSection";
import ProductCarousel from "@/components/Home/ProductCarousel";
import TestimonialsSection from "@/components/Home/TestimonialsSection";
import VideosSection from "@/components/Home/VideosSection";
import Navbar from "@/components/NavigationBar/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <PetCategoriesSection />
      <PetFoodSection /> 
      <ProductCarousel />
      <AboutUsSection />
      <GallerySection />
      <VideosSection />
      <TestimonialsSection />
      <ContactUsSection />
      <FooterSection />
    </div>
  );
}

export default App;