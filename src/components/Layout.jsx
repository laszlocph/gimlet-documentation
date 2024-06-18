import { useRouter } from 'next/router'
import { useState, useEffect } from "react";

import { HomePage } from '@/components/HomePage'
import { PricingPage } from '@/components/Pricing'
import { YamlGenerator } from '@/components/YamlGenerator'
import { Prose } from '@/components/Prose'
import { BlogPage } from './Blogpage'
import { Header } from './Header'
import { DocsPage } from './DocsPage'
import { AIPage } from './AIPage'
import { FrontendPage } from './FrontendPage'
import { BackendPage } from './BackendPage'

export function Layout({ children, title, navigation, tableOfContents, pageProps }) {
  let router = useRouter()
  let isDocsPage = router.pathname.startsWith('/docs') || router.pathname.startsWith('/concepts')
  let isBlogPage = router.pathname.startsWith('/blog')
  let isTOSPage = router.pathname === '/tos'
  let isPricingPage = router.pathname === '/pricing'
  let isYamlGeneratorPage = router.pathname === '/k8s-yaml-generator'
  let isHomePage = router.pathname === '/'
  let isFrontendPage = router.pathname === '/frontend'
  let isBackendPage = router.pathname === '/backend'
  let isAIPage = router.pathname === '/ai-deployment'

  let section = navigation.find((section) =>
    section.links.find((link) => link.href === router.pathname)
  )

  let bg = 'bg-white dark:bg-neutral-900'
  if (isFrontendPage) {
    bg='bg-teal-100 dark:bg-teal-800'
  }
  if (isAIPage) {
    bg='bg-purple-100 dark:bg-purple-800'
  }
  if (isBackendPage) {
    bg='bg-amber-100 dark:bg-amber-800'
  }
  
  const [cookieConsent, setCookieConsent] = useState();

  useEffect(() => {
    const value = window.localStorage.getItem("cookieConsent")
    if (value !== null) {
      setCookieConsent(value);
    }
  }, []);

  useEffect(() => {
    if (cookieConsent !== undefined) {
      window.localStorage.setItem("cookieConsent", cookieConsent);
    }
  }, [cookieConsent]);

  return (
    <div className={bg}>
      { cookieConsent === undefined &&
      <div className='fixed bottom-0 left-0 m-8 rounded bg-neutral-300 text-neutral-900 sm:space-x-4 p-2 text-sm z-40'>
        <span className='block sm:inline'>We use cookies to help us improve gimlet.io</span>
        <span><a href="/tos" className='underline'>Learn more</a></span>
        <span
          className='bg-neutral-900 text-neutral-100 ml-2 sm:ml-0 p-1 px-2 rounded cursor-pointer'
          onClick={() => setCookieConsent(true)}>
            OK
        </span>
      </div>
      }
      {!isYamlGeneratorPage &&
        <Header navigation={navigation} />
      }

      {isHomePage && <HomePage />}
      {isPricingPage && <PricingPage />}
      {isYamlGeneratorPage && <YamlGenerator />}
      {isFrontendPage && <FrontendPage />}
      {isBackendPage && <BackendPage />}
      {isAIPage && <AIPage />}
      {isTOSPage && <Prose className="m-16 max-w-4xl">{children}</Prose>}

      {isBlogPage &&
        <BlogPage
          title={title} section={section}
          pageProps={pageProps} tableOfContents={tableOfContents}
        >
          {children}
        </BlogPage>
      }

      {isDocsPage &&
        <DocsPage
          title={title} section={section}
          navigation={navigation} tableOfContents={tableOfContents}
        >
          {children}
        </DocsPage>
      }
    </div>
  )
}
