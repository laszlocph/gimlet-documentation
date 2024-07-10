---
title: 'Creating a custom deployment template'
description: |
  See how you can create a deployment template that matches your company needs.
---

When you're setting an application up for deployment, you select a deployment template. There are built-in templates, and you can also use your own deployment template. This page tells you how. For a recap check [this introduction on deployment configuration](/docs/deployment-settings/deployment-configuration).

## 



Templates in Gimlet are made with Helm charts under the hood.

Helm is a Kubernetes package manager that is used to package common deployment options. This package is called a Helm chart. A chart is a set of templates that are rendered using a set of values that are specific to your deployment.

When you are done configuring, you write the configuration to your source code git repository. We call this configuration file the Gimlet manifest.

