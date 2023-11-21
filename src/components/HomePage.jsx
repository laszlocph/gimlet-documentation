import { Hero } from '@/components/Hero'
import { Quickstart } from '@/components/Hero'
import { Footer } from './home/Footer'
import Link from 'next/link'
import { Left } from './home/Left'
import { Right } from './home/Right'
import Testimonials from './Testimonial'


export function HomePage({ className, tabs, code, language }) {
  return (
    <>
      <div className="text-center mx-auto max-w-4xl pt-12 sm:pt-16">
        <Link href="/">
          <a>
            <span className="sr-only">Home page</span>
            <img src="/logo2.svg" alt="Gimlet" className='h-10 sm:h-16 inline' />
          </a>
        </Link>
      </div>
      <div className="py-16 sm:py-32">
        <Hero />
      </div>
      <div className="bg-neutral-100 dark:bg-neutral-700 pt-16 pb-16 sm:pb-32 p-4">
        <Quickstart />
      </div>
      <div className="pt-16 pb-16 sm:pb-32 p-4">
        <Why />
      </div>
      <div className="pt-16 pb-16 sm:pb-32 p-4">
        <Saying />
      </div>
      <div className="bg-neutral-100 dark:bg-neutral-700 text-center px-2 md:px-16 py-4 lg:py-32 text-zinc-900 dark:text-zinc-200 text-2xl sm:text-3xl font-bold">
        <p>Join our community!</p>
        <p className="pt-8">Join our <a href="https://discord.com/invite/ZwQDxPkYzE" className="underline">{discordLogo} Discord</a> or star us on <a href="https://github.com/gimlet-io/gimlet" className="underline">{githubLogo}Github</a></p>
      </div>
      <div className="mt-32">
        <Footer />
      </div>
    </>
  )
}

export function Why() {
  return (
    <>
    <div className="mx-auto max-w-4xl">
      <h3 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl text-center">Why Gimlet?</h3>
      {/* <p className="text-2xl font-semibold tracking-tight sm:text-3xl text-zinc-900 dark:text-zinc-100 text-center">Why Gimlet?</p> */}
    </div>
    <div className="pt-8 sm:pt-16 lg:pt-24">
      <Left 
        heading="Platform building is costly"
        text="Building a platform with cloud native tools is a broad and costly exercise."
        features={[
          {
            name: 'Requires the most skilled engineers.',
            description:
              'Engineers that own vast amounts of institutional knowledge and often legacy systems that do not get talked about.',
          },
          {
            name: 'The scope is broad.',
            description: 'The "State of Platform Engineering Report Volume 2" found what we also see in teams: Platform Engineering has to cover a lot. CD is just a fraction of the job, and we believe it can be standardized.',
          },
        ]}
        image="/pe-focus.png"
        alt="Excerpt from the State of Platform Engineering Report Volume 2"
      />
    </div>
    <div className="pt-16 lg:pt-32">
      <Right 
        heading="Batteries included"
        text="Neither FluxCD, ArgoCD or Backstage is a platform. They are building blocks that platform builders have to stitch together. Gimlet did the work for you."
        features={[
          {
            name: 'Gitops-based deployment workflows.',
            description:
              'Deploy, rollback, secret handling, manifest authoring.',
          },
          {
            name: 'Fleet management.',
            description: 'Update all app manifests with the latest compliance needs. Update infrastructure components on all clusters with the latest security patch.',
          },
          {
            name: 'A curated stack of open-source components.',
            description: 'We put together the most common permutations of cloud native tools. We issue updates on a schedule.',
          },
          {
            name: 'Troubleshooting aid.',
            description: 'Get notified when an app is crashing, with context-aware fix suggestions.',
          },
        ]}
        image="/features.png"
        alt=""
      />
    </div>
    <div className="pt-16 lg:pt-32">
      <Left 
        heading="Speaks developer"
        text="Gimlet is not an inventory of Kubernetes resources: Pods, Ingresses, and ConfigMaps. You focus on your source code and pull requests."
        features={[
          {
            name: 'Navigate your code.',
            description:
              'You see one git repository at a time so you can focus on your commits and pull requests.',
          },
          {
            name: 'Know what is deployed,',
            description: 'when and by whom.',
          },
          {
            name: 'Well known deployment actions.',
            description: 'Deploy, rollback and preview deploys.',
          },
        ]}
        image="/service-card.png"
        alt=""
      />
    </div>
    <div className="pt-16 lg:pt-32">
      <Right 
        heading="Gitops promises delivered"
        text="Gitops was supposed to give us an audit log. But all we got is manually cross-referencing technical commits between many repos. Gimlet pulled this together."
        features={[
          {
            name: 'A green CI means a successful deploy again.',
            description:
              'What Flux and ArgoCD broke, Gimlet patched back together. A green CI build means a successful deploy again.',
          },
          {
            name: 'Promotions, rollbacks',
            description: ' - check.',
          },
          {
            name: 'Smoke tests?',
            description: 'We have lifecycle hooks for that.',
          },
        ]}
        image="/auditlog.png"
        alt=""
      />
    </div>
    </>
  )
}

export function Saying() {
  return (
    <>
    <div className="mx-auto max-w-4xl">
      <h3 id="testimonials" className="text-3xl font-bold tracking-tight sm:text-4xl text-neutral-900 dark:text-neutral-100 text-center">We have amazing users</h3>
    </div>
    <div className="pt-8 sm:pt-16 lg:pt-24">
      <Testimonials />
    </div>
    </>
  )
}

export const githubLogo = <svg className="inline" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" /></svg>
export const discordLogo = <svg className="inline" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418Z" /></svg>
export const twitterLogo = <svg className="inline" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><g id="feTwitter0" fill="none" fillRule="evenodd" stroke="none" strokeWidth="1"><g id="feTwitter1" fill="currentColor" fillRule="nonzero"><path id="feTwitter2" d="M8.283 20.263c7.547 0 11.676-6.259 11.676-11.677c0-.176 0-.352-.008-.528A8.36 8.36 0 0 0 22 5.928a8.317 8.317 0 0 1-2.36.649a4.129 4.129 0 0 0 1.808-2.273a8.163 8.163 0 0 1-2.61.993A4.096 4.096 0 0 0 15.847 4a4.109 4.109 0 0 0-4.106 4.106c0 .32.04.632.104.936a11.654 11.654 0 0 1-8.46-4.29a4.115 4.115 0 0 0 1.273 5.482A4.151 4.151 0 0 1 2.8 9.722v.056a4.113 4.113 0 0 0 3.29 4.026a4.001 4.001 0 0 1-1.08.144c-.265 0-.521-.024-.77-.072a4.104 4.104 0 0 0 3.834 2.85a8.231 8.231 0 0 1-5.098 1.76c-.328 0-.656-.016-.976-.056a11.674 11.674 0 0 0 6.283 1.833" /></g></g></svg>
