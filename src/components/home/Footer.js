import Link from 'next/link'
import Image from 'next/image'

const footerNav = [
  {
    'Getting Started': [
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Deploy your first app to Kubernetes', href: '/docs/deploy-your-first-app-to-kubernetes' },
      { title: 'Make Kubernetes an application platform', href: '/docs/make-kubernetes-an-application-platform' },
    ],
    'Core Concepts': [
      { title: 'Components', href: '/concepts/components' },
      { title: 'Gitops conventions', href: '/concepts/gitops-conventions' },
      { title: 'ClickOps', href: '/concepts/clickops' },
      { title: 'Escape hatches', href: '/concepts/escape-hatches' },
      { title: 'Integration to CI', href: '/concepts/integration-to-ci' },
      { title: 'Gimlet compared to...', href: '/concepts/compared-to' },
    ],
  },
  {
    Community: [
      { title: 'GitHub', href: 'https://github.com/gimlet-io/gimlet' },
      { title: 'Discord', href: 'https://discord.com/invite/ZwQDxPkYzE' },
      { title: 'Twitter', href: 'https://twitter.com/gimlet_io' },
      { title: 'YouTube', href: 'https://www.youtube.com/channel/UCMQj-27fzpOWGTKL5nutajA' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="pb-16 text-sm leading-6 mt-32">
      <div className="max-w-7xl mx-auto divide-y divide-slate-200 px-4 sm:px-6 md:px-8 dark:divide-slate-700 text-gray-600 dark:text-gray-300">
        <div className="flex">
          {footerNav.map((sections) => (
            <div
              key={Object.keys(sections).join(',')}
              className="flex-none w-1/2 space-y-10 sm:space-y-8 lg:flex lg:space-y-0"
            >
              {Object.entries(sections).map(([title, items]) => (
                <div key={title} className="lg:flex-none lg:w-1/2">
                  <h2 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
                  <ul className="mt-3 space-y-2">
                    {items.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href}>
                          <a className="hover:text-slate-900 dark:hover:text-slate-300">
                            {item.title}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-16 pt-10">
          <Link href="/">
          <a className="block lg:w-auto">
            <span className="sr-only">Home page</span>
            <img src="/logo.svg" alt="Gimlet" className='h-8 sm:h-10 w-auto block dark:hidden' />
            <img src="/logo-dark.svg" alt="Gimlet" className='h-8 sm:h-10 w-auto hidden dark:block' />
          </a>
        </Link>
        </div>
      </div>
    </footer>
  )
}
