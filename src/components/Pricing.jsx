import { Footer } from './home/Footer'
import { CheckIcon } from '@heroicons/react/solid'

const tiers = [
  {
    name: 'Self-Hosted',
    href: 'https://accounts.gimlet.io/signup/',
    priceMonthly: "Free",
    priceYearly: "$300/yr",
    description: 'One-year access to all existing and upcoming Gimlet features.',
    includedFeatures: [
      'All Gimlet features.',
      'Unlimited users.', 
      'Up to 100 deployed services.',
      'Community support.'
    ],
    responsibilities: [
      'Hosting Gimlet',
      'Updating Gimlet to Access Newest Features',
      'Keeping Your Applications & Infrastructure Secure',
    ]
  },
  {
    name: 'Gimlet Cloud',
    href: 'https://accounts.gimlet.io/signup/',
    priceMonthly: "$99/mo",
    priceYearly: "$300/yr",
    description: 'One-year access to all existing and upcoming Gimlet features.',
    includedFeatures: [
      'All Gimlet features.',
      'Unlimited users.',
      'Up to 100 deployed services.',
      'Community support.'
    ],
    responsibilities: [
      'Keeping Your Applications and Cluster Secure'
    ]
  },
]
export function PricingPage() {
  return (
    <>
      <div className="mx-auto max-w-8xl pt-12 sm:pt-16 px-4 sm:px-6 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-center dark:text-neutral-50">One Price Tag, One Year Access</h1>
          <p className="mt-5 text-xl text-neutral-500 sm:text-center dark:text-neutral-300">
          For $300 a year, you’ll get every existing and brand new feature without usage restrictions.
          </p>
          <p className="text-xl text-neutral-500 sm:text-center dark:text-neutral-300">
          Within technical limitations that is. If you need even more freedom, reach out to us.
          </p>
        </div>
        <div className="mt-8 sm:mt-16 space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 sm:space-x-8 sm:mx-auto lg:max-w-4xl">
          {tiers.map((tier) => (
            <div key={tier.name} className="divide-y divide-neutral-200 dark:divide-neutral-600 rounded-lg border border-neutral-200 dark:border-neutral-600 shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-medium leading-6 text-neutral-900 dark:text-neutral-50">{tier.name}</h2>
                <p className="mt-4 text-sm text-neutral-500 h-16 dark:text-neutral-300">{tier.description}</p>
                <p className="mt-8">
                  {tier.name === "Self-Hosted" &&
                    <>
                      <span className="block text-2xl tracking-tight text-neutral-900 dark:text-neutral-50">For individuals and non-profits</span>
                      <span className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">Free</span>
                      <span className="mt-6 block text-2xl tracking-tight text-neutral-900 dark:text-neutral-50">For commercial use</span>
                      <span className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">$300/yr</span>
                    </>
                  }
                  {tier.name !== "Self-Hosted" &&
                    <span className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">{tier.priceYearly}</span>
                  }
                </p>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-50">What&apos;s included</h3>
                <ul role="list" className="mt-6 space-y-2">
                  {tier.includedFeatures.map((feature) => {
                    return (
                    <li key={feature} className="flex space-x-3">
                      <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      <span className="text-sm text-neutral-500 dark:text-neutral-300">{feature}</span>
                    </li>
                    )
                  })}
                </ul>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-50">You’re Responsible For</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {tier.responsibilities.map((feature) => {
                    return (
                    <li key={feature} className="flex space-x-3">
                      <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      <span className="text-sm text-neutral-500 dark:text-neutral-300">{feature}</span>
                    </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="relative mx-auto mt-8 max-w-7xl px-6 lg:px-8">
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-2 sm:px-0">
        <h2 className='subheading !text-left pb-4 pt-6'>About Our Pricing and License</h2>
        <p>We considered our options, and decided that $300 is the most optimal price tag for our tool.</p>
        <p className='mt-6'>For organizations, it&apos;s a budget-friendly price tag compared to the value it offers. Organizations burn substantially more money on the daily developing their in-house solutions, while Gimlet is designed to provide off-the-shelf deployment experience ready to support the most common use cases.</p>
        <p className='mt-6'>For us, it&apos;s money, which we can use to deliver new features, host Gimlet for you and provide community support.</p>
      </div>
      <div className="mx-auto max-w-4xl px-2 sm:px-0">
        <h2 className='subheading !text-left pb-4 pt-6'>Once a year payment</h2>
        <p>Gimlet has one-time annual payments. This means that you&apos;ll get access to every new feature we publish in the 12 months after your purchase.</p>
        <h2 className='subheading !text-left pb-4 pt-6'>When you sign up to Gimlet Cloud</h2>
        <p className='mt-6'>You&apos;ll start with a 7-day trial to evaluate if Gimlet is helpful for you.</p>
        <p className='mt-6'>Your license will expire a year after your purchase.</p>
        <p className='mt-6'>On the technical level, you&apos;ll start off with an ephemeral infrastructure provided by us for the trial period and can&apos;t connect any real clusters until you purchase the license.</p>
        <p className='mt-6'>After your purchase, you can connect your own Kubernetes clusters and move your applications to this permanent infrastructure.</p>
        <iframe width="560" height="315" className='my-16' src="https://www.youtube-nocookie.com/embed/LCk25U7Gaj4?si=dWSzZ2ONoLK1VSTb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <p className='mt-6'>If you decide to not purchase Gimlet, your ephemeral environment will be removed and won&apos;t be recoverable after the trial.</p>
        <h2 className='subheading !text-left pb-4 pt-6'>When you self-host Gimlet</h2>
        <p className='mt-6'>If you self-host Gimlet for commercial purposes, you need to purchase the license, which is $300 for a year. In this case, you’ll be responsible for hosting your Gimlet instance, and also securing it and the underlying infrastructure components.</p>
        <p className='mt-6'>Non-profit and individual use for Gimlet is free and comes without usage limitations.</p>
        <p className='mt-6'>When you self-host Gimlet consider technical limitations. Your infrastructure might impact Gimlet’s performance and you might need more Gimlet instances to sufficiently serve your needs.</p>
      </div>
      <div className="mx-auto max-w-4xl px-2 sm:px-0">
        <h2 className='subheading !text-left pb-4 pt-6'>The Gimlet License</h2>
        <p>Gimlet has a <a className="underline" href="https://en.wikipedia.org/wiki/Source-available_software">source-available</a> license and its source is hosted <a className="underline" href="https://github.com/gimlet-io/gimlet">on Github</a></p>
      </div>
      <div className="mx-auto max-w-4xl px-2 sm:px-0">
        <h2 className='subheading !text-left pb-4 pt-6'>Gimlet Cloud Terms of Service</h2>
        <p><a className="underline" href="/tos">Terms of Service</a></p>
      </div>
      <div className="pt-32">
        <Footer />
      </div>
    </>
  )
}