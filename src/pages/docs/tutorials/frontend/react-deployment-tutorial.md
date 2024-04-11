# How to Deploy React Applications Using Gimlet

## Step 1: Getting Started with Gimlet
Sign in with your GitHub or GitLab account.

![screenshot of sign in page]()

After signing in, your repositories should be listed on Gimlet. Pick the repository of the React application.

![screenshot of repo selection page]()

## Step 2: Start Deploying React Application

Click `Add deployment configuration`.

![screenshot with add deployment configuration button]()

Choose the static site template and enter the repo’s URL.

`Built assets` should be `/out`, and make sure that your `next.config.js` file has `output: 'export'` set.

![screenshot with template selection and config settings]()

Click save.

## Step 3: Deploy

When configuration is ready, Gimlet will create a pull request in the repository of the React app. Merge the pull request to continue.

![screenshot of GitHub pull request]()

Navigate back to Gimlet, and click the deploy button to start the deployment process. When status turns `running`, your React application should be deployed successfully.

![screenshot of status page]()

## Step 4: Port-Forwarding

At this point, your application still won’t be accessible on the internet. Follow the steps of port-forwarding below.

Click on the `Port-forward command` button next to the app’s address to generate the command.

Run it in the terminal. Here’s an example:

```
// deploy is an example namespace
// nextjs-app is the example app’s name
kubectl port-forward deploy/nextjs-app 10081:80
```

Enter the application’s address in your browser, and copy paste `:10081` at the end. Press Enter. Now you should be able to access your React application.

## Use Cases

Here are a few examples of why hosting your React application with Gimlet is for you:

- **OAuth & HTTPS/SSL:** Add social authentication and secure your React application.   
- **Branch previews:** Test changes and share previews on real environments.
- **Advanced deployment capabilities:** Roll back to previous versions and automate deployments. 
## Try Now

> Try Gimlet now with your React application for free here.
