---
title: 'How Flux broke the CI/CD feedback loop, and how we pieced it back together'
date: '2022-10-20'
description: A green build used to mean a successful deployment. But then gitops came and broke this heuristic.
image: gitops-broke-cicd.jpg
---

For a decade, a green CI/CD build meant that everything is fine, code is tested, deployed, and you can move on with your day.

This is what we gave up when we adopted Flux. It wasn't for nothing, but with giving up the _green build means a successful deploy_ heuristic, it became harder to figure out whether our code is deployed yet.

Flux runs in our Kubernetes clusters in a distributed fashion: one Flux in each cluster. This architecture has benefits, but the drawback is, we cannot ask a central Flux instance to see if our code is deployed.

When using Flux, how do you know if your code is deployed?

## When using Flux, how do you know if your code is deployed?

Flux CD is a gitops controller. In gitops, the desired configuration is first pushed to git, then the gitops controller - in our case Flux CD - syncs the cluster state to match the desired state in git. This is a departure from imperative CI/CD pipelines which do not traditionally use git repositories to hold application config.

CI/CD platforms fire and forget, they generate the config from a template, deliver it to the target system, but do not store the configuration that was delivered. Gitops on the other hand places a great emphasis on keeping the configuration version controlled.

Our clients are big Flux CD users.

1. When developers push their code to git
2. CI kicks off and tests, builds the software and a docker image.
3. To roll out this new artifact, a change is made to the gitops configuration repository to point to this docker image.
4. Flux then notices the change and applies it on the Kubernetes cluster.
5. Flux sends a notification to Slack that it applied the change.

![CICD and Flux](/flux-cicd.jpg)

Looks simple enough, but there is one thing that the diagram doesn't communicate well. The CI/CD pipeline is finished after step three, Flux applies the changes in step four asynchronously.

While Flux notifies developers once it applied the changes, CI/CD at step three returns green and developers must match up notifications with builds in their heads. We lost the _green build means a successful deploy_ heuristic.

The question is, can we get it back?

## Can we piece it back together?

The short answer is yes. Flux has a generic webhook notification system, so it can report back the synchronized state.

The problem is, CI runs only on-demand, so you have to have a standalone service that accepts these webhooks. This is also the service that the CI/CD pipeline can poll to get the state of the deployment.

Factoring in this new standalone component, let's call it the _gitops brain_, here is how the modified flow looks:

1. When developers push their code to git
2. CI kicks off and tests, builds the software and a docker image.
3. To roll out this new artifact, a change is made to the gitops configuration repository to point to this docker image.
4. CI starts polling the gitops brain to see if the gitops commits were applied
5. Flux then notices the change and applies it on the Kubernetes cluster.
6. Flux sends a notification to Slack and the gitops brain that it applied the change.

![CICD and Flux](/flux-cicd-gitops-brain.jpg)

To configure Flux to notify the gitops brain we need a couple of CRDs on the cluster. `Provider` to configure the gitops brain access details, and an `Alert` to configure when to notify the `Provider`.

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

There is one more thing to set in Flux. By default Flux does not wait for the applied resources to come up healthy. It applies them and notifies all providers that it has done its job, except this does not mean that deployment is done.

To make Flux wait for all resource health checks to pass, we must set the `wait: true` flag on the `Kustomization` CRD:

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

The yaml changes and the standalone webhook processor, the gitops brain, is what it takes to piece the _green build means a successful deploy_ heuristic back together when using Flux.

## What is up with ArgoCD and other gitops controllers?

Flux is not unique with its distributed approach. It has some nice characteristics, like not having to store all cluster credentials in a central server, but ArgoCD supports this particular usecase better. Its centralized architecture allows it to determine easily the state of the gitops sync.

From the CI/CD pipeline, you can ask ArgoCD whether the sync is done using the `argocd app sync --async` command followed by the `argocd app wait --sync --health` commands. The wait command will halt the execution until the terminal state is known.

Other distributed gitops controllers face similar challenges without a central orchestrator who can serve the role of the _gitops brain_. At Gimlet, we also added a centralized layer on top of FluxCD to better support the CI/CD usecase.

## How we pieced it back together at Gimlet?

Besides the Flux yaml pieces, we also added a centralized layer on top of FluxCD, _the gitops brain_, to better support the CI/CD usecase.

To be more precise, we already had one: Gimlet factored the gitops related logic to Gimletd, Gimlet's release manager component. So when we needed a service for Flux to notify about gitops applies, we knew what to use.

With Gimletd the flow looks like this:

![CICD and Flux and Gimletd](/flux-cicd-gimletd.png)

1.
2.
3. To roll out the new artifact CI/CD asks Gimletd to make changes to the gitops configuration repository to point to the new docker image. CI also starts polling Gimletd for the deployment status.
4.
5.
6. Flux sends a notification to Gimletd that it applied the change
7. CI/CD polling gets a final answer about the deployment status and returns green (or red).

In the CI/CD pipeline we used plugins that are available in Gimlet. For Github Actions the pipeline looks like the following:

```yaml
deploy-staging:
  name: 🚀 Deploy / Staging
  runs-on: ubuntu-latest
  needs:
    - 'docker-build'
  if: github.ref == 'refs/heads/main'
  environment: staging
  steps:
    - name: ⬇️ Check out
      uses: actions/checkout@v3.1.0
      with:
        fetch-depth: 1
    - name: 🚀 Deploy / Staging
      uses: gimlet-io/gimlet-artifact-shipper-action
      with:
        DEPLOY: 'true'
        ENV: 'staging'
        APP: 'gais'
      env:
        GIMLET_SERVER: ${{ secrets.GIMLET_SERVER }}
        GIMLET_TOKEN: ${{ secrets.GIMLET_TOKEN }}
```

The plugin is using two Gimlet CLI commands: `gimlet release make` and `gimlet release track` underneath. Similarly to the ArgoCD semantics.

## And that's a wrap

Being distributed often poses manageability issues that are straightforward in centralized architectures.

If you are building a development platform on top of gitops and Flux CD, the demonstrated yaml pieces and a webhook processor is what you need to build to return to the traditional semantics of the green build.

Let us know how you solved this issue at your company!

Onwards!

ps.: we love gitops, but know it is not without problems. Here is another issue where we think gitops can use some platform love: [Three problems with GitOps as deployment history, and how we overcome them](/blog/three-problems-with-gitops-as-deployment-history-and-how-we-overcome-them)
