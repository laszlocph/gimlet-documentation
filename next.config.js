const withMarkdoc = require('@markdoc/next.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md'],
}

const rewrites = {
  async rewrites() {
    return [
      {
        source: '/api/yaml-generator',
        destination: 'https://yaml-generator.gimlet.io',
      },
    ]
  },
}

const redirects = {
  async redirects() {
    return [
      {
        source: '/concepts/components',
        destination: '/docs/concepts',
        permanent: false,
      },
      {
        source: '/signup',
        destination: 'https://accounts.gimlet.io/signup/',
        permanent: false,
      },
      {
        source: '/docs/deploy-your-app-to-kubernetes-without-the-boilerplate/',
        destination: '/docs/deploy-your-first-app-to-kubernetes-with-gimlet-cli',
        permanent: true,
      },
      {
        source: '/docs/deploy-your-app-to-kubernetes-without-the-boilerplate',
        destination: '/docs/deploy-your-first-app-to-kubernetes-with-gimlet-cli',
        permanent: true,
      },

      {
        source: '/docs/how-to-structure-gitops-repositories/',
        destination: '/concepts/gitops-conventions',
        permanent: true,
      },
      {
        source: '/docs/how-to-structure-gitops-repositories',
        destination: '/concepts/gitops-conventions',
        permanent: true,
      },
      {
        source: '/concepts/onechart-concepts/',
        destination: '/docs/onechart-reference',
        permanent: true,
      },
      {
        source: '/concepts/onechart-concepts',
        destination: '/docs/onechart-reference',
        permanent: true,
      },
      {
        source: '/onechart/getting-started',
        destination: '/docs/onechart-reference',
        permanent: true,
      },
      {
        source: '/onechart/getting-started/',
        destination: '/docs/onechart-reference',
        permanent: true,
      },
      {
        source: '/docs/gimlet-agent-configuration-reference',
        destination: '/docs/gimlet-configuration-reference',
        permanent: true,
      },
    ];
  },
};

const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([
  withMarkdoc(),
  redirects,
  rewrites,
], nextConfig);
