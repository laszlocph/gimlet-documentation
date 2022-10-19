---
title: "How Flux broke the CI/CD feedback loop, and how we pieced it back together"
date: "2022-10-20"
description: A green build used to mean a successful deploy. But then gitops came and broke this heuristic.
image: gitops-broke-cicd.jpg
---

For a decade, a green CI/CD build meant that everything is fine. Code is tested, deployed, you can move on with your day.

This is what we gave up when we adopted Flux. It wasn't for nothing, but with giving up the *green build means a sucessful deploy* heuristic, it became harder to figure out whether our code is deployed yet.

Flux runs in our Kubernetes clusters in a distributed fashion: one Flux in each cluster. This architecture has benefits, but the drawback is, we cannot ask a a central Flux to see our code is deployed.

When using Flux, how do you know if your code is deployed?

## When using Flux, how do you know if your code is deployed?

Flux CD is a gitops controller. In gitops, the desired configuration is first pushed to git, then the gitops controller - in our case Flux CD - syncs the cluster state to match the desired state in git. This is a departure from imperative CI/CD pipelines which do not traditionally use git repositories to hold application config.

CI/CD platforms fire and forget, they generate the config from a template, deliver it to the target system, but do not store the configuration that was delivered. Gitops on the other hand places a great emphasis on keeping the configuration version controlled.

Our clients are big Flux CD users.

1) When developers push their code to git
2) CI kicks off and tests, builds the software and a docker image.
3) To roll out this new artifact, a change is made to the gitops configuration repository to point to this docker image.
4) Flux then notices the change and applies it on the Kubernetes cluster.
5) Flux sends a notification to Slack that it applied the change.

![CICD and Flux](/flux-cicd.jpg)


Looks simple enough, but there is one thing that the diagram doesn't communicate well. The CI/CD pipeline is done after step three, and Flux applies the changes in step four asynchronously.

While Flux notifies developers once it applied the changes, CI/CD at step three returns green and developers must match up notifications with builds in their heads. We lost the *green build means a sucessful deploy* heuristic.

The question is, can we get it back?

## Can we piece it back together?

The short answer is yes. Flux has a generic webhook notification system, so it can report back the synchronized state.

The problem is, CI runs only on-demand, so you have to have a standalone service that accepts these webhooks. This is also the service what the CI/CD pipeline can poll to get the state of the deployment.

Factoring in this new standalone component, let's call it the *gitops brain*, here is how the modified flow looks:

1) When developers push their code to git
2) CI kicks off and tests, builds the software and a docker image.
3) To roll out this new artifact, a change is made to the gitops configuration repository to point to this docker image.
4) CI starts polling the gitops brain to see if the gitops commits were applied
5) Flux then notices the change and applies it on the Kubernetes cluster.
6) Flux sends a notification to Slack and the gitops brain that it applied the change.

![CICD and Flux](/flux-cicd-gitops-brain.jpg)

To configure Flux to notify the gitops brain we need a couple of CRDs on the cluster. `Provider` to configure the gitops brain access details, and an `Alert` to configure what to alert on.

```yaml
apiVersion: notification.toolkit.fluxcd.io/v1beta1
kind: Provider
metadata:
  name: gitops-brain
  namespace: flux-system
spec:
  address: https://gitops.brain.mycompany.com
  type: generic
---
apiVersion: notification.toolkit.fluxcd.io/v1beta1
kind: Alert
metadata:
  name: all-applies
  namespace: flux-system
spec:
  eventSeverity: info
  eventSources:
  - kind: Kustomization
    name: gitops-repo
    namespace: flux-system
  providerRef:
    name: -gitops-brain
```

There is one more thing to set in Flux. By default Flux does not wait for the applied resources to come up healthy. It applies them and notifies all providers that it has done its job. To make Flux wait for all resource healthchecks to pass, we must set the `wait: true` flag on the `Kustomization` CRD:

```yaml
apiVersion: kustomize.toolkit.fluxcd.io/v1beta2
kind: Kustomization
metadata:
  name: gitops-repo
  namespace: flux-system
spec:
  interval: 60m0s
  wait: true # wait for all applied resources to become ready
  path: ./
  prune: true
  sourceRef:
    kind: GitRepository
    name: gitops-repo
  validation: client
```

These yaml changes and a standalone webhook processor, the gitops brain, is what it takes to piece the *green build means a sucessful deploy* heuristic back together when using Flux.

Interested how we did it?

## How we pieced it back together?


## What is up with Argo and other gitops controllers?

