import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // sharp is a native module used in the image-upload server action.
  serverExternalPackages: ["sharp"],
};

export default nextConfig;
