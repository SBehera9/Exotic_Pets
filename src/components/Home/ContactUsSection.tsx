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
      className="bg-gradient-to-b from-white to-green-50 py-16 px-4 sm:px-6 lg:px-8"
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-3">
            Contact <span className="text-green-600">Information</span>
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto rounded-full mb-4" />
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We&apos;re here to help you with any questions about our exotic pets. Reach out through any of these channels.
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Location Card */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex items-start">
            <div className="bg-green-100 p-3 rounded-full mr-4 flex-shrink-0">
              <FontAwesomeIcon icon="map-marker-alt" className="text-green-600 w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Location</h3>
              <p className="text-gray-600 mb-1">Berhampur, Ganjam</p>
              <p className="text-gray-600">Odisha, India</p>
            </div>
          </div>

          {/* Phone Card */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex items-start">
            <div className="bg-green-100 p-3 rounded-full mr-4 flex-shrink-0">
              <FontAwesomeIcon icon="phone" className="text-green-600 w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone Number</h3>
              <p className="text-gray-600 mb-1">+91 89172 14241</p>
              <p className="text-sm text-gray-500">Available during business hours</p>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex items-start">
            <div className="bg-green-100 p-3 rounded-full mr-4 flex-shrink-0">
              <FontAwesomeIcon icon="envelope" className="text-green-600 w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Address</h3>
              <p className="text-gray-600 mb-1">exoticpets@gmail.com</p>
              <p className="text-sm text-gray-500">We respond within 24 hours</p>
            </div>
          </div>

          {/* Hours Card */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex items-start">
            <div className="bg-green-100 p-3 rounded-full mr-4 flex-shrink-0">
              <FontAwesomeIcon icon="clock" className="text-green-600 w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Business Hours</h3>
              <p className="text-gray-600 mb-1">Monday - Saturday: 9:00 AM - 7:00 PM</p>
              <p className="text-gray-600">Sunday: 10:00 AM - 5:00 PM</p>
            </div>
          </div>
        </motion.div>

        {/* Map Embed Placeholder */}
        <motion.div
          className="mt-12 bg-white rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactUsSection;