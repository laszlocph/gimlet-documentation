---
title: 'Kubernetes Essentials'
description: |
  Basic Kubernetes informations and commands you can use to manage a cluster.
---

**This is a brief guide for essential things about Kubernetes for sufficient introduction to the orchestrator.**

**Collection of Kubernetes essential and troubleshooting guides, in case you need to fix something with your applications.**

Gimlet abstracts away the use of Kubernetes. As much as we'd like to make issues resolvable on Gimlet's UI, it's not unexpected that you'll need outside-of-Gimlet troubleshooting one day. For this reason, you can find a comprehensive guide about getting started and fixing the most common issues when it comes to Kubernetes.

If all else fails, feel free to reach out to us on our [Discord server](https://discord.com/invite/ZwQDxPkYzE).

In this section, you'll find these resources:

- **Kubernetes Essentials**
	- How to get started with Kubernetes and some basic commands.
- **Troubleshooting**
	- Self-service guide for the most common Kubernetes errors and solving them.
- **Gimlet Manifest Reference**
	- Documentation for the manifest files Gimlet creates for applications deployed with it.

## Kubernetes Fundamentals & Concepts

There are a few concepts about Kubernetes worth understanding.

### Pods

Pods are the smallest deployable units in Kubernetes. It represents a running process on the cluster, and can contain one or multiple containers. The containers of a pod share the same IP address and ports. The containers within a pod can communicate with each other using `localhost`. Containers can also share [volumes]().

### Deployments

Deployments are responsible for the creation and scaling of pods. Deployments can be used to update applications using certain deployment strategies supported by Gimlet, too.

### Services

Services enable network communication to the pods.

### Namespaces

Namespaces are used to divide resources between multiple users, teams, architecture, or any entity you can think of. You can assign namespaces to deployments for resource allocation when you use Gimlet.

**Namespace best practices:**
- Use `default` when you use Gimlet,
- Or ask your cluster admin if you already have a namespace, and use it in Gimlet.

### Volumes

Volumes are responsible for storing data. Volumes and persistent volumes are supposed to be treated differently, as volumes store data accessible to pods, and persistent volumes store data independently of pods.

### ConfigMaps

ConfigMaps are used for non-confidential key-value pairs.

### Secrets

Secrets are used to store confidential data, passwords or tokens for example.

### Ingress

Ingress is responsible for routing HTTP and HTTPS traffic within a cluster.

## Kubernetes Components

### Control Plane

Control plane manages the state of the cluster. It includes components, such as the API server, the scheduler, and etcd, which stores cluster data.

### Node

A worker machine, where your application runs.

## Get Familiar Locally with K3d

K3d is a containerized implementation of k3s, a lightweight distribution.

Requirements for k3d in this guide:

- OS: Ubuntu
- Docker v20.10.5 or newer installed
- kubectl to interact with clusters

### Install K3d

If all requirements are fulfilled, run the following script to install k3d.

```
curl -s https://raw.githubusercontent.com/k3d-io/k3d/main/install.sh | bash
```

### Create A Cluster

Run `k3d cluster create my-first-cluster` to create a new cluster.

Check with `kubectl get nodes` to verify everything is functional.

### Deploy To The Cluster

To deploy an app, we're going to need a template, such as a Helm chart. Helm is a package manager for Kubernetes. It's powerful because most deployments follow the same patterns, which users can templatize with Helm charts.

For the purpose of this guide, we're going to deploy OneChart, a generic Helm chart template.

First install Helm on your machine with:

```
curl https://baltocdn.com/helm/signing.asc | gpg --dearmor | sudo tee /usr/share/keyrings/helm.gpg > /dev/null
sudo apt-get install apt-transport-https --yes
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/helm.gpg] https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
sudo apt-get update
sudo apt-get install helm
```

If you use a different OS than Ubuntu, check this setup [guide](https://helm.sh/docs/intro/install/).

#### Deploy An App

When Helm is set up, install OneChart:

```
helm repo add onechart https://chart.onechart.dev
helm template my-first-app onechart/onechart | kubectl apply -f -
```

The `helm template` command generates the Kubernetes manifest files as defined in the Helm chart. These generated files are then applied as you pipe them into `kubectl apply -f -`.

Verify if the deployment was successful by running `kubectl get deployment`.
#### Port-Forwarding

At this stage, OneChart is only accessible within the cluster. To be able to use it, you'll need outside access.

This can be achieved with port-forwarding. Run the command below:

```
kubectl port-forward deploy/my-first-app 9999:80
```

Now you have access to the app - OneChart in this case - in your browser at http://127.0.0.1:9999/.

### Delete Cluster

Remove the cluster by running `k3d cluster delete my-cluster`.

### Common Tasks

#### Ingress

Traefik is the built-in ingress controller of k3d. The purpose of Traefik is to manage and conduct internal traffic between the applications of a cluster.

You can easily access ingress resources by running the command below:

```
kubectl get service -n kube-system
```

#### Access Images Built Locally

If you have images built on your laptop, you can import it to the k3d environment. Assuming that your app's name is `k3d-dummy-app`, and your cluster's name is `my-first-cluster`, you can run the following command to access the image:

```
k3d image import k3d-dummy-app -c my-first-cluster
```
