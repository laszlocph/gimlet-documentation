import { useRouter } from 'next/router'

import { useCallback, useEffect, useState } from 'react'
import { Navigation } from '@/components/Navigation'
import clsx from 'clsx'
import Link from 'next/link'
import { Prose } from '@/components/Prose'

export function DocsPage({ children, tableOfContents, className, tabs, code, language, title, section, navigation }) {
  let router = useRouter()

  const ref = router.pathname.slice(1).replaceAll("/", "-")

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
          <div className="pb-16">
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
                  <h1 className="font-display text-3xl tracking-tight text-neutral-900 dark:text-neutral-100">
                    {title}
                  </h1>
                )}
              </header>
            )}
            <Prose>{children}</Prose>
          </article>
          <dl className="mt-12 flex border-t border-neutral-200 pt-6 dark:border-neutral-800">
            {previousPage && (
              <div>
                <dt className="font-display text-sm font-medium text-neutral-900 dark:text-white">
                  Previous
                </dt>
                <dd className="mt-1">
                  <Link href={previousPage.href}>
                    <span className="text-base font-semibold text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300">
                      &larr; {previousPage.title}
                    </span>
                  </Link>
                </dd>
              </div>
            )}
            {nextPage && (
              <div className="ml-auto text-right">
                <dt className="font-display text-sm font-medium text-neutral-900 dark:text-white">
                  Next
                </dt>
                <dd className="mt-1">
                  <Link href={nextPage.href}>
                    <span className="text-base font-semibold text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300">
                      {nextPage.title} &rarr;
                    </span>
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
                  className="font-display text-sm font-medium text-neutral-900 dark:text-white"
                >
                  On this page
                </h2>
                <ul className="mt-4 space-y-3 text-sm">
                  {tableOfContents.map((section) => (
                    <li key={section.id}>
                      <h3>
                        <Link href={`#${section.id}`}>
                          <span
                            className={clsx(
                              isActive(section)
                                ? 'text-sky-500'
                                : 'font-normal text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300'
                            )}
                          >
                            {section.title}
                          </span>
                        </Link>
                      </h3>
                      {section.children.length > 0 && (
                        <ul className="mt-2 space-y-3 pl-5 text-neutral-500 dark:text-neutral-400">
                          {section.children.map((subSection) => (
                            <li key={subSection.id}>
                              <Link href={`#${subSection.id}`}>
                                <span
                                  className={
                                    isActive(subSection)
                                      ? 'text-sky-500'
                                      : 'hover:text-neutral-600 dark:hover:text-neutral-300'
                                  }
                                >
                                  {subSection.title}
                                </span>
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
