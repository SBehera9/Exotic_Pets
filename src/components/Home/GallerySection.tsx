"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
    src: string;
    alt: string;
}

const galleryImages: GalleryImage[] = [
    { src: '/Bird1.png', alt: 'Two Rabbits' },
    { src: '/Dog2.png', alt: 'Three Budgies' },
    { src: '/Fish2.png', alt: 'Cat with Sunglasses' },
    { src: '/Fish3.png', alt: 'Cat with Sunglasses' },
    { src: '/Bird2.jpg', alt: 'Cat with Sunglasses' },
    { src: '/Bird3.jpg', alt: 'Cat with Sunglasses' },
];

const GallerySection = () => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleViewMore = () => {
        window.location.href = '/';
    };

    const openModal = (index: number) => {
        setSelectedIndex(index);
    };

    const closeModal = () => {
        setSelectedIndex(null);
    };

    const nextImage = () => {
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : 0));
    };

    const prevImage = () => {
        setSelectedIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : 0));
    };

    return (
        <div className="bg-white py-12" id="gallery">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-semibold text-green-600 mb-8">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {galleryImages.map((image, index) => (
                        <div 
                            key={index} 
                            className="rounded-xl overflow-hidden shadow-md cursor-pointer"
                            onClick={() => openModal(index)}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={500}
                                height={300}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                <button 
                    onClick={handleViewMore} 
                    className="mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    View More
                </button>
            </div>

            {/* Lightbox Modal */}
            {selectedIndex !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="relative max-w-4xl w-full">
                        {/* Close Button */}
                        <button onClick={closeModal} className="absolute top-4 right-4 text-white text-3xl">
                            <X size={30} />
                        </button>

                        {/* Image Display */}
                        <Image
                            src={galleryImages[selectedIndex].src}
                            alt={galleryImages[selectedIndex].alt}
                            width={800}
                            height={500}
                            className="w-full h-auto rounded-lg"
                        />

                        {/* Navigation Arrows */}
                        <button 
                            onClick={prevImage} 
                            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl"
                        >
                            <ChevronLeft size={40} />
                        </button>

                        <button 
                            onClick={nextImage} 
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl"
                        >
                            <ChevronRight size={40} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GallerySection;
