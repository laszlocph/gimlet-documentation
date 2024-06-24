---
title: 'Deployment of Flowise'
description: |
  Flowise is a drag & drop style AI workflow builder. Here's how you can deploy it with Gimlet.
---

**Flowise is a drag & drop style AI workflow builder. Here's how you can deploy it.**

## Step 1: Get Started with Gimlet

Log in to Gimlet by connecting your GitHub or GitLab account. You should see your repositories listed. Use the search bar if the repository with Flowise won't appear.

After connecting your account, the repositories available should be listed in Gimlet. If you can't find the repo with Flowise in it, you can use the search bar to find it.

Click the Import button next to the repository. You can add multiple repos the same way. When all the repositories are selected, click I am done importing to save the added repos.

## Step 2: Deployment Settings for Flowise

Click on the repo's card to navigate to deployment settings.

For Flowise's deployment, you can select the Web Application template, and then pick the Dockerfile image container option. In case you don't have a Dockerfile, you can use Flowise' official one, as seen below, or fork the [repository](https://github.com/FlowiseAI/Flowise/).

```
# Build local monorepo image
# docker build --no-cache -t  flowise .

# Run image
# docker run -d -p 3000:3000 flowise

FROM node:20-alpine
RUN apk add --update libc6-compat python3 make g++
# needed for pdfjs-dist
RUN apk add --no-cache build-base cairo-dev pango-dev

# Install Chromium
RUN apk add --no-cache chromium

#install PNPM globaly
RUN npm install -g pnpm

ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /usr/src

# Copy app source
COPY . .

RUN pnpm install

RUN pnpm build

EXPOSE 3000

CMD [ "pnpm", "start" ]
```

In Gimlet, now select the Gimlet Registry option under Registry settings, and set Port value to 3000. Then specify a custom domain if you'd like to use one, but Gimlet generates a URL where you'll be able to access Flowise after deployment. See config settings in the screenshot below:

![Flowise deployment settings in Gimlet. ghcrRegistry is selected, and the exposed port value is set at 3000](/src/pages/docs/screenshots/flowise-deployment/flowise-deployment-configuration.png)

**Note:** make sure the name is lowercase, otherwise Kaniko won't be able to build the image.

## Step 3: Deploy Flowise

After all the settings are specified, click the Deploy button. Logs should appear rightaway, and when the deployment is successful, confetti will rain in your browser window.

Keep in mind that Flowise is a fairly large container, so it'll take a few minutes to launch it with Gimlet.

## Step 4: Try Flowise in Your Browser

Navigate back to the repository preview by clicking the repo's name. In the card's Address section there will be a clickable link, which you can open to access and share Flowise.

![Flowise repository card in the repo preview. The card has a clickable link under the Address section.](/src/pages/docs/screenshots/flowise-deployment/flowise-repository-view-card.png)

Here's how Flowise should look in your browser:

![Flowise UI after successful deployment.](/src/pages/docs/screenshots/flowise-deployment/flowise-screenshot.png)

## Use Cases

Gimlet offers different advantages when you use Flowise to create AI workflows.

- **Remote CUDA Resources:** If you don't have access to Nvidia GPUs locally, you can still utilize CUDA on the cloud.
- **File Syncing:** Keep code consistent across your team and their machines.
- **Easily Share Flowise:** Add social authentication and set up HTTPS connection between your Flowise and your teammates.

## Choose Gimlet When You Work with Flowise

> Give Gimlet a try now to deploy Flowise.
