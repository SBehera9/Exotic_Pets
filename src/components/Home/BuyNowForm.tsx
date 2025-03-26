"use client";

import React, { useRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import Image from "next/image";

interface CartItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

interface BuyNowFormProps {
  productName: string;
  productImage?: string;
  unitPrice?: number;
  onClose: () => void;
  cartItems?: CartItem[];
}

const BuyNowForm: React.FC<BuyNowFormProps> = ({
  productName,
  productImage,
  unitPrice = 0,
  onClose,
  cartItems = [],
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [orderTime, setOrderTime] = useState("");
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    setOrderTime(new Date().toLocaleString());
  }, []);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_t5of1oj",
        "template_hpda8wv",
        formRef.current!,
        "4uN2kcMHYEGfvMOXP"
      )
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
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/40 p-4">
      <div className="bg-white p-6 rounded-2xl max-w-lg sm:max-w-3xl shadow-xl border border-gray-300 flex flex-col sm:flex-row relative w-full max-h-[90vh] overflow-hidden">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 left-4 text-gray-700 hover:text-red-500 text-2xl transition"
        >
          ✖
        </button>

        {/* Order Summary Section */}
        <div className="w-full sm:w-1/2 bg-gray-100 p-5 rounded-lg flex flex-col items-center text-center">
          <h2 className="text-lg font-bold text-gray-700 mb-3">
            {cartItems.length > 0 ? "Order Summary" : productName}
          </h2>

          {cartItems.length > 0 ? (
            <div className="w-full max-h-[250px] overflow-y-auto">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-gray-300 py-2"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded-lg object-cover"
                  />
                  <p className="text-sm text-gray-600 flex-1 ml-2">
                    {item.name} (Qty: {item.quantity})
                  </p>
                  <p className="text-sm text-gray-700 font-semibold">
                    Rs. {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            productImage && (
              <Image
                src={productImage}
                alt={productName}
                width={100}
                height={100}
                className="rounded-lg object-cover mb-3"
              />
            )
          )}

          <p className="text-gray-700 mt-3 font-semibold">
            Total: Rs. {totalPrice.toFixed(2)}
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full sm:w-1/2 p-6">
          <h2 className="text-2xl font-bold text-green-600 text-center mb-4">
            Buy Now 🛍️
          </h2>

          <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
            <input type="hidden" name="order_time" value={orderTime} />
            <input type="hidden" name="products" value={cartItems.map((item) => `${item.name} (Qty: ${item.quantity})`).join(", ")} />
            <input type="hidden" name="total_price" value={totalPrice.toFixed(2)} />

            <div>
              <label className="block text-gray-700 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full p-3 border rounded-lg text-black focus:ring-2 focus:ring-green-400 transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                className="w-full p-3 border rounded-lg text-black focus:ring-2 focus:ring-green-400 transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Address</label>
              <textarea
                name="address"
                placeholder="Enter your address"
                className="w-full p-3 border rounded-lg text-black focus:ring-2 focus:ring-green-400 transition resize-none"
                required
              ></textarea>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="px-5 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default BuyNowForm;
