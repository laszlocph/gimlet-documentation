import { DeployButton, DemoButton } from "./Button"

export function CTA({title, list}) {
  return (
    <div className="mx-auto max-w-5xl items-center">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div className="absolute inset-0 opacity-25 w-2/3 h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
        <div className="w-full h-full flex justify-between my-8">
          <div className="relative px-6 py-6 sm:px-16 my-auto">
            <div className="absolute inset-0 rounded-full bg-white/10 blur-3xl"></div>
            <h2 className="text-3xl space-y-2 font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl my-auto">
              <div className="relative space-y-4">
                <span>{title}</span>
                <div className="grid max-w-sm grid-cols-2 gap-x-2">
                  <DeployButton />
                  <DemoButton />
                </div>
              </div>
            </h2>
          </div>
          <div className="flex items-center justify-center">
            <span className="h-full w-0.5 bg-gradient-to-b from-transparent via-white/5 to-transparent" aria-hidden="true"></span>
            <ul className="list-disc text-xl space-y-4 font-bold tracking-tight text-neutral-900 dark:text-neutral-100 px-20">
              {list.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}