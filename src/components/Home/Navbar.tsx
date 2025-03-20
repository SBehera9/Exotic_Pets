'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const logoSrc = "/Logo.png";
    const logoAlt = "Exotic Birds";

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-white to-green-600 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" aria-label="Go to homepage">
                            <Image
                                className="h-24 w-auto"
                                src={logoSrc}
                                alt={logoAlt}
                                width={120}
                                height={40}
                                priority
                            />
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/" className="text-white hover:bg-black hover:text-green-400 px-3 py-2 rounded-md text-lg font-semibold">
                                Home
                            </Link>
                            <Link href="/Product" className="text-white hover:bg-black hover:text-green-400 px-3 py-2 rounded-md text-lg font-semibold">
                                Products
                            </Link>
                            <Link href="/#contact" className="text-white hover:bg-black hover:text-green-400 px-3 py-2 rounded-md text-lg font-semibold">
                                Contact Us
                            </Link>
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            type="button"
                            className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-expanded={mobileMenuOpen ? 'true' : 'false'}
                            onClick={toggleMobileMenu}
                        >
                            <span className="sr-only">{mobileMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link href="/" className="text-black hover:bg-gray-100 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-semibold">
                        Home
                    </Link>
                    <Link href="/Product" className="text-black hover:bg-gray-100 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-semibold">
                        Products
                    </Link>
                    <Link href="/#contact" className="text-black hover:bg-gray-100 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-semibold">
                        Contact Us
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;