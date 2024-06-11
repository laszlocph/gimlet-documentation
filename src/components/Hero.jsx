import * as Fathom from "fathom-client";

export function Hero() {

  return (
    <div className="overflow-hidden">
      <main>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div>
              {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:ring-gray-100/10">
                  <span className="text-gray-600 dark:text-gray-300">
                    Announcing our SaaS Early Access. <a href="/blog/announcing-the-gimlet-saas-early-access" onClick={() => Fathom.trackGoal('KDOSOUVD', 0)} className="font-semibold text-indigo-600"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
                  </span>
                </div>
              </div> */}
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-center sm:text-4xl">
                  Deploy and share your frontend, backend or AI project using open-source tooling and social auth
                </h1>
                <div className="pt-16 pb-2 md:flex md:space-x-4 space-x-2 sm:justify-center">
                  <a
                    href="https://app.gimlet.io"
                    className="ctaButton !px-6 !py-3"
                    onClick={() => Fathom.trackGoal('VEWYCI7B', 0)}
                  >
                    Start deploying
                  </a>
                  <a
                    href="https://calendly.com/laszlo-i6m4/30min"
                    className="secondaryCtaButton !px-6 !py-3"
                    onClick={() => Fathom.trackGoal('VEWYCI7B', 0)}
                  >
                    Book a demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
