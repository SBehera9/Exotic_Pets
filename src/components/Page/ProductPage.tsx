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
}

const ProductPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [productsToDisplay, setProductsToDisplay] = useState<Product[]>([]);

  const DOG_DATA: Product[] = [
    { id: 1, name: "Golden Retriever Puppy", price: 15000, description: "A playful and energetic golden retriever puppy.", imageUrl: "/golden_retriever_puppy.jpg", category: "dog" },
    { id: 2, name: "Labrador Puppy", price: 12000, description: "A friendly and loyal Labrador puppy.", imageUrl: "/labrador_puppy.jpg", category: "dog" },
    { id: 3, name: "Dog Food Pack", price: 800, description: "Nutritious food pack for dogs.", imageUrl: "/Dog_Food.jpeg", category: "petFood" },
  ];

  const CAT_DATA: Product[] = [
    { id: 4, name: "Siamese Kitten", price: 8000, description: "A beautiful and intelligent Siamese kitten.", imageUrl: "/siamese_kitten.jpg", category: "cat" },
    { id: 5, name: "Persian Cat", price: 10000, description: "A fluffy and affectionate Persian cat.", imageUrl: "/persian_cat.jpg", category: "cat" },
    { id: 6, name: "Cat Food Pack", price: 700, description: "Delicious and nutritious cat food.", imageUrl: "/cat_food.jpg", category: "petFood" },
  ];

  const BIRDS_DATA: Product[] = [
    { id: 15, name: "Parrot", price: 400, description: "A colorful talking parrot.", imageUrl: "/budgies.jpg", category: "birds" },
    { id: 16, name: "Parrot", price: 2000, description: "A colorful talking parrot.", imageUrl: "/cockatiel.jpg", category: "birds" },
    { id: 17, name: "Canary", price: 20000, description: "A small bright yellow canary.", imageUrl: "/conure.jpeg", category: "birds" },
    { id: 18, name: "Canary", price: 8000, description: "A small bright yellow canary.", imageUrl: "/parrotlets.jpeg", category: "birds" },
    { id: 19, name: "Canary", price: 400, description: "A small bright yellow canary.", imageUrl: "/zebrafinch.jpg", category: "birds" },
    { id: 20, name: "Canary", price: 4000, description: "A small bright yellow canary.", imageUrl: "/smallconure.jpeg", category: "birds" },
  ];

  const FISH_DATA: Product[] = [
    { id: 21, name: "Goldfish", price: 2000, description: "A bright and lively goldfish.", imageUrl: "/goldfish.jpg", category: "fish" },
    { id: 22, name: "Koi Fish", price: 5000, description: "A decorative and vibrant koi fish.", imageUrl: "/koi_fish.jpg", category: "fish" },
  ];

  const ALL_PRODUCTS = [...DOG_DATA, ...CAT_DATA, ...BIRDS_DATA, ...FISH_DATA];

  useEffect(() => {
    setProductsToDisplay(selectedCategory === "all" ? ALL_PRODUCTS : ALL_PRODUCTS.filter(p => p.category === selectedCategory));
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

  // ✅ Sharing Function with Image & Product Details
  const shareProduct = (product: Product) => {
<<<<<<< HEAD
    // Generate a unique link for the product
    const productLink = `${window.location.origin}/product/${product.id}`; // Adjust URL as needed

    const shareData = {
      title: product.name,
      text: `Check out this product: ${product.name} for Rs. ${product.price}`,
      url: productLink,
    };

=======
    const productUrl = `${window.location.origin}/product/${product.id}`;
    const shareText = `🛒 Check out this product: ${product.name} \n💰 Price: Rs. ${product.price} \n📄 ${product.description} \n🔗 ${productUrl}`;
    
>>>>>>> c433045600eceac9305a1acf4d9c2c5c94301cad
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: shareText,
          url: productUrl,
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback: WhatsApp & Facebook
      const encodedText = encodeURIComponent(shareText);
      const encodedImage = encodeURIComponent(product.imageUrl);

      // WhatsApp Share Link
      const whatsappUrl = `https://wa.me/?text=${encodedText}`;

      // Facebook Share Link
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}&picture=${encodedImage}`;

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
        {productsToDisplay.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-xl shadow-lg bg-white flex flex-col overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out"
          >
            {/* Product Image */}
            <div className="h-48 md:h-56 w-full relative">
              <Image src={product.imageUrl} alt={product.name} layout="fill" objectFit="cover" className="rounded-t-xl" />
            </div>

<<<<<<< HEAD
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


              </div>
              {/* Add to Cart Button - Fixed to bottom */}
               <button
                  onClick={() => addToCart(product)}
                  className="mt-auto w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-2 rounded-b-lg shadow-md transition-all duration-300 ease-in-out"
                >
                  Add to Cart
                </button>
=======
            {/* Product Details */}
            <div className="flex flex-col flex-grow p-4 md:p-5">
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
>>>>>>> c433045600eceac9305a1acf4d9c2c5c94301cad
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;