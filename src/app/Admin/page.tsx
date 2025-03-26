"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ProductData {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
}

const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Products");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedProducts = JSON.parse(localStorage.getItem("products") || "[]");
      setProducts(savedProducts);
    }
  }, []);

  const updateLocalStorage = (updatedProducts: ProductData[]) => {
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    window.dispatchEvent(new Event("productsUpdated"));
  };

  const handleAddProduct = () => {
    if (!name || !imageUrl || !price || !description) {
      alert("Please fill all fields");
      return;
    }

    const newProduct: ProductData = {
      id: Date.now(),
      name,
      imageUrl,
      price: parseFloat(price),
      description,
      category,
      inStock: true,
    };

    updateLocalStorage([...products, newProduct]);

    setName("");
    setImageUrl("");
    setPrice("");
    setDescription("");
  };

  const handleDeleteProduct = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    updateLocalStorage(updatedProducts);
  };

  const toggleStockStatus = (id: number) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, inStock: !product.inStock } : product
    );
    updateLocalStorage(updatedProducts);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-extrabold text-green-950 mb-4 text-center">Admin Page</h2>

      <div className="flex flex-col gap-4 max-w-lg mx-auto mb-6">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        ></textarea>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="Products">Products</option>
          <option value="Foods">Foods</option>
        </select>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>

      {/* Display Added Products */}
      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold text-green-900 mb-4">Added Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-md">
              <Image 
                src={product.imageUrl} 
                alt={product.name} 
                width={160} 
                height={160} 
                className="h-40 w-40 object-cover rounded mx-auto" 
              />
              <h3 className="text-lg font-bold mt-2">{product.name}</h3>
              <p className="text-gray-700">{product.description}</p>
              <p className="font-semibold text-green-700">₹{product.price}</p>
              <p className={`text-sm ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => toggleStockStatus(product.id)}
                  className={`px-3 py-1 rounded ${product.inStock ? "bg-yellow-500 hover:bg-yellow-700" : "bg-gray-400 hover:bg-gray-600"} text-white`}
                >
                  {product.inStock ? "Mark as Out of Stock" : "Mark as In Stock"}
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
