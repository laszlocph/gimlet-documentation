const testimonials = [
  {
    body: 'Few tools feel like they have changed the way you approach something so fundamentally like Gimlet. Gimlet introduced us to the world of Gitops which we love. It\'s easy and user friendly to get started. The documentation is solid and easy to follow something we highly appreciate in any tool',
    author: {
      name: 'Louis Scheepers',
      handle: 'CTO at CubeZoo',
      imageUrl:
        '/louis-scheepers.jpg',
    },
  },
  {
    body: 'As a developer, I found that Gimlet significantly lowered the barrier to entry for using Kubernetes by adopting an opinionated approach. I can now easily create and deploy Kubernetes clusters in a reproducible manner.',
    author: {
      name: 'Linas Zdanavičius',
      handle: 'CTO at Trektours.eu',
      imageUrl:
        '/linas-zdanavičius.png',
    },
  },
  {
    body: 'Thanks to Gimlet we were able to unify and automate the deployment of hundreds of deep learning models as part of our MLOps stack. Instead of spending time to oversee their deployment process, we can focus on developing Large Language Models and making the actual impact for our clients.',
    author: {
      name: 'Pawel Darulewski',
      handle: 'Machine Learning Engineer at raffle.ai',
      imageUrl:
        '/pawel-darulewski.jpg',
    },
  },
  {
    body: 'I have really enjoyed using Gimlet and I miss it in my new work. I found that having all service deployments in the same place gives a better overview and also more control of the services. The UI is easy to use and you can easily change the configuration. It really speeds up the otherwise slow feedback loop.',
    author: {
      name: 'Ida Riis Jensen',
      handle: 'Data Scientist @ ADC',
      imageUrl:
        '/ida-riis-Jensen.jpg',
    },
  },
  {
    body: 'A key benefit is that Gimlet automates the trivial tasks, while still giving you full access to the underlying Kubernetes infrastructure when needed. Even without a lot of prior Kubernetes knowledge, I could quickly get started developing and deploying services, while learning about the underlying bits and pieces in smaller steps, as they became relevant. The Web UI is really useful for getting a quick overview of the deployment state of a service. It is also very convenient in the rare case where you need to roll something back, and you don\'t have time to fiddle with command line tools.',
    author: {
      name: 'Mads Sejersen',
      handle: 'Lead Software Engineer hos raffle.ai',
      imageUrl:
        '/mads-sejersen.jpg',
    },
  },
  {
    body: 'Time spent working on cloud infrastructure is reduced a lot! With Gimlet, many things are ready out of the box. It integrates nicely with Grafana and Prometheus, so observability is on point. The Gimlet team are experts in k8s and support is always swift.',
    author: {
      name: 'Tobias Slott Jensen',
      handle: 'MLOps Engineer at Veo Technologies',
      imageUrl:
        '/tobias-slott-jensen.jpg',
    },
  },
]

export default function Testimonials() {
  return (
    <div className="relative flex max-w-[100vw] overflow-hidden py-5">
      <div className="flex w-max animate-marquee [--duration:60s] hover:[animation-play-state:paused]">
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div key={index} className="h-full px-2.5">
            <div className="relative h-[25rem] w-[30rem] flex flex-col justify-between rounded-2xl border border-neutral-900 dark:border-white/5 bg-neutral-900/90 dark:bg-white/5 hover:bg-neutral-700 dark:hover:bg-white/10 px-8 py-6">
              <div className="pb-4 font-light text-neutral-200 dark:text-white/75">{testimonial.body}</div>
              <div className="flex items-center gap-4">
                <img src={testimonial.author.imageUrl} className="h-12 w-12 rounded-full" />
                <div className="flex flex-col text-sm">
                  <div className="text-white">{testimonial.author.name}</div>
                  <div className="text-neutral-200 dark:text-white/75">{testimonial.author.handle}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white/30 dark:from-neutral-900/75"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white/30 dark:from-neutral-900/75"></div>
    </div>
  )
}

export const recommendation = [
  {
    body: "Accelerate QA with self-service previews and rollbacks of your branches and repositories to the latest stable version.",
    author: {
      name: "XYZ",
      handle: "abc at DEF",
      imageUrl: "/logo.svg"
    }
  },
  {
    body: "Accelerate QA with self-service previews and rollbacks of your branches and repositories to the latest stable version.",
    author: {
      name: "XYZ",
      handle: "abc at DEF",
      imageUrl: "/logo.svg"
    }
  },
  {
    body: "Accelerate QA with self-service previews and rollbacks of your branches and repositories to the latest stable version.",
    author: {
      name: "XYZ",
      handle: "abc at DEF",
      imageUrl: "/logo.svg"
    }
  },
];