'use client';

import React, { useRef, useState } from 'react';
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

    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
    const [orderComplete, setOrderComplete] = useState(false);

    // Open modal and set product name
    const handleBuyNow = (productName: string) => {
        setSelectedProduct(productName);
        setShowModal(true);
        setOrderComplete(false); // Reset order completion message
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Order Details:', { product: selectedProduct, ...formData });
        
        // Show order completion message
        setOrderComplete(true);

        // Clear form fields after 2 seconds
        setTimeout(() => {
            setShowModal(false);
            setFormData({ name: '', phone: '', address: '' });
        }, 2000);
    };

    return (
        <div className="bg-green-100 py-12" id="products">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold text-green-700 mb-8">Products</h2>
                <div className="relative max-w-6xl mx-auto">
                    <div
                        ref={carouselRef}
                        className="flex overflow-x-auto scroll-smooth gap-4 py-4 px-4 scrollbar-hide"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {products.map((product, index) => (
                            <div key={index} className="flex-shrink-0 w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                                <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 flex flex-col items-center justify-between h-full">
                                    <Image
                                        src={product.imageSrc}
                                        alt={product.name}
                                        width={200}
                                        height={200}
                                        className="rounded-lg object-cover w-full h-48"
                                    />
                                    <h3 className="text-lg font-semibold text-gray-800 text-center">{product.name}</h3>
                                    <button 
                                        onClick={() => handleBuyNow(product.name)}
                                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg w-full transition-all duration-300 shadow-md hover:shadow-lg"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-4 text-gray-600 hover:text-gray-900 text-2xl"
                        >
                            &times;
                        </button>

                        {orderComplete ? (
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-green-700 mb-4">Your order is complete!</h2>
                                <p className="text-gray-600">Thank you for shopping with us.</p>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
                                    {selectedProduct}
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="w-full px-4 py-2 border rounded-lg text-black"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                        className="w-full px-4 py-2 border rounded-lg text-black"
                                    />
                                    <textarea
                                        placeholder="Address"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        required
                                        className="w-full px-4 py-2 border rounded-lg text-black"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
                                    >
                                        Buy Now
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductCarousel;
