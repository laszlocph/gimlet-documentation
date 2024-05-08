const withMarkdoc = require('@markdoc/next.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  pageExtensions: ['js', 'jsx', 'md'],
}

const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([
  withMarkdoc(),
], nextConfig);
