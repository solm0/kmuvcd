import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/calendar",
        permanent: true, // Set `true` for 301 (permanent redirect), `false` for 302 (temporary)
      },
    ];
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    disableOptimizedLoading: true, // Disables some optimizations
  },
  output: "standalone",
};

export default nextConfig;
