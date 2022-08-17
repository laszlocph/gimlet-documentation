---
title: Bootstrap gitops automation with Gimlet CLI
description: In this guide you will use GimletCLI to bootstrap the gitops workflow, then write application manifests to the gitops repository and see it deploy.
---

In this tutorial you will use the Gimlet CLI to bootstrap the gitops automation. You will also write application manifests to the gitops repository and see them deploy.

{% callout title="Bootstrapping on the Gimlet dashboard" %}
Gitops bootstrapping happens automatically on the Gimlet dashbaord during environment creation. You can still read this tutorial to know what goes under the hood.
{% /callout %}

## Prerequisites

- it is imporant that you read the [The SANE Gitops guide](/concepts/the-sane-gitops-guide)
- an empty Kubernetes cluster. Use [k3d](https://github.com/rancher/k3d#get), if you don't have one. Use the `k3d cluster create first-cluster --k3s-arg "--disable=traefik@server:0"` command to not install the default ingress controller

## Bootstrapping gitops

The gitops controller is a small piece of software running in your Kubernetes cluster. It monitors your gitops git repository for changes and applies them on the cluster.

To bootstrap the gitops controller

- first create a new git repository and check it out locally
- then use the `gimlet gitops bootstrap` command to put the controller's deploy manifests in the gitops repository 
- finally, apply the just created manifests on the cluster to kickstart the automation

Any further changes to the GitOps repository will be automatically applied to the cluster. This is GitOps.🙌

### Gimlet gitops bootstrap

First, create a new git repository and check it out locally. Then Navigate to the checked out folder and run:

```
gimlet gitops bootstrap \
  --single-env \
  --gitops-repo-url git@github.com:<user>/<repo>.git
```

Follow the steps from the command output to bootstrap the gitops loop:

```
⏳ Generating manifests
✔️ GitOps configuration written to /home/laszlo/projects/deleteme/flux

👉 1) Inspect the configuration files, then commit and push the configuration to git
👉 2) Add the following deploy key to your Git provider

ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIElqBEqyfqomY3Yzzg8o8CkaEzHvy+7zkH3x3HuVxNF0

👉 3) Apply the gitops manifests on the cluster to start the gitops loop:

kubectl apply -f /home/laszlo/projects/deleteme/flux/flux.yaml
kubectl apply -f /home/laszlo/projects/deleteme/flux/deploy-key-gimlet-io-tutorial-gitops-repo.yaml
kubectl wait --for condition=established --timeout=60s crd/gitrepositories.source.toolkit.fluxcd.io
kubectl wait --for condition=established --timeout=60s crd/kustomizations.kustomize.toolkit.fluxcd.io
kubectl apply -f /home/laszlo/projects/deleteme/flux/gitops-repo-gimlet-io-tutorial-gitops-repo.yaml

         Happy Gitopsing🎊
```

{% callout title="Not sure how to add a deploy key?" %}
You need to authorize Flux to fetch the contents from Github by creating a read-only deploy key in your gitops repository.

- Open GitHub, navigate to your repository, and under *Settings > Deploy* keys click on *Add deploy key*
- Paste the ssh-rsa key from step 2) of the `gimlet gitops bootstrap` output as a key. `flux-gitops` can be an appropriate name for it
- Make sure to leave the *Allow write access* checkbox unchecked

![Create a deploy-key](/deploy-key.png)
{% /callout %}

### Verify the gitops automation

Check Flux's custom resources on the cluster to verify the gitops automation.

Flux uses the `gitrepository` custom resource to point to git repository locations and credentials. Flux's source controller periodically checks the content of the git repositories, and you can validate their status as follows:

```bash
➜ kubectl get gitrepositories -A
NAMESPACE     NAME                                         URL                                                   AGE   READY   STATUS
flux-system   gitops-repo-gimlet-io-gitops-deleteme-apps    ssh://git@github.com/gimlet-io/gitops-deleteme-apps    60s   True    stored artifact for revision 'main/bb32202a9968cc290ff757f2a75bb17863d46e6e'
flux-system   gitops-repo-gimlet-io-gitops-deleteme-infra   ssh://git@github.com/gimlet-io/gitops-deleteme-infra   60s   True    stored artifact for revision 'main/c29545f11e677479a44cfad85549b3b92af0a3c2'
```

If the git repositories are in ready state, validate the `kustomization` custom resources. These resources point to a path in a git repository to apply yamls from. If they are in ready state, you can be sure the Flux applied your latest manifests.

```bash
➜  kubectl get kustomizations -A 
NAMESPACE     NAME                                                      AGE   READY   STATUS
flux-system   gitops-repo-gimlet-io-gitops-deleteme-apps                 60s   True    Applied revision: main/bb32202a9968cc290ff757f2a75bb17863d46e6e
flux-system   gitops-repo-gimlet-io-gitops-deleteme-apps-dependencies    60s   True    Applied revision: main/bb32202a9968cc290ff757f2a75bb17863d46e6e
flux-system   gitops-repo-gimlet-io-gitops-deleteme-infra                60s   True    Applied revision: main/c29545f11e677479a44cfad85549b3b92af0a3c2
flux-system   gitops-repo-gimlet-io-gitops-deleteme-infra-dependencies   60s   True    Applied revision: main/c29545f11e677479a44cfad85549b3b92af0a3c2
```

Now that the gitops automation is in place, every manifest you put in the gitops repositories will be applied on the cluster by the gitops controller.

{% callout title="Need to debug Flux?" %}
If `kustomizations` or `gitrepositories` are not in ready state, you get an error message in their status.

If you need to further debug their behavior, you can check Flux logs in the `flux-system` namespace.

```
kubectl logs -f deploy/kustomize-controller -n flux-system
kubectl logs -f deploy/source-controller -n flux-system
```
{% /callout %}

## Deploy your an app with gitops

Now let's deploy a dummy application now with gitops. To do that, you need to place application manifests in the gitops repository and push your commit.

### A dummy app

First get some dummy yaml to deploy an Nginx container. Gimlet's OneChart Helm chart is perfect for that:

```
helm template dummy-app -n staging onechart/onechart > manifest.yaml
```

Commit and push the file to the gitops repo under `dummy-app` a new folder called dummy-app.

### Gitops in action

With the push, the gitops controller modifies the cluster state according to the git state, so it will deploy the git changes and the dummy application will pop up in the cluster.

Follow along with the `kubectl get pods -A -w` command.

{% callout title="Gitops bootstrapping reference" %}
For all the gitops bootstrapping options, check out the [Gitops bootstrapping reference](/docs/gitops-bootstrapping-reference).
{% /callout %}
