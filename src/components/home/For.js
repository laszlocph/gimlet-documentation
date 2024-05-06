
const features = [
  {
    name: 'Composition of open-source tools',
    description:
      'Gimlet builds on top of the de-facto open-source tools: Flux and Helm.',
    // icon: CloudArrowUpIcon,
  },
  {
    name: 'No steep on ramp',
    description:
      'There is no major abstraction that you need to adopt in order to get started with Gimlet. We packaged the standard Kubernetes workflows and tools.',
    // icon: LockClosedIcon,
  },
  {
    name: 'Extendable and ejectable',
    description:
      'All Gimlet does is writing standard yaml bits to a git repository.'
    // icon: LockClosedIcon,
  },
  {
    name: 'For teams',
    description:
      'Gimlet works best for teams sized between 3 and 100.',
    // icon: FingerPrintIcon,
  },
]

export function For() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl lg:text-center">
          <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            For people who appreciate Kubernetes, and standardized tooling.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            But don&apos;t want to invest in boilerplate.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-5xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-20 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-relaxed text-gray-900">
                  {/* <feature.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" /> */}
                  {feature.name}
                </dt>
                <dd className="mt-2 flex flex-auto flex-col text-base leading-relaxed text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
