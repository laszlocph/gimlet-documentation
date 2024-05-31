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
      className="flex items-center justify-center bg-green-700 hover:bg-green-600 ring-1 ring-green-800 text-white font-medium py-2 px-4 rounded-full text-lg">
      Start deploying
    </a>
  )
}

export function DemoButton() {
  return (
    <a
      href="https://calendly.com/laszlo-i6m4/30min"
      rel="noreferrer" target="_blank"
      // onClick={() => Fathom.trackGoal('B', 0)}
      className="flex items-center justify-center bg-neutral-700 hover:bg-neutral-600 ring-1 ring-neutral-500 text-white font-medium py-2 px-4 rounded-full text-lg">
      Book a demo
    </a>
  )
}
