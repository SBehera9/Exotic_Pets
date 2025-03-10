'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faMapMarkerAlt, faPhone, faEnvelope);

const ContactUsSection = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-green-600 text-center mb-8">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="px-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Get in Touch</h3>
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon="map-marker-alt" className="text-green-500 mr-2" />
              <span>123 Main Street, Anytown, USA</span> {/* Replace with real address */}
            </div>
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon="phone" className="text-green-500 mr-2" />
              <span>(123) 456-7890</span> {/* Replace with real phone number */}
            </div>
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon="envelope" className="text-green-500 mr-2" />
              <span>info@example.com</span> {/* Replace with real email address */}
            </div>
          </div>

          {/* Contact Form */}
          <div className="px-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Send us a Message</h3>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="mobile" className="block text-gray-700 text-sm font-bold mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Your Mobile Number"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Your Address"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Your Message"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsSection;