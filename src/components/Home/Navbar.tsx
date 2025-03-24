"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    ShoppingCartIcon,
    XCircleIcon,
    Bars3Icon,
} from "@heroicons/react/24/outline";

const Navbar: React.FC = () => {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [cartOpen, setCartOpen] = useState<boolean>(false);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
    const [authMode, setAuthMode] = useState<"login" | "signup">("login");

    useEffect(() => {
        const updateCart = () => {
            const cart: any[] = JSON.parse(localStorage.getItem("cart") || "[]");
            setCartItems(cart);
        };

        updateCart();
        window.addEventListener("cartUpdated", updateCart);
        return () => window.removeEventListener("cartUpdated", updateCart);
    }, []);

    return (
        <>
            <nav className="bg-gradient-to-r from-white to-green-600 shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" aria-label="Go to homepage">
                                <Image
                                    className="h-24 w-auto"
                                    src="/Logo.png"
                                    alt="Exotic Birds"
                                    width={120}
                                    height={40}
                                    priority
                                />
                            </Link>
                        </div>

                        {/* Mobile View */}
                        <div className="md:hidden flex items-center space-x-4">
                            <button
                                onClick={() => setCartOpen(!cartOpen)}
                                className="relative text-white hover:bg-black hover:text-green-400 p-2 rounded-md"
                            >
                                <ShoppingCartIcon className="h-7 w-7" />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        {cartItems.length}
                                    </span>
                                )}
                            </button>

                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="text-white hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                                aria-label="Open menu"
                            >
                                <Bars3Icon className="h-8 w-8" />
                            </button>
                        </div>

                        {/* Desktop View */}
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

                            {/* Login & Sign Up Buttons */}
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => {
                                        setAuthMode("login");
                                        setAuthModalOpen(true);
                                    }}
                                    className="text-white border border-white px-3 py-1 rounded-md hover:bg-black hover:text-green-400"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => {
                                        setAuthMode("signup");
                                        setAuthModalOpen(true);
                                    }}
                                    className="bg-white text-green-600 px-3 py-1 rounded-md hover:bg-black hover:text-white"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Authentication Modal */}
            {authModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white w-96 p-6 rounded-md shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                            onClick={() => setAuthModalOpen(false)}
                        >
                            ✖
                        </button>
                        <h2 className="text-xl font-semibold text-center">
                            {authMode === "login" ? "Login" : "Sign Up"}
                        </h2>
                        <form className="mt-4">
                            {authMode === "signup" && (
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full border border-gray-300 p-2 rounded-md mb-2 text-black"
                                />
                            )}
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border border-gray-300 p-2 rounded-md mb-2 text-black"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full border border-gray-300 p-2 rounded-md mb-4 text-black"
                            />
                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md"
                            >
                                {authMode === "login" ? "Login" : "Sign Up"}
                            </button>
                        </form>
                        <p className="text-center text-sm mt-3">
                            {authMode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                            <button
                                className="text-green-600 underline"
                                onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}
                            >
                                {authMode === "login" ? "Sign Up" : "Login"}
                            </button>
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
