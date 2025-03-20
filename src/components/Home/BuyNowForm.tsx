import React from "react";

interface BuyNowFormProps {
  productName: string;
  onClose: () => void;
}

const BuyNowForm: React.FC<BuyNowFormProps> = ({ productName, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg border">
        <h2 className="text-2xl font-bold text-green-500 mb-4">Buy Now</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-black">Product Name</label>
            <input
              type="text"
              value={productName}
              readOnly
              placeholder="Product Name"
              className="w-full p-2 border border-gray-300 text-green-700 rounded"
            />
          </div>
          <div>
            <label className="block text-black">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-300 text-black rounded"
              required
            />
          </div>
          <div>
            <label className="block text-black">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full p-2 border border-gray-300 text-black rounded"
              required
            />
          </div>
          <div>
            <label className="block text-black">Address</label>
            <textarea
              placeholder="Enter your address"
              className="w-full p-2 border border-gray-300 rounded text-black"
              required
            ></textarea>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyNowForm;
