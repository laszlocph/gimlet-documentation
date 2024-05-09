Integralt Kubernetes alertek vannak a Gimletben - ezek mar a k8s-es sectionben emlitve vannak, check v0.23.0 release notes, todo: screenshotok alertekrol

# Integrated Kubernetes Alerts

Gimlet has integrated alerts related to Kubernetes. These can show up:

- **ImagePullBackOff:** It occurs when a pod fails to pull the image required for one of its containers.
- **CrashLoopBackOff:** This indicates that a pod is stuck in a restart loop.
- **CreateContainerConfigError:** This error happens when Kubernetes can't create the configuration file for a container.
- **Pending:** This happens when the pod is scheduled to run on any node in the cluster and is stuck in the pending state. Could happen for various reasons.
- **Failed:** Occurs when a pod can't run successfully. Can happen due to multiple reasons.
- **OOMKilled:** This error message shows up when a container was terminated because it ran out of memory.

More details about how to treat and troubleshoot these error messages are in the [Troubleshooting]() documentation of Kubernetes Resources.
