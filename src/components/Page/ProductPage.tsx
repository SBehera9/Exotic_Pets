"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: "dog" | "cat" | "birds" | "fish" | "fishFood";
  quantity?: number;
}

const ProductPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [productsToDisplay, setProductsToDisplay] = useState<Product[]>([]);

  const DOG_DATA: Product[] = [
    {
      id: 7,
      name: "Golden Retriever Puppy",
      price: 15000,
      description: "A playful and energetic golden retriever puppy.",
      imageUrl: "/golden_retriever_puppy.jpg",
      category: "dog",
    },
    {
      id: 10,
      name: "Labrador Puppy",
      price: 12000,
      description: "A friendly and loyal Labrador puppy.",
      imageUrl: "/labrador_puppy.jpg",
      category: "dog",
    },
    {
      id: 14,
      name: "Dog Food Pack",
      price: 800,
      description: "Nutritious food pack for dogs.",
      imageUrl: "/Dog_Food.jpeg",
      category: "dog",
    },
  ];

  const CAT_DATA: Product[] = [
    {
      id: 8,
      name: "Siamese Kitten",
      price: 8000,
      description: "A beautiful and intelligent Siamese kitten.",
      imageUrl: "/siamese_kitten.jpg",
      category: "cat",
    },
    {
      id: 11,
      name: "Persian Cat",
      price: 10000,
      description: "A fluffy and affectionate Persian cat.",
      imageUrl: "/persian_cat.jpg",
      category: "cat",
    },
    {
      id: 15,
      name: "Cat Food Pack",
      price: 700,
      description: "Delicious and nutritious cat food.",
      imageUrl: "/cat_food.jpg",
      category: "cat",
    },
  ];

  const BIRD_DATA: Product[] = [
    {
      id: 1,
      name: "Zebra Finches",
      price: 400,
      description: "",
      imageUrl: "/zebrafinch.jpg",
      category: "birds",
    },
    {
      id: 2,
      name: "Cockatiel",
      price: 2000,
      description: "A friendly bird that loves to sing.",
      imageUrl: "/cockatiel.jpg",
      category: "birds",
    },
    {
      id: 3,
      name: "Budgies",
      price: 400,
      description: "A small and affectionate companion bird.",
      imageUrl: "/budgies.jpg",
      category: "birds",
    },
    {
      id: 4,
      name: "Small Conure",
      price: 400,
      description: "A small and affectionate companion bird.",
      imageUrl: "/greencheekedconure.jpg",
      category: "birds",
    },
    {
      id: 5,
      name: "Parrotlets",
      price: 400,
      description: "A small and affectionate companion bird.",
      imageUrl: "/parrotlets.jpg",
      category: "birds",
    },
    {
      id: 6,
      name: "Suncouner",
      price: 400,
      description: "A small and affectionate companion bird.",
      imageUrl: "/conure.jpeg",
      category: "birds",
    },
  ];

  const FISH_DATA: Product[] = [
    {
      id: 9,
      name: "Betta Fish",
      price: 500,
      description: "A vibrant and colorful Betta fish.",
      imageUrl: "/betta_fish.jpg",
      category: "fish",
    },
    {
      id: 12,
      name: "Goldfish",
      price: 200,
      description: "A classic and easy-to-care-for goldfish.",
      imageUrl: "/goldfish.jpg",
      category: "fish",
    },
    {
      id: 16,
      name: "Fish Flakes",
      price: 300,
      description: "Essential flakes for aquarium fish.",
      imageUrl: "/fish_flakes.jpg",
      category: "fishFood",
    },
  ];

  const FISH_FOOD_DATA: Product[] = [
    {
      id: 13,
      name: "Bird Seed Mix",
      price: 500,
      description: "A healthy seed mix for all birds.",
      imageUrl: "/Birds_Food.jpg",
      category: "fishFood",
    },
  ];

  const shuffleArray = (array: Product[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const getFilteredProducts = (category: string): Product[] => {
    let allProducts: Product[] = [];

    if (category === "all") {
      allProducts = shuffleArray([
        ...DOG_DATA,
        ...CAT_DATA,
        ...BIRD_DATA,
        ...FISH_DATA,
        ...FISH_FOOD_DATA,
      ]);
    } else if (category === "dog") {
      allProducts = DOG_DATA;
    } else if (category === "cat") {
      allProducts = CAT_DATA;
    } else if (category === "birds") {
      allProducts = BIRD_DATA;
    } else if (category === "fish") {
      allProducts = FISH_DATA;
    } else if (category === "fishFood") {
      allProducts = FISH_FOOD_DATA;
    } else {
      allProducts = []; // Handle unexpected categories
    }

    return allProducts;
  };

  useEffect(() => {
    setProductsToDisplay(getFilteredProducts(selectedCategory));
  }, [selectedCategory]); // This effect runs whenever selectedCategory changes

  const filterCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const addToCart = (product: Product) => {
    const cartString = localStorage.getItem("cart");
    const cart: Product[] = cartString ? JSON.parse(cartString) : [];

    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 0) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="container mx-auto py-10 px-4 bg-white">
      <h2 className="text-3xl font-extrabold text-green-600 mb-8 text-center">
        Our Products
      </h2>

      <div className="flex justify-center gap-2 mb-6 overflow-x-auto">
        <button
          className={`px-3 py-2 rounded text-sm md:text-base ${
            selectedCategory === "all"
              ? "bg-green-500 text-white"
              : "bg-green-300 text-green-900"
          }`}
          onClick={() => filterCategory("all")}
        >
          All Products
        </button>
        <button
          className={`px-3 py-2 rounded text-sm md:text-base ${
            selectedCategory === "dog"
              ? "bg-green-500 text-white"
              : "bg-green-300 text-green-900"
          }`}
          onClick={() => filterCategory("dog")}
        >
          Dogs
        </button>
        <button
          className={`px-3 py-2 rounded text-sm md:text-base ${
            selectedCategory === "cat"
              ? "bg-green-500 text-white"
              : "bg-green-300 text-green-900"
          }`}
          onClick={() => filterCategory("cat")}
        >
          Cats
        </button>
        <button
          className={`px-3 py-2 rounded text-sm md:text-base ${
            selectedCategory === "birds"
              ? "bg-green-500 text-white"
              : "bg-green-300 text-green-900"
          }`}
          onClick={() => filterCategory("birds")}
        >
          Birds
        </button>
        <button
          className={`px-3 py-2 rounded text-sm md:text-base ${
            selectedCategory === "fish"
              ? "bg-green-500 text-white"
              : "bg-green-300 text-green-900"
          }`}
          onClick={() => filterCategory("fish")}
        >
          Fish
        </button>
        <button
          className={`px-3 py-2 rounded text-sm md:text-base ${
            selectedCategory === "fishFood"
              ? "bg-green-500 text-white"
              : "bg-green-300 text-green-900"
          }`}
          onClick={() => filterCategory("fishFood")}
        >
          Fish Food
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {productsToDisplay.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-xl shadow-lg bg-white flex flex-col overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out"
          >
            <div className="h-48 md:h-56 w-full relative">
              <Image
                src={product.imageUrl}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl"
              />
            </div>

            <div className="flex flex-col flex-grow p-4 md:p-5">
              <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
              <p className="text-green-600 font-bold text-lg">
                Rs. {product.price}
              </p>
              <p className="text-gray-600 mt-1 text-sm">{product.description}</p>

              <div className="mt-auto">
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;