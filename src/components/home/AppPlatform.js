import { useState } from 'react'
import { ButtonLink } from '@/components/Button'
import { Category } from './stack/category'
import * as stackDefinitionFixture from './stack-definition.json'
import { CodeWindow } from '@/components/CodeWindow'

export function AppPlatform() {
  const [stackValues, setStackValues] = useState({
    stack: {
      nginx: {
        enabled: true
      }
    },
    stackNonDefaultValues: {}
  })

  const validationCallback = (variable, errors) => {
  }

  const updateValues = (variable, values, nonDefaultValues) => {
    setStackValues(prevState => ({
      stack: {
        ...prevState.stack,
        [variable]: values
      },
      stackNonDefaultValues: {
        ...prevState.stackNonDefaultValues,
        [variable]: nonDefaultValues
      }
    }))
  }

  const categories = stackDefinitionFixture.categories.map(category => {
    return <Category
      key={category.id}
      category={category}
      stackDefinition={stackDefinitionFixture}
      stack={stackValues.stack}
      genericComponentSaver={updateValues}
      genericValidationCallback={validationCallback}
    />
  })

  let codePiece = onlyNginx;
  if (stackValues.stack.nginx && stackValues.stack.nginx.enabled) {
    if (stackValues.stack.certManager && stackValues.stack.certManager.enabled) {
      codePiece = nginxPlusCertManager;
      if (stackValues.stack.loki && stackValues.stack.loki.enabled) {
        codePiece = all;
      }
    } else {
      if (stackValues.stack.loki && stackValues.stack.loki.enabled) {
        codePiece = nginxPlusLoki;
      }
    }
  } else {
    if (stackValues.stack.certManager && stackValues.stack.certManager.enabled) {
      codePiece = onlyCertmanager;
      if (stackValues.stack.loki && stackValues.stack.loki.enabled) {
        codePiece = certManagerPlusLoki;
      }
    } else {
      if (stackValues.stack.loki && stackValues.stack.loki.enabled) {
        codePiece = onlyLoki;
      } else {
        codePiece = onlyFlux;
      }
    }
  }

  return (
    <section id="app-platform" className="relative">
      <div className="dark:bg-stone-700 py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <svg
            fill="none"
            aria-hidden="true"
            className="text-slate-400 dark:text-stone-400 h-8 w-8"
            stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M7 16a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-12"></path>
            <line x1="5" y1="20" x2="19" y2="20"></line>
          </svg>
          <h2 className="mt-2 font-semibold text-slate-500 dark:text-stone-400">
            Application Platform
          </h2>
          <p className="mt-4 text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50">
            Turn your cluster into an application platform.
          </p>
          <div className="mt-4 max-w-3xl space-y-6 text-gray-600 dark:text-gray-300">
            You can&apos;t do much with an empty Kubernetes cluster. Equip it with the must have
            components to make it a real application platform. Pick your preferred ingress controller, log collector, metrics tool
            and more from a curated list of open-source components and let Gimlet back it with a gitops repo.
            Gimlet will deliver a stream of updates whenever new versions are available.
          </div>
          <div className='mt-8'>
            <ButtonLink href="/docs/make-kubernetes-an-application-platform" variant="secondary">Learn more</ButtonLink>
          </div>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:px-12 pt-24 hidden md:grid">
          <div className="relative max-w-xl">
            <div className="absolute right-0 top-0 mr-60 -mt-4 w-32">
              <img src="/arrow.svg" className="block dark:hidden" />
              <img src="/arrow-white.svg" className="hidden dark:block" />
            </div>
            <span className="absolute right-0 top-0 mr-32 -mt-4 w-32 font-mono font-bold text-xs dark:text-slate-100 hidden md:block">Enable for free SSL certificates!</span>
            {categories}
            <div className="relative">
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-white dark:to-stone-700"></div>
              <h2 className="text-lg">🔢 Metrics</h2>
              <div className="w-32 px-2 overflow-hidden">
                <div className="bg-gray-200 filter grayscale">
                  <img className="h-10 mx-auto pt-2" src="https://raw.githubusercontent.com/gimlet-io/gimlet-stack-reference/main/assets/prometheus.svg" alt="Prometheus" />
                  <div className="font-bold text-sm text-gray-700 py-1 text-center">Prometheus</div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-16 lg:pt-0">
            <CodeWindow
              code={codePiece}
              lineNumbers={false}
              language="bash"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

const onlyFlux = `.
├── dependencies
│   └── namespace.yaml
├── flux
│   ├── deploy-key.yaml
│   ├── flux.yaml
│   └── gitops-repo.yaml
└── stack.yaml
`

const onlyNginx = `.
├── dependencies
│   └── namespace.yaml
├── flux
│   ├── deploy-key.yaml
│   ├── flux.yaml
│   └── gitops-repo.yaml
├── helm-releases
│   └── ingress-nginx.yaml
├── helm-repositories
│   └── ingress-nginx.yaml
├── manifests
│   └── grafana-dashboard-nginx.yaml
└── stack.yaml
`

const onlyLoki = `.
├── dependencies
│   └── namespace.yaml
├── flux
│   ├── deploy-key.yaml
│   ├── flux.yaml
│   └── gitops-repo.yaml
├── helm-releases
│   └── loki.yaml
├── helm-repositories
│   └── grafana.yaml
├── manifests
│   └── grafana-dashboard-logs.yaml
└── stack.yaml
`

const certManagerPlusLoki = `.
├── dependencies
│   ├── cert-manager.yaml
│   ├── jetstack.yaml
│   └── namespace.yaml
├── flux
│   ├── deploy-key.yaml
│   ├── flux.yaml
│   └── gitops-repo.yaml
├── helm-releases
│   └── loki.yaml
├── helm-repositories
│   └── grafana.yaml
├── manifests
│   ├── cert-manager-issuer.yaml
│   └── grafana-dashboard-logs.yaml
└── stack.yaml
`

const onlyCertmanager = `.
├── dependencies
│   ├── cert-manager.yaml
│   ├── jetstack.yaml
│   └── namespace.yaml
├── flux
│   ├── deploy-key.yaml
│   ├── flux.yaml
│   └── gitops-repo.yaml
├── manifests
│   └── cert-manager-issuer.yaml
└── stack.yaml
`

const nginxPlusCertManager = `.
├── dependencies
│   ├── cert-manager.yaml
│   ├── jetstack.yaml
│   └── namespace.yaml
├── flux
│   ├── deploy-key.yaml
│   ├── flux.yaml
│   └── gitops-repo.yaml
├── helm-releases
│   └── ingress-nginx.yaml
├── helm-repositories
│   └── ingress-nginx.yaml
├── manifests
│   ├── cert-manager-issuer.yaml
│   └── grafana-dashboard-nginx.yaml
└── stack.yaml
`

const nginxPlusLoki = `.
├── dependencies
│   └── namespace.yaml
├── flux
│   ├── deploy-key.yaml
│   ├── flux.yaml
│   └── gitops-repo.yaml
├── helm-releases
│   ├── ingress-nginx.yaml
│   └── loki.yaml
├── helm-repositories
│   ├── grafana.yaml
│   └── ingress-nginx.yaml
├── manifests
│   ├── grafana-dashboard-logs.yaml
│   └── grafana-dashboard-nginx.yaml
└── stack.yaml
`

const all = `.
├── dependencies
│   ├── cert-manager.yaml
│   ├── jetstack.yaml
│   └── namespace.yaml
├── flux
│   ├── deploy-key.yaml
│   ├── flux.yaml
│   └── gitops-repo.yaml
├── helm-releases
│   ├── ingress-nginx.yaml
│   └── loki.yaml
├── helm-repositories
│   ├── grafana.yaml
│   └── ingress-nginx.yaml
├── manifests
│   ├── cert-manager-issuer.yaml
│   ├── grafana-dashboard-logs.yaml
│   └── grafana-dashboard-nginx.yaml
└── stack.yaml
`
