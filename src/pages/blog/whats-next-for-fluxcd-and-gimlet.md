---
title: 'What’s Next for FluxCD - And Gimlet?'
date: '2024-02-06'
description: "Weaveworks is shutting down and everybody’s wondering: what does the future hold for Flux, one of the most used gitops tool of platform builders?"
image: gimlet-io-whats-next-for-fluxcd-and-gimlet.jpg
toc: false
---

Yesterday Alexis Richardson, the CEO of WeaveWorks [announced](https://www.linkedin.com/feed/update/urn:li:activity:7160295096825860096/) that WeaveWorks, the company behind FluxCD is shutting down.

First of all, we’re incredibly sad to see so many amazing professionals finding themselves in an uncertain situation at the worst time of the year for being let go. We encourage the community to help each other out in this situation and let each other know about possible opportunities for Weaveworks' teammates.

We were shocked to overhear the chatter about Weaveworks going out of business early January. As you can see, we’re listed as **[vendors](https://fluxcd.io/ecosystem/)** of the Flux ecosystem on the project’s website. It’s a critical matter to us what happens with the technology at the core of our stack.

Alexis shared some information about what happened: while they had increasing success with enterprise customers: "[..] this sales growth was lumpy and our cash position, consequently volatile [..]". Weaveworks then was on the verge of acquisition but talks never came to fruition.

## What To Expect

Weaveworks built its core business around Kubernetes. Contrary to all the criticism, Kubernetes is dominating the container orchestration field at an increasing trend. How Weaveworks was not able to catch a grip of it with a de facto technology at their hands will be subject of many analysis, something we are not trying to do here.

{% highlight %}
It’s fair to expect FluxCD, a graduated CNCF project to survive, but the coming months will bring uncertainty to the project.
{% /highlight %}

It’s not known yet how maintainers will weather the uncertainty, and hard to assess how reliant the development of the tool was exclusively on Weaveworks employees. While 5 of the 9 [core maintainers](https://github.com/fluxcd/community/blob/main/CORE-MAINTAINERS) are now listed independent/freelancer,  industry giants such as Azure, GitLab and AWS utilize Flux as their gitops solution, the coming months will reveal what measures these players take to maintain the tool.

A recent development is that the key maintainer of Flux, Stefan Prodan was hired by **[ControlPlane](https://www.linkedin.com/feed/update/urn:li:activity:7155990780556320768/)**. We believe that this step aligns well with the project's goals, and certainly a positive event in light of the grim month we are passing now.

## What We’ll Do

While business decisions behind FluxCD’s future impact us, we’re taking a moderately confident stance while we gather information about the situation.

For the past couple of months we have been working on [Capacitor](https://github.com/gimlet-io/capacitor), a general purpose UI for Flux. We are preparing to launch the tool as a sign of commitment to the Flux ecosystem.

The end of all considerations is to serve client needs and we are here to serve companies who are committed to gitops.

At the end of the day, most businesses who find value in gitops don’t really care how it happens as long as their needs are met, but some friction is expected until the dust settles. As a small team developing a gitops platform, that’s the mindset we embrace until a new normal emerges.

## What You Can Do

As already mentioned, as an open-source solution, a CNCF graduate project, Flux will stay with us. Until everything is settled, it is probably not the time for rushed decisions.

In the meantime, you may want to follow the Flux community calls or our social handles for analysis of the situation. As a Flux user, you should probably also check out our new general purpose Flux UI: [Capacitor](https://github.com/gimlet-io/capacitor) and make the most out of Flux.
