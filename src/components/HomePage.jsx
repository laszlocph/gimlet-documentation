import { Hero } from '@/components/Hero'
import { Footer, discordLogo, githubLogo } from './home/Footer'
import Testimonials from './Testimonial'
import Languages from './Languages'
import How from './How'
import { CTA } from './CallToAction'

export function HomePage() {
  return (
    <>
      <div className="py-16 sm:py-64 mx-auto max-w-6xl">
        <Hero />
      </div>
      <div className="py-16 sm:py-32 p-4">
        <How />
      </div>
      <div className="py-16 sm:py-32 p-4">
        <Languages />
      </div>
      <div className="py-16 sm:py-32 p-4">
        <Saying />
      </div>
      <div className="py-16 sm:py-32 sm:pb-56 p-4">
        <CTA
          title="Deploy your project now, for free."
          list={["Cross OAuth & TLS off your to-do list", "Auto-deployments, previews & rollbacks", "Every language supported", "Migrate from Gimlet anytime"]}
        />
      </div>
      <Footer />
    </>
  )
}

export function ShowSupport() {
  return (
    <div className="text-center px-2 md:px-16 py-4 lg:py-32 text-neutral-900 dark:text-neutral-200 text-2xl sm:text-3xl font-bold">
      <p>Get help, show support!</p>
      <p className="pt-8">Join our <a href="https://discord.com/invite/ZwQDxPkYzE" className="underline">{discordLogo} Discord</a> and star us on <a href="https://github.com/gimlet-io/gimlet" className="underline">{githubLogo}Github</a></p>
    </div>
  )
}

function Saying() {
  return (
    <>
      <div className="mx-auto max-w-4xl">
        <h3 id="testimonials" className="subheading">
          We have amazing users
        </h3>
      </div>
      <div className="pt-8 sm:pt-16 lg:pt-24">
        <Testimonials />
      </div>
    </>
  )
}
