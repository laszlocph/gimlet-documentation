---
layout: post
title: "Running Kubernetes on your laptop with K3d"
date: "2023-07-12"
image: rocket.png
description: "Setting up a cluster on a laptop feels like a complex task for many developers. For this reason, we put together this blog post to show that with only a handful of commands you can go very far.
"
author: Youcef Guichi
authorAvatar: /youcef.jpg
coAuthor: Laszlo Fogas
coAuthorAvatar: /laszlo.jpg
---

Kubernetes has emerged as the go-to platform. But setting up a cluster on a laptop feels like a complex task for many developers.

For this reason, we put together this blog post to show that with only a handful of commands you can go very far.

With k3d, our tool of choice for example, setting up a cluster takes only one command.

## Not Minikube, K3d

You probably had experience with tools like Minikube before. It used to be a heavy virtual machine based approach. Although it is now container based, at Gimlet we use k3d solely and we recommend you do the same.

K3d is a containerized distribution of k3s. K3s removed all the heavy bits from Kubernetes, hence the name k3s which is five less than k8s. It uses SQLite instead of the distributed etcd database as an example.

## Your first cluster

Ready? Let's spin up your first cluster!

```
$ k3d cluster create my-first-cluster

INFO[0000] Prep: Network
INFO[0000] Created network 'k3d-my-first-cluster'
INFO[0000] Created image volume k3d-my-first-cluster-images
INFO[0000] Starting new tools node...
INFO[0000] Starting Node 'k3d-my-first-cluster-tools'
INFO[0001] Creating node 'k3d-my-first-cluster-server-0'
INFO[0001] Creating LoadBalancer 'k3d-my-first-cluster-serverlb'
INFO[0001] Using the k3d-tools node to gather environment information
INFO[0001] Starting new tools node...
INFO[0001] Starting Node 'k3d-my-first-cluster-tools'
INFO[0002] Starting cluster 'my-first-cluster'
INFO[0002] Starting servers...
INFO[0003] Starting Node 'k3d-my-first-cluster-server-0'
INFO[0009] All agents already running.
INFO[0009] Starting helpers...
INFO[0009] Starting Node 'k3d-my-first-cluster-serverlb'
INFO[0016] Injecting records for hostAliases (incl. host.k3d.internal) and for 3 network members into CoreDNS configmap...
INFO[0018] Cluster 'my-first-cluster' created successfully!
INFO[0018] You can now use it like this:
kubectl cluster-info
```

Once ready, get the nodes with kubectl to verify everything is functioning:

```
$ kubectl get nodes

NAME                            STATUS  AGE     VERSION
k3d-my-first-cluster-server-0   Ready   2m15s   v1.25.6+k3s1
```

You can install k3d with `curl -s https://raw.githubusercontent.com/k3d-io/k3d/main/install.sh | bash` as described on [their homepage](https://k3d.io/v5.5.1/#installation).

## Deploy an app

Congratulations! You now have a fully operational cluster running on your laptop.

Let's put it to the test by deploying a sample application.

We are going to use a Helm chart `onechart/onechart` to render an application manifest and then deploy the app.

Little detour on Helm:

- [Install instructions](https://helm.sh/docs/intro/install/)
- Helm serves as a package manager. With a Helm chart being the equivalent of a packaged application configuration.
- `onechart/onechart` is a Helm chart that we made at Gimlet. It is a generic Helm chart for web application deployments. It has sensible defaults, so you can use it with the least amount of configuration. As an example, without any parameter it will deploy an nginx image.

Use the following command to deploy the app.

```
helm repo add onechart https://chart.onechart.dev
helm template my-first-app onechart/onechart | kubectl apply -f -
```

The `helm template` command generates the Kubernetes manifest files as defined in the Helm chart. These generated files are then applied as you pipe them into `kubectl apply -f -`.

Let's check now if the application has been successfully deployed:

```
➜  $ kubectl get deployment
NAME                 READY   UP-TO-DATE   AVAILABLE   AGE
my-first-app         1/1     1            1           5s

```

With a port-forward you can access the app in your browser on [http://127.0.0.1:9999](http://127.0.0.1:9999):

```
$ kubectl port-forward deploy/my-first-app 9999:80
Forwarding from 127.0.0.1:9999 -> 80
Forwarding from [::1]:9999 -> 80
```

🍍

## Delete the cluster

Once you have finished working with the cluster, you can delete it by running `k3d cluster delete my-cluster`.

This will remove the cluster and all associated resources.

## Common tasks with k3d

### Accessing services

#### Port forward

This is what you have seen already. You can port forward the deployments or services to a local port on your laptop.

This is the simplest solution as it doesn't require complex networking knowledge.

```
$ kubectl port-forward deploy/my-first-app 9999:80
Forwarding from 127.0.0.1:9999 -> 80
Forwarding from [::1]:9999 -> 80
```

#### Using ingresses

K3d has a built-in Traefik ingress controller and the makers of k3d made it so that a single `LoadBalancer` service is accessible on your laptop's network. So `Ingress` resources can be accessed on your laptop on this `EXTERNAL-IP`

```
$ kubectl get service -n kube-system
NAME             TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)                      AGE
traefik          LoadBalancer   10.43.183.230   172.24.0.2    80:30767/TCP,443:30356/TCP   21h
```

If you are not using a Mac, that is. Since Docker Desktop on Mac uses a virtual machine, this service is exposed on the virtual machine's network - not very useful.

The following example shows a deployed ingress resource called `dummy-app` that maps the application to `dummy-app.mylaptop.dev` on port 80.

```
$ kubectl get ingress
NAME        CLASS     HOSTS                    ADDRESS      PORTS   AGE
dummy-app   traefik   dummy-app.mylaptop.dev   172.24.0.2   80      6m45s
```

If you create a host file entry mapping `dummy-app.mylaptop.dev` to `172.24.0.2` you will be able to access the application in your browser on the http://dummy-app.mylaptop.dev url.

### Accessing images built on your laptop

Assuming that you have an image called `k3d-dummy-app` and a cluster called `my-first-cluster`, you can import the image to your k3d environment by running the following command:

```
k3d image import k3d-dummy-app -c my-first-cluster
```

## Something to take away

With the approach that we followed in this article, you can swiftly create Kubernetes clusters on your laptop.

Here is a summary of the key commands discussed in this article:

| Command                                       | Usage                  |
| --------------------------------------------- | ---------------------- |
| `k3d cluster list`                            | List existing clusters |
| `k3d cluster create cluster-name`             | Create a cluster       |
| `k3d cluster delete cluster-name`             | Delete a cluster       |
| `k3d image import image-name -c cluster-name` | Import image to k3d    |
