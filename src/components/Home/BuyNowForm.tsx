"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import emailjs from "emailjs-com"; // Import EmailJS

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
  onClose: () => void;
  cartItems?: CartItem[];
}

const BuyNowForm: React.FC<BuyNowFormProps> = ({
  productName,
  productImage,
  onClose,
  cartItems = [],
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [orderTime, setOrderTime] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    setOrderTime(new Date().toLocaleString());
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    // Sending email using EmailJS
    emailjs
      .sendForm(
        "service_t5of1oj", // Replace with your EmailJS service ID
        "template_hpda8wv", // Replace with your EmailJS template ID
        formRef.current,
        "4uN2kcMHYEGfvMOXP" // Replace with your EmailJS public key
      )
      .then(
        (response) => {
          console.log("Email sent successfully!", response);
          alert("Order submitted successfully!");
          localStorage.removeItem("cart");
          window.dispatchEvent(new Event("cartUpdated"));
          onClose();
        },
        (error) => {
          console.error("Error sending email:", error);
          alert("Failed to send email. Please try again.");
        }
      );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/40 p-4">
      <div className="bg-white rounded-2xl max-w-lg sm:max-w-3xl shadow-xl border border-gray-200 flex flex-col sm:flex-row relative w-full max-h-[90vh] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl transition"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="w-full sm:w-1/2 bg-gray-50 p-3 sm:p-4 rounded-t-lg sm:rounded-l-lg sm:rounded-t-none flex flex-col text-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {cartItems.length > 0 ? "Order Summary" : productName}
          </h2>

          <div className="w-full flex-1 overflow-y-auto p-2 sm:p-3 max-h-[200px]">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-gray-200 py-2 last:border-b-0"
                >
                  <div className="w-8 h-8 relative rounded-lg overflow-hidden">
                    <Image src={item.imageUrl} alt={item.name} fill style={{ objectFit: "cover" }} />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 flex-1 ml-2 truncate">
                    {item.name} (Qty: {item.quantity})
                  </p>
                  <p className="text-xs sm:text-sm text-gray-800 font-medium">
                    Rs. {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))
            ) : (
              productImage && (
                <div className="w-24 h-24 mx-auto relative">
                  <Image src={productImage} alt={productName} fill style={{ objectFit: "cover" }} className="rounded-lg" />
                </div>
              )
            )}
          </div>

          <div className="border-t border-gray-200 pt-2 mt-auto">
            <div className="flex justify-between text-sm sm:text-lg font-semibold text-gray-900">
              <span>Total:</span>
              <span>Rs. {totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-1/2 p-3 sm:p-4">
          <div className="bg-gray-50 rounded-b-lg sm:rounded-r-lg p-3 sm:p-4 shadow-md">
            <h2 className="text-xl font-bold text-green-700 text-center mb-3">Order Details</h2>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
              <input type="hidden" name="order_time" value={orderTime} />
              <input type="hidden" name="total_price" value={totalPrice.toFixed(2)} />

              <div>
                <label htmlFor="firstName" className="block text-xs font-medium text-gray-700">First Name</label>
                <input type="text" id="firstName" name="name" className="mt-1 w-full p-2 border rounded-md shadow-sm text-gray-900 text-xs" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-gray-700">Phone Number</label>
                <input type="tel" id="phone" name="phone" className="mt-1 w-full p-2 border rounded-md shadow-sm text-gray-900 text-xs" required value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>

              <div>
                <label htmlFor="address" className="block text-xs font-medium text-gray-700">Address</label>
                <textarea id="address" name="address" className="mt-1 w-full p-2 border rounded-md shadow-sm text-gray-900 text-xs" required value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" className="px-3 py-1 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition text-xs" onClick={onClose}>Cancel</button>
                <button type="submit" className="px-3 py-1 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition text-xs">Place Order</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNowForm;
