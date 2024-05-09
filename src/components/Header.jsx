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
    <header
      className={clsx(
        'sticky top-0 z-50 flex flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none sm:px-6 lg:px-8, block lg:hidden',
        {
          'dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75':
            isScrolled,
          'dark:bg-transparent': !isScrolled,
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
            <img src="/logo2.svg" alt="Gimlet" className='h-8 sm:h-10 w-auto block dark:hidden' />
            <img src="/logo-dark.svg" alt="Gimlet" className='h-8 sm:h-10 w-auto hidden dark:block' />
          </span>
        </Link>
      </div>
     
      {/* <div className="-my-5 mr-6 sm:mr-8 md:mr-0">
        { isDocsPage &&
        <Search />
        }
        { !isDocsPage &&
        <ul className="hidden sm:flex space-x-8 text-slate-700 font-semibold text-lg dark:text-slate-200">
          <li>
            <a className="hover:text-orange-500 dark:hover:text-orange-400" href="/docs">Docs</a>
          </li>
          <li>
            <a className="hover:text-orange-500 dark:hover:text-orange-400" href="/pricing">Pricing</a>
          </li>
          <li>
            <a className="hover:text-orange-500 dark:hover:text-orange-400" href="/events">Events</a>
          </li>
          <li>
            <a className="hover:text-orange-500 dark:hover:text-orange-400" href="/blog">Blog</a>
          </li>
          <li className="hidden lg:block">
            <a className="hover:text-orange-500 dark:hover:text-orange-400" href="/k8s-yaml-generator">YAML Generator</a>
          </li>
          <li>
            <a className="hover:text-orange-500 dark:hover:text-orange-400" href="https://github.com/gimlet-io#jobs">Jobs</a>
          </li>
        </ul>
        }
      </div> */}
      
      <div className="relative flex basis-0 justify-end space-x-6 sm:space-x-8 md:flex-grow">
       
        {/* <ul className="hidden sm:flex items-center space-x-4 text-slate-700 font-semibold text-sm leading-6 dark:text-slate-200">
          <li>
            <a className="hover:text-orange-500 dark:hover:text-orange-400" href="https://accounts.gimlet.io/login/">Log in</a>
          </li>
        </ul> */}
        
        {/* <ThemeSelector className="relative z-10" /> */}
        <a
          href="https://github.com/gimlet-io/gimlet"
          className="group flex slate-500"
        >
          <span className="sr-only">GitHub</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-6 w-6 fill-slate-500 group-hover:fill-slate-500 dark:group-hover:fill-slate-300"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />
          </svg>
          <div className="hidden lg:block font-semibold text-gray-600 ml-1">gimlet-io/gimlet</div>
        </a>        
        
      </div>
    </header>
  )
}