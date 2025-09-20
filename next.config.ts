import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This is the configuration for the Next.js Image component.
  // We need to specify the remote hostnames that our application
  // is allowed to load images from.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/api/portraits/**',
      },
    ],
  },
  /* other config options here */
};

export default nextConfig;
