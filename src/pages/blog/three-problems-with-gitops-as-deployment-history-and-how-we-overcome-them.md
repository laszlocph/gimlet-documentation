---
layout: post
title: Three problems with GitOps as deployment history, and how we overcome them
date: "2020-11-01"
image: leafs.jpg
image_author:  Phil Hearing
image_url: 
description: Our finding is that this git history is too sparse and noisy at the same time to be used for anything practical without tooling. In this blog post we describe three problems we experienced once we adopted gitops and Flux CD, and what measures we implemented in Gimlet to overcome them.
---

One often mentioned property of gitops is that it gives you a deployment history by nature. As you keep updating your desired deployment state in git, it builds up to a trail of changes that you can use to tell what version was deployed at a given time.

Our finding is that this git history is too sparse and noisy at the same time to be used for anything practical without tooling.

In this blog post we describe three problems we experienced once we adopted gitops and Flux CD, and what measures we implemented in Gimlet to overcome them. You may face similar issues in your own gitops platform implementation and this blog post can give you ideas about how to solve them.

Let's dive into problem one, shall we?

## Problem one: gitops is a technical history and it is not what developers care about the most

What developers care about the most is to know if their code is deployed. But all gitops tells them is how the image tag changed from one hash to another. Not very helpful.

![But all gitops tells them is how the image tag changed from one hash to another. Not very helpful.](/image-change.png)

What we all imagined when gitops talked about an auditlog, is to know what code was deployed and by whom at any given time.

But all we have is a trail of yaml changes, that does not know much about the code version that was delivered. It captures Kubernetes specific changes well, like a change in used CPU or memory, or an environment variable change, but it does not know about code version information what developers want to know about.

Ideally, as developers, we want to know the
- the reference to the commit or pull request that was merged and deployed
- the name of the PR or message of the deployed commit
- who was the creator of the commit
- who deployed it

with any additonal meta information that may help us in resolving an incident. As 80% [1] percent of issues are introduced with code changes, getting to know the largest possible context of each change could be material in our MTTR.

But the gitops history is not able to tell any of this. Unable to tell what was deployed, and often unable to even tell who started the deploy, as most gitops changes are made by bot accounts. This is not an auditlog.

But we can make it one.

## Storing context information with gitops commits

To make a real deployment history out of the gitops commits, at Gimlet, we store additional meta information with each gitops commit. Besides the yaml changes, we store a `release.json` file with each gitops commit made.

This file is ignored by Flux CD, so it does not interfere with the Kubernetes deployment, and contains the necessairy information to quickly reconstruct a deployment history out of gitops commits. The key here is quickly, as it is a denormalized form of meta data that otherwise could be obtained through the references in the deployed manifest.

The `release.json` file is the serialized form of the `Release` struct of the Golang `github.com/gimlet-io/gimlet-cli/pkg/dx` package.


```go
type Release struct {
	App string
	Env string
	ArtifactID  string
	TriggeredBy string
	Version *Version
	GitopsRef  string
	GitopsRepo string
	Created    int64
	RolledBack bool
}

type Version struct {
	RepositoryName string
	SHA            string
	Created        int64
	Branch         string
	Event          GitEvent
	SourceBranch   string
	TargetBranch   string
	Tag            string
	AuthorName     string
	AuthorEmail    string
	CommitterName  string
	CommitterEmail string
	Message        string
	URL            string
}
```

With this information available for every gitops commit, we can display the right context for each commit in Gimlet, and you can do it too in your own platform if you decide to build one. Gimlet is a gitops based developer platform built on top of Flux, making it easier to work with gitops and Kubernetes.

With Gimlet CLI:

```
$ gimlet release list --env staging --app demo-app --limit 1
demo-app -> staging @0342ccba7fe85c35154d96e396589feeda803b7d  (3 hours ago)
  d4f3846f - Major change (3 hours ago) Laszlo Fogas
  gimlet-io/demo-app@main https://github.com/gimlet-io/demo-app/commit/d4f3846f2391215e529ed57b59621723619ba625
```

and on the Gimlet Dashboard:

![Deployment history](/deployment-history.png)

Now that every gitops commit has the right context, let's address the next problem.

## Problem two: gitops history is not a straight line

As a developer, you typically work with one service. But in a gitops repository we often store manifests for many services, thus looking at the git history of one service is not a straight line, but a rather sparse one.

The approach to reconstruct history for a single service depends on the folder strategy you use in the gitops repository.

At Gimlet, [we use folders](/concepts/gitops-conventions) to separate services from one another. With manifests stored under a specific path, getting the gitops history of one service is rather easy with the `git` command line tool: the `git log -- path/to/service` command returns the git commit history of the specified folder

But if you use Kustomize overlays to render the service manifests, constructing the history of a single service can become much more difficult as you need to factor in changes in base layers that are scattered in multiple folders.

This is a factor to consider when you design your gitops folder strategy, and it affects greatly your ability to construct the gitops history for a single service.

Even though at Gimlet our approach makes the problem solvable with a git one-liner, we implement our tooling in Golang, where the de-facto git library is far from great in the task. We use [go-git](https://github.com/go-git/go-git) and to get the history of a path, it traverses the git commit tree and checks changeset to see if the changed files are on the path where our service is. And it does it at a rather slow pace, orders of magnitude slower than the `git` binary.

With this issue, we arrived at problem three: speed.

## Problem three: traversing the git history is slow

Git was made for a specific usecase and depending the language library you use, speed can be an issue. The `git` binary that you use on the terminal is very well optimized code, and chances are that the library available for your language will be much slower. So the tooling you build is going to be much slower in constructing specific git histories.

Answering questions like:
- What was the last ten versions deployed from this service?
- What changes were made on production last Monday?
- What was the last ten deploys by Alice?
- What was the last ten deploys from repository X?

from hundreds, or thousands of commits made every week, may pose performance issues for your tooling.

## Closing up

You may wonder that with the issues listed with gitops, is it really an approach to follow?

Our answer is yes.

Git is not a database but we try to use it as one, so certain usecase are hard. That's why we say at Gimlet that gitops benefits from a platform heavily and we woud not use it without proper tooling.

But we like the incremental nature of gitops, that each change is a commit, it makes debugging issues a lot easier. Having the possibility to look at the gitops repository at any moment, gives us a level of transparency that is not matched by any other deployment approach we tried.

Onwards!
