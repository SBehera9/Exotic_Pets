'use client';

import React from 'react';
import Image from 'next/image';

const AboutUsSection = () => {
  const aboutUsText = `We, Fortune Pet Shops, situated at Malad West, Mumbai, Maharashtra are
  recognised as a home to massive range of globally renowned pets like Cats,
  Dogs, Birds and Rabbits. Our Aim is to Provide a User Friendly, Fun and
  Relaxing Shopping Experience while giving the Best Service Available for
  our Customers and their Pet. We also provide the highest and assured
  quality of different breeds of pets. We also Assist in Buying Puppies and
  Kittens of Pure Breed. We strive to bring joy to you and your pet on a daily
  basis.`;

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Image Section */}
        <div className="md:w-1/2 relative">
          <Image
            src="/images/dog_and_cat.png" // Replace with your image path
            alt="Dog and Cat"
            width={600} // Adjust as needed
            height={400} // Adjust as needed
            objectFit="contain"
            className="mx-auto"
          />
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-semibold text-green-600 mb-4">About Us</h2>
          <p className="text-gray-700">{aboutUsText}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;