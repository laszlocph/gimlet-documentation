# CLI Use Cases

## GitOps

You can use the CLI to bootstrap gitops automation.
### Folder Per Environment

To set up gitops automation separated by a folder per an environment, run the command below:

```
gimlet gitops bootstrap \
  --env staging \
  --gitops-repo-url git@github.com:<user>/<repo>.git
```

### Repository Per Environment

You can bootstrap gitops automation to pull the entire repository to the environment. The command below does that:

```
gimlet gitops bootstrap \
  --single-env \
  --gitops-repo-url git@github.com:<user>/<repo>.git
```

## Deployment Configuration Management

### Edit Configuration

Gimlet utilizes a general purpose Helm chart, called OneChart to manage deployment manifests. This allows you to use the CLI to manually edit the environment file's values section. Run the `gimlet manifest configure -f` command as the example shows below:

```
gimlet manifest configure -f .gimlet/staging-demo-app.yaml
```

`.gimlet` is the folder where your Gimlet related config files are stored, and in this example `staging-demo-app.yaml` is the file that you're going to edit with the command.

When you are done configuring, close the browser tab, and the values you set are written in the `.gimlet/staging-demo-app.yaml` file.

Inspect the file, commit and push it to git.
### Render Manifests Locally

You can use the CLI to accelerate feedback loop. This way you can spare a git push to see what the Kubernetes manifest will render.

Just simply run `gimlet manifest template`.

Example for an output:

```
NAME:
   gimlet manifest template - Templates a Gimlet manifest

USAGE:
   gimlet manifest template \
    -f .gimlet/staging.yaml \
    -o manifests.yaml \
    --vars ci.env

OPTIONS:
   --file value, -f value    Gimlet manifest file to template, or "-" for stdin
   --vars value, -v value    an .env file for template variables
   --output value, -o value  output file
   --help, -h                show help (default: false)
```

### Delete Environment Configuration

In case an environment is no longer needed, you can remove its configuration file by following these steps:

- Delete Gimlet manifest file from `.gimlet` folder.
- Run `gimlet release delete`.
## Rollbacks

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

### Roll back

Once you identified the broken release, roll back to the preceding one. Gimlet will revert all commits made after the desired release.

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
        