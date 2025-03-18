import React from 'react';
import Image from 'next/image';

interface ProductProps {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
}

const Product: React.FC<ProductProps> = ({ id, name, imageUrl, price, description }) => {
  return (
    <div key={id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
      {/* Image */}
      <div className="relative h-48 w-full mb-4">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="contain" // or 'cover' or 'fill' depending on your needs
          className="rounded-md"
        />
      </div>

      {/* Product Name */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>

      {/* Price */}
      <p className="text-md font-bold text-green-600 mb-2">${price.toFixed(2)}</p>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      {/* Buy Now Button */}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline self-start">
        Buy Now
      </button>
    </div>
  );
};

export default Product;