import { useState } from 'react'
import { ButtonLink } from '@/components/Button'
import { CodeWindow } from '@/components/CodeWindow'

export function Bring() {
  return (
    <section id="yaml-authoring" className="relative">
      <div className="bg-rose-100 dark:bg-rose-900 py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <svg
            fill="none"
            aria-hidden="true"
            className="text-rose-400 dark:text-rose-600 h-8 w-8"
            stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <h2 className="mt-2 font-semibold text-rose-500 dark:text-rose-600">
            Integration
          </h2>
          <p className="mt-4 text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50">
            <Widont>Bring your own cluster.</Widont>
          </p>
          <div className="mt-4 max-w-3xl space-y-6 text-gray-600 dark:text-gray-300">
            <p>
            Or namespace. Gimlet is not magic hosting. <br/>

            So bring your own cluster or namespace as Gimlet only interacts with git and leaves the gitops paradigm to manage your applications. Gimlet remains decoupled from your cloud setup.

            <br />If you launch a managed Kubernetes cluster, or have a dedicated namespace, you are good to go. Heck, Gimlet works even with Minikube, k3s or kind running on your laptop.
            </p>
          </div>
          <div className='mt-8'>
            <ButtonLink href="/concepts/components" variant="secondary">Learn more</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Widont({ children }) {
  return children.replace(/ ([^ ]+)$/, '\u00A0$1')
}
