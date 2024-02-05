# Introducing Capacitor, a general purpose UI for Flux

Flux has been one of the most popular gitops tools available for years. Yet, it only existed as a CLI tool until now. Capacitor is a GUI that acts as a dashboard for Flux where you can get quick overview about your Flux resources and application deployments to debug issues quickly.

![Capacitor, a general purpose UI for Flux](../../../public/capacitor.png)

## A word from Laszlo, the maintainer of Capacitor

> “Hello Flux blog,
> 
> Long time Flux user here, although I haven't been very active in the community so far. The maintainers have been doing an amazing job with Flux. We’re standing on the shoulders of giants 🙌.
> 
> There is an odd fact though: there was no de facto Flux GUI until now. How come?
> I thought we could make one, hence we made Capacitor.
> 
> Why?
> Because it is not easy to observe Kustomization and HelmRelease states in the cluster. Even with tools that show Custom Resources, it is not obvious to make the connection between application > deployments and Flux resources.
> 
> The goal with Capacitor is to create the right context for developers to debug their deployments. Whether the error is related to Flux or not.
> 
> We hope you’re going to find the tool useful.”

## Use cases

### Commandless Flux observation

The GUI substitutes for interacting with Flux resources and runtime via flux CLI commands.

[image showing Flux resources in the footer]

### Connecting application deployments with Flux resources

Application deployments show which Flux Kustomization or HelmRelease deployed them.

With a click of a button you can jump to the Flux resource and check the reconsiliation state.

[gif showing app deployments and related Kustomization / Helm Releases]

### Application deployment debugging feedback loop

![Application deployment controls](../../../public/servicecard.png)

Application deployments have controls to perform routine tasks, like checking logs, describing deployments, pods, configmaps.

With these controls, Capacitor can become your daily driver for your deployments.

![Application logs](../../../public/application-logs.png)

## What’s supported?

Flux resources:
- Kustomization
- GitRepository
- HelmRelease

Kubernetes resources:
- Deployment
- Pod
- Service
- Ingress
- Configmap
- Secret

OCI repositories are not supported at this point.

## Who made Capacitor?

Capacitor is an open-source project backed by [Gimlet](https://gimlet.io), a team that creates a Flux-based IDP.

Gimlet is our opinionated project, Capacitor is our un-opinionated take.

## How to get started?

Capacitor doesn’t come with Flux natively, you’ll need to set it up separately with one of the methods described below: as Kubernetes manifest or Helm chart.

### Kubernetes manifest

```k8s manifests from readme```

### Deploy as a Helm chart

```Helm chart from readme```

## Where is the project hosted?

It is hosted on [Gihub: gimlet-io/capacitor](https://github.com/gimlet-io/capacitor)
