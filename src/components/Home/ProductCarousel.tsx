'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faEnvelope, faChevronLeft, faChevronRight);

interface Product {
  name: string;
  imageSrc: string;
}

const products: Product[] = [
  { name: 'Beagle Puppies', imageSrc: '/images/beagle.png' },
  { name: 'Persian Cat', imageSrc: '/images/persian_cat.png' },
  { name: 'Pug Puppies', imageSrc: '/images/pug_puppies.png' },
  { name: 'Parrot', imageSrc: '/images/parrot.png' },
  { name: 'Rabbit', imageSrc: '/images/rabbit2.png' },
  { name: 'Hamster', imageSrc: '/images/hamster.png' },
  { name: 'Golden Retriever', imageSrc: '/images/golden_retriever.png' },
  { name: 'Siamese Cat', imageSrc: '/images/siamese_cat.png' },
  { name: 'French Bulldog', imageSrc: '/images/french_bulldog.png' },
  { name: 'Cockatiel', imageSrc: '/images/cockatiel.png' },
  { name: 'Guinea Pig', imageSrc: '/images/guinea_pig.png' },
  { name: 'Chinchilla', imageSrc: '/images/chinchilla.png' },
];

const ProductCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= 300; // Adjust scroll amount as needed
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += 300; // Adjust scroll amount as needed
    }
  };

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-green-600 mb-8">Products</h2>
        <div className="relative">
          {/* Carousel Container (Scrollable) */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scroll-smooth gap-4 py-4"
            style={{ scrollbarWidth: 'none' }} // Hide scrollbar in Firefox
          >
            {products.map((product, index) => (
              <div
                key={index}
                className="w-64 flex-shrink-0" // Removed transition class
              >
                {/* Product Card */}
                <div className="border border-gray-200 rounded-lg shadow-md p-4">
                  <Image
                    src={product.imageSrc}
                    alt={product.name}
                    width={256}
                    height={200}
                    objectFit="contain"
                    className="mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md flex items-center mx-auto">
                    <FontAwesomeIcon icon="envelope" className="mr-2" />
                    Send Enquiry
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 rounded-full p-2"
          >
            <FontAwesomeIcon icon="chevron-left" className="text-gray-600" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 rounded-full p-2"
          >
            <FontAwesomeIcon icon="chevron-right" className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;