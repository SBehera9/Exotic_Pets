"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import emailjs from "emailjs-com";

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

    emailjs
      .sendForm(
        "service_t5of1oj",
        "template_hpda8wv",
        formRef.current,
        "4uN2kcMHYEGfvMOXP"
      )
      .then(
        () => {
          alert("Order submitted successfully!");
          localStorage.removeItem("cart");
          window.dispatchEvent(new Event("cartUpdated"));
          onClose();
        },
        () => {
          alert("Failed to send email. Please try again.");
        }
      );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4">
      <div className="bg-white rounded-xl max-w-3xl shadow-lg flex flex-col sm:flex-row relative w-full overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-2xl transition"
          aria-label="Close"
        >
          ✖
        </button>

        <div className="w-full sm:w-1/2 bg-gray-50 p-5 flex flex-col text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            {cartItems.length > 0 ? "Order Summary" : productName}
          </h2>

          <div className="w-full flex-1 overflow-y-auto p-3 max-h-[220px]">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b py-2">
                  <Image src={item.imageUrl} alt={item.name} width={40} height={40} className="rounded-lg" />
                  <p className="text-sm text-gray-700 flex-1 ml-2 truncate">
                    {item.name} (Qty: {item.quantity})
                  </p>
                  <p className="text-sm text-gray-800 font-medium">
                    Rs. {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))
            ) : (
              productImage && (
                <div className="w-28 h-28 mx-auto relative">
                  <Image src={productImage} alt={productName} width={100} height={100} className="rounded-lg" />
                </div>
              )
            )}
          </div>

          {cartItems.length > 0 && (
            <p className="text-lg font-semibold text-gray-900 mt-4">
              Total: Rs. {totalPrice.toFixed(2)}
            </p>
          )}
        </div>

        <div className="w-full sm:w-1/2 p-5">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="order_time" value={orderTime} />
            <input type="hidden" name="total_price" value={totalPrice.toFixed(2)} />
            <input type="hidden" name="product_name" value={productName} />
            <input type="hidden" name="product_image" value={productImage || ""} />

            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                name="address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter your address"
                rows={3}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md font-medium text-lg hover:bg-blue-700 transition"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyNowForm;
