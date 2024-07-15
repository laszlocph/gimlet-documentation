---
title: 'Automated Deployments'
description: |
  Deployments can be automated in Gimlet without using GitHub Actions or other continuous integration technology.
---

You can automate deployments when you'd like to focus on writing code or fixing bugs instead of manually deploying changes to your application.

No continuous integration or GitHub Action pipeline is necessary for this.

![Automated deployment configuration settings in Gimlet.](/docs/screenshots/gimlet-io-automated-deployments.png)

**Step 1:** After your application was deployed and configuration was written to Git, look for the (...) or meatballs menu in the app's service card. Click **Edit** in the menu.

**Step 2:** In the General settings of the application, look for **Automated Deploys**, and use the toggle to enable it.

**Step 3:** Specify the event that triggers the automated deployment. These are your optons:

- push: Commits pushed will be automatically deployed.
- tag: New tags will be automatically deployed.
- pr: New pull requests will be automatically deployed.

Additionally you can use the **Branch filter** setting if you'd like to configure automated deployments for a certain branch.
