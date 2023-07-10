import { Prose } from '@/components/Prose'

export function EventsPage({ children, className, tabs, code, language, title, section }) {
  return (
    <div className="relative mx-auto flex max-w-6xl justify-center sm:px-2 lg:px-8 xl:px-12">
    <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
      <article>
        {(title || section) && (
          <header className="mb-9 space-y-1">
            {section && (
              <p className="font-display text-sm font-medium text-sky-500">
                {section.title}
              </p>
            )}
            {title && (
              <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
                {title}
              </h1>
            )}
          </header>
        )}
        <Prose>{children}</Prose>
      </article>
    </div>
  </div>
  )
}