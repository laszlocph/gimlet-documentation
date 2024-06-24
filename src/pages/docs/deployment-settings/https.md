---
title: 'HTTPS'
description: |
  Configure HTTPS certification and add it to your deployed applications with a single click.
---

**You can set up HTTPS certification for your applications by configuring cert-manager. It's an open-source certification issuer specifically made for Kubernetes.**

## Configure Cert-Manager

You can set up cert-manager by navigating to environment settings. You can do this by clicking the Environments button in the menu bar on top, then selecting the environment by clicking on its card.

In the settings, select Ingress tab in the menu bar on the left side, and look for the cert-manager section.

Enable cert-manager, and specify an email address where Let's Encrypt will email you about expiring certificates.

## Turn on HTTPS for Your Application

After you configured cert-manager, you can just use a toggle right above the Deploy button in deployment settings to turn on HTTPS certification any time you deploy an application.
