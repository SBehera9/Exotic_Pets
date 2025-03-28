"use client";

import { useState } from "react";
import { FaWhatsapp, FaInstagram, FaFacebook, FaChevronUp, FaChevronDown } from "react-icons/fa";
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

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Navbar />

      <div className="fixed bottom-4 right-5 z-50 flex flex-col items-end ">
        <div className={`transition-all ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"} flex flex-col gap-2 items-end`}>
          <a
            href="https://wa.me/918328873021"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center text-2xl transition-transform transform hover:scale-110"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://www.instagram.com/your-instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center text-2xl transition-transform transform hover:scale-110"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com/your-facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg flex items-center justify-center text-2xl transition-transform transform hover:scale-110"
          >
            <FaFacebook />
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r text-white p-4 rounded-full shadow-lg flex items-center justify-center text-2xl transition-transform transform hover:scale-110 animate-color-change"
        >
          {isOpen ? <FaChevronDown /> : <FaChevronUp />}
        </button>
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

      <style jsx global>{`
        @keyframes color-change {
          0% { background-color: #ff0000; } /* Red */
          25% { background-color: #ff9900; } /* Orange */
          50% { background-color: #33cc33; } /* Green */
          75% { background-color: #3399ff; } /* Blue */
          100% { background-color: #ff0000; } /* Back to Red */
        }

        .animate-color-change {
          animation: color-change 10s infinite alternate;
        }
      `}</style>
    </div>
  );
}

export default App;
