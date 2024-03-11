import { Footer } from './home/Footer'
import Link from 'next/link'
import { languages } from './Languages'
import { CTA } from './CallToAction'
import { Dropdown } from './Usecases'

const sections = {
  "Branch Previews": [
    { title: "Frontend Testing", desc: "Ship changes and take a look at your application before deploying to production." },
    { title: "Rollbacks & Auto-Deployments", desc: "Advanced deployment capabilities to turn your frontend highly available." },
  ],
  "Security and Support": [
    { title: "HTTPS/SSL", desc: "Secure communication between your app and your users." },
    { title: "All Languages Supported", desc: "Deploy any language and framework you prefer to use." },
  ],
  "Observability": [
    { title: "Integrate with Grafana & Prometheus", desc: "Track performance data of your frontend in real-time." },
    { title: "Analyze Performance Issues", desc: "Find out how you can further improve the performance of your application." },
  ],
  "Fixed Pricing": [
    { title: "One-Time Annual Payment", desc: "$299 billed annually without usage limits, transfer fees and monetization restrictions." },
    { title: "Migrate from Gimlet Anytime", desc: "No strings attached. Feel free to migrate your services anytime." },
  ],
};

export function FrontendPage() {
  return (
    <div className="bg-teal-700">
      <div className="relative isolate pt-12">
        <nav className="mx-auto flex max-w-6xl items-center justify-between p-4" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/">
              <a>
                <span className="sr-only">Home page</span>
                <img src="/logo2.svg" alt="Gimlet" className='h-10 sm:h-12 inline dark:hidden' />
                <img src="/logo-dark.svg" alt="Gimlet" className='h-10 sm:h-12 inline hidden dark:inline' />
              </a>
            </Link>
            <button className="text-zinc-900 dark:text-white text-xl font-bold whitespace-nowrap ml-10">
              <Dropdown />
            </button>
            <button>
              <a href="/pricing" className="text-zinc-900 dark:text-white text-xl font-bold ml-4">
                Pricing
              </a>
            </button>
            <button>
              <a href="/blog" className="text-zinc-900 dark:text-white text-xl font-bold ml-4">
                Blog
              </a>
            </button>
            <button>
              <a href="/docs" className="text-zinc-900 dark:text-white text-xl font-bold ml-4">
                Docs
              </a>
            </button>
          </div>
          <div className="hidden sm:flex lg:flex-1 lg:justify-end gap-x-2">
            <Link href="https://accounts.gimlet.io/signup">
              <button className="text-zinc-900 dark:text-white font-bold py-2 px-4 rounded">
                Sign up
              </button>
            </Link>
            <Link href="https://accounts.gimlet.io">
              <button className="bg-orange-400 hover:bg-orange-700 text-white font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded">
                Log in
              </button>
            </Link>
          </div>
        </nav>
      </div>
      <div className="py-16 sm:py-48 mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mx-auto lg:text-center">
            <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Host Your Frontend Without Billing Surprises
            </p>
          </div>
        </div>
      </div>
      <div className="py-16 sm:py-48 mx-auto max-w-3xl">
        <div className="px-6 py-32 lg:px-8">
          <div className="text-base leading-7 text-zinc-900 dark:text-white space-y-8">
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-center">
              Add Social Sign-In To Your Project Without Next Auth PhD
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-900 dark:text-white text-center">
              Deploy frontend with social media platform integrations for user authentication.
            </p>
            {Object.entries(sections).map(([title, items]) => (
              <div key={title} className="mt-10 max-w-2xl">
                <h1 className="text-xl font-bold tracking-tight sm:text-3xl">
                  {title}
                </h1>
                <ul>
                  {items.map((item) => (
                    <li key={item.title}>
                      <span>
                        <strong className="font-semibold">{item.title}:</strong> {item.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="py-16 sm:py-48 mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mx-auto lg:text-center">
            <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              The most popular frontend frameworks are supported.
            </p>
          </div>
          <div className="mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-none space-y-8">
            <dl className="grid max-w-xl grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-3 mt-4">
              {languages["Frontend"].map(i => {
                return (
                  <div key={i.title}
                    className="group flex flex-col justify-between overflow-hidden rounded-xl bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
                  >
                    <div className="pointer-events-none z-10 flex flex-col gap-1 p-6">
                      <img src={i.source} alt={i.title} className="h-14 w-14 origin-left text-neutral-700" />
                      <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">{i.title}</h3>
                      <p className="max-w-lg text-neutral-400">{i.description}</p>
                    </div>
                    <div className="pointer-events-none bottom-0 flex w-full flex-row items-center p-4 mt-auto">
                      <a
                        href="#"
                        className="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition text-neutral-900 hover:text-neutral-700 dark:text-neutral-100 dark:hover:text-neutral-300 pointer-events-auto underline"
                      >
                        {i.deploy}
                        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="mt-0.5 h-5 w-5 relative top-px -mr-1"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"></path></svg>
                      </a>
                    </div>
                    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10"></div>
                  </div>
                )
              })}
            </dl>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-48 mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mx-auto lg:text-center">
            <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Already proven its worth in emerging AI businesses
            </p>
          </div>
          <div className="mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-none grid grid-cols-3">
            <div className="h-full px-2.5">
              <div className="flex flex-col justify-between rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 px-8 py-6">
                <div className="pb-4 font-light text-white/75">
                  “Accelerate QA with self-service previews and rollbacks of your branches and repositories to the latest stable version.”
                </div>
                <div className="flex items-center gap-4">
                  <img src="/logo.svg" className="h-9 w-9 rounded-full" />
                  <div className="flex flex-col text-sm">
                    <div className="text-white">XZY</div>
                    <div className="text-white/75">abc at DEF</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full px-2.5">
              <div className="flex flex-col justify-between rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 px-8 py-6">
                <div className="pb-4 font-light text-white/75">
                  “Accelerate QA with self-service previews and rollbacks of your branches and repositories to the latest stable version.”
                </div>
                <div className="flex items-center gap-4">
                  <img src="/logo.svg" className="h-9 w-9 rounded-full" />
                  <div className="flex flex-col text-sm">
                    <div className="text-white">XZY</div>
                    <div className="text-white/75">abc at DEF</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full px-2.5">
              <div className="flex flex-col justify-between rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 px-8 py-6">
                <div className="pb-4 font-light text-white/75">
                  “Accelerate QA with self-service previews and rollbacks of your branches and repositories to the latest stable version.”
                </div>
                <div className="flex items-center gap-4">
                  <img src="/logo.svg" className="h-9 w-9 rounded-full" />
                  <div className="flex flex-col text-sm">
                    <div className="text-white">XZY</div>
                    <div className="text-white/75">abc at DEF</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-16 sm:py-48 mx-auto max-w-6xl">
        <CTA
          title="Deploy your frontend now, for free."
          list={["Social sign-in to your app", "Next.js, React, Remix, you name it - you can deploy it", "One-time annual payment. No hidden fees and TOS traps", "Migrate from Gimlet anytime"]}
        />
      </div>
      <div className="text-center px-2 md:px-16 py-4 lg:py-32 text-zinc-900 dark:text-zinc-200 text-2xl sm:text-3xl font-bold">
        <p>Get help, show support!</p>
        <p className="pt-8">Join our <a href="https://discord.com/invite/ZwQDxPkYzE" className="underline">{discordLogo} Discord</a> and star us on <a href="https://github.com/gimlet-io/gimlet" className="underline">{githubLogo}Github</a></p>
      </div>
      <div className="bg-white dark:bg-neutral-700 pt-8">
        <Footer />
      </div>
    </div>
  )
}

export const githubLogo = <svg className="inline" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" /></svg>
export const discordLogo = <svg className="inline" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418Z" /></svg>
export const twitterLogo = <svg className="inline" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><g id="feTwitter0" fill="none" fillRule="evenodd" stroke="none" strokeWidth="1"><g id="feTwitter1" fill="currentColor" fillRule="nonzero"><path id="feTwitter2" d="M8.283 20.263c7.547 0 11.676-6.259 11.676-11.677c0-.176 0-.352-.008-.528A8.36 8.36 0 0 0 22 5.928a8.317 8.317 0 0 1-2.36.649a4.129 4.129 0 0 0 1.808-2.273a8.163 8.163 0 0 1-2.61.993A4.096 4.096 0 0 0 15.847 4a4.109 4.109 0 0 0-4.106 4.106c0 .32.04.632.104.936a11.654 11.654 0 0 1-8.46-4.29a4.115 4.115 0 0 0 1.273 5.482A4.151 4.151 0 0 1 2.8 9.722v.056a4.113 4.113 0 0 0 3.29 4.026a4.001 4.001 0 0 1-1.08.144c-.265 0-.521-.024-.77-.072a4.104 4.104 0 0 0 3.834 2.85a8.231 8.231 0 0 1-5.098 1.76c-.328 0-.656-.016-.976-.056a11.674 11.674 0 0 0 6.283 1.833" /></g></g></svg>
