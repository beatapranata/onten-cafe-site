import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* A package-lock.json in the home directory made Turbopack infer ~ as the
     workspace root. Pinned so module resolution can't wander out of the
     project. */
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
