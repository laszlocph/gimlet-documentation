# Slack Notifications

To receive Slack notifications from Gimlet, create a Slack app first.

You'll need to generate a new Slack token. Visit the [apps](https://api.slack.com/apps) page of Slack and follow these steps:

- Create a new application. Add an app name and pick the workplace where you'd like to receive notifications from Gimlet.
- Navigate to OAuth & Permissions on the left sidebar.
- Under Bot Token Scopes, add scopes `chat:write`, `chat:write.customize` and `chat:write.public`.
- Click the Install App to Workspace button on the top of the page.

 If you self-host Gimlet, copy the Bot User OAuth Access Token to Gimlet's config file to the `NOTIFICATIONS_TOKEN` variable. The config file should look like this.

```
NOTIFICATIONS_PROVIDER: slack
NOTIFICATIONS_TOKEN: xoxb-41[...]
NOTIFICATIONS_DEFAULT_CHANNEL: general
```

## Channel Settings

### Default Slack Channel

`NOTIFICATIONS_DEFAULT_CHANNEL` is a catch all for all notifications that are not directed elsewhere.

### Slack Notification Settings for Self-Hosted Gimlet

`NOTIFICATIONS_CHANNEL_MAPPING` maps channels to environment settings.

Here's an example. To send staging notifications to the `staging-deploys` channel, change the following:

```
NOTIFICATIONS_PROVIDER: slack
NOTIFICATIONS_TOKEN: xoxb-41[...]
NOTIFICATIONS_DEFAULT_CHANNEL: "general"
- NOTIFICATIONS_CHANNEL_MAPPING: "production=production-deploys"
+ NOTIFICATIONS_CHANNEL_MAPPING: "production=production-deploys,staging=staging-deploys"
```

### Slack Notification Settings for Cloud Gimlet

If you'd like to send notifications to a channel, set the service catalog field Owner IM by entering the channel name in the `#channel-name` format, as seen below.

If you'd like to receive direct messages instead, use the `@user-name` format instead of the `#channel-name` format.

![Service catalog entry for owner IM settings](https://gimlet.io/owner-im.png)
