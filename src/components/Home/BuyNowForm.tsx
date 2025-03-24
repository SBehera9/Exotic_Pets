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
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/30 gap-8">
      <div className="bg-white p-4 rounded-xl max-w-md md:max-w-3xl shadow-2xl border border-gray-200 flex flex-col sm:flex-row relative w-full max-h-[90vh]">

        <button
          onClick={onClose}
          className="absolute top-2 left-5 text-gray-600 hover:text-red-500 text-xl"
        >
          ✖
        </button>

        <div className="w-full sm:w-1/2 bg-gray-100 p-4 rounded-lg flex flex-col items-center text-center">
          <div className="flex-grow">
            {cartItems.length > 0 ? (
              <div>
                <h2 className="text-lg font-bold text-gray-700 mb-2">
                  Order Summary
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto p-2">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="w-full max-w-[200px] flex flex-col items-center"
                    >
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={150}
                        height={150}
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        className="rounded-lg object-cover mb-2"
                      />
                      <p className="text-[10px] sm:text-[13px] text-gray-600 overflow-hidden text-overflow-ellipsis whitespace-nowrap">
                        {item.name} (Qty: {item.quantity})
                      </p>
                      <p className="text-[10px] sm:text-[13px] text-gray-600">
                        Rs. {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {productImage && (
                  <Image
                    src={productImage}
                    alt={productName}
                    width={150}
                    height={150}
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    className="rounded-lg mb-3 object-cover"
                  />
                )}
                <h2 className="text-sm sm:text-lg font-bold text-gray-700">{productName}</h2>
                <p className="text-gray-600">
                  <span className="font-semibold">Price:</span> Rs.{" "}
                  {unitPrice?.toFixed(2)}
                </p>
              </>
            )}
          </div>


          <p className="text-gray-600 mt-2">
            <span className="font-semibold">Total Price:</span> Rs.{" "}
            {totalPrice.toFixed(2)}
          </p>
        </div>

        <div className="w-full sm:w-1/2 p-4">
          <h2 className="text-2xl font-extrabold text-green-600 text-center mb-3">
            Buy Now 🛍️
          </h2>

          <form ref={formRef} onSubmit={sendEmail} className="space-y-3">
            <input type="hidden" name="order_time" value={orderTime} />
            <input
              type="hidden"
              name="products"
              value={cartItems
                .map((item) => `${item.name} (Qty: ${item.quantity})`)
                .join(", ")}
            />
            <input
              type="hidden"
              name="total_price"
              value={totalPrice.toFixed(2)}
            />

            <div>
              <label className="block text-gray-700 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full p-3 border rounded-lg text-black"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                className="w-full p-3 border rounded-lg text-black"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">
                Address
              </label>
              <textarea
                name="address"
                placeholder="Enter your address"
                className="w-full p-3 border rounded-lg text-black"
                required
              ></textarea>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="px-5 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
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