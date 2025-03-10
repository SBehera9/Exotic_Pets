import AboutUsSection from "@/components/Home/AboutUsSection";
import ContactUsSection from "@/components/Home/ContactUsSection";
import FooterSection from "@/components/Home/FooterSection";
import GallerySection from "@/components/Home/GallerySection";
import HeroSection from "@/components/Home/HeroSection";
import PetCategoriesSection from "@/components/Home/PetCategoriesSection";
import ProductCarousel from "@/components/Home/ProductCarousel";
import TestimonialsSection from "@/components/Home/TestimonialsSection";
import VideosSection from "@/components/Home/VideosSection";
import Navbar from "@/components/NavigationBar/Navbar";
import TopBar from "@/components/NavigationBar/TopBar";

function App() {
  return (
    <div>
      <TopBar />
      <Navbar logoSrc="" logoAlt="Exotic Birds" />
      <HeroSection />
      <PetCategoriesSection />
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