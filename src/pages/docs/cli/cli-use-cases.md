# CLI Use Cases

## Working with deployments

### Render manifests locally

You can use `gimlet manifest template` to render a Gimlet manifest.

This way you don't have to deploy the new configuration to inspect the generated Kubernetes yaml.

```
gimlet manifest template -f .gimlet/staging.yaml
```

#### Hydrating variables

Gimlet manifests usually have variables. You have three ways to pass variables to the rendering process.

`gimlet manifest template` can resolve variables from the shell, so either you provide values for one-time use:

```
SHA=xxx BRANCH=main gimlet manifest template -f .gimlet/staging.yaml
```

or set variables for your shell session for multiple use:

```
export SHA=aaaa
export BRANCH=fix
gimlet manifest template -f .gimlet/staging.yaml
```

or you can provide a file with the values:

```
gimlet manifest template -f .gimlet/staging.yaml --vars myenv.env
```

The file follows the format of an `.env` file.

### Deleting applications

In case an application is no longer needed, you can remove its configuration by following these steps:

- Delete the Gimlet manifest file from the `.gimlet` folder.
- Run `gimlet release delete`.

Example:
```
gimlet release delete --env staging --app my-app
```

This will delete the released application manifests from the gitops repository, and eventually from the cluster too.

## Release

### Getting a quick overview
TODO

### Then release
TODO

### Then track the deployment status
TODO

## Rollback

### Getting a quick overview

To roll back, first you have to get a good picture of what was released and when.

List the recent releases with the command below:

```
gimlet release list --env staging --app my-app
```

Example output:

```
staging/my-app laszlocph/gimletd-test@44e6c26866 (just now)
        26fc62ff - Bugfix 123 Laszlo
        my-app/master my-app-34666da3-ae77-45d5-843b-7b4bce1edf55
        https://github.com/owner/repo/commits/0017d995e

staging/my-app laszlocph/gimletd-test@c8d8c1d192 (1 week ago)
        26fc62ff - Bugfix 123 Laszlo
        my-app/master my-app-c19a27dd-25a0-4d0b-b932-db4c7c660996
        https://github.com/owner/repo/commits/0017d995e

staging/my-app laszlocph/gimletd-test@d2d0a416e6 (1 week ago)
        26fc62ff - Bugfix 123 Laszlo
        my-app/master my-app-34666da3-ae77-45d5-843b-7b4bce1edf55
        https://github.com/owner/repo/commits/0017d995e
```

### Then rollback

Once you identified the broken release, rollback to the preceding one. Gimlet will revert all commits made after the desired release.

```
gimlet release rollback --env staging --app my-app --to c8d8c1d192
```

And verify the release state:

```
gimlet release list --env staging --app my-app
```

Example output:

```
staging/my-app laszlocph/gimletd-test@44e6c26866 **ROLLED BACK** (1 minute ago)
        26fc62ff - Bugfix 123 Laszlo
        my-app/master my-app-34666da3-ae77-45d5-843b-7b4bce1edf55
        https://github.com/owner/repo/commits/0017d995e

staging/my-app laszlocph/gimletd-test@c8d8c1d192 (1 week ago)
        26fc62ff - Bugfix 123 Laszlo
        my-app/master my-app-c19a27dd-25a0-4d0b-b932-db4c7c660996
        https://github.com/owner/repo/commits/0017d995e

staging/my-app laszlocph/gimletd-test@d2d0a416e6 (1 week ago)
        26fc62ff - Bugfix 123 Laszlo
        my-app/master my-app-34666da3-ae77-45d5-843b-7b4bce1edf55
        https://github.com/owner/repo/commits/0017d995e
```

## Sync code to Kubernetes pods

`gimlet sync <folder-to-sync> <pod-name>[@<namespace>]:<path-in-pod>`

Example:

```
$ gimlet sync my-app laszlo-debug@default:/
```

TODO output

## GitOps

### Bootstrap

You can use the CLI to bootstrap gitops automation.

To configure the gitops automation to pull the entire git repository to the environment, you can use the following command:

```
gimlet environment bootstrap \
  --single-env \
  --gitops-repo-url git@github.com:<user>/<repo>.git
```

There are several options that you can use to customize the setup:

```
$ gimlet environment bootstrap --help

OPTIONS:
   --env value                     environment to bootstrap
   --single-env                    if the repo holds manifests from a single environment (default: false)
   --gitops-repo-url value         URL of the gitops repo (mandatory)
   --gitops-repo-path value        path to the working copy of the gitops repo, default: current dir
   --no-controller                 to not bootstrap the FluxV2 gitops controller, only the GitRepository and Kustomization to add a new source (default: false)
   --no-dependencies               to not provision a dependencies folder, if you dont't want to have a two-phase gitops apply (default: false)
   --kustomization-per-app *-apps  to apply only the flux/ folder in gitops. Separate kustomization objects must be created to apply other folders. Used in *-apps repos (default: false)
``` 

### Upgrade

To upgrade the gitops automation to the latest version. It takes the same parameters as `gimlet environment bootstrap`.

```
$ gimlet environment upgrade
OPTIONS:
   --env value               environment to bootstrap
   --single-env              if the repo holds manifests from a single environment (default: false)
   --gitops-repo-url value   URL of the gitops repo (mandatory)
   --gitops-repo-path value  path to the working copy of the gitops repo, default: current dir
   --no-controller           to not bootstrap the FluxV2 gitops controller, only the GitRepository and Kustomization to add a new source (default: false)
   --no-dependencies         if you dont't want to use dependencies for Flux (default: false)
   --kustomization-per-app   if set, the Kustomization target path will be the Flux folder (default: false)
   --no-kustomization        if you don't want to upgrade your Flux repo and folder config (default: false)
   --no-deploykey            if you don't want re-generate your deploy key (default: false)
```

#### Examples

To upgrade everything, but not regenerate the deploykey:

```
gimlet gitops upgrade \
  --single-env \
  --gitops-repo-url git@github.com:somewhere/overt-the.git \
  --no-deploykey
```

To upgrade everything, but not regenerate the deploykey. This time with a named env in the gitops repo:

```
gimlet gitops upgrade \
  --env staging \
  --gitops-repo-url git@github.com:somewhere/overt-the.git \
  --no-deploykey
```

To upgrade only Flux, but not regenerate the deploykey, and don't generate/update the gitops repo config

```
gimlet gitops upgrade \
  --env staging \
  --no-deploykey \
  --no-kustomization
```

**Example output**

```
$ gimlet gitops upgrade --single-env --no-deploykey --gitops-repo-url git@github.com:somewhere/overt-the.git
✔️ GitOps configuration upgraded at /workspace/gimlet-cli/build/test/flux

👉 1) Check the git diff
👉 2) Commit and push to git origin

Flux will find the changes and apply them. Essentially upgrading itself

Yay Gitops🙌
```

{% callout %}
Gimlet files a Pull Request automatically to your environment to update the gitops automation, so normally you would not need to run the `gimlet environment upgrade` command. To disable the automatic Pull Requets, set `FEATURE_GITOPS_UPDATER` to false.
{% /callout %}
