---
title: 'Concepts'
description: |
  See what Gimlet does and how it fits your workflow.
---

Gimlet is a deployment tool built on Kubernetes to make the deploy, preview and rollback workflows accessible to everyone.

## Vision

Kubernetes is percieved to have a high learning curve, complex machinery and only used by large companies for immense scale.

In practice, Kubernetes is a ten year old technology that is silently used by companies with as little as 10 developers with great success.

Familiarity with Kubernetes is widespread, tooling on the other hand is still built in-house. Gimlet is built to remove the tooling need from the common workflows.

> To keep simple things simple, and complex things possible.

## Workflows

Gimlet is a tool for developers to use for their daily deploy, preview and rollback needs.

- It fits common CI workflows
- or you can connect to Github directly and Gimlet takes care of the full deployment process - including container image building.

### Like Vercel or Netlify

You can use Gimlet like you use Vercel or Netlify.

- Once you integrate with Github, every commit shows up in Gimlet.
- Based on your deployment settings, this can trigger an automated deployment or you can deploy any commit on-demand.
- During deploys, Gimlet builds the container image based on the [set strategy](/docs/deployment-settings/image-settings) then deploys your application.

You can also automate [branch based preview deployments](/docs/deployments/preview-deployments) or roll back when you have to.

### Or integrate Gimlet to your CI workflows

![](/flow.svg)

Your CI pipeline
- lints and tests the code then builds the container image.
- Tthen the Gimlet CI plugin notifies Gimlet about the newly built software artifact.
- Based on your [automated deployment settings](docs/deployments/automated-deployments) Gimlet may deploy your application.

{% callout %}
You can also initiate a deploy with the CI plugin. In this mode of operation you can have your CI workflows orchestrating deploys.

Learn more about the [CI plugins and integration options](/docs/reference/ci-plugins).
{% /callout %}

## Clusters

cloud gives you 7 days
bring your own hardware
cluster config
upgrade stream
cheap clusters like civo

## Guides you in your path to master Kubernetes

app debug
cluster things
deploy settings

## Gitops

flux
observe flux

## Extend Gimlet to your needs

link to app template docs
link to video to use gitops repos
