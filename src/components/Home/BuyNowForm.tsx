import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

interface BuyNowFormProps {
  productName: string;
  onClose: () => void;
}

const BuyNowForm: React.FC<BuyNowFormProps> = ({ productName, onClose }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_t5of1oj", // Replace with your EmailJS Service ID
        "template_hpda8wv", // Replace with your EmailJS Template ID
        formRef.current!,
        "4uN2kcMHYEGfvMOXP" // Replace with your EmailJS Public Key
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
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/30">
      <div className="bg-white p-6 rounded-xl w-96 shadow-2xl border border-gray-200 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-xl"
        >
          ✖
        </button>

        <h2 className="text-3xl font-extrabold text-green-600 text-center mb-5">
          Buy Now 🛍️
        </h2>

        <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Product Name</label>
            <input
              type="text"
              name="product_name"
              value={productName}
              readOnly
              className="w-full p-3 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg shadow-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 text-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              className="w-full p-3 border border-gray-300 text-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Address</label>
            <textarea
              name="address"
              placeholder="Enter your address"
              className="w-full p-3 border border-gray-300 text-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all"
              required
            ></textarea>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="px-5 py-2 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 transition-all"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyNowForm;
