"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: "pets" | "petFood";
  quantity?: number; 
}

const ProductPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const pets: Product[] = [
    {
      id: 1,
      name: "Zebra Finches",
      price: 400,
      description: "",
      imageUrl: "/zebrafinch.jpg",
      category: "pets",
    },
    {
      id: 2,
      name: "Cockatiel",
      price: 2000,
      description: "A friendly bird that loves to sing.",
      imageUrl: "/cockatiel.jpg",
      category: "pets",
    },
    {
      id: 3,
      name: "Budgies",
      price: 400,
      description: "A small and affectionate companion bird.",
      imageUrl: "/budgies.jpg",
      category: "pets",
    },
    {
        id: 4,
        name: "Small Conure",
        price: 400,
        description: "A small and affectionate companion bird.",
        imageUrl: "/greencheekedconure.jpg",
        category: "pets",
    },
    {
        id: 5,
        name: "Parrotlets",
        price: 400,
        description: "A small and affectionate companion bird.",
        imageUrl: "/parrotlets.jpg",
        category: "pets",
    },
    {
        id: 6,
        name: "Suncouner",
        price: 400,
        description: "A small and affectionate companion bird.",
        imageUrl: "/conure.jpeg",
        category: "pets",
    },
  ];

  const petFood: Product[] = [
    {
      id: 4,
      name: "Bird Seed Mix",
      price: 500,
      description: "A healthy seed mix for all birds.",
      imageUrl: "/Birds_Food.jpg",
      category: "petFood",
    },
    {
      id: 5,
      name: "Dog Food Pack",
      price: 800,
      description: "Nutritious food pack for dogs.",
      imageUrl: "/Dog_Food.jpeg",
      category: "petFood",
    },
  ];

  const shuffleArray = (array: Product[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const getFilteredProducts = () => {
    if (selectedCategory === "all") {
      return shuffleArray([...pets, ...petFood]);
    } else if (selectedCategory === "pets") {
      return pets;
    } else if (selectedCategory === "petFood") {
      return petFood;
    }
    return [];
  };

  const productsToDisplay = getFilteredProducts();

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
      <h2 className="text-3xl font-extrabold text-green-600 mb-8 text-center">Our Products</h2>

      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            selectedCategory === "all" ? "bg-green-500 text-white" : "bg-green-300 text-green-900"
          }`}
          onClick={() => filterCategory("all")}
        >
          All Products
        </button>
        <button
          className={`px-4 py-2 rounded ${
            selectedCategory === "pets" ? "bg-green-500 text-white" : "bg-green-300 text-green-900"
          }`}
          onClick={() => filterCategory("pets")}
        >
          Pets
        </button>
        <button
          className={`px-4 py-2 rounded ${
            selectedCategory === "petFood"
              ? "bg-green-500 text-white" : "bg-green-300 text-green-900"
          }`}
          onClick={() => filterCategory("petFood")}
        >
          Pet Food
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {productsToDisplay.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-xl shadow-lg bg-white flex flex-col overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out"
          >
            <div className="h-56 w-full relative">
              <Image
                src={product.imageUrl}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl"
              />
            </div>

            <div className="flex flex-col flex-grow p-5">
              <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
              <p className="text-green-600 font-bold text-lg">
                Rs. {product.price}
              </p>
              <p className="text-gray-600 mt-1 text-sm">{product.description}</p>

              <div className="mt-auto">
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out"
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