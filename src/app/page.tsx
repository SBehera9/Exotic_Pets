import AboutUsSection from "@/components/Home/AboutUsSection";
import ContactUsSection from "@/components/Home/ContactUsSection";
import FooterSection from "@/components/Home/FooterSection";
import GallerySection from "@/components/Home/GallerySection";
import HeroSection from "@/components/Home/HeroSection";
import PetCategoriesSection from "@/components/Home/PetCategoriesSection";
import PetFoodSection from "@/components/Home/PetFoodSection";
import TestimonialsSection from "@/components/Home/TestimonialsSection";
import VideosSection from "@/components/Home/VideosSection";
import Navbar from "@/components/Home/Navbar";
import { FaWhatsapp } from "react-icons/fa";

function App() {
  return (
    <div>
      <Navbar />
      <div>
      <a
        href="https://wa.me/918328873021" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center text-3xl z-1"
      >
        <FaWhatsapp />
      </a>
     </div>
      <HeroSection />
      <PetCategoriesSection />
      <PetFoodSection /> 
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