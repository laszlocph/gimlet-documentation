---
title: Escape hatches
pageTitle: Gimlet - Escape hatches
description: 'Developer platforms need to be opinionated to be able to provide a robust and good developer experience. But platforms may become limiting for this very reason.'
---

Developer platforms need to be opinionated to be able to provide a robust and good developer experience.

But platforms may become limiting for this very reason. Many platform efforts platoed because their abstractions were getting in the way of work.

## Gimlet is built on the de facto standards of the industry: Flux and Helm

The value of Gimlet is in orchestrating the management of Kubernetes and Flux custom resources. It encapsulates the management logic of your platform, and provides you best practices upon these open standards.

Should you need to extend Gimlet or you've found better workflows? Your configuration in the gitops repository is the source of truth.

## We craft our abstractions with escape hatches in mind

- Even though Helm is our first choice, you can manage your application deployment with plain Kubernetes manifests, or use Kustomize for postprocessing. Check out the [When Helm is limiting](/docs/when-helm-is-limiting) guide.

- If you make custom changes in the gitops repo, Gimlet preserves them through all workflows. See [Making custom changes to a stack](/docs/managing-infrastructure-components#making-custom-changes-to-a-stack) as an example.

- Did you know that you don't have to jump into Gimlet both feet? You can use Gimlet manifest to describe your deployment configurations, and the Gimlet CLI to render it as Kubernetes manifests [Rendering the Gimlet manifest](/docs/gimlet-manifest-reference#rendering-the-gimlet-manifest).
