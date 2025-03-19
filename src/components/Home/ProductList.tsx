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
];

const ourFoods: ProductData[] = [
  { id: 1, name: "Burger", imageUrl: "/images/burger.jpg", price: 120, description: "Delicious chicken burger.", category: "Foods" },
  { id: 2, name: "Pizza", imageUrl: "/images/pizza.jpg", price: 300, description: "Cheesy pepperoni pizza.", category: "Foods" },
  { id: 3, name: "Pasta", imageUrl: "/images/pasta.jpg", price: 250, description: "Creamy Alfredo pasta.", category: "Foods" },
  { id: 4, name: "French Fries", imageUrl: "/images/fries.jpg", price: 100, description: "Crispy golden fries.", category: "Foods" },
];

const ProductList: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("Products");

  return (
    <div className="container mx-auto p-4">

      <h2 className="text-xl font-bold text-gray-800 mb-4">Choose Category</h2>

      <div className="flex gap-4 mb-6">
        <button 
          className={`py-2 px-4 rounded font-bold ${activeSection === "Products" ? "bg-blue-700 text-white" : "bg-blue-500 text-white"}`}
          onClick={() => setActiveSection("Products")}
        >
          Our Products
        </button>
        <button 
          className={`py-2 px-4 rounded font-bold ${activeSection === "Foods" ? "bg-green-700 text-white" : "bg-green-500 text-white"}`}
          onClick={() => setActiveSection("Foods")}
        >
          Our Foods
        </button>
      </div>

      {activeSection === "Products" && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Our Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ourProducts.map((product) => (
              <Product key={product.id} {...product} />
            ))}
          </div>
        </div>
      )}

      {activeSection === "Foods" && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Our Foods</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ourFoods.map((product) => (
              <Product key={product.id} {...product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
