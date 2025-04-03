'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";

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

interface ImageCardProps {
  image: Image;
  onClick: (image: Image, index: number) => void;
  index: number;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick, index }) => {
  return (
    <div
      className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={() => onClick(image, index)}
    >
      <div className="relative w-full aspect-square">
        <Image
          src={image.imageUrl}
          alt={`${image.title || 'Gallery Image'}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 33vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={index < 3}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="text-white">
            <h3 className="font-semibold text-sm sm:text-lg">{image.title}</h3>
            <span className="text-xs sm:text-sm bg-green-600 px-2 py-1 rounded-full">{image.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ImageModalProps {
  images: Image[];
  currentIndex: number;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ images, currentIndex, onClose, onChangeIndex }) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrev = React.useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      onChangeIndex((currentIndex - 1 + images.length) % images.length);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [currentIndex, images.length, isAnimating, onChangeIndex]);

  const handleNext = React.useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      onChangeIndex((currentIndex + 1) % images.length);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [currentIndex, images.length, isAnimating, onChangeIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleNext();
    }

    if (touchStart - touchEnd < -50) {
      handlePrev();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onClose]);

  if (!images.length) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center bg-gray-900 text-white p-4 rounded-t-lg">
          <div>
            <h2 className="text-lg sm:text-xl font-bold">{images[currentIndex].title}</h2>
            <p className="text-xs sm:text-sm text-gray-300">{images[currentIndex].category}</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xs sm:text-sm text-gray-300">
              {currentIndex + 1} / {images.length}
            </span>
            <button
              className="p-1 sm:p-2 rounded-full hover:bg-gray-700 transition-colors"
              onClick={onClose}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div 
          className="relative flex-grow bg-black flex items-center justify-center overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={`absolute inset-0 flex transition-transform duration-300 ${isAnimating ? 'opacity-80' : 'opacity-100'}`}>
            <Image
              src={images[currentIndex].imageUrl}
              alt={images[currentIndex].title || 'Gallery Image'}
              fill
              className="object-contain"
              priority
            />
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-colors z-10"
            aria-label="Previous Image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 sm:h-8 sm:w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-colors z-10"
            aria-label="Next Image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 sm:h-8 sm:w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="bg-gray-900 text-white p-3 sm:p-4 text-xs sm:text-sm rounded-b-lg">
          <p>Image ID: {images[currentIndex].id}</p>
        </div>
      </div>
    </div>
  );
};

function GalleryPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);

  const openModal = (image: Image, index: number) => {
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setCurrentImageIndex(null);
  };

  const changeImageIndex = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-4 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-16">
        <motion.h2 
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 text-center scroll-mt-16" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          id="products-heading" 
        >
          Our <span className="text-green-600">Awesome </span>
          <span className="text-gray-900"> Gallery</span> 
        </motion.h2>
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-32 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto rounded-full mb-8"
        />

        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {imageData.map((image, index) => (
            <ImageCard key={image.id} image={image} onClick={openModal} index={index} />
          ))}
        </div>
      </div>

      {currentImageIndex !== null && (
        <ImageModal
          images={imageData}
          currentIndex={currentImageIndex}
          onClose={closeModal}
          onChangeIndex={changeImageIndex}
        />
      )}
    </main>
  );
}

export default GalleryPage;