"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: "pets" | "petFood";
}

const ProductPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const pets: Product[] = [
    { id: 1, name: "Macaw Parrot", price: 5000, imageUrl: "/macaw.jpg", category: "pets" },
    { id: 2, name: "Cockatiel", price: 2000, imageUrl: "/cockatiel.jpg", category: "pets" },
    { id: 3, name: "Lovebird", price: 1500, imageUrl: "/lovebird.jpg", category: "pets" },
  ];

  const petFood: Product[] = [
    { id: 4, name: "Bird Seed Mix", price: 500, imageUrl: "/birdfood.jpg", category: "petFood" },
    { id: 5, name: "Dog Food Pack", price: 800, imageUrl: "/dogfood.jpg", category: "petFood" },
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
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingItem = cart.find((item: Product) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Our Products</h2>

      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${selectedCategory === "all" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => filterCategory("all")}
        >
          All Products
        </button>
        <button
          className={`px-4 py-2 rounded ${selectedCategory === "pets" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => filterCategory("pets")}
        >
          Pets
        </button>
        <button
          className={`px-4 py-2 rounded ${selectedCategory === "petFood" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => filterCategory("petFood")}
        >
          Pet Food
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {productsToDisplay.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-md bg-white flex flex-col overflow-hidden"
          >
            <div className="h-48 w-full relative">
              <Image
                src={product.imageUrl}
                alt={product.name}
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div className="flex flex-col flex-grow p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-green-600 font-bold mb-4">Rs. {product.price}</p>

              <div className="mt-auto">
                <button
                  onClick={() => addToCart(product)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
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
