"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

const FooterSection = () => {
  const googleMapsEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.629455988054!2d72.83403317513138!3d18.957408482036875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cd40b047781f%3A0x60b1f1ac6837b024!2sFortune%20Pet%20Shops!5e0!3m2!1sen!2sin!4v1697306139445!5m2!1sen!2sin";

  return (
    <footer className="bg-black text-white py-6 px-4 sm:px-6">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
        <div className="flex justify-center sm:justify-start">
          <Image src="/logo.png" alt="Company Logo" width={130} height={40} className="sm:w-[150px] sm:h-[150px]" />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:text-gray-400">Home</a></li>
            <li><a href="#products" className="hover:text-gray-400">Products</a></li>
            <li><a href="#gallery" className="hover:text-gray-400">Gallery</a></li>
            <li><a href="#contact" className="hover:text-gray-400">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center sm:justify-start gap-4 text-xl">
            <a href="#" className="hover:text-gray-400">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </div>
          <div className="mt-4 text-sm space-y-1">
            <p>Email: exoticpets@gmail.com</p>
            <p>Address: Berhampur, Ganjam, Odisha, India</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Our Location</h3>
          <div className="relative w-full h-48 sm:h-52">
            <iframe
              src={googleMapsEmbedUrl}
              className="w-full h-full rounded-md"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="text-center mt-6 text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Exotic Birds. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterSection;
