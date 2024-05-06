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
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto flow-root max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author.handle} className="pt-8 sm:inline-block sm:w-full sm:px-4">
              <figure className="rounded-2xl bg-gray-50 p-8 text-sm leading-6">
                <blockquote className="text-gray-900">
                  <p>{`“${testimonial.body}”`}</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-x-4">
                  <img className="h-10 w-10 rounded-full bg-gray-50" src={testimonial.author.imageUrl} alt="" />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author.name}</div>
                    <div className="text-gray-600">{`${testimonial.author.handle}`}</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
