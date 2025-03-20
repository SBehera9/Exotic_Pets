"use client";

import React, { useState } from "react";
import Product from "./Product";

interface ProductData {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  category: string;
}

const ourProducts: ProductData[] = [
  { id: 1, name: "Laptop", imageUrl: "/images/laptop.jpg", price: 50000, description: "High-performance laptop.", category: "Electronics" },
  { id: 2, name: "Smartphone", imageUrl: "/images/phone.jpg", price: 30000, description: "Latest smartphone model.", category: "Electronics" },
  { id: 3, name: "Headphones", imageUrl: "/images/headphones.jpg", price: 5000, description: "Noise-canceling headphones.", category: "Electronics" },
  { id: 4, name: "Smartwatch", imageUrl: "/images/watch.jpg", price: 10000, description: "Fitness tracking smartwatch.", category: "Electronics" },
  { id: 5, name: "Tablet", imageUrl: "/images/tablet.jpg", price: 25000, description: "Portable tablet device.", category: "Electronics" },
  { id: 6, name: "Camera", imageUrl: "/images/camera.jpg", price: 40000, description: "Digital camera with high resolution.", category: "Electronics" },
];

const ourFoods: ProductData[] = [
  { id: 7, name: "Burger", imageUrl: "/images/burger.jpg", price: 120, description: "Delicious chicken burger.", category: "Foods" },
  { id: 8, name: "Pizza", imageUrl: "/images/pizza.jpg", price: 300, description: "Cheesy pepperoni pizza.", category: "Foods" },
  { id: 9, name: "Pasta", imageUrl: "/images/pasta.jpg", price: 250, description: "Creamy Alfredo pasta.", category: "Foods" },
  { id: 10, name: "French Fries", imageUrl: "/images/fries.jpg", price: 100, description: "Crispy golden fries.", category: "Foods" },
  { id: 11, name: "Salad", imageUrl: "/images/salad.jpg", price: 150, description: "Fresh and healthy salad.", category: "Foods" },
  { id: 12, name: "Sushi", imageUrl: "/images/sushi.jpg", price: 400, description: "Traditional Japanese sushi.", category: "Foods" },
];

const ProductList: React.FC = () => {
  const [activeSection, setActiveSection] = useState<"Products" | "Foods">("Products");

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose Category</h2>

      <div className="flex gap-4 mb-6">
        <button
          className={`py-2 px-4 rounded font-bold ${activeSection === "Products" ? "bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"} transition duration-200`}
          onClick={() => setActiveSection("Products")}
        >
          Our Products
        </button>
        <button
          className={`py-2 px-4 rounded font-bold ${activeSection === "Foods" ? "bg-green-700 text-white" : "bg-green-500 hover:bg-green-600 text-white"} transition duration-200`}
          onClick={() => setActiveSection("Foods")}
        >
          Our Foods
        </button>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{activeSection === "Products" ? "Our Products" : "Our Foods"}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(activeSection === "Products" ? ourProducts : ourFoods).map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
