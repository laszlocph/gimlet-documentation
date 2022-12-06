
export function Message() {
  return (
    <div className="bg-stone-100 dark:bg-stone-700 py-16 lg:py-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 text-gray-700 dark:text-gray-300">
        <div className="space-y-20 overflow-hidden sm:space-y-32 md:space-y-40">
          <section className="text-center px-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-50 sm:text-4xl">
              Kubernetes is the standard in application deployment
            </h2>
            <figure>
              <blockquote>
                <p className="mt-6 max-w-4xl mx-auto lg:text-lg">
                  But most developers are not empowered to use it efficiently. Teams that embark on their Kubernetes journey 
                  are rushing to fill the void that is called Kubernetes developer experience. 
                  <br /><br />
                  As former cloud consultants, we&apos;ve built platforms featuring the best tools of <a href="https://landscape.cncf.io/" target="_blank" rel="noopener noreferrer" className="font-bold text-orange-500">the cloud native landscape</a>.
                  We are also members of cloud native communities, and everybody confirmed to us that bridging the Kuberenetes experience gap takes multiple person to build and then maintain.
                  Covering deployment and dev guard rails first, only years in the project you reach the much sought after disaster recovery and security usecases.
                  <br /><br />
                  That&apos;s why we started Gimlet in 2020, to build a gitops based developer platform on top of the de-facto standards of the industry, FluxCD and Helm.
                  To give developers and small devops teams tooling that much larger platform teams would build.
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
