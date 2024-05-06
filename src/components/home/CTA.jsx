import {trackGoal} from "fathom-client";

export function CTA({ children, className, tabs, code, language, title, section, pageProps, tableOfContents }) {

  return (
    <div className="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:py-32 lg:px-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-50 sm:text-4xl">
        <span className="block">Ready to give it a try?</span>
        <span className="block">The SaaS version takes just a few clicks.</span>
      </h2>
      <div className="mt-8 md:flex justify-center">
        <div className="inline-flex rounded-md shadow">
          <a
            href="https://accounts.gimlet.io/signup/"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
            onClick={() => { console.log("tracking"); trackGoal('EWFJPYJE', 0) }}
          >
            Sign up for our SaaS
          </a>
        </div>
        <div className="mt-4 md:mt-0 ml-3 inline-flex">
          <a
            href="/docs/installation"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-100 px-5 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200"
            onClick={() => { console.log("tracking"); trackGoal('VH3DKGAT', 0) }}
          >
            Or self-host Gimlet
          </a>
        </div>
      </div>
    </div>
  )
}