# Jupyter Notebook Deployment

## Step 1: Getting Started with Gimlet

Log in to Gimlet by connecting your GitHub or GitLab account. If all is well, you should see the repositories you have access to in Gimlet. Select the repository that contains the Jupyter Notebook you'd like to deploy.

## Step 2: Create Deployment Settings

Select Web Application template to be able to pick Dockerfile deployment as a container image option. If you don't have a Dockerfile in your repository, you can use the example below.

```
FROM python:3.11.9-slim

WORKDIR /app

RUN apt-get update && apt-get install -y gcc python3-dev nodejs npm

COPY . /app/

RUN pip install jupyterlab
RUN jupyter lab build --dev-build=True --minimize=True

EXPOSE 8080

CMD ["jupyter", "lab", "--port", "8080", "--allow-root"]
```

After selecting the container image method, select the ghcrRegistry option under Registry settings, and add change the Port to `8080`.

Edit the domain to your liking, but Cloud users should get a domain generated. You can opt to turn on HTTPS for secure connection with the toggle.

## Step 3: Deploy

Once the deployment settings are specified, you can deploy by clicking the `Deploy` button.

The log should show up, and when deployment turns successful, you'll see confetti raining in Gimlet's browser tab, and a link will appear where you'll be able to access the Jupyter Notebook.

## Step 4: Accessing Jupyter Notebook

To log into your Jupyter Notebook, you’ll need a token, which you can obtain by running the command below:

```
k logs deploy/jupiter-lab-sample | grep token
```

The output should be the token. Copy and paste it in the notebook’s login screen.

![](/src/pages/docs/screenshots/jupyter-notebook-documentation/jupyter-notebook-auth-screen.png)

## Use Cases

If you're working with Jupyter Notebooks, Gimlet offers several advantages:

- **Utilizing Remote GPUs:** Access remote Nvidia GPUs from your local environment.
- **Code Syncing:** Ensure code uniformity across your team.
- **Deployment and Previewing:** Deploy and share models with social authentication for testing purposes.

## Try Gimlet Now

> Deploy Jupyter Notebooks with Gimlet now.
