import React from 'react';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images.jpeg"
          alt="Pet Shop Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      <div className="relative z-10 flex h-full items-center justify-center text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-semibold text-gray-700">Fortune Pet Shops</h1>
          <p className="mt-4 text-2xl text-gray-800">Assured Quality & Reliable Products</p>
          <h2 className="mt-4 text-5xl font-bold text-gray-900">Our Pet Shop</h2>
          <button className="mt-8 rounded-full bg-green-500 py-3 px-8 text-lg font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
            Enquire Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;