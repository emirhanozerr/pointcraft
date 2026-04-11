import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  optimizePackageImports: [
    '@mui/material',
    '@mui/icons-material',
    'framer-motion',
  ],
};

export default nextConfig;
