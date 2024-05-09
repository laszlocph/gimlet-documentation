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
      { title: 'Build with Gimlet', href: '/docs/deployment-settings/build-with-gimlet' },
      { title: 'Social authentication', href: '/docs/deployment-settings/social-authentication' },
      { title: 'DNS', href: '/docs/deployment-settings/dns' },
      { title: 'Port-forwarding', href: '/docs/deployment-settings/port-forwarding' },
      { title: 'HTTPS', href: '/docs/deployment-settings/https' },
      { title: 'Deployment configuration', href: '/docs/deployment-settings/deployment-configuration' },
      { title: 'Secrets', href: '/docs/deployment-settings/secrets' },
      { title: 'Infrastructure management', href: '/docs/deployment-settings/infrastructure-management' },
      { title: 'Chat notifications', href: '/docs/deployment-settings/chat-notifications' },
      { title: 'Resource Usage', href: '/docs/deployment-settings/resource-usage' },
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
      { title: 'Volumes', href: '/docs/kubernetes-resources/volumes' },
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
      { title: 'ONCE/BUSL', href: '/docs/learn-more/once-busl' },
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

  let tableOfContents = pageProps.markdoc?.frontmatter.toc !== false && pageProps.markdoc?.content
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
