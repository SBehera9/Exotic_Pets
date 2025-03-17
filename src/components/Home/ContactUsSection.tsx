"use client";

import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faMapMarkerAlt, faPhone, faEnvelope);

const ContactUsSection = () => {
  return (
    <motion.div
      className="bg-white py-10 px-4 flex flex-col items-center text-center sm:py-16 sm:px-6"
      id="contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="mb-6 max-w-sm sm:max-w-md"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mb-3 sm:mb-4">
          Contact Us
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          We'd love to hear from you! Get in touch using the details below.
        </p>
      </motion.div>

      <motion.div
        className="bg-gray-50 rounded-lg shadow-md p-5 sm:p-6 w-full max-w-xs sm:max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Get in Touch
        </h3>
        <div className="flex flex-col sm:flex-row items-center justify-center mb-3">
          <FontAwesomeIcon icon="map-marker-alt" className="text-green-500 mr-2 w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-gray-700 text-sm sm:text-base text-center sm:text-left">
            Berhampur, Ganjam, Odisha, India
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center mb-3">
          <FontAwesomeIcon icon="phone" className="text-green-500 mr-2 w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-gray-700 text-sm sm:text-base text-center sm:text-left">
            +918917214241
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center">
          <FontAwesomeIcon icon="envelope" className="text-green-500 mr-2 w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-gray-700 text-sm sm:text-base text-center sm:text-left">
            exoticpets@gmail.com
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactUsSection;
