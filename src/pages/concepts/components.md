---
title: Components
pageTitle: Gimlet - Components
description: "Gimlet brings an opinionated layer on top of 
the Flux and Helm. It eliminates much of the decisions you have to make and gets you a developer platform on top of Kubernetes."
---

Gitops looks straightforward from the outset: developers know git, the daily operations happen through Pull Requests and the git history serves as an audit trail of your changes. But implementations showed that constructing your gitops workflow is far from trivial. It involves many decisions - big and small, that add up to a lot of work as you go.

Gimlet brings an opinionated layer on top of 
the Flux and Helm. It eliminates much of the decisions you have to make and gets you a developer platform on top of Kubernetes.

![Gimlet components](/components.svg)

## Gimlet Dashboard
The Gimlet Dashboard is where you can get a comprehensive overview quickly, manage your gitops environments and deployment configurations. 

- It displays realtime Kubernetes information about your deployments
- It also displays realtime git information about your commits, branches and their build statuses
- You can initiate releases and rollbacks
- Configure your applications for deployment
- Initiate and manage gitops environments

The Gimlet Dashboard follows the [ClickOps](/concepts/clickops) approach. Every action you take on the dashboard is backed by a git commit. The integration is bi-directional, custom git or CLI actions show up in the dashboard too and don't break the UI.

## Gimlet CLI
Gimlet CLI is a command line tool with the same power as the Gimlet Dashboard.

- You can look at the release log
- You can initiate releases and rollbacks
- Configure your applications for deployment
- Initiate and manage gitops environments
- Render manifests locally for debug purposes

## CI
Your CI/CD pipelines implemented with your preferred provider. Gimlet fits into your existing pipelines, replacing your deploy steps. See how [How Gimlet integrates to CI workflows](/concepts/integration-to-ci).

## Gimlet Agent
Gimlet Agent runs in your Kubernetes clusters. It collects realtime information about your deployments, and forwards it to the Gimlet Dashboard.

## Gimletd

Gimletd is the release manager. It has write access to the gitops repositories, and encompasses all logic related to making releases, rollbacks, and gathering audit logs.

## Flux
Flux is the gitops controller. It pulls manifests from the gitops repositories and applies them on the Kubernetes clusters.

## Gitops repositories

A completely normal git repositories with the role to hold all Kubernetes resource definitions of your applications. See Gimlet's [Gitops conventions](/concepts/gitops-conventions) for detailed explanation of their structure.

## Application repositories
Where your application source code lives.

