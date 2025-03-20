import Image from "next/image";
import React, { useState } from "react";
import BuyNowForm from "./BuyNowForm";

interface ProductProps {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
}

const Product: React.FC<ProductProps> = ({ name, imageUrl, price, description }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
      <div className="w-full h-[200px] md:h-[250px] mb-2 bg-gray-100 shadow-md rounded-lg overflow-hidden relative">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-md font-bold text-green-600 mb-2">Rs. {price.toFixed(2)}</p>
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline self-start"
      onClick={() => setIsFormOpen(true)}
      >
        Buy Now
      </button>
      {isFormOpen && <BuyNowForm productName={name} onClose={() => setIsFormOpen(false)} />}
    </div>
  );
};

export default Product;