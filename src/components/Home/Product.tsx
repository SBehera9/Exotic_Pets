// "use client";

// import Image from "next/image";
// import React, { useState, useEffect } from "react";

// interface ProductProps {
//   id: number;
//   name: string;
//   imageUrl: string;
//   price?: number;
//   description: string;
//   quantity?: number; // Add quantity to the interface
// }

// const MAX_PRODUCTS_IN_CART = 3;

// const Product: React.FC<ProductProps> = ({
//   id,
//   name,
//   imageUrl,
//   price = 0,
//   description,
// }) => {
//   const [isAdded, setIsAdded] = useState(false);
//   const [cartCount, setCartCount] = useState(0); // Track total items in the cart

//   const checkIfInCart = () => {
//     if (typeof window !== "undefined") {
//       const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
//       const isProductInCart = savedCart.some(
//         (item: ProductProps) => item.id === id
//       );
//       setIsAdded(isProductInCart);
//       setCartCount(savedCart.reduce((total: number, item: ProductProps) => total + (item.quantity || 1), 0)); // Recalculate total cart count
//     }
//   };


//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       checkIfInCart();

//       const handleCartUpdate = () => checkIfInCart();
//       window.addEventListener("cartUpdated", handleCartUpdate);

//       return () => window.removeEventListener("cartUpdated", handleCartUpdate);
//     }
//   }, [id]);



//   const addToCart = () => {
//     if (typeof window !== "undefined") {
//       const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
//       const existingItemIndex = existingCart.findIndex(
//         (item: ProductProps) => item.id === id
//       );

//       // Check if adding this product would exceed the limit
//       if (cartCount >= MAX_PRODUCTS_IN_CART && existingItemIndex === -1) {
//         alert(`You can only add a maximum of ${MAX_PRODUCTS_IN_CART} products to your cart. First Please ordered`);
//         return;
//       }

//       if (existingItemIndex !== -1) {
//         existingCart[existingItemIndex].quantity = (existingCart[existingItemIndex].quantity || 1) + 1; // Increment existing quantity

//       } else {
//         existingCart.push({
//           id,
//           name,
//           imageUrl,
//           price,
//           description,
//           quantity: 1, // Initialize quantity

//         });
//       }



//       localStorage.setItem("cart", JSON.stringify(existingCart));
//       window.dispatchEvent(new Event("cartUpdated"));

//       setIsAdded(true);
//       setCartCount(existingCart.reduce((total: number, item: ProductProps) => total + (item.quantity || 1), 0)); //Update cart count after adding
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
//       <div className="w-full h-[200px] md:h-[250px] mb-2 bg-gray-100 shadow-md rounded-lg overflow-hidden relative">
//         <Image
//           src={imageUrl}
//           alt={name}
//           layout="fill"
//           objectFit="cover"
//           className="rounded-lg"
//         />
//       </div>

//       <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
//       <p className="text-md font-bold text-green-600 mb-2">
//         Rs. {price.toFixed(2)}
//       </p>
//       <p className="text-sm text-gray-600 mb-4">{description}</p>

//       <button
//         className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline self-start ${
//           isAdded || cartCount >= MAX_PRODUCTS_IN_CART
//             ? "bg-gray-400 cursor-not-allowed"
//             : "bg-green-500 hover:bg-green-700"
//         }`}
//         onClick={addToCart}
//         disabled={isAdded || cartCount >= MAX_PRODUCTS_IN_CART}
//       >
//         {isAdded ? "Added" : "Add to Cart"}
//       </button>
//     </div>
//   );
// };

// export default Product;