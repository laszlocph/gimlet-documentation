---
title: 'Deployment Configuration'
description: |
  When you're setting an application up for deployment, you pick a deployment template. Templates in Gimlet are made with Helm charts under the hood and you can also bring your own.
---

## Deployment templates

When you're setting an application up for deployment, you select a deployment template. There are two built-in templates:

- **a generic web application template**
- **and a static website template.**

But you can also refer to [your custom templates](docs/deployment-settings/custom-template).

TODO: screenshot

Templates in Gimlet are made with Helm charts under the hood.

Helm is a Kubernetes package manager that is used to package common deployment options. This package is called a Helm chart. A chart is a set of templates that are rendered using a set of values that are specific to your deployment.

When you are done configuring, you write the configuration to your source code git repository. We call this configuration file the Gimlet manifest.

## The Gimlet manifest

Even if you are configuring your deployment on the dashboard, a configuration file is created which is called the Gimlet manifest.

Gimlet manifest files are stored under the `.gimlet` folder of your application source code repository. One file per environment.

The following example shows two files, one for staging, and one for production. They only differ in the replica count. However, you can have a completely unique set of configs in your envs. The manifest files control it all.

```
# .gimlet/staging.yaml
app: myapp
env: staging
namespace: my-team
chart:
  repository: https://chart.onechart.dev
  name: onechart
  version: 0.32.0
values:
  replicas: 1
  image:
    repository: myapp
    tag: 1.1.0
  ingress:
    host: myapp.staging.mycompany.com
    tlsEnabled: true
```

```
# .gimlet/production.yaml
app: myapp
env: production
namespace: my-team
chart:
  repository: https://chart.onechart.dev
  name: onechart
  version: 0.32.0
values:
  replicas: 2
  image:
    repository: myapp
    tag: 1.1.0
  ingress:
    host: myapp.mycompany.com
    tlsEnabled: true
```

### Structure

The Gimlet manifest pins down the release configuration to a target environment:

- **the Helm chart to use,**
- **its version,**
- **and the configuration variables for a given environment.** These are the values fed into the Helm chart at the time of rendering.

For the full structure:

- See the [full reference](/docs/reference/gimlet-manifest-reference).
- See [manifest examples](https://github.com/gimlet-io/gimlet/tree/main/examples)
- See what to do when [Helm is limiting you](/docs/reference/gimlet-manifest-reference#when-helm-is-limiting)

## Editing deployment configs

You can edit deployment configurations on the dashboard, or edit the Gimlet manifest files directly in source code in the `.gimlet` folder.

The two are interchangable for the most part, but the source code handles more fields. See the [full reference](/docs/reference/gimlet-manifest-reference). The dashboard handles it gracefully if you set a setting that is not known to it.

#### Inspecting the diff

Before you save the configuration on the dashboard, you can inspect the diff that will be saved to your Gimlet manifest.

TODO screenshot
