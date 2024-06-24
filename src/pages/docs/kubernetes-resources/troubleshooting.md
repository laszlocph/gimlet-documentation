---
title: 'Troubleshooting'
description: |
  Kubernetes troubleshooting guide describing the most common error messages and the solutions for them.
---

Even though we're doing our best so you never have to interact with Kubernetes when you use Gimlet, it's inevitable that things go wrong sometimes. This troubleshooting guide is supposed to help with the most common failures you can expect.

## Understanding Your Environment

First you'll have to get better understanding of what caused the problem. The commands below will help you do so.

### `kubectl get pods`

Running the `kubectl get pods` command will get you details about pods running on your environment.

Variants:
- `kubectl get pod <pod-name> -o yaml` will provide a comprehensive YAML description of a pod and all of its fields.
- `-A`. This switch will allow you to view pods across all namespaces. Example: `kubectl get pods -A`.
- `-w`. This switch will turn on continuous watch of pod status. Example: `kubectl get pods -w`.
- `grep`. Using `grep` you can filter pods with a specific name (`kubectl get pods -A | grep <app-name>`) or state (`kubectl get pods -A | grep -v "Running"`).

### `kubectl logs`

The `kubectl logs` will get you the container logs within pods.

Variants:
- `-f`. This argument will stream the latest log entries. You can also use this with pods and deployments. Example for deployment filtering: `kubectl logs -f deploy/<your-app>`.
- `-c`. This argument will help you filter log entries for a specific container.

### `kubectl describe`

The `kubectl describe` command can help you with container statuses, events, and conditions of your pod. Use as `kubectl describe pod <pod>`

Keep in mind that pod events disappear after an hour. If you don't use an event aggregator, valuable data might be lost before you start investigating what went wrong. If you ran out of time, restart one specific pod with `kubectl delete pod` or every pods in a deployment with `kubectl rollout restart deploy/<deployment>` and run `kubectl describe`.

## Error States

Using the commands below, you might run into error states that'll lead you to figuring out what needs to be done to address the issues within your cluster. Here are the most common error states you might have to deal with.

### `ImagePullBackOff` and `ErrImagePull`

These errors occur when Kubernetes can't fetch the image specified in your pod configuration.
#### How to fix it

Verify the correctness of your image name and double-check registry credentials.

Run `kubectl describe pod <pod-name>` to cross check the image name. Check the bottom of the output for the exact error message.

If the image name is correct, check out access credentials. Run `kubectl get pod <pod-name> -o=jsonpath='{.spec.imagePullSecrets[0].name}{"\n"}'`, and then check the secret values with `kubectl get secret <your-pull-secret> -o yaml`. You may feed the base64 encoded fields to `echo xxx | base64 -d`.

### `CrashLoopBackOff`

This indicates that your application keeps starting up and then dies for some reason.
#### How to fix it

Run `kubectl logs <pod-name>` to investigate logs of your pod. Add `--previous` flag to see previous insantiation of the pod.

### `CreateContainerConfigError` and `CreateContainerError`

In this case, Kubernetes encountered a problem when creating containers. A misconfigured ConfigMap or secret is usually the most common cause of this.

#### How to fix it

Run `kubectl describe pod <pod-name>`.  The error message at the bottom of the output should reveal if it's a misspelled ConfigMap name or a secret isn't created yet.

If there's no error message at the end of output, restart the pod by deleting it with `kubectl describe`.

### Pod Stuck in `Pending` State

It indicates that Kubernetes can't schedule a pod on a node. It often happens because resource constraints or problems with the node.

#### How to fix it

Run `kubectl describe` and search for events to spot scheduling issues. After that, verify that the cluster has enough resources by running `kubectl describe node <node-x>`.

### Out of Memory Error and `OOMKilled`

Running out of memory can cause a pod to restart. OOMKilled is difficult to catch.

#### How to fix it

Use a monitoring solution to chart your pod's memory usage over time. When your pod is reaching the specified resource limits, Kubernetes will restart it.

Configure restart times with pod memory usage to confirm the out of memory situation and adjust resource limits accordingly.

You can also use the `kubectl describe pod <pod-name>` command and look for the `Last State` section to confirm that indeed it is the lack of memory that restarted the pod.

```
Last State:     Terminated
  Reason:       OOMKilled
  Exit Code:    137
  Started:      Fri, 15 Sep 2023 09:56:14 +0200
  Finished:     Fri, 15 Sep 2023 09:56:17 +0200
```

### Wrong Container Port Configuration

A service is unavailable.

#### How to fix it

Examine pod and service definitions in `kubectl get pod <pod-name> -o yaml` and `kubectl get svc <service-name> -o yaml` to ensure port alignment.

Validate that the service listens by running the command below:

```
kubectl exec -it <pod-name> -- sh
netstat -tulpn
```

## Debug Container Networking

Container networking issues prevent applications running in a pod from reaching another service. There can be multiple reasons behind this problem occurring.

### Verify It's Not an App Related Issue

Run `kubectl exec -it pod-xxx bash`, where `pod-xxx` is the pod where the app you'd like to debug is running. Using this command, you can access the shell of the application, which will be necessary for debugging.

#### Check DNS

You can try DNS resolution by running `dig` or `nslookup`.

The latter nslookup command is `nslookup subdomain.myremotehost.xyc`. This can print two outputs based on if DNS resolution is successful.

After resolution, you should see something like this:

```
$ nslookup google.com
Server:         127.0.0.53
Address:        127.0.0.53#53

Non-authoritative answer:
Name:   google.com
Address: 142.250.201.206
Name:   google.com
Address: 2a00:1450:400d:806::200e
```

If it can't be resolved, this output should appear:

```
$ nslookup does-not-exist.com
Server:         127.0.0.53
Address:        127.0.0.53#53

Non-authoritative answer:
*** Can't find does-not-exist.com: No answer
```

**If DNS resolution fails, the issue requires advanced understanding of DNS debugging, which we won't detail here as less advanced users might not be able to fix things on their own. If you bump into an issue like this, we're happy to help on our Discord server.**
### Try Accessing The Service

If DNS works, try accessing the app from the pod.

If it's a HTTP based API, use curl for access. Here's an example:

```
curl -X GET https://subdomain.myremotehost.xyc/api/myendpoint
```

If it is a database or some other kind of binary protocol, you can use the `telnet` command to open a plain socket connection to it:

```
$ telnet subdomain.myremotehost.xyc 5432
```

If either of these methods fail, you can be sure the app is not running, or communication is blocked somehow.
