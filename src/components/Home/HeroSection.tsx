'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    "/Bird5.jpg",
    "/Dog1.jpg",
    "/Cat1.jpg",
    "/Fish1.jpeg"
];

const HeroSection = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isHovering, setIsHovering] = useState(false); 

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isHovering) {
                setDirection(1);
                setCurrentImage((prev) => (prev + 1) % images.length);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [isHovering]); 

    const navigate = (newDirection: number) => {
        if (newDirection !== 1 && newDirection !== -1) {
             const targetIndex = newDirection;
             setDirection(targetIndex > currentImage ? 1 : -1);
             setCurrentImage(targetIndex);
        } else {
             setDirection(newDirection);
             setCurrentImage((prev) =>
                 (prev + newDirection + images.length) % images.length
             );
        }
    };


    const springTransition = {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.5
    };

    return (
        <div
            className="relative w-full h-screen overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <AnimatePresence custom={direction} initial={false}>
                <motion.div
                    key={currentImage}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? '100%' : '-100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction < 0 ? '100%' : '-100%' }}
                    transition={springTransition}
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{
                        backgroundImage: `url(${images[currentImage]})`,
                    }}
                >
                    <div className="absolute inset-0 bg-black/40"></div>
                </motion.div>
            </AnimatePresence>

             <motion.div
                className="absolute top-20 left-20 w-16 h-16 rounded-full bg-amber-400/20 blur-xl hidden md:block" // Hide below md
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-40 right-32 w-24 h-24 rounded-full bg-pink-500/20 blur-xl hidden md:block" // Hide below md
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />


            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center p-4 sm:p-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl w-full" 
                >
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-4 text-lg text-gray-100 sm:text-xl md:text-2xl max-w-xl md:max-w-2xl mx-auto leading-relaxed"
                    >
                        Discover the world`&apos;`s most <span className="text-green-500 font-medium">rare and beautiful</span> pets, carefully curated for discerning owners.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
                    >
                        <button className="relative px-6 py-2.5 sm:px-8 sm:py-3 lg:px-10 lg:py-4 bg-gradient-to-r from-white to-green-500 text-green-900 font-semibold rounded-full hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 group overflow-hidden w-full sm:w-auto">
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300 text-sm sm:text-base lg:text-[17px]">
                                Browse Collection
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            <span className="absolute top-0 left-0 w-full h-0.5 bg-white/30 group-hover:h-full group-hover:bg-white/10 transition-all duration-700 origin-bottom"></span>
                        </button>

                        <button className="flex items-center justify-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 lg:px-8 lg:py-4 bg-transparent text-white font-medium rounded-full border-2 border-white/30 hover:border-white/50 hover:bg-white/10 transition-all duration-300 group w-full sm:w-auto">
                            <span className="text-sm sm:text-base lg:text-[17px]">How It Works</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 transform items-center gap-4 md:bottom-8 md:right-10 md:left-auto md:translate-x-0">
                <div className="flex gap-1.5 md:gap-2">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => navigate(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${i === currentImage ? 'w-6 md:w-8 bg-green-400' : 'w-3 md:w-4 bg-white/30 hover:bg-white/50'}`}
                            aria-label={`Go to slide ${i + 1}`} 
                        />
                    ))}
                </div>

                <div className="flex gap-2 md:gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110"
                        aria-label="Previous slide" 
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => navigate(1)}
                        className="p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110"
                        aria-label="Next slide" 
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;