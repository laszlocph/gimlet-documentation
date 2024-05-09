# Deployment Configuration

You store Gimlet manifest files under the `.gimlet` folder of your application source code repository. One file per environment.

The following example shows two files, one for staging, and one for production.

They only differ in the replica count. However, you can have a completely unique set of configs in your envs. The manifest files control it all.

```
# .gimlet/staging.yaml
app: myapp
env: staging
namespace: my-team
chart:
  repository: https://chart.onechart.dev
  name: onechart
  version: 0.32.0
values:
  replicas: 1
  image:
    repository: myapp
    tag: 1.1.0
  ingress:
    host: myapp.staging.mycompany.com
    tlsEnabled: true
```

```
# .gimlet/production.yaml
app: myapp
env: production
namespace: my-team
chart:
  repository: https://chart.onechart.dev
  name: onechart
  version: 0.32.0
values:
  replicas: 2
  image:
    repository: myapp
    tag: 1.1.0
  ingress:
    host: myapp.mycompany.com
    tlsEnabled: true
```

## Editing deployment configs

### On the dashboard

The _Repository_ view shows a single repository. You can see the list of git commits at the bottom of the screen and the list of your deployment environments on the top of the screen.

Pick the environment config you want to edit, and click the cog wheel icon.

![Step 1 screenshot](https://images.tango.us/public/screenshot_2119e576-2300-4058-adec-f61e28dae01d.png?crop=focalpoint&fit=crop&fp-x=0.2518&fp-y=0.3092&fp-z=3.1715&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1960)

When you hit save, the changes you made are backed by a git commit. This is ClickOps 🙌

![Step 12 screenshot](https://images.tango.us/public/edited_image_77a77279-4eb5-4d56-be72-892612f769e6.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&fp-z=1.0000&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1878)

You can inspect the diff

Every time you save the configuration, you can inspect the diff of the environment configuration file in Gimlet.
