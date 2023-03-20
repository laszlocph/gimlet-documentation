---
layout: post
title: Clickops over gitops
date: "2023-03-16"
image: clickops.png
description: "Doing cloud operations by clicking on a dashboard that generates a stream of infrastructure as code changes."
---

## Definition

Clickops.

Not as in clicking on the AWS console.

But clickops over gitops: doing cloud operations by clicking on a dashboard that is backed by a stream of infrastructure as code changes.

## Prior art

We did not invent the clickops term. In fact, it has been used to describe the practice when people work with cloud resources through the cloud provider's web console.

We are latching our *clickops over gitops* definition on [Corey Quinn's recent blogpost](https://www.lastweekinaws.com/blog/clickops/). Corey articulates that the problem with AWS's web console is not that it is a GUI, but that it does not work together with infrastructure as code approaches. He continues with a vision:

> I envision a world in which I can set things up in the AWS console [..] via the magic of clicking things. The provider captures what I set up and renders it into code or configuration somewhere, [..], then automatically generates diffs in the correct repository, or updates its [..] environment as it exists at the current moment.

We share this vision at Gimlet. And we believe that the state of the art in the gitops ecosystem allows us to achieve it.

By 2023, gitops became the de-facto operation model of the Kubernetes ecosystem. We are standing on the shoulders of open-source giants: Weaveworks and the ArgoCD project put immense effort in popularizing the gitops approach, while the Crossplane project opened new horizons in what is possible.

## The tech

The tech matters. It sets the scope where we think clickops is viable.

Definitions are often not prescriptive enough, so here we are: when we talk about clickops, we mean clickops over gitops. And when we say gitops, we mean Flux and ArgoCD delivering Kubernetes resources to the cluster.

Even if you are not familiar with these tools, you will surely be able to make sense the following yaml bits:

- this is how you bind your application to a URL

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
spec:
  rules:
  - host: "foo.bar.com"
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: my-service
            port:
              number: 80
```

- this is how you add a persistent volume to your application

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-ebs
spec:
  containers:
  - image: registry.k8s.io/test-webserver
    name: test-container
    volumeMounts:
    - mountPath: /test-ebs
      name: test-volume
  volumes:
  - name: test-volume
    awsElasticBlockStore:
      volumeID: "<volume id>"
      fsType: ext4
```

- and this is how you create an Amazon RDS resource

```yaml
apiVersion: database.aws.crossplane.io/v1beta1
kind: RDSInstance
metadata:
  name: rdspostgresql
spec:
  forProvider:
    region: us-east-1
    dbInstanceClass: db.t2.small
    masterUsername: masteruser
    allocatedStorage: 20
    engine: postgres
    engineVersion: "12"
```

All are descriptive yaml files. Controllers on Kubernetes are looking for these resources, and if you create a new one, they will create the matching infrastructure.

Kubernetes resources and their controllers reduced infrastructure provisioning into putting yaml files into a git repository. This declarative approach allows clickops tools to just render a stream of yaml templates based on user clicks. How those cloud resources come to life is handled by the ecosystem.

## Scope matters

We don't think that a general purpose, visual Terraform editor should be the focus for clickops. Or every problem under the platform engineering umbrella should be solved by dashboards.

But we do think that there is a subset of problems in platform engineering where clickops shines: automating common tasks in deploying and configuring web applications:

- configuring and deploying new applications
- on-demand application deploy and rollback
- progressive delivery
- spinning up QA environments
- provisioning application dependencies like cloud databases

Ultimately, clickops must know its boundaries. Otherwise it will turn into an endless effort of replicating the possibilities of existing devops configuration langugages.

But if scope is limited, clickops should adhere to a few musts to not limit the user.

## Clickops over gitops must be robust

It must respect the edits made directly to infrastructure as code: 
- It must not break if someone edits the source code.
- It must not lose custom edits.

## Clickops over gitops must be transparent

- The infrastructure as code repository must be accessible for people who prefer to work outside of clickops tools.
- Clickops must fit the workflows, like merge request reviews, that people follow when making direct code changes to infrastructure as code.

## Who is clickops over gitops for

Unlike popular belief, dashboards are not made for the inexperienced.

Clickops is made for the otherwise smart people, who understand what is going on, but 

- not confident enough
- too busy
- focusing on other part of the software lifecycle

to write the yaml bits from scratch for error prone and otherwise repetitive tasks.

If you don't believe us, we are happy to circle back Corey's points: we are pretty sure you are not reading this article in a command line browser.

## Tools using the clickops approach

- [Codefresh](https://codefresh.io/)
- [Ambassador Cloud](https://www.getambassador.io/products/ambassador-cloud)
- and us, [Gimlet](https://gimlet.io)

If you are aware of other tools following this approach, reach out on Twitter.

Onwards!
