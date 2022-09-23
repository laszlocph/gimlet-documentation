---
title: Installing Gimlet on any Kubernetes cluster
description: On this page you can learn how to install Gimlet on any Kubernetes cluster.
---

On this page you can learn how to install Gimlet on any Kubernetes cluster.

---

You can install Gimlet with an installer. The installer initiates a gitops environment and puts Gimlet into its gitops repository. This way Gimlet itself is managed by gitops.

You will access the dashboard with a kubectl port-forward command after installation, later you can decide to [move the installation to a real domain and HTTPS](/docs/installation#moving-the-installation-to-a-real-domain-and-https).

## Prerequisites

- A [https://github.com](https://github.com) personal or organization account.
- A Kubernetes cluster 

## Starting the installer

The following oneliner kickstarts the Gimlet installer.

```bash
curl -L -s https://get.gimlet.io | bash -s trial
```

## Creating a Github Application

First, the installer creates a Github Application to manage all Gimlet access with it.

![Creating a Github application](https://images.tango.us/public/screenshot_e090274e-ea94-4621-b6f0-b7a770d6815b.png?crop=focalpoint&fit=crop&fp-x=0.4999&fp-y=0.2487&fp-z=3.1368&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1960)

{% callout title="Installing Gimlet for your company" %}
The application is created under your personal Github account by default. If you install Gimlet for your company, and you are a Github administrator, you can set a second parameter for the installer script. The installer will use this organization name to host the application: `curl -L -s https://get.gimlet.io | bash -s trial myGithubOrg`.
{% /callout %}

Install the newly created Github Application and select what repositories Gimlet should have access to. It is most convenient to allow all repositories. If you prefer a smaller set of repositories, select a few application repositories you want deploy with Gimlet and remember to extend the repository list if you want to roll out Gimlet for new apps.

![Step 3 screenshot](https://images.tango.us/public/edited_image_3c1732d7-a923-47d7-bea8-fc69190d5e57.png?crop=focalpoint&fit=crop&fp-x=0.4969&fp-y=0.5822&fp-z=2.2336&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1960)

As a final step, you also need to authorize the newly created application. Keep in mind that you are granting this access to your own Github Application. You are not granting any access to any third-party nor the Gimlet creators.

![Step 4 screenshot](https://images.tango.us/public/screenshot_395e38bc-d9a5-4ef0-8cd9-7a3aeb23d8aa.png?crop=focalpoint&fit=crop&fp-x=0.4947&fp-y=0.5477&fp-z=2.2108&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1960)

## Bootstrapping the gitops environment

You have to provide information about the environment you are creating in this step.

You need to name the environment and set the approach to structure gitops resources. By default, Gimlet uses two gitops repositories per environment [by convention](/concepts/gitops-conventions), one for infrastructure components, one for application deployments.

![Step 2 screenshot](https://images.tango.us/public/edited_image_374cd8b6-0385-48db-b8d1-e7ac7c4246da.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&fp-z=1.0000&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=2176%3A662)

Then, at the bottom of the screen, you need to select what components to install.

Component settings are prefilled with values, in general you should not change them unless you are instructed otherwise.

#### Using an existing PostgreSQL database

The installer installs a containerized PostgreSQL database for Gimlet to store data in.

If you prefer to use an existing database, set the access parameters under:

- *Gimlet > Gimlet Dashboard > Config > Postgresql settings*
- *Gimlet > Gimletd > Config > Postgresql settings*

#### Using an existing ingress controller

Turn the Nginx component off. You may need to manually edit yaml manifests in the gitops repository for the right ingress class.

## Kickstarting the gitops automation

![Step 2 screenshot](https://images.tango.us/public/screenshot_5bb0d866-ba00-46d7-ba0e-130b3d9693d3.png?crop=focalpoint&fit=crop&fp-x=0.4950&fp-y=0.3286&fp-z=1.8696&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1960)

Once the boorstrapping is done, you have two new git repositories to store manifests in.

Follow the instructions to kickstart the automation: add deploy keys, and run *kubectl* commands.

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

The `/etc/hosts` file entry already exists, you only need to forward the ingress controller to your local port 9000 to make Gimlet accessible on [http://gimlet.trial:9000](http://gimlet.trial:9000).

```
kubectl port-forward -n infrastructure svc/ingress-nginx-controller 9000:80
```

Congratulations, now you have Gimlet running. You can either continue to set up a [real domain name and https](#moving-the-installation-to-a-real-domain-and-https) or you can evaluate Gimlet on the port-forward. If you continue using the port-forward, you should consider allowing [third party services to access Gimlet](#appendix-a-third-party-services-to-access-gimlet)

## Moving the installation to a real domain and HTTPS

So far you accessed Gimlet through a kubectl port-forward. In this section, you can read about how to use a real domain name secured by HTTPS. This step is optional, and can be skipped if you evaulating Gimlet locally.

### Prerequisites

To access Gimlet on a domain name you will need:
- A Kubernetes cluster that is able to provision a `type: LoadBalancer` Kubernetes `Service` resource with a publicly accessible IP address
- A domain name

### Setting a wildcard DNS name

Locate the IP address of the Nginx ingress controller:

```
$ kubectl get svc -n infrastructure

NAME                                 TYPE           EXTERNAL-IP
ingress-nginx-controller             LoadBalancer   74.220.27.134
```

Then set a wildcard domain name pointing to this IP. Point `*. testing.yourcompany.com` to the Nginx public IP address, given that you named your environment *testing* and your preferred domain name is `yourcompany.com`. You can skip the `testing` prefix if this is your production environment.

### Update the domain name to a real one

When you started the installer with the `curl -L -s https://get.gimlet.io | bash -s trial` command, the *trial* parameter was the domain name Gimlet used as a suffix to create the ingresses.

The Gimlet Dashboard is currently reachable on [http://gimlet.trial:9000](http://gimlet.trial:9000), the Gimletd API is accessible on [http://gimletd.trial:9000](http://gimletd.trial:9000) using kubectl port-forward.

```
kubectl get ing -n infrastructure | grep gimlet
gimlet-dashboard   <none>   gimlet.trial    34.11.16.2   80      27m
gimletd            <none>   gimletd.trial   34.11.16.2   80      27m
```

It is time to reconfigure your Gimlet to be hosted on your preferred domain name. To reconfigure your stack, follow one of the methods described in [Managing infrastructure components](/docs/managing-infrastructure-components).

#### Update the ingress controller host name 

Update the ingress controller host name from `trial` to `testing.yourcompany.com` given that you named your environment *testing* and your preferred domain name is `yourcompany.com`. You can skip the `testing` prefix if this is your production environment.

Your ingress controller host name is under *Infrastructure Components > Ingress > Nginx*

#### Update the Gimlet Dashboard host name

Gimlet Dashboard should know about where it is hosted. Update the *Gimlet > Gimlet Dashboard > Config > Host* setting to the real domain name. Use a full domain name with the protocol included eg.: `https://gimlet.testing.yourcompany.com`.

### Install Cert-Manager

Enable the Cert-Manager component under *Infrastructure Components > Ingress > CertManager*.

### Write changes to the gitops repo

Press *Infrastructure Components > Save components* and watch the gitops commit manifest on the cluster.

### Update Github OAuth configuration

For the Github OAuth authentication to work, you also need to update the URLs in your Github application settings on Github.com under *Settings > Developer settings > GitHub Apps > Your Gimlet Application*

- Update *Homepage URL* from `http://gimlet.trial:9000` to `https://gimlet.testing.yourcompany.com`
- Update *Callback URL* from `http://gimlet.trial:9000/auth` to `https://gimlet.testing.yourcompany.com/auth`
- Update *Webhook URL* from `http://gimlet.trial:9000/hook` to `https://gimlet.testing.yourcompany.com/hook`

## Appendix A) Third party services to access Gimlet

Gimlet integrates to many third party tools.

Gimlet to work best, you have to make the Gimlet API available for third party services. You either set up a [real domain name and https](#moving-the-installation-to-a-real-domain-and-https) or you can use *ngrok* over the port-forward to make that happen.

### Exposing the Gimletd API for CI artifact shippers

[CI artifact shippers](/docs/deploy-your-first-app-to-kubernetes#integrate-ci-with-gimlet) take two parameters: Gimletd's API location and an API token. Local installations can be exposed by the following ngrok command, then you can use the ngrok URL in the `GIMLET_SERVER` secret in CI.

```
ngrok http --host-header=gimletd.trial 127.0.0.1:9000
```

### Exposing the Gimlet Dashboard API for Github commit webhooks

The Gimlet Dashboard benefits from Github webhooks. The webhooks make a realtime git commit view possible. Without them, you have to manually refresh the Gimlet Dashboard in the browser for new commits and their statuses to show up.

The following ngrok command expose the Gimlet Dashboard API in ngrok, you can use that URL in the Github webhook configuration.
Please note that with a free ngrok account, you can only run a single ngrok session at a time. It is better to use that session for the CI shipper integration.

```
ngrok http --host-header=gimlet.trial 127.0.0.1:9000
```
