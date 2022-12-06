import { useState } from 'react'
import { ButtonLink } from '@/components/Button'
import { CodeWindow } from '@/components/CodeWindow'

const justImage = `image:
  repository: ghcr.io/podtato-head/podtatoserver
  tag: v0.1.1
`

const withVars = `image:
  repository: ghcr.io/podtato-head/podtatoserver
  tag: v0.1.1

vars:
  VAR_1: "value 1"
  VAR_2: "value 2"`

const withVolumes = `image:
  repository: ghcr.io/podtato-head/podtatoserver
  tag: v0.1.1

vars:
  VAR_1: "value 1"
  VAR_2: "value 2"

volumes:
- name: data
  path: /data
  size: 10Gi`

const helmJustImage = `---
# Source: onechart/templates/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: release-name
  namespace: default
  labels:
    helm.sh/chart: onechart-0.38.0
    app.kubernetes.io/name: onechart
    app.kubernetes.io/instance: release-name
    app.kubernetes.io/managed-by: Helm
spec:
  type: ClusterIP
  ports:
    - port: 80
      targetPort: http
      protocol: TCP
      name: http
  selector:
    app.kubernetes.io/name: onechart
    app.kubernetes.io/instance: release-name
---
# Source: onechart/templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: release-name
  namespace: default
  labels:
    helm.sh/chart: onechart-0.38.0
    app.kubernetes.io/name: onechart
    app.kubernetes.io/instance: release-name
    app.kubernetes.io/managed-by: Helm
spec:
  replicas: 1
  selector:
    matchLabels:
      app.kubernetes.io/name: onechart
      app.kubernetes.io/instance: release-name
  template:
    metadata:
      annotations:
        checksum/config: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
      labels:
        app.kubernetes.io/name: onechart
        app.kubernetes.io/instance: release-name
    spec:
      securityContext:
        fsGroup: 999
      containers:
        - name: release-name
          securityContext: &securityContext
            {}
          image: "ghcr.io/podtato-head/podtatoserver:v0.1.1"
          imagePullPolicy: IfNotPresent
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
          resources:
            limits:
              cpu: 200m
              memory: 200Mi
            requests:
              cpu: 200m
              memory: 200Mi`

const helmWithVars = `+ ---
+ # Source: onechart/templates/configmap.yaml
+ apiVersion: v1
+ kind: ConfigMap
+ metadata:
+  name: release-name
+  namespace: default
+  labels:
+    helm.sh/chart: onechart-0.38.0
+    app.kubernetes.io/name: onechart
+    app.kubernetes.io/instance: release-name
+    app.kubernetes.io/managed-by: Helm
+ data:
+  VAR_1: "value 1"
+  VAR_2: "value 2"
---
# Source: onechart/templates/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: release-name
  namespace: default
  labels:
    helm.sh/chart: onechart-0.38.0
    app.kubernetes.io/name: onechart
    app.kubernetes.io/instance: release-name
    app.kubernetes.io/managed-by: Helm
spec:
  type: ClusterIP
  ports:
    - port: 80
      targetPort: http
      protocol: TCP
      name: http
  selector:
    app.kubernetes.io/name: onechart
    app.kubernetes.io/instance: release-name
---
# Source: onechart/templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: release-name
  namespace: default
  labels:
    helm.sh/chart: onechart-0.38.0
    app.kubernetes.io/name: onechart
    app.kubernetes.io/instance: release-name
    app.kubernetes.io/managed-by: Helm
spec:
  replicas: 1
  selector:
    matchLabels:
      app.kubernetes.io/name: onechart
      app.kubernetes.io/instance: release-name
  template:
    metadata:
      annotations:
        checksum/config: 584146e11369b349b0d36d49c8bcf444b85da73685d0e828f10369f447071cfc
      labels:
        app.kubernetes.io/name: onechart
        app.kubernetes.io/instance: release-name
    spec:
      securityContext:
        fsGroup: 999
      containers:
        - name: release-name
          securityContext: &securityContext
            {}
          image: "ghcr.io/podtato-head/podtatoserver:v0.1.1"
          imagePullPolicy: IfNotPresent
+          envFrom: &envFrom
+            - configMapRef:
+                name: release-name
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
          resources:
            limits:
              cpu: 200m
              memory: 200Mi
            requests:
              cpu: 200m
              memory: 200Mi`

const helmWithVolume = `---
# Source: onechart/templates/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: release-name
  namespace: default
  labels:
    helm.sh/chart: onechart-0.38.0
    app.kubernetes.io/name: onechart
    app.kubernetes.io/instance: release-name
    app.kubernetes.io/managed-by: Helm
data:
  VAR_1: "value 1"
  VAR_2: "value 2"
+ ---
+ # Source: onechart/templates/pvc.yaml
+ apiVersion: v1
+ kind: PersistentVolumeClaim
+ metadata:
+   name: release-name-data
+   namespace: default
+ spec:
+   accessModes:
+     - ReadWriteOnce
+   resources:
+     requests:
+       storage: 10Gi
---
# Source: onechart/templates/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: release-name
  namespace: default
  labels:
    helm.sh/chart: onechart-0.38.0
    app.kubernetes.io/name: onechart
    app.kubernetes.io/instance: release-name
    app.kubernetes.io/managed-by: Helm
spec:
  type: ClusterIP
  ports:
    - port: 80
      targetPort: http
      protocol: TCP
      name: http
    
  selector:
    app.kubernetes.io/name: onechart
    app.kubernetes.io/instance: release-name
---
# Source: onechart/templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: release-name
  namespace: default
  labels:
    helm.sh/chart: onechart-0.38.0
    app.kubernetes.io/name: onechart
    app.kubernetes.io/instance: release-name
    app.kubernetes.io/managed-by: Helm
spec:
  replicas: 1
  selector:
    matchLabels:
      app.kubernetes.io/name: onechart
      app.kubernetes.io/instance: release-name
+   strategy:
+     type: Recreate
  template:
    metadata:
      annotations:
        checksum/config: 584146e11369b349b0d36d49c8bcf444b85da73685d0e828f10369f447071cfc
      labels:
        app.kubernetes.io/name: onechart
        app.kubernetes.io/instance: release-name
    spec:
      securityContext:
        fsGroup: 999
      containers:
        - name: release-name
          securityContext: &securityContext
            {}
          image: "ghcr.io/podtato-head/podtatoserver:v0.1.1"
          imagePullPolicy: IfNotPresent
          
          envFrom: &envFrom
            - configMapRef:
                name: release-name
          ports:
            - name: http
              containerPort: 80
              protocol: TCP        
+           volumeMounts: &volumeMounts
+             - name: data
+               mountPath: /data
          resources:
            limits:
              cpu: 200m
              memory: 200Mi
            requests:
              cpu: 200m
              memory: 200Mi
+       volumes:
+         - name: data
+           persistentVolumeClaim:
+             claimName: RELEASE-NAME-data`

export function YamlAuthoring() {
  const [code, setCode] = useState(justImage)
  const [helm, setHelm] = useState(helmJustImage)
  const [varsAdded, setVarsAdded] = useState(false)
  const [volumeAdded, setVolumeAdded] = useState(false)

  return (
    <section id="yaml-authoring" className="relative">
      <div className="dark:bg-stone-700 py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <svg
            fill="none"
            aria-hidden="true"
            className="text-slate-400 dark:text-stone-400 h-8 w-8"
            stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <h2 className="mt-2 font-semibold text-slate-500 dark:text-stone-400">
            Yaml Authoring
          </h2>
          <p className="mt-4 text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50">
            <Widont>No boilerplate.</Widont>
          </p>
          <div className="mt-4 max-w-3xl space-y-6 text-gray-600 dark:text-gray-300">
            Our generic Helm chart allows you to write only a minimal configuration.
            All common web application usecases are covered so you don&apos;t have to look up the Kubernetes documentation
            or blog posts every turn. Plus you can make sure that your application yamls are following a common blueprint.
          </div>
          <div className='mt-8'>
            <ButtonLink href="/docs/onechart-reference" variant="secondary">Learn more</ButtonLink>
          </div>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 mt-16">
          <div className="relative lg:translate-x-8 z-10">
            <img src="/arrow.svg" className="absolute right-0 top-0 -mt-16 mr-32 lg:mr-64 w-24 block dark:hidden" />
            <img src="/arrow-white.svg" className="absolute right-0 top-0 -mt-16 mr-32 lg:mr-64 w-24 hidden dark:block" />
            <span className="absolute right-0 top-0 -mt-14 mr-4 lg:mr-36 w-32 font-mono font-bold text-xs dark:text-slate-100">What you write</span>
            {!varsAdded &&
              <>
                <button
                  onClick={() => {
                    setVarsAdded(true)
                    setCode(withVars)
                    setHelm(helmWithVars)
                  }}
                  className="z-20 absolute top-48 left-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm lg:text-base">
                  Click to see how to add env vars
                </button>
              </>
            }
            {varsAdded && !volumeAdded &&
              <button
                onClick={() => {
                  setVolumeAdded(true)
                  setCode(withVolumes)
                  setHelm(helmWithVolume)
                }}
                className="z-20 absolute top-72 left-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm lg:text-base">
                Add a volume now
              </button>
            }
            <CodeWindow
              className="h-[25.625rem] max-h-[60vh] sm:max-h-[none] lg:h-[25.6875rem] xl:h-[25.625rem] "
              tabs={[
                {
                  name: '.gimlet/staging.yaml',
                  code: code,
                },
              ]}
              language="yaml"
            />
          </div>
          <div className="relative hidden lg:block">
            <img src="/arrow.svg" className="absolute right-0 top-0 -mt-16 mr-36 w-24 block dark:hidden" />
            <img src="/arrow-white.svg" className="absolute right-0 top-0 -mt-16 mr-36 w-24 hidden dark:block" />
            <span className="absolute right-0 top-0 -mt-14 mr-8 w-32 font-mono font-bold text-xs dark:text-slate-100">What Kubernetes sees</span>
            <CodeWindow
              className='bg-slate-700'
              code={helm}
              language="custom-diff"
              lineNumbers={false}
              unemphasized={true}
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export function Widont({ children }) {
  return children.replace(/ ([^ ]+)$/, '\u00A0$1')
}
