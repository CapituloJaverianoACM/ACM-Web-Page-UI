import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "assets.aceternity.com",
      "pbs.twimg.com",
      "drive.google.com",
      "userpic.codeforces.org",
      "cdn.jsdelivr.net",
      "api.microlink.io",
      "api.github.com",
      "avatars.githubusercontent.com",
      "i.imgur.com",
    ],
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
