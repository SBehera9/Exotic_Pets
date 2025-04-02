"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCartIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import BuyNowForm from "../Home/BuyNowForm";

interface CartItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

const Navbar: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [totalCartPrice, setTotalCartPrice] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(cart);
    };

    updateCart();
    window.addEventListener("cartUpdated", updateCart);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("cartUpdated", updateCart);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (cartOpen || menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [cartOpen, menuOpen]);

  useEffect(() => {
    setTotalCartPrice(
      cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    );
  }, [cartItems]);

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      setSelectedProduct(cartItems.map((item) => item.name).join(", "));
      setIsBuyNowOpen(true);
    }
  };

  const closeAllModals = () => {
    setCartOpen(false);
    setIsBuyNowOpen(false);
    setMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white shadow-lg" 
            : "bg-gradient-to-r from-white to-green-600"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" aria-label="Home" onClick={closeAllModals}>
                <Image
                  className="h-16 w-auto transition-all duration-300"
                  src="/Logo.png"
                  alt="Exotic Birds"
                  width={120}
                  height={40}
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className={`px-3 py-2 rounded-md text-lg font-medium transition-colors ${
                  scrolled 
                    ? "text-gray-800 hover:text-green-600" 
                    : "text-white hover:text-green-200"
                }`}
              >
                Home
              </Link>
              <Link
                href="/productss"
                className={`px-3 py-2 rounded-md text-lg font-medium transition-colors ${
                  scrolled 
                    ? "text-gray-800 hover:text-green-600" 
                    : "text-white hover:text-green-200"
                }`}
              >
                Products
              </Link>
              <Link
                href="/contactuspage"
                className={`px-3 py-2 rounded-md text-lg font-medium transition-colors ${
                  scrolled 
                    ? "text-gray-800 hover:text-green-600" 
                    : "text-white hover:text-green-200"
                }`}
              >
                Contact
              </Link>
            </div>

            {/* Desktop Cart Icon */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <button
                  onClick={() => setCartOpen(true)}
                  className={`p-2 rounded-full transition-colors relative ${
                    scrolled 
                      ? "text-gray-800 hover:bg-gray-100" 
                      : "text-white hover:bg-white/20"
                  }`}
                  aria-label="Shopping Cart"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setCartOpen(true)}
                  className={`p-2 rounded-full relative ${
                    scrolled ? "text-gray-800" : "text-white"
                  }`}
                  aria-label="Shopping Cart"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </div>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`p-2 rounded-md focus:outline-none ${
                  scrolled ? "text-gray-800" : "text-white"
                }`}
                aria-label="Menu"
              >
                <Bars3Icon className="h-7 w-7" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 pt-20">
            <div className="bg-white shadow-lg rounded-b-lg overflow-hidden animate-slideDown">
              <div className="flex flex-col space-y-1 px-4 py-2">
                <Link
                  href="/"
                  className="px-4 py-3 text-lg font-medium text-gray-800 hover:bg-green-50 rounded-md"
                  onClick={closeAllModals}
                >
                  Home
                </Link>
                <Link
                  href="/productss"
                  className="px-4 py-3 text-lg font-medium text-gray-800 hover:bg-green-50 rounded-md"
                  onClick={closeAllModals}
                >
                  Products
                </Link>
                <Link
                  href="/contactuspage"
                  className="px-4 py-3 text-lg font-medium text-gray-800 hover:bg-green-50 rounded-md"
                  onClick={closeAllModals}
                >
                  Contact
                </Link>
              </div>
              <div className="border-t px-4 py-3">
                <button
                  onClick={closeAllModals}
                  className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
                >
                  Close Menu
                </button>
              </div>
            </div>
          </div>
        )}

        {cartOpen && (
          <div className="fixed inset-0 overflow-hidden z-50">
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={() => setCartOpen(false)}
              ></div>
              <div className="fixed inset-y-0 right-0 max-w-full flex">
                <div className="relative w-screen max-w-md">
                  <div className="h-full flex flex-col bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">
                          Your Cart
                        </h2>
                        <button
                          onClick={() => setCartOpen(false)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <XMarkIcon className="h-6 w-6" />
                        </button>
                      </div>

                      <div className="mt-8">
                        {cartItems.length === 0 ? (
                          <div className="text-center py-12">
                            <ShoppingCartIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">
                              Your cart is empty
                            </h3>
                            <p className="mt-1 text-gray-500">
                              Start adding some products to your cart
                            </p>
                            <div className="mt-6">
                              <button
                                onClick={() => {
                                  setCartOpen(false);
                                  setMenuOpen(false);
                                }}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                              >
                                Continue Shopping
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flow-root">
                            <ul className="-my-6 divide-y divide-gray-200">
                              {cartItems.map((item) => (
                                <li key={item.id} className="py-6 flex">
                                  <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                    <Image
                                      src={item.imageUrl}
                                      alt={item.name}
                                      width={96}
                                      height={96}
                                      className="w-full h-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex-1 flex flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{item.name}</h3>
                                        <p className="ml-4">
                                          Rs. {(item.price * item.quantity).toFixed(2)}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex-1 flex items-end justify-between text-sm">
                                      <div className="flex items-center border rounded-md">
                                        <button
                                          onClick={() =>
                                            updateQuantity(
                                              item.id,
                                              item.quantity - 1
                                            )
                                          }
                                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                        >
                                          -
                                        </button>
                                        <span className="px-3">
                                          {item.quantity}
                                        </span>
                                        <button
                                          onClick={() =>
                                            updateQuantity(
                                              item.id,
                                              item.quantity + 1
                                            )
                                          }
                                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                        >
                                          +
                                        </button>
                                      </div>

                                      <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="font-medium text-red-600 hover:text-red-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {cartItems.length > 0 && (
                      <div className="sticky bottom-0 border-t border-gray-200 bg-white py-6 px-4 sm:px-6 shadow-lg">
                        <div className="flex justify-between text-lg font-medium text-gray-900">
                          <p>Total</p>
                          <p>Rs. {totalCartPrice.toFixed(2)}</p>
                        </div>
                        <div className="mt-4">
                          <button
                            onClick={handleCheckout}
                            className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
                          >
                            Checkout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="h-20"></div>

      {isBuyNowOpen && (
        <BuyNowForm
          productName={selectedProduct}
          onClose={closeAllModals}
          cartItems={cartItems}
        />
      )}
    </>
  );
};

export default Navbar;