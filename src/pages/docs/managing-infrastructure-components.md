---
title: Managing infrastructure components
description: Managing infrastructure components
---

On this page you can learn how to manage infrastructure components of an environment.

## On the dashboard

Navigate to the environment you want to edit. Like in case of an environment called `deleteme`, navigate to _Environments > deleteme > Infrastructure components_ and locate the desired component to edit.

![Step 1 screenshot](https://images.tango.us/public/screenshot_74d34c1d-a951-4114-b984-5d8ed568fc92.png?crop=focalpoint&fit=crop&fp-x=0.3250&fp-y=0.2505&fp-z=2.5296&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1960)

On the _Config_ tab enable it and provide the necessary configuration.

![Step 2 screenshot](https://images.tango.us/public/edited_image_69245999-ad79-4170-bce1-8156ea96d7a2.png?crop=focalpoint&fit=crop&fp-x=0.4107&fp-y=0.4383&fp-z=2.0000&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1960)

Hit _Save components_ and inspect the gitops commit Gimlet makes in your infrastructure configuration gitops repository.

You can monitor the components as they come up:

```
$ kubectl get pods -n infrastructure -w
NAME                                             READY   STATUS    RESTARTS      AGE
ingress-nginx-controller-66455d768d-v8pgh        1/1     Running   0             8s
```

## On the command line

### Reconfiguring infrastructure componentes

When you run `gimlet stack configure` and configure components on the UI, the configuration options are stored in a file
called `stack.yaml`.

Next time you run `gimlet stack configure` the configuration options are read from `stack.yaml` and you can reconfigure your settings. The `stack.yaml` file contains the full configuration of your stack, and you should version it in your stack repository.

### Always re-generate after you reconfigured

`stack.yaml` is Gimlet's own format, therefore for your configuration changes to be effective on the cluster,
make sure to run `gimlet stack generate` every time you make changes to the `stack.yaml` file. Be that changes through the UI or manually.

Once you ran `gimlet stack generate`, make a git commit and push it. You should see the changes on your cluster.

## Updating components

`stack.yaml` points to the stack template in the `stack.repository` field. It points to a git repository where the stack files are maintained.

By default, it is locked to a particular version, therefore every time you run `gimlet stack generate` it works with the same stack version and generates Kubernetes resources accordingly.

```yaml
---
stack:
  repository: https://github.com/gimlet-io/gimlet-stack-reference.git?tag=v0.8.0
config:
  loki:
    enabled: true
  nginx:
    enabled: true
    host: laszlo.cloud
```

### Updating

`gimlet stack update --check` displays the new versions that can be applied to your stack, while
running `gimlet stack update` will update `stack.yaml` to the latest stack version number:

```bash
$ gimlet stack update

⏳  Stack version is updating to v0.3.0...
✔️   Config updated.
⚠️   Run `gimlet stack generate` to render resources with the updated stack.

📚  Change log:

   - v0.3.0
      • Cert Manager - Just a bugfix release
      • Grafana to 8.0.1 🎉
        • Plenty of goodies, see for yourself: [https://grafana.com/docs/grafana
          /latest/whatsnew/whats-new-in-v8-0/](https://grafana.com/docs/grafana/
          latest/whatsnew/whats-new-in-v8-0/)
      • Ingress Nginx from 0.44 to 0.47
        • Updates NGINX to version v1.20.1
      • Loki - just keeping track of the latest release - nothing major in this
        one.
      • Prometheus
        • Upgrading node-exporters and kube-state-metrics to the latest
      • Sealed Secrets to 0.16.0 - nothing major in this one
```

Important that you run `gimlet stack generate` to generate the updated Kubernetes manifests, as `gimlet stack update` only updates the stack reference in `stack.yaml`.

Make sure to

- inspect the changeset
- resolve possible [conflicts with custom changes](#custom-changes-that-conflict)
- push to git

### Automatic updates

You can automate stack upgrades by using a [Github Action](https://github.com/gimlet-io/gimlet-stack-updater-action/pull/11) maintained by Gimlet.

It

- periodically checks for updates,
- runs `gimlet stack update` on new versions
- and opens a Pull Request with the new version
- it can also assign you as reviewer

![Stack updater Github Action](/stack-updater.png)

See the action in an [example workflow](https://github.com/gimlet-io/gimlet-stack-updater-action/blob/main/.github/workflows/demo.yml).

## Making custom changes to a stack

Stack templates only go so far, and it is inevitable that you want to amend the generated manifests in slight ways.

`gimlet stack generate` takes your custom changes into account and keeps them even after a configuration change, or an upgrade.

In case your custom change is conflicting with the generated content, you have to do a content merge, that should be familiar from git.

### Custom changes that conflict

The bellow output was from a stack that was upgraded from `0.2.0` to `0.3.0` and having a custom change on top of `0.2.0`.

The cluster administrator manually upgraded the version to `3.27.0` to update to a newer version ealier than Gimlet supported it.

Since stack version `0.3.0` also updated the ingress-nginx version, now the cluster administrator has to make a judgment call whether to keep the manually updated version or roll with generated changes.

```yaml
---
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: ingress-nginx
  namespace: infrastructure
spec:
  interval: 60m
  releaseName: ingress-nginx
  chart:
    spec:
      chart: ingress-nginx
<<<<<<<<< Your custom settings
      version: 3.27.0
=========
      version: 3.33.0
>>>>>>>>> From stack generate
      sourceRef:
        kind: HelmRepository
        name: ingress-nginx
      interval: 10m
```

Many code editors have conflict resolution tooling. With a click of a button, the cluster administrator can accept the changes coming `From stack generate`.
