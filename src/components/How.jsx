export default function How(props) {
  const {headline, features} = props

  return (
    <div className="mx-auto max-w-5xl px-4 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h3 className="subheading">
          {headline}
        </h3>
      </div>
      <div className="mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-none">
        <div className="grid max-w-xl grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="border rounded-lg border-neutral-400 dark:border-white/10 p-4 dark:hover:border-white/20 dark:hover:bg-white/5 transition duration-300">
              <div className="flex items-center">
                <div className="rounded bg-neutral-700 p-1">
                  {feature.image}
                </div>
                <div className="ml-4 text-lg font-medium">{feature.name}</div>
              </div>
              <div className="ml-11 mt-2 pl-0.5 text-sm leading-relaxed dark:text-white/75">{feature.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
