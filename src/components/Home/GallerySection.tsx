"use client";

import React from 'react';
import Image from 'next/image';

interface GalleryImage {
    src: string;
    alt: string;
}

const galleryImages: GalleryImage[] = [
    { src: '/images/rabbits.png', alt: 'Two Rabbits' },
    { src: '/images/birds3.png', alt: 'Three Budgies' },
    { src: '/images/cat3.png', alt: 'Cat with Sunglasses' },
    { src: '/images/cat3.png', alt: 'Cat with Sunglasses' },
    { src: '/images/cat3.png', alt: 'Cat with Sunglasses' },
    { src: '/images/cat3.png', alt: 'Cat with Sunglasses' },
];

const GallerySection = () => {
    const handleViewMore = () => {
        window.location.href = '/gallery';
    };

    return (
        <div className="bg-white py-12" id="gallery">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-semibold text-green-600 mb-8">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {galleryImages.map((image, index) => (
                        <div key={index} className="rounded-xl overflow-hidden shadow-md">
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
        </div>
    );
};

export default GallerySection;
