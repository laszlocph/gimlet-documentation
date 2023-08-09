import { Fragment, useRef, useState } from 'react'
import { Transition } from '@headlessui/react'
import * as Fathom from "fathom-client";
import { ButtonLink } from '@/components/Button'
import { composePlugins } from 'next-compose-plugins/lib/compose';



export function Hero() {
  const [deploying, setDeploying] = useState(false)
  const [processed, setProcessed] = useState(false)
  const [applying, setApplying] = useState(false)
  const [applied, setApplied] = useState(false)

  const deploy = () => {
    setDeploying(true);

    setTimeout(() => {
      setProcessed(true);

      setTimeout(() => {
        setApplying(true);
        setTimeout(() => {
          setApplied(true);
        }, 3000);
      }, 1000);

    }, 1500);
  }

  return (
    <div className="overflow-hidden text-zinc-600 dark:text-zinc-300">
      <main>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div>
              {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:ring-gray-100/10">
                  <span className="text-gray-600 dark:text-gray-300">
                    Announcing our SaaS Early Access. <a href="/blog/announcing-the-gimlet-saas-early-access" onClick={() => Fathom.trackGoal('KDOSOUVD', 0)} className="font-semibold text-indigo-600"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
                  </span>
                </div>
              </div> */}
              <div>
                <p className="mb-6 text-lg leading-8 sm:text-center">
                  Adopting Kubernetes is a big endevaur. But it is <span className='italic'>the</span> deployment platform today.
                </p>
                <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-center sm:text-5xl">
                  As little, or as much Kubernetes as you want.
                </h1>
                <p className="mt-6 text-lg leading-8 sm:text-center">
                  With Gimlet, you can start with one-click-deploys then stair-step your way to a gitops based application delivery platform when you need to.
                  Gimlet features the best of open-source out of the box.
                </p>
                <div className="mt-8 md:flex md:space-x-4 space-x-2 sm:justify-center">
                  <a
                    href="/docs/installation"
                    className="inline-block rounded-lg bg-indigo-600 px-8 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
                    onClick={() => Fathom.trackGoal('VEWYCI7B', 0)}
                  >
                    Documentation
                  </a>
                  {/* <a
                    href="https://accounts.gimlet.io/signup/"
                    className="mt-4 md:mt-0 inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-300 ring-1 ring-gray-900/10 dark:ring-gray-100/10 hover:ring-gray-900/20"
                    onClick={() => Fathom.trackGoal('XPL4AWPN', 0)}
                  >
                    Sign up
                  </a> */}
                </div>
                <div className="my-12 p-4 bg-zinc-900 dark:bg-black text-zinc-300 dark:text-zinc-600 rounded-lg">
                  <div className="whitespace-pre-wrap font-mono">
                    <p className=""># Install Gimlet on any Kubernetes cluster.</p>
                    <p className=""># Even on a cluster running on your laptop (we recommend using <a href="/blog/running-kubernetes-on-your-laptop-with-k3d" className="underline cursor-pointer">k3d</a>). </p>
                    <p className=""># Install with:</p>

                    <p className="text-yellow-100 dark:text-zinc-300 font-semibold my-4">kubectl apply -f https://raw.githubusercontent.com/gimlet-io/gimlet/main/deploy/gimlet.yaml</p>

                    <p className=""># Or start deploying your applications on our <a href="https://accounts.gimlet.io/signup/" className="underline cursor-pointer">hosted version</a>. (<a href="/pricing" className="underline cursor-pointer">Pricing</a>)</p>
                    <p className=""># We have a free tier that <a href="/blog/our-free-tier" className="underline cursor-pointer">won&apos;t make you think</a> every corner.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
