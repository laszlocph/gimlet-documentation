# Concepts

The purpose of this guide is to help you understand how Gimlet works by describing its components and how they interact with each other.

## Workflow
Continuous Integration (CI) pipelines lint, test, build and then push applications.

CI workflow components aren't included in Gimlet's capabilities. It assumes tasks from your CI pipeline and runs them centralized. Integration pipelines can call the Gimlet API to deploy, therefore there's no need to script deployment in your workflow. We have CI plugins (actions, orbs) implemented for most platforms.

Once the CI pipeline triggers Gimlet's API, Gimlet will execute the deployment by writing the deployment manifest to git. When it's done, Flux synchronizes the desired state from git to the cluster.

## Components
### Dashboard
Gimlet's dashboard is where you get a comprehensive overview quickly.

- It displays real-time Kubernetes information about your deployments.
- It also displays real-time git information about your branches, commits and their build statuses.
- You can initiate releases and rollbacks.
- Configure your applications for deployment.
- Create and manage environments.

Gimlet has write access to your repositories, and encompasses all logic related to making releases, rollbacks, and gathering audit logs.

Every action you take on the dashboard is backed by a git commit, turning your repository into a single source of truth. The integration is bi-directional, custom git or CLI actions also show up in the dashboard and don't break the UI.
### CLI
Gimlet CLI is a command line tool with some of the capabilities of Gimlet's GUI.

- You can create and manage environments.
- Configure GitOps capabilities.
### Agent
Gimlet's agent runs in your clusters. It collects real time information about your deployments, and forwards it to Gimlet dashboard.
### CI/CD
Your CI/CD (standing for Continuous Integration/Continuous Delivery) pipelines are implemented with your preferred provider. Gimlet fits into your existing pipelines, replacing your deployment steps. See how [How Gimlet integrates to CI workflows](https://gimlet.io/docs/integrate-with-ci).
### Flux
Flux is the gitops controller under the hood of Gimlet. It pulls manifests from repositories and applies them on Kubernetes clusters.
### Repository
A repository is where your application's source code, or resource definitions are stored and managed.
