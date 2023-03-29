---
title: Installing Gimlet
description: How to install Gimlet on k3s / k3d or Rancher / Docker Desktop or Minikube or kind
---

On this page you can learn how to install Gimlet on any Kubernetes cluster.

By the end of this tutorial you will access the dashboard with a kubectl port-forward command, later you can [move the installation to a real domain and HTTPS](/docs/exposing-gimlet-on-a-domain-name).

## Pre-requisites

- A [Github.com](https://github.com) personal or organization account or a [Gitlab.com](https://gitlab.com) or self-hosted Gitlab account.
- A Kubernetes cluster running on your laptop or on a cloud provider. Gimlet is tested with the following local Kubernetes options:
    - k3s / k3d
    - Rancher / Docker Desktop
    - Minikube
    - kind

## Start the installer with a oneliner

You install Gimlet with an installer. The installer initiates a gitops environment and puts Gimlet into its gitops repository. This way Gimlet itself is managed by gitops.

The following oneliner kickstarts the Gimlet installer.

```bash
curl -L -s https://get.gimlet.io | bash -s trial
```

## Connect with Github or Gitlab

### Create a Github Application

First, the installer creates a Github Application to manage all Gimlet access with it.

![Creating a Github application](https://images.tango.us/public/screenshot_e090274e-ea94-4621-b6f0-b7a770d6815b.png?crop=focalpoint&fit=crop&fp-x=0.4999&fp-y=0.2487&fp-z=3.1368&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1960)

Install the newly created Github Application and select what repositories Gimlet should have access to. We recommend that first you select only a subset of your repositories and extend the list if you want to roll out Gimlet for more apps.

![Step 3 screenshot](https://images.tango.us/public/edited_image_3c1732d7-a923-47d7-bea8-fc69190d5e57.png?crop=focalpoint&fit=crop&fp-x=0.4969&fp-y=0.5822&fp-z=2.2336&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1960)

As a final step, you also need to authorize the newly created application. Keep in mind that you are granting this access to your own Github Application. You are not granting any access to any third-party nor the Gimlet creators.

![Step 4 screenshot](https://images.tango.us/public/screenshot_395e38bc-d9a5-4ef0-8cd9-7a3aeb23d8aa.png?crop=focalpoint&fit=crop&fp-x=0.4947&fp-y=0.5477&fp-z=2.2108&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1960)

### Gitlab

TODO

## Bootstrapping the gitops environment

You have to provide information about the environment you are creating in this step.

You need to name the environment and set the approach to structure gitops resources. By default, Gimlet uses two gitops repositories per environment [by convention](/concepts/gitops-conventions), one for infrastructure components, one for application deployments.

![Step 2 screenshot](https://images.tango.us/public/edited_image_374cd8b6-0385-48db-b8d1-e7ac7c4246da.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&fp-z=1.0000&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=2176%3A662)

## Kickstarting the gitops automation

![Step 2 screenshot](https://images.tango.us/public/screenshot_5bb0d866-ba00-46d7-ba0e-130b3d9693d3.png?crop=focalpoint&fit=crop&fp-x=0.4950&fp-y=0.3286&fp-z=1.8696&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1960)

Once the boorstrapping is done, you have two new git repositories to store manifests in.

Follow the instructions to kickstart the automation. This will be the last time you have to manually deploy things on your cluster.

Once you performed all the instructions, close the browser tab, and return to the terminal to finalize the install.

The installer script is going to check the gitops automation and if Gimlet is installed yet.

```
🧐 Waiting for all four gitops kustomizations become ready, ctrl+c to abort
$ kubectl get kustomizations.kustomize.toolkit.fluxcd.io -A
NAMESPACE     NAME                                                         AGE   READY     STATUS
flux-system   gitops-repo-laszlocph-gitops-minikube-1-apps                 31s   False     dependency 'flux-system/gitops-repo-laszlocph-gitops-minikube-1-apps-dependencies' is not ready
flux-system   gitops-repo-laszlocph-gitops-minikube-1-apps-dependencies    31s   True      Applied revision: main/0195aaac0aa83c5e08c06a8b22c5f3d79ffbad06
flux-system   gitops-repo-laszlocph-gitops-minikube-1-infra                53s   Unknown   reconciliation in progress
flux-system   gitops-repo-laszlocph-gitops-minikube-1-infra-dependencies   53s   True      Applied revision: main/c7310c84029bef0dca8a3c081e5006fb736ad14b

 ✅ Gitops loop is healthy

 🧐 Waiting for Gimlet to start up in the cluster, ctrl+c to abort
$ kubectl get pods -n infrastructure | grep gimlet
NAME                                        READY   STATUS    RESTARTS      AGE
gimlet-agent-848b6f6dd5-t764c               1/1     Running   1 (31s ago)   43s
gimlet-dashboard-855b799c67-fwvjr           0/1     Running   1 (20s ago)   42s
gimletd-79dc5d546c-ksdfn                    0/1     Running   1 (15s ago)   42s
postgresql-0                                1/1     Running   0             34s

 ✅ Gimlet is up

```

## Accessing Gimlet

You were accessing the installer on the [http://gimlet.trial:9000](http://gimlet.trial:9000) address. Now that the installer is stopped, you will reuse this address to access the Gimlet dashboard.

The `/etc/hosts` file entry already exists, you only need to port-forward Gimlet to your local port 9000 to make it accessible on [http://gimlet.trial:9000](http://gimlet.trial:9000).

```yaml
kubectl port-forward -n infrastructure svc/gimlet 9000:9000
```

![Step 1 screenshot](https://images.tango.us/public/screenshot_1e63095f-b057-4e58-8722-fdfd572c5b7f.png?crop=focalpoint&fit=crop&fp-x=0.5053&fp-y=0.2449&fp-z=2.6872&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1960)

## Where to go next

Congratulations, now you have a fully functioning Gimlet dashboard available for evaluation.

If you installed Gimlet on a cloud provider, now you can continue and [move the installation to a real domain and HTTPS](/docs/exposing-gimlet-on-a-domain-name).

If you installed Gimlet on your laptop, you can still proceed and use a service called Ngrok to expose Gimlet for external parties, like CI platforms.

Should you have any trouble installing or have questions [join our community](/docs#getting-help).
