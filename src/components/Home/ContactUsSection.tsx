"use client";

import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone, faEnvelope, faClock } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faMapMarkerAlt, faPhone, faEnvelope, faClock);

const ContactUsSection = () => {
  return (
    <motion.div
      className="bg-gradient-to-b from-white to-green-50 py-12 px-4 sm:px-6 lg:px-8"
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Contact <span className="text-green-600">Information</span>
          </h2>
          <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="w-32 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto rounded-full mb-8"
          />
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            We&apos;re here to help you with any questions about our exotic pets. Reach out through any of these channels.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-3 sm:gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 sm:p-6 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="bg-green-100 p-2 sm:p-3 rounded-full mb-3">
              <FontAwesomeIcon icon="map-marker-alt" className="text-green-600 w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Our Location</h3>
              <p className="text-xs sm:text-sm text-gray-600">Berhampur, Ganjam, Odisha, India</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 sm:p-6 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="bg-green-100 p-2 sm:p-3 rounded-full mb-3">
              <FontAwesomeIcon icon="phone" className="text-green-600 w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Phone Number</h3>
              <p className="text-xs sm:text-sm text-gray-600">+91 89172 14241</p>
              <p className="text-xs sm:text-sm text-gray-500">Available during business hours</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 sm:p-6 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="bg-green-100 p-2 sm:p-3 rounded-full mb-3">
              <FontAwesomeIcon icon="envelope" className="text-green-600 w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Email Address</h3>
              <p className="text-xs sm:text-sm text-gray-600">exoticpets@gmail.com</p>
              <p className="text-xs sm:text-sm text-gray-500">We respond within 24 hours</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 sm:p-6 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="bg-green-100 p-2 sm:p-3 rounded-full mb-3">
              <FontAwesomeIcon icon="clock" className="text-green-600 w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Business Hours</h3>
              <p className="text-xs sm:text-sm text-gray-600">Mon-Sat: 9:00 AM - 7:00 PM</p>
              <p className="text-xs sm:text-sm text-gray-600">Sunday: 10:00 AM - 5:00 PM</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactUsSection;
