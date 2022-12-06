
export function Message() {
  return (
    <div className="dark:bg-stone-700 py-16 lg:py-32">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 text-gray-600 dark:text-gray-300">
        <div className="space-y-20 overflow-hidden sm:space-y-32 md:space-y-40">
          <section className="text-center px-8">
            <h2 className="text-slate-900 text-3xl tracking-tight font-extrabold lg:text-5xl dark:text-gray-300">
              Dev teams are spending valuable mid and senior engineering time on building internal dev platforms
            </h2>
            <figure>
              <blockquote>
                <p className="mt-6 max-w-4xl mx-auto lg:text-lg">
                  As a consultant, I&apos;ve built platforms on Kubernetes featuring the best tools from <a href="https://landscape.cncf.io/" target="_blank" rel="noopener noreferrer" className="font-bold text-orange-500">the cloud native landscape</a>.
                  I&apos;m also a member of cloud native communities, and what everybody confirmed to me is that platform building efforts, although incremental in nature, take multiple person to build and then maintain.
                  Covering deployment and dev guard rails first, only years in the project they reach the much sought after multi-cluster failover usecases.
                  <br /><br />If you can resist the urge to build everything in-house and give Gimlet a chance,
                  you will see how much your team appreciates it, and how easy it is to further extend.
                </p>
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-center space-x-4 text-left">
                <img
                  src="/laszlo.jpg"
                  alt="Laszlo Fogas"
                  className="w-14 h-14 rounded-full"
                  loading="lazy"
                />
                <div>
                  <div className="text-slate-900 font-semibold dark:text-white">Laszlo Fogas</div>
                  <div className="mt-0.5 text-sm leading-6">Founder of Gimlet</div>
                </div>
              </figcaption>
            </figure>
          </section>
        </div>
      </div>
    </div>
  )
}
