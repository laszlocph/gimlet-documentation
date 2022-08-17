import { useState } from 'react'
import { ButtonLink } from '@/components/Button'

export function Gitops() {
  const [tab, setTab] = useState('Deploying an image')

  return (
    <section id="gitops" className="relative">
      <div className="dark:bg-stone-700 py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <svg
            fill="none"
            aria-hidden="true"
            className="text-slate-400 dark:text-stone-400 h-8 w-8"
            stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <circle cx="16" cy="12" r="1"></circle>
            <circle cx="12" cy="8" r="1"></circle>
            <circle cx="12" cy="16" r="1"></circle>
            <path d="M12 15v-6"></path>
            <path d="M15 11l-2 -2"></path>
            <path d="M11 7l-1.9 -1.9"></path>
            <path d="M10.5 20.4l-6.9 -6.9c-.781 -.781 -.781 -2.219 0 -3l6.9 -6.9c.781 -.781 2.219 -.781 3 0l6.9 6.9c.781 .781 .781 2.219 0 3l-6.9 6.9c-.781 .781 -2.219 .781 -3 0z"></path>

          </svg>
          <h2 className="mt-2 font-semibold text-slate-500 dark:text-stone-400">
            Gitops
          </h2>
          <p className="mt-4 text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50">
            Keep everything in git - it&apos;s gitops.
          </p>
          <div className="mt-4 max-w-3xl space-y-6 text-gray-600 dark:text-gray-300">
            Gimlet only interacts with git. It writes your Kubernetes manifests to git when you release, and processes the git history for you to know who did what and when.
            Gimlet comes with conventions so you don&apos;t have to come up with a git repository structure. It also scales out of the box.
          </div>
          <div className='mt-8'>
            <ButtonLink href="/concepts/gitops-conventions" variant="secondary">Learn more</ButtonLink>
          </div>
        </div>

        <div className="mx-auto max-w-2xl items-center px-4 lg:max-w-8xl lg:px-8 xl:px-12">
        </div>
      </div>
    </section>
  )
}
