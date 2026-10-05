import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    // 90 is reserved for website screenshots: small UI text turns soft at the default 75.
    qualities: [75, 90],
  },
};

export default nextConfig;
