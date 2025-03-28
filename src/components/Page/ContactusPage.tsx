'use client';

import React from 'react';
import Image from 'next/image';

function ContactUsPage() {
  return (
    <div className="bg-gradient-to-br from-green-100 to-blue-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Contact Us
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Get in touch with Exotic Birds for any inquiries or support. We are passionate about birds and eager to assist you!
            </p>

            <div className="mt-8">
              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-5 14h-5a2 2 0 01-2-2V6a2 2 0 012-2h5a2 2 0 012 2v14a2 2 0 01-2 2z"></path>
                </svg>
                <span className="text-gray-700 font-medium">Email:</span>
              </div>
              <p className="text-gray-500 mb-4">info@exoticbirds.com</p>

              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span className="text-gray-700 font-medium">Phone:</span>
              </div>
              <p className="text-gray-500 mb-4">+1 (555) 123-4567</p>

              <div className="flex items-center">
                <svg className="w-6 h-6 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 0011.314 0z"></path>
                </svg>
                <span className="text-gray-700 font-medium">Address:</span>
              </div>
              <p className="text-gray-500">123 Bird Street, Anytown, USA</p>
            </div>
          </div>

          <div className="md:w-1/2 p-8 bg-gray-50">
            <Image
              src="https://images.unsplash.com/photo-1549480173-a416f13d1f9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
              alt="Colorful bird"
              width={600} // Set width explicitly
              height={400} // Set height explicitly
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;
