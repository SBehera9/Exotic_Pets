"use client";

import React from "react";
import Image from "next/image";

interface PetCategory {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  link: string;
}

const petCategories: PetCategory[] = [
  {
    title: "Dogs",
    description:
      "Find the perfect canine companion! We offer a variety of dog breeds, from playful puppies to loyal adult dogs.",
    imageSrc: "/Dog.jpeg",
    imageAlt: "Dogs",
    link: "/dogs",
  },
  {
    title: "Birds",
    description:
      "Add a touch of color and song to your life! Explore our range of beautiful birds, from finches to parrots.",
    imageSrc: "/Birds.jpeg",
    imageAlt: "Birds",
    link: "/birds",
  },
  {
    title: "Cats",
    description:
      "Discover your purrfect feline friend! Our selection includes cuddly kittens and graceful adult cats, all ready for a loving home.",
    imageSrc: "/Cat.jpeg",
    imageAlt: "Cats",
    link: "/cats",
  },
  {
    title: "Small Fish",
    description:
      "Create a mesmerizing underwater world! We have a diverse collection of colorful freshwater and saltwater fish.",
    imageSrc: "/Fish.jpeg",
    imageAlt: "Small Fish",
    link: "/fish",
  },
];

const PetCategoriesSection = () => {
  const handleViewMore = () => {
    window.location.href = "/all-pets";
  };

  return (
    <div className="bg-white py-12 md:py-16" id="pet-categories">
      <div className="container mx-auto text-center px-4 sm:px-6 md:px-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-green-600 mb-6 md:mb-8">
          Pets
        </h2>

        {/* Added padding using px-4 (mobile), sm:px-6 (tablet), md:px-8 (larger screens) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {petCategories.map((category, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center transform transition-transform hover:scale-110"
            >
              <div className="w-full max-w-[250px] h-[200px] md:h-[250px] bg-gray-100 shadow-md rounded-lg overflow-hidden relative">
                <Image
                  src={category.imageSrc}
                  alt={category.imageAlt}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mt-3 md:mt-4 text-center">
                {category.title}
              </h3>
              <p className="text-gray-600 text-center text-sm">
                {category.description}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={handleViewMore}
          className="mt-6 md:mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default PetCategoriesSection;
