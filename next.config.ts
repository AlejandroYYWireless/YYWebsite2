import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
};
module.exports = {
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev", "127.0.0.1"],
};
export default nextConfig;
