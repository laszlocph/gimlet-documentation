# Flowise Deployment Tutorial

Flowise is a drag & drop style AI workflow builder. Here's how you can deploy it with Gimlet.

## Step 1: Get Started with Gimlet

Log in to Gimlet by connecting your GitHub or GitLab account. You should see your repositories listed. Use the search bar if the repository with Flowise won't appear.

## Step 2: Deployment Settings for Flowise

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

In Gimlet, now select the ghcrRegistry option under Registry settings, and set Port value to 3000. Then specify a custom domain if you'd like to use one, but Gimlet generates a URL where you'll be able to access Flowise after deployment.

**Note:** make sure the name is lowercase, otherwise Kaniko won't be able to build the image.

## Step 3: Deploy Flowise

After all the settings are specified, click the Deploy button. Logs should appear rightaway, and when the deployment is successful, confetti will rain in your browser window.

Keep in mind that Flowise is a fairly large container, so it'll take a few minutes to launch it with Gimlet.

## Step 4: Try Flowise in Your Browser

Navigate back to the repository preview by clicking the repo's name. In the card's Address section there will be a clickable link, which you can open to access and share Flowise.

## Use Cases

Gimlet offers different advantages when you use Flowise to create AI workflows.

- **Remote CUDA Resources:** If you don't have access to Nvidia GPUs locally, you can still utilize CUDA on the cloud.
- **File Syncing:** Keep code consistent across your team and their machines.
- **Easily Share Flowise:** Add social authentication and set up HTTPS connection between your Flowise and your teammates.

## Choose Gimlet When You Work with Flowise

> Give Gimlet a try now to deploy Flowise.
