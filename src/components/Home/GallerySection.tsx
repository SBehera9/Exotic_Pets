"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
}

const galleryImages: GalleryImage[] = [
  { src: "/Bird1.png", alt: "Two Rabbits" },
  { src: "/Dog2.png", alt: "Three Budgies" },
  { src: "/Fish4.jpg", alt: "Cat with Sunglasses" },
  { src: "/Fish3.png", alt: "Cat with Sunglasses" },
  { src: "/Bird2.jpg", alt: "Cat with Sunglasses" },
  { src: "/Bird3.jpg", alt: "Cat with Sunglasses" },
  { src: "/PersianCat.jpg", alt: "Cat with Sunglasses" },
  { src: "/Pomerian.jpeg", alt: "Cat with Sunglasses" },
];

const GallerySection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleViewMore = () => {
    window.location.href = "/gallerypage";
  };

  const openModal = (index: number) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const nextImage = () => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % galleryImages.length : 0
    );
  };

  const prevImage = () => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : 0
    );
  };

  return (
    <div className="bg-white py-12 px-4" id="gallery">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-green-600 mb-8">Gallery</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden shadow-md cursor-pointer aspect-[4/3]"
              onClick={() => openModal(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={500}
                height={375}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleViewMore}
          className="mt-4 px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
        >
          View More
        </button>
      </div>

      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-4">
          <div className="relative max-w-full sm:max-w-4xl w-full">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white text-2xl sm:text-3xl"
            >
              <X size={30} />
            </button>

            <Image
              src={galleryImages[selectedIndex].src}
              alt={galleryImages[selectedIndex].alt}
              width={800}
              height={500}
              className="w-full h-auto rounded-lg"
            />

            <button
              onClick={prevImage}
              className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 text-white text-xl sm:text-3xl"
            >
              <ChevronLeft size={30} />
            </button>

            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 text-white text-xl sm:text-3xl"
            >
              <ChevronRight size={30} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GallerySection;
