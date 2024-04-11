# HTTPS

HTTPS utilizes SSL/TLS encryption to secure connection between your application and users.

To get free HTTPS certification, you can use Let's Encrypt with Gimlet as described below.
## Install Cert-Manager

Navigate to Environments, where you need to select the environment where your application is running.

After selection, navigate to Cert-Manager, and look for the Config tab.

Save components, then merge the pull request in your git repository.
## Reconfigure App Ingress to Use Cert-Manager

HTTPS certifications come with an expiration date. You can set up the Cert-Manager to provision new SSL certificates for your application. For this, you need to edit the application deployment configuration.

On the Ingress tab toggle the HTTPS field, then add an annotation with key `cert-manager.io/cluster-issuer` and value `letsencrypt`.

Save the configuration, merge the pull request then redeploy the application.

Open the application now on the configured domain name, (example: `https://reactjs-test-app.100.200.0.2.nip.io`), this time over a secured connection.

It takes about a minute for Cert-Manager to provision the certificate, so don't worry if the certification is still missing on first try. Anything more indicates an issue.

**Note:** Let's Encrypt doesn't issue certificates for nip.io domains.
