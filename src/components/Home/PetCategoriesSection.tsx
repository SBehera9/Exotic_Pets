import React from 'react';
import Image from 'next/image';

interface PetCategory {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const petCategories: PetCategory[] = [
  {
    title: 'Dogs',
    description: 'Our goal is to find a puppy as enjoyable as owning one. Take your pick from the large collection of puppies & dogs in our store.',
    imageSrc: '/images/dog.png',
    imageAlt: 'Cute Pug Puppy',
  },
  {
    title: 'Cats',
    description: 'Cats are huge in size, rich colouring, double boned, with perfect looks. We offer a perfect platform to purchase cats.',
    imageSrc: '/images/cat.png',
    imageAlt: 'Grey Tabby Cat',
  },
  {
    title: 'Birds',
    description: 'Let the mornings start with their beautiful chirping. We offer all size and type of exotic birds for sale, which surely will your life incredible.',
    imageSrc: '/images/birds.png',
    imageAlt: 'Two Bluebirds',
  },
  {
    title: 'Small Pets',
    description: 'Cute, cuddly and furry friends from our small animal collection will warm your heart! They\'re smart, interactive and fun to watch!',
    imageSrc: '/images/rabbit.png',
    imageAlt: 'White Rabbit',
  },
];

const PetCategoriesSection = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-green-600 mb-8">Pets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {petCategories.map((category, index) => (
            <div key={index} className="relative">
              {/* Heart Background (Placeholder) */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/heart.png"  // Replace with your heart image
                  alt=""
                  layout="fill"
                  objectFit="contain"
                  quality={75}
                />
              </div>

              <div className="relative z-10 p-4">
                <Image
                  src={category.imageSrc}
                  alt={category.imageAlt}
                  width={200}  // Adjust as needed
                  height={200} // Adjust as needed
                  objectFit="contain"
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.title}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetCategoriesSection;