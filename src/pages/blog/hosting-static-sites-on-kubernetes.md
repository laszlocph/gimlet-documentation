---
layout: post
title: Hosting static sites on kubernetes
date: "2023-04-08"
image_social: agyuvalverebre.jpg
description: "There is a meme here somewhere. But as kubernetes is becoming *the* deployment platform, there are legitimate cases to deploy your static site on it. We will show you how to."
---

{% tweet link="https://twitter.com/memenetes/status/1587127455495618563" %}
{% /tweet %}

There is a meme here somewhere.

But as kubernetes is becoming *the* deployment platform, there are legitimate cases to deploy your static site on it. We show you a simplified way to do it.

But first, let's review your options outside of kubernetes.

## Deployment options outside of kubernetes

It is a fact that there are simpler deployment options for static websites and single page web apps than kubernetes. This section is an introduction to such options.

### Netlify

Netlify is a vertically integrated solution. You provide your source code from git via OAuth, then customize the build command. Netlify in turn deploys your application with CDN and SSL. It sets a new standard in static site deployment.

#### Pros
- Easy to get started
- Only need to provide your source code from git and your build command
- No need for CI scripts
- Built-in SSL, CDN
- Preview deployments

#### Cons
- Since it is easy to get started with, Netlify often becomes part of shadow IT, operating outside of your compliance processes.

### Github Pages
Github Pages has a well integrated workflow to source code management with simplified configuration paths. You build assets with CI, then place them according to the conventions. CDN and SSL are automatically configured.

#### Pros
- Integrated into source code management.
- Simplified configuration paths.

#### Cons
- Requires a CI script
- Somewhat limited options

### Amazon S3, cloud buckets

Another popular solution to deploy static sites is to use cloud buckets. You upload the built assets to a bucket, enable website hosting setting, then further configure the bucket to enable SSL encryption.

#### Pros
- Highly scalable
- Same provider as with other cloud resources

#### Cons
- Considered as a go to option, but it does require scripting and configuration work
- Access configuration is somewhat cryptic
- SSL options often not as streamlined as with Let's Encrypt
- CDN often configured separately

![Noooooo](/noooooo.jpeg)

## Reasons to deploy static sites on kubernetes

While our website is hosted on Netlify and our Helm charts are hosted on Github Pages, we see usecases where it does make sense to deploy on kubernetes.

When you have a kubernetes based platform with standardized deployment tooling, with an ingress setup with automated SSL certificates, it starts to make more and more sense to just use that. You would still have to containerize your static site, and have a CI pipeline to build and deploy it.

If your kubernetes based platform also caters to your custom networking needs, deploying your static site there could become your best option. Your compliance setup surely prefers using something that you already have, over onboarding another tool to your compliance framework.

In a recent case, we helped a client deploying a documentation site, who
- has a kubernetes based developer platform,
- with ingress and automatic DNS and SSL setup,
- with an OAuth proxy that verifies Google email / Github org membership.

For them, deploying this static site on kubernetes was significantly simpler then any of the other options as they knew their platform already, and parts of the documentation was meant to be internally accessible only.

Should they need to start from scratch, kubernetes wouldn't have been the best choice.

## Deploying on kubernetes from scratch

Deploying a static site from scratch is a daunting task.

- You have to have a kubernetes cluster,
- set up ingress,
- set up Cert Manager for automatic SSL certificates,
- install the external-dns project, or have a wildcard DNS entry,
- containerize your static site,
- write deployment manifests,
- have a CI script to build and deploy.

This is not something we wish for anybody. So we made a Helm chart to ease parts of this setup.

{% tweet link="https://twitter.com/memenetes/status/1516084604666581003" %}
{% /tweet %}

## Using the `onechart/static-site` Helm chart to deploy static sites

Given you have a kubernetes platform already, to deploy a static site to kubernetes you would still have to

- containerize your static site,
- write deployment manifests,
- have a CI script to build and deploy.

To ease this process we made a Helm chart so you can provide as little information as if you were using Netlify:

- your git url
- and build commands.

Using the `onechart/static-site` Helm chart:
- you don't have to containerize your static site, the manifests include an Nginx container that hosts your site
- you don't have to write deployment manifests,
- you don't have to write a CI script to build your site, you only need to add the generated manifest to your deployment process.

The following example generates the kubernetes manifests to build a Hugo site in an init-container and host it in an Nginx container:

```yaml
helm repo add onechart https://chart.onechart.dev

cat << EOF > values.yaml
gitCloneUrl: https://github.com/gimlet-io/hugo-site.git
buildScript: |
    # !/usr/bin/env bash
    # pre -reqs
    apt-get update && apt-get install -y wget
    # Setting up Hugo
    wget https://github.com/gohugoio/hugo/releases/download/v0.111.3/hugo_0.111.3_Linux-64bit.tar.gz &&
    tar -xzf hugo_0.111.3_Linux-64bit.tar.gz &&
    chmod +x hugo
    ./hugo
EOF

helm template my-hugo-site onechart/static-site -f values.yaml > manifest.yaml
kubectl apply -f manifest.yaml

kubectl port-forward svc/my-hugo-site 8000:80

```

The majority of the code in the above example was setting up Hugo itself. With a react based site, the values.yaml can be as small as:

```yaml
gitCloneUrl: https://github.com/gimlet-io/react-tutorial-solutions.git
buildImage: node
buildTag: 16.20-buster
buildScript: npm install && npm run build
builtAssets: build/
```

Or if you just want to test drive the solution, just run `helm template my-static-site onechart/static-site` to get an example Hugo site up and running, as every chart we make has demonstrative defaults.

## If you need configuration options

`onechart/static-site` is a simplified view on kubernetes. If you want to see all configuration option, you can check the default values for [all configuration option](https://github.com/gimlet-io/onechart/blob/master/charts/static-site/values.yaml#L65).

If you are more into kubernetes manifests, you can use `onechart/onechart` to host static sites. By doing so, you get access to the init-container, volumes, and every aspect of the deployment.

The example below uses Hugo.
- Uses an init container to setup Hugo, clone the source from git and build the site
- The built site is then copied to a shared volume
- Nginx serves the built site from the volume

```bash
helm repo add onechart https://chart.onechart.dev

cat << EOF > hugo.yaml
volumes:
- name: init-hugo
  fileName: setup_hugo.sh
  path: /hugo.conf
  subPath: setup_hugo.sh
  fileContent: |
    #!/usr/bin/env bash
    # Pre-reqs
    apt update && apt install -y wget git

    # Setting up Hugo 
    wget https://github.com/gohugoio/hugo/releases/download/v0.111.3/hugo_0.111.3_Linux-64bit.tar.gz &&
    tar -xzf hugo_0.111.3_Linux-64bit.tar.gz &&
    chmod +x hugo &&
    mv hugo /usr/local/bin && cd / &&

    # Getting and building Hugo site source
    git clone https://github.com/gimlet-io/hugo-site.git &&
    cd hugo-site && hugo &&

    # Copying the built Hugo site to the shared volume for serving with Nginx
    mkdir -p /usr/share/nginx/html && cp -r ./public/. /usr/share/nginx/html
- name: shared-static-files
  emptyDir: true
  path: /usr/share/nginx/html
initContainers:
- name: setup
  image: debian
  tag: stable-slim
  command: |
    cp /hugo.conf/setup_hugo.sh . &&
    chmod +x setup_hugo.sh &&
    ./setup_hugo.sh
image:
  repository: nginx
  tag: 1.23.3
EOF

helm template my-hugo-site onechart/onechart -f hugo.yaml > manifest.yaml
kubectl apply -f manifest.yaml

kubectl port-forward svc/my-hugo-site 8000:80
```

## Conclusion

Blaming Kubernetes for complexity is a good source of memes. We do amuse ourselves with [such memes](https://twitter.com/memenetes) but it is fair to say that there are cases when deploying static sites on Kubernetes is the best option.

And thanks to `onechart/static-site` the configuration need is not much worse than with Netlify:

```bash
helm repo add onechart https://chart.onechart.dev

cat << EOF > values.yaml
gitCloneUrl: https://github.com/gimlet-io/react-tutorial-solutions.git
buildImage: node
buildTag: 16.20-buster
buildScript: npm install && npm run build
builtAssets: build/
EOF

helm template my-react-site onechart/static-site -f values.yaml > manifest.yaml
kubectl apply -f manifest.yaml

kubectl port-forward svc/my-react-site 8000:80
```

Onwards!
