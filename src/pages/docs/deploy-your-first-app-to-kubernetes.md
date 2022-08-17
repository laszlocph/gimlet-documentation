---
title: Deploy your first app to Kubernetes
description: In this guide, you will deploy your application to Kubernetes without writing lengthy deployment manifests.
---

In this guide, you will deploy your application to Kubernetes without writing lengthy deployment manifests.
You will use the Gimlet dashboard for this task.

{% callout title="If you prefer the command line" %}
You can also [perform this tutorial using the Gimlet CLI](/docs/deploy-your-first-app-to-kubernetes-with-gimlet-cli). It has the same power as the Gimlet dashboard.
{% /callout %}

---

## Prerequisites
- A running Gimlet installation. If you are the cluster administrator, [install Gimlet](/docs/installation) here.
- An application hosted on Github.
- A Github Action workflow, or CircleCI pipeline, that builds a container image from your source code.

## Navigate to your repository in the Gimlet dashboard

![Step 1 screenshot](https://images.tango.us/public/screenshot_1e63095f-b057-4e58-8722-fdfd572c5b7f.png?crop=focalpoint&fit=crop&fp-x=0.5053&fp-y=0.2449&fp-z=2.6872&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1960)

After signing in to Gimlet, you land on the _Repositories_ view.

Locate the git repository you would like to deploy. This tutorial deploys the _gimlet-io/demo-app_ to demonstrate the process.
![Step 2 screenshot](https://images.tango.us/public/edited_image_d405220e-3b26-469a-a2a6-0a0aaa25246e.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&fp-z=1.0000&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=2559%3A1071)

## Configure the deployment

The _Repository_ view shows a single repository. You can see the list of git commits at the bottom of the screen and the list of your deployment environments on the top of the screen.

There are three configured deployment environments in this tutorial: staging, preview and production, and this tutorial is going to deploy _gimlet-io/demo-app_ to the staging environment.

The list of environments may differ for you, depending what deployment environments your team has. Pick one that is used for testing and click on _Deploy this repository to Staging_. This will navigate you to the deployment configuration screen.
![Step 3 screenshot](https://images.tango.us/public/screenshot_b9b5f387-d557-4ce7-87ea-5b5ccea51f07.png?crop=focalpoint&fit=crop&fp-x=0.4961&fp-y=0.4423&fp-z=1.2439&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1960)


### Set the namespace

Namespaces are arbitrary groupings of deployed resources on Kubernetes. They are really name spaces, you can have identically called resources in different namespaces, they will not collide.

Because namespaces are an arbitrary grouping, your team probably has a preferred namespace structure that serve you well.

At Gimlet, as a rule of thumb, we use the environment name as namespace. For this tutorial, follow this practice and set the namespace as staging.
![Step 4 screenshot](https://images.tango.us/public/edited_image_fddbc18e-960e-4038-a6ce-40455168747e.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&fp-z=1.0000&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=2539%3A793)


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

When you hit save, a file will be placed in your application source code. It follows the convention of `.gimlet/$env-$app.yaml` so in our case `.gimlet/staging-demo-app.yaml` will hold the configuration that we just set in the UI.

Hit *Save* now. The changes you make on the dashboard are always backed by a git commit. This is ClickOps 🙌

![Step 12 screenshot](https://images.tango.us/public/edited_image_77a77279-4eb5-4d56-be72-892612f769e6.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&fp-z=1.0000&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1878)

{% callout title="You can inspect the diff" %}
Every time you save the configuration, you can inspect the diff of the environment configuration file in Gimlet.
{% /callout %}


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

![Step 1 screenshot](https://images.tango.us/public/edited_image_a6e4652d-8775-4353-87e5-5ff4bc1b276b.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&fp-z=1.0000&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=2405%3A255)

{% callout title="Can't see a deploy button on your commit?" %}
The deploy button becomes available for commits that CI has shipped an artifact for. If you don't see the deploy button, check your CI workflow and see if the shipper was successful.
{% /callout %}


To make an ad-hoc deployment, let's finish this tutorial by clicking the *Deploy* dropdown on the latest commit and deploy the commit on staging.


The rollout widget displays references to the gitops commits that Gimlet made to fulfill your deploy request, 

![Step 3 screenshot](https://images.tango.us/public/screenshot_037a06c8-0ea1-45ee-8137-312a920d59c7.png?crop=focalpoint&fit=crop&fp-x=0.8464&fp-y=0.1156&fp-z=2.0741&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1960)

and you can see your newly deployed application on the Gimlet dashboard:

![Step 4 screenshot](https://images.tango.us/public/edited_image_6448f571-142f-4d34-942a-8030b74d4aab.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&fp-z=1.0000&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=2508%3A737)
