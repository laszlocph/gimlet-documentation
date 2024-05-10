# Secrets

Gimlet utilizes Sealed Secrets under the hood to encrypt and manage your secrets. It's open-source, you can take a better look at it [here](https://github.com/bitnami-labs/sealed-secrets).

## Sealing Secrets In The Dashboard

Gimlet UI has a write only secret workflow where you can add clear text values and Gimlet seals the value with the target cluster's public key.

![Sealing secrets with Gimlet](https://gimlet.io/seal.png)
