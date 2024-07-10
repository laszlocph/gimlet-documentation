---
title: 'Deployments of Models Available on Hugging Face'
description: |
  Models available on Hugging Face can be deployed with Gimlet if you have a Dockerfile for them.
---

**Hugging Face is GitHub for large language models. You can treat the models available there like git repositories.**

## Step 1: Getting Started With Gimlet

Log in to Gimlet by connecting your GitHub or GitLab account. After signing in, you should see the repositories you have access to in Gimlet.

Upon successful connection, you should see your repositories listed. If you can't find the one with the model in it, use the search bar to find it.

Click the **Import** button next to the repo to add it to Gimlet. When you selected all the repositories you'd like to use with Gimlet, click the **I am done importing** button to save all the added repos.

## Step 2: Model Deployment Settings

Navigate to deployment settings by clicking the card of the repository. Click **New deployment**.

There are multiple ways you can deploy with Gimlet. The most straightforward way to deploy Hugging Face models is to choose Dockerfile deployments, however, the models usually don't come with Dockerfiles. Therefore you or someone on your team will need to create one from scratch, and also you need to migrate the model to GitHub or GitLab.

When you have the Dockerfile ready in the git repository, pick the Web Application template and select Dockerfile container image as seen below:

![Dockerfile configuration settings in Gimlet](/docs/screenshots/gimlet-io-dockerfile-configuration-settings.png)

Under **Registry** settings, select the **Gimlet Registry** option.

Set up deployment configuration settings according to the Dockerfile's content, especially port value if the Dockerfile defines any exposed ports. If you use a custom domain, enter it.

## Step 3: Deploy

When deployment settings are ready you can click the `Deploy` button. Soon as you press the button, the logs should appear.

Depending on your hardware, building the image should take a while, as model images are relativaly large compared to other kinds of projects.

## Use Cases

If you work with Hugging Face models, here's why Gimlet is the best choice for you:

- **Remote GPU Usage:** Utilize remote Nvidia GPUs from your local setup.
- **File syncing:** Keep code consistent across your team.
- **Testing & Previewing:** Deploy and share your project that uses Hugging Face models with social authentication for testing purposes.
