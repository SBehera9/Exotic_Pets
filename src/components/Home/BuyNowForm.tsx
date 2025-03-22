"use client";

import React, { useRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

interface BuyNowFormProps {
  productName: string;
  unitPrice?: number; // Made optional with a default value
  onClose: () => void;
}

const BuyNowForm: React.FC<BuyNowFormProps> = ({ productName, unitPrice = 0, onClose }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [orderTime, setOrderTime] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(unitPrice); // Default to unitPrice

  useEffect(() => {
    setOrderTime(new Date().toLocaleString());
  }, []);

  useEffect(() => {
    setTotalPrice(unitPrice * quantity); // Auto-update total price
  }, [quantity, unitPrice]);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm("service_t5of1oj", "template_hpda8wv", formRef.current!, "4uN2kcMHYEGfvMOXP")
      .then(() => {
        alert("Order submitted successfully! 🎉");
        formRef.current?.reset();
        onClose();
      })
      .catch((error) => {
        alert("Failed to submit order. Please try again.");
        console.error("Error:", error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/30">
      <div className="bg-white p-6 rounded-xl w-96 shadow-2xl border border-gray-200 relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-xl">✖</button>
        <h2 className="text-3xl font-extrabold text-green-600 text-center mb-5">Buy Now 🛍️</h2>

        <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
          <input type="hidden" name="order_time" value={orderTime} />

          <div>
            <label className="block text-gray-700 font-semibold">Product Name</label>
            <input type="text" name="product_name" value={productName} readOnly className="w-full p-3 bg-gray-100 rounded-lg text-black   " />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full p-3 border rounded-lg text-black"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Total Price</label>
            <input
              type="text"
              name="total_price"
              value={`$${(totalPrice || 0).toFixed(2)}`} 
              readOnly
              className="w-full p-3 bg-gray-100 rounded-lg text-black"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Name</label>
            <input type="text" name="name" placeholder="Enter your name" className="w-full p-3 rounded-lg text-black" required />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Phone Number</label>
            <input type="tel" name="phone" placeholder="Enter your phone number" className="w-full p-3 rounded-lg text-black" required />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Address</label>
            <textarea name="address" placeholder="Enter your address" className="w-full p-3 border rounded-lg text-black" required></textarea>
          </div>

          <div className="flex justify-between">
            <button type="button" className="px-5 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyNowForm;
