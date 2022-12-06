---
title: Policy based releases
description: You will learn how to create release policies that are triggered on certain conditions to automatically release to a target environment.

---

Once you [added the Gimlet deploy step in your CI workflow](/docs/deploy-your-first-app-to-kubernetes#integrate-ci-with-gimlet), every commit becomes deployable in Gimlet - given that CI has built the commit and the workflow reached the Gimlet step.

This is possible as in the Gimlet step, CI passes a large chunk of metadata (called the Gimlet artifact) to the Gimlet API, and Gimlet knows everything about the commit to deploy it.

With this mechanism, you can go one step further and configure the CI integration in a way that it only ships the Gimlet artifact, to let Gimlet know that there is a releasable software version available, and let Gimlet decide what to do with it.

Gimlet has release policies that are triggered on certain conditions to automatically release to a target environment once Gimlet becomes aware of a new artifact.

## Shipping the artifact only in CI

To configure the Gimlet step in CI to ship a Gimlet artifact but not to trigger a deploy, you can use the reguler Gimlet CI plugins just make sure to not provide any deploy parameters to it:

```
    - name: 🚢 Gimlet artifact
      uses: gimlet-io/gimlet-artifact-shipper-action@v0.8.0
      env:
        GIMLET_SERVER: ${{ secrets.GIMLET_SERVER }}
        GIMLET_TOKEN: ${{ secrets.GIMLET_TOKEN }}
```

With the above config, Gimlet becomes aware of a new releasble softwware version, and can act on release policies.

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
+    tag:  "{{ .SHA }}"
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
