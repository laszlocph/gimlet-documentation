---
title: Blog
---

{% post name="Your first three kubectl commands when troubleshooting Kubernetes applications" image="three-commands.png" link="/blog/your-first-three-kubectl-commands-when-troubleshooting-kubernetes-applications" date="2023-09-14" %}
Learn Kubernetes troubleshooting with this step-by-step guide. List pods, analyze logs, describe pods, and monitor events in real-time. Master debugging Kubernetes based applications with confidence.
{% /post %}

{% post name="Budget managed Kubernetes options" image="budget-managed-k8s.png" link="/blog/budget-managed-kubernetes-options" date="2023-08-18" %}
Managed Kubernetes starts at 5$ a month. With free control planes, they are now comparable with VPS options.
{% /post %}

{% post name="A 6.37 EUR a month single node Kubernetes cluster on Hetzner with vitobotta/hetzner-k3s" image="637.png" link="/blog/a-6-37-mo-single-node-kubernetes-cluster-on-hetzner-with-vitobotta-hetzner-k3s" date="2023-08-17" %}
I recently did a live stream trying out Vito Botta's `hetzner-k3s` tool. This blog post is a follow up to the stream where I share my config for
- starting up a single node cluster,
- installing ingress controller,
- and exposing it on port 80 and 443 to the world.
{% /post %}

{% post name="Our free tier" image="our-free-tier.png" link="/blog/our-free-tier" date="2023-08-03" %}
We don't want to make you think.

There is always a catch with SaaS pricing, but we want to avoid it as much as possible.
{% /post %}

{% post name="Running Kubernetes on your laptop with K3d" image="rocket.png" link="/blog/running-kubernetes-on-your-laptop-with-k3d" date="2023-07-12" %}
Kubernetes has emerged as the go-to platform. But setting up a cluster on a laptop feels like a complex task for many developers.

For this reason, we put together this blog post to show that with only a handful of commands you can go very far.
{% /post %}

{% post name="Error handling in HelmController - how to solve the infamous \"Upgrade retries exhausted\" error" image="annoyed-cat.png" link="/blog/error-handling-in-helm-controller-how-to-solve-the-infamous-upgrade-retries-exhausted-error" date="2023-05-12" %}
A detailed analysis of how Flux's Helm Controller handles failure, its implications, errorstates and potential resolutions.

And everything we know about the "Upgrade retries exhausted" error.
{% /post %}

{% post name="The ultimate GitOps repository structuring guide" image="gitops-repo-structure.png" link="/blog/the-ultimate-gitops-repository-structuring-guide" date="2023-05-02" %}
The way you structure your repository can greatly impact the efficiency and reliability of your gitops workflow.

In this article, we'll explore different approaches to structuring your gitops repository so you gain a better understanding of how to optimize your deployment process.
{% /post %}

{% post name="Hosting static sites on kubernetes" image="agyuvalverebre.jpg" link="/blog/hosting-static-sites-on-kubernetes" date="2023-04-08" %}
There is a meme here somewhere. But as kubernetes is becoming _the_ deployment platform, there are legitimate cases to deploy your static site on it. We show you how to.
{% /post %}

{% post name="Git: the ironclad system" image="git-ironclad.png" link="/blog/git-the-ironclad-system" date="2023-04-06" %}
Git is the most feared tool amongst the tools we use everyday. Over the years I developed an ironclad approach to git, to not get into trouble, and if I did, how to get out of it.
{% /post %}

{% post name="Don't group environment variables" image="dont-group.png" link="/blog/dont-group-environment-variables" date="2023-04-03" %}
This is a preiodic reminder for application developers to not group environment variables. `APP_ENV=staging` easily becomes a blocker when you do application operation.
{% /post %}

{% post name="Clickops over gitops" image="clickops.png" link="/blog/clickops-over-gitops" date="2023-03-16" %}
Doing cloud operations by clicking on a dashboard that generates a stream of infrastructure as code changes.
{% /post %}

{% post name="The how and why we built our SaaS platform on Hetzner and Kubernetes" image="why-hetzner.png" link="/blog/how-we-built-our-saas-platform-on-kubernetes-and-hetzner" date="2023-03-08" %}
Hetzner is five times cheaper for us than the hyperscalers. This blog posts enumerates the how and why we built our SaaS on a discount bare metal provider. Gotchas included.
{% /post %}

{% post name="Options for Kubernetes pod autoscaling" image="autoscaling.png" link="/blog/options-for-kubernetes-pod-autoscaling" date="2023-01-23" %}
The Gimlet.io team put together this blog to show common usecases of autoscaling:

- based on CPU
- custom Prometheus metrics
- and RabbitMQ queue length.

Furthermore, we are aiming to clear up the differences between the Horizontal Pod Autoscaler (HPA), the Prometheus Adapter and KEDA.
{% /post %}

{% post name="Announcing the Gimlet SaaS Early Access" image="saas-early-access.png" link="/blog/announcing-the-gimlet-saas-early-access" date="2022-12-05" %}
We have something really exciting to share with you: Gimlet is going SaaS. In other words, you will be able to use Gimlet's unparalleled Kubernetes deploy experience with even fewer clicks than before.
{% /post %}

{% post name="Three problems with GitOps as deployment history, and how we overcome them" image="three-problems-with-gitops.png" link="/blog/three-problems-with-gitops-as-deployment-history-and-how-we-overcome-them" date="2022-11-01" %}
One often mentioned property of gitops is that it gives you a deployment history by nature. As you keep updating your desired deployment state in git, it builds up to a trail of changes that you can use to tell what version was deployed at a given time.

Our finding is that this git history is too sparse and noisy at the same time to be used for anything practical without tooling.

In this blog post we describe three problems we experienced once we adopted gitops and Flux CD, and what measures we implemented in Gimlet to overcome them. You may face similar issues in your own gitops platform implementation and this blog post can give you ideas about how to solve them.
{% /post %}

{% post name="How Flux broke the CI/CD feedback loop, and how we pieced it back together" image="gitops-broke-cicd.jpg" link="/blog/how-flux-broke-the-cicd-feedback-loop-and-how-we-pieced-it-back-together" date="2022-10-20" %}
A green build used to mean a successful deploy. But then gitops came and broke this heuristic.
{% /post %}

{% post name="Are you sure none of your containers run as root?" image="introducing-kyverno.png" link="/blog/are-you-sure-none-of-your-containers-run-as-root" date="2021-11-24" %}
The Kyverno policy engine just arrived in Gimlet Stack. Let's see how you can be certain that none of the containers run as root in your Kubernetes cluster.
{% /post %}

{% post name="Gimlet Dashboard strategy" image="old-gimlet-ui.png" link="/blog/gimlet-dashboard-strategy" date="2021-05-03" %}
Gimlet Dashboard - or Gimlet Dash in short - is going to be Gimlet's UI component. It tackles multiple purposes, and this document is here to elaborate on that.
{% /post %}

{% post name="Mirroring environments with gitops and Kyverno" image="gitops-kyverno2.png" link="/blog/mirroring-environments-with-gitops-and-kyverno" date="2021-04-26" %}
See how you can mirror complete environments with gitops and rewrite host names with Kyverno's mutating admission controllers.
{% /post %}

{% post name="6 paths to adopt Gimlet and be better off with Kubernetes" image="gimlet-k8s.png" link="/blog/6-paths-to-adopt-gimlet-and-be-better-off-with-kubernetes" date="2021-03-17" %}
Gimlet was made to be modular. It meets you where you are and helps you to be better off with Kubernetes.
This post collects six avenues to adopt Gimlet.  
{% /post %}

{% post name="Announcing GimletD, the gitops release manager" image="gimletd-with-gitops.png" link="/blog/announcing-gimletd-the-gitops-release-manager" date="2021-03-16" %}
Today, I am thrilled to announce GimletD, the gitops release manager component of Gimlet.

See what GimletD brings to the gitops ecosystem.
{% /post %}

{% post name="GimletD - the GitOps release manager" image="gimlet-tool.jpeg" link="/blog/gimletd-the-gitops-release-manager" date="2021-01-25" %}
This document is a design proposal for GimletD, a server-side release manager component for GitOps workflows.
{% /post %}

{% post name="The last-mile problem with Kubernetes" image="randy-laybourne-06P0tprVDvY-unsplash.jpg" link="/blog/the-last-mile-problem-with-kubernetes" date="2020-06-23" %}

> Transporting goods via freight rail networks and container ships is often the most efficient and cost-effective manner of shipping.
>
> However, when goods arrive at a high-capacity freight station or port, they must then be transported to their final destination. This last leg of the supply chain is often less efficient, comprising up to 41% of the total cost to move goods.

Something similar we see with Kubernetes projects.
{% /post %}

{% post name="Resource widget and cluster management" link="/blog/resource-widget-and-cluster-management" date="2020-06-18" %}
This week's update is about resource management.

Learn about the new CPU/Memory widgets and how you can configure them appropriately to keep cluster resources in check.
{% /post %}

{% post name="The cluster admin struggle, and ways to keep Kubernetes Resource Requests and Limits in check" image="pascal-meier-2hkYgCchEhk-unsplash.jpg" link="/blog/the-cluster-admin-struggle-and-ways-to-keep-kubernetes-resource-requests-and-limits-in-check" date="2020-06-15" %}
Learn how you can teach and remind developers of setting good Kubernetes Resource Requests and Limits. Enforce it if you must, and a bonus.
{% /post %}

{% post name="How to implement a gitops platform with Flux and Helm" image="leafs.jpg" link="/blog/how-to-implement-a-gitops-platform-with-flux-and-helm" date="2020-06-09" %}
In this blog post you will learn how to implement a gitops platform at your company, using Flux and Kustomize.
{% /post %}

{% post name="How to implement a gitops platform with Flux and Kustomize" image="mountain.jpg" link="/blog/how-to-implement-a-gitops-platform-with-flux-and-kustomize" date="2020-06-08" %}
In this blog post you will learn how to implement a gitops platform at your company, using Flux and Kustomize.
{% /post %}

{% post name="Why we built Gimlet" link="/blog/why-we-built-gimlet" date="2020-06-04" %}
Couple of weeks ago, Laszlo had the chance to talk about his path that lead to building Gimlet.

Here is his talk from Software Circus.
{% /post %}

{% post name="Deploy an application with multiple configurations - a Gimlet product update" image="gorilla.jpg" link="/blog/deploy-an-application-with-multiple-configurations-a-gimlet-product-update" date="2020-05-18" %}
Now you can deploy an application in multiple instances, each with a different configuration.

Learn about Gimlet's new feature following a real-life scenario: a generic PyTorch machine learning API that is deployed in multiple instances, each with a different model.
{% /post %}
