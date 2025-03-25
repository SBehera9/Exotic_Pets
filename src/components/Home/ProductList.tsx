"use client";

import React, { useState, useEffect } from "react";
import Product from "./Product";

interface ProductData {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [activeSection, setActiveSection] = useState<"Products" | "Foods">("Products");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedProducts = JSON.parse(localStorage.getItem("products") || "[]");
      setProducts(savedProducts);

      const handleProductUpdate = () => {
        const updatedProducts = JSON.parse(localStorage.getItem("products") || "[]");
        setProducts(updatedProducts);
      };

      window.addEventListener("productsUpdated", handleProductUpdate);
      return () => window.removeEventListener("productsUpdated", handleProductUpdate);
    }
  }, []);

  const addToCart = (product: ProductData) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: ProductData) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-extrabold text-green-950 mb-4 text-center">Choose Category</h2>

      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeSection === "Products" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveSection("Products")}
        >
          Products
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeSection === "Foods" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveSection("Foods")}
        >
          Foods
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products
          .filter((product) => product.category === activeSection)
          .map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-md relative">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-60 object-cover rounded"
              />
              <h3 className="text-lg font-bold mt-2">{product.name}</h3>
              <p className="text-gray-700">{product.description}</p>
              <p className="font-semibold text-green-700">₹{product.price}</p>

              {!product.inStock && (
                <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                  Out of Stock
                </span>
              )}

              {product.inStock ? (
                <button
                  onClick={() => addToCart(product)}
                  className="bg-green-500 text-white px-3 py-1 rounded mt-2 w-full"
                >
                  Add to Cart
                </button>
              ) : (
                <button className="bg-gray-400 text-white px-3 py-1 rounded mt-2 w-full cursor-not-allowed" disabled>
                  Not Available
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
