"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Share2 } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: "dog" | "cat" | "birds" | "fish" | "petFood";
  quantity?: number;
}

const ProductPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [productsToDisplay, setProductsToDisplay] = useState<Product[]>([]);

  // Sample product data
  const DOG_DATA: Product[] = [
    { id: 7, name: "Golden Retriever Puppy", price: 15000, description: "A playful and energetic golden retriever puppy.", imageUrl: "/golden_retriever_puppy.jpg", category: "dog" },
    { id: 10, name: "Labrador Puppy", price: 12000, description: "A friendly and loyal Labrador puppy.", imageUrl: "/labrador_puppy.jpg", category: "dog" },
    { id: 14, name: "Dog Food Pack", price: 800, description: "Nutritious food pack for dogs.", imageUrl: "/dog_food.jpeg", category: "petFood" },
  ];

  const CAT_DATA: Product[] = [
    { id: 8, name: "Siamese Kitten", price: 8000, description: "A beautiful and intelligent Siamese kitten.", imageUrl: "/siamese_kitten.jpg", category: "cat" },
    { id: 11, name: "Persian Cat", price: 10000, description: "A fluffy and affectionate Persian cat.", imageUrl: "/persian_cat.jpg", category: "cat" },
    { id: 15, name: "Cat Food Pack", price: 700, description: "Delicious and nutritious cat food.", imageUrl: "/cat_food.jpg", category: "petFood" },
  ];

  const BIRD_DATA: Product[] = [
    { id: 16, name: "Parrot", price: 2500, description: "A vibrant and intelligent parrot.", imageUrl: "/parrot.jpg", category: "birds" },
    { id: 17, name: "Canary", price: 2000, description: "A beautiful singing canary.", imageUrl: "/canary.jpg", category: "birds" },
  ];

  const FISH_DATA: Product[] = [
    { id: 18, name: "Goldfish", price: 500, description: "A lively and easy-to-care-for goldfish.", imageUrl: "/goldfish.jpg", category: "fish" },
    { id: 19, name: "Betta Fish", price: 800, description: "A stunning Betta fish with flowing fins.", imageUrl: "/betta_fish.jpg", category: "fish" },
    { id: 20, name: "Fish Food Pack", price: 300, description: "Nutritious food for aquarium fish.", imageUrl: "/fish_food.jpg", category: "petFood" },
  ];

  const ALL_PRODUCTS = [...DOG_DATA, ...CAT_DATA, ...BIRD_DATA, ...FISH_DATA];

  useEffect(() => {
    setProductsToDisplay(
      selectedCategory === "all" ? ALL_PRODUCTS : ALL_PRODUCTS.filter(p => p.category === selectedCategory)
    );
  }, [selectedCategory]);

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

  const shareProduct = (product: Product) => {
    const shareData = {
      title: product.name,
      text: `Check out this product: ${product.name} for Rs. ${product.price}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((error) => console.error("Error sharing:", error));
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareData.text + " " + shareData.url)}`;
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
      window.open(whatsappUrl, "_blank");
      window.open(facebookUrl, "_blank");
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 bg-white">
      <h2 className="text-3xl font-extrabold text-green-600 mb-8 text-center">
        Our Products
      </h2>

      {/* Category Filter Buttons */}
      <div className="flex justify-center gap-2 mb-6 overflow-x-auto">
        {["all", "dog", "cat", "birds", "fish", "petFood"].map((category) => (
          <button
            key={category}
            className={`px-3 py-2 rounded text-sm md:text-base ${
              selectedCategory === category ? "bg-green-500 text-white" : "bg-green-300 text-green-900"
            }`}
            onClick={() => filterCategory(category)}
          >
            {category === "all" ? "All Products" : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {productsToDisplay.length > 0 ? (
          productsToDisplay.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-xl shadow-lg bg-white flex flex-col overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out"
            >
              {/* Product Image */}
              <div className="h-48 md:h-56 w-full relative">
                <Image src={product.imageUrl} alt={product.name} layout="fill" objectFit="cover" className="rounded-t-xl" />
              </div>

              {/* Product Details */}
              <div className="flex flex-col flex-grow p-4 md:p-5">
                {/* Product Name & Share Icon */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                  <button onClick={() => shareProduct(product)} className="p-2 text-green-600 hover:text-green-800">
                    <Share2 size={20} />
                  </button>
                </div>

                <p className="text-green-600 font-bold text-lg">Rs. {product.price}</p>
                <p className="text-gray-600 mt-1 text-sm">{product.description}</p>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No products available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
