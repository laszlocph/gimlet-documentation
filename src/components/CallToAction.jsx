export function CTA({title, list}) {
  return (
    <div className="mx-auto max-w-5xl items-center">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/90 dark:bg-white/10">
        <div className="absolute inset-0 opacity-25 w-2/3 h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
        <div className="w-full h-full sm:flex justify-between my-8">
          <div className="relative px-6 py-6 sm:px-16 my-auto">
            <div className="absolute inset-0 rounded-full bg-white/10 blur-3xl"></div>
            <h2 className="text-3xl space-y-2 font-bold tracking-tight text-neutral-100 sm:text-4xl my-auto">
              <div className="relative space-y-4">
                <span>{title}</span>
                <div className="flex gap-x-2 sm:gap-x-4">
                  <a
                    href="https://app.gimlet.io"
                    onClick={() => {
                      Fathom.trackGoal('VEWYCI7B', 0)
                      window.location.replace("/accounts/githubAuth")
                    }}
                    className="ctaButton dark:bg-blue-500 dark:hover:bg-blue-400 dark:text-white"
                    rel="noreferrer" target="_blank"
                    >Start deploying</a>
                  <a
                    href="https://calendly.com/laszlo-i6m4/30min"
                    rel="noreferrer" target="_blank"
                    // onClick={() => Fathom.trackGoal('B', 0)}
                    className="secondaryCtaButton bg-neutral-600 hover:bg-neutral-500 dark:bg-neutral-600 dark:hover:bg-neutral-500 !text-neutral-100 !ring-0">Book a demo
                  </a>
                </div>
              </div>
            </h2>
          </div>
          <div className="sm:flex items-center justify-center">
            <span className="h-full w-0.5 bg-gradient-to-b from-transparent via-white/5 to-transparent" aria-hidden="true"></span>
            <ul className="list-disc text-lg sm:text-xl space-y-4 font-bold tracking-tight text-neutral-100 px-8 sm:px-20">
              {list.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
