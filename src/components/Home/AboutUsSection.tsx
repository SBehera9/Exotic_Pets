'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutUsSection = () => {
    const aboutUsText = `We, Fortune Pet Shops, situated at Malad West, Mumbai, Maharashtra are
    recognised as a home to a massive range of globally renowned pets like Cats,
    Dogs, Birds, and Rabbits. Our aim is to provide a user-friendly, fun, and
    relaxing shopping experience while giving the best service available for
    our customers and their pets. We also provide the highest and assured
    quality of different breeds of pets. We also assist in buying puppies and
    kittens of pure breeds. We strive to bring joy to you and your pet on a daily
    basis.`;

    return (
        <div className="bg-white py-16" id="about">
            <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 px-6">
                <motion.div 
                    className="md:w-1/2 relative"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Image
                        src="/images/dog_and_cat.png"
                        alt="Dog and Cat"
                        width={600}
                        height={400}
                        className="mx-auto rounded-lg shadow-lg"
                    />
                </motion.div>

                <motion.div 
                    className="md:w-1/2 text-center md:text-left"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-4xl font-bold text-green-700 mb-6">About Us</h2>
                    <p className="text-gray-600 text-lg leading-relaxed">{aboutUsText}</p>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutUsSection;