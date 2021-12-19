/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const withPwa = require('next-pwa');

const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  images: {
    domains: ['avatars.dicebear.com'],
  },
}


module.exports = withPlugins([
  [withPwa, {
    pwa: {
      dest: 'public',
      disable: process.env.NODE_ENV === 'development',
      // register: true,
      // scope: '/app',
      // sw: 'service-worker.js',
      //...
    }
  }]
], nextConfig)
