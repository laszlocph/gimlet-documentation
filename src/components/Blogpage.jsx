import { Prose } from '@/components/Prose'
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx'
import { useTableOfContents } from './DocsPage'

export function BlogPage({ children, className, tabs, code, language, title, section, pageProps, tableOfContents }) {
  
  let router = useRouter()
  const ref = router.pathname.slice(1).replaceAll("/", "-")
  let isBlogSubPage = !router.pathname.endsWith('/blog') && !router.pathname.endsWith('/blog/')
  let isBackpack = router.pathname.startsWith('/blog/hosting-static-sites-on-kubernetes') ||
    router.pathname.startsWith('/blog/running-kubernetes-on-your-laptop-with-k3d') ||
    router.pathname.startsWith('/blog/a-6-37-mo-single-node-kubernetes-clust') ||
    router.pathname.startsWith('/blog/budget-managed-kubernetes-')

  const date = pageProps.markdoc?.frontmatter.date
  const image = pageProps.markdoc?.frontmatter.image
  const imageAuthor = pageProps.markdoc?.frontmatter.image_author
  const imageURL = pageProps.markdoc?.frontmatter.image_url

  let author = pageProps.markdoc?.frontmatter.author
  let authorAvatar = pageProps.markdoc?.frontmatter.authorAvatar
  const coAuthor = pageProps.markdoc?.frontmatter.coAuthor
  const coAuthorAvatar = pageProps.markdoc?.frontmatter.coAuthorAvatar

  let currentSection = useTableOfContents(tableOfContents)

  function isActive(section) {
    if (section.id === currentSection) {
      return true
    }
    if (!section.children) {
      return false
    }
    return section.children.findIndex(isActive) > -1
  }

  if (!author) {
    author = "Laszlo Fogas"
  }
  if (!authorAvatar) {
    authorAvatar = "/laszlo.jpg"
  }

  return (
    <>
    <div className="text-center pt-12 sm:pt-16">
      <Link href={"/?ref="+ref}>
        <span className="sr-only">Home page</span>
        <img src="/logo.svg" alt="Gimlet" className='h-10 sm:h-16 inline' />
      </Link>
    </div>
    <div className="relative mx-auto flex max-w-8xl justify-center sm:px-2 xl:grid xl:grid-cols-12 gap-16 pb-32">
        <div className="hidden xl:sticky xl:top-[4.5rem] xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-hidden xl:py-16 xl:col-span-3">
          <nav aria-labelledby="on-this-page-title">
            { isBackpack && Backpack() }
          </nav>
        </div>
        <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none xl:col-span-6">
          <article>
            {(title || section) && (
              <header className="mb-9 space-y-1">
                {section && (
                  <p className="font-display text-sm font-medium text-sky-500">
                    {section.title}
                  </p>
                )}
                {title && (
                  <>
                  <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white mb-2">
                    {title}
                  </h1>
                  {isBlogSubPage &&
                  <div className="flex">
                    <div className='flex items-center py-2'>
                      <img className="inline-block h-12 w-12 rounded-full" alt={author} src={authorAvatar} />
                      <h5 className="pl-2 text-slate-900 dark:text-white font-medium">{author}</h5>
                    </div>
                    {coAuthor &&
                    <div className='flex items-center py-2 pl-8'>
                      <img className="inline-block h-12 w-12 rounded-full" alt={coAuthor} src={coAuthorAvatar} />
                      <h5 className="pl-2 text-slate-900 dark:text-white font-medium">{coAuthor}</h5>
                    </div>
                    }
                  </div>
                  }
                  <div className="text-slate-900 dark:text-white">{date}</div>
                  </>
                )}
              </header>
            )}
            {image &&
            <img alt={`${imageAuthor - imageURL}`} src={`/${image}`} className="lg:h-96 object-contain w-full"/>
            }
            <Prose className="mt-16">{children}</Prose>
          </article>
          {isBlogSubPage && isBackpack && 
          (
            <div className='block xl:hidden mt-32'>
              { Backpack() }
            </div>
          )
          }
          {isBlogSubPage && !isBackpack &&
          <>
            <div className="relative py-16">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
            </div>
            <h3 className='font-medium text-lg dark:text-gray-300'>More from our blog</h3>
            <div className='flex mt-8'>
              <img src="/clickops.png" className="w-48 object-contain"></img>
              <div className='ml-2'>
                <h2 className="mb-2 font-medium underline dark:text-gray-300"><a href={"/blog/clickops-over-gitops?ref="+ref}>Clickops over gitops</a></h2>
                <div className="prose mt-2.5 text-gray-600 dark:text-gray-300 leading-tight"><p>Doing cloud operations by clicking on a dashboard that generates a stream of infrastructure as code changes.</p></div>
              </div>
            </div>
            <div className='flex mt-8'>
              <img src="/why-hetzner.png" className="w-48 object-contain"></img>
              <div className='ml-2'>
                <h2 className="mb-2 font-medium underline dark:text-gray-300"><a href={"/blog/announcing-the-gimlet-saas-early-access?ref="+ref}>The how and why we built our SaaS platform on Hetzner and Kubernetes</a></h2>
                <div className="prose mt-2.5 text-gray-600 dark:text-gray-300 leading-tight"><p>Hetzner is 5 times cheaper for us than the hyperscalers. This blog posts enumerates the how and why we built our SaaS on a discount bare metal provider. Gotchas included.</p></div>
              </div>
            </div>
            <div className='flex mt-8'>
              <img src="/saas-early-access.png" className="w-48 object-contain"></img>
              <div className='ml-2'>
                <h2 className="mb-2 font-medium underline dark:text-gray-300"><a href={"/blog/announcing-the-gimlet-saas-early-access?ref="+ref}>Announcing the Gimlet SaaS Early Access</a></h2>
                <div className="prose mt-2.5 text-gray-600 dark:text-gray-300 leading-tight"><p>We have something really exciting to share with you: Gimlet is going SaaS. In other words, you will be able to use Gimlet&apos;s unparalleled Kubernetes deploy experience with even fewer clicks than before.</p></div>
              </div>
            </div>
            <div className='flex mt-8'>
              <img src="/gitops-broke-cicd.jpg" className="w-48 object-contain"></img>
              <div className='ml-2'>
                <h2 className="mb-2 font-medium underline dark:text-gray-300"><a href={"/blog/how-flux-broke-the-cicd-feedback-loop-and-how-we-pieced-it-back-together?ref="+ref}>How Flux broke the CI/CD feedback loop, and how we pieced it back together</a></h2>
                <div className="prose mt-2.5 text-gray-600 dark:text-gray-300 leading-tight"><p>A green build used to mean a successful deploy. But then gitops came and broke this heuristic.</p></div>
              </div>
            </div>
            <div className='flex mt-8'>
              <img src="/introducing-kyverno.png" className="w-48 object-contain"></img>
              <div className='ml-2'>
                <h2 className="mb-2 font-medium underline dark:text-gray-300"><a href={"/blog/are-you-sure-none-of-your-containers-run-as-root?ref="+ref}>Are you sure none of your containers run as root?</a></h2>
                <div className="prose mt-2.5 text-gray-600 dark:text-gray-300 leading-tight"><p>The Kyverno policy engine just arrived in Gimlet Stack. Let&apos;s see how you can be certain that none of the containers run as root in your Kubernetes cluster.</p></div>
              </div>
            </div>
          </>
          }
        </div>
        <div className="hidden xl:sticky xl:top-[4.5rem] xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-hidden xl:py-16 xl:col-span-3">
          <nav aria-labelledby="on-this-page-title" className="w-56">
            {tableOfContents.length > 0 && (
              <>
                <h2
                  id="on-this-page-title"
                  className="font-display text-sm font-medium text-slate-900 dark:text-white"
                >
                  On this page
                </h2>
                <ul className="mt-4 space-y-3 text-sm">
                  {tableOfContents.map((section) => (
                    <li key={section.id}>
                      <h3>
                        <Link href={`#${section.id}`}>
                          <span
                            className={clsx(
                              isActive(section)
                                ? 'text-sky-500'
                                : 'font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                            )}
                          >
                            {section.title}
                          </span>
                        </Link>
                      </h3>
                      {section.children.length > 0 && (
                        <ul className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400">
                          {section.children.map((subSection) => (
                            <li key={subSection.id}>
                              <Link href={`#${subSection.id}`}>
                                <span
                                  className={
                                    isActive(subSection)
                                      ? 'text-sky-500'
                                      : 'hover:text-red-600 dark:hover:text-slate-300'
                                  }
                                >
                                  {subSection.title}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </nav>
        </div>
      </div>
      </>
  )
}

function Backpack() {
  return (
    <div className='bg-gray-100 p-2 text-sm'>
      <h2
        id="on-this-page-title"
        className="font-display font-medium text-slate-900 dark:text-white"
      >
        🎒 Kubernetes backpack
      </h2>
      <ul className="mt-4 space-y-3">
          <li key="hosting">
            <h3 className='font-semibold'>Hosting</h3>
            <ul className="pl-5 list-disc text-red-500">
                <li key='k3d'>
                  <Link href="/blog/running-kubernetes-on-your-laptop-with-k3d?ref=starterpack">
                    <span className='hover:text-red-600 dark:hover:text-slate-300'>
                      Running Kubernetes on your laptop with K3d
                    </span>
                  </Link>
                </li>
                <li key='hetzner'>
                  <Link href="/blog/a-6-37-mo-single-node-kubernetes-cluster-on-hetzner-with-vitobotta-hetzner-k3s?ref=starterpack">
                    <span className='hover:text-red-600 dark:hover:text-slate-300'>
                      A 6.37 EUR a month single node Kubernetes cluster on Hetzner
                    </span>
                  </Link>
                </li>
                <li key='k3d'>
                  <Link href="/blog/budget-managed-kubernetes-options?ref=starterpack">
                    <span className='hover:text-red-600 dark:hover:text-slate-300'>
                      Budget managed Kubernetes options
                    </span>
                  </Link>
                </li>
            </ul>
          </li>
          <li key="hosting">
            <h3 className='font-semibold'>YAML</h3>
            <ul className="pl-5 text-red-500 list-disc">
                <li key='k3d'>
                  <Link href="/k8s-yaml-generator?ref=starterpack">
                    <span className='hover:text-red-600 dark:hover:text-slate-300'>
                      YAML Generator
                    </span>
                  </Link>
                </li>
                <li key='hetzner'>
                  <Link href="/concepts/the-sane-gitops-guide?ref=starterpack">
                    <span className='hover:text-red-600 dark:hover:text-slate-300'>
                      The SANE gitops guide
                    </span>
                  </Link>
                </li>
                <li key='k3d'>
                  <Link href="/concepts/the-sane-helm-guide?ref=starterpack">
                    <span className='hover:text-red-600 dark:hover:text-slate-300'>
                      The SANE Helm guide
                    </span>
                  </Link>
                </li>
                <li key='static'>
                  <Link href="/blog/hosting-static-sites-on-kubernetes?ref=starterpack">
                    <span className='hover:text-red-600 dark:hover:text-slate-300'>
                      Hosting static sites on kubernetes
                    </span>
                  </Link>
                </li>
            </ul>
          </li>
      </ul>
    </div>
  )
}
