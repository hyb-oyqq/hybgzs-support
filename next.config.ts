import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "account.hybgzs.com" },
      { protocol: "https", hostname: "connect.linux.do" },
      { protocol: "https", hostname: "connect.linuxdo.org" },
    ],
  },
};

export default nextConfig;
