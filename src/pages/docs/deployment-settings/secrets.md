---
title: 'Secrets'
description: |
  You can add encrypted secrets to applications you deploy with Gimlet.
---

Gimlet utilizes Sealed Secrets under the hood to encrypt and manage your secrets. It's open-source, you can take a better look at it [here](https://github.com/bitnami-labs/sealed-secrets).

## Adding Secrets to Applications

Gimlet has a write only secret workflow where you can add clear text values. After adding those, Gimlet seals the value with the target cluster's public key.

If you'd like to add secrets to an app, deploy it first, then click the Write Configuration to Git button to save the deployment. When configuration is saved, you'll be directed to the deployment status screen. Click the (...) or meatballs menu in the top right corner of the card that belongs to the deployment and click the Edit button.

In the left side of the settings, select Secrets. To create a new secret, click the `+` button, where you can specify the secret variable's name and paste the secret next to it. When you're done, click the Encrypt button next to it.

After encryption is done, click the Save button on top to apply the secret to the application.

## Turning Off Secret Encryption

Secret encryption is turned on by default. In case you'd like to turn it off, you can do so by navigating to environment settings. Select the Environments button on top, then select the environment where you'd like to disable secret encryption.

In the environment settings, choose the Secrets option on the left side. Look for the Encrypted Secrets section, and use the toggle to turn it off.
