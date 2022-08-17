---
title: Flux CRDs
description: Flux uses several Kubernetes Custom Resources Definitions (CRDs) to configure the automation process. In this section, you will get a picture of what those are and what they are used for.
---

On this page you get a quick intro on the Kubernetes custom resources that Flux uses.

Flux uses several Kubernetes Custom Resources Definitions (CRDs) to configure the automation process. In this section, you will get a picture of what those are and what they are used for.

## GitRepository
From the [Core Concepts of FluxCD](https://fluxcd.io/docs/concepts/)

> A _Source_ defines the origin of a repository containing the desired state of the system and the requirements to obtain it (e.g. credentials, version selectors). For example, the latest `1.x` tag available from a Git repository over SSH. [...]
> 
> The origin of the source is checked for changes on a defined interval, if there is a newer version available that matches the criteria, a new artifact is produced.
> 
> All sources are specified as Custom Resources in a Kubernetes cluster, examples of sources are `GitRepository`, `HelmRepository` and `Bucket` resources.

In short, GitRepository points Flux to a git repository and to credentials to get the yamls.

## Kustomization
From the [Core Concepts of FluxCD](https://fluxcd.io/docs/concepts/)

> The `Kustomization` custom resource represents a local set of Kubernetes resources (e.g. kustomize overlay) that Flux is supposed to reconcile in the cluster. The reconciliation runs every one minute by default, but this can be changed with `.spec.interval`. If you make any changes to the cluster using `kubectl edit/patch/delete`, they will be promptly reverted. You either suspend the reconciliation or push your changes to a Git repository.

While the official documentation talks about Kustomize resources, the `Kustomization` resource simply points to a path in a `GitRepository` to apply yamls from. Technically, it uses Kustomize to render the yamls from that location, but it can deploy plain Kubernetes yamls too. This is what Gimlet uses it for.

For more information, take a look at the [Kustomize FAQ](https://fluxcd.io/docs/faq/#kustomize-questions) and the [Kustomization CRD](https://fluxcd.io/docs/components/kustomize/kustomization/).

## HelmRelease
From the [FluxCD site](https://fluxcd.io/docs/components/helm/helmreleases/)

> A **HelmRelease** object defines a resource for controller driven reconciliation of Helm releases via Helm actions such as install, upgrade, test, uninstall, and rollback.

Basically, the `HelmRelease` resource let's you install Helm Charts of given versions with the specified values.yaml file. This CRD makes it possible to deploy Helm charts from gitops, thus making the procedural `helm install` and `helm upgrade` commands declarative. So it allows you to manage the helm chart and its values with git. Flux will take care of the installation, upgrade, and rollback.

## Notification
With the `Alert` CRD, you can send notifications of a given gitops automation to a list of `Provider` resources. You can read more about various CRDs and their configuration options in the [Flux documentation](https://fluxcd.io/docs/components/notification/).
