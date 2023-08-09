---
title: How-to manage secrets
Description: In this guide, you will learn how to tie the secret management workflow and application delivery together using Gimlet and GitOps.
---

Secrets demand special handling, and often they are stored, managed and configured in a workflow that is adjacent to application deployment.

Kubernetes allows you to decouple configs and secrets from your applications, but leaves the question open how those secrets show up in the cluster.

In this guide, you will learn how to tie the secret management workflow and application delivery together using Gimlet and GitOps.

## Life is simple on localhost

Developers know that configs and secrets must come from environment variables.

During development, configs and secrets are just that: environment variables.

## But deployment time, secrets become snowflakes

Kubernetes offers the `ConfigMap` and `Secret` objects to decouple configuration from the deployment descriptors.
Instead of storing environment variables verbatim in the yaml, you reference config maps and secrets by their name.

Life is simple with config maps. You store them together with your application descriptors, but secrets demand special treatment. ❄

## And special treatment means a special workflow. One that is distinct to app deployment

I want to make it clear that Kubernetes does the right thing.

Its abstraction allows for secret workflows that can treat secrets in a way that is in sync with your company's information security policies.

But because of that, secret workflows are as diverse as many types of companies are out there:
I've seen secrets put in CI, cloud key stores, vaults. Automations that unlock keys in CI, vaults that unseal in the cluster.
Dev workflows that include cloud CLIs, encrypted git repos, GUIs to punch in secrets.
Sprinkle this with dev <> ops organizational divisions, and you often get an uncomfortable dev workflow.

With GitOps however, the secret workflow doesn't have to be split from application deployment.

## How GitOps unifies secret management with application deployment

With GitOps, you store `ConfigMaps` right next to your application yamls.
But you can also store `Secrets` right next to your application manifests.

Encrypted.

No special treatment, no distinct secret workflows, no eventual consistency.

You store secrets right with your application configuration, deploy them the same way, and the same time.
You version secrets together with your application, just encrypted.

It is made possible with the Sealed Secret's project.

## The steps using Sealed Secrets controller

Bitnami's [Sealed Secrets](https://github.com/bitnami-labs/sealed-secrets) is based on asymmetric cryptography, just like your SSH keys or SSL.

> Encrypt your Secret into a SealedSecret, which is safe to store - even to a public repository. The SealedSecret can be decrypted only by the controller running in the target cluster and nobody else (not even the original author) is able to obtain the original Secret from the SealedSecret.

- You deploy the Sealed Secrets controller in your cluster
- In turn, it creates a key pair
- You download the public key that you will use for sealing all secrets
- Also, back up the private key, should you need to recover your cluster in case of an emergency.

Sealed secrets cannot be decrypted without the private key, not even by the creator,
all the encrypted secrets in the GitOps repository will be useless, if you need to recreate the cluster without the private key.

Once you have the controller running, and fetched the public key, you can use Gimlet CLI to seal your Gimlet manifest file.

You can deploy Sealed Secrets with Gimlet, follow the [Make Kubernetes an application platform](/docs/make-kubernetes-an-application-platform) tutorial.

## Sealing secrets in the Gimlet manifest file

OneChart has a secret workflow to keep secrets in git in an encrypted form. This requires that you have [Bitnami's Sealed Secrets](https://github.com/bitnami-labs/sealed-secrets) configured in your cluster.

You can ease the management of `SealedSecret` objects with OneChart's `sealedSecrets` field:

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
    tag: 1.0.0
  sealedSecrets:
    secret1: secret-value-to-be-sealed
```

You need to put already sealed values in the Gimlet manifest. To seal your secrets use [Sealed Secret's raw mode](https://github.com/bitnami-labs/sealed-secrets#raw-mode-experimental).

#### Sealing string passwords:

```
echo -n mysupersecretstring | kubeseal  \
  --raw --scope cluster-wide \
  --controller-namespace=infrastructure \
  --from-file=/dev/stdin
```

#### Sealing entire files:

```
kubeseal \
  --raw --scope cluster-wide \
  --controller-namespace=infrastructure \
  --from-file=/home/laszlo/nats-testing-ca.crt
```
