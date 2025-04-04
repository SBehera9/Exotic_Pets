'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";

interface Image {
  id: number;
  imageUrl: string;
  title?: string;
  category?: string;
}

const imageData: Image[] = [
  { id: 1, imageUrl: '/Bird1.png', title: 'Exotic Bird', category: 'Birds' },
  { id: 2, imageUrl: '/smallconure.jpeg', title: 'Small Conure', category: 'Birds' },
  { id: 3, imageUrl: '/Bird3.jpg', title: 'Colorful Parrot', category: 'Birds' },
  { id: 4, imageUrl: '/zebrafinch.jpg', title: 'Zebra Finch', category: 'Birds' },
  { id: 5, imageUrl: '/Mollies.jpg', title: 'Mollies', category: 'Fish' },
  { id: 6, imageUrl: '/budgies.jpg', title: 'Budgies', category: 'Birds' },
  { id: 7, imageUrl: '/cockatiel.jpg', title: 'Cockatiel', category: 'Birds' },
  { id: 8, imageUrl: '/conure.jpeg', title: 'Conure', category: 'Birds' },
  { id: 9, imageUrl: '/parrotlets.jpeg', title: 'Parrotlets', category: 'Birds' },
  { id: 10, imageUrl: '/Fish2.png', title: 'Tropical Fish', category: 'Fish' },
  { id: 11, imageUrl: '/Cat.jpeg', title: 'Cute Cat', category: 'Pets' },
  { id: 12, imageUrl: '/goldenretriever.jpg', title: 'Golden Retriever', category: 'Pets' },
];

const GalleryPage: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'auto';
  };

  const changeIndex = (newIndex: number) => {
    setSelectedImageIndex(newIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'ArrowRight') changeIndex((selectedImageIndex + 1) % imageData.length);
      if (e.key === 'ArrowLeft') changeIndex((selectedImageIndex - 1 + imageData.length) % imageData.length);
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  return (
    <div className="container mx-auto px-4 py-8 bg-white mt-16"> {/* Added mt-16 here */}
      <div className="mb-8 sm:mb-10 text-center">
        <motion.h2 
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 text-center scroll-mt-16" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          id="gallery-heading" 
        >
          Image <span className="text-green-600">Gallery</span>
        </motion.h2>
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-32 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto rounded-full mb-8"
        />
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our collection of high-quality Images
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {imageData.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.03 }}
            className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => openModal(index)}
          >
            <div className="relative w-full aspect-square">
              <Image
                src={image.imageUrl}
                alt={image.title || 'Gallery Image'}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 639px) 33vw, (max-width: 767px) 33vw, 25vw"
                priority={index < 6}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-semibold text-xs sm:text-sm">{image.title}</h3>
                  <span className="text-[10px] sm:text-xs bg-green-600/90 px-2 py-1 rounded-full mt-1 inline-block">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div 
              className="relative w-full max-w-6xl bg-black rounded-xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 text-white bg-black/70 hover:bg-black/90 p-2 rounded-full z-10 transition-all duration-200 hover:scale-110"
                onClick={closeModal}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={imageData[selectedImageIndex].imageUrl}
                  alt={imageData[selectedImageIndex].title || 'Image'}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-white">
                <h3 className="text-lg sm:text-xl font-bold">{imageData[selectedImageIndex].title}</h3>
                <p className="text-xs sm:text-sm text-gray-300">{imageData[selectedImageIndex].category}</p>
              </div>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  changeIndex((selectedImageIndex - 1 + imageData.length) % imageData.length);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/70 hover:bg-black/90 p-3 rounded-full z-10 transition-all duration-200 hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  changeIndex((selectedImageIndex + 1) % imageData.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/70 hover:bg-black/90 p-3 rounded-full z-10 transition-all duration-200 hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;