---
title: Gimletd configuration reference
description: On this page you can see the deployment manifests of Gimletd.
---

On this page you will see Gimletd's installation manifests.

The preferred method to install Gimletd is through the [Gimlet Installer](/docs/installation). This page is a full configuration reference should you need to adjust the configuration.

## Installation yamls and configuration

You can get the Kubernetes yamls by rendering the Helm chart with the minimum configuration you can see below:

```bash
cat << EOF > values.yaml
image:
  repository: ghcr.io/gimlet-io/gimletd
  tag: latest
  pullPolicy: Always
containerPort: 8888
probe:
  enabled: true
  path: /
EOF

helm template gimletd onechart/onechart -f values.yaml
```

### Ingress to expose the Gimletd API

```diff
image:
  repository: ghcr.io/gimlet-io/gimletd
  tag: latest
probe:
  enabled: true
  path: /
volumes:
  - name: data
    path: /var/lib/gimletd
    size: 1Gi
  - name: repo-cache
    path: /tmp/gimletd
    size: 5Gi
+ingress:
+  annotations:
+    kubernetes.io/ingress.class: nginx
+    cert-manager.io/cluster-issuer: letsencrypt
+  host: gimletd.mycompany.com
+  tlsEnabled: true
```

Once you did this basic configuration, time to run Gimletd for the first time. Shall we?

### Admin token

When you first start Gimletd, it inits the database and prints the admin token to the logs.

```
{"level":"info","msg":"Admin token created: eyJhbGciOiJIUzI1NiIsInR5cCxxxs","time":"2021-11-11T09:04:03Z"}
```

Add this admin token in your password manager now, and make a user token for yourself:

```bash
curl -i \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -X POST -d '{"login":"my-user"}' \
  http://gimletd.mycompany.com:8888/api/user?access_token=$GIMLET_ADMIN_TOKEN
```

Save the returned user token from the result.

{% callout title="To get the admin token after the first start" %}
If you want to print the admin token after the first start, add the `PRINT_ADMIN_TOKEN: true` environment variable to Gimletd's config.
{% /callout %}

## Persistence

### Volumes to back the state

```diff
image:
  repository: ghcr.io/gimlet-io/gimletd
  tag: latest
probe:
  enabled: true
  path: /
+volumes:
+  - name: data
+    path: /var/lib/gimletd
+    size: 1Gi
+  - name: repo-cache
+    path: /tmp/gimletd
+    size: 5Gi
```

The purpose of these volumes are:
- the `data` volume is for the sqlite database to keep metadata in it.
- the `repo-cache` volume is what Gimletd uses as scratch space for git operations. It is good practice to add a volume under it, so the high IO work Gimletd does is performed on a real disk, with measurable and controllable IO, and not on the operating system disk.

### Using Postgresql

If you prefer, you can use Postgresql instead of SQLite.

```diff
image:
  repository: ghcr.io/gimlet-io/gimletd
  tag: latest
probe:
  enabled: true
  path: /
volumes:
-  - name: data
-    path: /var/lib/gimletd
-    size: 1Gi
  - name: repo-cache
    path: /tmp/gimletd
    size: 5Gi
+vars:
+  DATABASE_DRIVER: postgres
+  DATABASE_CONFIG: "postgres://gimletd:yourpassword@postgresql:5432/gimletd?sslmode=disable"
```

## Notifications on gitops repo applies

This section you will configure Flux - the gitops controller - to notify Gimletd whenever it applies the latest changes.

- Generate a Gimlet user for Flux:

```bash
curl -i \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -X POST -d '{"login":"flux"}' \
  http://gimletd.mycompany.com:8888/api/user\?access_token\=$GIMLET_ADMIN_TOKEN
```

- Create the `notifications.yaml` file in your gitops repo under $your_env/flux/notifications.yaml

```yaml
apiVersion: notification.toolkit.fluxcd.io/v1beta1
kind: Provider
metadata:
  name: gimletd
  namespace: flux-system
spec:
  type: generic
  address: https://gimletd.<your-company-com>/api/flux-events?access_token=<token>
---
apiVersion: notification.toolkit.fluxcd.io/v1beta1
kind: Alert
metadata:
  name: all-kustomizations
  namespace: flux-system
spec:
  providerRef:
    name: gimletd
  eventSeverity: info
  eventSources:
    - kind: Kustomization
      namespace: flux-system
      name: '*'
  suspend: false
```

You will see the notifications reaching Slack:

![Notifications on gitops applies](https://raw.githubusercontent.com/gimlet-io/gimletd/tip/docs/notifs.png)

## Configure the gitops repository

Gimletd's main job is to work on the gitops repository. It encompasses all logic that write the gitops repository, and encapsulates the heavy audit log processing algorithms.

In this section you will configure the gitops repositories, so Gimletd can write deployment manifests upon deployment to environments.

{% callout title="You can use Gimlet Dashboard for this task" %}
Remember, you can use Gimlet Dashboard for this task. There is a 1-click config option for each environment if there is no Gimletd config exists yet.
{% /callout %}

To configure a gitops repository, and thus a Gimlet environment, use the `GITOPS_REPOS` environment variable.

An example for it

```
GITOPS_REPOS=env=staging&repoPerEnv=false&gitopsRepo=gitops-staging-infra&deployKeyPath=/github/staging.key
```

You can set multiple environment configs by separating the entries by the `;` ist separator.

#### Granting access with a deploy key

The above configuration refers to a deploy key that must be mounted under `/github/staging.key`.

- Generate a keypair with 

```
ssh-keygen -t ed25519 -C "your_email@example.com"
``` 

- Open GitHub, navigate to your gitops repository, and under *Settings > Deploy keys* click on *"Add deploy key"*
- Paste the generated public key
- Make sure to check the *"Allow write access"* checkbox

Add the keys to the Gimletd installation config:

```diff
image:
  repository: ghcr.io/gimlet-io/gimletd
  tag: latest
probe:
  enabled: true
  path: /
[...]
+vars:
+  GITOPS_REPO: mycompany/gitops
+  GITOPS_REPO_DEPLOY_KEY_PATH: /github/deploy.key
+sealedFileSecrets:
+  - name: github-gitops-deploy-key
+    path: /github
+    filesToMount:
+      - name: deploy.key
+        source: AgA/7BnNhSkZAzbMqxMDidxK[...]
```

If you don't have Sealed Secrets running in your cluster, you can use your own secrets solution, or the following example
that uses regular Kubernetes secrets stored in git (not for production use).

```diff
image:
  repository: ghcr.io/gimlet-io/gimletd
  tag: latest
probe:
  enabled: true
  path: /
[...]
vars:
[...]
+fileSecrets:
+  - name:  github-gitops-deploy-key
+    path: /github
+    secrets:
+      deploy.key: |
+        -----BEGIN OPENSSH PRIVATE KEY-----
+        b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAACFwAAAAdzc2gtcn
+        NhAAAAAwEAAQAAAgEA7BqMTFnDm6+C9FrRK5aoj[...]
EOF
```

## Notifications

### Sack

First, create a Slack app

To generate a new Slack token, visit the [https://api.slack.com/apps](https://api.slack.com/apps) page and follow these steps:

- Create a new application. *"App Name"* is Gimlet, pick your workspace as *"Development Slack Workspace"*
- Navigate to *"OAuth & Permissions"* on the left sidebar
- Under *"Bot Token Scopes"*, add scopes `chat:write`, `chat:write.customize` and `chat:write.public`
- Click the *"Install App to Workspace"* button on the top of the page
- Once you installed the app, save *"Bot User OAuth Access Token"* in Gimlet above


```diff
image:
  repository: ghcr.io/gimlet-io/gimletd
  tag: latest
probe:
  enabled: true
  path: /
[...]
+vars:
+  NOTIFICATIONS_PROVIDER: slack
+  NOTIFICATIONS_TOKEN: xoxb-41[...]
+  NOTIFICATIONS_DEFAULT_CHANNEL: gimletd
```

### Discord

- First, make sure you’re logged in on the Discord website.
- Navigate to the application page: [https://discord.com/developers/applications](https://discord.com/developers/applications)
- Click on the “New Application” button.
- Enter "Gimlet" and confirm the pop-up window by clicking the "Create" button.
- Create a bot by navigating to the “Bot” tab, and clicking the “Build-A-Bot” button.
- Click the "Add Bot" button on the right and confirm the pop-up window by clicking the "Yes, do it!" button.
- After you received the "A wild bot has appeared!" message, copy your bot token from the "Build-A-Bot" submenu.
- Navigate to "OAuth2" -> "URL Generator" on the left panel.
- Check "Bot" in Scopes and check "Send Messages" in "Bot Permissions" -> "Text Permissions".
- Copy your generated URL from the bottom of the page, and open it in a new tab.
- Select the server you would like to add your bot to, and click "Continue". You can only select servers on which you have admin privileges. Make sure the "Send Messages" option is checked, before clicking on the "Authorize" button.
- After the security check, your bot will automatically join the server.
- The final step is to get the channel ID of the channel where you would like to get notifications. In order to do that, first you need to go to "User Settings" -> "Advanced", and enable "Developer Mode". This will allow you to see and copy your channel IDs.
- Now you can copy your text channel ID on Discord's main page by right clicking on the desired channel in the left panel and choosing the "Copy ID" option. 
- Make sure that the newly created bot is a member of your channel. Use the "Add members or roles" button in the channel to invite your bot's role.

```diff
image:
  repository: ghcr.io/gimlet-io/gimletd
  tag: latest
probe:
  enabled: true
  path: /
[...]
+vars:
+  NOTIFICATIONS_PROVIDER: discord
+  NOTIFICATIONS_TOKEN: OTQwO[...]
+  NOTIFICATIONS_DEFAULT_CHANNEL: "140971232847884321"
```

## Github integration

Gimletd integrates with Github with a dedicated Github Application.

Gimletd uses this integration to:
- detect deleted branches in your source code repositories
- send commit statuses on gitops operations
- read private Helm charts, should you use a custom Helm chart for your applications

#### Integrating through a Github Application

There are multiple ways that you can integrate with Github. Gimletd chooses to use a Github Application which has the most fine-grained access model.
You can set which repositories Gimletd can access, and what it can do with those repositories.

You will use a dedicated Github Application, that you create.
Practically you don't give access to any third-party, not even the makers of Gimlet.

#### Creating the Github Application

To create the Github Application, we provide a script that is writing an HTML file to your disk, and guides you through the creation process.

When you click the *"Create Github app"* button, you are forwarded to Github where you can confirm your application's name. All settings are sent to Github
in a json structure, holding the required permission list, webhook URLs and so on, so you don't have to perform too many manual steps.

Now scan the source of the HTML file.

```bash

cat << EOF > create-app.html
<form action="https://github.com/settings/apps/new" method="post">
  <input type="hidden" name="manifest" id="manifest"><br>
  <input type="submit" value="Create Github app">
</form>

<script>
  var url = new URL(window.location);
  var code = url.searchParams.get("code");

  if (code) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      console.log(xhr.response)

      var responseObj = JSON.parse(xhr.response)

      document.open();

      document.write('<p>GITHUB_APP_ID: ' + responseObj.id + '</p>');
      document.write('<p>GITHUB_PRIVATE_KEY: <br/>' + responseObj.pem.replaceAll('\n', '<br/>') + '</p>');

      document.close();
      }
    }
    xhr.open("POST", "https://api.github.com/app-manifests/"+code+"/conversions", true);
    xhr.send();
  }
</script>

<script>
  input = document.getElementById("manifest")
  input.value = JSON.stringify({
  "name": "Gimletd",
  "url": "https://gimlet.mycompany.com",
  "callback_url": "https://gimlet.mycompany.com",
  "hook_attributes": {
    "url": "https://gimlet.mycompany.com/hook"
  },
  "redirect_url": "http://127.0.0.1:11111/create-app.html",
  "public": false,
  "default_permissions": {
    "contents": "read",
    "statuses": "write",
  },
  "default_events": []
  })
</script>
EOF

PORT=11111 npx http-server -o /create-app.html
```

Once you clicked the *"Create Github app"* button, and confirmed the app's name on Github, you are redirected to a page that shows all
the required configuration values for Gimlet Dashboard.

Copy them to your Helm values file accordingly.

```diff
image:
  repository: ghcr.io/gimlet-io/gimletd
  tag: latest
probe:
  enabled: true
  path: /
+vars:
+  GITHUB_APP_ID: 123456789
+  GITHUB_INSTALLATION_ID: "987654321"
+  GITHUB_PRIVATE_KEY: |
+    -----BEGIN RSA PRIVATE KEY-----
+    MIIEowIBAAKCAQEAxpLdgC6KEDFPx5...
+    ...
```

To obtain the `INSTALLATION_ID`, navigate to [https://github.com/settings/apps](https://github.com/settings/apps) and edit your just created application.
Click *Install App* in the sidebar to install it on the account that you want Gimletd to access.

You can copy the `INSTALLATION_ID` from your browsers address bar after installation. The URL will be in the following format:
[https://github.com/settings/installations/$INSTALLATION_ID]()

That's all.

Now you integrated Gimletd with Github.

> If you are in doubt about the process, you can crosscheck our script with Github's general guide on how to create a Github Application [here](https://docs.github.com/en/developers/apps/building-github-apps/creating-a-github-app)

> You can also validate our script on Github's [Creating a GitHub App from a manifest](https://docs.github.com/en/developers/apps/building-github-apps/creating-a-github-app-from-a-manifest) guide

## Misc

### Limiting resources

```diff
image:
  repository: ghcr.io/gimlet-io/gimletd
  tag: latest
probe:
  enabled: true
  path: /
[...]
+resources:
+  requests:
+    cpu: "50m"
+    memory: "200Mi"
+  limits:
+    cpu: "2000m"
+    memory: "1000Mi"
```

### Debug sidecar container

In case you need tools to debug.

```diff
image:
  repository: ghcr.io/gimlet-io/gimletd
  tag: latest
probe:
  enabled: true
  path: /
[...]
+ sidecar:
+   repository: debian
+   tag: stable-slim
+   shell: "/bin/bash"
+   command: "while true; do sleep 30; done;"
```

## Verifying the installation

To verify Gimletd, run the [Bootstrap gitops automation with Gimlet CLI](/docs/bootstrap-gitops-automation-with-gimlet-cli) tutorial.
