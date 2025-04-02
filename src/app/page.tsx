"use client";

import { useState } from "react";
<<<<<<< HEAD
import AboutUsSection from "@/components/Home/AboutUsSection";
=======
import { FaWhatsapp, FaInstagram, FaFacebook, FaChevronUp, FaChevronDown } from "react-icons/fa";
// import AboutUsSection from "@/components/Home/AboutUsSection";
>>>>>>> 0d50b803788f40451afd377bfb1ebf50b713e5b9
import ContactUsSection from "@/components/Home/ContactUsSection";
import FooterSection from "@/components/Home/FooterSection";
import GallerySection from "@/components/Home/GallerySection";
import HeroSection from "@/components/Home/HeroSection";
import PetCategoriesSection from "@/components/Home/PetCategoriesSection";
import PetFoodSection from "@/components/Home/PetFoodSection";
import TestimonialsSection from "@/components/Home/TestimonialsSection";
import VideosSection from "@/components/Home/VideosSection";
import Navbar from "@/components/Home/Navbar";
import FloatingSocial from "@/components/Home/FloatingSocial";

function App() {
  return (
    <div>
      <Navbar />
      <FloatingSocial />
      <HeroSection />
      <PetCategoriesSection />
      <PetFoodSection />
      {/* <AboutUsSection /> */}
      <GallerySection />
      <VideosSection />
      <TestimonialsSection />
      <ContactUsSection />
      <FooterSection />
    </div>
  );
}

export default App;