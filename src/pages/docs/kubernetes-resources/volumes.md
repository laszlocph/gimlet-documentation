# Volumes

Volumes provide a way to store persistent data for your applications. You can configure volumes by in gimlet's yaml file in the root folder of your application for the specific use cases described.
## Basic Volume Configuration

Example:

```
  volumes:
    - name: data
      path: /data
      size: 10Gi
```

More settings:
- `pvcAnnotations`: Key-value pairs that you can configure for various purposes. Learn more about annotations here. When you use annotations this way, you don't need the `name` variable.
- `storageClass`: Slug indicating the disk type of your cloud provider.

## Use an Existing Volume Claim

Example:

```
  volumes:
    - path: /data
      existingClaim: my-pvc
```

## Use a Path From The Host

Example:

```
  volumes:
    - name: data
      path: /data
      hostPath:
        path: /somewhere/over/the/rainbow
		type:
```

`type` can be the following variables: `DirectoryOrCreate`, `Directory`, `FileOrCreate`, `File`, `Socket`, `CharDevice`, or `BlockDevice`.

## Use an Ephemeral Volume

Example:

```
  volumes:
    - name: ephemeral-volume
      path: /data
      size: 10Gi
      emptyDir: true
```

## Mount an Existing configMap as a File

Example:

```
  volumes:
    - name: data
      path: /data/dummy.conf
      existingConfigMap: data
      subPath: dummy.conf
```

## Custom String to Mount as a File

Example:

```
  volumes:
    - name: data
      path: /data
      size: 10Gi
      fileContent: mysecretjsoncontent
      fileName: credentials.json
```
