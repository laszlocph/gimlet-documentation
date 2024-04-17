# Jupyter Notebook Deployment

## Step 1: Getting Started with Gimlet

Log in to Gimlet by connecting your GitHub or GitLab account. If all is well, you should see the repositories you have access to in Gimlet.

## Step 2: Create Deployment Settings

There are several methods to deploy. The most straightforward approach involves using a Dockerfile.

For this deployment method, ensure you have a Dockerfile available in your repository.

Choose the repository in Gimlet and opt for the Dockerfile deployment option as shown below:

![screenshot](https://www.phind.com/agent?cache=cluuxl8sy000eii084alq04xz)

Define the Dockerfile's path and the port that is exposed, which should match the port specified in the Dockerfile, as shown below.

Confirm your settings by clicking save.

## Step 3: Deploy

Once the deployment settings are saved, a `Deploy` button will appear on the repository's page in Gimlet.

Proceed with the deployment by clicking the `Deploy` button.

## Step 4: Accessing Jupyter Notebook

After the deployment is completed, your Jupyter Notebook is not yet accessible from the internet. You'll need to use port-forward first.  
  
Generate a port-forward command using the button seen below.  
  
[image]  
  
Copy and paste the command in your terminal. The command should look like this:  
  
```  
port-forward command  
```  
  
Now enter the URL in your browser. To log into your Jupyter Notebook, you’ll need a token, which you can obtain by running the command below:  
  
```  
k logs deploy/jupiter-lab-sample | grep token  
```  
  
The output should be the token. Copy and paste it in the notebook’s login screen.

## Use Cases

If you're working with Jupyter Notebooks, Gimlet offers several advantages:

- **Utilizing Remote GPUs:** Access remote Nvidia GPUs from your local environment.
- **Code Syncing:** Ensure code uniformity across your team.
- **Deployment and Previewing:** Deploy and share models with social authentication for testing purposes.

## Try Gimlet Now

> Deploy Jupyter Notebooks with Gimlet now.
