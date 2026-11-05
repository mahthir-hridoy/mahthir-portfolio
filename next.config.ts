
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: process.env.GITHUB_ACTIONS
    ? "/mahthir-portfolio"
    : undefined,

  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
