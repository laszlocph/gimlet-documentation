# Registries

Gimlet supports GitHub Container Registry (GHCR) as of now, but Docker Hub support is in the works, as well.

## Add New GHCR Registry

You can add a new GitHub Container Registry to Gimlet by converting your environment to a gitops environment.

You can do so by navigating to the environment you'd like to deploy in the Environments section of the menu in the top bar.

After that, select the Platform option on the left, and look for the GHCR Registry section, where you need to enter the following:

- Your GitHub username.
- A classic personal access token generated with `write:packages` scope turned on. You can find out how to generate personal access tokens for your GitHub account [here](https://docs.github.com/en/enterprise-server@3.9/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens). Keep in mind that Gimlet doesn't support fine-grained personal access tokens as of now.

After entering these, you need to click the Encrypt button, and then save in the top right corner.

Before starting to deploy, wait a couple minutes for all the changes to be made behind the scenes.
