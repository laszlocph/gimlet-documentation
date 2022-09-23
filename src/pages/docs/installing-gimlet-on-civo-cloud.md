---
title: Installating Gimlet on CIVO Cloud
description: you can learn how to install Gimlet from the CIVO Marketplace, alongside with the built-in Traefik ingress controller from the CIVO Marketplace.
---

On this page you can learn how to install Gimlet from the CIVO Marketplace, alongside with the built-in Traefik ingress controller from the CIVO Marketplace.

---

You can install Gimlet with an installer. The installer initiates a gitops environment and puts Gimlet into its gitops repository. This way Gimlet itself is managed by gitops.

You will access the dashboard through CIVO's built in Traefik ingress controller on your CIVO cluster's default DNS name. Later you can [move to your preferred DNS name and HTTPS](#moving-the-installation-to-your-preferred-domain-and-https).

## Prerequisites

- A [https://github.com](https://github.com) personal or organization account.
- A [https://civo.com](https://civo.com) Kubernetes cluster
- Using the built-in Traefik ingress controller either in NodePort or LoadBalancer configuration.

## Starting the installer from the CIVO marketplace

Install Gimlet from the CIVO Marketplace. You can find it under *civo.com > Kubernetes > your cluster > Marketplace > CI/CD*.

Locate the installed installer and open it in your browser on [http://gimlet.<your-cluster-id>.k8s.civo.com](http://gimlet.<your-cluster-id>.k8s.civo.com)

```
$ kubectl get ing -n gimlet-installer

NAME                  HOSTS
gimlet-installer      gimlet.67885664-c931-48da-ba5d-0c122cb09879.k8s.civo.com
```

Follow the installer steps and follow along in the coming chapters.

## Step 1: Creating a Github Application

First, the installer creates a Github Application to manage all Gimlet access with it.

![Creating a Github application](https://images.tango.us/public/screenshot_e090274e-ea94-4621-b6f0-b7a770d6815b.png?crop=focalpoint&fit=crop&fp-x=0.4999&fp-y=0.2487&fp-z=3.1368&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1960)

Install the newly created Github Application and select what repositories Gimlet should have access to. It is most convenient to allow all repositories. If you prefer a smaller set of repositories, select a few application repositories you want deploy with Gimlet and remember to extend the repository list if you want to roll out Gimlet for new apps.

![Step 3 screenshot](https://images.tango.us/public/edited_image_3c1732d7-a923-47d7-bea8-fc69190d5e57.png?crop=focalpoint&fit=crop&fp-x=0.4969&fp-y=0.5822&fp-z=2.2336&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1960)

As a final step, you also need to authorize the newly created application. Keep in mind that you are granting this access to your own Github Application. You are not granting any access to any third-party nor the Gimlet creators.

![Step 4 screenshot](https://images.tango.us/public/screenshot_395e38bc-d9a5-4ef0-8cd9-7a3aeb23d8aa.png?crop=focalpoint&fit=crop&fp-x=0.4947&fp-y=0.5477&fp-z=2.2108&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1960)

## Step 2: Bootstrapping a gitops environment

You have to provide information about the environment you are creating in this step.

You need to name the environment and set the approach to structure gitops resources. By default, Gimlet uses two gitops repositories per environment [by convention](/concepts/gitops-conventions), one for infrastructure components, one for application deployments.

![Step 2 screenshot](https://images.tango.us/public/edited_image_374cd8b6-0385-48db-b8d1-e7ac7c4246da.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&fp-z=1.0000&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=2176%3A662)

Then, at the bottom of the screen, you need to select what components to install.

Component settings are prefilled with values, in general you should not change them.

For CIVO Cloud
- Enable the *CIVO* component.
- Since you use the built-in Traefik ingress controller, make sure the Nginx component is turned off.

#### Using an existing PostgreSQL database

The installer installs a containerized PostgreSQL database for Gimlet to store data in.

If you prefer to use an existing database, set the access parameters under:

- *Gimlet > Gimlet Dashboard > Config > Postgresql settings*
- *Gimlet > Gimletd > Config > Postgresql settings*

## Step 3: Kickstarting the gitops automation

![Step 2 screenshot](https://images.tango.us/public/screenshot_5bb0d866-ba00-46d7-ba0e-130b3d9693d3.png?crop=focalpoint&fit=crop&fp-x=0.4950&fp-y=0.3286&fp-z=1.8696&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1960)

Once the boorstrapping is done, you have two new git repositories to store manifests in.

Follow the instructions to kickstart the automation: add deploy keys, and run *kubectl* commands.

Once you performed all the instructions, close the browser tab, and return to the terminal to finalize the install.

#### Wait until resources are up
To determine if the gitops automation is healthy, run the following script:

```
until [ $(kubectl get kustomizations.kustomize.toolkit.fluxcd.io -A | grep gitops-repo | grep True | wc -l) -eq 4 ]
do
  echo ""
  echo " 🧐 Waiting for all four gitops kustomizations become ready, ctrl+c to abort"
  echo ""
  echo "$ kubectl get kustomizations.kustomize.toolkit.fluxcd.io -A"
  kubectl get kustomizations.kustomize.toolkit.fluxcd.io -A | grep -w 'gitops-repo\|READY'
  sleep 3
done

echo ""
echo " ✅ Gitops loop is healthy"
echo ""
```

To see if Gimlet has started, run the following script:

```
until [ $(kubectl get pods -n infrastructure | grep gimlet | grep 1/1 | wc -l) -eq 3 ]
do
  echo ""
  echo " 🧐 Waiting for Gimlet to start up in the cluster, ctrl+c to abort"
  echo ""
  echo "$ kubectl get pods -n infrastructure | grep gimlet"
  kubectl get pods -n infrastructure | grep 'gimlet\|READY\|postgres'
  sleep 3
done

echo ""
echo " ✅ Gimlet is up"
echo ""
```

## Accessing Gimlet

First, a bit of cleanup. It is safe to delete the installer now:

```
kubectl delete namespace gimlet-installer
```

Access Gimlet on the default CIVO DNS name: [http://gimlet.<your-cluster-id>.k8s.civo.com](http://gimlet.<your-cluster-id>.k8s.civo.com)

```
$ kubectl get ing -n infrastructure               
NAME               HOSTS
gimlet-dashboard   gimlet.67885664-c931-48da-ba5d-0c122cb09879.k8s.civo.com
gimletd            gimletd.67885664-c931-48da-ba5d-0c122cb09879.k8s.civo.com
```

Congratulations, now you have a fully functioning Gimlet dashboard available on your CIVO cluster.

Try it for size, and if it works for you, you might want to [move the installation to your preferred domain and HTTPS](#moving-the-installation-to-your-preferred-domain-and-https)

## Moving the installation to your preferred domain and HTTPS

So far you accessed Gimlet through a CIVO's default DNS name. In this section, you can read about how to move to your preferred domain name secured by HTTPS. This step is optional, and can be skipped if you are evaulating.

The Gimlet Dashboard is currently reachable on [http://gimlet.<your-cluster-id>.k8s.civo.com](http://gimlet.<your-cluster-id>.k8s.civo.com), the Gimletd API is accessible on [http://gimletd.<your-cluster-id>.k8s.civo.com](http://gimlet.<your-cluster-id>.k8s.civo.com).

```
$ kubectl get ing -n infrastructure               
NAME               HOSTS
gimlet-dashboard   gimlet.67885664-c931-48da-ba5d-0c122cb09879.k8s.civo.com
gimletd            gimletd.67885664-c931-48da-ba5d-0c122cb09879.k8s.civo.com
```

It is time to reconfigure your Gimlet to be hosted on your preferred domain name. To reconfigure your stack, follow one of the methods described in [Managing infrastructure components](/docs/managing-infrastructure-components).

### Update the ingress controller host name 

Update the ingress controller host name from `<your-cluster-id>.k8s.civo.com` to `testing.yourcompany.com` given that you named your environment *testing* and your preferred domain name is `yourcompany.com`. You can skip the `testing` prefix if this is your production environment.

Your ingress controller host name is part of your cloud provider settings *Infrastructure Components > Cloud Provider > CIVO*.

### Update the Gimlet Dashboard host name

Gimlet Dashboard should know about where it is hosted. Update the *Gimlet > Gimlet Dashboard > Config > Host* setting to your preferred domain name. Use a full domain name with the protocol included eg.: `https://gimlet.testing.yourcompany.com`.

### Install Cert-Manager

Enable the Cert-Manager component under *Infrastructure Components > Ingress > CertManager*.

### Write changes to the gitops repo

Press *Infrastructure Components > Save components* and watch the gitops commit manifest on the cluster.

### Update Github OAuth configuration

For the Github OAuth authentication to work, you also need to update the URLs in your Github application settings on Github.com under *Settings > Developer settings > GitHub Apps > Your Gimlet Application*

- Update *Homepage URL* from `http://<your-cluster-id>.k8s.civo.com` to `https://gimlet.testing.yourcompany.com`
- Update *Callback URL* from `http://<your-cluster-id>.k8s.civo.com/auth` to `https://gimlet.testing.yourcompany.com/auth`
- Update *Webhook URL* from `http://<your-cluster-id>.k8s.civo.com/hook` to `https://gimlet.testing.yourcompany.com/hook`
