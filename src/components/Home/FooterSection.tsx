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
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60246.444211460745!2d84.76705668893607!3d19.30832153349362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3d500ef1cb60ad%3A0x5b75778874294ff!2sBrahmapur%2C%20Odisha!5e0!3m2!1sen!2sin!4v1742460668328!5m2!1sen!2sin";

  return (
    <footer className="bg-gradient-to-r from-white to-black text-white py-6 px-4 sm:px-6">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
        <div className="flex justify-center sm:justify-start">
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={130}
            height={40}
            className="sm:w-[150px] sm:h-[150px]"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="text-sm space-y-2">
            <li>
              <a href="#" className="hover:text-gray-400">
                Home
              </a>
            </li>
            <li>
              <a href="/Product" className="hover:text-gray-400">
                Products
              </a>
            </li>
            <li>
              <a href="#gallery" className="hover:text-gray-400">
                Gallery
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-gray-400">
                Contact Us
              </a>
            </li>
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

      <div className="text-center mt-6 text-sm text-white bg-black">
        <p>© {new Date().getFullYear()} Exotic Pets. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterSection;
