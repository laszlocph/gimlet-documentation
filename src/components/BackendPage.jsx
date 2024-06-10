import { Footer } from './home/Footer'
import { languages } from './Languages'
import { CTA } from './CallToAction'
import { recommendation } from './Testimonial'

const sections = {
  "Databases & Services": [
    { title: "Containerized database deployments", desc: "Set up PostgreSQL, MySQL, Redis, or MongoDB and any database you use." },
    { title: "Launch queues", desc: "Deploy RabbitMQ, NATS, Kafka, or any other supporting services required for your stack." },
  ],
  "Advanced Deployments": [
    { title: "Git Version Control", desc: "Preview and rollback capabilities of your git branches on GitHub and GitLab." },
    { title: "Continuous Delivery", desc: "Lowered barrier to entry for gitops adoption with automated deployments." },
  ],
  "Grafana & Prometheus Support": [
    { title: "Monitoring and alerts", desc: "Integrate with Prometheus to scrape and store metrics for alerting." },
    { title: "Custom dashboards", desc: "Instrument and create app specific dashboards. Find out how to set up monitoring here." },
  ],
  "No Vendor Lock-In": [
    { title: "Migrate Services Anytime", desc: "Won’t lock you in to a provider. Migrate to any gitops tooling, Kubernetes, or company platform." },
    { title: "Fixed Annual Pricing", desc: "$299 yearly subscription without usage, bandwidth, service, or storage restrictions." },
  ],
};

export function BackendPage() {
  return (
    <div className="bg-amber-600">
      <div className="py-16 sm:py-48 mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mx-auto lg:text-center">
            <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Deploy Containerized Backend Services
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-48 mx-auto max-w-3xl">
        <div className="px-6 py-32 lg:px-8">
          <div className="text-base leading-7 text-neutral-900 dark:text-white space-y-8">
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-center">
              Provision and Manage Your Containerized Stack
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-900 dark:text-white text-center">
              Treat staging and production environments separately.
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
              The most popular backend frameworks are supported.
            </p>
          </div>
          <div className="mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-none space-y-8">
            <dl className="grid max-w-xl grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-3 mt-4">
              {languages["Backend"].map(i => {
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
                        href={i.link}
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
              Already proven its worth in emerging Backend businesses
            </p>
          </div>
          <div className="mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-none grid grid-cols-3">
            {
              recommendation.map((r, idx) => (
                <div key={idx} className="h-full px-2.5">
                  <div className="flex flex-col justify-between rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 px-8 py-6">
                    <div className="pb-4 font-light text-white/75">
                      {`“${r.body}”`}
                    </div>
                    <div className="flex items-center gap-4">
                      <img src={r.author.imageUrl} className="h-9 w-9 rounded-full" />
                      <div className="flex flex-col text-sm">
                        <div className="text-white">{r.author.name}</div>
                        <div className="text-white/75">{r.author.handle}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="py-16 sm:py-48 mx-auto max-w-6xl">
        <CTA
          title="Deploy your backend now, for free."
          list={["Separate provisioning and management for different environments", "Consistent and advanced deployments", "Observability with Grafana and Prometheus stack", "Migrate from Gimlet anytime"]}
        />
      </div>
      <div className="bg-white dark:bg-neutral-700 pt-8">
        <Footer />
      </div>
    </div>
  )
}
