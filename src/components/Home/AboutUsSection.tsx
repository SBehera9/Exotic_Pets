'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutUsSection = () => {
    const aboutUsText = `Welcome to Exotic Birds, your one-stop destination for rare and beautiful pets! From vibrant parrots to exotic reptiles and small mammals, we provide expert guidance, high-quality supplies, and a caring community for responsible pet ownership.`;

    return (
        <div className="bg-gradient-to-b from-white to-green-50 py-16 px-4 sm:px-6 lg:px-20" id="about">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-green-800 mb-3">
                        About <span className="text-green-600">Our Story</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-green-500 mx-auto rounded-full" />
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    <motion.div 
                        className="w-full lg:w-1/2 relative"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="/Pet.png"
                                alt="Happy pets"
                                width={600}
                                height={450}
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 hidden lg:block">
                            <div className="bg-green-600 text-white p-4 rounded-lg shadow-lg max-w-xs">
                                <div className="flex items-center">
                                    <div className="bg-green-500 p-2 rounded-full mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p className="font-medium">Trusted by 5000+ pet lovers</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
                            Bringing joy to pet lovers since 2010
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            {aboutUsText}
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                                <h4 className="font-bold text-green-700 mb-2">500+</h4>
                                <p className="text-gray-600 text-sm">Happy Customers</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                                <h4 className="font-bold text-green-700 mb-2">50+</h4>
                                <p className="text-gray-600 text-sm">Exotic Species</p>
                            </div>
                        </div>
                        <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center">
                            Learn More
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsSection;