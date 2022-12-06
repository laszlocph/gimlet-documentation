import { useState } from 'react'
import { ButtonLink } from '@/components/Button'
import { CodeWindow } from '@/components/CodeWindow'

export function Configuration() {
  const [tab, setTab] = useState('Deploying an image')

  return (
    <section id="yaml-authoring" className="relative">
      <div className="bg-orange-100 dark:bg-amber-900 py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-8">
          <svg
            fill="none"
            aria-hidden="true"
            className="text-orange-400 dark:text-amber-600 h-8 w-8"
            stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h2 className="mt-2 font-semibold text-orange-500 dark:text-amber-600">
            Configuration
          </h2>
          <p className="mt-4 text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50">
            Declarative environment configuration.
          </p>
          <div className="mt-4 max-w-3xl space-y-6 text-gray-600 dark:text-gray-300">
            Declare your staging and production configs in your application source code.
            Reference any Helm chart, add plain K8s manifests, or use Kustomize patches for postprocessing.
            <br />The Gimlet manifest also supports variables.
          </div>
          <div className='mt-8'>
            <ButtonLink href="/docs/gimlet-manifest-reference" variant="secondary">Learn more</ButtonLink>
          </div>
        </div>

        <div className="mx-auto max-w-2xl items-center px-4 lg:max-w-8xl lg:px-8 xl:px-12 pt-8 hidden md:block">
          <CodeWindow
            tabs={[
              {
                name: '.gimlet/staging.yaml',
                code: `app: test-app
env: staging
namespace: staging
chart:
  repository: https://chart.onechart.dev
  name: onechart
  version: 0.36.0
values:
  containerPort: 9000
  image:
    repository: ghcr.io/gimlet-io/test-app
    tag: "{{ .SHA }}"
  ingress:
    ingressClassName: nginx
    host: "test-app.staging.turbopizza.net"`,
              },
              {
                name: '.gimlet/production.yaml',
                code: `app: test-app
env: production
namespace: production
chart:
  repository: https://chart.onechart.dev
  name: onechart
  version: 0.36.0
values:
  containerPort: 9000
  image:
    repository: ghcr.io/gimlet-io/test-app
    tag: "{{ .SHA }}"
  ingress:
    ingressClassName: nginx
    host: "test-app.turbopizza.net"
    annotations:
      cert-manager.io/cluster-issuer: letsencrypt
  replicas: 3
  resources:
    limits:
      cpu: 1
      memory: 512Mi
    requests:
      cpu: 200m
      memory: 400Mi`
              },
            ]}
            language="yaml"
          />
        </div>
      </div>
    </section>
  )
}
