---
layout: post
title: The ultimate GitOps repository structuring guide
date: '2023-05-02'
image: gitops-repo-structure.png
description: "The way you structure your repository can greatly impact the efficiency and reliability of your gitops workflow. In this article, we'll explore different approaches to structuring your gitops repository so you gain a better understanding of how to structure your gitops repository to optimize your deployment process."
author: Youcef Guichi
authorAvatar: /youcef.jpg
coAuthor: Laszlo Fogas
coAuthorAvatar: /laszlo.jpg
---

Welcome to this article about gitops repository structuring! If you're new to gitops, it's a modern approach to continuous delivery that uses git as the source of truth for application deployments. Gitops is becoming the de-facto deployment approach as more teams adopt cloud-native architectures and embrace devops practices.

One important aspect of gitops is the structure of the git repository used to manage your application configurations and deployment manifests. The way you structure your repository can greatly impact the efficiency and reliability of your gitops workflow.

In this article, we'll explore different approaches to structuring your gitops repository so you gain a better understanding of how to structure your gitops repository to optimize your deployment process.

Ok. On to the good stuff!

## Approaches to structure gitops repositories

Since we use git to store deployment manifests, there are only limited options available to structure things:

- utilizing folders,
- branches
- or repositories.

Moreover, based on experience, long-running branches for each environment (such as QA, staging, and production) with pull requests to promote changes through them are not a real option. Although it may seem like a good idea initially, in practice, promoting changes is seldom a simple git merge but a manual process of selecting good changes and rejecting bad changes to reach production.

Allow me to provide you with some examples:

- Environment variables are frequently included in the configuration verbatim.
- Infrastructure configuration is distinct from code changes due to the existence of environment-specific strings such as host names.
- Certain long-running tasks may exclusively target a specific environment, such as load tests or penetration tests that necessitate temporary yet prolonged settings.

Additionally, popular tools in the ecosystem such as Kustomize utilize environment overlays represented as files or Helm, which advocates for having a values file for each environment. These approaches differ from utilizing branches.

Now that we know we can only use folders and repositories to structure the gitops repository, let's continue with what we should model.

## What to model in the gitops repository

The gitops repository should model the following:

- Applications: These are the primary focus of deployment and should be modeled.
- Infrastructure components: This includes logs shippers, metric agents, ingress controllers and other auxiliary components that facilitate application operations.
- Environments: The gitops repository should also model environments to enable deploying distinct application configurations to each environment.

As a best practice, the gitops repository should avoid modeling real-world topologies such as cluster, namespace, or team membership, wherever possible. This approach allows for reshaping clusters or namespaces without having to handle gitops changes.

In advanced cases, it may be necessary to model real-world topologies, such as when certain tenant instances must be deployed in a Europe-based cluster and others in the US. Both deployments are part of the production environment, but cluster membership must be modeled. In simpler situations, this may fit into the concept of an environment, such as `production-eu` and `production-us`. However, with multiple clusters, cluster modeling may warrant a top-level model category.

## Common approaches

What all approaches share is the separation of deployment manifests from the application source code. This separation allows for greater flexibility in workflows and structure, such as:

- Developers who are developing the application may not be the same individuals who push to production environments.
- A cleaner audit log with only configuration changes in the Git history.
- The common repository structures that we discuss in this chapter are also enabled by the separation.

### Monorepo - Folder per environment

A monorepo is a single git repository that contains all the deployment manifests for both applications and infrastructure components for all environments.

In a monorepo, folders are used to separate apps, infrastructure components and environments.

#### Kustomize

If you use Kustomize, you can use the following structure:

```
├── apps
│   ├── base
│   ├── production
│   └── staging
├── infrastructure
│   ├── base
│   ├── production
│   └── staging
└── environments
    ├── production
    └── staging
```

To define each environment state, a dedicated folder like `environments/production` is used to reference the specific apps and infrastructure overlays.

The separation of apps and infrastructure makes it possible to define the order in which an environment is reconciled. For instance, the cluster addons and other Kubernetes controllers can be reconciled first, followed by the applications.

#### Helm

If you use Helm or raw manifests, you can use the following structure:

```
├── staging
|   ├── apps
|   │   ├── app1
|   │   ├── app2
|   │   └── app..n
|   └── infrastructure
|       ├── component1
|       ├── component2
|       └── component..n
└── production
    ├── apps
    │   ├── app1
    │   ├── app2
    │   └── app..n
    └── infrastructure
        ├── component1
        ├── component2
        └── component..n
```

#### Pros of using monorepos

- Easy collaboration and versioning across all the components.
- A single source of truth for all changes.
- Good for small projects and trials.

#### Cons of using monorepos

- Can become difficult to manage as it grow.
- Can be challenging to separate concerns.
- Source Code Managers like Github and Gitlab don't provide fine-grained access control options inside repositories. If you have access to the repository, you have access to everything. A `CODEOWNERS` file may help in restricting write access, but read access can't be limited.

### Repository per environment

With the repo per environment approach, each environment gets a dedicated git repository. The folder structure becomes shallower than in monorepos:

```
├── apps
|   ├── app1
|   ├── app2
|   └── app..n
└── infrastructure
    ├── component1
    ├── component2
    └── component..n
```

#### Dedicated repository for infrastructure components

And if you factor infrastructure components into their dedicated git repository, the structure becomes even simpler.

```
├── app1
├── app2
└── app..n
```

and

```
├── componenent1
├── component2
└── component..n
```

#### Pros of using a repository per environment

- Better separation of concerns.
- Better access control.

#### Cons of using a repository per environment

- Too many repositories that are unmanageable without tooling.

## Key considerations

In conclusion, the structure of your git repository can greatly impact the development and deployment process of your project.

By carefully planning and organizing your repository structure, you can improve collaboration, maintainability, and scalability of your codebase. Some key considerations to keep in mind when structuring your repository include your

- project's size and complexity,
- the nature of your development team,
- and the tools and workflows that you use.

By following best practices and taking the time to design a thoughtful repository structure, you can set yourself up for success and make it easier to maintain and evolve your project over time.

We are opinionated at Gimlet. If you want to cut through the experimentation, see what practices we support in our product: [Gitops Conventions](/concepts/gitops-conventions).

Onwards!
