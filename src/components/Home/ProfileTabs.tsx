"use client";

import { usePathname, useRouter } from "next/navigation";

const tabs = [
  { name: "Our Pets", path: "/our-pets" },
  { name: "Pet Foods", path: "/pet-foods" },
];

const ProfileTabs = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="py-4">
      <div className="flex justify-center space-x-40 relative">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            className={`cursor-pointer pb-2 text-gray-700 text-2xl ${
              pathname === tab.path ? "font-semibold text-black" : ""
            }`}
            onClick={() => router.push(tab.path)}
          >
            {tab.name}
            {pathname === tab.path && (
              <div className="h-1 bg-green-500 mt-1 w-full transition-all"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;
