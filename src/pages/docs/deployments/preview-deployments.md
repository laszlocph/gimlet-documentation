---
title: 'Preview Deployments'
description: |
  Preview deployments are useful when you'd like to share projects with teammates or clients.
---

**Preview deployments are useful when you'd like to share your application with others on the internet.**

You can configure previews by navigating to the preview tabs of deployment settings. Click **Configure Previews**, and select the environment where you'd like to deploy previews.

![Configure Previews button in Gimlet's preview deployment settings.](/docs/screenshots/preview-deployments/gimlet-io-preview-deployments-01.png)

After selecting the environment, you can proceed similar to how you can deploy applications manually.

![Preview deployment configuration settings in Gimlet.](/docs/screenshots/preview-deployments/gimlet-io-preview-deployments-02.png)

When you're done configuring the preview, you can verify the changes you made by clicking **Review changes** next to the Save button, then save the configuration.

After that, open the repository in another tab, then get the manifest file you just created. It's located in the `.gimlet` folder in your app's root folder, and its name contains the name of the environment. Add it to the branch that you'd like to preview. The preview should be deployed automatically after the commit with the manifest file is pushed.

The successful preview deployment should look similar to a regular deployment, as seen below in the service card.

![Service card of a preview deployment in Gimlet.](/docs/screenshots/preview-deployments/gimlet-io-preview-deployments-03.png)
