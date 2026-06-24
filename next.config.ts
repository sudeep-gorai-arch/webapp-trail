import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },

      // Render backend, only needed if any image still comes from backend uploads
      {
        protocol: "https",
        hostname: "your-render-backend-url.onrender.com",
      },

      // Cloudflare R2 public dev URL
      {
        protocol: "https",
        hostname: "https://pub-78ef38f5ee054b689206f573153af7ac.r2.dev",
      },

      // Later, if you use custom CDN domain
      {
        protocol: "https",
        hostname: "cdn.flexiwalls.app",
      },

      // Local development
      {
        protocol: "http",
        hostname: "192.168.1.12",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;