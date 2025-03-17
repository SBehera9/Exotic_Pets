'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faQuoteLeft, faChevronLeft, faChevronRight);

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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative w-full flex flex-col items-center px-4">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url("/Fish2.png")',
                    backgroundAttachment: 'fixed',
                    zIndex: -1,
                }}
            />

            <div className="relative py-12 flex flex-col items-center w-full">
                <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center mb-6">
                    Customer Testimonials
                </h2>

                <div className="w-full max-w-[95%] sm:max-w-[500px] flex flex-col items-center text-center">
                    <div className="relative w-full min-h-[180px] sm:min-h-[150px] flex flex-col justify-center p-5 sm:p-6 bg-white/20 backdrop-blur-md text-white rounded-lg transition-opacity duration-500 ease-in-out shadow-md">
                        <FontAwesomeIcon
                            icon="quote-left"
                            className="absolute top-4 left-4 text-green-300 text-xl sm:text-2xl"
                        />
                        <p className="text-white text-sm sm:text-base">{testimonials[currentIndex].text}</p>
                        <p className="font-semibold mt-2 text-gray-200 text-sm sm:text-base">
                            - {testimonials[currentIndex].name}
                        </p>
                    </div>

                    <div className="flex justify-center items-center gap-6 mt-4">
                        <button
                            onClick={handlePrev}
                            className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition duration-300"
                            aria-label="Previous Testimonial"
                        >
                            <FontAwesomeIcon icon="chevron-left" className="text-gray-600 text-lg" />
                        </button>

                        <button
                            onClick={handleNext}
                            className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition duration-300"
                            aria-label="Next Testimonial"
                        >
                            <FontAwesomeIcon icon="chevron-right" className="text-gray-600 text-lg" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSection;