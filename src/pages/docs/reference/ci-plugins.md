---
title: 'CI Plugins'
description: |
  Learn how to integrate Gimlet with your CI pipeline
---

Your CI pipeline

- lints and tests the code,
- builds the container image
- then publishes it to a container registry.

Typically you add a deploy step to your CI pipeline at this point. Instead, add the Gimlet CI plugin as the next step.

## Two modes of operation

The CI plugin has two modes of operation

- Either you use Gimlet's [automated deployment settings](docs/deployments/automated-deployments),
- or you can initiate a deploy with the CI plugin. In this mode of operation you can have your CI workflows orchestrating deployment.

### Automated deployment mode

This is the Gimlet CI plugin's default behavior.

In this mode of operation the Gimlet CI plugin notifies Gimlet about the newly built software artifact. And it is the [automated deployment settings](/docs/deployments/automated-deployments) that decide if Gimlet deploys your application or not.

### On-demand deployment mode

If you prefer, you can orchestrate deployments with Gimlet from your CI workflows.

In this mode of operation you initiate explicit on-demand deployments with your CI plugin parameters.

## Github Action

You can find a full functioning example in [gimlet-io/github-actions-integration-sample](https://github.com/gimlet-io/github-actions-integration-sample/blob/main/.github/workflows/build.yml).

### Automated deployment mode

The only configuration you need to do is to add the credentials as secrets on Github.

|       |  |
| ----------- | ----------- |
| GIMLET_SERVER      | The url of your Gimlet deployment, eg: `https://app.gimlet.io`       |
| GIMLET_TOKEN   | A Gimlet API key. Generate one on `/settings` of your Gimlet deployment.       |

```yaml
jobs:
  [...]
  deploy-staging:
    name: 🚀 Deploy / Staging
    runs-on: ubuntu-latest
    needs: "docker-build"
    steps:
    - name: ⬇️ Check out
      uses: actions/checkout@v4
    - name: 🚀 Deploy / Staging
      uses: gimlet-io/gimlet-artifact-shipper-action@v0.9.0
      env:
        GIMLET_SERVER: ${{ secrets.GIMLET_SERVER }}
        GIMLET_TOKEN: ${{ secrets.GIMLET_TOKEN }}
```

#### Wait until the automated deploy is processed

If you want your CI pipeline to wait for the artifact to be processed by Gimlet, and you want to display the results of any automated deploy, add the `WAIT` parameter:

```diff
jobs:
  [...]
  deploy-staging:
    name: 🚀 Deploy / Staging
    runs-on: ubuntu-latest
    needs: "docker-build"
    steps:
    - name: ⬇️ Check out
      uses: actions/checkout@v4
    - name: 🚀 Deploy / Staging
      uses: gimlet-io/gimlet-artifact-shipper-action@v0.9.0
+     with:
+       WAIT: "true"
      env:
        GIMLET_SERVER: ${{ secrets.GIMLET_SERVER }}
        GIMLET_TOKEN: ${{ secrets.GIMLET_TOKEN }}
```

### On-demand deployment mode

Add the credentials as secrets on Github. Specify the app name and the environment you want to deploy to.

|       |  |
| ----------- | ----------- |
| GIMLET_SERVER      | The url of your Gimlet deployment, eg: `https://app.gimlet.io`       |
| GIMLET_TOKEN   | A Gimlet API key. Generate one on `/settings` of your Gimlet deployment.       |
| DEPLOY   | `true`  |
| ENV   | The environment you want to deploy to  |
| APP   | The name of the [deployment](/docs/deployment-settings/deployment-configuration#the-gimlet-manifest) you want to configure |

```yaml
jobs:
  [...]
  deploy-staging:
    name: 🚀 Deploy / Staging
    runs-on: ubuntu-latest
    needs: "docker-build"
    steps:
    - name: ⬇️ Check out
      uses: actions/checkout@v4
    - name: 🚀 Deploy / Staging
      uses: gimlet-io/gimlet-artifact-shipper-action@v0.9.0
      with:
        DEPLOY: "true"
        ENV: "staging"
        APP: "gais"
      env:
        GIMLET_SERVER: ${{ secrets.GIMLET_SERVER }}
        GIMLET_TOKEN: ${{ secrets.GIMLET_TOKEN }}
```

## CircleCI Orb
You can find a full functioning example in [gimlet-io/circleci-integration-sample](https://github.com/gimlet-io/circleci-integration-sample/blob/main/.circleci/config.yml).

### Automated deployment mode

The only configuration you need to do is to add the credentials as secrets.

|       |  |
| ----------- | ----------- |
| GIMLET_SERVER      | The url of your Gimlet deployment, eg: `https://app.gimlet.io`       |
| GIMLET_TOKEN   | A Gimlet API key. Generate one on `/settings` of your Gimlet deployment.       |

```yaml
orbs:
  gimlet: gimlet-io/circleci-orb@5.0.0

workflows:
  master-build:
    jobs:
      - test: {}
      - build_docker:
          requires:
            - test
      - gimlet/gimlet-artifact-push:
          name: 🚀 Deploy / Staging
          requires:
            - build_docker
```

#### Wait until the automated deploy is processed

If you want your CI pipeline to wait for the artifact to be processed by Gimlet, and you want to display the results of any automated deploy, add the `wait` parameter:

```diff
orbs:
  gimlet: gimlet-io/circleci-orb@5.0.0

workflows:
  master-build:
    jobs:
      - test: {}
      - build_docker:
          requires:
            - test
      - gimlet/gimlet-artifact-push:
          name: 🚀 Deploy / Staging
          requires:
            - build_docker
+         wait: true
```

### On-demand deployment mode

Add the credentials as secrets on Github. Specify the app name and the environment you want to deploy to.

|       |  |
| ----------- | ----------- |
| GIMLET_SERVER      | The url of your Gimlet deployment, eg: `https://app.gimlet.io`       |
| GIMLET_TOKEN   | A Gimlet API key. Generate one on `/settings` of your Gimlet deployment.       |
| deploy   | `true`  |
| env   | The environment you want to deploy to  |
| app   | The name of the [deployment](/docs/deployment-settings/deployment-configuration#the-gimlet-manifest) you want to configure |

```yaml
orbs:
  gimlet: gimlet-io/circleci-orb@5.0.0

workflows:
  master-build:
    jobs:
      - test: {}
      - build_docker:
          requires:
            - test
      - gimlet/gimlet-artifact-push:
          name: 🚀 Deploy / Staging
          requires:
            - build_docker
          deploy: "true"
          env: "staging"
          app: "cis"
```

## WoodpeckerCI Plugin
You can find a full functioning example in [gimlet-io/woodpecker-integration-sample ](https://github.com/gimlet-io/woodpecker-integration-sample/blob/main/.woodpecker.yml).

### Automated deployment mode

The only configuration you need to do is to add the credentials as secrets.

|       |  |
| ----------- | ----------- |
| gimlet_server      | The url of your Gimlet deployment, eg: `https://app.gimlet.io`       |
| gimlet_token   | A Gimlet API key. Generate one on `/settings` of your Gimlet deployment.       |

```yaml
pipeline:
  [...]
  deploy-staging:
    image: ghcr.io/gimlet-io/woodpecker-plugin:a2073a6d8b6d8315a16e9485fb57281d730dd51c
    when:
      branch: main
      event: push  
    secrets: [gimlet_server, gimlet_token]
```

#### Wait until the automated deploy is processed

If you want your CI pipeline to wait for the artifact to be processed by Gimlet, and you want to display the results of any automated deploy, add the `wait` parameter:

```diff
pipeline:
  [...]
  deploy-staging:
    image: ghcr.io/gimlet-io/woodpecker-plugin:a2073a6d8b6d8315a16e9485fb57281d730dd51c
    when:
      branch: main
      event: push  
    secrets: [gimlet_server, gimlet_token]
    settings:
+     wait: true
```

### On-demand deployment mode

Add the credentials as secrets on Github. Specify the app name and the environment you want to deploy to.

|       |  |
| ----------- | ----------- |
| gimlet_server      | The url of your Gimlet deployment, eg: `https://app.gimlet.io`       |
| gimlet_token   | A Gimlet API key. Generate one on `/settings` of your Gimlet deployment.       |
| deploy   | `true`  |
| env   | The environment you want to deploy to  |
| app   | The name of the [deployment](/docs/deployment-settings/deployment-configuration#the-gimlet-manifest) you want to configure |

```yaml
pipeline:
  [...]
  deploy-staging:
    image: ghcr.io/gimlet-io/woodpecker-plugin:a2073a6d8b6d8315a16e9485fb57281d730dd51c
    when:
      branch: main
      event: push  
    secrets: [gimlet_server, gimlet_token]
    settings:
      deploy: true
      env: staging
      app: wis
```
