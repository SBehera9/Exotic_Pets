'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faChevronLeft, faChevronRight, faQuoteLeft);

interface Testimonial {
  name: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Rahul Vaidya',
    text: 'I always take my dogs to their vets as they are more experienced and trustworthy.',
  },
  {
    name: 'Rashi Gupta',
    text: 'I bought a hamster from them for my little brother and they guided me very well during and after the purchase.',
  },
  {
    name: 'Anjali Sharma',
    text: 'The staff is incredibly knowledgeable and helped me choose the perfect food for my picky cat.',
  },
  {
    name: 'Suresh Menon',
    text: 'Great selection of toys and accessories. My parrot loves the new climbing rope I got from here!',
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/3 relative">
          <Image
            src="/images/animals_stacked.png" 
            alt="Stacked Animals"
            width={400} 
            height={500} 
            objectFit="contain"
            className="mx-auto"
          />
        </div>

        <div className="md:w-2/3 relative">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handlePrev}
                  className="bg-gray-100 hover:bg-gray-200 rounded-full p-2"
                >
                  <FontAwesomeIcon icon="chevron-left" className="text-gray-600" />
                </button>

              <div className="relative">
                <FontAwesomeIcon
                  icon="quote-left"
                  className="absolute -top-5 left-0 text-green-500 text-2xl"
                />
                <p className="text-gray-700 pl-6">{testimonials[currentIndex].text}</p>
                <p className="text-gray-800 font-semibold mt-2 pl-6">- {testimonials[currentIndex].name}</p>
              </div>

                <button
                  onClick={handleNext}
                  className="bg-gray-100 hover:bg-gray-200 rounded-full p-2"
                >
                  <FontAwesomeIcon icon="chevron-right" className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default TestimonialsSection;