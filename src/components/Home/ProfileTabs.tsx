"use client"; 

import { useState } from "react";

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState("Orders");

  const tabs = ["Our Pets", "Pet Foods"];

  return (
    <div className="py-4">
      <div className="flex justify-center space-x-40 relative">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`cursor-pointer pb-2 text-gray-700 text-2xl ${
              activeTab === tab ? "font-semibold text-black" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {activeTab === tab && (
              <div className="h-1 bg-green-500 mt-1 w-full transition-all"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;
