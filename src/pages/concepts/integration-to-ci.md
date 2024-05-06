---
title: Integration to CI
pageTitle: Gimlet - Integration to CI
description: 'Gimlet fits well into your existing CI pipelines. Learn how Gimlet integrates with CI'
---

CI pipelines today lint, test, build and then deploy applications.

Let's explore the deploy step so we know what it takes to deploy to a gitops environment.

## Steps to deploy in a gitops environment

- CI takes the application manifest templates (Helm, Kustomize)
- Sets the release specific values, like the tag of the docker image to be deployed
- Sets the environment values, like the urls, environment variables and alike
- Optionally, it renders the application manifest templates
- CI clones the gitops repository
- CI commits the updated (rendered) deployment manifests to a local working copy of the gitops repository
- CI pushes the gitops commits

Besides the happy path, CI pipelines take care of

- concurrent write issues when multiple applications are being deployed at the same time
- special workflow steps like rollbacks
- gitops repo clone/write speed optimizations

in every application repository you have.

Gimlet assumes those tasks and you can use Gimlet as a deploy API.

## Using Gimlet as a deploy API

Gimlet assumes the gitops deployment tasks from your CI pipeline and runs them in a centralized service. CI pipelines can call the Gimlet API to deploy.

Practically they look like this Github Action:

```
- name: 🚀 Deploy / Staging
  uses: gimlet-io/gimlet-artifact-shipper-action@v0.8.0
  with:
    DEPLOY: "true"
    ENV: "staging"
    APP: "gais"
  env:
    GIMLET_SERVER: ${{ secrets.GIMLET_SERVER }}
    GIMLET_TOKEN: ${{ secrets.GIMLET_TOKEN }}
```

You can keep organizing your CI workflows as you desire, and call Gimlet's API whenever you need to perform a gitops operation.

With Gimlet's centralized approach you gain

- standardization by design
- better control on gitops write operations (halt them, or update them at once)
- a [better gitops deploy history](http://localhost:3001/blog/three-problems-with-gitops-as-deployment-history-and-how-we-overcome-them)
- ready-made common gitops workflows, like rollbacks
- optimizations on gitops read/write speed and failure scenarios
