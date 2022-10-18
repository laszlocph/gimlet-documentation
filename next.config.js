const withMarkdoc = require('@markdoc/next.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md'],
}

const redirects = {
  async redirects() {
    return [
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
    ];
  },
};

const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([
  withMarkdoc(),
  redirects,
], nextConfig);
