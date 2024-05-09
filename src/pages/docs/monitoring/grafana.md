# Grafana

Grafana is the de facto dashboarding solution in the cloud native space. It gathers and visualizes metrics from Prometheus.
## Dashboards With Gimlet Stack

Gimlet Stack builds heavily on Grafana. If you install Grafana with it, Gimlet Stack sets up a set of dashboards and alerts by default. Gimlet's operational workflows heavily rely on the presence of these dashboards.

The following sections present those dashboards and their use in troubleshooting.
### Cluster

This dashboard provides a great summary on various infrastructure and cluster management data. It allows you to troubleshoot performance and cluster capacity issues.
#### Bookings

The bookings chart pair shows the nominal and percentage value (on the second y-axis) of cluster resources used. You can get notified when your cluster is getting overflooded with workloads by setting an alert on these charts. Should you not have autoscaling enabled for your cluster, this alert can be a trigger for scaling the cluster.

![Kubernetes cluster capacity](https://book.gimlet.io/assets/images/capacity-9ef86e0beb7b9d662473597df3b82150.png)
#### Load and CPU

The emphasis here is on the load chart. A load chart is often a better indicator of malfunctioning than the CPU usage chart. In essence, having 100% CPU usage is a good thing in terms of price-performance.

![CPU usage](https://book.gimlet.io/assets/images/cpu-b62c0d7c84fbbc6e4e9a512c09d21962.png)

#### Pod Restarts

This widget is a good place to find crashlooping pods.

![Number of restarting pods](https://book.gimlet.io/assets/images/pod-restarts-c3e1abe033bb38c1f81963e482c44caa.png)

#### Disk Space

This chart pair keeps track of free disk space. Both in Kubernetes `PersistentVolumes` and on the hosts as well.

![Free disk space](https://book.gimlet.io/assets/images/disk-e0c2309d06bc07251f6defe80a21e613.png)

### Namespaces

A templated dashboard allows you to deep dive into how workloads behave in various namespaces.

First, pick a namespace in the dropdown, then you can drill deeper based on specific labels(app) and identifiers (pod, container name).

![Grafana dashboard templating](https://book.gimlet.io/assets/images/templates-5b652175661c9a8408202e9992008dbc.png)

#### Memory and CPU Usage

The most important charts on this dashboard are the pods’ memory and CPU usage ones. These provide a real-time view of how much resources your pods actually use. You can spot increased memory usage or busy pods.

![Pod cpu and memory usage](https://book.gimlet.io/assets/images/usage-e906b30922bf9fdb00c32055970f9990.png)

#### Ingress Traffic

You can also correlate hardware usage with the received traffic. The top two charts show traffic data from the Nginx ingress controller.

![Ingress traffic](https://book.gimlet.io/assets/images/traffic-2b10e129602b9b78016bcb39ef6605d6.png)

### Nginx

The Nginx dashboard offers a comprehensive overview of all traffic the Ingress Nginx controller serves.

Request volumes, success rates, and response time percentiles give you good tools to troubleshoot your system. You can correlate usage patterns with metrics you see on other dashboards.

![Nginx traffic, success rate metrics](https://book.gimlet.io/assets/images/nginx-dash-d2710a4516320546c4c7cf3ee3f04257.png)

### VMs

The VMs dashboard gives you the well-known host metrics, focusing on a single virtual machine.

![Virtual Machine host metrics](https://book.gimlet.io/assets/images/vms-04fa5ace92bf41b2dd306140f3a84905.png)

### Linkerd Top-Line

Linkerd is a lightweight service mesh that proxies all traffic between your container workloads.

This puts Linkerd into a unique position that allows it to give you traffic metrics between your pods out of the box.

![Linkerd topline metrics](https://book.gimlet.io/assets/images/topline-deee042e4cc0c24c48bde224fc741673.png)

This dashboard is a good starting point, if you question your system's health. Error ratios, response time percentiles, and request volumes give you the perfect insight into pod-to-pod communication to spot if a pod is failing.

Unlike the Nginx chart, the Linkerd dashboard is able to monitor pod-to-pod communication as well, not just at the edge of your platform, at the ingress level.
## Alerts

There are Grafana notifications attached to these dashboards.

- **Disk Space Too Low:** Alerts when disk usage is too high.
- **EOF Alert:** End-of-file alert happens when Gimlet deployments or secrets aren't sealed properly.
- **Load Is High:** Alerts when CPU usage exceeds the configured percentage for a specified time limit.
- **Persistent Volume Usage:** Appears when node is running out of persistent storage.
- **Pod Maybe Crashlooping:** Occurs when a pod appears to start and then shuts down.
- **Search Latency:** This alert is sent when queries take longer than the specified latency.
- **Success Rate:** 
- **Too Many Logs:** This alert is caused by having too many records in log database.
- **Total CPU Cores Booked:** Happens when all the CPUs of a node are allocated for a service.
- **Total Memory Booking:** It's sent when memory allocation to a service exceeds the specified threshold.
