'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutUsSection = () => {
    const aboutUsText = `Welcome to Exotic Birds, your one-stop destination for rare and beautiful pets! From vibrant parrots to exotic reptiles and small mammals, we provide expert guidance, high-quality supplies, and a caring community for responsible pet ownership`;

    return (
        <div className="bg-white py-12 px-4 sm:px-6 lg:px-12" id="about">
            <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
                
                <motion.div 
                    className="w-full md:w-1/2 text-center md:text-left"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-green-700 mb-4 sm:mb-6">About Us</h2>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{aboutUsText}</p>
                </motion.div>

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
