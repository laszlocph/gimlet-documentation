---
title: Gimlet manifest reference
description: See the full power of the Gimlet manifest on this page
---

You can control environment configuration with the Gimlet environment manifest file.

It pins down the release configuration to a target environment: the Helm chart to use, its version, and the configuration variables for a given environment.

The following example shows the configuration for an application's staging environment:

```yaml
# .gimlet/staging.yaml
app: frontend
env: staging
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
    host: myapp.staging.mycompany.com
    tlsEnabled: true
```

You store Gimlet manifest files under the `.gimlet/` folder of your application source code repository. One file per environment.

See how you can [manage Gimlet manifests](/docs/how-to-manage-deployment-configs).

## Field reference

### Basic fields

- `app` The name of the app. It is used as Kubernetes resource names so it must adhere those rules.

- `env` The slug of the Gimlet environment to deploy to.

- `namespace` The namespace to deploy this application to. Namespaces are an arbitrary grouping, your team probably has a preferred namespace structure that serve you well. At Gimlet, as a rule of thumb, we use the environment name as namespace. For this tutorial, follow this practice and set the namespace as staging.

### Deploy

Fields for [policy based deploy](#policy-based-releases).

### Cleanup

Fields for automatically clean up deployed applications. Primarily used in [cleaning up preview apps](/docs/how-to-configure-preview-environments#cleaning-up-preview-apps)

### Chart

The Helm chart to use as application template

#### Charts from Helm repositories

```
chart:
  repository: https://chart.onechart.dev
  name: onechart
  version: 0.38.0
```

#### Charts from git repos

```
chart:
  name: https://github.com/myfork/onechart.git?sha=8e52597ae4fb4ed7888c819b3c77331622136aba&path=/charts/onechart/
```

The above snippet is an example how to access a Helm chart hosted in a public git repository.

For private git repos to work on Gimletd, make sure to [integrate Gimletd with Github](/docs/gimletd-configuration-reference#github-integration).

On your laptop, you can use an SSH based git url in the `chart.name` field to access a private git repo. If you have your SSH agent running, Gimlet CLI will be able to pull the chart.

### Values

The values that will be passed to the Helm.

## Variable support

The Gimlet manifest resolves Golang templates in the `gimlet manifest template` step or in the server-side automated deploy workflows.

### Supported variables

#### On the terminal

If you run `gimlet manifest template` on the terminal, or in a script, all the set environment variables will be resolved, plus the variables you set with the `--vars` flag.

```yaml
# .gimlet/staging.yaml
app: myapp
env: staging
namespace: my-team
chart:
  repository: https://chart.onechart.dev
  name: onechart
  version: 0.10.0
values:
  replicas: 1
  image:
    repository: myapp
    tag: "{{ .GIT_SHA }}"
  ingress:
    host: myapp.staging.mycompany.com
    tlsEnabled: true

# ci.env
GIT_SHA=d750703d39a6fd8f2f82b34dfce2de9719cc4b98

gimlet manifest template \
  -f .gimlet/staging.yaml \
  -o manifests.yaml \
  --vars ci.env
```

#### In automated workflows

In automated workflows, variables that are part of the released artifact are available in templating.

Artifacts are shipped by CI, and each shipper ships

- all CI specific cariables with prefix `GITHUB` and `CIRCLE`
- all custom variables that you add in the shipper configuration
- and the default set of variables that are available no matter which shipper you use.

{% callout title="The exact list of variables in an artifact" %}
You can look into an artifact by `gimlet artifact list -o json` and locate the `.vars` field. Key-value pairs from this field are made available (case-sensitive) as variables in the Gimlet manifest.
{% /callout %}

### Built-in variables

The commonly available variables made available by shippers are:

| Variable | Value                                                      |
| -------- | ---------------------------------------------------------- |
| REPO     | The owner and repository name.                             |
| OWNER    | The repository owner's name.                               |
| BRANCH   | The name of the Git branch currently being built.          |
| TAG      | The name of the git tag, if the current build is tagged.   |
| SHA      | The commit SHA that triggered the workflow.                |
| ACTOR    | The name of the person or app that initiated the workflow. |
| EVENT    | The name of the event that triggered the workflow.         |
| JOB      | A unique identifier for the current job.                   |

## Policy-based releases

Gimlet supports `branch` and `tag` filters.

Both support wildcards and negated expressions

### Tag pattern trigger example

```yaml
+deploy:
+  tag: v*
+  event: tag
```

Triggers on `v1`, `v2`, `v1.1` or any glob pattern that is supported by the [https://github.com/gobwas/glob](https://github.com/gobwas/glob) project.

### Branch pattern trigger example

```yaml
+deploy:
+  branch: feature/*
+  event: push
```

Triggers on any commit pushed to a branch that is prefixed with `feature/`.

### Negated branch trigger

```yaml
+deploy:
+  branch: !main
+  event: push
```

Triggers on any commit pushed to a branch that is not `main`.

### Supported events

GimletD supports `push`, `tag` and `pr` events.

It is mandatory to set either the `branch` or the `event` condition.
If both are defined, the policy triggers only if both conditions are satisfied.

## Function support

Since Gimlet manifests are Golang templates, functions can be used.

The available functions:

- http://masterminds.github.io/sprig/ functions are available
- a special `sanitizieDNSName` function, see [source](https://github.com/gimlet-io/gimlet/blob/main/pkg/dx/manifest.go#L151).

An advanced example showcasing the available functions and Golang templating options:

```
app: "{{ printf \"gimlet-dashboard-%s\" .BRANCH | sanitizeDNSName }}"
env: preview
namespace: preview
chart:
  repository: https://chart.onechart.dev
  name: onechart
  version: 0.35.0
values:
  [...]
  ingress:
    annotations:
      kubernetes.io/ingress.class: nginx
      cert-manager.io/cluster-issuer: letsencrypt
    host: "{{ trunc 40 (printf \"gimlet-dashboard-%s\" .GITHUB_BRANCH) | sanitizeDNSName }}.preview.turbopizza.net"
```

- the app name is appended with the branch name, which is then sanitized to be a DNS name. This way preview app names are valid Kubernetes identifiers.
- the host follows a simlar approach, but it also truncates the preview app name to 40 characters, to accomodate the company domain name.

## Postprocessing

The Gimlet manifest is able to apply Kustomize `StrategicMergePatches` and `Json6902Patches`, plus add plain Kuberenetes `manifests`. See their [usage](/docs/when-helm-is-limiting).
