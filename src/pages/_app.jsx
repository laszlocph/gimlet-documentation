import Head from 'next/head'
import { useEffect } from 'react'
import { slugifyWithCounter } from '@sindresorhus/slugify'

import { Layout } from '@/components/Layout'

import 'focus-visible'
import '@/styles/tailwind.css'
import * as Fathom from "fathom-client";

const navigation = [
  {
    title: 'Overview',
    links: [
      { title: 'The tooling challenge', href: '/docs/tooling-challenge' },
    ],
  },
  {
    title: 'Use-cases',
    links: [
      { title: 'I am a developer', href: '/docs/i-am-a-developer' },
      { title: 'I am a data-scientist/ml engineer', href: '/docs/i-am-a-data-scientist-ml-engineer' },
      { title: 'I am a platform builder', href: '/docs/i-am-a-platform-builder' },
      { title: 'I am a manager / product owner', href: '/docs/i-am-a-manager-produc-owner' },
    ],
  },
  {
    title: 'Getting started',
    links: [
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Deploying your first app', href: '/docs/deploy-your-first-app' },
      { title: 'Deploying your second app', href: '/docs/deploy-your-second-app' },
      { title: 'Deploying a static site', href: '/docs/deploy-a-static-site' },
      { title: 'Concepts', href: '/docs/concepts' },
      { title: 'Using a Dockerfile and CI', href: '/docs/integrate-with-ci' },
      { title: 'Setting up DNS and HTTPS', href: '/docs/setting-up-dns-and-https' },
    ],
  },
  {
    title: 'Guides',
    links: [
      { title: 'Deploying static sites', href: '/docs/deploying-static-sites' },
      { title: 'Managing deployment configs', href: '/docs/how-to-manage-deployment-configs' },
      { title: 'Configuring preview environments', href: '/docs/how-to-configure-preview-environments' },
      { title: 'Rolling back', href: '/docs/rolling-back' },
      { title: 'Container image building', href: '/docs/container-image-building' },
      { title: 'Managing secrets', href: '/docs/how-to-manage-secrets' },
      { title: 'Configuring notifications', href: '/docs/configuring-notifications' },
      { title: 'When Helm is limiting', href: '/docs/when-helm-is-limiting' },
      { title: 'Managing infrastructure components', href: '/docs/managing-infrastructure-components' },
      { title: 'Deploying Gimlet in production', href: '/docs/deploying-gimlet-in-production' },
      { title: 'Upgrading Flux', href: '/docs/gitops-bootstrapping-reference' },
    ],
  },
  {
    title: 'Reference',
    links: [
      { title: 'Gimlet manifest reference', href: '/docs/gimlet-manifest-reference' },
      { title: 'OneChart reference', href: '/docs/onechart-reference' },
      { title: 'Gimlet configuration reference', href: '/docs/gimlet-configuration-reference' },
    ],
  },
  {
    title: 'Appendix',
    links: [
      { title: 'Gimlet compared to...', href: '/concepts/compared-to' },
      { title: 'The SANE gitops guide', href: '/concepts/the-sane-gitops-guide' },
      { title: 'The SANE Helm guide', href: '/concepts/the-sane-helm-guide' },
      { title: 'Flux CRDs', href: '/docs/flux-crds' },
      { title: 'Stack authoring', href: '/docs/stack-authoring' },
      { title: 'YAML Generator', href: '/k8s-yaml-generator' },
    ],
  },
]

function getNodeText(node) {
  let text = ''
  for (let child of node.children ?? []) {
    if (typeof child === 'string') {
      text += child
    }
    text += getNodeText(child)
  }
  return text
}

function collectHeadings(nodes, slugify = slugifyWithCounter()) {
  let sections = []

  for (let node of nodes) {
    if (/^h[23]$/.test(node.name)) {
      let title = getNodeText(node)
      if (title) {
        let id = slugify(title)
        node.attributes.id = id
        if (node.name === 'h3') {
          sections[sections.length - 1].children.push({
            ...node.attributes,
            title,
          })
        } else {
          sections.push({ ...node.attributes, title, children: [] })
        }
      }
    }

    sections.push(...collectHeadings(node.children ?? [], slugify))
  }

  return sections
}

import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  let title = pageProps.markdoc?.frontmatter.title

  const router = useRouter()
  let isYamlGeneratorPage = router.pathname === '/k8s-yaml-generator'

  let pageTitle = 'Gimlet'
  if (pageProps.markdoc?.frontmatter.title) {
    pageTitle = pageProps.markdoc?.frontmatter.title
  }

  let image = "logosocial.png"
  if (pageProps.markdoc?.frontmatter.image_social) {
    image = pageProps.markdoc?.frontmatter.image_social
  }
  if (pageProps.markdoc?.frontmatter.image) {
    image = pageProps.markdoc?.frontmatter.image
  }

  let tableOfContents = pageProps.markdoc?.content
    ? collectHeadings(pageProps.markdoc.content)
    : []

  const currentUrl = "https://gimlet.io" + router.pathname;

  let description = "Need to deploy to Kubernetes, but not sure how to put things together? We got you covered. Gimlet is a gitops based developer platform that gives you the best of open-source out of the box."
  if (pageProps.markdoc?.frontmatter.description) {
    description = pageProps.markdoc?.frontmatter.description
  }
  if (isYamlGeneratorPage) {
    pageTitle = "Kubernetes YAML Generator";
    description = "Generate Kubernetes YAML files for web application deployments. Uses a generic Helm chart, because no one can remember the Kubernetes yaml syntax."
    image = "yaml-generator.png"
  }

  useEffect(() => {
    Fathom.load('TOOENNXR', {
      excludedDomains: ['localhost', "127.0.0.1"],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content={description} />
        <meta content="Gimlet" property="og:site_name" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

        <meta content={pageTitle} property="og:title"/>
        {isYamlGeneratorPage &&
          <meta
            name="keywords"
            content="kubernetes yaml, kubernetes deployment yaml, yaml generator, kubernetes yaml generator, k8s yaml generator, kubectl yaml, kubernetes yaml reference, k8s deployment yaml, yaml template generator, yaml editor for kubernetes, yaml kubernetes, kubernetes yaml templates, yaml editor, kubernetes manifest, web application deployment yaml, web application manifest"
          />
        }
        <meta content="website" property="og:type" />
        <meta content={`https://gimlet.io/${image}`} property="og:image" />
        <meta content={description} property="og:description" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@gimlet_io" />
        <meta name="twitter:creator" content="@gimlet_io" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`https://gimlet.io/${image}`} />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <link rel="canonical" href={currentUrl} />
        <meta content={currentUrl} property="og:url" />

        {/* <script
          src="https://cdn.usefathom.com/script.js"
          data-site="TOOENNXR"
          data-excluded-domains="localhost,127.0.0.1"
          defer>
        </script> */}
      </Head>
      <Layout
        navigation={navigation}
        title={title}
        tableOfContents={tableOfContents}
        pageProps={pageProps}
      >
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
