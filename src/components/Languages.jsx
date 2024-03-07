const languages = {
  frontend: [
    { title: "Next.js", description: "React framework for building scalable, high-performance applications.", source: "next-js.svg", deploy: "How to deploy Next.js" },
    { title: "React", description: "JavaScript library for building dynamic, interactive user interfaces.", source: "react-js.svg", deploy: "How to deploy React" },
    { title: "Remix", description: "A web framework for building fast, modern web applications with React.", source: "remix.svg", deploy: "How to deploy Remix" },
  ],
  backend: [
    { title: "Rails", description: "Server-side framework written in Ruby, designed for simplicity and productivity.", source: "rails.svg", deploy: "How to deploy Rails" },
    { title: "Laravel", description: "PHP framework for web applications, offering a clean and elegant syntax.", source: "laravel.svg", deploy: "How to deploy Laravel" },
    { title: "Django", description: "Python framework that encourages rapid development and clean design.", source: "django.svg", deploy: "How to deploy Django" },
  ],
  aiDeployment: [
    { title: "Streamlit", description: "Library for quickly building and sharing web apps for machine learning and data science projects.", source: "streamlit.svg", deploy: "How to deploy Streamlit" },
    { title: "Hugging face", description: "State-of-the-art NLP models for text analysis and generation.", source: "huggingface.svg", deploy: "How to deploy Hugging Face models" },
    { title: "Dockerfile", description: "Ensuring consistency through reproducible environments.", source: "docker.svg", deploy: "How to deploy with Dockerfiles" },
  ]
};

export default function Languages() {
  return (
    <div className="mx-auto max-w-4xl px-6 lg:px-8">
      <div className="mx-auto lg:text-center">
        <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Supported languages and technologies
        </p>
      </div>
      <div className="mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-none space-y-8">
        {Object.entries(languages).map(([title, items]) => {
          console.log(title === 'frontend')
          return (
            <div key={title}>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-neutral-900 dark:text-neutral-100">
                {title === 'frontend' ? "Frontend" : title === 'backend' ? "Backend" : "AI Deployment"}
              </h1>
              <dl className="grid max-w-xl grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-3 mt-4">
                {items.map(i => {
                  return (
                    <div key={i.title}
                      className="group overflow-hidden rounded-xl bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
                    >
                      <div><img className="absolute -right-20 -top-20 opacity-60" /></div>
                      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
                        <img src={i.source} className="h-14 w-14 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75"/>
                        <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">{i.title}</h3>
                        <p className="max-w-lg text-neutral-400">{i.description}</p>
                      </div>
                      <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <a
                          href="#"
                          className="inline-flex items-center justify-center font-medium text-neutral-900 dark:text-neutral-100 dark:hover:text-neutral-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs pointer-events-auto"
                        >
                          {i.deploy}
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4">
                            <path
                              d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                              fill="currentColor"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </a>
                      </div>
                      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10"></div>
                    </div>
                  )
                })}
              </dl>
            </div>
          )
        })}
      </div>
      <div className="text-3xl font-bold tracking-tight sm:text-4xl text-neutral-900 dark:text-neutral-100 text-center mt-16 sm:mt-20">
        ...besides everything else
      </div>
    </div>
  )
}
