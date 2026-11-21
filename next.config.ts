import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the project root so a lockfile in a parent folder can't confuse
  // Next.js about which directory to trace.
  outputFileTracingRoot: process.cwd()
};

export default nextConfig;
