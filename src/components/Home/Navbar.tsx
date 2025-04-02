"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCartIcon,
  XMarkIcon,
  Bars3Icon,
  ChevronDownIcon,
  ChevronUpIcon
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(cart);
    };

    updateCart();
    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
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
    const newTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalCartPrice(newTotal);
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
      const selectedProducts = cartItems.map((item) => item.name).join(", ");
      setSelectedProduct(selectedProducts);
      setIsBuyNowOpen(true);
    }
  };

  const closeBuyNowAndCart = () => {
    setIsBuyNowOpen(false);
    setCartOpen(false);
  };

  return (
    <>
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-gradient-to-r from-white to-green-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Link href="/" aria-label="Go to homepage">
                <Image
                  className={`h-16 w-auto transition-all duration-300 ${isScrolled ? 'h-14' : 'h-16'}`}
                  src="/Logo.png"
                  alt="Exotic Birds"
                  width={120}
                  height={40}
                  priority
                />
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setCartOpen(!cartOpen)}
                  className={`relative p-2 rounded-full ${isScrolled ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-white/20 text-white hover:bg-white/30'}`}
                  aria-label="Shopping cart"
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
                className={`p-2 rounded-full ${isScrolled ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-white/20 text-white hover:bg-white/30'}`}
                aria-label="Open menu"
              >
                {menuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <Link
                href="/"
                className={`px-4 py-2 rounded-lg text-lg font-medium transition-colors ${isScrolled ? 'text-gray-700 hover:bg-green-50 hover:text-green-600' : 'text-white hover:bg-white/10'}`}
              >
                Home
              </Link>
              <Link
                href="/productss"
                className={`px-4 py-2 rounded-lg text-lg font-medium transition-colors ${isScrolled ? 'text-gray-700 hover:bg-green-50 hover:text-green-600' : 'text-white hover:bg-white/10'}`}
              >
                Products
              </Link>
              <Link
                href="/contactuspage"
                className={`px-4 py-2 rounded-lg text-lg font-medium transition-colors ${isScrolled ? 'text-gray-700 hover:bg-green-50 hover:text-green-600' : 'text-white hover:bg-white/10'}`}
              >
                Contact Us
              </Link>

              <div className="relative ml-2">
                <button
                  onClick={() => setCartOpen(!cartOpen)}
                  className={`relative p-2 rounded-full ${isScrolled ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-white/20 text-white hover:bg-white/30'}`}
                  aria-label="Shopping cart"
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
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className={`md:hidden absolute top-full left-0 w-full ${isScrolled ? 'bg-white shadow-lg' : 'bg-gradient-to-r from-green-500 to-green-600'} rounded-b-lg overflow-hidden z-50 animate-slideDown`}>
            <div className="flex flex-col items-stretch py-2 px-4">
              <Link
                href="/"
                className={`py-3 px-4 rounded-lg text-lg font-medium ${isScrolled ? 'text-gray-700 hover:bg-green-50' : 'text-white hover:bg-white/10'}`}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/productss"
                className={`py-3 px-4 rounded-lg text-lg font-medium ${isScrolled ? 'text-gray-700 hover:bg-green-50' : 'text-white hover:bg-white/10'}`}
                onClick={() => setMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/contactuspage"
                className={`py-3 px-4 rounded-lg text-lg font-medium ${isScrolled ? 'text-gray-700 hover:bg-green-50' : 'text-white hover:bg-white/10'}`}
                onClick={() => setMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}

        {/* Shopping cart sidebar */}
        {cartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
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
                          Shopping Cart
                        </h2>
                        <button
                          type="button"
                          className="text-gray-400 hover:text-gray-500"
                          onClick={() => setCartOpen(false)}
                        >
                          <XMarkIcon className="h-6 w-6" />
                        </button>
                      </div>

                      <div className="mt-8">
                        {cartItems.length === 0 ? (
                          <div className="text-center py-12">
                            <ShoppingCartIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
                            <p className="mt-1 text-gray-500">Start adding some products to your cart</p>
                            <div className="mt-6">
                              <button
                                onClick={() => setCartOpen(false)}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                              >
                                Continue Shopping
                              </button>
                            </div>
                          </div>
                        ) : (
                          <ul className="divide-y divide-gray-200">
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
                                      <p className="ml-4">Rs. {item.price.toFixed(2)}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex-1 flex items-end justify-between text-sm">
                                    <div className="flex items-center border border-gray-300 rounded-md">
                                      <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                      >
                                        -
                                      </button>
                                      <span className="px-3 py-1 text-gray-800">
                                        {item.quantity}
                                      </span>
                                      <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                      >
                                        +
                                      </button>
                                    </div>

                                    <div className="flex">
                                      <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="font-medium text-red-600 hover:text-red-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    {cartItems.length > 0 && (
                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>Rs. {totalCartPrice.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <button
                            onClick={handleCheckout}
                            className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
                          >
                            Checkout
                          </button>
                        </div>
                        <div className="mt-4 flex justify-center text-sm text-gray-500">
                          <button
                            onClick={() => setCartOpen(false)}
                            className="text-green-600 font-medium hover:text-green-500"
                          >
                            Continue Shopping
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

      {isBuyNowOpen && (
        <BuyNowForm
          productName={selectedProduct}
          onClose={closeBuyNowAndCart}
          cartItems={cartItems}
        />
      )}
    </>
  );
};

export default Navbar;