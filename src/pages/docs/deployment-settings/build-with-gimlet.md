# Build With Gimlet

You can build any source code with Gimlet.

There are four options:
- Static tag images
- Dynamic tag images
- Automatic image building
- Build from Dockerfile
## Static tag images

Selecting specific tags for images - usually with a semantic tag, such as `1.0.0`.
## Dynamic tag images

Dynamic tags are appropriate for images that are pushed to a registry as the final step of a continuous integration pipeline. A few examples of dynamic tags are `latest` and `stable`.
## Automatic image building

Automatic building is useful for deployments of source code not managed in git repositories.
## Build from Dockerfile

To build an image from a Dockerfile, it's necessary to have one located in the code's source.
