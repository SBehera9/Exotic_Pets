'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/images.jpeg"
                    alt="Pet Shop Background"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    className="brightness-75"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
            </div>

            {/* Content Section */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl"
                >
                    <h1 className="text-4xl font-extrabold text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                        Exotic Pet Shops
                    </h1>
                    <p className="mt-4 text-lg text-gray-200 sm:text-xl">
                        Assured Quality & Reliable Products
                    </p>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="mt-4 text-6xl font-bold text-white sm:text-7xl lg:text-8xl"
                    >
                        Exotic
                    </motion.h2>
                    
                    {/* Animated Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-8 rounded-full bg-green-500 px-8 py-3 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-400 sm:py-4 sm:px-12 sm:text-xl"
                    >
                        Enquire Now
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;
