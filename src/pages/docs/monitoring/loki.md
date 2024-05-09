# Loki

Loki is an open-source log aggregation tool. In this guide, you can see how you can query it in case you need to investigate logs.
## Querying

### Querying Basics

In Loki's [LogQL](https://grafana.com/docs/loki/latest/logql/log_queries/) first you select a log stream, then pipe it with various filter criteria.

Grafana's Explore view is the place to try out your queries.
#### Selecting a log stream

In Loki, the log stream has no name, you can start writing the label selectors. Copy:

```
{namespace="default"}
```
#### Then pipe in further criteria[​](https://book.gimlet.io/docs/platform-components/observability/loki#then-pipe-in-further-criteria "Direct link to heading")

The query below selects logs from the default namespace and filters the logs to return only the ones that contain the "Exception" string. Copy:

```
{namespace="default"} |= "Exception"
```

You can find the well-known operators in LogQL too:

- `|=`: Log line contains string.
- `!=`: Log line does not contain string.
- `|~`: Log line contains a match to the regular expression.
- `!~`: Log line does not contain a match to the regular expression.

### Simplified Log Querying With Gimlet Stack Dash

If you install Loki with Gimlet Stack, a Logs dashboard is also installed. On this dashboard, you can query logs without much knowledge of LogQL.

It has a namespace, a container filter built in, and two querying fields:

- In the raw query field, you can type standard Loki LogQL queries.
- In the simple query field, you can type any string which is going to be matched like the following regex: `.*$simple_query.*`, basically meaning every log line where the given string is present.

![Loki logs in Grafana](https://book.gimlet.io/assets/images/logs-a8baced798862c9d1eff6817f7fbd0ae.png)
