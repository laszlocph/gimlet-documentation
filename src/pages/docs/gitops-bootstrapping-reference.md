---
title: Gitops bootstrapping reference
description: On this page you can see all the possible options you can use to bootstrap the gitops automation with the Gimlet CLI.
---

On this page you can see all the possible options you can use to bootstrap the gitops automation with the Gimlet CLI.

{% callout title="Bootstrapping on the Gimlet dashboard" %}
Gitops bootstrapping happens automatically on the Gimlet dashbaord during environment creation. You can read this page to know what goes under the hood.
{% /callout %}

## Folder per env

Specify the `--env` switch. Gimlet CLI will arrange manifests into a folder, named like your environment.

```
gimlet gitops bootstrap \
  --env staging \
  --gitops-repo-url git@github.com:<user>/<repo>.git
```

## Repo per env

Use the `--single-env` switch. Gimlet CLI will assume that only one environment will be placed in this repository.

```
gimlet gitops bootstrap \
  --single-env \
  --gitops-repo-url git@github.com:<user>/<repo>.git
```

## Linking gitops environments to namespaces, not clusters

Gimlet does not model the shape of your cluster as written on the [Gitops conventions](/concepts/gitops-conventions) page. It is up to the cluster administrator to link the gitops repository to a cluster, or to a namespace.

When you link to a namespace, there is usually a gitops environment already running in that cluster. Then you should use the `--no-controller` flag to not provision another flux in the new environment.

{% callout title="Reach out on Discord" %}
We have setups where we link gitops envs to namespaces. [Join our community Discord](https://discord.com/invite/ZwQDxPkYzE) or [Ask a question on Github](https://github.com/gimlet-io/gimlet/discussions) so we can better support namespace based environments.
{% /callout %}

## Bootstrapping from a different folder

You need to run the bootstrap command from within the repository you want to place the manifests in.
If you specify the `--gitops-repo-path <<path-to-a-working-copy-of-the-gitops-repo>> \` flag, you can run the command from anywhere.

```
gimlet gitops bootstrap \
  --env staging \
  --gitops-repo-path <<path-to-a-working-copy-of-the-gitops-repo>> \
  --gitops-repo-url git@github.com:<user>/<repo>.git
```


