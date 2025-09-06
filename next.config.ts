import { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

/** Enable analyzer only when ANALYZE=true */
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});


const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "*.ucf.edu",
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
