# DNS

You can use DNS settings to make your application available on the internet. This tutorial will help you with the whole process.
## Setting Up an Nginx Ingress Controller

Nginx on a publicly accessible IP address is responsible for routing incoming traffic to your application. It's an open-source tool and it's supported by Gimlet.

In this section, you are going to use Gimlet to install Nginx.

Navigate to the "Environments" tab to get started.
### Convert to a gitops environment to be able to make changes

Gimlet generated a dummy environment at first start. You used that environment so far to deploy applications.

You are going to continue using this dummy environment in this tutorial and set up Nginx in it. But before you can make changes to this built-in environment, you have to convert it to a gitops environment. Practically, you have to push the "convert it to a gitops environment" link in the notice below.

It will create two repositories on Github, one for application manifests, and one for infrastructure manifests. It is a good time to inspect the contents now. These are the manifests that are synchronized to Kubernetes on every commit.

![](https://gimlet.io/convert.png)

### Enabling Nginx

Enable Nginx under Environments > Brief-Pond > Infrastructure components tab > Nginx > Config tab, where brief-pond is the name of my dummy environment.

Set your domain name in the "Host" field.

Gimlet is using wildcard DNS entries to simplify DNS management, so if you dedicate every subdomain under `test.mycompany.com` to Gimlet, set this value in the Host field.

I don't have a real domain name for this tutorial, so I will set the value `tbd` for now and will update to a nip.io domain later in this tutorial once the external IP of Nginx is known.

![](https://gimlet.io/nginx-tbd.png)

Save the configuration with the "Save componentes" button. Inspect and merge the pull request that is created by Gimlet.

Once you merge the pull request, the changes will be synchronized to your cluster. You can track the synchronization status on the bottom toolbar.

![](https://gimlet.io/gitops-status.png)

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
