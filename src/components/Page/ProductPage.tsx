"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Share2, ShoppingCart, CheckCircle } from "lucide-react"; // Added CheckCircle
import { motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: "dog" | "cat" | "birds" | "fish" | "petFood";
  quantity?: number;
}

// Helper function to get cart items from localStorage
const getCartItems = (): Product[] => {
  if (typeof window === "undefined") return []; // Guard against SSR
  try {
    const cartString = localStorage.getItem("cart");
    return cartString ? JSON.parse(cartString) : [];
  } catch (error) {
    console.error("Error reading cart from localStorage:", error);
    return [];
  }
};

const ProductPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [productsToDisplay, setProductsToDisplay] = useState<Product[]>([]);
  const [isClient, setIsClient] = useState(false);
  // --- New State: Store IDs of items currently in the cart ---
  const [cartItemIds, setCartItemIds] = useState<Set<number>>(new Set());

  const PRODUCT_DATA = useMemo(() => ({
    dog: [
      { id: 1, name: "Golden Retriever Puppy", price: 15000, description: "Playful, friendly, and energetic.", imageUrl: "/goldenretriever.jpg", category: "dog" as const },
      { id: 2, name: "Labrador Puppy", price: 12000, description: "Loyal, affectionate, and intelligent.", imageUrl: "/LabradorRetriever.jpg", category: "dog" as const },
      { id: 3, name: "Dog Food Pack", price: 800, description: "Nutritious and tasty dog food.", imageUrl: "/Dog_Food.jpeg", category: "petFood" as const },
    ],
    cat: [
      { id: 4, name: "Siamese Kitten", price: 5000, description: "Elegant, vocal, and intelligent.", imageUrl: "/Cat.jpeg", category: "cat" as const },
      { id: 5, name: "Persian Cat", price: 7000, description: "Fluffy, calm, and affectionate.", imageUrl: "/PersianCat.jpg", category: "cat" as const },
      { id: 6, name: "Cat Food Pack", price: 700, description: "Healthy and delicious cat food.", imageUrl: "/Cat_food.jpeg", category: "petFood" as const },
    ],
    birds: [
      { id: 15, name: "Budgies Parrot Pair", price: 400, description: "Playful, social, and colorful parrots.", imageUrl: "/budgies.jpg", category: "birds" as const },
      { id: 16, name: "Cockatiel Parrot Pair", price: 2000, description: "Affectionate parrots with charming crests.", imageUrl: "/cockatiel.jpg", category: "birds" as const },
      { id: 17, name: "Sunconure Pair", price: 20000, description: "Bright, intelligent, and energetic parrots.", imageUrl: "/conure.jpeg", category: "birds" as const },
      { id: 18, name: "Parrotlets Pair", price: 8000, description: "Tiny, bold, and full of personality.", imageUrl: "/parrotlets.jpeg", category: "birds" as const },
      { id: 19, name: "Zebrafinch Pair", price: 400, description: "Small songbirds with striking markings.", imageUrl: "/zebrafinch.jpg", category: "birds" as const },
      { id: 20, name: "Small Conure Pair", price: 4000, description: "Lively, social, and playful parrots.", imageUrl: "/smallconure.jpeg", category: "birds" as const },
      { id: 14, name: "Bird Food", price: 700, description: "Healthy and delicious cat food.", imageUrl: "/Birds_Food.jpg", category: "petFood" as const },
      { id: 13, name: "Bird Food", price: 700, description: "Healthy and delicious cat food.", imageUrl: "/Birds_Food1.jpg", category: "petFood" as const },
      { id: 12, name: "Bird Food", price: 700, description: "Healthy and delicious cat food.", imageUrl: "/Birds_Food2.jpg", category: "petFood" as const },
    ],
    fish: [
      { id: 21, name: "Beta Fish Pair", price: 400, description: "Colorful, active, and easy to care for.", imageUrl: "/Fish2.png", category: "fish" as const },
      { id: 22, name: "Molly Fish Pair", price: 50, description: "Hardy, peaceful, and beginner-friendly.", imageUrl: "/Mollies.jpg", category: "fish" as const },
      { id: 23, name: "Fish food", price: 50, description: "Hardy, peaceful, and beginner-friendly.", imageUrl: "/Fish_Food.jpeg", category: "petFood" as const },
    ],
  }), []);

  const ALL_PRODUCTS = useMemo(() => [
    ...PRODUCT_DATA.dog,
    ...PRODUCT_DATA.cat,
    ...PRODUCT_DATA.birds,
    ...PRODUCT_DATA.fish
  ], [PRODUCT_DATA]);

  // --- New Function: Update the set of cart item IDs ---
  const updateCartStatus = () => {
    if (!isClient) return;
    const currentCart = getCartItems();
    const idsInCart = new Set(currentCart.map(item => item.id));
    setCartItemIds(idsInCart);
  };

  useEffect(() => {
    // This effect now runs only once on mount to set isClient
    setIsClient(true);
  }, []);

  useEffect(() => {
    // This effect depends on isClient and updates cart status initially
    // and sets up the listener
    if (isClient) {
        updateCartStatus(); // Initial check
        window.addEventListener('cartUpdated', updateCartStatus);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('cartUpdated', updateCartStatus);
        };
    }
  }, [isClient]); // Depend on isClient

  useEffect(() => {
    // Filter products based on category
    if (selectedCategory === "all") {
      setProductsToDisplay(ALL_PRODUCTS);
    } else if (selectedCategory === "petFood") {
       setProductsToDisplay(
        ALL_PRODUCTS.filter((p): p is Product => p.category === "petFood")
      );
    }
    else {
      setProductsToDisplay(
        ALL_PRODUCTS.filter((p): p is Product => p.category === selectedCategory && p.category !== "petFood")
      );
    }
  }, [selectedCategory, ALL_PRODUCTS]);


  const filterCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const addToCart = (product: Product) => {
    if (!isClient) return;

    // --- Prevent adding if already in cart ---
    if (cartItemIds.has(product.id)) {
        console.log("Item already in cart");
        return; // Do nothing if already in cart
    }

    try {
      const cart = getCartItems(); // Use helper
      // No need to check for existingItem here anymore if the button is disabled,
      // but keeping it doesn't hurt (belt and suspenders)
      const existingItem = cart.find((item) => item.id === product.id);

      if (existingItem) {
        // This case shouldn't be reachable if the button is disabled,
        // but handle it just in case
         existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated")); // This will trigger updateCartStatus

      // Provide visual feedback (optional, as button state changes now)
      const button = document.getElementById(`add-to-cart-${product.id}`);
      if (button) {
        button.classList.add("bg-green-700"); // Quick flash
        setTimeout(() => {
          // The button style will update based on the new cart state anyway
          button.classList.remove("bg-green-700");
        }, 300);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    }
  };

  const shareProduct = async (product: Product) => {
    // ... (shareProduct logic remains the same)
    if (!isClient) return;

    const productUrl = `${window.location.origin}/product/${product.id}`; // Adjust if you have actual product pages
    const shareText = `🛒 Check out this product: ${product.name} \n💰 Price: Rs. ${product.price} \n📄 ${product.description} \n🔗 ${productUrl}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: shareText,
          url: productUrl,
        });
      } else {
        // Fallback for browsers without navigator.share (e.g., desktop)
        const encodedText = encodeURIComponent(shareText);
        const whatsappUrl = `https://wa.me/?text=${encodedText}`;
        // Or prompt user to copy
        // await navigator.clipboard.writeText(shareText);
        // alert('Link copied to clipboard! You can paste it in your app.');
        window.open(whatsappUrl, "_blank"); // Open WhatsApp Web/Desktop
      }
    } catch (error) {
      console.error("Error sharing:", error);
      // Avoid alerting for AbortError if the user cancels the share dialog
      if (error instanceof DOMException && error.name === 'AbortError') {
          console.log('Share action cancelled by user.');
      } else {
          alert("Failed to share product.");
      }
    }
  };

  const categories = [
    { value: "all", label: "All Products" },
    { value: "dog", label: "Dogs" },
    { value: "cat", label: "Cats" },
    { value: "birds", label: "Birds" },
    { value: "fish", label: "Fish" },
    { value: "petFood", label: "Pet Food" },
  ];

  return (
    <div className="container mx-auto py-10 px-4 bg-white min-h-screen mt-16">
      <motion.h2
        className="text-4xl text-center font-bold text-gray-900 mb-4 scroll-mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        id="products-heading"
      >
        Our <span className="text-green-600">Products</span>
      </motion.h2>
      <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-32 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto rounded-full mb-8"
      />

      <div className="flex justify-start sm:justify-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(({ value, label }) => (
          <motion.button
            key={value}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm md:text-base transition-colors duration-200 ${
              selectedCategory === value
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } whitespace-nowrap`}
            onClick={() => filterCategory(value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {label}
          </motion.button>
        ))}
      </div>

      {productsToDisplay.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productsToDisplay.map((product) => {
             // --- Check if this product is in the cart ---
             const isInCart = isClient && cartItemIds.has(product.id);

             return (
                <motion.div
                  key={product.id}
                  className="border border-gray-200 rounded-xl shadow-md bg-white flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-48 md:h-56 w-full relative">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={product.id <= 4} // Adjust priority as needed
                    />
                  </div>

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

                    <button
                      id={`add-to-cart-${product.id}`}
                      onClick={() => addToCart(product)}
                      // --- Conditionally disable and style the button ---
                      disabled={isInCart}
                      className={`mt-auto flex items-center justify-center gap-2 w-full font-medium py-2 rounded-lg transition-all duration-200 text-white ${
                        isInCart
                          ? 'bg-gray-400 cursor-not-allowed' // Disabled style
                          : 'bg-green-600 hover:bg-green-700' // Enabled style
                      }`}
                      aria-live="polite" // Announce changes for screen readers
                    >
                      {isInCart ? (
                        <>
                          <CheckCircle size={18} /> In Cart
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={18} /> Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
            );
        })}
        </div>
      ) : (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </motion.div>
      )}
    </div>
  );
};

export default ProductPage;