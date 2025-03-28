"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PetFood {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  link: string;
}

const petFoods: PetFood[] = [
  {
    title: "Dog Food",
    description: "Premium nutrition for your furry companion! Choose from high-quality dry kibble, wet food, and special diet options.",
    imageSrc: "/Dog_Food.jpeg",
    imageAlt: "Dog Food",
    link: "/dog-food",
  },
  {
    title: "Bird Food",
    description: "Give your birds the best! Nutritious seed mixes, pellets, and treats to keep them happy, healthy, and full of energy.",
    imageSrc: "/Birds_Food.jpg",
    imageAlt: "Bird Food",
    link: "/bird-food",
  },
  {
    title: "Cat Food",
    description: "Tasty and wholesome meals for your feline friend! From crunchy kibble to mouthwatering wet food, perfect for every cat.",
    imageSrc: "/Cat_Food.jpeg",
    imageAlt: "Cat Food",
    link: "/cat-food",
  },
  {
    title: "Fish Food",
    description: "Essential nutrition for a thriving aquarium! High-quality flakes, pellets, and specialized diets for all types of fish.",
    imageSrc: "/Fish_Food.jpeg",
    imageAlt: "Fish Food",
    link: "/fish-food",
  },
];

const PetFoodSection = () => {
  const router = useRouter();

  return (
    <div className="bg-white mt-0 pt-0 pb-16">
      <div className="container mx-auto text-center px-4 sm:px-6 md:px-8">
        <h2 className="text-3xl font-extrabold text-green-600 mb-8">Pet Food</h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {petFoods.map((food, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center transform transition-transform hover:scale-105 cursor-pointer"
              onClick={() => router.push("/product")}
            >
              <div className="w-full max-w-[250px] h-[200px] md:h-[250px] bg-gray-100 shadow-md rounded-lg overflow-hidden">
                <Image
                  src={food.imageSrc}
                  alt={food.imageAlt}
                  width={250}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mt-4 text-center">
                {food.title}
              </h3>
              <p className="text-gray-600 text-center">{food.description}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push("/product")}
          className="mt-4 px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default PetFoodSection;