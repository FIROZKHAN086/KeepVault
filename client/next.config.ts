import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — produces an `out/` folder served by Express
  output: "export",
  trailingSlash: true,
  allowedDevOrigins: ['192.168.1.50'],
};

export default nextConfig;
