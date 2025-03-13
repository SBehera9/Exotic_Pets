'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Product {
    name: string;
    imageSrc: string;
}

const products: Product[] = [
    { name: 'Beagle Puppies', imageSrc: '/images/beagle.png' },
    { name: 'Persian Cat', imageSrc: '/images/persian_cat.png' },
    { name: 'Pug Puppies', imageSrc: '/images/pug_puppies.png' },
    { name: 'Parrot', imageSrc: '/images/parrot.png' },
    { name: 'Rabbit', imageSrc: '/images/rabbit2.png' },
    { name: 'Hamster', imageSrc: '/images/hamster.png' },
    { name: 'Golden Retriever', imageSrc: '/images/golden_retriever.png' },
    { name: 'Siamese Cat', imageSrc: '/images/siamese_cat.png' },
    { name: 'French Bulldog', imageSrc: '/images/french_bulldog.png' },
    { name: 'Cockatiel', imageSrc: '/images/cockatiel.png' },
    { name: 'Guinea Pig', imageSrc: '/images/guinea_pig.png' },
    { name: 'Chinchilla', imageSrc: '/images/chinchilla.png' },
];

const ProductCarousel = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleViewMore = () => {
        router.push('/next-page');
    };

    return (
        <div className="bg-gray-100 py-12" id="products">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold text-green-700 mb-8">Products</h2>
                <div className="relative max-w-6xl mx-auto">
                    <div
                        ref={carouselRef}
                        className="flex overflow-x-auto scroll-smooth gap-6 py-4 px-4 scrollbar-hide"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {products.map((product, index) => (
                            <div key={index} className="w-64 flex-shrink-0">
                                <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 transform transition-transform duration-300 hover:scale-105">
                                    <Image
                                        src={product.imageSrc}
                                        alt={product.name}
                                        width={256}
                                        height={200}
                                        objectFit="contain"
                                        className="mx-auto rounded-lg mb-4"
                                    />
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{product.name}</h3>
                                    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg flex items-center justify-center w-full transition-all duration-300 shadow-md hover:shadow-lg">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
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

export default ProductCarousel;