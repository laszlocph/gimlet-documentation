---
title: Deploy your first app
description: 'In this tutorial, you will deploy your first application to Kubernetes and access it on a port-forward.'
---

In this tutorial, you will deploy your first application to Kubernetes and access it on a port-forward.

You will use an existing container image for this task - in later tutorials you can explore the various container image building options.

## Prerequisites

- You have finished the [installation](/docs/installation) tutorial, thus you see your git repositories in Gimlet and you have connected a cluster.

## Step 1 - Fork an example repository

Fork [this NodeJS/ExpressJS](https://github.com/gimlet-io/expressjs-test-app) example application.

## Step 2 - Locate and open the example repository

Once you forked the repository, you need to refresh the repository list on the "Repositories" view.

Click "Refresh repositories".

## Step 3 - Create the application configuration

Click "Add deployment configuration".

On the deployment configuration screen:
- Change the application name to `first-app`
- Inspect the container image configuration under "Basics > Image". But leave it unchanged.
  - You are going to deploy an existing image, thus use a static image tag strategy
  - Make sure that the "Repository says" `nginx` and "Tag" `1.19.3`
- Validate the "Port" is set to `80`
- You can change the replicas to two.

![](/static-image-tag.png)

Click `Save` at the bottom of the screen.

## Step 4 - Deploy the application

Once you reviewed and merged the application configuration pull request, you will see that a "Deploy" button appears next to the latest commit. Since you are testing on localhost where there are no webhooks from Github, you may need to push the refresh button above the commits.

Push the "Deploy" button now and select the application configuration to deploy.

![](/deploy-button.png)

This will open the deploy panel where you can follow the deploy process:
- Kubernetes manifests are generated and written
- then syncronized to the cluster.
- A deployment shows up on Gimlet's screen.

![](/deployed.png)

## Step 5 - Access with port-forward

Applications running on Kubernetes are only accessible on the internal container network by default.

To bridge this gap and to quickly validate your running application, you can forward your application's port to your laptop:

```
$ kubectl port-forward deploy/first-app 10081:80

Forwarding from 127.0.0.1:10081 -> 80
Forwarding from [::1]:10081 -> 80
```

Where `first-app` is your application name, and `80` is the port your application is listening on.

Once forwarded, visit your application on [http://127.0.0.1:10081](http://127.0.0.1:10081) 🎉
