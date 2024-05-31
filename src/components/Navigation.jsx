import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

export function Navigation({ navigation, className, isDocsPage }) {
  let router = useRouter()

  return (
    <nav className={clsx('text-base lg:text-sm', className)}>
      <ul className="space-y-9">
        <ul className="block lg:hidden">
        <li key="docs" className="relative">
          <Link href="/docs">
            <span
              className="block w-full font-bold before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-neutral-500 before:hidden before:bg-neutral-300 hover:text-neutral-600 hover:before:block dark:text-neutral-400 dark:before:bg-neutral-700 dark:hover:text-neutral-300"
            >
              Docs
            </span>
          </Link>
        </li>
        <li key="pricing" className="relative">
          <Link href="/pricing">
            <span
              className="block w-full font-bold before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-neutral-500 before:hidden before:bg-neutral-300 hover:text-neutral-600 hover:before:block dark:text-neutral-400 dark:before:bg-neutral-700 dark:hover:text-neutral-300"
            >
              Pricing
            </span>
          </Link>
        </li>
        {/* <li key="events" className="relative">
          <Link href="/events">
            <a
              className="block w-full font-bold before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-neutral-500 before:hidden before:bg-neutral-300 hover:text-neutral-600 hover:before:block dark:text-neutral-400 dark:before:bg-neutral-700 dark:hover:text-neutral-300"
            >
              Events
            </a>
          </Link>
        </li> */}
        <li key="blog" className="relative">
          <Link href="/blog">
            <span
              className="block w-full font-bold before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-neutral-500 before:hidden before:bg-neutral-300 hover:text-neutral-600 hover:before:block dark:text-neutral-400 dark:before:bg-neutral-700 dark:hover:text-neutral-300"
            >
              Blog
            </span>
          </Link>
        </li>
        {/* <li key="jobs" className="relative">
          <Link href="https://github.com/gimlet-io/#jobs">
            <a
              className="block w-full font-bold before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-neutral-500 before:hidden before:bg-neutral-300 hover:text-neutral-600 hover:before:block dark:text-neutral-400 dark:before:bg-neutral-700 dark:hover:text-neutral-300"
            >
              Jobs
            </a>
          </Link>
        </li> */}
        </ul>
        {navigation.map((section) => (
          <li key={section.title}>
            <h2 className="font-display font-medium text-neutral-900 dark:text-neutral-100">
              {section.title}
            </h2>
            <ul className="mt-2 space-y-2 border-l-2 border-neutral-100 dark:border-neutral-800 lg:mt-4 lg:border-neutral-200">
              {section.links.map((link) => (
                <li key={link.href} className="relative">
                  <Link href={link.href}>
                    <span
                      className={clsx(
                        'block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full',
                        {
                          'font-semibold text-sky-500 before:bg-sky-500':
                            link.href === router.pathname,
                          'text-neutral-500 before:hidden before:bg-neutral-300 hover:text-neutral-600 hover:before:block dark:text-neutral-400 dark:before:bg-neutral-700 dark:hover:text-neutral-300':
                            link.href !== router.pathname,
                        }
                      )}
                    >
                      {link.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}
