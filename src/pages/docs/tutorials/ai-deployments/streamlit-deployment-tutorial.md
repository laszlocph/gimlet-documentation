# Streamlit Deployment Tutorial

Quick start tutorial for applications written in Streamlit, a popular Python framework for AI and data projects.

## Step 1: Getting Started with Gimlet

Log in to Gimlet with your GitHub or GitLab account, and select the repository that contains the Streamlit app you'd like to deploy.

## Step 2: Deployment Settings

Select the Web Application deployment template, and then the Using a Dockerfile container image option. If you don't have a dockerfile, you can use the example below.

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

In the platform, enter 8501 for the port value to expose it.
