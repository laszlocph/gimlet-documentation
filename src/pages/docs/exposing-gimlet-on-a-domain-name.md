---
title: Exposing Gimlet on a domain name
description: On this page you can learn how to install Gimlet on any Kubernetes cluster.
---

Now that you finished [installing Gimlet](/docs/installation), you will expose it on a real domain name.

So far, you accessed Gimlet through a kubectl port-forward. In this section, you can read about how to use a real domain name secured by HTTPS.

If you are evaulating Gimlet locally, you can use a service called Ngrok to expose Gimlet to external parties, like CI platforms.

## Exposing a local Gimlet with Ngrok

Gimlet integrates with source code managers and CI servers. These platforms need to access your in-cluster Gimlet installation. To fully experience Gimlet, you have to make the Gimlet API available to them.

On local Kubernetes clusters, you can use [ngrok](https://ngrok.com/docs/getting-started/#step-2-install-the-ngrok-agent) to make this happen.

[Gmilet's CI integration](/docs/deploy-your-first-app-to-kubernetes#integrate-ci-with-gimlet) takes two parameters: Gimlet's API location and an API token. Local installations can be exposed by the following ngrok command, then you can use the ngrok URL in the `GIMLET_SERVER` secret in CI.

```
ngrok http 127.0.0.1:9000
```

For local Kubernetes clusters, this is all that is needed. You can continue to [Deploy your first app to Kubernetes](/docs/deploy-your-first-app-to-kubernetes)

## Exposing Gimlet with an ingress

### Your ingress architecture

Ingress controllers route traffic to your applications on Kubernetes clusters. They are paired with a cloud load balancer on managed Kubernetes platforms.

Depending on your Kubernetes provider, you may already have an ingress controller installed. To gain better control over your ingress, you will install the Nginx ingress controller now with gitops.

### Installing the Ingress Nginx component with gitops

Navigate to _Environments > your-env > Infrastructure components_ and Nginx to edit.

![Step 1 screenshot](https://images.tango.us/public/screenshot_74d34c1d-a951-4114-b984-5d8ed568fc92.png?crop=focalpoint&fit=crop&fp-x=0.3250&fp-y=0.2505&fp-z=2.5296&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1960)

On the _Config_ tab enable Nginx and provide the domain name you dedicate for this Gimlet environment.

Gimlet assumes a wildcard DNS entry to exist,

- so if this is your staging environment, you may set `staging.yourcompany.com` in the host field and later you will create the `*.staging.yourcompany.com` DNS entry.
- For the production environment you may set `yourcompany.com` in the host field and later you will create the `*.yourcompany.com` DNS entry. Your existing subdomains under _yourcompany.com_, like _docs.yourcompany.com_ and _marketing.yourcompany.com_ will continue to work as in DNS, the more specific entries take precedence.

![Step 2 screenshot](https://images.tango.us/public/edited_image_69245999-ad79-4170-bce1-8156ea96d7a2.png?crop=focalpoint&fit=crop&fp-x=0.4107&fp-y=0.4383&fp-z=2.0000&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1960)

Hit _Save components_, inspect and merge the pull request that Gimlet creates in your infrastructure gitops repository.

You can monitor Nginx as it comes alive:

```
$ kubectl get pods -n infrastructure -w
NAME                                             READY   STATUS    RESTARTS      AGE
ingress-nginx-controller-66455d768d-v8pgh        1/1     Running   0             8s
```

or you can [follow more closely the gitops automation](/docs/bootstrap-gitops-automation-with-gimlet-cli#verify-the-gitops-automation).

### Creating a DNS entry

Locate the IP address of the Nginx ingress controller, then set a wildcard domain name pointing to this IP.

```
$ kubectl get svc -n infrastructure

NAME                                 TYPE           EXTERNAL-IP
ingress-nginx-controller             LoadBalancer   74.220.27.134
```

Point `*.testing.yourcompany.com` to the Nginx public IP address, given that you named your environment _testing_ and your preferred domain name is _yourcompany.com_. You can skip the `testing` prefix if this is your production environment.

### Install Cert-Manager

Once you made sure that the DNS entry propagated, enable the Cert-Manager component under _Infrastructure Components > Ingress > CertManager_.

Follow the same process to review and merge the pull request.

### Reconfigure Gimlet to use the domain name

When you started the installer with the `curl -L -s https://get.gimlet.io | bash -s trial` command, the _trial_ parameter was the domain name and thus Gimlet is currently reachable on [http://gimlet.trial:9000](http://gimlet.trial:9000) using kubectl port-forward.

It is time to reconfigure your Gimlet to access it on your preferred domain name. To reconfigure your stack with gitops, you will follow the same process as with the Nginx ingress controller: navigate to _Environments > your-env > Infrastructure components_ and locate Gimlet to edit it.

Gimlet should know about where it is hosted. Update the _Gimlet > Config > Host_ setting to your preferred domain name. Use a full domain name with the protocol included eg.: `https://gimlet.testing.yourcompany.com`.

Press _Infrastructure Components > Save components_, review and merge the PR and watch [how the gitops automation](/docs/bootstrap-gitops-automation-with-gimlet-cli#verify-the-gitops-automation) redeploys Gimlet.

### Update OAuth configuration

For the OAuth authentication to work, you also need to update the URLs in Github or Gitlab.

#### Github

Edit your Github application settings on Github.com under _Settings > Developer settings > GitHub Apps > Your Gimlet Application_

- Update _Homepage URL_ from `http://gimlet.trial:9000` to `https://gimlet.testing.yourcompany.com`
- Update _Callback URL_ from `http://gimlet.trial:9000/auth` to `https://gimlet.testing.yourcompany.com/auth`
- Update _Webhook URL_ from `http://gimlet.trial:9000/hook` to `https://gimlet.testing.yourcompany.com/hook`

#### Gitlab

TODO

## Where to go next

Congratulations, now you can access Gimlet on your preferred domain name, like *https://gimlet.testing.yourcompany.com* and learned in the process how to configure infrastructure with gitops.

You can continue to

- [deploy your first application from the dashboard](/docs/deploy-your-first-app-to-kubernetes), or from [CLI](/docs/deploy-your-first-app-to-kubernetes-with-gimlet-cli)
- or learn how to fully [configure your Kubernetes cluster](/docs/make-kubernetes-an-application-platform), also using only the [CLI](/docs/make-kubernetes-an-application-platform-with-gimlet-cli)

Should you have any trouble installing or have questions [join our community](/docs#getting-help).
