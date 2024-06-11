import { Footer } from './home/Footer'
import { CTA } from './CallToAction'
import Testimonials from './Testimonial'
import Languages from './Languages'
import How from './How'

export function FrontendPage() {
  return (
    <div className="bg-teal-100 dark:bg-teal-800">
      <div className="py-16 sm:py-64 mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mx-auto lg:text-center">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-center sm:text-4xl">
              Host Your Frontend Without Billing Surprises
            </h1>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-3xl">
        <img src="/placeholder.png" alt="Gimlet" className='' />
      </div>
      <div className="py-16 sm:py-32 p-4">
        <How 
          headline="Add Social Sign-In To Your Project Without Next Auth PhD"
          features = {[
            {
              name: 'Deploy From GitHub',
              description: 'Connect your repo and start deploying.',
              image: <svg className="h-5 w-5 fill-white/10 text-white" width="24" height="24" strokeWidth="1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><path d="M14.3333 19V17.137C14.3583 16.8275 14.3154 16.5163 14.2073 16.2242C14.0993 15.9321 13.9286 15.6657 13.7067 15.4428C15.8 15.2156 18 14.4431 18 10.8989C17.9998 9.99256 17.6418 9.12101 17 8.46461C17.3039 7.67171 17.2824 6.79528 16.94 6.01739C16.94 6.01739 16.1533 5.7902 14.3333 6.97811C12.8053 6.57488 11.1947 6.57488 9.66666 6.97811C7.84666 5.7902 7.05999 6.01739 7.05999 6.01739C6.71757 6.79528 6.69609 7.67171 6.99999 8.46461C6.35341 9.12588 5.99501 10.0053 5.99999 10.9183C5.99999 14.4366 8.19999 15.2091 10.2933 15.4622C10.074 15.6829 9.90483 15.9461 9.79686 16.2347C9.68889 16.5232 9.64453 16.8306 9.66666 17.137V19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.66667 17.7018C7.66667 18.3335 6 17.7018 5 15.7544" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg>,
            },
            {
              name: 'Github, Google and more',
              description: 'Deploy your app and enable OAuth Proxy for user authentication.',
              image: <svg className="h-5 w-5 fill-white/10 text-white" width="24" height="24" strokeWidth="1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><path d="M14.3333 19V17.137C14.3583 16.8275 14.3154 16.5163 14.2073 16.2242C14.0993 15.9321 13.9286 15.6657 13.7067 15.4428C15.8 15.2156 18 14.4431 18 10.8989C17.9998 9.99256 17.6418 9.12101 17 8.46461C17.3039 7.67171 17.2824 6.79528 16.94 6.01739C16.94 6.01739 16.1533 5.7902 14.3333 6.97811C12.8053 6.57488 11.1947 6.57488 9.66666 6.97811C7.84666 5.7902 7.05999 6.01739 7.05999 6.01739C6.71757 6.79528 6.69609 7.67171 6.99999 8.46461C6.35341 9.12588 5.99501 10.0053 5.99999 10.9183C5.99999 14.4366 8.19999 15.2091 10.2933 15.4622C10.074 15.6829 9.90483 15.9461 9.79686 16.2347C9.68889 16.5232 9.64453 16.8306 9.66666 17.137V19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.66667 17.7018C7.66667 18.3335 6 17.7018 5 15.7544" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg>,
            },
            {
              name: 'Share Securely',
              description: "Share your app on a URL with TLS provided by Let's Encrypt.",
              image: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 fill-white/10 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" /></svg>,
            },
            {
              name: 'All Frameworks and Languages Supported',
              description: "If you have a Dockerfile, you can deploy.",
              image: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 fill-white/10 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" /></svg>,
            },
            {
              name: 'Previews and Rollbacks',
              description: 'Test your project before launch.',
              image: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 fill-white/10 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" /></svg>,
            },
          ]}
        />
      </div>
      <div className="py-16 sm:py-32 p-4">
        <How 
          headline="Fixed Pricing"
          features = {[
            {
              name: 'One-Time Annual Payment',
              description: '$299 billed annually without usage limits, transfer fees and monetization restrictions.',
              image: <svg className="h-5 w-5 fill-white/10 text-white" width="24" height="24" strokeWidth="1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><path d="M14.3333 19V17.137C14.3583 16.8275 14.3154 16.5163 14.2073 16.2242C14.0993 15.9321 13.9286 15.6657 13.7067 15.4428C15.8 15.2156 18 14.4431 18 10.8989C17.9998 9.99256 17.6418 9.12101 17 8.46461C17.3039 7.67171 17.2824 6.79528 16.94 6.01739C16.94 6.01739 16.1533 5.7902 14.3333 6.97811C12.8053 6.57488 11.1947 6.57488 9.66666 6.97811C7.84666 5.7902 7.05999 6.01739 7.05999 6.01739C6.71757 6.79528 6.69609 7.67171 6.99999 8.46461C6.35341 9.12588 5.99501 10.0053 5.99999 10.9183C5.99999 14.4366 8.19999 15.2091 10.2933 15.4622C10.074 15.6829 9.90483 15.9461 9.79686 16.2347C9.68889 16.5232 9.64453 16.8306 9.66666 17.137V19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.66667 17.7018C7.66667 18.3335 6 17.7018 5 15.7544" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg>,
            },
            {
              name: "Migrate from Gimlet Anytime",
              description: "No strings attached, it's just containers and Kubernetes. Deployed with tools your infra colleagues use already.",
              image: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 fill-white/10 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" /></svg>,
            },
          ]}
        />
      </div>
      <div className="py-16 sm:py-32 p-4">
        <Languages 
          headline="The most popular frontend frameworks are supported."
          groups={["Frontend"]}
        />
      </div>
      <div className="py-16 sm:py-32 px-4 sm:px-0">
        <div className="mx-auto max-w-4xl">
          <h3 id="testimonials" className="subheading">
          Already proven its worth in emerging AI businesses
          </h3>
        </div>
        <div className="pt-8 sm:pt-16 lg:pt-24">
          <Testimonials />
        </div>
      </div>
      <div className="py-16 sm:py-32 sm:pb-56 p-4">
        <CTA
          title="Deploy your frontend now, for free."
          list={["Social sign-in to your app", "Next.js, React, Remix, you name it - you can deploy it", "One-time annual payment. No hidden fees and TOS traps", "Migrate from Gimlet anytime"]}
        />
      </div>
      <Footer />
    </div>
  )
}
