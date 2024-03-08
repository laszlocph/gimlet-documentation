import { useRouter } from 'next/router'

import { HomePage } from '@/components/HomePage'
import { PricingPage } from '@/components/Pricing'
import { YamlGenerator } from '@/components/YamlGenerator'
import { Prose } from '@/components/Prose'
import { EventsPage } from './EventsPage'
import { BlogPage } from './Blogpage'
import { Header } from './Header'
import { DocsPage } from './DocsPage'
import { AIPage } from './AIPage'

export function Layout({ children, title, navigation, tableOfContents, pageProps }) {
  let router = useRouter()
  let isDocsPage = router.pathname.startsWith('/docs') || router.pathname.startsWith('/concepts')
  let isEventsPage = router.pathname.startsWith('/events')
  let isBlogPage = router.pathname.startsWith('/blog')
  let isTOSPage = router.pathname === '/tos'
  let isPricingPage = router.pathname === '/pricing'
  let isYamlGeneratorPage = router.pathname === '/k8s-yaml-generator'
  let isHomePage = router.pathname === '/'
  let isAIPage = router.pathname === '/ai-deployment'

  let section = navigation.find((section) =>
    section.links.find((link) => link.href === router.pathname)
  )

  console.log(router.pathname)
  console.log(isAIPage)

  return (
    <>
      {!isTOSPage && !isYamlGeneratorPage && !isHomePage &&
        <Header navigation={navigation} />
      }

      {isHomePage && <HomePage />}
      {isPricingPage && <PricingPage />}
      {isYamlGeneratorPage && <YamlGenerator />}
      {isAIPage && <AIPage />}

      {isEventsPage && <EventsPage title={title} section={section}>{children}</EventsPage>}

      {isTOSPage &&
        <Prose className="m-16 max-w-4xl">{children}</Prose>
      }

      {isBlogPage && <BlogPage
        title={title} section={section}
        pageProps={pageProps} tableOfContents={tableOfContents}
        >{children}</BlogPage>
      }

      {isDocsPage && <DocsPage 
          title={title} section={section}
          navigation={navigation} tableOfContents={tableOfContents}
        >{children}</DocsPage>
      }
    </>
  )
}
