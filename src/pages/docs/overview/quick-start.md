---
title: 'Quick Start'
description: |
  Get started with Gimlet. Here's how you can create a new account and deploy an application.
---

# Quick Start
This is a very quick, step-by-step tutorial of deployments with Gimlet. Part of the reason why is to demonstrate how easy it is to deploy with this tool.

## Step 1: Sign In
Sign in using your GitHub or GitLab account.

Gimlet will ask for permission to certain privileges in your repositories. This is necessary to conduct the deployments with pull requests made by Gimlet.

## Step 2: Select The Repo
Pick the repository you’d like to deploy.

## Step 3: Choose Deployment Method
There are 4 ways to build images.

- **Static image tag:** Select this if you have a specific version of your image you want to deploy.
- **Dynamic image tag:** Choose this option if you have a Continuous Integration pipeline that builds an image and tags it with the git hash, tag, or other dynamic identifier.
- **Automatic image building:** Pick automatic image building if you’d like to use Gimlet to build. We only recommend it to advanced users.
- **Using a Dockerfile:** In case you have a Dockerfile in the repository you selected, this might be the ideal option.

For this tutorial, we chose Dockerfile deployment.

Make sure that the image settings look like the ones below.

![](screenshot of dockerfile image settings)

Add a deployment configuration and save it.
## Optionable Step: Merge Gimlet’s Pull Request
An alternative way to incorporate deployments with Gimlet is to make the tool open a pull request in the application's repository. By default, this way is turned off, but you can turn it on if it's suitable to you. Here's how.

Navigate to the repository and merge the pull request.

## Step 4: Deploy The Image
A `Deploy` button will appear. Click and wait for deployment status to become `Running`.

## Step 5: Check Your App in Browser
After successful deployment, you should be able to check out the deployed application in your browser.
