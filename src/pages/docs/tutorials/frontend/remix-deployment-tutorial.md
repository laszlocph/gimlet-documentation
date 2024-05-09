# How to Deploy Remix Applications with Gimlet

## Step 1: Getting Started with Gimlet

Sign in with your GitHub or GitLab account.

![screenshot of sign in page]()

If signing in was successful, your repositories should be visible on Gimlet. Choose the repository of the Remix application.

![screenshot of repo selection page]()

## Step 2: Start Deploying Remix Application

Click the `Add deployment configuration` button.

![screenshot with add deployment configuration button]()

Pick the static site template and add the repo’s URL.

`Built assets` should be `/out`, and make sure that your `next.config.js` file has `output: 'export'` set.

![screenshot with template selection and config settings]()

Click save.

## Step 3: Deploy

When you’re done with configuration, Gimlet will create a pull request in the Remix app’s repository. Merge the pull request to continue.

![screenshot of GitHub pull request]()

Go back to Gimlet, and click the deploy button. When the app is deployed, status should turn to `running`.

![screenshot of status page]()

## Step 4: Port-Forwarding

To be able to access your application on the internet, you'll have to port-forward. You can achieve this by generating and running a port-forward command.

Click on the `Port-forward command` button next to the app’s address to generate the command. Copy and paste it, then run it in terminal. Here’s an example:

```
// deploy is an example namespace
// nextjs-app is the example app’s name
kubectl port-forward deploy/nextjs-app 10081:80
```

Enter the application’s address in your browser, and copy paste `:10081` at the end. Press Enter. Now you should be able to access your Remix application.

## Use Cases

Here are a few examples of why hosting your Remix application with Gimlet is for you:

- **OAuth & HTTPS/SSL:** Add social authentication and secure your Next.js application.   
- **Branch previews:** Test changes and share previews on real environments.
- **Advanced deployment capabilities:** Roll back to previous versions and automate deployments. 
## Try Now

> Try Gimlet now with your Remix application for free here.
