---
title: Deploy your first app to Kubernetes with Gimlet CLI
description: In this tutorial, you will deploy your application to Kubernetes without writing lengthy deployment manifests.
---

In this tutorial, you will deploy your application to Kubernetes without writing lengthy deployment manifests.
You will use the Gimlet CLI for this task.

This is the command line variation of the [Deploy your first app to Kubernetes](/docs/deploy-your-first-app-to-kubernetes) tutorial that used the Gimlet Dashboard to achieve this task. Skip this page if you prefer to use the dashboard.

---

## Prerequisites
- A running Gimlet installation.
- An application hosted on Github.
- A Github Action workflow, or CircleCI pipeline, that builds a container image from your source code.

## Install the Gimlet CLI

```bash
curl -L https://github.com/gimlet-io/gimlet/releases/download/cli-v0.17.0/gimlet-$(uname)-$(uname -m) -o gimlet
chmod +x gimlet
sudo mv ./gimlet /usr/local/bin/gimlet
gimlet --version
```

## Authenticate to Gimlet

After signing in to Gimlet, navigate to your profile settings

![Step 1 screenshot](https://images.tango.us/public/edited_image_2d7c9021-62ef-45da-9d9b-156c35db93db.png?crop=focalpoint&fit=crop&fp-x=0.7079&fp-y=0.2030&fp-z=3.0000&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A926)

Run the code snippet located in * Profile > Gimlet CLI access* to configure the CLI to access the Gimlet API server.

![Step 2 screenshot](https://images.tango.us/public/edited_image_a832ccf5-34c3-4c6c-baf8-c774a3dd0472.png?crop=focalpoint&fit=crop&fp-x=0.4205&fp-y=0.6813&fp-z=2.0000&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1279)

## Create the Gimlet environment manifest

Gimlet captures the deployment configuration in your source code repository. The Gimlet environment manifest files that are stored in the `.gimlet` folder, each capture the complete configuration of a given environment. It is a declarative format to configure which Helm chart, what chart version, and what parameters should be deployed to an environment.

In this tutorial, you are going to deploy your application to your testing environment. The tutorial will deploy the `gimlet-io/demo-app` application to the `staging` environment, you can pick your testing environment from the configured environments on the Gimlet dashboard's *Environments* tab. Replace the values to match your setup.

Start the environment configuration by creating the Gimlet environmnet manifest file first.

```bash
mkdir .gimlet/

gimlet manifest create \
  --chart onechart/onechart \
  --env staging \
  --app demo-app \
  --namespace staging \
  > .gimlet/staging-demo-app.yaml
```

This will create the environment file, without any deployment configuration specific to your app:

- it holds the application's name, environment, and namespace
- the Helm chart that is used as the application deployment template, and its version
- the Helm cahrt values, that are now empty
- and some place holders should you want to use Kustomize later for post porcessing, or if you want to add raw yamls into your config

```yaml
---
app: myapp
env: staging
namespace: my-team
chart:
  repository: https://chart.onechart.dev
  name: onechart
  version: 0.38.0
values: {}
strategicMergePatches: ""
json6902Patches: []
manifests: ""
```

{% callout title="What namespace to deploy to" %}
Namespaces are arbitrary groupings of deployed resources on Kubernetes. They are really name spaces, you can have identically called resources in different namespaces, they will not collide.

Because namespaces are an arbitrary grouping, your team probably has a preferred namespace structure that serve you well.

At Gimlet, as a rule of thumb, we use the environment name as namespace. For this tutorial, follow this practice and set the namespace as staging.
{% /callout %}

## Configure the deployment

Gimlet defaults to the [OneChart Helm chart](/docs/onechart-reference) for web application deployment. It captures the most common usecases of webaplications, so you don't have to maintain your own Helm chart.

To tailor the deployment configuration of your application, you can manualy edit the environment file's `values` section as it is really nothing more than the values.yaml file for Helm charts, but for convenience, Gimlet starts a configuration page with the following command:

```bash
gimlet manifest configure -f .gimlet/staging-demo-app.yaml

👩‍💻 Configure on http://127.0.0.1:24349
👩‍💻 Close the browser when you are done
```

{% callout title="Want to know more about Helm?" %}
Check out our [SANE Helm guide](/concepts/the-sane-helm-guide).
{% /callout %}

### Set the image you want to deploy

As a prerequisite, your CI process already builds a Docker image from your application source code. And it follows a tagging strategy too.

The demo-app uses the Github container registry (ghcr.io) to host the docker image, and uses the repository name as image name. Images are tagged by the hash of the commit that kicked off the CI build

Set the image repository and tag on the configration screen. This tutorial sets `ghcr.io/gimlet-io/demo-app` and `{{ .SHA }}` respectively.

![Step 6 screenshot](https://images.tango.us/public/edited_image_9afb9f33-b1bb-4712-819c-5fd44b94e613.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&fp-z=1.0000&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=2505%3A675)

{% callout title="If you don't have a docker image built" %}
You can still continue this tutorial, use the CNCF's testing image, `ghcr.io/podtato-head/podtatoserver` with the `v0.1.1` tag. It runs a webserver on port `9000`.
{% /callout %}

### Watch out for the container port
Time to set the port your application is serving traffic on. It is a common mistake that developers not setting the right port in the deployment configuraton and when they try to open the deployed app in the browser, they get a HTTP 503.

The demo-app serves traffic on port 9000. Set your own port.

### Set the domain name for the deployment

With the image name, tag and container port set, the final thing to set is the url of your application.

Gimlet environments are served with wildcard DNS entries, so `$app.$env.yourcompany.com` will be routed to the right application.

1. Set the _Host Name_ according to the naming convention. We set `demo-app.staging.turbopizza.net`
2. Enable the HTTPS toogle. A certificate from Let's Encrypt will be provisioned for you.
3. Add an annotation `kubernetes.io/ingress.class: "nginx"` to match your configuration with the right Ingress Controller in your environment.
4. Add an annotation `cert-manager.io/cluster-issuer:"letsencrypt"` to tell Cert Manager to provision an SSL certificate

![Step 11 screenshot](https://images.tango.us/public/edited_image_06d4a2f5-b551-4c5d-b19a-d7eb010d71e4.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&fp-z=1.0000&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=2442%3A1229)

### Save your deployment configuration

When you are done configuring, close the browser tab, and the values you set are written in the `.gimlet/staging-demo-app.yaml` file.

Inspect the file, commit and push it to git.

## Integrate CI with Gimlet

Your CI workflow builds a container image at the end of the build.

Gimlet needs to know about these releasable artifacts so it can orchestrate the releases. For this purpose let's add a step in your CI workflow and ship the artifact information to Gimlet.

### Integrate Github Actions

In order to integrate Github Actions with Gimlet, you have to ship artifact information to Gimlet once your deploy artifact is built. Your deploy artifact is your built container image and you do the shipping with the Gimlet Artifact Shipper Action. It ships meta information of the container image and the build process.

To ship the artifact information, add an additional step in your job definition, using the Gimlet Artifact Shipper Action. Place it in the workflow where you've built the container image. Typically righ after the image build step.

In this tutorial the build workflow looks like the following once the artifact shipper action is added:

```yaml
name: Build
on:
  push:
    branches:
      - '*'
jobs:
  build:
    name: 👷 Build
    runs-on: ubuntu-latest
    steps:
    - name: ⬇️ Check out
      uses: actions/checkout@v1
      with:
        fetch-depth: 1
    - name: 🐋 Set up Docker Buildx
      uses: docker/setup-buildx-action@v1
    - name: Login to GitHub Container Registry
      uses: docker/login-action@v1
      with:
        registry: ghcr.io
        username: ${{ github.repository_owner }}
        password: ${{ secrets.PAT }}
    - name: 🐋 Build and push docker image
      uses: docker/build-push-action@v2
      with:
        context: .
        file: Dockerfile
        platforms: linux/amd64
        push: true
        tags: |
          ghcr.io/gimlet-io/demo-app:${{ github.sha }}
    - name: Gimlet Artifact Shipper Action
      uses: gimlet-io/gimlet-artifact-shipper-action@v0.7.1
      env:
        GIMLET_SERVER: ${{ secrets.GIMLET_SERVER }}
        GIMLET_TOKEN: ${{ secrets.GIMLET_TOKEN }}
```


### Integrate CircleCI

In order to integrate CircleCI with Gimlet, you have to ship artifact information to Gimlet once your deploy artifact is built. Your deploy artifact is your built container image and you do the shipping with the Gimlet CircleCI Orb. It ships meta information of the container image and the build process.

To ship the artifact information, add an additional step in your workflow definition, using the Gimlet CircleCI Orb. Place it in the workflow where you've built the container image. Typically righ after the image build job.

In this tutorial the build workflow looks like the following once the artifact shipper job is added:

```yaml
version: 2.1
orbs:
  gimlet: gimlet-io/circleci-orb@3.0.1
workflows:
  build:
    jobs:
      - build_and_test:
          filters:
            branches:
              only:
                - main
      - build_docker_image:
          context:
            - GithubCR
          filters:
            branches:
              only:
                - main
          requires:
            - build_and_test
      - gimlet/gimlet-artifact-push:
          context:
            - Gimlet
          requires:
            - build_docker_image
```

The `Gimlet` [Context](https://circleci.com/docs/contexts) holds two environment variables in this example: `GIMLET_SERVER` and `GIMLET_TOKEN`.

### Gimlet API credentials

For the shipper to ship artifact information (remember it is container and CI metadata) it needs access to the Gimlet API. You need to set two secrets `GIMLET_SERVER` and `GIMLET_TOKEN`.

- Set `GIMLET_SERVER` to https://gimletd.<<yourcompany.com>>
- Set `GIMLET_TOKEN` to a Gimlet API key

To create a Gimlet API key navigate to *Profile* > *Create a new user* in Gimlet and add a user for this integration.

![Step 2 screenshot](https://images.tango.us/public/screenshot_f01e4201-f15b-4562-8201-4230c685169f.png?crop=focalpoint&fit=crop&fp-x=0.4961&fp-y=0.8102&fp-z=1.2375&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1960)


## Deploy

Once you added the artifact shipper in your CI workflow, every commit that has built an artifact will be deployable in Gimlet.

### Listing the releasable artifacts

To see all the releasable versions, run 

```bash
gimlet artifact list --repo gimlet-io/demo-app

```

And see all the releasable versions:

```
gimlet-io/demo-app-4d6db203-5a18-471e-8e58-ad9e6402d1cf
a23bc8ee - Gimlet-CI integration (4 minutes ago) Laszlo Fogas
gimlet-io/demo-app@main https://github.com/gimlet-io/demo-app/commit/a23bc8ee3a4dbf6242d51b812a1c57eb9a78e43d
  demo-app -> staging

[...]
```

- `gimlet-io/demo-app-4d6db203-5a18-471e-8e58-ad9e6402d1cf` is the artifact id in the above example
- `a23bc8ee - Gimlet-CI integration (4 minutes ago) Laszlo Fogas` is the commit that can be deployed
- `demo-app -> staging` is the available target environment

{% callout title="Can't see a the commit you want to deploy?" %}
A commit only becomes available for deployment if the CI has shipped an artifact for it. If you don't see the commit, check your CI workflow and see if the shipper was successful.
{% /callout %}

### Releasing an artifact

Once you identified the artifact you want to release, issue the following Gimlet CLI command:

```
gimlet release make \
  --env staging \
  --artifact gimlet-io/demo-app-4d6db203-5a18-471e-8e58-ad9e6402d1cf
```

### Tracking releases

You can track the deploy with

```bash
gimlet release track gimlet-io/demo-app-4d6db203-5a18-471e-8e58-ad9e6402d1cf
```

Or query the audit log:

```
gimlet release list --env staging --app demo-app
```
