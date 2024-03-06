/* eslint-disable @next/next/no-img-element */
export default function Languages() {
  return (
    <div>
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="text-3xl font-bold tracking-tight sm:text-4xl text-neutral-900 dark:text-neutral-100 text-center">
          Supported languages and technologies
        </div>
        <div className="flex flex-col mx-auto max-w-xl text-2xl my-16 space-y-8 font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          <div>
            <p>Frontend</p>
            <div className="flex justify-between mt-4">
              <img title="Next.js" src="/next-js.svg" alt="nextjs" className='h-10 sm:h-12 inline bg-white p-1 rounded-md' />
              <img title="React" src="/react-js.svg" alt="react" className='h-10 sm:h-12 inline bg-white p-1 rounded-md' />
              <img title="Remix" src="/remix.svg" alt="remix" className='h-10 sm:h-12 inline bg-white p-1 rounded-md' />
            </div>
          </div>
          <div>
            <p>Backend</p>
            <div className="flex justify-between mt-4">
              <img title="Ruby on Rails" src="/rails.svg" alt="rails" className='h-10 sm:h-12 inline bg-white px-1 py-3 rounded-md' />
              <img title="Laravel" src="/laravel.svg" alt="laravel" className='h-10 sm:h-12 inline bg-white p-1 rounded-md' />
              <img title="Django" src="/django.svg" alt="django" className='h-10 sm:h-12 inline bg-white p-1 px-2 rounded-md' />
            </div>
          </div>
          <div>
            <p>All Deployments</p>
            <div className="flex justify-between mt-4">
              <img title="Streamlit" src="/streamlit.svg" alt="streamlit" className='h-10 sm:h-12 inline bg-white p-1 py-3 rounded-md' />
              <img title="Hugging Face" src="/huggingface.svg" alt="huggingface" className='h-10 sm:h-12 inline bg-white p-1 rounded-md' />
              <img title="Dockerfile" src="/docker.svg" alt="docker" className='h-10 sm:h-12 inline bg-white p-1 py-2.5 rounded-md' />
            </div>
          </div>
        </div>
        <div className="text-3xl font-bold tracking-tight sm:text-4xl text-neutral-900 dark:text-neutral-100 text-center">
          ...besides everything else
        </div>
      </div>
    </div>
  )
}
