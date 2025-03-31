"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Share2, ShoppingCart } from "lucide-react";

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
  const [isClient, setIsClient] = useState(false);

  // Product data organized by category
  const PRODUCT_DATA = useMemo(() => ({
    dog: [
      { id: 1, name: "Golden Retriever Puppy", price: 15000, description: "A playful and energetic golden retriever puppy.", imageUrl: "/golden_retriever_puppy.jpg", category: "dog" },
      { id: 2, name: "Labrador Puppy", price: 12000, description: "A friendly and loyal Labrador puppy.", imageUrl: "/labrador_puppy.jpg", category: "dog" },
      { id: 3, name: "Dog Food Pack", price: 800, description: "Nutritious food pack for dogs.", imageUrl: "/Dog_Food.jpeg", category: "petFood" },
    ],
    cat: [
      { id: 4, name: "Siamese Kitten", price: 8000, description: "A beautiful and intelligent Siamese kitten.", imageUrl: "/siamese_kitten.jpg", category: "cat" },
      { id: 5, name: "Persian Cat", price: 10000, description: "A fluffy and affectionate Persian cat.", imageUrl: "/persian_cat.jpg", category: "cat" },
      { id: 6, name: "Cat Food Pack", price: 700, description: "Delicious and nutritious cat food.", imageUrl: "/cat_food.jpg", category: "petFood" },
    ],
    birds: [
      { id: 15, name: "Parrot", price: 400, description: "A colorful talking parrot.", imageUrl: "/budgies.jpg", category: "birds" },
      { id: 16, name: "Parrot", price: 2000, description: "A colorful talking parrot.", imageUrl: "/cockatiel.jpg", category: "birds" },
      { id: 17, name: "Canary", price: 20000, description: "A small bright yellow canary.", imageUrl: "/conure.jpeg", category: "birds" },
      { id: 18, name: "Canary", price: 8000, description: "A small bright yellow canary.", imageUrl: "/parrotlets.jpeg", category: "birds" },
      { id: 19, name: "Canary", price: 400, description: "A small bright yellow canary.", imageUrl: "/zebrafinch.jpg", category: "birds" },
      { id: 20, name: "Canary", price: 4000, description: "A small bright yellow canary.", imageUrl: "/smallconure.jpeg", category: "birds" },
    ],
    fish: [
      { id: 21, name: "Goldfish", price: 2000, description: "A bright and lively goldfish.", imageUrl: "/goldfish.jpg", category: "fish" },
      { id: 22, name: "Koi Fish", price: 5000, description: "A decorative and vibrant koi fish.", imageUrl: "/koi_fish.jpg", category: "fish" },
    ]
  }), []);

  // Combine all products
  const ALL_PRODUCTS = useMemo(() => [
    ...PRODUCT_DATA.dog,
    ...PRODUCT_DATA.cat,
    ...PRODUCT_DATA.birds,
    ...PRODUCT_DATA.fish
  ], [PRODUCT_DATA]);

  // Filter products based on selected category
  useEffect(() => {
    setProductsToDisplay(
      selectedCategory === "all" 
        ? ALL_PRODUCTS 
        : ALL_PRODUCTS.filter(p => p.category === selectedCategory)
    );
  }, [selectedCategory, ALL_PRODUCTS]);

  // Check if component is mounted (client-side)
  useEffect(() => {
    setIsClient(true);
  }, []);

  const filterCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const addToCart = (product: Product) => {
    if (!isClient) return;
    
    try {
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
      alert(`${product.name} added to cart!`); // Using alert as fallback
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    }
  };

  const shareProduct = async (product: Product) => {
    if (!isClient) return;
    
    const productUrl = `${window.location.origin}/product/${product.id}`;
    const shareText = `🛒 Check out this product: ${product.name} \n💰 Price: Rs. ${product.price} \n📄 ${product.description} \n🔗 ${productUrl}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: shareText,
          url: productUrl,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        const encodedText = encodeURIComponent(shareText);
        const whatsappUrl = `https://wa.me/?text=${encodedText}`;
        window.open(whatsappUrl, "_blank");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  // Categories for filter buttons
  const categories = [
    { value: "all", label: "All Products" },
    { value: "dog", label: "Dogs" },
    { value: "cat", label: "Cats" },
    { value: "birds", label: "Birds" },
    { value: "fish", label: "Fish" },
    { value: "petFood", label: "Pet Food" },
  ];

  return (
    <div className="container mx-auto py-10 px-4 bg-white min-h-screen">
      <h2 className="text-3xl font-extrabold text-green-600 mb-8 text-center">
        Our Products
      </h2>

      {/* Category Filter Buttons */}
      <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map(({ value, label }) => (
          <button
            key={value}
            className={`px-4 py-2 rounded-full text-sm md:text-base transition-colors duration-200 ${
              selectedCategory === value 
                ? "bg-green-600 text-white shadow-md" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } whitespace-nowrap`}
            onClick={() => filterCategory(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {productsToDisplay.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productsToDisplay.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-xl shadow-md bg-white flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Product Image */}
              <div className="h-48 md:h-56 w-full relative">
                <Image 
                  src={product.imageUrl} 
                  alt={product.name} 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={product.id <= 4} // Only prioritize first few images
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col flex-grow p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                    {product.name}
                  </h3>
                  <button 
                    onClick={() => shareProduct(product)} 
                    className="p-1 text-gray-500 hover:text-green-600 transition-colors"
                    aria-label="Share product"
                  >
                    <Share2 size={18} />
                  </button>
                </div>

                <p className="text-green-600 font-bold text-lg mb-2">
                  Rs. {product.price.toLocaleString()}
                </p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product)}
                  className="mt-auto flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-colors duration-200"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ProductPage;