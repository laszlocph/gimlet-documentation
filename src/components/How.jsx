export default function How() {
  const features = [
    {
      name: 'Launch a Database',
      description: 'Create a database without terminal commands.',
      image: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 fill-white/10 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>,
    },
    {
      name: 'Previews and Rollbacks',
      description: 'Test your project before deployments.',
      image: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 fill-white/10 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" /></svg>,
    },
    {
      name: 'Automated Deployments',
      description: 'Make new versions and auto-deploy them.',
      image: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-5 w-5 fill-white/10 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"></path></svg>,
    },
    {
      name: 'Every Language Is Supported',
      description: 'React, Next, Rails, Laravel, Streamlit, too.',
      image: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-5 w-5 fill-white/10 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"></path></svg>,
    },
    {
      name: 'Deploy From GitHub',
      description: 'Connect your repo and start deploying.',
      image: <svg className="h-5 w-5 fill-white/10 text-white" width="24" height="24" strokeWidth="1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><path d="M14.3333 19V17.137C14.3583 16.8275 14.3154 16.5163 14.2073 16.2242C14.0993 15.9321 13.9286 15.6657 13.7067 15.4428C15.8 15.2156 18 14.4431 18 10.8989C17.9998 9.99256 17.6418 9.12101 17 8.46461C17.3039 7.67171 17.2824 6.79528 16.94 6.01739C16.94 6.01739 16.1533 5.7902 14.3333 6.97811C12.8053 6.57488 11.1947 6.57488 9.66666 6.97811C7.84666 5.7902 7.05999 6.01739 7.05999 6.01739C6.71757 6.79528 6.69609 7.67171 6.99999 8.46461C6.35341 9.12588 5.99501 10.0053 5.99999 10.9183C5.99999 14.4366 8.19999 15.2091 10.2933 15.4622C10.074 15.6829 9.90483 15.9461 9.79686 16.2347C9.68889 16.5232 9.64453 16.8306 9.66666 17.137V19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.66667 17.7018C7.66667 18.3335 6 17.7018 5 15.7544" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
    {
      name: 'Compatible with Your Infra',
      description: 'Underlying technologies support all infrastructure.',
      image: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="inline h-5 w-5 fill-white/10 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" /></svg>,
    },
  ]

  return (
    <div className="mx-auto max-w-5xl px-6 lg:px-8">
      <div className="mx-auto lg:text-center">
        <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Add social login and TLS encryption to your project
        </p>
      </div>
      <div className="mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-none">
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="transition-all delay-[--delay] duration-[--duration]">
              <div className="flex items-center">
                <div className="rounded border border-white/5 bg-white/5 p-1">
                  {feature.image}
                </div>
                <div className="ml-4 text-lg text-neutral-900 dark:text-neutral-100">{feature.name}</div>
              </div>
              <div className="ml-11 mt-2 pl-0.5 text-sm font-light leading-relaxed text-white/75">{feature.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
