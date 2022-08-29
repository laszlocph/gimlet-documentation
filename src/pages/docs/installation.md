---
title: Installation
description: How to install Gimlet.
---

## Installing Gimlet CLI

#### Linux / Mac

```bash
curl -L "https://github.com/gimlet-io/gimlet/releases/download/cli-v0.16.0/gimlet-$(uname)-$(uname -m)" -o gimlet
chmod +x gimlet
sudo mv ./gimlet /usr/local/bin/gimlet
gimlet --version
```

## Installing Gimlet

### Prerequisites

- A [https://github.com](https://github.com) personal or organization account.
- A Kubernetes cluster.
  - The cluster should be publicly accessible for CertManager and Github webhooks to work.
- A domain name.

### Oneliner

The following oneliner kickstarts the Gimlet installer.

```bash
curl -L -s https://get.gimlet.io | bash -s staging.mycompany.com [my-github-org]
```

The installer initiates a gitops environment and puts Gimlet into its gitops repository. This way Gimlet itself is managed by gitops.

{% callout title="Installing under a Github Organization" %}
The installer creates a Github application under your personal Github account by default. If you set a second parameter for the script, it will create the Github Application under the specified Github Organization.
{% /callout %}

{% callout title="You are not granting any third-party access" %}
The installer will ask for OAuth permissions. Keep in mind that you are granting this access to your own Github Application. You are not granting any third-party nor the Gimlet creators any access.
{% /callout %}

{% callout title="Pleasing OAuth's security measures" %}
The installer needs to run under the same host name as where Gimlet will operate once it is installed.

For this reason

- you will create a temporary host file entry to be able to mimic the currently not yet existing domain name.
This is also true for the port: the installer needs to run on port 443, therefore you have to run the installer as root.

- you will also need to bypass the browser's security defaults. In Firefox you have to click *Advanced > Accept Risk and Continue* in Chrome, you have to type "thisisunsafe" when you are faced with a security warning.
{% /callout %}

### Captioned video walkthrough

If you are unsure during the installation process, you can follow along this captioned walkthrough.

{% video src="https://www.youtube-nocookie.com/embed/HFjv7_08oP0" /%}