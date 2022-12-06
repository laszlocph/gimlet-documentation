import { Fragment, useState } from 'react'
import { ButtonLink } from '@/components/Button'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

export function ClickOps() {
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
    <section id="clickops" className="relative">
      <div className="bg-rose-100 dark:bg-rose-900 py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <svg
            fill="none"
            aria-hidden="true"
            className="text-rose-400 dark:text-rose-600 h-8 w-8"
            stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          <h2 className="mt-2 font-semibold text-rose-500 dark:text-rose-600">
            Clickops
          </h2>
          <p className="mt-4 text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50">
            Dashboards should not be scary - it&apos;s clickops.
          </p>
          <div className="mt-4 max-w-3xl space-y-6 text-gray-600 dark:text-gray-300">
            Gimlet gives you a dashboard where you can operate your application. You don&apos;t have to worry about configuration drift. Every action you take on the Gimlet dashboard is backed by a git commit.
            <br />You prefer the command line? The Gimlet CLI has got you covered.
          </div>
          <div className='mt-8'>
            <ButtonLink href="/concepts/clickops" variant="secondary">Learn more</ButtonLink>
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-2xl items-center grid-cols-1 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:px-12 h-96 lg:h-64">
          <div className="max-w-xl">
            <div className="relative pl-2 py-4 bg-white hover:bg-gray-100 rounded">
              <img src="/arrow.svg" className="absolute right-0 top-0 -mt-20 mr-16 md:-mr-6 w-32 block dark:hidden" />
              <img src="/arrow-white.svg" className="absolute right-0 top-0 -mt-20 mr-16 md:-mr-6 w-32 hidden dark:block" />
              <span className="absolute right-0 top-0 -mt-16 mr-0 md:-mr-24 w-24 font-mono font-bold text-xs dark:text-slate-100">Deploy this commit!</span>
              <div className="relative flex items-start space-x-3">
                <div className="relative">
                  <img
                    className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-4 ring-gray-100"
                    src="https://avatars.githubusercontent.com/u/4289031?s=60"
                    alt="Laszlo Fogas" />
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <div className="text-sm">
                      <p href="#" className="font-semibold text-gray-800">Fixing major bug</p>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-800">
                      <span className="font-">
                        Laszlo Fogas
                      </span>
                      <span className="ml-1">committed</span>
                      <span className="ml-1">2 hours ago</span>
                    </p>
                  </div>
                </div>
                <div className="pr-4">
                  <span className="relative inline-flex shadow-sm rounded-md">
                    <Menu as="span" className="relative inline-flex shadow-sm rounded-md align-middle">
                      <Menu.Button
                        className="relative cursor-pointer inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Deploy..
                      </Menu.Button>
                      <span className="-ml-px relative block">
                        <Menu.Button
                          className="relative z-0 inline-flex items-center px-2 py-3 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                          <span className="sr-only">Open options</span>
                          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                        </Menu.Button>
                        <Menu.Items
                          className="origin-top-right absolute z-50 right-0 mt-2 -mr-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => deploy()}
                                className={(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700') +
                                  ' block px-4 py-2 text-sm w-full text-left'
                                }
                              >
                                test-app to staging
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                        </Menu.Items>
                      </span>
                    </Menu>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {deployStatus(deploying, processed, applying, applied)}
        </div>

      </div>
    </section>
  )
}

function deployStatus(deploying, processed, applying, applied) {

  let gitopsWidget = Loading();
  if (processed) {
    gitopsWidget = (
      <div className="mt-2">
        <p className="text-yellow-100 font-semibold">
          Manifests written to git
        </p>
        <div className="pl-2 mb-2">
          <p className="font-semibold truncate mb-1" title="test-app">
            test-app
            <span className='mx-1 align-middle'>✅</span>
            <span className="font-normal">7d2e268</span>
          </p>
        </div>
      </div>
    )
  }

  let appliedWidget = null
  if (applying && !applied) {
    appliedWidget = (
      <p className={`font-semibold text-yellow-300`}>
        <span className="h-4 w-4 rounded-full relative top-1 inline-block bg-yellow-400" />
        <span className='ml-1'>
          7d2e268
        </span>
        <span className='ml-1'>applying</span>
      </p>
    )
  }
  if (applied) {
    appliedWidget = (
      <p className={`font-semibold text-green-300`}>
        <span>✅</span>
        <span className='ml-1'>
          7d2e268
        </span>
        <span className='ml-1'>applied</span>
      </p>
    )
  }

  return (
    <>
      <div
        aria-live="assertive"
        className="px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="w-full flex flex-col space-y-4">
          <Transition
            show={deploying}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="max-w-lg w-full bg-gray-800 text-gray-100 text-sm shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="p-4">
                <div className="flex">
                  <div className="w-0 flex-1 justify-between">
                    <p className="text-yellow-100 font-semibold">
                      Rolling out test-app
                    </p>
                    <p className="pl-2  ">
                      🎯 staging
                    </p>
                    <p className="pl-2">
                      <span>📎</span>
                      <span className='ml-1'>ba52941</span>
                    </p>
                    {gitopsWidget}
                    <div className='pl-2 mt-4'>{appliedWidget}</div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}

function Loading() {
  return (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
      <path className="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  )
}
