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
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isHovering && !isAnimating) {
                setDirection(1);
                setCurrentImage((prev) => (prev + 1) % images.length);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [isHovering, isAnimating]);

    const navigate = (newDirection: number) => {
        if (isAnimating) return;
        
        setIsAnimating(true);
        
        if (newDirection !== 1 && newDirection !== -1) {
            const targetIndex = newDirection;
            if (targetIndex === currentImage) return;
            setDirection(targetIndex > currentImage ? 1 : -1);
            setCurrentImage(targetIndex);
        } else { 
            setDirection(newDirection);
            setCurrentImage((prev) =>
                (prev + newDirection + images.length) % images.length
            );
        }
        
        setTimeout(() => setIsAnimating(false), 1000);
    };

    const springTransition = {
        type: "spring",
        stiffness: 260,
        damping: 25,
        mass: 0.5
    };

    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1],
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.6, 
                ease: [0.16, 1, 0.3, 1] 
            }
        }
    };

    return (
        <div
            className="relative w-full h-screen overflow-hidden bg-cover bg-center" 
            style={{ backgroundImage: `url(${images[currentImage]})` }} 
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60"></div>
            
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-white/10 backdrop-blur-sm"
                    style={{
                        width: Math.random() * 10 + 5 + 'px',
                        height: Math.random() * 10 + 5 + 'px',
                        top: Math.random() * 100 + '%',
                        left: Math.random() * 100 + '%',
                    }}
                    animate={{
                        y: [0, (Math.random() - 0.5) * 50],
                        x: [0, (Math.random() - 0.5) * 30],
                        opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 5
                    }}
                />
            ))}

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
                    onAnimationStart={() => setIsAnimating(true)}
                    onAnimationComplete={() => setIsAnimating(false)}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70"></div>
                </motion.div>
            </AnimatePresence>

            <motion.div
                className="absolute top-20 left-20 w-16 h-16 rounded-full bg-amber-400/20 blur-xl hidden md:block"
                animate={{ 
                    scale: [1, 1.2, 1], 
                    opacity: [0.3, 0.5, 0.3],
                    x: [-10, 10, -10],
                    y: [-5, 5, -5]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-40 right-32 w-24 h-24 rounded-full bg-pink-500/20 blur-xl hidden md:block"
                animate={{ 
                    scale: [1, 1.3, 1], 
                    opacity: [0.2, 0.4, 0.2],
                    x: [0, 15, 0],
                    y: [0, -10, 0]
                }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <motion.div
                className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-blue-400/20 blur-xl hidden md:block"
                animate={{ 
                    scale: [1, 1.1, 1], 
                    opacity: [0.1, 0.3, 0.1],
                    x: [0, -20, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            <div className="relative z-10 flex h-full flex-col items-center justify-end pb-16 sm:pb-20 md:pb-24 text-center px-4">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className="w-full max-w-4xl"
                >
                    <motion.h1 
                        variants={itemVariants}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-amber-300">
                            Exotic Pets
                        </span>
                    </motion.h1>
                    
                    <motion.p
                        variants={itemVariants}
                        className="text-base sm:text-lg md:text-xl text-gray-100 max-w-md sm:max-w-lg md:max-w-xl mx-auto leading-relaxed"
                    >
                        Discover the world`&apos;`s most <span className="text-green-300 font-medium">rare and beautiful</span> pets, carefully curated for discerning owners.
                    </motion.p>
                </motion.div>
            </div>

            <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 transform items-center gap-3 sm:gap-4 md:bottom-8 md:right-8 md:left-auto md:translate-x-0">
                <div className="flex gap-1.5 sm:gap-2">
                    {images.map((_, i) => (
                        <motion.button
                            key={i}
                            onClick={() => navigate(i)} 
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${i === currentImage ? 'w-5 sm:w-6 md:w-8 bg-green-400' : 'w-2 sm:w-3 md:w-4 bg-white/30 hover:bg-white/50'}`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>

                <div className="flex gap-1.5 sm:gap-2 md:gap-3">
                    <motion.button
                        onClick={() => navigate(-1)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1.5 sm:p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 transition-all duration-300"
                        aria-label="Previous slide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </motion.button>
                    <motion.button
                        onClick={() => navigate(1)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1.5 sm:p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 transition-all duration-300"
                        aria-label="Next slide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </motion.button>
                </div>
            </div>

            <motion.div 
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 hidden md:block"
                animate={{ 
                    y: [0, 10, 0],
                    opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <div className="flex flex-col items-center">
                    <span className="text-xs text-white/80 mb-1">Scroll</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </motion.div>
        </div>
    );
};

export default HeroSection;