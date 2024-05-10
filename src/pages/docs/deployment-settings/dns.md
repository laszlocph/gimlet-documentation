# DNS

DNS configuration is necessary when you're trying to access your application from a custom domain. In this documentation, you'll see how to configure a domain for such use cases.

Preview deployments come with an app.gimlet.io URL, so DNS configuration isn't necessary in this case.

// we need to describe how to configure Gimlet managed persistent clusters with domain providers

## Ingress

Ingress is the incoming traffic to your application. Ingress controllers are responsible for routing HTTP and HTTPS traffic incoming to, and between containers running in a cluster.

You can configure Nginx with Gimlet to route traffic incoming to your application, as seen below:

![screenshot from platform for ingress things](/src/pages/docs/screenshots/gimlet-documentation-ingress-settings.png)

Host name is the the custom domain that you'd like to use to access the application. Turn on the HTTPS toggle to get HTTPS certification for secure connection. Gimlet uses Let's Encrypt to generate HTTPS certification.

### Locate the external IP address

The Nginx deployment has a `LoadBalancer` service type in Kubernetes, thus the cloud provider will provision a cloud load balancer for it. It may take a couple of minutes until the load balancer is created.

Find the service IP address now.

```
$ kubectl get svc -n infrastructure

NAME                     TYPE           CLUSTER-IP      EXTERNAL-IP     AGE
registry                 NodePort       10.43.142.56    <none>          3m52s
image-builder            ClusterIP      10.43.232.222   <none>          3m51s
gimlet-agent             ClusterIP      10.43.22.124    <none>          3m51s
ingress-nginx-controller LoadBalancer   10.43.78.31     100.200.0.2     40s
```

Set an A record in your DNS provider to `*.your-preferred-domain.com` to this EXTERNAL IP.

E.g.: if you dedicate every subdomain under `test.mycompany.com` to Gimlet, set the A record to `*.test.mycompany.com` to this EXTERNAL IP address.

If you are using the nip.io dynamic DNS service like I do in this tutorial, `*.100.200.0.2.nip.io` will be the domain name where you are going to access applications in this tutorial. Also, if you are using nip.io, now is the time to go back and reconfigure Nginx-s `tbd` value to `100.200.0.2.nip.io`. "Save components" to get the pull request, then merge to deploy it on the cluster. But you know the drill.

## Map your application to the domain name

Now that the Nginx reverse proxy is accessible on a public IP address and a domain name, it is time to map your application to that domain name.

### Edit application config

Navigate to the "Repositories" tab in Gimlet and pick your application repository.

Pick the environment configuration you want to edit, and click the cog wheel icon.

![](https://gimlet.io/cog.png)

- On the "Basics" tab set the "Port" your app is listening on
- Then on the "Ingress" tab set the following
    - "Host Name" to `your-app.test.mycompany.com` if you expose services under `test.mycompany.com`. In this tutorial I use nip.io so I set the host name to `reactjs-test-app.100.200.0.2.nip.io`
    - and add an "Annotation" with key `kubernetes.io/ingress.class` and value `nginx`. This some Kubernetes specific boilerplate, this is how we tell Kubernetes to associate the `Ingress` resource to Nginx.

![](https://gimlet.io/ingress-settings.png)

Press save, then inspect and merge the pull request.

Navigate back to the repository, refresh the commits if necessary, then deploy the latest commit.

### Access on the domain name

Open the application now on the configured domain name, like on `http://reactjs-test-app.100.200.0.2.nip.io` in my case.
