"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import emailjs from "emailjs-com";
import { useRouter } from 'next/navigation';
import { NextPage } from 'next';
import { X, ShoppingCart, CheckCircle, Loader2 } from 'lucide-react';

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
  const [errors, setErrors] = useState({
    firstName: '',
    phone: '',
    address: ''
  });
  const router = useRouter();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      firstName: '',
      phone: '',
      address: ''
    };

    if (!firstName.trim()) {
      newErrors.firstName = 'Full name is required';
      valid = false;
    } else if (firstName.trim().length < 3) {
      newErrors.firstName = 'Name must be at least 3 characters';
      valid = false;
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!/^[0-9]{10}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
      valid = false;
    }

    if (!address.trim()) {
      newErrors.address = 'Address is required';
      valid = false;
    } else if (address.trim().length < 15) {
      newErrors.address = 'Address should be at least 15 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const orderItemsHTML = `
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%; border-collapse: separate; border-spacing: 0; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
          <thead>
            <tr>
              <th style="background-color: #f1f5f9; color: #475569; font-weight: 600; font-size: 12px; text-transform: uppercase; padding: 14px 12px; text-align: left; letter-spacing: 0.5px; padding-left: 20px;">Item</th>
              <th style="background-color: #f1f5f9; color: #475569; font-weight: 600; font-size: 12px; text-transform: uppercase; padding: 14px 12px; text-align: center; letter-spacing: 0.5px;">Qty</th>
              <th style="background-color: #f1f5f9; color: #475569; font-weight: 600; font-size: 12px; text-transform: uppercase; padding: 14px 12px; text-align: right; letter-spacing: 0.5px;">Price</th>
              <th style="background-color: #f1f5f9; color: #475569; font-weight: 600; font-size: 12px; text-transform: uppercase; padding: 14px 12px; text-align: right; letter-spacing: 0.5px; padding-right: 20px;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${cartItems.map(item => `
              <tr>
                <td style="padding: 16px 12px; font-size: 14px; color: #334155; border-bottom: 1px solid #f1f5f9; vertical-align: middle; padding-left: 20px;">
                  ${item.name}
                </td>
                <td style="padding: 16px 12px; font-size: 14px; color: #334155; border-bottom: 1px solid #f1f5f9; vertical-align: middle; text-align: center;">${item.quantity}</td>
                <td style="padding: 16px 12px; font-size: 14px; color: #334155; border-bottom: 1px solid #f1f5f9; vertical-align: middle; text-align: right;">Rs. ${item.price.toFixed(2)}</td>
                <td style="padding: 16px 12px; font-size: 14px; color: #334155; border-bottom: 1px solid #f1f5f9; vertical-align: middle; text-align: right; padding-right: 20px;">Rs. ${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;

      const templateParams = {
        customer_name: firstName,
        customer_phone: phone,
        customer_address: address,
        order_time: new Date().toLocaleString(),
        order_items_html: orderItemsHTML, // ESLint warning can be safely ignored here
        order_subtotal: `Rs. ${totalPrice.toFixed(2)}`,
        order_delivery_fee: totalPrice > 2000 ? 'Free' : 'Rs. 200.00',
        order_total: `Rs. ${(totalPrice > 2000 ? totalPrice : totalPrice + 200).toFixed(2)}`,
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
        router.push('/productss');
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
        <div className="bg-white rounded-xl max-w-md w-full p-8 text-center animate-pop-in">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">Thank you for your purchase. We`&apos;`ll contact you shortly to confirm delivery.</p>
          <button
            onClick={() => {
              onClose();
              router.push('/productss');
            }}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-4xl shadow-2xl flex flex-col sm:flex-row relative overflow-hidden animate-fade-in max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-gray-500 hover:text-red-500 transition p-1.5 rounded-full hover:bg-gray-100"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="w-full sm:w-2/5 bg-gradient-to-b from-green-50 to-gray-50 p-5 sm:p-6 flex flex-col border-b sm:border-b-0 sm:border-r border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="text-green-600" size={22} />
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              {cartItems.length > 0 ? "Your Order Summary" : "Order Details"}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 max-h-[220px] sm:max-h-[300px] custom-scrollbar">
            {cartItems.length > 0 ? (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center gap-3 p-2 sm:p-3 bg-white rounded-lg border border-gray-100 shadow-xs"
                  >
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
                      <Image 
                        src={item.imageUrl} 
                        alt={item.name} 
                        fill
                        className="rounded-md object-cover"
                        sizes="(max-width: 640px) 56px, 64px"
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
                <div className="flex flex-col items-center justify-center h-full py-4">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-4">
                    <Image 
                      src={productImage} 
                      alt={productName} 
                      fill
                      className="rounded-lg object-cover"
                      sizes="(max-width: 640px) 96px, 128px"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-800 text-center">{productName}</h3>
                </div>
              )
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Subtotal:</span>
              <span className="font-medium text-gray-900">
                Rs. {totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="font-medium text-gray-700">Delivery:</span>
              <span className="font-medium text-gray-900">
                {totalPrice > 2000 ? 'Free' : 'Rs. 200.00'}
              </span>
            </div>
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
              <span className="font-bold text-gray-800">Total:</span>
              <span className="font-bold text-lg text-green-600">
                Rs. {(totalPrice > 2000 ? totalPrice : totalPrice + 200).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-3/5 p-5 sm:p-6 md:p-8 overflow-y-auto">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-5">Shipping Information</h2>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setErrors({...errors, firstName: ''});
                }}
                className={`w-full border ${errors.firstName ? 'border-red-400' : 'border-gray-300'} rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition shadow-sm`}
                placeholder="Enter Name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                  {errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">+94</span>
                </div>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setPhone(value.substring(0, 10));
                    setErrors({...errors, phone: ''});
                  }}
                  maxLength={10}
                  className={`w-full border ${errors.phone ? 'border-red-400' : 'border-gray-300'} rounded-lg pl-12 pr-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition shadow-sm`}
                  placeholder="77 123 4567"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
              <textarea
                name="address"
                required
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setErrors({...errors, address: ''});
                }}
                className={`w-full border ${errors.address ? 'border-red-400' : 'border-gray-300'} rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition shadow-sm min-h-[100px]`}
                placeholder="House No, Street, City, Postal Code"
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                  {errors.address}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-bold text-base sm:text-lg hover:from-green-700 hover:to-green-800 transition duration-200 flex items-center justify-center gap-2 shadow-md ${
                  isSubmitting ? 'opacity-90 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Confirm Order - Rs. {(totalPrice > 2000 ? totalPrice : totalPrice + 200).toFixed(2)}
                  </>
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