export function Right(props) {

  const { features, heading, text, image, alt } = props

  return (
    <div className="overflow-hidden text-zinc-900 dark:text-zinc-400">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 lg:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pl-12 2xl:pl-20 lg:pt-4">
            <div className="lg:max-w-lg">
              <p className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl text-zinc-900 dark:text-zinc-100">{heading}</p>
              <p className="mt-2 md:mt-4 lg:mt-6 text-base leading-relaxed">
                {text}
              </p>
              <dl className="mt-6 lg:mt-10 max-w-xl space-y-6 text-base leading-relaxed lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-6">
                    <dt className="inline font-semibold text-zinc-900 dark:text-zinc-100">
                      {/* <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" /> */}
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="flex items-start justify-end lg:order-first">
            <img
              src={image}
              alt={alt}
              className="w-full lg:w-[35rem] 2xl:w-[48rem] max-w-none rounded-xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
