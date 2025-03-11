'use client';

import React from 'react';
import {
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
} from '@heroicons/react/24/solid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMapMarkerAlt, faPhone, faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faMapMarkerAlt, faPhone, faEnvelope);

const ContactUsSection = () => {
    return (
        <div className="bg-white py-20" id="contact">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-green-600 mb-4">Contact Us</h2>
                    <p className="text-gray-600">We'd love to hear from you! Get in touch using the form below.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Get in Touch</h3>
                        <div className="flex items-center mb-3">
                            <FontAwesomeIcon icon="map-marker-alt" className="text-green-500 mr-3 w-5 h-5" />
                            <span className="text-gray-700">123 Main Street, Anytown, USA</span>
                        </div>
                        <div className="flex items-center mb-3">
                            <FontAwesomeIcon icon="phone" className="text-green-500 mr-3 w-5 h-5" />
                            <span className="text-gray-700">(123) 456-7890</span>
                        </div>
                        <div className="flex items-center mb-3">
                            <FontAwesomeIcon icon="envelope" className="text-green-500 mr-3 w-5 h-5" />
                            <span className="text-gray-700">info@example.com</span>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Send us a Message</h3>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="mobile" className="block text-gray-700 text-sm font-medium mb-2">
                                    Mobile Number
                                </label>
                                <input
                                    type="tel"
                                    id="mobile"
                                    className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
                                    placeholder="Your Mobile Number"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-2">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
                                    placeholder="Your Address"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
                                    placeholder="Your Message"
                                />
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-200"
                                    type="submit"
                                >
                                    Send Message
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