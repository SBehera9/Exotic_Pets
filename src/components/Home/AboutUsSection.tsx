'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutUsSection = () => {
    const aboutUsText = `Welcome to Exotic Birds, your premier destination for rare and beautiful pets! Founded in 2020, we've grown from a small exotic bird shop to a comprehensive exotic pet emporium. Our team of passionate experts provides exceptional care for vibrant parrots, exotic reptiles, and small mammals. We're committed to responsible pet ownership through education, high-quality supplies, and a supportive community.`;

    const stats = [
        { value: "14+", label: "Years Experience", icon: "🦜" },
        { value: "5000+", label: "Happy Customers", icon: "😊" },
        { value: "200+", label: "Exotic Species", icon: "🐍" },
        { value: "24/7", label: "Expert Support", icon: "📞" }
    ];

    return (
        <div className="bg-gradient-to-b from-white to-emerald-50 py-20 px-4 sm:px-6 lg:px-8" id="about">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        Our <span className="text-emerald-600">Passion</span> For <span className="text-gray-900">Exotics</span>
                    </h2>
                    <motion.div 
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="w-32 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto rounded-full mb-8"
                    />
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        Discover the story behind our love for exotic pets and our commitment to their care
                    </motion.p>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <motion.div 
                        className="w-full lg:w-1/2 relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "backOut" }}
                        viewport={{ once: true }}
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                            <div className="aspect-w-16 aspect-h-12 overflow-hidden rounded-3xl">
                                <Image
                                    src="/gif.gif"
                                    alt="Happy exotic pets"
                                    width={800}
                                    height={600}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
                                    priority
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 via-emerald-800/20 to-transparent" />
                            
                            <motion.div
                                initial={{ scale: 0, rotate: -15 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.8, type: "spring", stiffness: 150 }}
                                className="absolute -bottom-5 -right-5 hidden lg:block"
                                viewport={{ once: true }}
                            >
                                <div className="bg-white text-emerald-900 p-4 rounded-xl shadow-xl max-w-xs border-2 border-emerald-100 backdrop-blur-sm bg-opacity-90">
                                    <div className="flex items-start">
                                        <motion.div
                                            initial={{ rotate: -20 }}
                                            animate={{ rotate: [0, -10, 0] }}
                                            transition={{ 
                                                repeat: Infinity,
                                                repeatType: "reverse",
                                                duration: 2,
                                                ease: "easeInOut"
                                            }}
                                            className="bg-emerald-100 p-3 rounded-lg mr-3 flex-shrink-0"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </motion.div>
                                        <div>
                                            <p className="font-semibold text-emerald-800">Certified Exotic Animal Specialists</p>
                                            <p className="text-sm text-gray-600 mt-1">Trusted by pet lovers worldwide</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mb-4"
                        >
                            <span className="inline-block bg-emerald-100 text-emerald-800 text-sm font-semibold px-4 py-1.5 rounded-full shadow-sm">
                                Since 2020
                            </span>
                        </motion.div>
                        
                        <motion.h3 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight"
                        >
                            More Than Just Pets — <span className="text-emerald-600">A Lifestyle</span>
                        </motion.h3>
                        
                        <motion.p 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-gray-600 text-lg leading-relaxed mb-8"
                        >
                            {aboutUsText}
                        </motion.p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 + index * 0.15, type: "spring" }}
                                    viewport={{ once: true }}
                                    className="bg-white p-4 rounded-xl shadow-sm border border-emerald-50 hover:border-emerald-100 transition-all duration-300 hover:shadow-md group"
                                >
                                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                                        {stat.icon}
                                    </div>
                                    <h4 className="font-bold text-emerald-700 text-2xl mb-1">{stat.value}</h4>
                                    <p className="text-gray-600 text-sm">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsSection;