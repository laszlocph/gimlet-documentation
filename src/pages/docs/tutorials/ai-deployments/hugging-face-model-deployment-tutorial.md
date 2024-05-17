# How to Deploy Hugging Face Models

## Step 1: Getting Started with Gimlet

Log in to Gimlet by connecting your GitHub or GitLab account. After signing in, you should see the repositories you have access to in Gimlet.

## Step 2: Hugging Face Deployment Settings

There are multiple ways you can deploy with Gimlet. The most straightforward way to deploy Hugging Face models is to choose Dockerfile deployments.

In our experience, models available on Hugging Face don't come with Dockerfiles, therefore you or someone on your team will need to create one from scratch, and also you need to migrate the model to GitHub or GitLab.

When you have the Dockerfile ready in the git repository, pick the Web Application template and select Dockerfile container image as seen below:

![screenshot]()

Set up deployment configuration settings according to the Dockerfile's content, especially port if the Dockerfile defines any exposed ports. If you use a custom domain, enter it.

## Step 3: Deploy

When deployment settings are ready you can click the `Deploy` button. Soon as you press the button, the logs should appear.

Depending on your hardware, building the image should take a while, as model images are relativaly large compared to other kinds of projects.

## Step 4: Access Your Hugging Face Model

???

## Use Cases

If you work with Hugging Face models, here's why Gimlet is the best choice for you:

- **Remote GPU Usage:** Utilize remote Nvidia GPUs from your local setup.
- **File syncing:** Keep code consistent across your team.
- **Testing & Previewing:** Deploy and share your project that uses Hugging Face models with social authentication for testing purposes.

## Try Gimlet Now

> Deploy Hugging Face models with Gimlet now.
