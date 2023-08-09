---
layout: post
title: Don't group environment variables
date: '2023-04-03'
image: dont-group.png
description: 'This is a preiodic reminder for application developers to not group environment variables. `APP_ENV=staging` easily becomes a blocker when you do application operation.'
---

At Gimlet.io, we have a consulting background. We join teams who want to adopt containers and Kubernetes, and we create the guardrails for developers who want to efficiently use these technologies.

Nowadays it is called platform engineering, but when we started these projects - and made our off-the-shelf IDP, Gimlet - it was just called devops tooling work.

tldr: we see hundreds of apps every year.

There is one particular practice that popped up recently more often than we would have expected, and that is grouping environment variables.

## Grouping environment variables

If the term does not ring a bell, it is the practice when an app requires a variable like `APP_ENV`, takes predefined values like `staging` or `production`, then there is a switch case in the code that sets further values based on the environment.

If APP_ENV equals staging, use this database connection string, if production use another. You get the gist, kind of like `NODE_ENV` and `RAILS_ENV`, but supercharged.

We are not saying that those frameworks promote a bad practice, but we do believe that developers get inspired by this environment concept and sometimes build hard to change assumptions into the code about the environment the app runs in.

This bad practice was well described in the [The Twelve-Factor App](https://12factor.net/config) methodology, which by the way is twelve years old this year. This post is a periodic reminder about the practices 12factor promotes and an example how grouping environment variables makes devops life difficult.

## An example how this practice makes devops life difficult

With grouping, assumptions about the environment are built into the code. Limiting the ability to reconfigure the application on-demand.

One common situation when someone wants to deviate from the built in assumptions is in case of incidents. When a database is down and restored on a different url, or when network traffic is rerouted due to a networking failure.

It happened to us during a disaster recovery plan rehearsal. It is one of the better times to reveal this bad practice, as it turned out many of the applications take database parameters in the form of environment flags, and hostnames of services that a given app depends on were also controlled by the environment flag.

```javascript
export const BACKEND_URL = {
  development: 'https://xx.staging.mycompany.com',
  staging: 'https://xx.staging.mycompany.com',
  production: 'https://xx.mycompany.com',
}
```

This practice may have helped codifying development setups, but during the disaster recovery rehearsal, it meant that we needed to change many of the apps so they take BACKEND_URL directly from the environment. Practically, it meant pull requests and waiting.

## Grouping environment variables causes friction

Just like a developer doesn't like to wait on an infrastructure component being created, operations people don't like waiting on application changes.

By following the best practice from [12factor.net](https://12factor.net/config) and exposing every configuration value as an environmet variable, the friction is eliminated, and you may also have improved the incident recovery time.

Onwards!
