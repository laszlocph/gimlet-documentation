---
title: Gitops conventions
pageTitle: Gimlet - Gitops conventions
description: On this page you can read about the choices Gimlet made.
---

{% callout title="Not sure about gitops yet?" %}
Read [our SANE gitops guide](/concepts/the-sane-gitops-guide) to clear things up.
{% /callout %}

You have to make several decisions when you start implementing gitops.
No standards emerged yet on how to structure your gitops repository,
thus you have to weigh tradeoffs as you settle on your structure:

- will you have one central repository or many?
- how do you split repositories?
- how to organize folders inside the repository?
- how to model clusters, environments, teams, namespaces, apps?

On this page you can read about the choices Gimlet made.

## Model environments and apps rather than clusters and namespaces

First and foremost, let's narrow the problem space. Gimlet avoids modelling the shape of clusters. Instead, Gimlet works with logical environments that can be mapped to clusters or namespaces within clusters.

This approach allows reshaping clusters without having to deal with gitops changes. Flux has a large part in this process, making it possible for a cluster or namespace to assume any logical environment.

## Split infrastructure components from your own applications

Gimlet splits infrastructure components from applications you develop.

Cluster administration usually falls onto just a small sub-group of your team. It also happens rather soon in organizations that infrastructure needs stricter control than application deployments, therefor Gimlet starts by splitting infrastructure components from apps from the start.

## Using git repositories and folders for separation

You typically want to separate one environment from another, `staging` from `production` for example.

You can either use git repositories or folders for this purpose.

Gimlet supports both strategies.

### Using folders

In simple scenarios, you can model everything in a single git repository and use folders to separate `staging` from `production`. Then also use folders to separate one application from another within the environments.

You will have two git repositories:

- `gitops-infra` to store manifests of infrastructure components
- `gitops-apps` to store manifests of your released applications

With `/$environment/$applicaton` folder structure in those repositories.

#### Pros

- easy to manage
- easy to navigate between environments

#### Cons

- no fine-grained access control possibilities

This scales well up to a handful of environments with tens of deployments within each, for teams not larger than 10 people. Where responsibilities have not crystallized yet.

### Using repositories

When you want access control, Gimlet recommends to split environments into different git repositories. Gimlet uses the following naming convention to name the repos:

- `gitops-$environment-infra` to store manifests of infrastructure components in a given environment
- `gitops-$environment-apps` to store manifests of your released applications in a given environment

Inside the repositories, folders separate apps from one another.

#### Pros

- access control
- separating different concerns

#### Cons

- managing custom changes becomes repetative

This scales well up to many environments with a couple hundred deployments within each. This approach can work for teams sized 10-50, where distinct functions within the team are known.

{% callout title="Splitting gitops repositories on custom concerns" %}
Splitting gitops repositories shows great similarity to rightsizing your services: whether you develop micro, nano, or team sized services.

Splitting the gitops repositories is more
an art than science, and influenced by the team structure of your company. That said, splitting up gitops repositories is usually driven by access control and organizational boundaries.
{% /callout %}

{% callout type="warning" title="Gimlet doesn't use branches to separate environments" %}
On paper, you could open a pull request from your staging branch to the production branch to promote changes, but in reality, the branches will hold environment specific information, and you constantly have to navigate around those suddle differences. Why not use repos and folders then from the start?
{% /callout %}
