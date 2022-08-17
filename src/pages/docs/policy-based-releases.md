---
title: Policy based releases
description: You will learn how to create release policies that are triggered on certain conditions to automatically release to a target environment.

---

On this page, you will learn how to create release policies. Policies, that are triggered on certain conditions to automatically release to a target environment.

## Set release policies in the Gimlet environment file

You can control environment configuration with the Gimlet manifest files in the `.gimlet/` folder in your application source code repository. It pins down the release configuration to a target environment.

As a recap, here is an example configuration for an application's staging environment.

It pins down the Helm chart to use, its version, and the configuration variables for the staging environment.

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

Gimletd processes each new artifact and matches against the defined policies. The following example configures a release policy that automatically releases every git push on the `main` branch to the staging environment.

The image tag was also changed, following the projects image tagging policy: tagging each image with the full git hash.

```diff
# .gimlet/staging.yaml
app: frontend
env: staging
namespace: my-team
+deploy:
+  branch: main
+  event: push
chart:
  repository: https://chart.onechart.dev
  name: onechart
  version: 0.32.0
values:
  replicas: 2
  image:
    repository: myapp
-    tag: 1.1.0
+    tag:  "{{ .GITHUB_SHA }}"
  ingress:
    host: myapp.staging.mycompany.com
    tlsEnabled: true
```
{% callout title="Full set of supported policies" %}
For a full set of supported policies, head over to the [Gimlet manifest reference](/docs/gimlet-manifest-reference#policy-based-releases) page.
{% /callout %}

{% callout title="Full set of supported variables" %}
For a full set of supported variables, head over to the [Gimlet manifest reference](/docs/gimlet-manifest-reference#variable-support) page.
{% /callout %}
