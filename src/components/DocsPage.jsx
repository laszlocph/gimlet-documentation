import { useRouter } from 'next/router'

import { useCallback, useEffect, useState } from 'react'
import { Navigation } from '@/components/Navigation'
import clsx from 'clsx'
import Link from 'next/link'
import { Prose } from '@/components/Prose'

export function DocsPage({ children, tableOfContents, className, tabs, code, language, title, section, navigation }) {
  let router = useRouter()

  let allLinks = navigation.flatMap((section) => section.links)
  let linkIndex = allLinks.findIndex((link) => link.href === router.pathname)
  let previousPage = allLinks[linkIndex - 1]
  let nextPage = allLinks[linkIndex + 1]
  
  let currentSection = useTableOfContents(tableOfContents)

  function isActive(section) {
    if (section.id === currentSection) {
      return true
    }
    if (!section.children) {
      return false
    }
    return section.children.findIndex(isActive) > -1
  }

  return (
    <div className="relative mx-auto flex max-w-8xl justify-center sm:px-2 lg:px-8 xl:px-12">
        <div className="hidden lg:relative lg:block lg:flex-none">
          <div className="-ml-0.5 py-16 pl-0.5">
            <Link href="/">
              <a className="block lg:w-auto">
                <span className="sr-only">Home page</span>
                <img src="/logo2.svg" alt="Gimlet" className='h-8 sm:h-10 w-auto block dark:hidden' />
                <img src="/logo-dark.svg" alt="Gimlet" className='h-8 sm:h-10 w-auto hidden dark:block' />
              </a>
            </Link>
            <Navigation
              navigation={navigation}
              isDocsPage={true}
              className="w-64 pr-8 xl:w-72 2xl:pr-16"
            />
          </div>
        </div>
        <div className="min-w-0 max-w-2fxl flex-auto px-4 py-16 lg:max-w-none 2xl:px-16">
          <article>
            {(title || section) && (
              <header className="mb-9 space-y-1">
                {section && (
                  <p className="font-display text-sm font-medium text-sky-500">
                    {section.title}
                  </p>
                )}
                {title && (
                  <h1 className="font-display text-3xl tracking-tight text-zinc-900 dark:text-zinc-100">
                    {title}
                  </h1>
                )}
              </header>
            )}
            <Prose>{children}</Prose>
          </article>
          <dl className="mt-12 flex border-t border-zinc-200 pt-6 dark:border-zinc-800">
            {previousPage && (
              <div>
                <dt className="font-display text-sm font-medium text-zinc-900 dark:text-white">
                  Previous
                </dt>
                <dd className="mt-1">
                  <Link href={previousPage.href}>
                    <a className="text-base font-semibold text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300">
                      &larr; {previousPage.title}
                    </a>
                  </Link>
                </dd>
              </div>
            )}
            {nextPage && (
              <div className="ml-auto text-right">
                <dt className="font-display text-sm font-medium text-zinc-900 dark:text-white">
                  Next
                </dt>
                <dd className="mt-1">
                  <Link href={nextPage.href}>
                    <a className="text-base font-semibold text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300">
                      {nextPage.title} &rarr;
                    </a>
                  </Link>
                </dd>
              </div>
            )}
          </dl>
        </div>
        <div className="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
          <nav aria-labelledby="on-this-page-title" className="w-56">
            {tableOfContents.length > 0 && (
              <>
                <h2
                  id="on-this-page-title"
                  className="font-display text-sm font-medium text-zinc-900 dark:text-white"
                >
                  On this page
                </h2>
                <ul className="mt-4 space-y-3 text-sm">
                  {tableOfContents.map((section) => (
                    <li key={section.id}>
                      <h3>
                        <Link href={`#${section.id}`}>
                          <a
                            className={clsx(
                              isActive(section)
                                ? 'text-sky-500'
                                : 'font-normal text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'
                            )}
                          >
                            {section.title}
                          </a>
                        </Link>
                      </h3>
                      {section.children.length > 0 && (
                        <ul className="mt-2 space-y-3 pl-5 text-zinc-500 dark:text-zinc-400">
                          {section.children.map((subSection) => (
                            <li key={subSection.id}>
                              <Link href={`#${subSection.id}`}>
                                <a
                                  className={
                                    isActive(subSection)
                                      ? 'text-sky-500'
                                      : 'hover:text-zinc-600 dark:hover:text-zinc-300'
                                  }
                                >
                                  {subSection.title}
                                </a>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </nav>
        </div>
      </div>
  )
}

export function useTableOfContents(tableOfContents) {
  let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.id)

  let getHeadings = useCallback(() => {
    function* traverse(node) {
      if (Array.isArray(node)) {
        for (let child of node) {
          yield* traverse(child)
        }
      } else {
        let el = document.getElementById(node.id)
        if (!el) return

        let style = window.getComputedStyle(el)
        let scrollMt = parseFloat(style.scrollMarginTop)

        let top = window.scrollY + el.getBoundingClientRect().top - scrollMt
        yield { id: node.id, top }

        for (let child of node.children ?? []) {
          yield* traverse(child)
        }
      }
    }

    return Array.from(traverse(tableOfContents))
  }, [tableOfContents])

  useEffect(() => {
    let headings = getHeadings()
    if (tableOfContents.length === 0 || headings.length === 0) return
    function onScroll() {
      let sortedHeadings = headings.concat([]).sort((a, b) => a.top - b.top)

      let top = window.pageYOffset
      let current = sortedHeadings[0].id
      for (let i = 0; i < sortedHeadings.length; i++) {
        if (top >= sortedHeadings[i].top) {
          current = sortedHeadings[i].id
        }
      }
      setCurrentSection(current)
    }
    window.addEventListener('scroll', onScroll, {
      capture: true,
      passive: true,
    })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll, {
        capture: true,
        passive: true,
      })
    }
  }, [getHeadings, tableOfContents])

  return currentSection
}
