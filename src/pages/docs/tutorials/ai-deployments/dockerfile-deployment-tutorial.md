# Dockerfile Deployment with Gimlet

Dockerfile deployment is the most common use case for deploying AI projects with Gimlet. As long as there's a functioning Dockerfile in the git repository you'd like to deploy, Gimlet can build and launch it in your cluster.

## Step 1: Get Started with Gimlet

Connect your GitHub or GitLab account with Gimlet. The repositories you have access to will be listed. In case you don't see the repo you'd like to deploy, use the search bar.

## Step 2: Deployment Settings

In order to be able to deploy Dockerfiles, you'll need to select the Web Application template, and then the Dockerfile container image setting.

Then select Gimlet Registry option under Registry settings if you use GitHub. This way Gimlet will be able to use the Dockerfile to build the deployable application.

You can configure several settings, but one thing you need to check in the Dockerfile if a port is defined to be exposed. If there's such value, make sure it's also specified in Gimlet.

## Step 3: Deploy With the Dockerfile

When deployment configuration is set, you can click the Deploy button. When you do that, logs should appear and build will start right away. Depending on the size of your image and the hardware you use, the container should start in a few moments.

## Step 4: Try the Application

After successful deployment, you can check out the app in your browser. To be able to do that, navigate to the repository view by clicking the repo's name in the menu on top.

The repository's preview card should have a clickable URL, that you can also share with your teammates.

## Use Cases

Besides easy Dockerfile deployment, there are several use cases of using Gimlet to set up your AI project.

- **Remote GPUs:** Set up your project using CUDA-capable Nvidia GPUs.
- **File Syncing:** Sync code across the machines used by your team.
- **Share with Social Auth**: Set up social login and HTTPS certification easily for secure sharing with your teammates.
