---
layout: post
title: What to include in the free tier of a Kubernetes focused SaaS?
date: "2023-05-19"
image: clickops.png
description: "We want to be true to the spirit of our free tier. We want individuals, non-profits to use it without thinking too much about what is included."
---

We are engineers. Pricing should not affect our architecture, nor ouir workflows.

## Cluster based pricing is buts

In the infrastructure space many has based pricing on the number of clusters you have.

There can be legitimate usecases to have hundreds of clusters, also to pack everything on a handful.
Pricing should not be a factor here.


cluster based pricing is nuts
CPU core based pricing is nuts

we don't want pricing decisions to drive your architecture,

## User based pricing is nuts

we don't want pricing decisions to drive your day to day experience
or your security posture
also you would miss out on auditing features. That is what gitops is partly about, it would be silly.

User based pricing is nuts or user experience.

## But we need limits

limits allow us to earn money

## Who is our free tier is for

Our free tier serves too purposes.

- A developer who just launched a managed Kubernetes cluster on their cloud provider, should be able to start deploying in the shortest possible time. Alone K8s is not an application platform, it is missing key components: ingress, metrics, aggregated logging, secret management, etc. This developer should not have to enter a credit card number, should not have to talk to anyone, should not have to know the timeline of the project. Just want to be able to deploy her new app. And without thinking too much, not making too much of a hassle maintaining her cluster / deployment. 

- Second, a developer who don't want to maintain his VPS, OS packages and whatnot, should be able to launch a cheap k8s cluster on CIVO (5USD) or Digital ocen ($12USD a month), Linode (? ) and should be able to deploy his blog, or xx Tunnel.

## Limits built in the free plan

the commercial dev, we don't want to pressure her with time. If it takes 6 months for her team to prio the service, mazletov she can use Gimlet indefinitelly. Heck, if she wants to deploy another service, she should not face hard limits. Eventually whenm there is usage, we will reach out and set up a commercial agreement

On the personal use side. We understand you have a lot of projects. Any limitation on the number of deployed services would be silly. We are devs, we understand that you just want to get stuff done. We don't want to make you think. This is our "DON'T MAKE ME THINK" pledge to you.

Oh and if you are a non-profit, we are happy to just not care about money.

