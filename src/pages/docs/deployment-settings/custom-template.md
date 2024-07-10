---
title: 'Creating a custom deployment template'
description: |
  See how you can create a deployment template that matches your company needs.
---

When you're setting up an application for deployment, you select a deployment template. There are built-in templates, and you can also use your own custom deployment template. This page tells you how.

For a recap, check [this introduction on deployment configuration](/docs/deployment-settings/deployment-configuration).

## Gimlet manifest

![Gimlet Manifest components and their responsibilities.](/docs/gimlet-io-manifest-documentation.png)

Deployment templates in Gimlet are made with Helm charts under the hood.

Helm is a Kubernetes package manager that is used to package common deployment options. This package is called a Helm chart. A chart is a set of templates that are rendered using a set of values that are specific to your deployment.

## Using your own Helm chart

To create your custom deployment template, you need to create your own Helm chart.

In the Gimlet manifest you can refer to this Helm chart:
- **from Helm repositories**
- **and git repositories**

#### Charts from Helm repositories

```
chart:
  repository: https://chart.onechart.dev
  name: onechart
  version: 0.38.0
```

#### Charts from git repositories

```
chart:
  name: https://github.com/myfork/onechart.git?sha=8e52597ae4fb4ed7888c819b3c77331622136aba&path=/charts/onechart/
```

The above snippet is an example how to access a Helm chart hosted in a git repository. Both private and public git repositories work. Gimlet uses its git credentials to fetch the chart source at render time.

{% callout %}
When you are developing your custom template, [you can render](/docs/cli/cli-use-cases#render-manifests-locally) the Gimlet manifest on your laptop with `gimlet manifest template`.

For private git repository based Helm charts to work in this process, replace the chart reference temporarily to an SSH based URL, so your default SSH infrastructure is used during the render.

Example:

```diff
chart:
-  name: https://github.com/myfork/onechart.git?sha=8e52597ae4fb4ed7888c819b3c77331622136aba&path=/charts/onechart/
+  name: git@github.com:gimlet-io/gimlet.git?sha=8e52597ae4fb4ed7888c819b3c77331622136aba&path=/charts/onechart/
```

When Gimlet renders this chart server side, it will use its Github credentials to fetch the chart source code. No need for SSH based URL.
{% /callout %}

## Creating your own Helm chart

The best practice is to fork [gimlet-io/onechart](https://github.com/gimlet-io/onechart) which is the source for our built-in templates. If you are looking to add a handful of fields, forking the chart is the best option.

If you decide to write your own chart, checking how OneChart is doing things is still a good way to understand Gimlet's behavior.

### Controlling UI fields

Gimlet is using the Helm schema file and a propriatery format, the `helm-ui.json` to render the deployment configuration screen from a Helm chart. Read more about it [on our blog](http://localhost:3001/blog/helm-react-ui-a-react-component-to-render-ui-for-helm-charts).

### FAQ

#### My application with a custom template is deployed, but it does not show up on Gimlet!
Gimlet is searching for specific annotations on the deployed Kubernetes `Service`, `Deployment` and `Ingress` resources. If your resources are properly annotated Gimlet will display them on the UI.

Search for these bits in OneChart's codebase:

```yaml
    {{- if .Values.gitRepository }}
    gimlet.io/git-repository: {{ .Values.gitRepository }}
    {{- $parts := split "/" .Values.gitRepository }}
    v1alpha1.opensca.dev/vcs.owner: {{ $parts._0 }}
    v1alpha1.opensca.dev/vcs.name: {{ $parts._1 }}
    {{- end }}
```

```yaml
    {{- if .Values.gitSha }}
    gimlet.io/git-sha: {{ .Values.gitSha }}
    v1alpha1.opensca.dev/version.sha: {{ .Values.gitSha }}
    {{- end }}
```

#### The deployment configuration screen cannot display my chart!
This can have many reasons. Either you have syntax errors in your `values.schema.json` and `helm-ui.json` files, or you are using identifiers in your chart that are not following the handful of conventions we hardcode in Gimlet.

Trailing commas in Javascript arrays often trip the rendering. Try binary search the problem, and refer to OneChart's codebase often.

#### How to use Gimlet Clouds domain suffix?

Gimlet injects the preferred domain based on the following convention.

- If your schema field is named `ingress` and it is placed in the root
- Gimlet renders a special UI component called `ingressWidget` alongside the dynamic domain suffix

```javascript
  if (chart.uiSchema[1].uiSchema["#/properties/ingress"] && preferredDomain) {
    chart.uiSchema[1].uiSchema["#/properties/ingress"] = {
      "host": {
        "ui:field": "ingressWidget",
        'ui:options': {
          preferredDomain: preferredDomain,
        }
      }
    }
  }
```

## When Helm is limiting

See [your options](/docs/reference/gimlet-manifest-reference#when-helm-is-limiting).

