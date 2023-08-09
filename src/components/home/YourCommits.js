
const features = [
  {
    name: 'Navigate your commits.',
    description:
      'You see one git repository at a time so you can focus on your commits.',
    // icon: CloudArrowUpIcon,
  },
  {
    name: 'Know what is deployed,',
    description: 'when and by whom.',
    // icon: LockClosedIcon,
  },
  {
    name: 'Well known deployment actions:',
    description: 'deploy, rollback and preview deploys.',
    // icon: ServerIcon,
  },
]

export function YourCommits() {
  return (
    <div className="overflow-hidden text-zinc-900 dark:text-zinc-400">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <p className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl text-zinc-900 dark:text-zinc-100">Focus on your commits</p>
              <p className="mt-6 text-base leading-normal">
                Gimlet is not an inventory of Kubernetes resources: Pods, Igresses, and ConfigMaps. You focus on your source code.
              </p>
              <dl className="mt-10 max-w-xl space-y-6 text-base leading-normal lg:max-w-none">
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
          <img
            src="/commits.png"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  )
}
