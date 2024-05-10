# Kubernetes Resources

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

### kubelet

Kubelet runs on each node, ensuring that containers are running in a pod.

### kube-proxy

Kube-proxy runs on each node to allow internal and external communication and to maintain network rules on the nodes.
