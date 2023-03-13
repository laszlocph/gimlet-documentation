---
layout: post
title: The how and why we built our SaaS platform on Hetzner and Kubernetes
date: "2023-03-08"
image: why-hetzner.png
description: "Hetzner is 5 times cheaper for us than the hyperscalers. This blog posts enumerates the how and why we built our SaaS on a discount bare metal provider. Gotchas included."
---

Hello everyone, Laszlo here, the founder of Gimlet.io 👋. In this blog post I try to address various aspects of how and why we built our SaaS platform on Hetzner and Kubernetes and not on one of the hyperscaler cloud providers.

It is an interesting time. While we were building our platform on Hetzner, David Heinemeier Hansson, the founder of 37Signals has also broke ground on their new project to leave AWS in favor of a managed data center. His posts on the topic had a good run on social media. While DHH is a contrarian and sometimes good at starting trends, we are not here to start or join any movement. In this post I simply want to share our choices and experiences with Hetzner with the curious minded. Show what tools we used, what trade-offs we had to consider, what are the pros and cons in early 2023 of not using one of the big cloud providers. So let's get started, shall we?

First things first, why Hetzner?

## Why Hetzner?

I don't want to drag it out too long: it is price.

We built our compute nodes on the EX43 model, the newest staple machine of Hetzner. The hexa-core, Alder Lake CPU with 64GB RAM and 2x512GB NVMe SSD comes in at 52.1 EUR in one of Hetzner's German datacenter. No VAT in our case.

Comparing this to
- AWS's `m6a.2xlarge` and `m6i.2xlarge` instances costing $281 and $312 respectively in `eu-west-1`
- and Google Cloud's `c3-standard-8` and `n2-standard-8` comes in $277 and $311 in `europe-west4`

there is a significant price advantage on Hetzner's side.

And that's only comparing to eight virtual CPU cores. If we factor in the number of disk IOPS we get from a bare metal server, the at least double memory size, and the fact that we are getting not eight virtual CPUs, but six real CPU cores with twelve threads, Hetzner being 5 times cheaper is an understatement.

But not all things are equal, Hetzner being five times cheaper comes at a price. We are missing out on features that hyperscalers spent a decade building.

## What are we losing by not hosting on one of the big clouds?

We only need a few things to run our platform, and among those, the things we miss the most on Hetzner are:

- First and foremost we need Kubernetes, we would use managed Kubernetes if it would be available.
- We need a highly available SQL database, but RDS or CloudSQL is not available.
- Virtual networks and security groups. We had to work even for basic network and host security on Hetzner.

### Addressing the missing managed Kubernetes

Managing Kubernetes is not something we prefer doing and usually we rely on the managed Kubernetes offerings, but on Hetzner it is just not possible.

Even though we manage Kubernetes ourselves, we tried to minimize the moving parts. Simplicity is key for us, therefore we chose to use the k3s project. K3s is a fully compliant Kubernetes distribution with a few notable simplifications:

- k3s is using an SQL database as storage, so we don't have to deal with etcd at all.
- It is packaged as a single binary and it has a matching configuration experience. All cluster operations - like managing certificates - are reduced to either an argument of the k3s binary, or a CLI command
- It is secure by default with reasonable defaults for lightweight environments

We took one more notable architectural decision that eased our Kubernetes cluster building: we keep our state in SQL databases, so we did not have to install and maintain a clustered filesystem for persistent volumes.

Even though we cut many of the difficult parts short in our setup, we expect a few days of maintenance, sometimes immediate action, in the coming year that will be releated to our self-managed Kubernetes.

But nodes die also on managed Kubernetes offerings and disks fill up. Maybe in our case rebuilding a node will be longer (starting a new node, running Ansible scripts, etc) than on hyperscalers, but the number of issues and the severity we don't expect to become unmanageable. Famous last words, right? A follow up blog post is due in 12 months.

### No RDS, what now?

A managed database is really something that I happily pay a premium for. High-availability, point-in-time restores in a click of a button is not something that is easy to replicate.

Postgresql is also something that is critical for Gimlet's SaaS platform as we keep all state in Postgresql databases. Not just client data, but the Kubernetes control plane is also stored in an SQL database. So we needed to build a highly available, secure Postgresql cluster, and had to handle proper off-site backups.

What gave us confidence in the process is that we had experience in running replicated Postgres clusters back in the pre-Postgres-RDS days. Feels like a lifetime away, but Postgres on RDS is not yet ten years old today.

### Networking and security, the big one

We spent most of the time on the networking setup and security considerations.

By default, Hetzner gives you root access over SSH, there are no virtual networks, or security groups. If you start a server process on your node, it will be instantly accessible on the internet. Not a friendly default, and the lack of VPCs and Security Groups have been the biggest pain we had to solve.

This was also the place where we involved external help. A review of our setup by two independent consultants icreased our confidence in the process.

## Building infrastructure from the ground up on bare metal in 2023

In this section I list the tooling and steps it took to build our SaaS platform on Hetzner.

### Infrastructure as code

While the year is 2023, we wrote our infrastructure as code setup in Ansible. Since most of the configuration happens inside a node, there is not much to Terraform. Our team had confidence in Ansible from the virtual machine days.

### Node security

The first Ansible playbooks we wrote were the node hardening ones. Unattended upgrades, SSH fail2ban, and tens of best practices applied automatically on all our nodes.

### Network security

By default Hetzner assigns a public IP to nodes, and hands out root SSH access for you to start using the nodes. Also, every port you open is open to the internet. No private networks, or security groups by default. So we started by building one.

How we built our network:
- There is basic VLAN support in Hetzner, we could connect our nodes with an unmetered, internal network connection.
- We also built a Wireguard based VPN mesh on this internal network. Essentially encrypting all traffic between our nodes.
- We installed a firewall on all nodes, and bound only port 80 and 443 to the public network IP addresses.
- We front all web traffic with a Cloudflare Loadbalancer and Web Application Firewall. Traffic is only accepted from Cloudflare's servers.

### Kubernetes

We use k3s. Its single binary distribution and config experience made the job easier, furthermore we could back it with an SQL database, which removed etcd from the mix. We don't know etcd, so that was amazing.

We took one more notable architectural decision that eased our Kubernetes cluster building: we keep our state in SQL databases, so we did not have to install and maintain a clustered filesystem for persistent volumes.

### Postgresql

We built a streaming replication based active - passive Postgresql cluster.

To keep things simple we built the cluster outside of Kubernetes and containers. Not that it would have been a big issue otherwise, but we would have pinned the Postgres pods onto specific nodes anyways. We didn't opt to use Kubernetes Postgres operators, like Patroni just yet.

There is one significant shortcut that we took here. Failover is designed to be manual at this point. This could be a considerable source of downtime, and we may improve this practice in further iterations of our platform.

It is important to note why we took this risk: to enable automatic failover we would have to write a bulletproof failover script that maximizes availability and minimizes data consistency risks. With a bug in the failover automation, we could risk data consistency issues that are potentially more difficult to handle than downtimes. Basically we optimized for operational simplicity, and a good enough uptime.

Now judging a good enough uptime comes down to the reader as Gimlet does not provide an SLA at this point, but let me leave you with two thoughts:

- A 99,5% availability, an industry wide standard for SaaS platforms, means a yearly 1.83 days of downtime. A 99% availability means a 3.65 days downtime a year. This last one practically means that our whole team could be on vacation in the jungles of Brazil, travel back to Europe, open their laptops and do the database failover and we would still be faster than three days. It goes without saying that we are not planning to travel to the jungles of Brazil without anyone being on call.

- It is good to look up at this point what [SLA](https://aws.amazon.com/rds/sla/) Amazon's RDS database provides. They are kind of mushy on the topic: *"AWS will use commercially reasonable efforts"* and if they fail, they give your money back in credits. Ten percent if they are between 99-99.95% availability, 25% percent if they are between 95 and 99 percent, and all the money otherwise. In practical terms, they can be down for 18 days a year and you only get back one fourth of your money.


### Gitops: drinking our own champagne

Each user that signs up gets a new Gimlet instance that is identical to the latest release of the open-source version. Each user configuration is stored in gitops and we run Gimlet to manage those Gimlet instances.

Besides Gimlet instances, we also manage our cluster components with gitops.

### Backups

We store state in a single location only, in our Postgresql cluster.

For everything else, the source of truth is our infrastructure as code repositories: Ansible and gitops.

We backup our Postgresql cluster, encrypt and ship our backups to an off-site location.

### Disaster recovery

Our disaster recovery strategy builds on two pillars: our backups and infrastructure as code repositories.

During our platform building efforts we rebuilt the whole stack numerous times from code and before launching the early access program, we rebuilt everything from scratch. We also ran synthetic database restore tests.

### Encryption

We encrypt data in numerous places.

In transit:
- We encrypt all traffic on our internal Wireguard based VPN mesh.
- We use SSL between our applications and Postgresql.
- Between our services.
- Between our applications and our ingress controller.
- Between our ingress controller and Cloudflare.
- Between Cloudflare and endusers.

At rest:
- We encrypt our node disks.
- We encrypt our backups.
- Gimlet instances encrypt sensitive database fields in the database.
- K3s encrypts its secrets that are stored in Postgresql.

### Monitoring

We use a Prometheus / Grafana stack for monitoring, UptimeRobot for uptime monitoring, and PagerDuty for our on-call.

## How has Hetzner been so far?

We used Hetzner a couple of years back. It has been stable enough back then, and also today.

We use stock node types and only expect linear scaling. We provision nodes manually which takes around fifteen minutes until we can log in. We heard from friends that this is not the case for custom machine types, but we will cross this bridge when we get there.

An improvement since our previous ride with Hetzner is the VLAN feature. It was straightforward to set up based on the documentation and it has been stable so far. One thing we could not achieve though: connecting our dedicated nodes with Hetzner Cloud VMs. We are using dedicated nodes, but we could spin up VMs for small tasks if the VLAN would work between those.

That's it for now. It is a snapshot of where we are currently, expect a follow up post in 12 months, or earlier if something changes significantly.

As always, if you want to deploy to Kubernetes using the best of open-source tools out of the box, our self-serve SaaS early access is open on [https:/gimlet.io/signup](https:/gimlet.io/signup).

Onwards!
