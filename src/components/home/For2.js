
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
    <div className="overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                For people who appreciate Kubernetes and standardized tooling.
              </p>
              <p className="mt-6 text-base leading-normal text-gray-600">
                But don&apos;t want to invest in boilerplate.
              </p>
              <dl className="mt-10 max-w-xl space-y-6 text-base leading-normal text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-6">
                    <dt className="inline font-semibold text-gray-900">
                      {/* <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" /> */}
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
