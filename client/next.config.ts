import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SERVER_URL: process.env.SERVER_URL,
    GITHUB_API_URL: process.env.GITHUB_API_URL,
    REPOSITORY_URL: process.env.REPOSITORY_URL,
},
  images:{
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
        {protocol: "https", hostname: "**"},
        {protocol: "http", hostname: "**"},
      ],
},
};

export default nextConfig;