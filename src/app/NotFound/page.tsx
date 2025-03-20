import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center px-4"> 
        <svg
          width="150"  
          height="150" 
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mb-4"
        >
          <circle cx="100" cy="100" r="80" stroke="#4F46E5" strokeWidth="8" strokeDasharray="502" strokeDashoffset="502">
            <animate attributeName="stroke-dashoffset" dur="4s" repeatCount="indefinite" from="502" to="0" />
            <animate attributeName="stroke" values="#4F46E5;#7C3AED;#A855F7;#4F46E5" dur="8s" repeatCount="indefinite" />
          </circle>
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="30" fill="#4F46E5">404</text> 
        </svg>

        <h1 className="text-3xl font-bold text-gray-800">Page Not Found</h1> 
        <p className="text-lg text-gray-600 mt-2">Sorry, the page you are looking for does not exist.</p>

        <Link href="/" className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go Home
        </Link>
      </div>
    </div>
  );
}