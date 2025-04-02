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
        setDirection(newDirection);
        setCurrentImage((prev) => 
            (prev + newDirection + images.length) % images.length
        );
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
            <AnimatePresence custom={direction}>
                <motion.div
                    key={currentImage}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? 1000 : -1000 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction < 0 ? 1000 : -1000 }}
                    transition={springTransition}
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${images[currentImage]})`,
                        backgroundAttachment: 'fixed',
                    }}
                >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/30"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.7))]"></div>
                </motion.div>
            </AnimatePresence>

            <motion.div 
                className="absolute left-10 bottom-10 z-10 hidden lg:block"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <div className="relative w-48 h-64 bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                    <div className="relative p-4 h-full flex flex-col justify-end">
                        <span className="text-xs font-semibold text-amber-400 mb-1">NEW ARRIVAL</span>
                        <h3 className="text-white font-bold text-lg mb-2">Golden Macaw</h3>
                        <div className="text-xs text-white/70 mb-3">From $1,200</div>
                        <button className="text-xs bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-full transition-all">
                            View Details
                        </button>
                    </div>
                </div>
            </motion.div>

            <div className="relative z-10 flex h-screen flex-col items-center justify-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl px-4"
                >
                    <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                        <span className="text-sm font-medium text-amber-300">Exclusive Pets Collection</span>
                    </div>
                    
                    <h1 className="text-5xl font-extrabold text-white sm:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-6">
                        <span className="bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                            Exceptional Companions
                        </span>
                    </h1>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-4 text-xl text-gray-100 sm:text-2xl max-w-2xl mx-auto leading-relaxed"
                    >
                        Discover the world&apos;s most <span className="text-amber-300 font-medium">rare and beautiful</span> pets, carefully curated for discerning owners.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <button className="relative px-10 py-4 bg-gradient-to-r from-amber-500 to-pink-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 group overflow-hidden">
                            <span className="relative z-10">Browse Collection</span>
                            <span className="absolute inset-0 bg-gradient-to-r from-amber-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            <span className="absolute top-0 left-0 w-full h-0.5 bg-white/30 group-hover:h-full group-hover:bg-white/10 transition-all duration-700 origin-bottom"></span>
                        </button>
                        
                        <button className="flex items-center gap-2 px-8 py-4 bg-transparent text-white font-medium rounded-full border-2 border-white/30 hover:border-white/50 hover:bg-white/10 transition-all duration-300 group">
                            <span>How It Works</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            <div className="absolute bottom-8 right-10 z-20 flex items-center gap-6">
                <div className="flex gap-2">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => navigate(i > currentImage ? 1 : -1)}
                            className={`h-2 rounded-full transition-all duration-300 ${i === currentImage ? 'w-8 bg-amber-400' : 'w-4 bg-white/30 hover:bg-white/50'}`}
                        />
                    ))}
                </div>
                
                <div className="flex gap-3">
                    <button 
                        onClick={() => navigate(-1)}
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button 
                        onClick={() => navigate(1)}
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <motion.div 
                className="absolute top-20 left-20 w-16 h-16 rounded-full bg-amber-400/20 blur-xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            
            <motion.div 
                className="absolute bottom-40 right-32 w-24 h-24 rounded-full bg-pink-500/20 blur-xl"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />
        </div>
    );
};

export default HeroSection;