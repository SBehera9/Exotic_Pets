'use client';

import React from 'react';
import Image from 'next/image';

interface GalleryImage {
  src: string;
  alt: string;
}

const galleryImages: GalleryImage[] = [
  { src: '/images/rabbits.png', alt: 'Two Rabbits' },
  { src: '/images/birds3.png', alt: 'Three Budgies' },
  { src: '/images/cat3.png', alt: 'Cat with Sunglasses' },
  { src: '/images/cat3.png', alt: 'Cat with Sunglasses' },
  { src: '/images/cat3.png', alt: 'Cat with Sunglasses' },
  { src: '/images/cat3.png', alt: 'Cat with Sunglasses' },
];

const GallerySection = () => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-green-600 mb-8">Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <div key={index} className="rounded-xl overflow-hidden shadow-md">
              <Image
                src={image.src}
                alt={image.alt}
                width={500} // Adjust as needed
                height={300} // Adjust as needed
                objectFit="cover"
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GallerySection;