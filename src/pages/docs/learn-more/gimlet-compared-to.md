# Gimlet Compared to...

This page draws comparisons with common tools like Flux, ArgoCD, Terraform and more.

Also make sure to read the [concepts](https://gimlet.io/docs/concepts).
## Platforms
### Vercel

Vercel is one of the most popular platforms to host frontend applications. It's easy to use with great UX. However, it doesn't support containerized runtimes.

Gimlet is designed to offer Vercel-like experience of hosting all kinds of applications with fixed rates, as well. Deployments take place on Kubernetes clusters, to prevent vendor lock-in.

### Netlify

Netlify is another popular platform to host containerized frontend apps. Compared to Vercel, it offers more flexibility for commercial use.

Gimlet compared to Netlify is more flexible as you can deploy any application from a git repository and several container registries.

### Fly.io

Fly.io is popular for providing high-availability hosting services of containerized applications. It supports its own container registry.

Gimlet is suitable for users looking for scalable hosting with testing capabilities attached, fixed pricing and multiple container registries supported.

### Railway

Railway is a platform that offers a wide range of deployment capabilities for all kinds of applications and utilizes their in-house Nixpacks tool to build images. Railway supports Docker Hub and GitHub Container Registry.

Compared to Railway, Gimlet supports **multiple registries, including...** and deploys applications to Kubernetes clusters to leave room for migrating services.

### Render

Render is a deployment platform that covers the most common use cases of deploying applications. It offers deployments to Kubernetes clusters hosted by Render.

While Gimlet offers straightforward, fixed pricing, Render applies some usage based rates. You can also connect any Kubernetes cluster to Gimlet.

### In-house developer platforms

There is great effort put into internal developer platform building by teams everywhere. While the perception is that companies need to tailor every bit of the developer experience, these efforts often result in lookalike tools that are often not polished.

While Gimlet cannot compete with well-funded and well-run platform teams serving unique needs, the tool is designed to cover the most common deployment use cases based on real world use cases from several industries.

## Technologies

### Kubernetes

Kubernetes is the underlying orchestration platform of Gimlet. We chose to adopt Kubernetes for a couple of reasons.

- **Scalability:** It's a cliche because it's true.
- **Reduced complexity:** The most common use cases of Kubernetes aren't any more complex than Docker or maintaining a VPS.
- **Widely adopted:** Kubernetes have been considered the de-facto orchestration platform for a while.

Therefore Gimlet and Kubernetes coexist. You can't use Gimlet without Kubernetes, but Kubernetes can't be used without Gimlet. What Gimlet does is that it abstracts away a bunch of complexity from Kubernetes that you'll never touch.
### Jenkins

Jenkins is a CI/CD automation server that's been considered the go-to CI/CD tool of corporate users.

While Gimlet offers overlapping capabilities of auto-deployments, Gimlet caters to users who are more familiar with contemporary UX approaches.
### GitHub Actions

GitHub Actions is the go-to CI/CD platform utilizing yamls to automate workflows. It can be tailored to any use case.

Gimlet can be integrated with GitHub, therefore Gimlet users can automate deployments of their applications managed in GitHub.
### Flux and ArgoCD

Flux and ArgoCD are both gitops controllers that apply yaml from a git repository onto Kubernetes clusters.

They both have building blocks to construct basic configuration management and deployment workflows but you have to extend them with higher level features. This is where Gimlet comes into the picture.

Gimlet builds heavily on Flux and extends it in multiple ways:

- Gimlet helps with yaml authoring:
    - Introduces standardized application templates,
    - That can be discovered and edited on a GUI.
- Gimlet provides a usable release history as the gitops repository log does that only in theory.
- An overview of what application code commit was deployed and when on the cluster, not just the desired state that may or may not be applied successfully.
- Rollback workflows and preview applications.
- Cluster component management.

### Helm and Kustomize

Helm and Kustomize are the de-facto standards in Kubernetes manifest management. Gimlet helps with yaml authoring and introduces standardized application templates, it also does many other things.

Gimlet uses Helm heavily, but supports Kustomize overlay patches as well. If you are into Helm or Kustomize, Gimlet will only extend their power.

### Terraform

Terraform is a well known infrastructure as code tool. Teams use it extensively to provision cloud infrastructure.

While Terraform is able to provision Kubernetes API resources as well, its responsibility often ends when the cluster is created and a gitops controllers is installed. This is where Gimlet comes to the picture.

Gimlet operates on top of the Kubernetes API and does not care about how the cluster came to life. It extends the building blocks that Flux and ArgoCD, the two best known gitops controller provide. So Gimlet and Terraform differs in scope, and can be both used at the same time.

### Backstage

Backstage is an open-source developer portal made by Spotify. It's considered one of the most popular tools in the platform scene as it's heavy on the DIY approach.

That being said, barrier to entry of Backstage is relatively high as even the most basic configuration requires coding in Typescript. Community plugins also need to be integrated into your Backstage instance.

Gimlet follows a different approach to provide a shortcut to teams early in their platform journey. Its goal is to have essential deployment capabilities packaged into one comprehensive tool.
