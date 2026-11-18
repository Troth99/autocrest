import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: "security",
    serverActions: {
      // Leave room for multipart overhead around document scans up to 5 MB.
      bodySizeLimit: "6mb",
    },
  },
};

export default nextConfig;
