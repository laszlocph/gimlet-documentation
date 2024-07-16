---
title: 'CLI Installation and Authentication'
description: |
  Here's how you can install Gimlet CLI on Linux and Mac and authenticate to your Gimlet instance.
---

The Gimlet CLI covers most of the capabilities of the GUI.

## Installation

Here's how you can install it on Linux and Mac:

```
curl -L "https://github.com/gimlet-io/gimlet/releases/download/cli-v0.27.0/gimlet-$(uname)-$(uname -m)" -o gimlet
chmod +x gimlet
sudo mv ./gimlet /usr/local/bin/gimlet
```

Available commands:

```
$ gimlet

COMMANDS:
   manifest     Manages Gimlet manifests
   artifact     Manages release artifacts
   release      Manages Gimlet releases
   stack        Bootstrap curated Kubernetes stacks
   environment  Interacts with an environment on the cluster
   sync         Sync files to Kubernetes pods
   help, h      Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --help, -h     show help
   --version, -v  print the version
```

## Authentication

Gimlet CLI has numerous offline features (like [rendering manifests locally](/docs/cli/cli-use-cases#render-manifests-locally)) but it also needs access to the Gimlet API for features like releasing, rollback or [deleting applications](/docs/cli/cli-use-cases#deleting-applications).

Features that need access to the API take `--server` and `--token` parameters.

```
    --server http://gimlet.mycompany.com \
    --token xxxxxxxxxxx
```

But you can also make the access permanent by adding the `GIMLET_SERVER` and `GIMLET_TOKEN` environment variables permanent in your shell.

You can find an example for that on the `/cli` endpoint of your Gimlet instance. [https://app.gimlet.io/cli](https://app.gimlet.io/cli) on Gimlet Cloud.
