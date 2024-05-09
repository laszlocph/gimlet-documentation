# Prometheus

Prometheus is the de facto standard of gathering metrics from cloud native stacks.
## Day-two Operations With Prometheus

### Federation

It is common to have each cluster run a Prometheus that collects a vast amount of metrics. From those metrics, only a subset is then pushed to a central Prometheus.

With this setup, you achieve broad visibility of all your clusters, and get the option to dig deeper on per cluster metrics, should you need more metrics for debugging.

This could be achieved by remote metric shipping. You configure a remote write target, and ship selected metrics to this aggregate Prometheus instance. It’s fairly common to use a Grafana Cloud for this remote, federated Prometheus instance. Jump to the Grafana Cloud configuration [documentation of ours]() to see how `remote_write` and aggressive metric filtering can be achieved.
### High Availability (HA)

Prometheus has a simplistic approach to High Availability (HA): you need to run multiple instances of Prometheus with the exact same configuration. The idea is that if they scrape the same targets, they will have the same metrics.

This is easy to set up, but there are practical problems with this approach. Since the scraping of the Prometheus instances are not synchronized, they see a slightly different view of the world. To overcome this, use sticky sessions by using `sessionAffinity` on a Kubernetes Service to get consistent graphs when refreshing.

It is also worth checking out [Thanos](https://thanos.io/) if you are looking for a scalable version of Prometheus.
### Custom metrics from your apps

Besides the many off-the-shelf exporters that exist for Prometheus, you typically want to have metrics from your custom applications as well.

There is a Prometheus library for every language, and they all look similar to the Golang Prometheus client. First, they expose a web endpoint on `/metrics`. Copy and run:

```
package mainimport (        "net/http"        "github.com/prometheus/client_golang/prometheus/promhttp")func main() {        http.Handle("/metrics", promhttp.Handler())        http.ListenAndServe(":2112", nil)}
```

Then, they use well-known data structures, counters, gauges and histograms, to expose the metrics. `requestsTotal` is a Prometheus counter that we increase every time the endpoint was called with `requestsTotal.Inc()`. Don’t forget that you can use the rate function with counters to get a meaningful chart.

```
package mainimport (        "net/http"        "time"        "github.com/prometheus/client_golang/prometheus"        "github.com/prometheus/client_golang/prometheus/promauto"        "github.com/prometheus/client_golang/prometheus/promhttp")var (        requestsTotal = promauto.NewCounter(prometheus.CounterOpts{                Name: "myapp_http_requests_total",                Help: "The total number of times and endpoint was called",        }))func main() {        http.Handle("/metrics", promhttp.Handler())        http.Handle("/my-api-endpoint", func (w http.ResponseWriter, req *http.Request){          requestsTotal.Inc()          // do something useful in the endpoint        })        http.ListenAndServe(":2112", nil)
```
