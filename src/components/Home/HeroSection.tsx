'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const images = [
    "/Bird5.jpg",
    "/Dog1.jpg",
    "/Cat1.jpg",
    "/Fish1.jpeg"
];

const HeroSection = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleEnquireClick = () => {
        router.push('/ContactUsSection');
    };

    return (
        <div className="relative w-full h-screen">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${images[currentImage]})`,
                    backgroundAttachment: 'fixed',
                    transition: 'background-image 1s ease-in-out',
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="relative z-10 flex h-screen flex-col items-center justify-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl"
                >
                    <h1 className="text-3xl font-extrabold text-white drop-shadow-lg sm:text-4xl lg:text-6xl leading-tight">
                        Exotic Pet Shops
                    </h1>
                    <p className="mt-2 text-lg text-gray-200 sm:text-xl">
                        Assured Quality & Reliable Products
                    </p>
                    <button
                        onClick={handleEnquireClick}
                        className="mt-4 px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
                    >
                        Enquire Now
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;