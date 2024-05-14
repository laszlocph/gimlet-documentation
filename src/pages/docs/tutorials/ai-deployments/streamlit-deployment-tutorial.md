# Streamlit Deployment Tutorial

Quick start tutorial for applications written in Streamlit, a popular Python framework for AI and data projects.

## Step 1: Getting Started with Gimlet

Log in to Gimlet with your GitHub or GitLab account, and select the repository that contains the Streamlit app you'd like to deploy.

## Step 2: Deployment Settings

Select the Web Application deployment template, and then the Dockerfile container image option. If you don't have a Dockerfile, you can use the example below. If you don't have a Streamlit repository, you can fork this one [here](https://github.com/gerimate/streamlit-app), which also contains a Dockerfile.

```
# app/Dockerfile
FROM python:3.9-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    software-properties-common \
    git \
    && rm -rf /var/lib/apt/lists/*

COPY . .

RUN pip3 install -r requirements.txt

EXPOSE 8501

HEALTHCHECK CMD curl --fail http://localhost:8501/_stcore/health

ENTRYPOINT ["streamlit", "run", "st.py", "--server.port=8501", "--server.address=0.0.0.0"]
```

In the platform, set ghcrRegistry for the Registry opton, and enter 8501 for the port value to expose it.

![Streamlit repository preview after successful deployment on Gimlet.](/src/pages/docs/screenshots/streamlit-deployment/gimlet-streamlit-configuration.png)

Before deployment, make sure you have the correct domain, but Gimlet generates one for you in case you don't have one set up.

## Step 3: Deploy

When you made all the changes to the settings, you can click the Deploy button. Deployment logs should appear right away, and when the process is done, you should see confetti raining in your browser tab.

In the case of Streamlit, deployment should take a few minutes since it contains a lot of dependencies that are needed to be built.

## Step 4: Check Out Your Streamlit App

You can take a look at the application in your browser. In the menu on top, go back to the repository's view by clicking on its name. You should see a link in the Address section.

![Streamlit repository preview after successful deployment on Gimlet.](/src/pages/docs/screenshots/streamlit-deployment/gimlet-streamlit-url.png)

## Use Cases

When you work with Streamlit, there are multiple advantages of using Gimlet:

- **Remote GPU Access:** Use Nvidia GPUs in the cloud from your local setup.
- **File Syncing:** Keep source code consistent across your team and developer environments.
- **Deployment and Previewing:** Easily share your Streamlit app with your teammates using social login and HTTPS connection.

## Try Gimlet Now

> Deploy Streamlit applications with Gimlet now.
