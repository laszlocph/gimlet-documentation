# Kubernetes Essentials

This is a brief guide for essential things about Kubernetes for sufficient introduction to the orchestrator.

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
