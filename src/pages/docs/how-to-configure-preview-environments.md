---
title: How to configure preview environments
description: It's called by many names, but the functionality is ubiquitous, the ability to deploy a non-mainline version of the application on demand, on its own URL.
---

Branch deploys, review apps, PR deploys, preview environments. It's called by many names, but the functionality is ubiquitous: the ability to deploy a non-mainline version of the application on demand, on its own URL.

In this guide, you will learn how to set up preview environments with Gimlet's manifest file.

## Gimlet environments recap

The Gimlet environment manifest file is a declarative format to configure which Helm chart, what chart version, and what parameters should be deployed to an environment.

```yaml
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

and the best part: the file has variable support. The Gimlet manifest resolves Golang templates in the `gimlet manifest template` step or in Gimletd in automated deployment processes.

Configuring per branch preview environments is straightforward using variables.

## Variables enable preview environments

Feature branch deploys is a templating question:

- Names should be unique to avoid collision between application instances
- Names should follow some convention
- It's driven by automation, and git branch name is a typical input parameter

After these considerations, let's see how to configure preview environments.

## How to configure per branch preview environments

One good practice is to add a `-{{ .BRANCH }}` suffix to the feature branch instances:

```yaml
# .gimlet/preview-env.yaml
app: myapp-{{ .BRANCH }}
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
    tag: "{{ .GIT_SHA }}"
  ingress:
    host: "myapp-{{ .BRANCH }}.staging.mycompany.com"
    tlsEnabled: true

# ci.env
GIT_SHA=d750703d39a6fd8f2f82b34dfce2de9719cc4b98
BRANCH=feature-x

gimlet manifest template \
  -f .gimlet/preview-env.yaml \
  -o manifests.yaml \
  --vars ci.env
```

## Policies for preview app deploys

Now that the naming and templating is covered, using policy based releases, you can define policies that automatically deploy your Pull Requests or branches.

The following snippet deploys app pushes on branches that match the `feature/*` wildcard pattern.
Variables are used to guarantee unique resource names, and avoid collision.

It also applies sanitization on the branch name, to fit Kubernetes resource name limitations, and DNS naming rules.

```diff
# .gimlet/preview-env.yaml
- app: myapp-{{ .BRANCH }}
+ app: myapp-{{ .BRANCH | sanitizeDNSName }}
env: staging
namespace: my-team
chart:
  repository: https://chart.onechart.dev
  name: onechart
  version: 0.32.0
+deploy:
+  branch: feature/*
+  event: push
values:
  replicas: 1
  image:
    repository: myapp
    tag: "{{ .GIT_SHA }}"
  ingress:
-    host: "myapp-{{ .BRANCH }}.staging.mycompany.com"
+    host: "myapp-{{ .BRANCH | sanitizeDNSName }}.staging.mycompany.com"
    tlsEnabled: true
```

The next example is using the `event: pr` trigger to deploy Pull Requests:

```diff
# .gimlet/preview-env.yaml
app: myapp-{{ .BRANCH | sanitizeDNSName }}
env: staging
namespace: my-team
chart:
  repository: https://chart.onechart.dev
  name: onechart
  version: 0.32.0
deploy:
-  branch: feature/*
-  event: push
  event: pr
values:
  replicas: 1
  image:
    repository: myapp
    tag: "{{ .GIT_SHA }}"
  ingress:
    host: "myapp-{{ .BRANCH | sanitizeDNSName }}.staging.mycompany.com"
    tlsEnabled: true
```

For all other possibilities, please refer to the [Gimlet manifest reference](/docs/gimlet-manifest-reference#policy-based-releases) page.

## Cleaning up preview apps

If you deploy preview apps with dynamic names, like with the branch name in the app name, you can use Gimlet's cleanup policies to clean them up once you don't need them anymore.

{% callout type="warning" title="Configure Gimletd for cleaning up" %}
This feature works only if you [enabled the Github integration](/docs/gimletd-configuration-reference#github-integration) in GimletD.
{% /callout %}

### Cleanup policy

```diff
# .gimlet/preview.yaml
app: myapp-{{ .BRANCH | sanitizeDNSName }}
env: staging
namespace: staging
chart:
  repository: https://chart.onechart.dev
  name: onechart
  version: 0.28.0
deploy:
  branch: feature/*
  event: push
+cleanup:
+  branch: feature/*
+  event: branchDeleted
+  app: myapp-{{ .BRANCH | sanitizeDNSName }}
values:
  replicas: 1
  image:
    repository: ghcr.io/podtato-head/podtatoserver
    tag: "{{ .SHA }}"
  gitRepository: laszlocph/gimletd-test-repo
  gitSha: "{{ .SHA }}"
```

The above snippet has a cleanup section that is triggered

- on the `branchDeleted` event,
- if the branch that is deleted matches the `feature/*` pattern.

Once the policy triggers, it deletes applications that are matching the `myapp-{{ .BRANCH | sanitizeDNSName }}` pattern.

All three fields are mandatory.

{% callout title="Variables in cleanup policies" %}

Please note that only the `{{ .BRANCH }}` variable is available for the `branchDeleted` event.

At the time of deletion the shipped artifacts and their extensive
variable set is not available, only the branch name is known that got deleted.
{% /callout %}
