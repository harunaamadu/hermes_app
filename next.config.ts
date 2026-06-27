import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['10.219.92.82'],
  images: {
    qualities: [25, 50, 75, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.mytheresa.com',
      },
      {
        protocol: 'https',
        hostname: 'www.transparentpng.com',
      },
    ],
  },
};

export default nextConfig;
