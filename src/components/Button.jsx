import Link from 'next/link'
import clsx from 'clsx'
import * as Fathom from "fathom-client";

const styles = {
  primary:
    'rounded-full bg-orange-400 py-2 px-8 text-base font-semibold text-slate-900 hover:bg-orange-200 active:bg-orange-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300/50 drop-shadow-lg',
  secondary:
    'rounded-full bg-orange-500 py-2 px-6 text-base font-semibold text-white hover:bg-slate-700 active:text-slate-400 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 drop-shadow-lg',
}

export function Button({ variant = 'primary', className, ...props }) {
  return <button className={clsx(styles[variant], className)} {...props} />
}

export function ButtonLink({ variant = 'primary', className, href, ...props }) {
  return (
    <Link href={href}>
      <span className={clsx(styles[variant], className)} {...props} />
    </Link>
  )
}

export function DeployButton() {
  return (
    <a
      href="#"
      onClick={() => {
        Fathom.trackGoal('VEWYCI7B', 0)
        window.location.replace("/accounts/githubAuth")
      }}
      className="inline-block rounded-lg bg-indigo-600 px-8 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700">      Start deploying
    </a>
  )
}

export function DemoButton() {
  return (
    <a
      href="https://calendly.com/laszlo-i6m4/30min"
      rel="noreferrer" target="_blank"
      // onClick={() => Fathom.trackGoal('B', 0)}
      className="mt-4 md:mt-0 inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-300 ring-1 ring-gray-900/10 dark:ring-gray-100/10 hover:ring-gray-900/20 dark:hover:bg-neutral-800">
              Book a demo
    </a>
  )
}
