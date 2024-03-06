export default function How() {
  const features = [
    {
      name: 'Launch a Database',
      description: 'Create a database without terminal commands.',
    },
    {
      name: 'Previews and Rollbacks',
      description: 'Test your project before deployments.',
    },
    {
      name: 'Automated Deployments',
      description: 'Make new versions and auto-deploy them.',
    },
    {
      name: 'Every Language Is Supported',
      description: 'React, Next, Rails, Laravel, Streamlit, too.',
    },
    {
      name: 'Deploy From GitHub',
      description: 'Connect your repo and start deploying.',
    },
    {
      name: 'Compatible with Your Infra',
      description: 'Underlying technologies support all infrastructure.',
    },
  ]

  return (
    <div className="mx-auto max-w-4xl px-6 lg:px-8">
      <div className="mx-auto lg:text-center">
        <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Add social login and TLS encryption to your project
        </p>
      </div>
      <div className="mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          {features.map((feature) => (
            <dl key={feature.name} className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                {feature.name}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                <p className="flex-auto">{feature.description}</p>
              </dd>
            </dl>
          ))}
        </dl>
      </div>
    </div>
  )
}
