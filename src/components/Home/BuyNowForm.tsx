"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import emailjs from "emailjs-com";
import { useRouter } from 'next/navigation';
import { NextPage } from 'next';
import { X, ShoppingCart, CheckCircle } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  description?: string;
}

interface BuyNowFormProps {
  productName: string;
  productImage?: string;
  onClose: () => void;
  cartItems?: CartItem[];
}

const BuyNowForm: NextPage<BuyNowFormProps> = ({
  productName,
  productImage,
  onClose,
  cartItems = [],
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const emailHTML = `...`; // Keep the email template as it is

      const templateParams = {
        customer_name: firstName,
        customer_phone: phone,
        customer_address: address,
        order_time: new Date().toLocaleString(),
        order_items: emailHTML,
        order_total: totalPrice.toFixed(2),
        to_email: 'your@email.com'
      };

      await emailjs.send(
        "service_t5of1oj",
        "template_tiym0oa",
        templateParams,
        "4uN2kcMHYEGfvMOXP"
      );

      setIsSuccess(true);
      setTimeout(() => {
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cartUpdated"));
        onClose();
        router.push('/products');
      }, 1500);
    } catch (error) {
      console.error("Email sending error:", error);
      alert("Failed to send order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">Thank you for your purchase. We&apos;ll contact you shortly.</p>
          <button
            onClick={() => {
              onClose();
              router.push('/products');
            }}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl shadow-2xl flex flex-col sm:flex-row relative overflow-hidden animate-fade-in sm:max-h-[90vh] sm:overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition p-1 rounded-full hover:bg-gray-100"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Order Details Section */}
        <div className="w-full sm:w-2/5 bg-gradient-to-b from-green-50 to-gray-50 p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="text-green-600" size={24} />
            <h2 className="text-xl font-bold text-gray-800">
              {cartItems.length > 0 ? "Your Order" : "Order Details"}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 max-h-[300px] custom-scrollbar">
            {cartItems.length > 0 ? (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image 
                        src={item.imageUrl} 
                        alt={item.name} 
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-800 truncate">{item.name}</h3>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                      Rs. {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              productImage && (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-4">
                    <Image 
                      src={productImage} 
                      alt={productName} 
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 text-center">{productName}</h3>
                </div>
              )
            )}
          </div>
        </div>

        <div className="w-full sm:w-3/5 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Shipping Information</h2>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition"
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition"
                placeholder="+94 77 123 4567"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
              <textarea
                name="address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition min-h-[100px]"
                placeholder="Your complete address with landmarks"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Confirm Order'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyNowForm;
