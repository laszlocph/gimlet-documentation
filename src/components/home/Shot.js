import { useState } from 'react'
import { ButtonLink } from '@/components/Button'

export function Shot() {
  const [tab, setTab] = useState('Deploying an image')

  return (
    <section id="gitops" className="relative">
      <div className="relative bg-stone-100 dark:bg-stone-700 py-8 lg:py-16">
        <div className="absolute inset-0 flex flex-col" aria-hidden="true">
              <div className="flex-1" />
              <div className="w-full flex-1 bg-gray-900" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <img
                className="relative rounded-lg shadow-lg"
                src="/shot.png"
                alt="Gimlet screenshot"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
