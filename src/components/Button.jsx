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
      <a className={clsx(styles[variant], className)} {...props} />
    </Link>
  )
}

export function DeployButton() {
  return (
    <a
      href="/docs/installation?ref=hero"
      className="group relative inline-flex text-3xl font-bold tracking-tight items-center justify-center text-center overflow-hidden rounded-full bg-green-900 px-8 py-3 transition"
      onClick={() => Fathom.trackGoal('VEWYCI7B', 0)}
    >
      <div className="absolute inset-0 flex items-center [container-type:inline-size]">
      </div>
      <div className="absolute inset-0.5 rounded-full backdrop-blur-3xl bg-white/5"></div>
      <div className="absolute bottom-0 left-1/2 h-1/3 w-4/5 -translate-x-1/2 rounded-full bg-green-900 opacity-50 blur-md transition-all duration-500 group-hover:h-2/3 group-hover:opacity-50"></div>
      <span className="relative mt-px bg-gradient-to-b from-green-900 to-green-400 bg-clip-text font-mona text-lg font-medium text-transparent transition-all duration-200">
        Start deploying
      </span>
    </a>
  )
}

export function AppDownButton() {
  return (
    <a
      href="#"
      className="group relative inline-flex text-3xl font-bold tracking-tight items-center justify-center text-center overflow-hidden rounded-full bg-red-900 px-8 py-3 transition"
    // onClick={() => Fathom.trackGoal('', 0)}
    >
      <div className="absolute inset-0 flex items-center [container-type:inline-size]">
        <div
          className="absolute h-[100cqw] w-[100cqw] animate-spin bg-[conic-gradient(from_0_at_50%_50%,rgba(255,255,255,0.5)_0deg,transparent_60deg,transparent_300deg,rgba(255,255,255,0.5)_360deg)] opacity-0 transition duration-700 group-hover:opacity-100"
        ></div>
      </div>
      <div className="absolute inset-0.5 rounded-full bg-zinc-800"></div>
      <div className="absolute bottom-0 left-1/2 h-1/3 w-4/5 -translate-x-1/2 rounded-full bg-red-900 opacity-50 blur-md transition-all duration-500 group-hover:h-2/3 group-hover:opacity-50"></div>
      <span className="relative mt-px bg-gradient-to-b from-red-900 to-red-400 bg-clip-text font-mona text-lg font-medium text-transparent transition-all duration-200">
        My app’s down
      </span>
    </a>
  )
}

export function DemoButton() {
  return (
    <a
      href="#"
      className="group relative inline-flex text-3xl font-bold tracking-tight items-center justify-center text-center overflow-hidden rounded-full bg-zinc-700 px-8 py-3 transition"
    // onClick={() => Fathom.trackGoal('B', 0)}
    >
      <div className="absolute inset-0 flex items-center [container-type:inline-size]">
      </div>
      <div className="absolute inset-0.5 rounded-full backdrop-blur-3xl bg-white/5"></div>
      <div className="absolute bottom-0 left-1/2 h-1/3 w-4/5 -translate-x-1/2 rounded-full bg-white/10 opacity-50 blur-md transition-all duration-500 group-hover:h-2/3 group-hover:opacity-100"></div>
      <span className="relative mt-px bg-gradient-to-b from-white/25 to-white bg-clip-text font-mona text-lg font-medium text-transparent transition-all duration-200">
        Book a Demo
      </span>
    </a>
  )
}
