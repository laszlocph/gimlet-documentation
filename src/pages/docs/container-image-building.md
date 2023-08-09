---
title: Container image building
description: ''
---

## Automatic image building

Gimlet builds a container image for you when you click deploy. This approach is demonstrated in the [Deploying your first app](/docs/deploy-your-first-app) tutorial.

Gimlet uses [https://buildpacks.io/](https://buildpacks.io/) to build the image then stores it in a built-in container registry component.

This approach has known limitations:

- It only work for the NodeJS ecosystem on Apple Silicon today.
- Automatic image building can anticipate only so much. Projects differ in structure and dependencies in ways an automatic image builder perhaps never be able to handle.

### Aiding the automatic image builder

Sometimes the automatic image builder does large part of the work, and all that is missing is knowing the entrypoint of your application. You can define the start command in a file called `Procfile`.

It may fix the image builder if you add `Procfile` to the root of your application source code.

A Django Procfile example:

```
web: python3 manage.py runserver
```

An ExpressJS Procfile example:

```
web: node node.js
```

## Deploying static sites

Coming soon.

## Dockerfiles

If none of the above approaches help you, writing a `Dockerfile` is inevitable.

Follow the [Using Dockerfile and CI](docs/integrate-with-ci) tutorial to see how Gimlet works with Dockerfiles.
