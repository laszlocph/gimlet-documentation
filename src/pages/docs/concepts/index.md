---
title: 'Concepts'
description: |
  See what Gimlet does and how it fits your workflow.
---

Gimlet is a deployment tool built on Kubernetes to make the deploy, preview and rollback workflows accessible to everyone.

## Vision

Kubernetes is percieved to have a high learning curve, complex machinery and only used by large companies for immense scale.

In practice, Kubernetes is a ten years old technology that is silently used by companies with as little as 10 developers - with great success.

Familiarity with Kubernetes is widespread, tooling on the other hand is still built in-house. Gimlet is built to remove the tooling need from the common workflows.

> To keep simple things simple, and complex things possible.

## Workflows

Gimlet is a tool for developers that covers their daily deploy, preview and rollback needs.

### Like Vercel or Netlify

You can use Gimlet like you use Vercel or Netlify.

- Once you integrate with Github, every commit shows up in Gimlet.
- This may trigger an automated deployment - based on your deployment settings. Or you can deploy any commit on-demand.
- During deploys, Gimlet builds the container image according to the [set strategy](/docs/deployment-settings/image-settings), then deploys your application.

You can also automate [branch based preview deployments](/docs/deployments/preview-deployments) or roll back when you need to.

### Or integrate Gimlet to your CI workflows

![](/flow.svg)

- Your CI pipeline lints and tests the code, then builds the container image.
- Then the Gimlet CI plugin notifies Gimlet about the newly built software artifact.
- Based on your [automated deployment settings](docs/deployments/automated-deployments) Gimlet may deploy your application.

{% callout %}
You can also initiate a deploy with the CI plugin. In this mode of operation you can have your CI workflows orchestrating deployment.

Learn more about the [CI plugins and integration options](/docs/reference/ci-plugins).
{% /callout %}

## Clusters

Gimlet is a Bring Your Own Hardware platform. Each environment is deployed on its own Kubernetes cluster.

If you don't know how to launch a cluster, check out providers like [civo.com](https://civo.com) where you can have a useful cluster for $20 a month, with swift setup experience.

Our cloud environment provides an ephemeral cluster for 7-days so you don't need to deal with Kubernetes clusters when you start just can skip ahead to deployment.

{% video src="https://www.youtube-nocookie.com/embed/LCk25U7Gaj4" /%}

{% callout %}
There is a possibility to map environments to Kubernetes namespaces, thus hosting multiple environments on the same cluster.

Gimlet also works well on vcluster.

[Join our Discord](https://discord.com/invite/ZwQDxPkYzE) to learn more.
{% /callout %}

### Cluster setup and maintenance

Gimlet aids cluster setup with [preconfigured stacks](/docs/deployment-settings/infrastructure-management).

With a marketplace-like experience you can configure common usecases:
- SSL certificates
- Metrics and dashboards
- Secrets

After you set up your cluster, Gimlet provides an update stream for your cluster components - something that is often overlooked in marketplaces.

## Gimlet guides you on your path to master Kubernetes

The Gimlet team has strong roots in cloud and application operations. Hence we want to aid you in your day-2 experience:

- We have [preconfigured alerts](/docs/monitoring/integrated-kubernetes-alerts) for the most common application incidents and misconfigurations with guiding texts towards resolution.
- You can check application state and logs from the dashboard while [troubleshooting](/docs/kubernetes-resources/troubleshooting)

{% callout %}
We pride ourselves to show you as little Kubernetes as little possible. Introducing you to deeper concepts only when you need to know about them.

We don't want to fully abstract away Kubernetes either. We know Kubernetes finds its way to the surface eventually. But you can learn slowly over the years.
{% /callout %}

## Gitops

Gimlet is not writing Kubernetes directly during deploys.

Gimlet writes all manifests to git, then the [Flux](https://fluxcd.io/) project syncronizes the git state with Kubernetes. This has the added benefit of having all your configuration in code.

By convention, we maintain two git repositories per environment:
- one for application deployments
- one for infrastructure components.

```bash
➜  projects tree gitops-optimal-snow-apps 
gitops-optimal-snow-apps
├── README.md
├── chatbot-ui
│   ├── deployment.yaml
│   ├── release.json
│   └── service.yaml
├── flowise
│   ├── deployment.yaml
│   ├── ingress.yaml
│   ├── release.json
│   └── service.yaml
├── flux
│   ├── deploy-key-laszlocph-gitops-optimal-snow-apps.yaml
│   ├── gitops-repo-builtin-apps.yaml
│   └── notifications-builtin-apps.yaml
```

```bash
$ tree gitops-optimal-snow-infra
├── README.md
├── dependencies
│   └── namespace.yaml
├── flux
│   ├── deploy-key-laszlocph-gitops-optimal-snow-infra.yaml
│   ├── flux.yaml
│   └── gitops-repo-builtin-infra.yaml
├── helm-releases
│   ├── gimlet-agent.yaml
│   ├── image-builder.yaml
│   └── sealed-secrets.yaml
├── helm-repositories
│   ├── onechart.yaml
│   └── sealed-secrets.yaml
├── manifests
│   ├── capacitor.yaml
│   ├── customregistry-registrycert.yaml
│   ├── customregistry-secret.yaml
│   ├── docker-registry.yaml
│   ├── dockerhubregistry-secret.yaml
│   ├── ghcrregistry-secret.yaml
│   └── oauth2-proxy.yaml
└── stack.yaml
```

{% callout %}
We are also the maintainers of the open-source [Capacitor project](https://github.com/gimlet-io/capacitor), the Flux dashboard.
{% /callout %}

## Extend Gimlet to your needs

Gimlet is built on top of the de-facto Kubernetes components:

- ingress-nginx
- cert-manager
- Flux
- Helm
- Sealed Secrets

Our deployment templates are built on the [gimlet-io/onechart](https://github.com/gimlet-io/onechart) Helm chart and they are [extensible](http://127.0.0.1:3001/docs/deployment-settings/custom-template).

Our gitops repositories follow a basic structure that you can also use for your own purposes.
