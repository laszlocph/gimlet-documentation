---
title: Flux CRDs
description: Flux uses several Kubernetes Custom Resources Definitions (CRDs) to configure the automation process. In this section, you will get a picture of what those are and what they are used for.
---

On this page you get a quick intro on the Kubernetes custom resources that Flux uses.

Flux uses several Kubernetes Custom Resources Definitions (CRDs) to configure the automation process. In this section, you will get a picture of what those are and what they are used for.

## GitRepository

In short, GitRepository points Flux to a git repository and to credentials to get the yamls.

From the [Core Concepts of FluxCD](https://fluxcd.io/docs/concepts/)

> A _Source_ defines the origin of a repository containing the desired state of the system and the requirements to obtain it (e.g. credentials, version selectors). For example, the latest `1.x` tag available from a Git repository over SSH. [...]
>
> The origin of the source is checked for changes on a defined interval, if there is a newer version available that matches the criteria, a new artifact is produced.
>
> All sources are specified as Custom Resources in a Kubernetes cluster, examples of sources are `GitRepository`, `HelmRepository` and `Bucket` resources.

## Kustomization

From the [Core Concepts of FluxCD](https://fluxcd.io/docs/concepts/)

> The `Kustomization` custom resource represents a local set of Kubernetes resources (e.g. kustomize overlay) that Flux is supposed to reconcile in the cluster. The reconciliation runs every one minute by default, but this can be changed with `.spec.interval`. If you make any changes to the cluster using `kubectl edit/patch/delete`, they will be promptly reverted. You either suspend the reconciliation or push your changes to a Git repository.

While the official documentation talks about Kustomize resources, the `Kustomization` resource simply points to a path in a `GitRepository` to apply yamls from. Technically, it uses Kustomize to render the yamls from that location, but it can deploy plain Kubernetes yamls too. This is what Gimlet uses it for.

For more information, take a look at the [Kustomize FAQ](https://fluxcd.io/docs/faq/#kustomize-questions) and the [Kustomization CRD](https://fluxcd.io/docs/components/kustomize/kustomization/).

## HelmRelease

The `HelmRelease` resource let's you install Helm Charts of given versions with the specified values.yaml file.

This CRD makes it possible to deploy Helm charts from gitops, thus making the procedural `helm install` and `helm upgrade` commands declarative. So it allows you to manage the helm chart and its values with git. Flux will take care of the installation, upgrade, and rollback.

### Moving from `helm install` to the HelmRelease CRD

A typcal two command Helm install process looks like this:

```
helm repo add grafana https://grafana.github.io/helm-charts
helm install my-release grafana/grafana -f values.yaml
```

The HelmRelease CRD describes two important things:

- `spec.chart` points to a Helm chart and its version
- `spec.values` is where you can move here the contents of your values.yaml as they are. With the right indentation of course.

```yaml
---
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: grafana
  namespace: infrastructure
spec:
  interval: 60m
  releaseName: grafana
  chart: ...
  values: ...
```

### Example

The HelmRepository resource captures the information from the `helm repo add grafana https://grafana.github.io/helm-charts` command, then the HelmRelease resource refers to it.

One last thing to locate is the exact chart version. Either you find it in the chart's source code, locate the `version` field in `Chart.yaml`. Or you can get it from the `helm show chart grafana/grafana` command's output.

```yaml
---
apiVersion: source.toolkit.fluxcd.io/v1beta1
kind: HelmRepository
metadata:
  name: grafana
  namespace: infrastructure
spec:
  interval: 60m
  url: https://grafana.github.io/helm-charts
---
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
      version: 6.52.1
      sourceRef:
        kind: HelmRepository
        name: grafana
      interval: 10m
  values:
    sidecar:
      datasources:
        enabled: true
      dashboards:
        enabled: true
      notifiers:
        enabled: true
    ingress:
      enabled: true
      ingressClassName: nginx
      hosts:
        - grafana.mycompany.com
      path: /
      tls:
        - secretName: tls-grafana
          hosts:
            - grafana.mycompany.com
```

## Notification

With the `Alert` CRD, you can send notifications of a given gitops automation to a list of `Provider` resources. You can read more about various CRDs and their configuration options in the [Flux documentation](https://fluxcd.io/docs/components/notification/).

## Verifying Flux in action

Check Flux's custom resources on the cluster to verify the gitops automation.

Flux uses the `gitrepository` custom resource to point to git repository locations and credentials. Flux's source controller periodically checks the content of the git repositories, and you can validate their status as follows:

```bash
➜ kubectl get gitrepositories -A
NAMESPACE     NAME                                                    URL                                                              AGE    READY   STATUS
flux-system   gitops-repo-gimlet-bootstraping-tutorial   ssh://git@github.com/gimlet/gimlet-bootstraping-tutorial   125m   True    stored artifact for revision 'main/f4a2a676bbcc04f38120b24463ca1c66cc099ab4'

```

If the git repositories are in ready state, validate the `kustomization` custom resources. These resources point to a path in a git repository to apply yamls from. If they are in ready state, you can be sure the Flux applied your latest manifests.

```bash
➜  kubectl get kustomizations -A
NAMESPACE     NAME                                                                 AGE    READY   STATUS
flux-system   gitops-repo-gimlet-bootstraping-tutorial                127m   True    Applied revision: main/f4a2a676bbcc04f38120b24463ca1c66cc099ab4
flux-system   gitops-repo-gimlet-bootstraping-tutorial-dependencies   127m   True    Applied revision: main/f4a2a676bbcc04f38120b24463ca1c66cc099ab4
```

Now that the gitops automation is in place, every manifest you put in the gitops repositories will be applied on the cluster by the gitops controller.

{% callout title="Need to debug Flux?" %}
If `kustomizations` or `gitrepositories` are not in ready state, you get an error message in their status.

If you need to further debug their behavior, you can check Flux logs in the `flux-system` namespace.

```
kubectl logs -f deploy/kustomize-controller -n flux-system
kubectl logs -f deploy/source-controller -n flux-system
```

{% /callout %}
