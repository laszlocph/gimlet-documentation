---
layout: post
title: Error handling in Helm Controller, and how to solve the infamous “Upgrade retries exhausted” error
date: '2023-05-12'
image: annoyed-cat.png
description: "A detailed analysis of how Flux's Helm Controller handles failure, its implications, errorstates and potential resolutions. And everything we know about the `Upgrade retries exhausted` error."
author: Youcef Guichi
authorAvatar: /youcef.jpg
coAuthor: Laszlo Fogas
coAuthorAvatar: /laszlo.jpg
---

Helm and Flux are two popular tools in the Kubernetes ecosystem to manage deployments, upgrades, and rollbacks. However, sometimes you encounter the `Upgrade retries exhausted` error when using these tools.

This article provides a detailed analysis of how Flux's Helm Controller handles failure, its implications, errorstates and potential resolutions.

## How Flux installs Helm charts

Helm is a popular package manager for Kubernetes that simplifies the deployment and management of applications on Kubernetes clusters. Flux's Helm Controller component manages the lifecycle of Helm releases on a Kubernetes cluster. It is deployed in the `flux-system` namespace.

```
$ kubectl get pods -n flux-system
NAME                                       READY   STATUS    RESTARTS   AGE
helm-controller-88f6889c6-ptvpv            1/1     Running   0          20h
kustomize-controller-784bd54978-pkg5b      1/1     Running   0          21h
notification-controller-648bbb9db7-58fcm   1/1     Running   0          21h
source-controller-79f7866bc7-524pw         1/1     Running   0          21h
```

To deploy a Helm chart with Flux, you create a `HelmRelease` custom resource that contains all the information necessary to deploy and manage Helm charts on the cluster: the reference to the Helm chart, and the contents of the `values.yaml` under the `spec.values` field. You can think of the HelmRelease resource as the `helm repo add` and values.yaml file editing steps, when you install Helm charts procedurally on your terminal.

The Helm Controller is responsible for monitoring the `HelmRelease` resources for changes and reconciling any differences between the desired state and the current state of the cluster. You can think of Helm Controller as the component that runs the `helm install` or `helm upgrade` commands.

## What is "Upgrade retries exhausted"?

The `Upgrade retries exhausted` message occurs when the chart upgrade has failed, and all attempts to retry the upgrade have been exhausted by Helm Controller. This message usually arises due to Helm values misconfiguration or implications of your cluster state that cannot be resolved through repeated upgrade attempts.

In case of a failure, Helm Controller makes multiple attempts to upgrade the chart in order to resolve the issue, but if these attempts fail after a certain number of tries, it will stop trying and display the `Upgrade retries exhausted` error.

## How Helm Controller deals with errors

When upgrading a `HelmRelease` to a new version, if the upgrade fails, the Helm Controller will attempt to reinstall the release based on the number of retries specified in the `HelmRelease` definition.

The default number of retries is `0`, and each retry has a default timeout set to `5 minutes`. Helm Controller will wait until the timeout for each retry has elapsed before proceeding to the next operation.

Even if a new commit is pushed that resolves the issue with the previously applied `HelmRelease`, Helm Controller will still wait until all retries have been attempted before proceeding to the new fixed commit. This can give the impression that the `HelmRelease` is stuck, even though a fix has been implemented.

It is important to be aware of the specifics of the retry and timeout values when managing `HelmReleases`, as their default values can result in frustrating behavior if one is not familiar with them.

## Error scenarios using Helm Controller

If the Helm Controller exhausts all upgrade retries and is unable to achieve a healthy state, the `HelmRelease` will remain in the "Upgrade retries exhausted" state, and the broken pods will remain on the cluster.

If you are using a rolling deployment strategy, this is primarily a cosmetic issue, since the previous deployment will still be healthy and serving traffic. In this case, you only need to push a new commit with a potential fix, without experiencing any downtime.

However, if you are using a non-rolling deployment strategy - like `Recreate` - this will result in downtime as the old pods were deleted before the new broken pods are created. Thus only the broken pods will remain on the cluster, and there will be no way to serve incoming requests.

Nonetheless, fixing your `HelmRelease` values will trigger a reconciliation after the upgrade retries are exhausted, and lead to a healthy state.

## Solution to "Upgrade retries exhausted"

Misconfigurations are an unavoidable aspect.

If you ever find yourself in the "Upgrade retries exhausted" state,

- fixing your `HelmRelease` values and pushing a new commit will trigger a reconciliation, and may lead to a healthy state.

- If the root cause of the "Upgrade retries exhausted" state is not related to your `HelmRelease` configuration, but implicit to your cluster state, fixing the situation first, then triggering a Helm Controller reconciliation will solve the issue. The situation typically occurs when a secret or configmap is missing from the cluster that your HelmRelease is referring to. Once you resolved the dependency issue, you can trigger a reconciliation by changing any value in the `spec` field of the `HelmRelease`. Practically a dummy value under `spec.values` will do it, or if you use the flux CLI, `flux suspend helmrelease <foo>` and `flux resume helmrelease <foo>` will trigger a reconciliation.

- Flux also includes a built-in feature that can help. In case of a failed upgrade, Flux can automatically clean up the broken state by rolling back to the previous version. Or depending on the configuration, it can also uninstall the release.

In the next chapter, we will provide a practical example to illustrate how Flux's remediation technique works.

## Practical example - how Flux's remediation technique works

In this example

- we are going to deploy Grafana with a correct configuration
- make a deliberate error
- get into the "Upgrade retries exhausted" state
- demonstrate Flux's `upgrade.remedation.strategy: rollback` at work.

### The following `HelmRelease` deploys Grafana

`install.remedation.retries` and `upgrade.remedation.retries` are the number of retries Flux will attempt to install or upgrade the Helm chart. If the number of tries exceeds the retries threshold, the Helm Controller raises the `Upgrade retries exhausted` error.

`upgrade.remedation.strategy: rollback` is instructing the Helm Controller to rollback to the old version if the number of tries exceeded the retries threshold.

```
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: grafana
  namespace: infrastructure
spec:
  interval: 60m
  releaseName: grafana
  chart:
    spec:
      chart: grafana
      version: 6.50.1
      sourceRef:
        kind: HelmRepository
        name: grafana
      interval: 30s
  install:
    remediation:
      retries: 1
  upgrade:
    timeout: 30s
    remediation:
      retries: 1
      strategy: rollback
  values:
      image:
          repository: docker.io/grafana/grafana
          # Overrides the Grafana image tag whose default is the chart appVersion
          tag: ""
          sha: ""

```

### Now, let's upgrade to a broken state

```
image:
  repository: docker.io/grafana/grafana
  # Overrides the Grafana image tag whose default is the chart appVersion
  tag: "no-such-tag"
  sha: ""
```

Once the upgrade has been applied, the Helm Controller will attempt to upgrade, but will fail due to the absence of a Grafana version with the tag `no-such-tag`. As a result, an error message stating that the upgrade retries have been exhausted will be raised.

```
$ kubectl get hr
NAME            AGE    READY   STATUS
grafana         19m    False   upgrade retries exhausted
```

### The remediation strategy in action

To check if Flux attempted a cleanup by using the defined rollback remediation strategy, you can run the `kubectl describe hr grafana` command.

```
$ kubectl describe hr grafana
warning: Upgrade "grafana" failed: timed out waiting for the condition
Reason:                        UpgradeFailed
Status:                        False
Type:                          Released
Last Transition Time:          2023-05-09T12:59:40Z
Message:                       Helm rollback succeeded
Reason:                        RollbackSucceeded
Status:                        True
Type:                          Remediated
```

This is still a little cryptic.

If you run the `helm history grafana` command, you can see what really happened.

- Grafana was installed in revision 1
- Then revision 2 was the failed upgrade attempt
- And revision 3 is the rolled back state to revision 1.

```
$ helm history grafana
REVISION        UPDATED                         STATUS          CHART           APP VERSION     DESCRIPTION
1               Thu May 11 13:43:27 2023        superseded      grafana-6.50.1  9.3.1           Install complete
2               Thu May 11 13:51:12 2023        failed          grafana-6.52.5  9.4.3           Upgrade "grafana" failed: timed out waiting for the condition
3               Thu May 11 13:51:43 2023        superseded      grafana-6.50.1  9.3.1           Rollback to 1
```

## Conclusion

The solution to "Upgrade retries exhausted" is to fix the misconfiguration in the `HelmRelease` and push a new commit. Or if the error is elsewhere, fix the cluster state, and trigger a Helm Controller reconciliation by changing any value in the `spec` field of the `HelmRelease`.

Flux can help cleaning up broken Helm releases by setting the `upgrade.remedation.strategy: rollback` field, but it is important to note that the `HelmRelease` will seemingly remain in the "Upgrade retries exhausted" state. Only by running `kubectl describe hr` or `helm history` can you learn about the successful rollback.

Why even use remediation then?

Implementing remediation leads to a self healing system. Ignoring issues and leaving broken pods on the cluster for a prolonged period can trigger alerts. By setting up `HelmRelease` remediation we have a system that can automatically return to its previous state, allowing ample time to address and resolve the issue at hand.

Onwards!
