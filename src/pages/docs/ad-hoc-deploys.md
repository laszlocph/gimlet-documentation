---
title: Ad-hoc deploys
description: Once you added the Gimlet deploy step in your CI workflow, every commit becomes deployable in Gimlet.
---

Once you [added the Gimlet deploy step in your CI workflow](/docs/deploy-your-first-app-to-kubernetes#integrate-ci-with-gimlet), every commit becomes deployable in Gimlet - given that CI has built the commit and the workflow reached the Gimlet step.

This is possible as in the Gimlet step CI passed a large chunk of metadata (called the Gimlet artifact) to the Gimlet API, and Gimlet knows everything about the commit to perform an ad-hoc deploy.

## Making ad-hoc deploys from the dashboard

![Step 1 screenshot](https://images.tango.us/public/edited_image_a6e4652d-8775-4353-87e5-5ff4bc1b276b.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&fp-z=1.0000&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=2405%3A255)

To make an ad-hoc deployment, click the *Deploy* dropdown on a commit and pick an environment to deploy to.

The rollout widget displays references to the gitops commits that Gimlet made to fulfill your deploy request, 

![Step 3 screenshot](https://images.tango.us/public/screenshot_037a06c8-0ea1-45ee-8137-312a920d59c7.png?crop=focalpoint&fit=crop&fp-x=0.8464&fp-y=0.1156&fp-z=2.0741&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1960)

and you can see your newly deployed application on the Gimlet dashboard:

![Step 4 screenshot](https://images.tango.us/public/edited_image_6448f571-142f-4d34-942a-8030b74d4aab.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&fp-z=1.0000&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=2508%3A737)

{% callout title="Can't see the deploy button on your commit?" %}
The deploy button becomes available for commits that CI has ran the Gimlet step for. If you don't see the deploy button, check your CI workflow and see if the Gimlet step was successful.
{% /callout %}

## Making ad-hoc deploys with the CLI

Once you added the Gimlet step in your CI workflow, every commit becomes deployable in Gimlet.

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
A commit only becomes available for deployment if the CI has shipped an artifact for it. If you don't see the commit, check your CI workflow and see if the Gimlet step was successful.
{% /callout %}

### Releasing an artifact

Once you identified the artifact you want to release, issue the following Gimlet CLI command:

```
$ gimlet release make \
  --env staging \
  --artifact gimlet-io/demo-app-4d6db203-5a18-471e-8e58-ad9e6402d1cf

🙆‍♀️ Release is now added to the release queue with ID fc495037-523b-44fd-a1ff-d68c828ee361                                                                    
Track it with:                                                                                                                                                
gimlet release track fc495037-523b-44fd-a1ff-d68c828ee361
```

### Tracking releases

You can track the deploy with

```bash
gimlet release track fc495037-523b-44fd-a1ff-d68c828ee361
```

Or query the audit log:

```
gimlet release list --env staging --app demo-app
```
