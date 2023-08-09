import { Footer } from './home/Footer'
import { CheckIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import Link from 'next/link'

const tiers = [
  {
    name: 'Personal / Trial',
    href: 'https://accounts.gimlet.io/signup/',
    priceMonthly: "Free",
    priceYearly: "Free",
    description: 'The perfect tier to test-drive Gimlet without commitments. Unlimited usage for individuals and non-profits.',
    includedFeatures: [
      'All Gimlet features.',
      'Unlimited users.', 
      'x',
      'Community support.'
    ],
  },
  {
    name: 'Startup',
    href: 'https://accounts.gimlet.io/signup/',
    priceMonthly: "$99/mo",
    priceYearly: "$999/yr",
    description: 'Use Gimlet to deploy your first services. Upgrade when you build more.',
    includedFeatures: [
      'All Gimlet features.',
      'Unlimited users.',
      'Up to 10 deployed services.',
      'Community support.'
    ],
  },
  {
    name: 'Growth',
    href: 'https://accounts.gimlet.io/signup/',
    priceMonthly: "$299/mo",
    priceYearly: "$2999/yr",
    description: 'Things are getting serious. Let\'s roll out Gimlet for your growing team. 🚀',
    includedFeatures: [
      'All Gimlet features.',
      'Unlimited users.',
      'Up to 50 deployed services.',
      'Slack support in business-hours.',
      '4 hours dedicated onboarding.',
    ],
  },
  {
    name: 'Scale',
    href: 'https://accounts.gimlet.io/signup/',
    priceMonthly: "$399/mo",
    priceYearly: "$3999/yr",
    description: 'For established teams.',
    includedFeatures: [
      'All Gimlet features.',
      'Unlimited users.',
      'Up to 100 deployed services.',
      'Slack support in business-hours.',
      '4 hours dedicated onboarding.',
    ],
  },
  {
    name: 'Enterprise',
    href: 'mailto:laszlo@gimlet.io',
    priceMonthly: "Let's talk",
    priceYearly: "Let's talk",
    description: 'Unlimited usage, bespoke consultancy.',
    includedFeatures: [
      'All Gimlet features.',
      'Unlimited users.',
      'Deploy without limits.',
      '24/7 Slack support.',
      'Dedicated onboarding.',
      'May include Gimlet and bespoke cloud consultancy.',
      'Gimlet hosted in your cloud, by us.'
    ],
  },
]
export function PricingPage() {
  const [monthly, setMonthly] = useState(true)

  const selected = 'border-zinc-200 bg-white text-zinc-900 shadow-sm';
  const notSelected = 'border-transparent text-zinc-700';

  return (
    <>
      <div>
        <div className="text-center pt-12 sm:pt-16">
          <Link href="/">
            <a>
              <span className="sr-only">Home page</span>
              <img src="/logo.svg" alt="Gimlet" className='h-10 sm:h-16 inline' />
            </a>
          </Link>
        </div>
        <div className="mx-auto max-w-8xl pt-12 px-4 sm:px-6 lg:px-8">
          <div className="sm:align-center sm:flex sm:flex-col">
            <h1 className="text-5xl font-bold tracking-tight text-zinc-900 sm:text-center dark:text-zinc-50">Pricing Plans</h1>
            <p className="mt-5 text-xl text-zinc-500 sm:text-center dark:text-zinc-300">
              Evaluate Gimlet for free, then upgrade to add more services as you roll out. All plans include all features.
            </p>
            <div className="relative mt-24 flex self-center rounded-lg bg-zinc-100 p-0.5">
              <button
                type="button"
                onClick={e => setMonthly(true)}
                className={(monthly ? selected : notSelected) + ' relative w-1/2 whitespace-nowrap rounded-md py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-auto sm:px-8'}
              >
                Monthly billing
              </button>
              <button
                type="button"
                onClick={e => setMonthly(false)}
                className={(!monthly ? selected : notSelected) + ' ml-0.5 relative w-1/2 whitespace-nowrap rounded-md py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-auto sm:px-8'}
              >
                Yearly billing
              </button>
            </div>
          </div>
          <div className="mt-8 space-y-4 sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-5">
            {tiers.map((tier) => (
              <div key={tier.name} className="divide-y divide-zinc-200 dark:divide-zinc-600 rounded-lg border border-zinc-200 dark:border-zinc-600 shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-50">{tier.name}</h2>
                  <p className="mt-4 text-sm text-zinc-500 h-16 dark:text-zinc-300">{tier.description}</p>
                  <p className="mt-8">
                    <span className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{monthly ? tier.priceMonthly : tier.priceYearly}</span>
                  </p>
                  {tier.priceMonthly !== 'Let\'s talk' &&
                  <a
                    href={tier.href}
                    className="mt-10 block w-full rounded-md border border-indigo-600 bg-indigo-600 py-2 text-center text-sm font-semibold text-white hover:bg-zinc-900"
                  >
                    Get Started
                  </a>
                  }
                  {tier.priceMonthly === 'Let\'s talk' &&
                  <a
                    href={tier.href}
                    className="mt-10 block w-full rounded-md border border-indigo-600 bg-indigo-600 py-2 text-center text-sm font-semibold text-white hover:bg-zinc-900"
                  >
                    Get in touch
                  </a>
                  }
                </div>
                <div className="px-6 pt-6 pb-8">
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">What&apos;s included</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {tier.includedFeatures.map((feature) => {
                      if (feature === 'x') {
                        return (
                          <li key={feature} className="flex space-x-3">
                            <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                            <span className="text-sm text-zinc-500 dark:text-zinc-300">3 deployed services, or free, unlimited use for personal projects with our <a href="/blog/our-free-tier" className='underline'>DON&apos;T MAKE ME THINK</a> pledge for individuals and non-profits</span>
                          </li>
                        )
                      }                      


                      return (
                      <li key={feature} className="flex space-x-3">
                        <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                        <span className="text-sm text-zinc-500 dark:text-zinc-300">{feature}</span>
                      </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="relative mx-auto mt-8 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-md lg:max-w-4xl my-8">
            <div className="flex flex-col gap-6 rounded-3xl p-8 ring-1 ring-zinc-900/10 dark:ring-zinc-100/10 m:p-10 lg:flex-row lg:items-center lg:gap-8">
              <div className="lg:min-w-0 lg:flex-1">
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">Self-host</h3>
                <div className="mt-2 text-base leading-7 text-zinc-600 dark:text-zinc-300">
                  You get all Gimlet features without user and number of deployed services limitation if you self-host.
                </div>
              </div>
              <div>
                <a
                  href="/docs/installation"
                  className="inline-block rounded-lg bg-indigo-50 px-4 py-2.5 text-center text-sm font-semibold leading-5 text-indigo-700 hover:bg-indigo-100"
                >
                  Install Gimlet now<span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div className="pt-32">
        <Footer />
      </div>
    </>
  )
}