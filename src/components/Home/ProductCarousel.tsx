'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Product {
    name: string;
    imageSrc: string;
}

const products: Product[] = [
    { name: 'Beagle Puppies', imageSrc: '/Beagle.jpeg' },
    { name: 'Persian Cat', imageSrc: '/PersianCat.jpg' },
    { name: 'Pomerian', imageSrc: '/Pomerian.jpeg' },
    { name: 'Labrador Retriever', imageSrc: '/LabradorRetriever.jpg' },
    { name: 'Rabbit', imageSrc: '/Rabbit.jpeg' },
    { name: 'Hamster', imageSrc: '/Hamster.jpeg' },
    { name: 'Golden Retriever', imageSrc: '/goldenretriever.jpg' },
    { name: 'Cockatiel', imageSrc: '/cockatiel.jpg' },
    { name: 'Guinea Pig', imageSrc: '/Guineapig.jpeg' },
];

const ProductCarousel = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleViewMore = () => {
        router.push('/next-page');
    };

    return (
        <div className="bg-green-100 py-12" id="products">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold text-green-700 mb-8">Products</h2>
                <div className="relative max-w-6xl mx-auto">
                    <div
                        ref={carouselRef}
                        className="flex overflow-x-auto scroll-smooth gap-6 py-4 px-4 scrollbar-hide"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {products.map((product, index) => (
                            <div key={index} className="w-64 h-80 flex-shrink-0">
                                <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 flex flex-col items-center justify-between h-full">
                                <Image
    src={product.imageSrc}
    alt={product.name}
    width={200}
    height={200}
    className="rounded-lg object-cover w-full h-48"
/>

                                    <h3 className="text-lg font-semibold text-gray-800 text-center">{product.name}</h3>
                                    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg w-full transition-all duration-300 shadow-md hover:shadow-lg">
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
