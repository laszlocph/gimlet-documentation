---
layout: post
title: Announcing the Gimlet SaaS Early Access
date: '2022-12-05'
image: saas-early-access.png
description: "We have something really exciting to share with you: Gimlet is going SaaS. In other words, you will be able to use Gimlet's unparalleled Kubernetes deploy experience with even fewer clicks than before."
---

We have something really exciting to share with you: Gimlet is going SaaS. In other words, you will be able to use Gimlet's unparalleled Kubernetes deploy experience with even fewer clicks than before.

By signing up to our hosted version and authenticating with Github or Gitlab, you can start deploying your containerized applications to any Kubernetes cluster.

## Kubernetes is the standard in application deployment

Kubernetes is the standard in application deployment, but the state of the union is that Kubernetes is not for direct consumption. Even though dev teams are longing for the standardized experience, they are not empowered to use it efficiently.

There are a growing number of solutions trying to solve the Kubernetes DX question: on one end of the landscape there are the vertically integrated clouds with a PaaS like experience, on the other end there are the DIY platform engineering efforts to build an internal developer platform out of open-source tools.

The problem with PaaS is that it works like magic, something that often falls short when you need to extend it; platform engineering efforts on the other hand are highly customizable but take forever to build. A costly effort in the current economic environment.

Gimlet is coming to this landscape with a very specific vision: we wanted to build a gitops based developer platform on top of the most favored open-source tools of the industry, FluxCD and Helm. To give developers and small devops teams tooling that much larger platform teams would build.

So if you need to deploy on Kubernetes, but not sure how to put things together.. we got you covered!

![Gimlet Dashboard](/shot.png)

## Today we are announcing our SaaS Early Access program

We are looking for early access partners: developers, dev teams and DevOps professionals who need to deploy on Kubernetes but don't feel empowered today.

We are a couple of months away from launching our SaaS platform and during this period you would get access to the platform and our engineering team, while helping us with your feedback to be ready for our launch.

[By signing up](https://forms.reform.app/p5JfBA/early-access/nbZ6Go) you will be able to get started for free, and stay free forever as we are announcing our always free plan:

You will be able to deploy a single service to Kubernetes for free forever. Whether you use that to automate your blog or test-drive Gimlet, it is up to you.

## Gimlet plays well with your choices

We know that one size does not fit all in developer tooling, therefore we wanted to give the most value without setting the choices in stone.

Gimlet plays well with CI platforms, which means you can keep organizing your CI workflows as you desire, and call Gimlet's API whenever you need to perform a gitops operation. We have CI plugins for Github Actions, CircleCI, Gitlab and Woodpecker CI.

We also don't want to dictate your cloud choices. Gimlet needs a Kubernetes cluster to deploy to, but is not interested in how that cluster came to life. So bring your own cluster or namespace as Gimlet only interacts with git and leaves the gitops paradigm to manage your applications. Gimlet remains decoupled from your cloud setup.

Gimlet is not magic hosting. If you launch a managed Kubernetes cluster, or have a dedicated namespace, you are good to go. Heck, Gimlet works even with Minikube, k3s or kind running on your laptop.

## Why SaaS?

We are set out to bring the Netlify experience onto Kubernetes and the cloud native ecosystem.

And just like in Netlify, you sign up, find your Github or Gitlab repository and with a few clicks of deployment configuration you are able to deploy your application to a Kubernetes cluster. This vision, and the work we put into Gimlet, shines best in the SaaS version.

We think that even though we put good work into the Gimlet self-hosted installer, it is still too much friction to get to Gimlet's deploy experience.

Plus every open-source project needs a business model. This is ours.

Speaking of which, in case you wonder what happens to the open-source version..

## What happens with the open-source version?

tldr: nothing bad.

The SaaS and open-source versions are going to match one-to-one as we are going to run the upstream open-source Gimlet in the SaaS version. But the SaaS version is going to see some limitation in how many services you can deploy.

If you continue to self-host Gimlet, you get all Gimlet features without any limitation.

## Onwards

If you like what you see, sign-up to the Gimlet SaaS early Access program. It takes only a few clicks:

[https://gimlet.io/signup](https://gimlet.io/signup)
