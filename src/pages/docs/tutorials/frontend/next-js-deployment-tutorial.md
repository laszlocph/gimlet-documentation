# Next.js Deployment Tutorial

## Step 1: Getting Started with Gimlet
Before you start deploying, you’ll need Gimlet installed on a cluster and the desired environments connected. To do so, you can follow the Gimlet setup documentation [here](link to docs).

Once you’re done, you can sign in with your GitHub or GitLab account.

If all is well, you should be able to see the repositories in Gimlet. Select the repository of your Next.js application.

![Screenshot of repo selection page](/next-js-tutorial-01.png)

## Step 2: Start Deploying Next.js Application

Click `Add deployment configuration`.

![Screenshot with add deployment configuration button](/next-js-tutorial-02.png)

Select the static site template and specify the repo’s URL.

![Screenshot with template selection and config settings](/next-js-tutorial-03.png)

Navigate to Build settings, where `Built assets` should be `/out`, and make sure that your `next.config.js` file has `output: 'export'` set.

![Screenshot with build settings](/next-js-tutorial-04.png)

Click save.

## Step 3: Deploy

After saving configuration, Gimlet will open a pull request in the repository of the Next.js app. Merge the pull request.

![Screenshot of GitHub pull request](/next-js-tutorial-05.png)

Click deploy in Gimlet and watch the status. After a while, status should become `running` and your Next.js app should be deployed successfully.

![Screenshot of status page](/next-js-tutorial-06.png)

## Step 4: Port-Forwarding

Your app still won’t be accessible from the internet. To make it accessible, follow the steps below.

Right to the app’s address, there is a `Port-forward command` button. Click the button to generate a command.

Run the command in the terminal. Here’s an example:

```

// deploy is an example namespace

// nextjs-app is the example app’s name

kubectl port-forward deploy/nextjs-app 10081:80

```

If you enter the address mentioned above in your browser, and type `:10081` at the end, you should be able to access your Next.js application.

## Use Cases

Here are a few examples of why hosting your Next.js application with Gimlet is for you:

- **OAuth & HTTPS/SSL:** Add social authentication and secure your Next.js application.
- **Branch previews:** Test changes on real environments.
- **Advanced deployment capabilities:** Rollbacks and automated deployments.

## Try Now

> Try Gimlet now with your Next.js application for free [here]().
