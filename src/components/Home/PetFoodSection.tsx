"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
    link: "/productss",
  },
  {
    title: "Bird Food",
    description: "Give your birds the best! Nutritious seed mixes, pellets, and treats to keep them happy, healthy, and full of energy.",
    imageSrc: "/Birds_Food.jpg",
    imageAlt: "Bird Food",
    link: "/productss",
  },
  {
    title: "Cat Food",
    description: "Tasty and wholesome meals for your feline friend! From crunchy kibble to mouthwatering wet food, perfect for every cat.",
    imageSrc: "/Cat_Food.jpeg",
    imageAlt: "Cat Food",
    link: "/productss",
  },
  {
    title: "Fish Food",
    description: "Essential nutrition for a thriving aquarium! High-quality flakes, pellets, and specialized diets for all types of fish.",
    imageSrc: "/Fish_Food.jpeg",
    imageAlt: "Fish Food",
    link: "/productss",
  },
];

const PetFoodSection = () => {
  const router = useRouter();

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-12 md:py-16 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Premium <span className="text-green-600">Pet </span>
            <span className="text-gray-900"> Nutrition</span>
          </motion.h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            High-quality food options tailored to your pet&apos;s specific needs
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {petFoods.map((food, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => router.push(food.link)}
            >
              <div className="relative h-48 md:h-56 overflow-hidden">
                <Image
                  src={food.imageSrc}
                  alt={food.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{food.title}</h3>
                <p className="text-gray-600 mb-4">{food.description}</p>
                <button className="inline-flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors">
                  Shop now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PetFoodSection;