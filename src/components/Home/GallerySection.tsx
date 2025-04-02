"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryImage {
  src: string;
  alt: string;
  category?: string;
}

const galleryImages: GalleryImage[] = [
  { src: "/Bird1.png", alt: "Colorful bird perched on a branch", category: "Birds" },
  { src: "/Dog2.png", alt: "Happy dog playing in the park", category: "Dogs" },
  { src: "/Fish4.jpg", alt: "Tropical fish in a coral reef", category: "Fish" },
  { src: "/Fish3.png", alt: "Goldfish swimming in clear water", category: "Fish" },
  { src: "/Bird2.jpg", alt: "Eagle soaring in the sky", category: "Birds" },
  { src: "/Bird3.jpg", alt: "Hummingbird feeding on nectar", category: "Birds" },
  { src: "/PersianCat.jpg", alt: "Fluffy Persian cat resting", category: "Cats" },
  { src: "/Pomerian.jpeg", alt: "Adorable Pomeranian puppy", category: "Dogs" },
];

const GallerySection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...new Set(galleryImages.map(img => img.category).filter((c): c is string => !!c))];

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedIndex]);

  const handleViewMore = () => {
    window.location.href = "/gallerypage";
  };

  const openModal = (index: number) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % filteredImages.length : 0
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : 0
    );
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-16 px-4 sm:px-6" id="gallery">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our <span className="text-green-600">Gallery</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore beautiful moments captured by our community
          </motion.p>
        </div>

        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer aspect-[4/3] group"
              onClick={() => openModal(index)}
              onMouseEnter={() => setIsHovering(index)}
              onMouseLeave={() => setIsHovering(null)}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={500}
                height={375}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                priority={index < 4}
              />
              
              <AnimatePresence>
                {isHovering === index && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.span 
                      className="text-white font-medium text-sm sm:text-base"
                      initial={{ y: 10 }}
                      animate={{ y: 0 }}
                      exit={{ y: 10 }}
                    >
                      {image.alt}
                    </motion.span>
                    {image.category && (
                      <motion.span 
                        className="text-green-300 text-xs mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        exit={{ opacity: 0 }}
                      >
                        {image.category}
                      </motion.span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            onClick={handleViewMore}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(5, 150, 105, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} />
            View Full Gallery
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <div className="relative max-w-full sm:max-w-6xl w-full mx-4">
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 sm:right-4 text-white hover:text-green-400 transition-colors z-10"
                aria-label="Close gallery"
              >
                <X size={36} className="p-1 hover:scale-110 transition-transform" />
              </button>

              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="flex justify-center relative"
              >
                <Image
                  src={filteredImages[selectedIndex].src}
                  alt={filteredImages[selectedIndex].alt}
                  width={1200}
                  height={800}
                  className="max-h-[80vh] w-auto rounded-lg shadow-2xl"
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </motion.div>

              <button
                onClick={prevImage}
                className="absolute top-1/2 left-2 sm:-left-12 transform -translate-y-1/2 text-white hover:text-green-400 transition-colors p-2 bg-black/30 rounded-full backdrop-blur-sm hover:bg-black/50"
                aria-label="Previous image"
              >
                <ChevronLeft size={48} className="hover:scale-110 transition-transform" />
              </button>

              <button
                onClick={nextImage}
                className="absolute top-1/2 right-2 sm:-right-12 transform -translate-y-1/2 text-white hover:text-green-400 transition-colors p-2 bg-black/30 rounded-full backdrop-blur-sm hover:bg-black/50"
                aria-label="Next image"
              >
                <ChevronRight size={48} className="hover:scale-110 transition-transform" />
              </button>

              <div className="absolute bottom-6 left-0 right-0 text-center">
                <div className="inline-flex items-center bg-black/50 text-white text-sm sm:text-base px-4 py-2 rounded-full backdrop-blur-sm">
                  <span className="font-medium">
                    {filteredImages[selectedIndex].alt}
                  </span>
                  {filteredImages[selectedIndex].category && (
                    <span className="mx-2">•</span>
                  )}
                  {filteredImages[selectedIndex].category && (
                    <span className="text-green-300">
                      {filteredImages[selectedIndex].category}
                    </span>
                  )}
                </div>
                <div className="mt-2 text-white/80 text-sm">
                  {selectedIndex + 1} / {filteredImages.length}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GallerySection;