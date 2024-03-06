import { useState } from 'react'
import * as Fathom from "fathom-client";

export function Hero() {

  return (
    <div>
      <div className="mx-auto max-w-5xl lg:text-center">
        <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Deploy and share your frontend, backend or AI project using open-source tooling with social auth.
        </p>
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="pt-8 pb-2 md:flex space-x-4 justify-between">
          <a
            href="/docs/installation?ref=hero"
            className="py-1.5 text-xl font-semibold leading-7 text-green-600 shadow-sm hover:text-green-700 hover:underline"
            onClick={() => Fathom.trackGoal('VEWYCI7B', 0)}
          >
            Start deploying
          </a>
          <a
            href="#"
            className="py-1.5 text-xl font-semibold leading-7 text-red-600 shadow-sm hover:text-red-700 hover:underline"
          // onClick={() => Fathom.trackGoal('', 0)}
          >
            My app's down
          </a>
          <a
            href="#"
            className="py-1.5 text-xl font-semibold leading-7 text-gray-900 dark:text-gray-300 hover:underline"
          // onClick={() => Fathom.trackGoal('', 0)}
          >
            Book a demo
          </a>
        </div>
      </div>
    </div>
  )
}
