import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'assets.aceternity.com', 'pbs.twimg.com', 'drive.google.com', 'userpic.codeforces.org', 'cdn.jsdelivr.net', 'api.microlink.io', 'external-content.duckduckgo.com'],
  },
};

export default nextConfig;
