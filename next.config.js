/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: false,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
   remotePatterns: [
     {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
      },
     {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
     {
        protocol: 'https',
        hostname: 'unsplash.com',
      },
     {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
     {
        protocol: 'http',
        hostname: '116.118.50.104',
        port: '1337'
      },
     {
        protocol: 'https',
        hostname: 'furmi.net',
      },
      // '127.0.0.1',
      // 'localhost',
      // 'unsplash.com',
      // 'images.unsplash.com',
      // '116.118.50.104',
      // 'furmi.net',
      // 'www.furmi.net',
    ],
    formats: ["image/avif", "image/webp"],
   
  },
  output: "standalone", // use in docker / product ev
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = nextConfig;
