'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faInstagram,
    faYoutube,
    faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';

const FooterSection = () => {
    const googleMapsEmbedUrl =
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.629455988054!2d72.83403317513138!3d18.957408482036875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cd40b047781f%3A0x60b1f1ac6837b024!2sFortune%20Pet%20Shops!5e0!3m2!1sen!2sin!4v1697306139445!5m2!1sen!2sin';

    return (
        <footer className="bg-black text-white py-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Company Logo */}
                <div className="flex items-center">
                    <Image src="/logo.png" alt="Company Logo" width={150} height={50} />
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="text-sm">
                        <li><a href="#" className="hover:text-gray-400">Home</a></li>
                        <li><a href="#products" className="hover:text-gray-400">Products</a></li>
                        <li><a href="#gallery" className="hover:text-gray-400">Gallery</a></li>
                        <li><a href="#contact" className="hover:text-gray-400">Contact Us</a></li>
                    </ul>
                </div>

                {/* Social Media & Contact */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:text-gray-400">
                            <FontAwesomeIcon icon={faFacebook} size="lg" />
                        </a>
                        <a href="#" className="hover:text-gray-400">
                            <FontAwesomeIcon icon={faInstagram} size="lg" />
                        </a>
                        <a href="#" className="hover:text-gray-400">
                            <FontAwesomeIcon icon={faYoutube} size="lg" />
                        </a>
                        <a href="#" className="hover:text-gray-400">
                            <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                        </a>
                    </div>
                    <div className="mt-4 text-sm">
                        <p>Email: info@fortunepetshops.com</p>
                        <p>Address: 123 Pet Street, Mumbai, India</p>
                    </div>
                </div>

                {/* Google Maps */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Our Location</h3>
                    <iframe
                        src={googleMapsEmbedUrl}
                        width="100%"
                        height="200"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps Location"
                    ></iframe>
                </div>
            </div>

            <div className="text-center mt-8">
                <p className="text-sm text-gray-400">
                    © {new Date().getFullYear()} Fortune Pet Shops. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default FooterSection;
