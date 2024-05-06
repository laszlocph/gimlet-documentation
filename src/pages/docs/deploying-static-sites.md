---
title: Deploying static sites
description: "How to deploy static site on Kubernetes by providing only the build command. No Dockerfile required."
---

In this guide you learn how to deploy static websites to Kubernetes with Gimlet.

The approach does not require conatiner image building, and works generally for React, Next.js, Svelte, Vue, Hugo, Eleventy, Mkdocs, Docusaurus, etc. All the frameworks where the build output is a set of static assets: HTML, JS and CSS files

The approach matches how Netlify deploys static applications: you provide the build command, the rest is taken care of.

## tldr

The following screen shows the requried configuration to deploy a static site:

![Static site deploy configuration](/static-build.png)

And the matching Gimlet manifest file that is created when you hit save on the dashboard:

```yaml
app: reactjs-test-app
env: workable-firefly
namespace: default
chart:
  repository: https://chart.onechart.dev
  name: static-site
  version: 0.57.0
values:
  gitCloneUrl: https://github.com/laszlocph/reactjs-test-app.git
  buildImage: "node:latest"
  buildScript: |-
    # !/usr/bin/env bash
    npm install
    npm run build
  builtAssets: build/ 
```

## Creating a manifest

If you use the [deploy button](/docs/deploy-your-first-app) without creating a deployment configuration first, Gimlet will try to [build a container](/docs/container-image-building) image for you with Buildpacks. This approach has limitations, and container image building takes time.

In this guide we show how you can add a static site deployment configuration, so you can skip image building completelly.

- Navigate to your repository
- Make sure you have at least one connected environment
- Then click "New deployment configuration"
- Pick "static-site" in the "Deployment template" dropdown
- Then fill the build configuration as your application requires it, see a React example in the [tldr](#tldr) section

Save the configuration.

Once you merged the pull request, you can locate the commit on the repository view to deploy it. (Like you did in the [tutorial](http://127.0.0.1:3001/docs/deploy-your-first-app#deploy-the-app). Except the image building of course. That will not happen for static sites)

## More context

You can learn about how the approach work on [our blog](http://127.0.0.1:3001/blog/hosting-static-sites-on-kubernetes#using-the-onechart-static-site-helm-chart-to-deploy-static-sites).
