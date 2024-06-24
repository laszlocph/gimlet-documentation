---
title: 'Gimlet Configuration Reference'
description: |
  This page is a full configuration reference should you need to adjust the configuration when self-hosting Gimlet.
---

**This page is a full configuration reference should you need to adjust the configuration when self-hosting Gimlet.**

## Debugging & Logging

| Environment Variable | Description                                                                                                                       |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `DEBUG`              | A variable that sets the debugging mode for the application.                                                                      |
| `TRACE`              | A variable that enables detailed tracing for the application. Allows for extensive logging and tracing of application operations. |
## Host & Network Configuration

| Environment Variable | Description                                                                                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `HOST`               | A variable that specifies the host address of the application. Gimlet must know what address it is running on. It uses this hostname to register webhooks on GitHub and GitLab. |
## GitHub Integration

| Environment Variable     | Description                                                                             |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `GITHUB_APP_ID`          | The ID of the GitHub application being used.                                            |
| `GITHUB_INSTALLATION_ID` | The ID of the GitHub installation associated with the application.                      |
| `GITHUB_PRIVATE_KEY`     | The private SSH key used for authentication with the GitHub API.                        |
| `GITHUB_CLIENT_ID`       | The client ID for the GitHub OAuth application.                                         |
| `GITHUB_CLIENT_SECRET`   | The client secret for the GitHub OAuth application.                                     |
| `GITHUB_SKIP_VERIFY`     | A variable that determines whether to skip verification of GitHub API SSL certificates. |
| `GITHUB_DEBUG`           | A variable that enables debugging mode for interactions with the GitHub API.            |
| `GITHUB_ORG`             | The GitHub Organization or personal GitHub account who is authorized to use Gimlet.     |
## GitLab Integration

| Environment Variable   | Description                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| `GITLAB_CLIENT_ID`     | The client ID for the GitLab OAuth application.                                                   |
| `GITLAB_CLIENT_SECRET` | The client secret for the GitLab OAuth application.                                               |
| `GITLAB_ADMIN_TOKEN`   | A personal access token or group access token. Gimlet uses this token to access GitLab resources. |
| `GITLAB_DEBUG`         | A variable that enables debugging mode for interactions with the GitLab API.                      |
| `GITLAB_ORG`           | The GitLab Group or personal GitLab account who is authorized to use Gimlet.                      |
| `GITLAB_URL`           | The URL of the GitLab instance.                                                                   |
## Database Configuration

| Environment Variable          | Description                                                                                                                                                                                                        |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `DATABASE_DRIVER`             | The driver or provider for the database connection. Either `postgres` or `sqlite`.                                                                                                                                 |
| `DATABASE_CONFIG`             | The driver-specific data source name. An example postgres config: `postgres://gimlet:yourpassword@postgresql:5432/gimlet_dashboard?sslmode=disable`.                                                               |
| `DATABASE_ENCRYPTION_KEY`     | The encryption key used for encrypting sensitive data in the database.                                                                                                                                             |
| `DATABASE_ENCRYPTION_KEY_NEW` | Provide this variable if you want to rotate the `DATABASE_ENCRYPTION_KEY`. If both `DATABASE_ENCRYPTION_KEY` and `DATABASE_ENCRYPTION_KEY_NEW` is set, Gimlet will re-encrypt the encrypted data with the new key. |
## Notification Configuration

| Environment Variable            | Description                                                                             |
| ------------------------------- | --------------------------------------------------------------------------------------- |
| `NOTIFICATIONS_PROVIDER`        | The provider or service used for sending notifications. It can be `slack` or `discord`. |
| `NOTIFICATIONS_TOKEN`           | The token or credentials for accessing the notifications provider.                      |
| `NOTIFICATIONS_DEFAULT_CHANNEL` | The default channel or destination for sending notifications.                           |
| `NOTIFICATIONS_CHANNEL_MAPPING` | Mapping channels or destinations for sending notifications.                             |
## Helm Chart Configuration

| Environment Variable | Description                                                                                                                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CHART_NAME`         | The name of the Helm chart that Gimlet uses for new deployment configs created on the dashboard. Also, if `FEATURE_CHART_VERSION_UPDATER` is set, this chart version is considered as the latest chart version. |
| `CHART_REPO`         | The Helm repository where `CHART_NAME` is stored.                                                                                                                                                               |
| `CHART_VERSION`      | The version of the Helm chart set in `CHART_NAME`.                                                                                                                                                              |
## Repository & Webhook Configuration

| Environment Variable | Description                                                          |
| -------------------- | -------------------------------------------------------------------- |
| `REPO_CACHE_PATH`    | The file path or directory location for caching repository data.     |
| `WEBHOOK_SECRET`     | The secret key or token used for secure communication with webhooks. |
## Release & History Configuration

| Environment Variable         | Description                                                                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `RELEASE_HISTORY_SINCE_DAYS` | The number of days to consider when displaying release history on the dashboard. This affects dashboard performance.   |
| `RELEASE_STATS`              | Periodically processes the state of GitOps repositories for different environments. It can be activated with `enable`. |
## Feature Flags & Tokens

| Environment Variable            | Description                                                                                                                                                                    |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `BOOTSTRAP_ENV`                 | The environment used during application initialization.                                                                                                                        |
| `PRINT_ADMIN_TOKEN`             | Prints the admin token to the application logs.                                                                                                                                |
| `ADMIN_TOKEN`                   | A token or credential used for administrative access to the application.                                                                                                       |
| `GIT_SSH_ADDRESS_FORMAT`        | The format or template for the SSH address used in Git operations.                                                                                                             |
| `FEATURE_TERMS_OF_SERVICE`      | A feature flag variable for enabling the Terms and Conditions link on the sign in page.                                                                                        |
| `FEATURE_CHART_VERSION_UPDATER` | If set to true, it scans all git repositories daily and updates the chart version to the version set in `CHART_*`.                                                             |
| `FEATURE_POSTHOG`               | A feature flag variable for collecting non-identifyable product analytics data on PostHog's EU servers. Default: `true`.                                                       |
| `POSTHOG_API_KEY`               | A write-only Project API Key to communicate with the PostHog instance. It can't read events or any of your other data stored with PostHog, so it's safe to use in public apps. |
| `POSTHOG_IDENTIFY_USER`         | Identify a user with a unique ID instead of a PostHog randomly generated distinct_id and enables session recording for PostHog. Default: `false`.                              |

## Gimlet Agent Configuration Reference

| Environment Variable | Description                                                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `HOST`               | The url where you run Gimlet. Protocol included.                                                                                        |
| `AGENT_KEY`          | API key for agents. You can generate an API key on the Settings page.                                                                   |
| `ENV`                | The name of the environment, like `staging` or `production`. If you run environments in namespaces, use the `<env>=<namespace>` format. |
