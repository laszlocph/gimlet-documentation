---
title: 'Container Image Settings'
description: |
  Gimlet deploys applications from registries and it can also build them for deployments. Find out how.
---

When you're setting an application up for deployment, you can select two types of templates:

- **Web Application Template**
- **Static Website Template**

Templates in Gimlet are made with Helm charts under the hood.

Helm is a Kubernetes package manager that are used to simplify deployments. Helm charts consist of manifests and templates. Manifests define resources and the values that are applied in the templates of the Helm chart.

When you deploy your application with Gimlet, it generates a Helm chart using OneChart, an open-source generic use chart made by us. You can find out more about OneChart in the [reference]() or its [GitHub page](https://github.com/gimlet-io/onechart).

## Web Application Template

The web application template has 4 container image options.

- **Static tag images**
- **Dynamic tag images**
- **Automatic image building**
- **Build from Dockerfile**

All four of these methods require you to give access to your GitHub using a personal access token.

### Static Tag Images

The static tag image option is ideal when you have a Docker Hub, or any other kind of registry where the image you'd like to deploy is already available. Here's how you can set up a static tag image for deployment:

**Step 1:** After selecting this option, choose the registry where the image is available. You can learn how to add registries to Gimlet in the Registry documentation.

If the image is a publicly available image in Docker Hub, select the Public registry option.

**Step 2:** Specify the repository where the image is located within the registry.

**Step 3:** Enter the tag of the image that you'd like to deploy.

### Dynamic Tag Images

Dynamic image tag option is useful when you're using some type of Continuous Integration (CI) pipeline. This way when CI builds an image with a git hash, tag or other dynamic identifier. You can configure the dynamic tag image option for deployment by selecting the Gimlet Registry option.

### Build From Source

Building an image from source is the right choice when you don't have a registry or a CI pipeline set up. Gimlet will use Kaniko to build your application if you select this option. Here's how to configure this:

**Step 1:** Select Public registry option.

**Step 2:** Enter your repository's URL.

### Using a Dockerfile

Deployments with Dockerfiles are the the right choice when you have a Dockerfile available in your repository. Here's how you can configure a deployment using a Dockerfile.

**Step 1:** Select Gimlet Registry.

**Step 2:** Make sure the Dockerfile's name matches the actual Dockerfile located in the root folder of your repository in a case sensitive way.

## Static Website Template

Static websites are deployed inside an Nginx container. No other container image options are available for these templates. There are many ways to customize static website templates, however.

**Namespace:** You can assign your application to a namespace. This is useful when you'd like to separate resources for this specific application.

**Build image:** You can specify a base image Gimlet will use to build your application with. For Javascript frontends node:latest is usually the best option, which is specified by default.

**Build script:** You can enter a custom build script, but Gimlet uses the script you can see below.

```
# !/usr/bin/env bash

npm install
npm run build
```

**Build assets:** The location of the generated build assets. It's usually the `build/` folder in your repository's root.

## Replicas

After a successful deployment, you can configure replicas of your application.

Go to the deployment's settings by clicking the (...) or meatballs menu's button, and click **Edit**. In the settings on the left side, choose the **Container Image** option, and scroll to the bottom of the settings.

There should be a slider named **Replicas**, which you can use to set up the number of replicas you'd like to have for this application.

You can if the replica changes are set if you click the **Review changes** button on top. If the changes are made in the yaml, click Save to apply the changes.
