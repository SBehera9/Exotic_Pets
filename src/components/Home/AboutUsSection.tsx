'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutUsSection = () => {
    const aboutUsText = `Welcome to Exotic Birds, your ultimate destination for discovering and caring for exotic pets! We are passionate about unique and extraordinary animals, from vibrant reptiles and rare amphibians to fascinating small mammals and tropical birds.

    At Exotic Birds, we aim to provide pet lovers with expert advice, high-quality pet supplies, and a community dedicated to responsible exotic pet care. Whether you're a seasoned pet owner or just beginning your journey with an exotic companion, we're here to guide you every step of the way.
    
    Join us in celebrating the beauty and wonder of exotic pets—because every creature deserves a loving home!`;

    return (
        <div className="bg-white py-12 px-4 sm:px-6 lg:px-12" id="about">
            <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
                
                {/* Text Section */}
                <motion.div 
                    className="w-full md:w-1/2 text-center md:text-left"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-green-700 mb-4 sm:mb-6">About Us</h2>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{aboutUsText}</p>
                </motion.div>

                {/* Image Section */}
                <motion.div 
                    className="w-full md:w-1/2 flex justify-center"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Image
                        src="/Pet.png"
                        alt="Dog and Cat"
                        width={500}
                        height={350}
                        className="max-w-full h-auto rounded-lg"
                    />
                </motion.div>

            </div>
        </div>
    );
};

export default AboutUsSection;
