# DNS

Configuring DNS settings is necessary when you'd like to access your application from a custom domain.

## Configure Nginx on Your Environment

If you'd like to configure a new instance of Nginx on your environment, navigate to environment settings by clicking the Environments button in the menu on top, and then selecting the environment by clicking on its card.

In the environment settings, navigate to ingress settings by clicking the Ingress button in the menu on the left.

Under Nginx settings, enable Nginx and enter the domain where you'd like to host the deployed applications. When you're done, click Save to finish configuring Nginx.

## Integrate Existing Ingress

If you already use an ingress controller, you can integrate it with Gimlet.

You can navigate to these settings by following the instructions mentioned above. Instead of Nginx settings, you need to scroll down to Existing Ingress settings this time.

After enabling the existing ingress variables, enter your custom domain where the ingress controller handles traffic, then enter ingress annotations.

Ingress annotations are environment variables. If you use Nginx, you can use `kubernetes.io/ingress.class: nginx`. 

## Gimlet Domains

Gimlet will generate a unique subdomain ending with `gimlet.app` for you. This way all the deployed applications will appear with this subdomain on this environment as long as you don't change domain settings.

## Set up Custom Subdomain for a Deployment

In the deployment settings you can specify a subdomain for the custom domain you configured with one of the methods described above.
