import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Leave room for multipart overhead while the service limits files to 2 MB.
      bodySizeLimit: "3mb",
    },
  },
};

export default nextConfig;
