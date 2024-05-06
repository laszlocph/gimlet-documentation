---
title: Gimlet compared to...
description: Can't place Gimlet in your head? This page draws comparisons with common tools like Flux, ArgoCD, Terraform and more.
---

Can't place Gimlet in the landscape? This page draws comparisons with common tools like Flux, ArgoCD, Terraform and more.

Also make sure to read the [concepts](/docs/concepts).

## Gimlet compared to...

### Flux and ArgoCD

Flux and ArgoCD are both [gitops](/concepts/the-sane-gitops-guide) controllers that apply yaml from a git repository onto Kubernetes clusters.

They both have building blocks to construct basic configuration management and deployment workflows but you have to extend them with higher level features. This is where Gimlet comes into the picture.

Gimlet builds heavily on Flux and extends it in multiple ways:

- Gimlet helps with yaml authoring
  - introduces standardized application templates
  - that can be discovered and edited on a GUI
- Gimlet [provides a usable release history](/blog/three-problems-with-gitops-as-deployment-history-and-how-we-overcome-them) as the gitops repository log does that only in theory
- An overview of what application code commit was deployed and when on the cluster, [not just the desired state](/blog/how-flux-broke-the-cicd-feedback-loop-and-how-we-pieced-it-back-together) that may or may not be applied successfully.
- Rollback workflows and preview applications.
- Cluster component management.

### Helm and Kustomize

Helm and Kustomize are the de-facto standards in Kubernetes manifest management. Gimlet helps with yaml authoring and introduces standardized application templates, it also does [many other things](#flux-and-argocd).

Gimlet uses Helm heavily, but [supports Kustomize overlay patches as well](/docs/when-helm-is-limiting). If you are into Helm or Kustomize, Gimlet will only extend their power.

### Terraform

Terraform is a well known Infrastructure as Code tool. Teams use it extensively to provision cloud infrastructure.

While Terraform is able to provision Kubernetes API resources as well, its responsibility often ends when the cluster is created and a gitops controllers is installed. This is where Gimlet comes to the picture.

Gimlet operates on top of the Kubernetes API and does not care about how the cluster came to life. [Gimlet extends the building blocks that Flux and ArgoCD](#flux-and-argocd), the two best known gitops controller provide. So Gimlet and Terraform differs in scope, and can be both used at the same time.

### In-house developer platforms

There is great effort put into internal developer platform building by teams everywhere. While the perception is that companies need to tailor every bit of the developer experience, these efforts often result in lookalike tools that are often not polished.

While Gimlet cannot compete with well funded and well run platform teams serving unique needs, if you can resist the urge to build everything in-house and give Gimlet a chance, you will see how much your team appreciates it, and how easy it is to further extend.

### Backstage

Today Backstage is capturing a significant mindshare of platform builders.

What is often not articulated is that Backstage is a DIY platform where even the most basic configuration requires coding in Typescript. Community plugins also need to be integrated into your Backstage instance.

Gimlet follows a different approach. Instead of a fragmented piecemeal of commuity plugins, Gimlet addresses the core functionality with an overarching design plan and makes it accessible on day one.

### Other ready made developer platforms

There are many contenders in the off-the-shelf developer platform space. Each similar to the other, but unique in subtle ways.

We believe that this is not a winner takes all market and developer preferences will guide the tool selection. We encourage you to try multiple platforms beside Gimlet and see which tool fits your workflows.
