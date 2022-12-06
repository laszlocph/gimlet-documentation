import { ButtonLink } from '@/components/Button'

export function Integration() {
  return (
    <section id="yaml-authoring" className="relative">
      <div className="bg-orange-100 dark:bg-amber-900 py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <svg
            fill="none"
            aria-hidden="true"
            className="text-orange-400 dark:text-amber-600 h-8 w-8"
            stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <h2 className="mt-2 font-semibold text-orange-400 dark:text-amber-600">
            Integration
          </h2>
          <p className="mt-4 text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50">
            <Widont>Plays well with your CI.</Widont>
          </p>
          <div className="mt-4 max-w-3xl space-y-6 text-gray-600 dark:text-gray-300">
            You can keep organizing your CI workflows as you desire, and call Gimlet&apos;s API whenever you need to perform a gitops operation.
            We have CI plugins for Github Actions, CircleCI, Gitlab and Woodpecker CI.
          </div>
          <div className='mt-8'>
            <ButtonLink href="/concepts/integration-to-ci" variant="secondary">Learn more</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Widont({ children }) {
  return children.replace(/ ([^ ]+)$/, '\u00A0$1')
}
