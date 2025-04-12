"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const handleViewMore = () => {
  window.location.href = "/productss";
};

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
    <section className="bg-gradient-to-br from-emerald-50 to-cyan-50 py-12 md:py-16 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Meet <span className="text-green-600">Our</span> 
            <span className="text-gray-900"> Pets</span>
          </motion.h2>
          <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="w-32 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto rounded-full mb-8"
          />
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Find your perfect pet companion from our carefully selected animals
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {petCategories.map((category, index) => (
            <motion.div
              key={index}
              className="group relative bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md overflow-hidden hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => router.push(category.link)}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden">
                <Image
                  src={category.imageSrc}
                  alt={category.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  priority={index < 2} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 text-white">
                  <h3 className="text-lg sm:text-xl font-bold mb-1 line-clamp-1">{category.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-200 line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </div>
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                
                <span 
                onClick={handleViewMore}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/90 hover:bg-green-600 text-gray-800 hover:text-white backdrop-blur-sm">
                  Popular
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <></>
    </section>
  );
};

export default PetCategoriesSection;