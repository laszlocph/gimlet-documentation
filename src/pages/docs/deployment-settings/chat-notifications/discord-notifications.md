# Discord Notifications

To get Discord notifications from Gimlet, you'll need to create a Discord application.

First, make sure you’re logged in on the Discord website, and navigate to the [applications page](https://discord.com/developers/applications). Follow these steps when you get there:

- Click the New Application button, and enter your application's name, Gimlet for example and confirm the pop-up window by clicking the Create button.

The app is now ready, but you'll need to invite it to your Discord server. Here's how:

- On the left panel, navigate to OAuth2 and scroll to the OAuth2 URL Generator section.
- In the scopes, check Bot and in the Text Permissions part of Bot Permissions check Send Messages.
- Copy your generated URL from the bottom of the page, and open it in a new tab.
- Select the server you'd like to add your bot to, and click Continue.
	Note: You can only select servers where you have admin privileges. Make sure the Send Messages option is checked, before clicking on the Authorize button.
- After the security check, your bot will automatically join the server.

Now that the bot is on your server, you can set up where you'd like to receive messages from it.

- Go to User Settings, and then to Advanced, where you can enable Developer Mode. This'll allow you to see and copy your channel IDs.
- Now you can copy your text channel ID on Discord's main page by right clicking on the desired channel in the left panel and choosing the Copy ID option.
- Make sure that the newly created bot is a member of your channel. If not, use the Add members or roles button in the channel to invite your bot's role.

```
NOTIFICATIONS_PROVIDER: discord
NOTIFICATIONS_TOKEN: OTQwO[...]
NOTIFICATIONS_DEFAULT_CHANNEL: "140971232847884321"
```

## Discord Channel Settings

### Default Discord Channel

`NOTIFICATIONS_DEFAULT_CHANNEL` is a catch all for all notifications that are not routed elsewhere.

### Discord Notification Settings for Self-Hosted Gimlet

`NOTIFICATIONS_CHANNEL_MAPPING` maps channels to environment settings.

For example, to send staging notifications to the `staging-deploys` channel, change the following:

```
NOTIFICATIONS_PROVIDER: discord
NOTIFICATIONS_TOKEN: OTQwO[...]
NOTIFICATIONS_DEFAULT_CHANNEL: "general"
- NOTIFICATIONS_CHANNEL_MAPPING: "production=production-deploys"
+ NOTIFICATIONS_CHANNEL_MAPPING: "production=production-deploys,staging=staging-deploys"
```

### Discord Notification Settings for Cloud Gimlet

To route notifications of a Gimlet application to a channel, set the service catalog field Owner IM. Use `@` sign to send direct message instead of a message to a channel.

![Service catalog entry for owner IM settings](https://gimlet.io/owner-im.png)
