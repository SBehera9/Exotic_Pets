'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faMapMarkerAlt, faPhone, faEnvelope);

const ContactUsSection = () => {
    return (
        <motion.div 
            className="bg-white py-20 flex flex-col items-center text-center px-4" 
            id="contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.div 
                className="mb-8 max-w-md"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl font-bold text-green-600 mb-4">Contact Us</h2>
                <p className="text-gray-600">We'd love to hear from you! Get in touch using the form below.</p>
            </motion.div>

            <motion.div 
                className="bg-gray-50 rounded-lg shadow-md p-6 w-full max-w-md mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Get in Touch</h3>
                <div className="flex items-center justify-center mb-3">
                    <FontAwesomeIcon icon="map-marker-alt" className="text-green-500 mr-3 w-5 h-5" />
                    <span className="text-gray-700">Berhampur, Ganjam, Odisha, India</span>
                </div>
                <div className="flex items-center justify-center mb-3">
                    <FontAwesomeIcon icon="phone" className="text-green-500 mr-3 w-5 h-5" />
                    <span className="text-gray-700">+918917214241</span>
                </div>
                <div className="flex items-center justify-center mb-3">
                    <FontAwesomeIcon icon="envelope" className="text-green-500 mr-3 w-5 h-5" />
                    <span className="text-gray-700">exoticpets@gmail.com</span>
                </div>
            </motion.div>

            <motion.div 
                className="bg-gray-50 rounded-lg shadow-md p-6 w-full max-w-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Send us a Message</h3>
                <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Name</label>
                        <input type="text" id="name" className="input-field" placeholder="Your Name" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="mobile" className="block text-gray-700 text-sm font-medium mb-2">Mobile Number</label>
                        <input type="tel" id="mobile" className="input-field" placeholder="Your Mobile Number" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-2">Address</label>
                        <input type="text" id="address" className="input-field" placeholder="Your Address" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-2">Message</label>
                        <textarea id="message" rows={4} className="input-field" placeholder="Your Message" />
                    </div>
                    <motion.div className="flex items-center justify-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded transition duration-200" type="submit">
                            Send Message
                        </button>
                    </motion.div>
                </form>
            </motion.div>

            <style jsx>{`
                .input-field {
                    width: 100%;
                    padding: 8px 12px;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                    outline: none;
                    transition: border-color 0.3s;
                }
                .input-field:focus {
                    border-color: #16a34a;
                    box-shadow: 0 0 5px rgba(22, 163, 74, 0.5);
                }
            `}</style>
        </motion.div>
    );
};

export default ContactUsSection;
