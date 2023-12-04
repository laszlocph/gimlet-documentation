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
            <a
              className="block w-full font-bold before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-zinc-500 before:hidden before:bg-zinc-300 hover:text-zinc-600 hover:before:block dark:text-zinc-400 dark:before:bg-zinc-700 dark:hover:text-zinc-300"
            >
              Docs
            </a>
          </Link>
        </li>
        <li key="pricing" className="relative">
          <Link href="/pricing">
            <a
              className="block w-full font-bold before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-zinc-500 before:hidden before:bg-zinc-300 hover:text-zinc-600 hover:before:block dark:text-zinc-400 dark:before:bg-zinc-700 dark:hover:text-zinc-300"
            >
              Pricing
            </a>
          </Link>
        </li>
        {/* <li key="events" className="relative">
          <Link href="/events">
            <a
              className="block w-full font-bold before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-zinc-500 before:hidden before:bg-zinc-300 hover:text-zinc-600 hover:before:block dark:text-zinc-400 dark:before:bg-zinc-700 dark:hover:text-zinc-300"
            >
              Events
            </a>
          </Link>
        </li> */}
        <li key="blog" className="relative">
          <Link href="/blog">
            <a
              className="block w-full font-bold before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-zinc-500 before:hidden before:bg-zinc-300 hover:text-zinc-600 hover:before:block dark:text-zinc-400 dark:before:bg-zinc-700 dark:hover:text-zinc-300"
            >
              Blog
            </a>
          </Link>
        </li>
        {/* <li key="jobs" className="relative">
          <Link href="https://github.com/gimlet-io/#jobs">
            <a
              className="block w-full font-bold before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-zinc-500 before:hidden before:bg-zinc-300 hover:text-zinc-600 hover:before:block dark:text-zinc-400 dark:before:bg-zinc-700 dark:hover:text-zinc-300"
            >
              Jobs
            </a>
          </Link>
        </li> */}
        </ul>
        {navigation.map((section) => (
          <li key={section.title}>
            <h2 className="font-display font-medium text-zinc-900 dark:text-zinc-100">
              {section.title}
            </h2>
            <ul className="mt-2 space-y-2 border-l-2 border-zinc-100 dark:border-zinc-800 lg:mt-4 lg:border-zinc-200">
              {section.links.map((link) => (
                <li key={link.href} className="relative">
                  <Link href={link.href}>
                    <a
                      className={clsx(
                        'block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full',
                        {
                          'font-semibold text-sky-500 before:bg-sky-500':
                            link.href === router.pathname,
                          'text-zinc-500 before:hidden before:bg-zinc-300 hover:text-zinc-600 hover:before:block dark:text-zinc-400 dark:before:bg-zinc-700 dark:hover:text-zinc-300':
                            link.href !== router.pathname,
                        }
                      )}
                    >
                      {link.title}
                    </a>
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
