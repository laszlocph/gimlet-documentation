---
title: 'HTTPS'
description: |
  Configure HTTPS certification and add it to your deployed applications with a single click.
---

**You can set up HTTPS certification for your applications by configuring cert-manager. It's an open-source certification issuer specifically made for Kubernetes.**

HTTPS is enabled by default for applications deployed with Gimlet, but you can configure it with custom settings, as well.

![Cert-manager settings in Gimlet](docs/screenshots/https/gimlet-io-https-cert-manager-lets-encrypt.png)

## Configure Cert-Manager

You can set up cert-manager by navigating to environment settings. You can do this by clicking the Environments button in the menu bar on top, then selecting the environment by clicking on its card.

In the settings, select Ingress tab in the menu bar on the left side, and look for the cert-manager section.

Enable cert-manager, and specify an email address where Let's Encrypt will email you about expiring certificates.

## Turn on HTTPS for Your Application

You can use the HTTPS toggle in the deployment settings to turn on HTTPS certification any time you deploy an application.

You can access settings that belong to a deployment by clicking the (...) or meatballs menu of the deployment and click the **Edit** button. When you're in the settings, 

![HTTPS toggle in the deployment settings of an application deployed with Gimlet.](docs/screenshots/https/gimlet-io-https-deployment-setting.png)
