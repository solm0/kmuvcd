import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    disableOptimizedLoading: true, // Disables some optimizations
  },
  output: "standalone",
};

export default nextConfig;
