---
title: 'Registries'
description: |
  Gimlet supports any OCI (Open Container Initiative) compatible container registry.
---

**Any OCI (Open Container Initiative) compatible container registries are supported.**

## Custom Registries

If you don't have a registry, you don't need to setup a new one. Gimlet creates a custom registry after you convert your environment into a gitops environment.

It'll be named Gimlet Registry by default, but you can modify its name after it's created. When you set up a deployment for an app available in a repository, this is the name you should be looking for in Registry options.

### Custom Registry Configuration

If you'd like to use a custom registry that you host outside of GitHub Container Registry or Docker Hub by navigating to the environment settings. You can find these settings by selecting the Environments option in the menu bar on top and clicking on the environment's card to select its settings.

In the environment settings, choose the Container Registry tab, and look for Custom Registry settings. Here you can entering the below credentials:

- **URL:** This is the URL where your registry is available.
- **Login:** This is the username or user ID that you use for this registry.
- **Token:** This is the access token that belongs to your user that grants access for Gimlet to your registry.
- **Self-Signed Certificate:** If you use one to restrict access to your registry, paste it here. Gimlet will encrypt and store it.

## Add GitHub Container Registry

If you have a GitHub Container Registry set up, you can integrate it to Gimlet.

### Get GitHub Personal Access Token

First, you need to get a personal access token with `repo` and `write:packages` privileges. You can get one as described in [GitHub's documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic). Remember that fine-grained tokens aren't supported in Gimlet.

Make sure to back up the token in a secure way, as it won't be recoverable after you leave or close the GitHub page after token generation. If you lose it, a new one will be needed to be generated. Consider the token's expiration time, as well, since Gimlet will lose privileges once the token expires.

### GitHub Container Registry Settings in Gimlet

Once the token is ready for use, you can open Gimlet in your browser. After logging in, navigate to environment settings by clicking the Environments option in the menu bar on top, then selecting the environment you use by clicking its card.

In the environment settings, choose the Container Registry tab on the left. Under the GitHub Container Registry settings, enter the following:

- **Login:** Your GitHub username.
- **Token:** The personal access token you generated earlier.

## Add Docker Hub

You can add your Docker Hub credentials to Gimlet to access both public and private registries.

### Get Docker Hub Access Token

First, you need to get an access token with `read` privilege. You can get the token as described in [Docker's documentation](https://docs.docker.com/security/for-developers/access-tokens/).

Make sure to back up the token in a secure way, as it won't be recoverable after you leave or close the Docker Hub page after token generation. If you lose it, a new one will be needed to be generated.

### Docker Hub Registry Settings in Gimlet

When the token is ready, open Gimlet in your browser. After logging in, navigate to environment settings by clicking the Environments option in the menu bar on top, then selecting the environment you use by clicking its card.

In the environment settings, choose the Container Registry tab on the left. Under the Docker Hub settings, enter the following:

- **Login:** Your Docker Hub username.
- **Token:** The access token you generated earlier.
