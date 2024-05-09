# How to Deploy Hugging Face Models

**Note: This tutorial is applicable for SaaS Gimlet users. Self-hosters should complete the installation guide before following the instructions detailed in this tutorial.**
## Step 1: Getting Started with Gimlet
Sign in to Gimlet by connecting your GitHub or GitLab account. After signing in, you should see the repositories you have access to in Gimlet.
## Step 2: Create Deployment Settings
There are multiple ways you can deploy with Gimlet. The most straightforward way to deploy Hugging Face models is to choose dockerfile deployments.

It's required to have a dockerfile ready in the model's repository in this scenario.

Select the repository in Gimlet, and pick the Dockerfile deployment out of the options as seen below:

![screenshot]()

After choosing deployment method, specify the path to the dockerfile, and the exposed port as seen below. The exposed port should be specified in the dockerfile, too.

Click save.
## Step 3: Deploy
After saving the deployment settings, a `Deploy` button should appear.

Click deploy.
## Step 4: Port-Forward
When the deployment is done, your Hugging Face model is still not accessible from the internet. You'll need to port-forward.

You can do so by generating a port-forward command using Gimlet. Click the Port-forward command button.

Copy and paste the command to the terminal and run it. After the command is complete, you should be able to access the Hugging Face model in your browser at the address available in deployment details and the port the port-forward command includes, like in this example.

**address:port**
## Use Cases

If you work with Hugging Face models, here's why Gimlet is the best choice for you:

- **Remote GPU Usage:** Utilize remote Nvidia GPUs from your local setup.
- **File syncing:** Keep code consistent across your team.
- **Testing & Previewing:** Deploy and share models with social authentication for testing purposes.

## Try Gimlet Now

> Deploy Hugging Face models with Gimlet now.
