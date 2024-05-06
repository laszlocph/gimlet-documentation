---
title: Concepts
pageTitle: Gimlet - Concepts
description: "Gimlet brings an opinionated layer on top of 
the Flux and Helm. It eliminates much of the decisions you have to make and gets you a developer platform on top of Kubernetes."
---

## Workflow

![Gimlet workflow](/flow.svg)

CI pipelines lint, test, build and then deploy applications.

Gimlet assumes the gitops deployment tasks from your CI pipeline and runs them centralized. CI pipelines can call the Gimlet API to deploy, no need to script the deploy in CI. We have CI plugins (actions, orbs) for most CI platforms.

Once Gimlet writes the deployment manifest to git, Flux synchronizes the desired state from git to the cluster.

## Components

![Gimlet components](/components.svg)

### Dashboard

The Gimlet dashboard is where you get a comprehensive overview quickly, manage your gitops environments and deployment configurations.

- It displays real-time Kubernetes information about your deployments.
- It also displays real-time git information about your branches, commits and their build statuses.
- You can initiate releases and rollbacks.
- Configure your applications for deployment.
- Create and manage gitops environments.

Gimlet is the release manager. It has write access to the gitops repositories, and encompasses all logic related to making releases, rollbacks, and gathering audit logs.

Working on the dashboard is gitops: every action you take on the dashboard is backed by a git commit. The integration is bi-directional, custom git or CLI actions also show up in the dashboard and don't break the UI.

### CLI

Gimlet CLI is a command line tool with the same power as the Gimlet dashboard.

- You can look at the release log.
- You can initiate releases and rollbacks.
- Configure your applications for deployment.
- Create and manage gitops environments.
- Render manifests locally for debug purposes.

### Agent

Gimlet Agent runs in your Kubernetes clusters. It collects realtime information about your deployments, and forwards it to the Gimlet dashboard.

### CI

Your CI/CD pipelines are implemented with your preferred provider. Gimlet fits into your existing pipelines, replacing your deploy steps. See how [How Gimlet integrates to CI workflows](/docs/integrate-with-ci).

### Flux

Flux is the gitops controller. It pulls manifests from gitops repositories and applies them on Kubernetes clusters.

### Gitops repositories

Regular git repositories with the role to hold all Kubernetes resource definitions of your applications and infrastructure components.

### Application repositories

Where your application source code lives.
