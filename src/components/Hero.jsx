import { useState } from 'react'
import { DeployButton, AppDownButton, DemoButton } from './Button'

export function Hero() {

  return (
    <div className="mx-auto max-w-4xl px-6 lg:px-8">
      <div className="mx-auto lg:text-center">
        <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Deploy and share your frontend, backend or AI project using open-source tooling with social auth.
        </p>
      </div>
      <div className="mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
        <DeployButton />
        <AppDownButton />
        <DemoButton />
        </dl>
      </div>
    </div>
  )
}
