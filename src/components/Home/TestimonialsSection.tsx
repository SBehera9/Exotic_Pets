'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faQuoteLeft, faChevronLeft, faChevronRight);

interface Testimonial {
    name: string;
    text: string;
    role?: string;
    avatar?: string;
}

const testimonials: Testimonial[] = [
    {
        name: 'Aarav Mehta',
        text: 'Amazing service and expert advice! My exotic bird is thriving thanks to them.',
        role: 'Exotic Bird Owner',
        avatar: '/avatars/bird-owner.jpg'
    },
    {
        name: 'Priya Desai',
        text: 'Adopted a kitten, and the process was seamless. Highly recommended!',
        role: 'Cat Parent',
        avatar: '/avatars/cat-owner.jpg'
    },
    {
        name: 'Vikram Kapoor',
        text: 'Great selection of pet food and accessories. My dog loves it!',
        role: 'Dog Lover',
        avatar: '/avatars/dog-owner.jpg'
    },
    {
        name: 'Neha Sharma',
        text: 'Best place for exotic pets! My fish tank setup looks stunning.',
        role: 'Aquarium Enthusiast',
        avatar: '/avatars/fish-owner.jpg'
    },
];

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState<'left'|'right'>('right');
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isAnimating) {
                setDirection('right');
                setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
            }
        }, 8000);
        return () => clearInterval(interval);
    }, [isAnimating]);

    const handlePrev = () => {
        if (isAnimating) return;
        setDirection('left');
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
        setTimeout(() => setIsAnimating(false), 500);
    };

    const handleNext = () => {
        if (isAnimating) return;
        setDirection('right');
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
        setTimeout(() => setIsAnimating(false), 500);
    };

    const goToIndex = (index: number) => {
        if (isAnimating || index === currentIndex) return;
        setDirection(index > currentIndex ? 'right' : 'left');
        setIsAnimating(true);
        setCurrentIndex(index);
        setTimeout(() => setIsAnimating(false), 500);
    };

    return (
        <div className="relative w-full flex flex-col items-center px-4 overflow-hidden">
            {/* Background with overlay */}
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed" 
                style={{ backgroundImage: 'url("/Fish2.png")', zIndex: -2 }} />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-blue-900/70 z-[-1]" />

            <div className="relative py-16 sm:py-20 flex flex-col items-center w-full max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-green-300 font-semibold text-sm uppercase tracking-wider">
                        Happy Customers
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-2">
                        What Our Clients Say
                    </h2>
                    <div className="w-20 h-1 bg-green-300 mx-auto mt-4"></div>
                </div>

                <div className="w-full max-w-4xl px-4 sm:px-6">
                    <div className="relative min-h-[300px] sm:min-h-[250px]">
                        {testimonials.map((testimonial, index) => (
                            <div 
                                key={index}
                                className={`absolute inset-0 transition-all duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
                                    ${index === currentIndex && direction === 'right' ? 'animate-slide-in-right' : ''}
                                    ${index === currentIndex && direction === 'left' ? 'animate-slide-in-left' : ''}`}
                            >
                                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 sm:p-10 shadow-lg border border-white/10">
                                    <FontAwesomeIcon
                                        icon="quote-left"
                                        className="text-green-300 text-3xl opacity-30 mb-4"
                                    />
                                    <p className="text-white text-lg sm:text-xl leading-relaxed mb-6">
                                        {testimonial.text}
                                    </p>
                                    <div className="flex items-center">
                                        <div className="mr-4">
                                            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-green-300/50">
                                                {testimonial.avatar ? (
                                                    <img 
                                                        src={testimonial.avatar} 
                                                        alt={testimonial.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-white text-xl font-bold">
                                                        {testimonial.name.charAt(0)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg">
                                                {testimonial.name}
                                            </h4>
                                            <p className="text-green-200 text-sm">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center mt-8">
                        <button
                            onClick={handlePrev}
                            className="bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 group"
                            aria-label="Previous Testimonial"
                        >
                            <FontAwesomeIcon 
                                icon="chevron-left" 
                                className="text-white text-lg group-hover:text-green-300 transition-all" 
                            />
                        </button>

                        <div className="flex space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-green-300 w-6' : 'bg-white/30'}`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            className="bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 group"
                            aria-label="Next Testimonial"
                        >
                            <FontAwesomeIcon 
                                icon="chevron-right" 
                                className="text-white text-lg group-hover:text-green-300 transition-all" 
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSection;