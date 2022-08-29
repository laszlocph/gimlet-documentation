import Head from 'next/head'
import { slugifyWithCounter } from '@sindresorhus/slugify'

import { Layout } from '@/components/Layout'

import 'focus-visible'
import '@/styles/tailwind.css'

const navigation = [
  {
    title: 'Introduction',
    links: [
      { title: 'Getting started', href: '/docs' },
      { title: 'Installation', href: '/docs/installation' },
    ],
  },
  {
    title: 'Core concepts',
    links: [
      { title: 'Components', href: '/concepts/components' },
      { title: 'Gitops conventions', href: '/concepts/gitops-conventions' },
      { title: 'ClickOps', href: '/concepts/clickops' },
      { title: 'Escape hatches', href: '/concepts/escape-hatches' },
    ],
  },
  {
    title: 'Tutorials',
    links: [
      { title: 'Deploy your first app to Kubernetes', href: '/docs/deploy-your-first-app-to-kubernetes' },
      { title: 'Deploy your first app to Kubernetes with Gimlet CLI', href: '/docs/deploy-your-first-app-to-kubernetes-with-gimlet-cli' },
      { title: 'Make Kubernetes an application platform', href: '/docs/make-kubernetes-an-application-platform' },
      { title: 'Make Kubernetes an application platform with Gimlet CLI', href: '/docs/make-kubernetes-an-application-platform-with-gimlet-cli' },
    ],
  },
  {
    title: 'Advanced guides',
    links: [
      { title: 'Managing deployment configs', href: '/docs/how-to-manage-deployment-configs' },
      { title: 'Policy-based releases', href: '/docs/policy-based-releases' },
      { title: 'Configuring preview environments', href: '/docs/how-to-configure-preview-environments' },
      { title: 'Managing secrets', href: '/docs/how-to-manage-secrets' },
      { title: 'Rolling back', href: '/docs/rolling-back' },
      { title: 'When Helm is limiting', href: '/docs/when-helm-is-limiting' },
      { title: 'Managing infrastructure components', href: '/docs/managing-infrastructure-components' },
    ],
  },
  {
    title: 'Reference',
    links: [
      { title: 'Gimlet manifest reference', href: '/docs/gimlet-manifest-reference' },
      { title: 'OneChart reference', href: '/docs/onechart-reference' },
      { title: 'Gitops bootstrapping reference', href: '/docs/gitops-bootstrapping-reference' },
      { title: 'Gimlet Dashboard configuration reference', href: '/docs/gimlet-dashboard-configuration-reference' },
      { title: 'Gimletd configuration reference', href: '/docs/gimletd-configuration-reference' },
      { title: 'Gimlet Agent configuration reference', href: '/docs/gimlet-agent-configuration-reference' },
    ],
  },
  {
    title: 'Appendix',
    links: [
      { title: 'The SANE gitops guide', href: '/concepts/the-sane-gitops-guide' },
      { title: 'The SANE Helm guide', href: '/concepts/the-sane-helm-guide' },
      { title: 'Boostrap gitops automation with Gimlet CLI', href: '/docs/bootstrap-gitops-automation-with-gimlet-cli' },
      { title: 'Flux CRDs', href: '/docs/flux-crds' },
      { title: 'Gimlet Stack concepts', href: '/concepts/gimlet-stack-concepts' },
      { title: 'Stack authoring', href: '/docs/stack-authoring' },
      { title: 'Helm React UI', href: '/blog/helm-react-ui-a-react-component-to-render-ui-for-helm-charts' },
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

  let pageTitle = 'Gimlet'
  if (pageProps.markdoc?.frontmatter.title) {
    pageTitle = `Gimlet - ${pageProps.markdoc?.frontmatter.title}`
  }

  let tableOfContents = pageProps.markdoc?.content
    ? collectHeadings(pageProps.markdoc.content)
    : []

  const router = useRouter()
  const currentUrl = "https://gimlet.io" + router.pathname;

  let description = "Your paved path to Kubernetes"
  if (pageProps.markdoc?.frontmatter.description) {
    description = pageProps.markdoc?.frontmatter.description
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta charset="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content={description} />
        <meta content="Gimlet" property="og:site_name" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>


        <meta content={pageTitle} property="og:title"/>
        <meta content="website" property="og:type" />
        <meta content="https://gimlet.io/logo-social.png" property="og:image" />
        <meta content={description} property="og:description" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@gimlet_io" />
        <meta name="twitter:creator" content="@gimlet_io" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://gimlet.io/logo-social.png" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
    
        <link rel="canonical" href={currentUrl} />
        <meta content={currentUrl} property="og:url" />
        
        <script src="https://cdn.usefathom.com/script.js" data-site="TOOENNXR" defer></script>
      </Head>
      <Layout
        navigation={navigation}
        title={title}
        tableOfContents={tableOfContents}
      >
        <Component {...pageProps} />
      </Layout>
    </>
  )
}