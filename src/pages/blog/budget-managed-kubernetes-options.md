---
layout: post
title: 'Budget managed Kubernetes options'
date: '2023-08-18'
image: budget-managed-k8s.png
description: 'Managed Kubernetes starts at 5$ a month. With free control planes, they are now comparable with VPS options out there. Let&apos;s look at the options!'
---

After looking at [a 6.37 EUR a month Kubernetes cluster on Hetzner](/blog/a-6-37-mo-single-node-kubernetes-cluster-on-hetzner-with-vitobotta-hetzner-k3s?ref=blog-budget-managed-kubernetes-options), let's look at the budget managed Kubernetes options.

The presented budget Kubernetes options are now comparable in price with the VPS options out there.

The value add of Kubernetes compared to a VPS is that you don't interact with your node over SSH (running sudo commands off of the internet) but you use the kubernetes API resources like a `Deployment`, `Service`, `Configmap`, you may end up with a better groomed system over time - especially if you [use gitops](/concepts/the-sane-gitops-guide?ref=blog-budget-managed-kubernetes-options).

Let's look at the options!

## The prices

What all these options share, is that they don't charge for the Kubernetes master nodes, aka the control plane. On hyperscaler cloud providers - like AWS - this is a 75$/150$ charge a month just to have a cluster. In comparison, having a functional kubernetes cluster for 5$ a month is a steal.

|||||
|---|---|---|---|
|  CIVO  | 1core/1GB  | 5$ | $250 credit for 1 month |
|  CIVO  | 1core/2GB  | 10$ | $250 credit for 1 month |
|  CIVO  | 2core/4GB  | 20$ | $250 credit for 1 month |
|  Linode | 1core/2GB  | 12$  | $100 credit for 60 days |
|  Digital Ocean | 1core/2GB  | 12$  | $200 credit for 60 days |
|  Scaleway |  3core/4GB | 18$  | €100 free credit for businesses |

As a reference, you can get a 2core/4GB VPS at Hetzner and install kubernetes (k3s) on it with a [not too involved](/blog/a-6-37-mo-single-node-kubernetes-cluster-on-hetzner-with-vitobotta-hetzner-k3s?ref=blog-budget-managed-kubernetes-options) process. Of course you have to maintain that kubernetes yourself.

In the following chapters
- I launch a cluster on all the providers,
- report back the first impression
- and check how much resources are left for your deployments.

## CIVO

CIVO is the cheapest among the four options.

I used the following command to launch the cluster:

```
civo kubernetes create civo-cluster \
  --size g4s.kube.xsmall \
  --nodes 1 \
  --save --merge --wait \
  --create-firewall \
  --firewall-rules "default" \
  --applications "" \
  --remove-applications=Traefik-v2-nodeport \
  --remove-applications=metrics-server
```

- 🟢 One command to launch the cluster 
- 🟢 Cluster startup time 1,5-2 minutes
- 🟠 Took many iterations to nail the cluster create command. Some options were not intuitive, some were inconsistent.
- 🟢 Not too many system components. Compared to the other options.

As for useful capacity, 75% of the one core can be used for your workloads and half of the memory. You can tune these default settings as in reality the system is not using more than a 10% CPU when idle.

```
Allocatable:          
  cpu:    750m     
  memory: 441352Ki       
  pods:   110   
...

Non-terminated Pods:          (4 in total)
  Namespace    Name                        CPU Requests  CPU Limits  Memory Requests  Memory Limits  
  ---------    ----                        ------------  ----------  ---------------  -------------  
  kube-system  civo-ccm-db67548d-77h94     0 (0%)        0 (0%)      0 (0%)           0 (0%)         
  kube-system  coredns-59b4f5bbd5-z4l86    100m (13%)    0 (0%)      70Mi (16%)       170Mi (39%)    
  kube-system  civo-csi-node-kpgkx         0 (0%)        0 (0%)      0 (0%)           0 (0%)         
  kube-system  civo-csi-controller-0       0 (0%)        0 (0%)      0 (0%)           0 (0%)         
...

Allocated resources:
  (Total limits may be over 100 percent, i.e., overcommitted.)
  Resource           Requests    Limits 
  --------           --------    ------ 
  cpu 100m (13%)  0 (0%) 
  memory             70Mi (16%)  170Mi (39%)
```

## Linode

- 🟠 No single binary CLI, you have to use Python's pip package manager. I will not do that for this post.
- 🟢 2 minutes cluster startup time
- 🟠 45% of the single core is occupied by system pods.
```
Allocatable:                                                
  cpu:                1         
  memory:             1930780Ki                                                
  pods:               110 
...

Non-terminated Pods:          (7 in total)
  Namespace        Name                            CPU Requests  CPU Limits  Memory Requests  Memory Limits
  ---------        ----                            ------------  ----------  ---------------  -------------
  kube-system      calico-kube-controllers-756cc5  0 (0%)        0 (0%)      0 (0%)           0 (0%)
  kube-system      calico-node-7mr2p               250m (25%)    0 (0%)      0 (0%)           0 (0%)
  kube-system      coredns-75fd9f59f7-9jtq4        100m (10%)    0 (0%)      70Mi (3%)        170Mi (9%)
  kube-system      coredns-75fd9f59f7-xsfvj        100m (10%)    0 (0%)      70Mi (3%)        170Mi (9%)
  kube-system      csi-linode-controller-0         0 (0%)        0 (0%)      0 (0%)           0 (0%)
  kube-system      csi-linode-node-ljcjk           0 (0%)        0 (0%)      0 (0%)           0 (0%)
  kube-system      kube-proxy-29dzj                0 (0%)        0 (0%)      0 (0%)           0 (0%)

...
Allocated resources:
  (Total limits may be over 100 percent, i.e., overcommitted.)
  Resource           Requests    Limits
  --------           --------    ------
  cpu                450m (45%)  0 (0%)
  memory             140Mi (7%)  340Mi (18%)
```

## Digital Ocean

```
doctl kubernetes cluster create do-cluster \
  --count 1 \
  --region lon1 \
  --size s-1vcpu-2gb
```

You can use `doctl kubernetes options regions` to get the list of regions and `doctl kubernetes options sizes` the available node sizes.

- 🟢 Creating the startup command was straightforward
- 🟠 5 minutes to start the cluster
- 🟠 90% of the single core is occupied by system pods. While technically the system pods only use the 5% of the VM CPU based on Digital Ocean's observability, the default kubernetes settings budgeted 90% of the core for system pods. This is the kind of overhead that people often mean when they talk about kubernetes.
- 🟠 The cluster is running at least 5 DO specific system pods that other providers manage to live without. 


```
Allocatable:                                                          
  cpu:    900m
  memory: 1574Mi
  pods:   110
...

Non-terminated Pods:          (9 in total)
  Namespace      Name                                CPU Requests  CPU Limits  Memory Requests  Memory Limits
  ---------      ----                                ------------  ----------  ---------------  -------------
  kube-system    cilium-jb5gw                        300m (33%)    0 (0%)      300Mi (19%)      0 (0%)
  kube-system    cilium-operator-6db9b754c8-v4fkz    100m (11%)    0 (0%)      150M (9%)        150M (9%)
  kube-system    coredns-575d7877bb-jcd64            100m (11%)    0 (0%)      150M (9%)        150M (9%)
  kube-system    coredns-575d7877bb-q28cw            100m (11%)    0 (0%)      150M (9%)        150M (9%)
  kube-system    cpc-bridge-proxy-nsbnv              100m (11%)    0 (0%)      75Mi (4%)        0 (0%)
  kube-system    csi-do-node-vlt6n                   0 (0%)        0 (0%)      0 (0%)           0 (0%)
  kube-system    do-node-agent-w7rf2                 102m (11%)    102m (11%)  80Mi (5%)        300Mi (19%)
  kube-system    konnectivity-agent-gk4vd            0 (0%)        0 (0%)      0 (0%)           0 (0%)
  kube-system    kube-proxy-4vjbn                    0 (0%)        0 (0%)      125Mi (7%)       0 (0%)

...
Allocated resources:
  (Total limits may be over 100 percent, i.e., overcommitted.)
  Resource           Requests          Limits
  --------           --------          ------
  cpu                802m (89%)        102m (11%)
  memory             1058174080 (64%)  764572800 (46%)
```

## Scaleway

```
scw k8s cluster create \
  name=scw-cluster \
  pools.0.name=default \
  pools.0.size=1 \
  pools.0.node-type=DEV1-M
```

- 🟢 Small touches:
  - When you delete your cluster, you can chose to delete all associated resources, volumes, nodebalancers, etc. It is often a problem that you keep finding leftovers months later. This option spares you from that.
  - I also noticed that you can pass in kubelet args during cluster creation. While this is an advanced user feature, it shows great respect for the user.
  - fresh design, great documentation
- 🟠 control plane was up fast, but the node came to life slowly, alltogether it took almost 5 minutes
- Scaleway doesn't let you create a truly budget cluster. So the toll of system components may not be that big of an issue here.

```
Capacity:                                                                
  cpu:    3                                           
  memory: 4019908Ki                                             
  pods:   110

...
Non-terminated Pods:          (8 in total)
  Namespace      Name                               CPU Requests  CPU Limits  Memory Requests  Memory Limits
  ---------      ----                               ------------  ----------  ---------------  -------------
  kube-system    cilium-59f42                       100m (3%)     0 (0%)      100Mi (3%)       0 (0%)
  kube-system    cilium-operator-b4f9b9f84-j7qrp    0 (0%)        0 (0%)      0 (0%)           0 (0%)
  kube-system    coredns-7449449ddc-hmnf6           100m (3%)     0 (0%)      70Mi (2%)        170Mi (6%)
  kube-system    csi-node-pw8p6                     0 (0%)        0 (0%)      0 (0%)           0 (0%)
  kube-system    konnectivity-agent-whrcp           0 (0%)        0 (0%)      0 (0%)           0 (0%)
  kube-system    kube-proxy-z6wn5                   0 (0%)        0 (0%)      0 (0%)           0 (0%)
  kube-system    metrics-server-59fb595596-4r4gh    100m (3%)     0 (0%)      300Mi (10%)      0 (0%)
  kube-system    node-problem-detector-rrsh4        10m (0%)      10m (0%)    80Mi (2%)        80Mi (2%)

Allocated resources:
  (Total limits may be over 100 percent, i.e., overcommitted.)
  Resource           Requests     Limits
  --------           --------     ------
  cpu                310m (11%)   10m (0%)
  memory             550Mi (19%)  250Mi (8%)
```

## Bottom line

Kubernetes presents some CPU and memory overhead compared to the bare VPS experience.

The overhead is more so a budgeted resource usage and than an actual one. Sadly, the presented managed options do not optimize for single node setups. The defaults are made for much larger clusters.

- Digital Ocean budgeted 90% of the single CPU for system pods, while actual CPU usage is 5%.
- Linode and Digital Ocean is running 2 coredns pods for high availability. On a single node this has questionable benefits.

These could be manually tuned, and you can also skip setting budgets for your workloads. This way you can run as many deployments as the hardware can handle.

Scaleway probably did the right thing by not going below 2(3) cores and 4GB of memory for their smallest Kubernetes option. With this amount of resources the default settings don't become limiting. However this moves the budget kubernetes options to 20$ a month.

What I would do personally:
- Run a 5$ CIVO node, and not set resource requests. This can be used for the things a single core VPS can be used for: proxies, tunnels, vpns, static websites.
- The [6.37 EUR a month Kubernetes cluster on Hetzner](/blog/a-6-37-mo-single-node-kubernetes-cluster-on-hetzner-with-vitobotta-hetzner-k3s?ref=blog-budget-managed-kubernetes-options) option is still my favorite. I would still skip setting resource requests for my workloads, and this option also has decent performance as well. It comes at the cost of managing the node, but the hetzner-k3s tool gives me confidence for future maintenance tasks. Also Hetzner starup/terdown time was heads down the fastest.

Onwards!
