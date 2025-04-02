"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
    description: "Loyal, loving, and full of energy! Discover a variety of dog breeds, from playful puppies to devoted companions.",
    imageSrc: "/LabradorRetriever.jpg",
    imageAlt: "Dogs",
    link: "/productss",
  },
  {
    title: "Birds",
    description: "Brighten your home with the charm of exotic birds! From melodious songbirds to vibrant parrots, find your perfect feathered friend.",
    imageSrc: "/budgies.jpg",
    imageAlt: "Birds",
    link: "/productss",
  },
  {
    title: "Cats",
    description: "Graceful, independent, and affectionate! Choose from adorable kittens to majestic cats, all waiting for a loving home.",
    imageSrc: "/Cat.jpeg",
    imageAlt: "Cats",
    link: "/productss",
  },
  {
    title: "Small Fish",
    description: "Transform your space with a stunning aquatic world! Explore our collection of vibrant freshwater and saltwater fish.",
    imageSrc: "/Mollies.jpg",
    imageAlt: "Small Fish",
    link: "/productss",
  },
];

const PetCategoriesSection = () => {
  const router = useRouter();

  return (
    <section className="bg-gray-50 py-12 md:py-16 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-green-600 bg-green-100 rounded-full mb-3">
            Our Companions
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Meet Our Pets</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find your perfect pet companion from our carefully selected animals
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {petCategories.map((category, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => router.push(category.link)}
            >
              <div className="relative h-60 md:h-72 overflow-hidden">
                <Image
                  src={category.imageSrc}
                  alt={category.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-200 text-sm">{category.description}</p>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800 backdrop-blur-sm">
                  Popular
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PetCategoriesSection;