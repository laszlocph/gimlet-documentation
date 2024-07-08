import { MobileNavigation } from '@/components/MobileNavigation'
import { Search } from '@/components/Search'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

export function Header({ navigation }) {
  let [isScrolled, setIsScrolled] = useState(false)
  let router = useRouter()
  let isDocsPage = router.pathname.startsWith('/docs') || router.pathname.startsWith('/concepts')
  let isHomePage = router.pathname === '/'
  let isFrontendPage = router.pathname === '/frontend'
  let isBackendPage = router.pathname === '/backend'
  let isAIPage = router.pathname === '/ai-deployment'

  let barbglight='bg-teal-100'
  let barbgscrolled='dark:bg-teal-900/50 dark:[@supports(backdrop-filter:blur(0))]:bg-teal-900/75'
  if (isFrontendPage) {
    barbglight='bg-teal-100 dark:bg-teal-800'
    barbgscrolled='bg-neutral-100/90 dark:bg-teal-900/50 dark:[@supports(backdrop-filter:blur(0))]:bg-teal-900/75'
  }
  if (isAIPage) {
    barbglight='bg-purple-100 dark:bg-purple-800'
    barbgscrolled='bg-neutral-100/90 dark:bg-purple-900/50 dark:[@supports(backdrop-filter:blur(0))]:bg-purple-900/75'
  }
  if (isBackendPage) {
    barbglight='bg-amber-100 dark:bg-amber-800'
    barbgscrolled='bg-neutral-100/90 dark:bg-amber-900/50 dark:[@supports(backdrop-filter:blur(0))]:bg-amber-900/75'
  }

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="sticky top-0 z-50">
    <header
      className={clsx(
        'max-w-8xl mx-auto flex flex-wrap items-center justify-between ' + barbglight + ' dark:shadow-none shadow-neutral-900/5 transition duration-500 px-4 py-5 sm:px-6 lg:px-8',
        {
          ['dark:backdrop-blur ' + barbgscrolled]: isScrolled,
          'bg-transparent': !isScrolled,
          'shadow-md': isScrolled,
        }
      )}
    >
      <div className="mr-6 lg:hidden">
        <MobileNavigation navigation={navigation} />
      </div>
      <div className="relative flex flex-grow basis-0 items-center">
        <Link href="/">
          <span className="block lg:w-auto">
            <span className="sr-only">Home page</span>
            <img src="/logo-new.svg" alt="Gimlet" className='h-8 sm:h-10 w-auto block dark:hidden' />
            <img src="/logo-dark.svg" alt="Gimlet" className='h-8 sm:h-10 w-auto hidden dark:block' />
          </span>
        </Link>
      </div>
        
      <div>
        { isDocsPage &&
        <Search />
        }
        { !isDocsPage &&
        <ul className="hidden sm:flex space-x-8 font-semibold text-lg">
          <li>
            <Dropdown />
          </li>
          <li className='hover:text-teal-500 dark:hover:text-teal-200'>
            <a href="/pricing">Pricing</a>
          </li>
          <li className='hover:text-teal-500 dark:hover:text-teal-200'>
            <a href="/blog">Blog</a>
          </li>
          <li className='hover:text-teal-500 dark:hover:text-teal-200'>
            <a href="/docs">Docs</a>
          </li>
        </ul>
        }
      </div>
      
      <div className="relative flex basis-0 justify-end space-x-6 sm:space-x-8 md:flex-grow">
        <ul className="hidden sm:flex items-center space-x-4">
          <li>
            <a href="https://app.gimlet.io" className="secondaryCtaButton" rel="noreferrer" target="_blank">Log in</a>
          </li>
          <li>
            <a href="https://app.gimlet.io" className="ctaButton" rel="noreferrer" target="_blank">Signup</a>
          </li>
        </ul>        
      </div>
    </header>
    </div>
  )
}

function Dropdown() {
  return (
    <div className="group relative dropdown cursor-pointer">
      <a className="flex items-center text-center gap-1 rounded group-hover:text-teal-500 dark:group-hover:text-teal-200">
        Use cases
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-3 h-3 group-hover:-rotate-180 transition-all ease-in-out">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </a>
      <div className="group-hover:block absolute hidden h-auto -right-1/2" id="headlessui-popover-panel-:r1h:" tabIndex="-1" data-headlessui-state="open">
        <div className="my-4 dropdown-menu p-6 rounded-3xl backdrop-blur-3xl text-neutral-200 bg-neutral-800 dark:bg-neutral-900/30 ring-1 ring-white/10">
          <ul className="top-0 w-48 text-base">
            {
            // <>
            //   <li><a className="block px-2 py-2 hover:text-neutral-200 bg-[radial-gradient(ellipse_at_center_200px,_var(--tw-gradient-stops))] hover:from-teal-400" data-headlessui-state="open" href="/frontend">Frontend</a></li>
            //   <li><a className="block px-2 py-2 hover:text-neutral-200 bg-[radial-gradient(ellipse_at_center_200px,_var(--tw-gradient-stops))] hover:from-teal-400" data-headlessui-state="open" href="/backend">Backend</a></li>
            // </>
            }
            <li><a className="block px-2 py-2 hover:text-neutral-200 bg-[radial-gradient(ellipse_at_center_200px,_var(--tw-gradient-stops))] hover:from-teal-400" data-headlessui-state="open" href="/ai-deployment">AI Deployment</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
