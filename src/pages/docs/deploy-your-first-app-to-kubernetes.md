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

When you hit save, a file will be placed in your application source code. It will hold the configuration that we just set on the UI and will be named `.gimlet/staging-demo-app.yaml` as it follows the `.gimlet/$env-$app.yaml` naming convention.

Hit *Save* now. The changes you make on the dashboard are always backed by a git commit. This is ClickOps 🙌

![Step 12 screenshot](https://images.tango.us/public/edited_image_77a77279-4eb5-4d56-be72-892612f769e6.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&fp-z=1.0000&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1878)

{% callout title="You can inspect the diff" %}
Every time you save the configuration, you can inspect the diff of the environment configuration file in Gimlet.
{% /callout %}

## Integrate CI with Gimlet

CI pipelines lint, test, build and then deploy applications.

Gimlet [assumes the gitops deployment tasks](/concepts/integration-to-ci) from your CI pipeline and runs them centralized. CI pipelines can call the Gimlet API to deploy, no need to script the deploy in CI.

### Integrate Github Actions

In order to integrate Github Actions with Gimlet, you need to add the Gimlet Github Action in your CI pipeline to deploy your application.

You typically add this after your docker image build step, where you would normally place the deploy step in your pipeline.

Gimlet doesn't take control of your CI workflow, you can keep oragnizing your CI pipelines as you desire and call Gimlet's API whenever you need to perform a gitops operation.

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
    - name: 🚀 Deploy / Staging
      uses: gimlet-io/gimlet-artifact-shipper-action@v0.8.0
      with:
        DEPLOY: "true"
        ENV: "staging"
        APP: "demo-app"
      env:
        GIMLET_SERVER: ${{ secrets.GIMLET_SERVER }}
        GIMLET_TOKEN: ${{ secrets.GIMLET_TOKEN }}
```

### Integrate CircleCI

In order to integrate with CircleCI, you need to add the Gimlet CircleCI Orb in your CI pipeline to deploy your application.

You typically add this after your docker image build step, where you would normally place the deploy step in your pipeline.

Gimlet doesn't take control of your CI workflow, you can keep oragnizing your CI pipelines as you desire and call Gimlet's API whenever you need to perform a gitops operation.

```yaml
version: 2.1
orbs:
  gimlet: gimlet-io/circleci-orb@4.0.0

workflows:
  master-build:
    jobs:
      - test: {}
      - build_docker:
          requires:
            - test
      - gimlet/gimlet-artifact-push:
          name: 🚀 Deploy / Staging
          context:
            - Gimlet
          deploy: "true"
          env: "staging"
          app: "demo-app"
          requires:
            - build_docker
```

### Obtain Gimlet API credentials

For the CI deploy steps to work, you need to provide access to the Gimlet API. You need to set two secrets `GIMLET_SERVER` and `GIMLET_TOKEN`.

- Set `GIMLET_SERVER` to https://gimletd.<<yourcompany.com>>
- Set `GIMLET_TOKEN` to a Gimlet API key

To create a Gimlet API key navigate to *Profile* > *Create a new user* in Gimlet and add a user for this integration.

![Step 2 screenshot](https://images.tango.us/public/screenshot_f01e4201-f15b-4562-8201-4230c685169f.png?crop=focalpoint&fit=crop&fp-x=0.4961&fp-y=0.8102&fp-z=1.2375&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1960)

## Make a dummy commit to see it deploy

Push a dummy commit once you made the changes to your CI pipeline.

CI will call the Gimlet API, and Gimlet will make a gitops based deploy of your application. You can track the CI step output for details.

```
Deploying..
Deployment ID is: ff11eb64-2f94-49c3-ac07-e9274735096c
👉 Request (ff11eb64-2f94-49c3-ac07-e9274735096c) is new 
	⏳ The release is not processed yet...
👉 Request (ff11eb64-2f94-49c3-ac07-e9274735096c) is processed 
	📖 demo-app -> staging, gitops hash 176da9babbd7647fc68f3c5268a86a1d5fc6669a, status is NotReconciled
👉 Request (ff11eb64-2f94-49c3-ac07-e9274735096c) is processed 
	📖 demo-app -> staging, gitops hash 176da9babbd7647fc68f3c5268a86a1d5fc6669a, status is DependencyNotReady
👉 Request (ff11eb64-2f94-49c3-ac07-e9274735096c) is processed 
	📖 demo-app -> staging, gitops hash 176da9babbd7647fc68f3c5268a86a1d5fc6669a, status is ReconciliationSucceeded
```

Gimlet processed the deploy reuqest and generated a gitops commit with hash `176da9babbd7647fc68f3c5268a86a1d5fc6669a`. Then the CI step waited until the gitops commit was applied on the cluster by Flux:

You should see the deployed resources in Kubernetes, and you can also cross-reference the generated gitops commit (With hash `176da9babbd7647fc68f3c5268a86a1d5fc6669a` in the logs above) in the gitops repository.

{% callout title="Can't see the deployed application?" %}
You can [debug](/docs/bootstrap-gitops-automation-with-gimlet-cli#verify-the-gitops-automation) the gitops automation to see what went wrong.
{% /callout %}


