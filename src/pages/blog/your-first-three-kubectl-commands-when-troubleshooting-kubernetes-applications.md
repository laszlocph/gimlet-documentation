---
layout: post
title: Your first three kubectl commands when troubleshooting Kubernetes applications
date: '2023-09-14'
image: "three-commands.png"
description: "Learn Kubernetes troubleshooting with this step-by-step guide. List pods, analyze logs, describe pods, and monitor events in real-time."
---

Troubleshooting is an inevitable part of the Kubernetes journey. It's the art of identifying and resolving issues that might disrupt the smooth operation of your applications.

In this guide, we're showing you our first three kubectl commands when we start troubleshooting Kubernetes applications.

## Starting point - `kubectl get pods`

Every troubleshooting journey begins with understanding your environment. The `kubectl get pods` command is your first step to gathering insights about the status of pods in your cluster.

Important variants:
- The `kubectl get pod <pod-name> -o yaml` command provides a comprehensive YAML description of a pod, including all its fields.
- The `-A` switch. `kubectl get pods -A` allows you to view pods across all namespaces.
- Use the `-w` switch for continuous watching for changes.
- And of course, don't be afraid to feed the results into a `grep` command. `kubectl get pods -A | grep <app-name>` to efficiently filter pods with a specific name or `kubectl get pods -A | grep -v "Running"` to look at all pods that are not in a running state.

## Dive into logs - `kubectl logs`

The `kubectl logs` command gives you access to container logs within pods.

It takes the well known `-f` argument to stream the latest log entries and you can call kubectl logs on pods and deployments. `kubectl logs -f deploy/<your-app>` has the advantage over just looking at the logs of a single pod that it shows logs from all pods of the deployment at once. Also, you don't have to reference the exact name of a pod.

There is a twist to logs: Kubernetes pods often host multiple containers. You may need to provide the `-c` switch to the logs command to look at the logs of the desired container. You can use `kubectl describe` to learn about the names of the containers in a pod.

## In-depth analysis - `kubectl describe`

Sometimes, logs alone don't tell the whole story. That's where the `kubectl describe pod <pod>` command comes in. It provides an in-depth description of your pod, including container statuses, events, and conditions.

Most importantly, it reveals Kubernetes events that can hold the key to finding the root cause of issues. However, keep in mind that pod events disappear after an hour. If you don't stream Kubernetes events to a logging aggregator, the best chance you have to catch the Kubernetes event that reveals the root cause is to restart your application then run `kubectl describe` periodically to see error events rolling in.

To restart an application:
- You can delete a single pod with `kubectl delete pod` - the Kubernetes scheduler will start a new one for you, so essentially you restarted a pod.
- Or you can restart all pods of a deployment with `kubectl rollout restart deploy/<deployment>`

## Try them out

With these troubleshooting techniques, you're well-equipped to handle Kubernetes challenges. Troubleshooting is a skill that gets better with practice, so apply what you've learned to your Kubernetes deployments.
