
const features = [
  {
    name: 'A green CI means a successful deploy again.',
    description:
      'What Flux and ArgoCD broke, Gimlet patched back together. A green CI build means a successfull deploy again.',
    // icon: CloudArrowUpIcon,
  },
  {
    name: 'Promotions, rollbacks',
    description: ' - check.',
    // icon: LockClosedIcon,
  },
  {
    name: 'Smoke tests?',
    description: 'We have lifecycle hooks for that.',
    // icon: ServerIcon,
  },
]

export function GitopsPromises() {
  return (
    <div className="overflow-hidden text-zinc-900 dark:text-zinc-400">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pl-4 lg:pt-4">
            <div className="lg:max-w-lg">
              <p className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl text-zinc-900 dark:text-zinc-100">Gitops promises delivered</p>
              <p className="mt-6 text-base leading-relaxed">
                Gitops was supposed to give us an auditlog. But all we got is manually cross-referencing technical commits between many repos. Gimlet pulled this together.
              </p>
              <dl className="mt-10 max-w-xl space-y-6 text-base leading-relaxed lg:max-w-none">
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
              src="/releases.png"
              alt="Product screenshot"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
