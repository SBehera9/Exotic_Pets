"use client";

import React, { useState } from "react";
import Product from "./Product";

interface ProductData {
  id: number;
  name: string;
  imageUrl: string;
  price: number; // Ensure price is always a number
  description: string;
  category: string;
}

const ourProducts: ProductData[] = [
  { id: 1, name: "Labrador Retriever", imageUrl: "/LabradorRetriever.jpg", price: 15000, description: "Friendly and intelligent breed, perfect for families.", category: "Dog" },
  { id: 2, name: "Macaw", imageUrl: "/Bird6.jpg", price: 150000, description: "Colorful and social parrot known for its intelligence.", category: "Birds" },
  { id: 3, name: "Persian Cat", imageUrl: "/PersianCat.jpg", price: 8000, description: "Elegant and affectionate cat with a luxurious coat.", category: "Cat" },
  { id: 4, name: "Golden Retriever", imageUrl: "/goldenretriever.jpg", price: 15000, description: "Loyal and playful dog, great with kids and families.", category: "Dog" },
  { id: 5, name: "Beta Fish", imageUrl: "/Fish1.jpeg", price: 300, description: "Vibrant and easy-to-care-for fish, perfect for beginners.", category: "Fish" },
  { id: 6, name: "Budgies", imageUrl: "/Bird1.png", price: 350, description: "Small, cheerful birds that make great companions.", category: "Birds" },
];

const ourFoods: ProductData[] = [
  { id: 7, name: "Dog Food", imageUrl: "/Dog_Food.jpeg", price: 120, description: "Nutritious and tasty food for strong and healthy dogs.", category: "Foods" },
  { id: 8, name: "Fish Food", imageUrl: "/Fish_Food.jpeg", price: 300, description: "High-quality flakes and pellets for active, vibrant fish.", category: "Foods" },
  { id: 9, name: "Cat Food", imageUrl: "/Cat_Food.jpeg", price: 250, description: "Delicious and balanced meals for a happy, healthy cat.", category: "Foods" },
  { id: 10, name: "Bird Food", imageUrl: "/Birds_Food.jpg", price: 100, description: "Essential seed mix to keep your birds energetic and healthy.", category: "Foods" },
];

const ProductList: React.FC = () => {
  const [activeSection, setActiveSection] = useState<"Products" | "Foods">("Products");

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-extrabold text-green-950 mb-4 text-center">Choose Category</h2>

      <div className="flex gap-6 md:gap-80 mb-6 justify-center items-center">
        <button
          className={`py-2 px-4 font-bold text-xl md:text-2xl ${activeSection === "Products" ? "text-green-600 border-b-2 md:border-b-4 border-b-green-500" : " hover:border-b-green-500 text-green-600"} transition duration-200`}
          onClick={() => setActiveSection("Products")}
        >
          Our Products
        </button>
        <button
          className={`py-2 px-4 font-bold text-xl md:text-2xl ${activeSection === "Foods" ?"text-green-600 border-b-2 md:border-b-4 border-b-green-500" : " hover:border-b-green-500 text-green-600"} transition duration-200`}
          onClick={() => setActiveSection("Foods")}
        >
          Our Foods
        </button>
      </div>

      <div>
        <h3 className="text-xl font-extrabold text-green-800 mb-4">{activeSection === "Products" ? "Our Products" : "Our Foods"}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(activeSection === "Products" ? ourProducts : ourFoods).map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
