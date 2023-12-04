---
title: The Tooling Challenge
description: You will learn how to create release policies that are triggered on certain conditions to automatically release to a target environment.
---


It is challenging to build a platform that is polished, not limiting and cost-effective:

- **Polish**: Covering edge-cases is time consuming and often generously skipped in internal tooling efforts.
- **Not-limiting** Finding the right abstraction that helps in the common cases and does not stand in the way in the remaining 20% is not obvious.
- **Cost-effective**: The ground to cover is enormous. Combined with ongoing tasks, the tooling effort can last 6-24 months.

## Cloud native tools stuck on the ground floor

They are great point solutions for technical problems, but they lack coherent workflows for developers to work with daily.

Most discussions on Reddit and the CNCF Kubernetes slack channel revolve around the same topics. How to rollback, how to manage environments, how to promote changes across environments.

When it comes to gitops, the industry wide accepted delivery solution, discussions are literally about folder structures.

## Organic improvements take forever

Crafting internal tooling needs your most senior team members. They are busy.

Either you commit the time and resources, or accept the subpar tooling for years to come.

## Patching is an ongoing toil

Once you manage to build your tooling, keeping up with the ecosystem is taxing.

There are new releases every week from platform components, Helm charts are sometimes rewritten without clear update paths.


