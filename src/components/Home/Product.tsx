"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

interface ProductProps {
  id: number;
  name: string;
  imageUrl: string;
  price?: number;
  description: string;
}

const Product: React.FC<ProductProps> = ({ id, name, imageUrl, price = 0, description }) => {
  const [isAdded, setIsAdded] = useState(false);

  const checkIfInCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const isProductInCart = savedCart.some((item: ProductProps) => item.id === id);
    setIsAdded(isProductInCart);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      checkIfInCart();

      // Listen for cart updates
      const handleCartUpdate = () => checkIfInCart();
      window.addEventListener("cartUpdated", handleCartUpdate);

      return () => window.removeEventListener("cartUpdated", handleCartUpdate);
    }
  }, [id]);

  const addToCart = () => {
    if (typeof window !== "undefined") {
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItemIndex = existingCart.findIndex((item: ProductProps) => item.id === id);

      if (existingItemIndex !== -1) {
        existingCart[existingItemIndex].quantity += 1;
      } else {
        existingCart.push({ id, name, imageUrl, price, description, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(existingCart));
      window.dispatchEvent(new Event("cartUpdated"));

      setIsAdded(true);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
      <div className="w-full h-[200px] md:h-[250px] mb-2 bg-gray-100 shadow-md rounded-lg overflow-hidden relative">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-md font-bold text-green-600 mb-2">
        Rs. {price.toFixed(2)}
      </p>
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <button
        className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline self-start ${
          isAdded ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-700"
        }`}
        onClick={addToCart}
        disabled={isAdded}
      >
        {isAdded ? "Added" : "Add to Cart"}
      </button>
    </div>
  );
};

export default Product;
