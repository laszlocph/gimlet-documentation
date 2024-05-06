---
title: Deploy your second app
description: 'In this tutorial, you will deploy your second application to Kubernetes. This time you will use Gimlet to build a container image to deploy.'
---

In this tutorial, you will deploy your second application to Kubernetes. This time you will use Gimlet to build a container image and deploy it. Then you will access the application on a port-forward.

## Prerequisites

- You have finished the [installation](/docs/installation) tutorial, thus you see your git repositories in Gimlet and you have connected a cluster.

## Step 1 - Fork an example repository

Fork [this NodeJS/ExpressJS](https://github.com/gimlet-io/expressjs-test-app) example application.
You may have this repository already from other tutorials.

Once you forked the repository, you need to refresh the repository list on the "Repositories" view.

Click "Refresh repositories".

## Step 2 - Create the application configuration

Click "Add deployment configuration" if this is your first deployment, otherwise click the plus icon under your existing configurations.

On the deployment configuration screen:
- Change the application name to `second-app`
- Modify the container image configuration under "Basics > Image".
  - You are going to use Gimlet to build a container image, so select "Automatic image building".
  - Leave the "Repository" and "Tag" settings as they are.
- Set the "Port" to `3000`

![](/image-build-config.png)

Click `Save` at the bottom of the screen.

## Step 3 - Deploy the application

Once you reviewed and merged the application configuration pull request, you will see that a "Deploy" button appears next to the latest commit. Since you are testing on localhost where there are no webhooks from Github, you may need to push the refresh button above the commits.

Push the "Deploy" button now and select the application configuration to deploy.

![](/deploy-button2.png)

This will open the deploy panel where you can follow the deploy process:
- A container image is built.
- Kubernetes manifests are generated and written
- then syncronized to the cluster.
- A deployment shows up on Gimlet's screen.

![](/deployed2.png)

## Step 5 - Access with port-forward

Applications running on Kubernetes are only accessible on the internal container network by default.

To bridge this gap and to quickly validate your running application, you can forward your application's port to your laptop:

```
$ kubectl port-forward deploy/second-app 3000:3000

Forwarding from 127.0.0.1:3000 -> 3000
Forwarding from [::1]:3000 -> 3000
```

Where `second-app` is your application name, and `3000` is the port your application is listening on.

Once forwarded, visit your application on [http://127.0.0.1:3000](http://127.0.0.1:3000) 🎉

