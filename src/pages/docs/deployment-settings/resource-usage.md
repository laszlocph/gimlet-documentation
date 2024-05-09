# Resource Usage

You can specify resource requests and limits as you can see in the `Resources` settings of deployments.
## Requests

You can configure CPU and Memory requests. It's required to allocate resources for your application on the node.

## Limits

The CPU and Memory limits allocated on the node for your app. It's the maximum resource demand, and its purpose is to prevent your app from consuming more resources than intended.

Your CPU limit will throttle the CPU to the specified limit. Example:

- CPU limit specified at 200m means that 20% consumption of 1 CPU core will be the limit, as 1000m = 1 CPU core.

Your Memory limit will be the cap where your application will be restarted.

## Ignore Limits

You can use this toggle to ignore the limits settings described the way above.

## Ignore

Use this toggle to ignore resource definitions.
