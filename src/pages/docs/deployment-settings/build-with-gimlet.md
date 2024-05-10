# Build With Gimlet

You can build any source code with Gimlet, depending on what kind of template you're using within Gimlet. These are the two options:

- **Web Application Template:** Deploy multiple containers. Several image configuration options are available:
    - Static tag images
    - Dynamic tag images
    - Automatic image building
    - Build from Dockerfile
- **Static Website Template:** Static website hosted in an Nginx container. No image options are available.

## Helm Charts

Templates in Gimlet are made with Helm charts under the hood.

Helm is a Kubernetes package manager that are used to simplify deployments. Helm charts consist of manifests and templates. Manifests define resources and the values that are applied in the templates of the Helm chart.

When you deploy your application with Gimlet, it generates a Helm chart using OneChart, an open-source generic use chart made by us. You can find out more about OneChart in the [reference]() or its [GitHub page](https://github.com/gimlet-io/onechart).

## Custom Templates

You're also able to add custom charts as templates...
