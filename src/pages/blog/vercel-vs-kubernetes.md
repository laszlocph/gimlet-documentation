---
title: 'Vercel VS Kubernetes'
date: '2024-02-06'
description: "Even the idea of comparison is wild, right? But we gave it a serious thought. Hear us out!"
image: vercelvsk8s.png
toc: false
---

Even the idea of comparison is wild, right?

But we gave it a serious thought. Hear us out!

{% highlight %}
People who chose Vercel just want to get stuff done.
{% /highlight %}

It is only fair if we approach Kubernetes with the same attitude.

Yes, we have seen the Kubernetes memes. You can build a castle on Kubernetes. But having possibilities should be a good thing, shouldn't it?

Let's see how does Kubernetes fare with Vercel if we bring a pragmatic mindset.

We are going to keep scores! 🏀

## Where to get started?

When you are getting started with Vercel, you go to vercel.io.

With Kubernetes, you go to the documentation.

Or do you? You will not be deploying anytime soon if you try to understand everything.

Vercel is a vertically integrated platform, it spans several architectural layers to make your life easy. To have even a remotely comparable experience with Kubernetes, we need to pick a managed Kubernetes provider.

But not the hyperscaler clouds like AWS, Azure or GCP, since managed Kubernetes has an entry tax on the hyperscalers: a $75 a month fee for the so-called "control plane".

We pick a provider that does not have it: [CIVO Cloud](https://civo.com). At Digital Ocean, Scaleway or Linode you also won't pay the Kubernetes tax, just the VMs you use. 

Skipping the hyperscalers brings another benefit: smaller clouds are better integrated and simpler to understand. This comes handy if we want to compare the experience to Vercel.

## Just deploy something

The first test: let's deploy something.

We are going to deploy a React app since Vercel only supports frontend frameworks. The app is on Github, in a private repository.

{% wide css="pt-2 pb-8 mt-16 mb-16 bg-gray-100 dark:bg-slate-800/60 z-10" width=80 %}
### Registration
{% sidebyside css="sm:pb-16" %}
{% box css="w-full" %}
**Vercel** has a "Start Deploying" button on their home page. Clicking the button and connecting your Github you are signed up. It is one of the best experience we have ever seen, hands-down.   
Point Vercel. 🏀 
![Vercel Start Deploying button](/start-deploying.png)
{% /box %}
{% box css="w-full" %}
**Kubernetes:** Signign up to [https://civo.com](https://civo.com) brings the standard sign-up experience. There is nothing to be ashamed of here.
* Since Kubernetes is not a serverless platform, you need to create a cluster. There is no way around it.
* There are a couple of decisions you need to make here: picking node size and count, but other than that, the defaults suffice. The cluster is up in about 90 seconds. Comparable to any self-hosting alternative.
{% /box %}
{% /sidebyside %}

### Connecting the source code
{% sidebyside css="sm:pb-16" %}
{% box css="w-full"%}
By signing up to **Vercel**, you have already set up the Github integration.
{% /box %}
{% box css="w-full" %}
**Kubernetes:** The starting point for deploying to Kubernetes is a local copy of the source code. A git clone does the job.
{% /box %}
{% /sidebyside %}

### Deployment configuration
{% sidebyside css="sm:pb-16" %}
{% box css="w-full"%}
**Vercel** does a great job at recognizing 35+ frontend frameworks. If your project is conventional, the build commands are set automatically.
{% /box %}
{% box css="w-full" %}
As promised, we are going to be pragmatic with **Kubernetes**. To match the no-config experience of Vercel, we are going to use an application template that is made for static websites. We need to set the build command, but the rest of the boilerplate is covered.
* Create a file with the build commands:
  ```yaml
  # values.yaml
  gitCloneUrl: https://github.com/laszlocph/reactjs-test-app.git
  buildImage: "node:20.10-buster"
  buildScript: npm install && npm run build
  builtAssets: build/
  ```
* Deploy the manifests and open a port-forward:
  ```
  $ helm repo add onechart https://chart.onechart.dev

  $ helm template my-react-site onechart/static-site \
    -f values.yaml > manifest.yaml
  
  $ kubectl apply -f manifest.yaml
  $ kubectl port-forward svc/my-react-site 8000:80
  ``` 
  The above snippet spares a lot of the legwork that containerized platforms like Kubernetes require. If you want to understand more, you can read more in our [blog post](https://gimlet.io/blog/hosting-static-sites-on-kubernetes). But it is not strictly required. We are pragmatic, remember?
{% /box %}
{% /sidebyside %}

### Automation
{% sidebyside css="sm:pb-4 sm:mb-16" %}
{% box css="w-full"%}
Deployment automation is set up automatically on **Vercel** as you set up your first deploy. Point Vercel. 🏀
{% /box %}
{% box css="w-full" %}
To automate **Kubernetes** deployments, you can take the command line commands we used earlier and put them into Github Actions.
{% /box %}
{% /sidebyside %}
{% /wide %}

Vercel: 🏀 🏀 - Kubernetes: 🚫

## Adding a Domain name

Both Vercel and managed Kubernetes have a default public domain name.

### Accessing on default domain

On Vercel, you can copy the `vercel.app` domain name from the portal.

On Kubernetes, just like on Vercel, you can obtain the `k8s.civo.com `domain name from the portal.
Extend the deployment config file with a handful of lines to access the app on the domain:

```diff
# values.yaml
gitCloneUrl: https://github.com/laszlocph/reactjs-test-app.git
buildImage: "node:20.10-buster"
buildScript: npm install && npm run build
builtAssets: build/
+ ingress:
+   annotations:
+     kubernetes.io/ingress.class: traefik
+  host: 81c09668-22fc-4f70-93fe-f8796eb49d06.k8s.civo.com
```

Since accessing the application has the same end-user experience, and the configuration need is not more than a few more lines, no points given in this round.

Adding your custom domain requires adding DNS records on both platforms. The main complexity there is editing DNS records, so again, no points given in this round.

Vercel: 🏀 🏀 - Kubernetes: 🚫

## Preview Deploys

{% wide css="pt-2 pb-8 mt-16 mb-16 bg-gray-100 dark:bg-slate-800/60" width=80 %}
### Setting up preview deploys
{% sidebyside css="sm:pb-16" %}
{% box css="w-full" %}
The setup is trivial, and the collaborative features of **Vercel** are best in class.
Point Vercel. 🏀
{% /box %}
{% box css="w-full" %}
On **Kubernetes**, just like with automatic deployments, you have to script the preview deploys in your CI system, like Github Actions.
{% /box %}
{% /sidebyside %}
### Other
{% sidebyside css="sm:pb-16" %}
{% box css="w-full" %}
Preview deploys are not part of the **Vercel** free plan.
{% /box %}
{% box css="w-full" %}
The scripting for **Kubernetes** comes down to introducing variables to the deployment manifest to avoid naming collisions in resource names. It requires careful considerations and it is error-prone.
{% /box %}
{% /sidebyside %}
{% /wide %}

Vercel: 🏀 🏀 🏀 - Kubernetes: 🚫

## Pricing

Pricing is often brought up in discussions about Vercel. There's a free tier at Vercel, which isn't available at cloud providers when you'd like to use managed Kubernetes.

Vercel's paid tier starts at a $20 per seat monthly price tag. With additional charges, like $40 per 100 GBs of bandwidth after exceeding the first 1 TB in the free tier. For the sake of comparison, CIVO charges $1 per additional 100GB.

There's also one particular aspect to keep in mind when using Vercel. Vercel's fair use guidelines restrict commercial use for free accounts. So you'll need to use the paid plan if you're trying to make money out of your frontend app.

Once you are on the $20 Vercel plan, the next price jump is "enterprise", which can make scaling costly on Vercel.

[On CIVO](https://www.civo.com/pricing), you can get started at $5 a month, and for $20, you get 4GB of RAM and 2 CPU cores. You can serve many static sites on that spec.

Value for money and price transparency comparison point goes to Kubernetes.

Vercel: 🏀 🏀 🏀 - Kubernetes: 🏀

## Scaling

Everybody knows Kubernetes scales. As in hardware. In this section though, we compare Vercel and Kubernetes in terms of organizational scaling. How well they support you on your path to growth.

Vercel's paid plan is capped at 10 seats, which totals to $200 a month without topping up for extra usage or going for custom enterprise pricing.

Kubernetes itself has no seat limits. When you scale on Kubernetes though, you need to build tooling yourself to support all skill levels in your team and to satisfy custom governance and security needs of your company.

On one side, Vercel offers simplicity while sacrificing flexibility. On the other, Kubernetes demands a level of complexity to unlock endless possibilities for customization.

There is no curveball you can't solve with Kubernetes, that is certainly reassuring when you plan to grow together with the platform. Point Kubernetes 🏀 with the caveat that you keep a conservative approach with adopting new Kubernetes features.

Vercel: 🏀 🏀 🏀 - Kubernetes: 🏀 🏀

## Final Score

It all boils down to whether you're willing to give up convenience for flexibility, or the other way around. At Gimlet, we are working hard so that opting Kubernetes should not mean giving up convenience.

But today, Vercel offers convenient user experience right from the beginning that vanilla Kubernetes can't compare to. It's also fair to say that the $20 monthly plan won't break the bank if you're trying to validate an MVP and chances are you won't exceed bandwidth limits with it either.

While Kubernetes seems like an overcomplicated beast for deployments and hosting, it can be tamed by adopting a conservative approach and a cheaper managed Kubernetes provider.

Considering a wider-range of use cases, like deploying backend services, supporting more networking options and compliance needs at your company, Kubernetes potentially can score many more points for you.

The final score:

Vercel: 🏀 🏀 🏀 - Kubernetes: 🏀 🏀 🏀?

If you want to see how a React app is deployed to Kubernetes, join [this live stream](https://www.linkedin.com/events/awalkthrough-deployingareactapp7160557073028530176/theater/) on the 13th February.
