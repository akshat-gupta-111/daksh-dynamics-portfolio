// import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'stakshatgupt011246036604.blob.core.windows.net',
        port: '',
        pathname: '/**', // Allows any image path from your containers
      },
    ],
  },
};

module.exports = nextConfig;


// export default nextConfig;
