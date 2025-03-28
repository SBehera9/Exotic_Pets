import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  reactStrictMode: true, // Or whatever your other configurations are
}

module.exports = nextConfig;