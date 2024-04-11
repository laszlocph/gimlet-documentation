You can configure chat notifications for the platforms below to get information promptly about events related to your applications.

- [Slack]()
- [Discord]()

## Self-Hosted Gimlet Notification Settings

The variables below are part of Gimlet's configuration file. You can use these to configure notification settings in the config file as described in the sections above.

| Environment Variable            | Description                                                                                                                 |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `NOTIFICATIONS_PROVIDER`        | The provider or service used for sending notifications. It can be `slack` or `discord`.                                     |
| `NOTIFICATIONS_TOKEN`           | The token or credentials for accessing the notifications provider.                                                          |
| `NOTIFICATIONS_DEFAULT_CHANNEL` | The default channel or destination for sending notifications. Like "general".                                               |
| `NOTIFICATIONS_CHANNEL_MAPPING` | Mapping channels or destinations for sending notifications. eg.: `"staging=staging-deploys,production=production-deploys"`. |
