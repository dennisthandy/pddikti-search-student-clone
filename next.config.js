/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withPwa = require("next-pwa");

const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: ["avatars.dicebear.com"],
  },
  // async headers() {
  //   return [
  //     {
  //       // matching all API routes
  //       source: "/api/:path*",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "true" },
  //         { key: "Access-Control-Allow-Origin", value: "*" },
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  //         },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value:
  //             "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  //         },
  //         { key: "Connection", value: "keep-alive" },
  //         { key: "Content-Type", value: "application/json; charset=utf-8"}
  //       ],
  //     },
  //   ];
  // },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api-frontend.kemdikbud.go.id/:path*",
      },
    ];
  },
};

module.exports = withPlugins(
  [
    [
      withPwa,
      {
        pwa: {
          dest: "public",
          disable: process.env.NODE_ENV === "development",
          // register: true,
          // scope: '/app',
          // sw: 'service-worker.js',
          //...
        },
      },
    ],
  ],
  nextConfig
);
