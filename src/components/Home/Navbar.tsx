"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCartIcon, XCircleIcon, Bars3Icon } from "@heroicons/react/24/outline";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const Navbar: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [totalCartPrice, setTotalCartPrice] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to update cart from localStorage
  const updateCart = () => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
    setTotalCartPrice(cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
  };

  // Listen for cart updates
  useEffect(() => {
    updateCart();
    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  // Remove item from cart
  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-white to-green-600 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" aria-label="Go to homepage">
                <Image className="h-24 w-auto" src="/Logo.png" alt="Exotic Birds" width={120} height={40} priority />
              </Link>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center space-x-4">
              <button onClick={() => setCartOpen(!cartOpen)} className="relative text-white hover:bg-black hover:text-green-400 p-2 rounded-md">
                <ShoppingCartIcon className="h-7 w-7" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-white hover:text-green-400">
                <Bars3Icon className="h-8 w-8" />
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/" className="text-white hover:bg-black hover:text-green-400 px-3 py-2 rounded-md text-lg font-semibold">
                Home
              </Link>
              <Link href="/Product" className="text-white hover:bg-black hover:text-green-400 px-3 py-2 rounded-md text-lg font-semibold">
                Products
              </Link>
              <Link href="/#contact" className="text-white hover:bg-black hover:text-green-400 px-3 py-2 rounded-md text-lg font-semibold">
                Contact Us
              </Link>

              {/* Cart Button */}
              <button onClick={() => setCartOpen(!cartOpen)} className="relative text-white hover:bg-black hover:text-green-400 p-2 rounded-md">
                <ShoppingCartIcon className="h-7 w-7" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Cart Dropdown */}
          {cartOpen && (
            <div className="fixed top-0 right-0 h-full w-full sm:w-80 bg-white shadow-lg rounded-lg p-4 z-50 overflow-y-auto">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">Cart</h3>
                <button onClick={() => setCartOpen(false)}>
                  <XCircleIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-sm mt-4">Your cart is empty.</p>
              ) : (
                <ul className="mt-4 space-y-4">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex items-center space-x-4 border-b pb-2">
                      <Image src={item.imageUrl} alt={item.name} width={50} height={50} className="rounded-md" />
                      <div className="flex-1">
                        <p className="text-md font-semibold text-gray-700">{item.name}</p>
                        <p className="text-sm text-green-600">Rs. {item.price.toFixed(2)}</p>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">✖</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {cartItems.length > 0 && (
                <div>
                  <div className="font-bold text-gray-800 mt-2">Total: Rs. {totalCartPrice.toFixed(2)}</div>
                  <button className="mt-4 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Go to Checkout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
