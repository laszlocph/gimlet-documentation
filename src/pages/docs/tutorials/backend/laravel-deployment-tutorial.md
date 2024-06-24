---
title: 'Deployments of Laravel Applications'
description: |
  Laravel is a popular PHP framework, which you can deploy with Gimlet.
---

**Laravel is a popular PHP framework, which you can deploy with Gimlet.**

## Step 1: Get Started with Gimlet

Log in to Gimlet by connecting your account to your GitHub or GitLab.

After successful connection, you should see repositories listed, which you can import. If you can't find the Laravel project's repository, use the search bar, then click the Import button next to it.

You can add multiple repositories, click I am done importing to save the added repos.

## Step 2: Deployment Settings for Laravel

To get started with the deployment process, navigate to the deployment settings by clicking the repo's card in the repository list.

Select the Web Application template, and then the Dockerfile container image option. Under the Registry options, select the Gimlet registry setting.

This method requires a Dockerfile located in the root folder of your project. If you don't have one, you can use the one below.

```
FROM php:8.2.19-alpine
WORKDIR /var/www/html

RUN apk update 
RUN curl -sS https://getcomposer.org/installer | php -- --version=2.4.3 --install-dir=/usr/local/bin --filename=composer

COPY . .
RUN composer install

RUN php artisan key:generate
RUN php artisan config:cache

CMD ["php","artisan","serve","--host=0.0.0.0"]
```

Define the port where you'd like to access the app, like `8000` for example.

You can specify a custom domain, but Gimlet will generate one for you, which you can share with your teammates after the deployment is done.

## Step 3: Deploy and Check Your Laravel App

When all the setting changes are made, you can click the Deploy button. Build and deployment logs should appear, and when container status turns running, you can use the clickable link next to it to see if the app is up and running without errors.
