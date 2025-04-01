"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const FooterSection = () => {
  const googleMapsEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60246.444211460745!2d84.76705668893607!3d19.30832153349362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3d500ef1cb60ad%3A0x5b75778874294ff!2sBrahmapur%2C%20Odisha!5e0!3m2!1sen!2sin!4v1742460668328!5m2!1sen!2sin";

  return (
    <footer className="bg-gradient-to-b from-green-900 to-black text-white pt-12 pb-6 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="Exotic Pets Logo"
                width={160}
                height={160}
                className="object-contain"
              />
            </div>
            <p className="text-gray-300 text-center md:text-left text-sm leading-relaxed">
              Your trusted source for exotic pets and premium pet care products since 2010.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-5 text-green-400 border-b border-green-600 pb-2 w-full text-center md:text-left">
              Quick Links
            </h3>
            <ul className="space-y-3 text-center md:text-left">
              {[
                { name: "Home", href: "#" },
                { name: "Products", href: "/Product" },
                { name: "Gallery", href: "#gallery" },
                { name: "About Us", href: "#about" },
                { name: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-5 text-green-400 border-b border-green-600 pb-2 w-full text-center md:text-left">
              Contact Us
            </h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-400 mr-3 w-4" />
                <span className="text-sm">Berhampur, Ganjam, Odisha, India</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="text-green-400 mr-3 w-4" />
                <span className="text-sm">+91 89172 14241</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="text-green-400 mr-3 w-4" />
                <span className="text-sm">exoticpets@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Social Media & Map */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-5 text-green-400 border-b border-green-600 pb-2 w-full text-center md:text-left">
              Find Us
            </h3>
            <div className="mb-4 flex space-x-4">
              {[
                { icon: faFacebook, color: "hover:text-blue-500" },
                { icon: faInstagram, color: "hover:text-pink-500" },
                { icon: faYoutube, color: "hover:text-red-500" },
                { icon: faWhatsapp, color: "hover:text-green-500" },
              ].map((social) => (
                <a
                  key={social.icon.iconName}
                  href="#"
                  className={`text-gray-300 ${social.color} transition-colors duration-300 text-xl`}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>
            <div className="w-full h-40 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={googleMapsEmbedUrl}
                className="w-full h-full"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Exotic Pets Location"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Exotic Pets. All rights reserved. | 
            <a href="#" className="hover:text-green-400 ml-2">Privacy Policy</a> | 
            <a href="#" className="hover:text-green-400 ml-2">Terms of Service</a>
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Designed with ❤️ for pet lovers everywhere
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default FooterSection;