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
      { title: 'Introduction', href: '/docs/overview/introduction' },
      { title: 'Quick start', href: '/docs/overview/quick-start' },
    ],
  },
  {
    title: 'Tutorials',
    links: [
      { title: 'Frontend', href: '/docs/tutorials/frontend' },
      { title: 'Backend', href: '/docs/tutorials/backend' },
      { title: 'AI Deployments', href: '/docs/tutorials/ai-deployments' },
    ],
  },
  {
    title: 'Deployments',
    links: [
      { title: 'Deployments', href: '/docs/deployments' },
      { title: 'Preview deployments', href: '/docs/deployments/preview-deployments' },
      { title: 'Rollbacks', href: '/docs/deployments/rollbacks' },
      { title: 'Automated deployments', href: '/docs/deployments/automated-deployments' },
    ],
  },
  {
    title: 'Deployment settings',
    links: [
      { title: 'Deployment settings', href: '/docs/deployment-settings' },
      { title: 'Container Image Settings', href: '/docs/deployment-settings/image-settings' },
      { title: 'Social authentication', href: '/docs/deployment-settings/social-authentication' },
      { title: 'DNS', href: '/docs/deployment-settings/dns' },
      { title: 'Port-forwarding', href: '/docs/deployment-settings/port-forwarding' },
      { title: 'HTTPS', href: '/docs/deployment-settings/https' },
      { title: 'Deployment configuration', href: '/docs/deployment-settings/deployment-configuration' },
      { title: 'Secrets', href: '/docs/deployment-settings/secrets' },
      { title: 'Infrastructure management', href: '/docs/deployment-settings/infrastructure-management' },
      { title: 'Chat notifications', href: '/docs/deployment-settings/chat-notifications' },
      { title: 'Resource Usage', href: '/docs/deployment-settings/resource-usage' },
      { title: 'Volumes', href: '/docs/deployment-settings/volumes' },
    ],
  },
  {
    title: 'Monitoring',
    links: [
      { title: 'Monitoring notes', href: '/docs/monitoring/monitoring-notes' },
      { title: 'Loki', href: '/docs/monitoring/loki' },
      { title: 'Grafana', href: '/docs/monitoring/grafana' },
      { title: 'Prometheus', href: '/docs/monitoring/prometheus' },
      { title: 'Integated Kubernetes alerts', href: '/docs/monitoring/integrated-kubernetes-alerts' },
    ],
  },
  {
    title: 'CLI',
    links: [
      { title: 'CLI', href: '/docs/cli' },
      { title: 'Get started with CLI', href: '/docs/cli/get-started-with-cli' },
      { title: 'CLI Use-cases', href: '/docs/cli/cli-use-cases' },
    ],
  },
  {
    title: 'Kubernetes resources',
    links: [
      { title: 'Kubernetes resources', href: '/docs/kubernetes-resources' },
      { title: 'Kubernetes essentials', href: '/docs/kubernetes-resources/kubernetes-essentials' },
      { title: 'Troubleshooting', href: '/docs/kubernetes-resources/troubleshooting' },
      { title: 'Gimlet manifest reference', href: '/docs/kubernetes-resources/gimlet-manifest-reference' },
    ],
  },
  {
    title: 'Reference',
    links: [
      { title: 'Reference', href: '/docs/reference' },
      { title: 'Gimlet configuration reference', href: '/docs/reference/gimlet-configuration-reference' },
      { title: 'Onechart reference', href: '/docs/reference/onechart-reference' },
      { title: 'Capacitor reference', href: '/docs/reference/capacitor-reference' },
    ],
  },
  {
    title: 'Concepts',
    links: [
      { title: 'Concepts', href: '/docs/concepts' },
    ],
  },
  {
    title: 'Learn-more',
    links: [
      { title: 'Gimlet compared to', href: '/docs/learn-more/gimlet-compared-to' },
      { title: 'FAQ', href: '/docs/learn-more/faq' },
      { title: 'Contact us', href: '/docs/learn-more/contact-us' },
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
  let isDocsPage = router.pathname.startsWith('/docs') || router.pathname.startsWith('/concepts')
  let isBlogPage = router.pathname.startsWith('/blog')
  let isTOSPage = router.pathname === '/tos'
  let isPricingPage = router.pathname === '/pricing'
  let isYamlGeneratorPage = router.pathname === '/k8s-yaml-generator'
  let isHomePage = router.pathname === '/'
  let isFrontendPage = router.pathname === '/frontend'
  let isBackendPage = router.pathname === '/backend'
  let isAIPage = router.pathname === '/ai-deployment'

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

  let tableOfContents = pageProps.markdoc?.frontmatter.toc !== false && pageProps.markdoc?.content
    ? collectHeadings(pageProps.markdoc.content)
    : []

  const currentUrl = "https://gimlet.io" + router.pathname;

  let ogTitle = "Deploy and share your frontend, backend or AI project using open-source tooling and social auth."
  let description = "Deploy and share your frontend, backend or AI project using open-source tooling and social auth."
  if (pageProps.markdoc?.frontmatter.description) {
    description = pageProps.markdoc?.frontmatter.description
  }
  if (pageProps.markdoc?.frontmatter.title) {
    ogTitle = pageProps.markdoc?.frontmatter.title
    pageTitle = pageProps.markdoc?.frontmatter.title
  }
  if (pageProps.markdoc?.frontmatter.ogTitle) {
    ogTitle = pageProps.markdoc?.frontmatter.ogTitle
  }
  if (isYamlGeneratorPage) {
    pageTitle = "Kubernetes YAML Generator"
    ogTitle = "Kubernetes YAML Generator"
    description = "Generate Kubernetes YAML files for web application deployments. Uses a generic Helm chart, because no one can remember the Kubernetes yaml syntax."
    image = "yaml-generator.png"
  }
  if (isFrontendPage) {
    pageTitle = "Frontend";
    ogTitle = "Host Your Frontend Without Billing Surprises"
    description = "Host Your Frontend Without Billing Surprises"
  }
  if (isBackendPage) {
    pageTitle = "Backend";
    ogTitle = "Deploy Containerized Backend Services"
    description = "Deploy Containerized Backend Services"
  }
  if (isAIPage) {
    pageTitle = "AI";
    ogTitle = "Introduce Kubernetes to Your AI Project"
    description = "Introduce Kubernetes to Your AI Project"
  }
  if (isPricingPage) {
    pageTitle = "Pricing";
    ogTitle = "One Price Tag, One Year Access"
    description = "For $300 a year, you’ll get every existing and brand new feature without usage restrictions."
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
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <meta content={pageTitle} property="og:title"/>
        {isYamlGeneratorPage &&
          <meta
            name="keywords"
            content="kubernetes yaml, kubernetes deployment yaml, yaml generator, kubernetes yaml generator, k8s yaml generator, kubectl yaml, kubernetes yaml reference, k8s deployment yaml, yaml template generator, yaml editor for kubernetes, yaml kubernetes, kubernetes yaml templates, yaml editor, kubernetes manifest, web application deployment yaml, web application manifest"
          />
        }
        <meta content="website" property="og:type" />
        <meta content={`https://api.placid.app/u/ghvjld730lsgd?title[text]=${encodeURI(ogTitle)}`} property="og:image" />
        <meta content={description} property="og:description" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@gimlet_io" />
        <meta name="twitter:creator" content="@gimlet_io" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`https://api.placid.app/u/ghvjld730lsgd?title[text]=${encodeURI(ogTitle)}`} />

        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <link rel="canonical" href={currentUrl} />
        <meta content={currentUrl} property="og:url" />
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
