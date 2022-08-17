---
title: When Helm is limiting
description: Helm charts need to cater to many different deployment options. At the far end of the spectrum, a Helm chart must template every single Kubernetes manifest field. In practice, many Helm charts fall into this trap, but a Helm chart maintainer must know where to draw the line.
---

Helm charts need to cater for many different deployment options. At the far end of the spectrum, a Helm chart must template every single Kubernetes manifest field. In practice, many Helm charts fall into this trap, but a Helm chart maintainer must know where to draw the line.

We drew the line at the 30 most common deployment variations with OneChart.

If your company outgrows it, you always have the option to fork it and maintain your supported feature set.

Gimlet also allows for Helm chart post-processing. You can place a Kustomize patch in the Gimlet environment manifest file and have it applied on the rendered manifest that comes out of Helm. Eventually, you can also use raw Kubernetes yamls, if none of the abstractions and escape hatches work for you.

## Using raw manifests

```
app: myapp
env: staging
namespace: my-team
manifests: |
  ---
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: myapp
    namespace: my-team
  spec:
    replicas: 1
    selector:
      matchLabels:
        app.kubernetes.io/name: onechart
        app.kubernetes.io/instance: myapp
    template:
      metadata:
        labels:
          app.kubernetes.io/name: onechart
          app.kubernetes.io/instance: myapp
      spec:
        containers:
          - name: myapp
            image: "myapp:{{ .GIT_SHA }}"
```

## Using Helm charts with a Kustomize patch

```
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
strategicMergePatches: |
  ---
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: myapp
    namespace: my-team
  spec:
    template:
      spec:
        containers:
        - name: myapp
          volumeMounts:
            - name: azure-file
              mountPath: /azure-bucket
      volumes:
        - name: azure-file
          azureFile:
            secretName: my-azure-secret
            shareName: my-azure-share
            readOnly: false
```

{% callout title="More examples" %}
You can find more examples on [Github](https://github.com/gimlet-io/gimlet-cli/tree/main/examples)
{% /callout %}
