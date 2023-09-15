---
layout: post
title: Troubleshooting common Kubernetes pod error states
date: '2023-09-15'
image: "fire.png"
description: "You can use this article as a reference for troubleshooting common Kubernetes pod error states. CrashLoopBackOff, CreateContainerConfigError, OOMKilled and more."
---

Kubernetes is a fantastic platform for container orchestration, but like any technology, it has its quirks and challenges. One common set of challenges revolves around Kubernetes pod errors. 

In this article, we'll dive into the most common Kubernetes pod error states and provide steps you can take to solve them.

## ImagePullBackOff and ErrImagePull

**When It Happens**:

ImagePullBackOff and ErrImagePull errors occur when Kubernetes cannot fetch the container image specified in your pod configuration.

**How to Fix It**:

You need to verify the correctness of your image name and double-check your image registry credentials.

- Run `kubectl describe pod <pod-name>` to cross check the image name.
- Check the exact error message at the bottom of the `kubectl describe output`. It may have further clues.

If the image name is correct, check the access credentials you use with `kubectl get pod <pod-name> -o=jsonpath='{.spec.imagePullSecrets[0].name}{"\n"}'` then check the secret values with `kubectl get secret <your-pull-secret> -o yaml`. You may feed the base64 encoded fields to `echo xxx | base64 -d` 

## CrashLoopBackOff

**When It Happens**:

CrashLoopBackOff signifies that your application keeps starting up and then dying for some reason.

**How to Fix It**:

Investigate your application logs for bugs, misconfigurations, or resource issues. `kubectl logs <pod-name>` is your best bet. The `--previous` flag will dump pod logs (stdout) for a previous instantiation of the pod.

## CreateContainerConfigError and CreateContainerError

**When It Happens**:

These errors crop up when Kubernetes encounters problems creating containers: a misconfigured ConfigMap or Secret is the most common reason.

**How to Fix It**:

Run `kubectl describe pod <pod-name>` and check the error message at the bottom of the output. It will highlight if you misspelled a ConfigMap name, or a Secret is not created yet.

Remember, if you don't see error messages at the end of `kubectl describe`, restart the pod by deleting it. Error events are only visible for one hour after pod start.

## When a pod stuck in `Pending` state

**When It Happens**:

A pending pod is a pod that Kubernetes can't schedule on a node, often due to resource constraints or node troubles.

**How to Fix It**:

Dive into the events section of your pod's description using `kubectl describe` to spot scheduling issues.

Verify that your cluster has enough resources available by `kubectl describe node <node-x>`

## Out of Memory Error and OOMKilled

**When It Happens**:

Running out of memory can lead to your pod's restart. Sadly the `OOMKilled` error is not easy to spot.

**How to Fix It**:

You need a monitoring solution to chart your pod's memory usage over time.
If your pod is reaching the resource limits in your pod specification, Kubernetes will restart your pod.

Correlate your restart times with your pod memory usage to confirm the out of memory situation and adjust your pod resource limits accordingly.

You can also use the `kubectl describe pod <pod-name>` command and look for the `Last State` section to confirm that indeed it is the lack of memory that restarted the pod.

```
Last State:     Terminated
  Reason:       OOMKilled
  Exit Code:    137
  Started:      Fri, 15 Sep 2023 09:56:14 +0200
  Finished:     Fri, 15 Sep 2023 09:56:17 +0200
```

## Troubleshooting wrong container port configurations

**When It Happens**:

Misconfigured container ports will lead to unavailable services.

**How to Fix It**:

Scrutinize your pod and service definitions in `kubectl get pod <pod-name> -o yaml` and `kubectl get svc <service-name> -o yaml` to ensure port alignment. Validate that your application code is listening on the specified port.

## Tried everything to no avail?

We are happy to help. Jump on our discord and we are happy to assist you: [https://discord.com/invite/ZwQDxPkYzE](https://discord.com/invite/ZwQDxPkYzE)
