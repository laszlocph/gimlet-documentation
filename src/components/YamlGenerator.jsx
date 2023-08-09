import { useState, useEffect } from 'react';
import HelmUI from "helm-react-ui";
import { ThemeSelector } from './ThemeSelector';
import YAML from "json-to-pretty-yaml";
import * as schema from '@/components/values.schema.json'
import { helmUIJson } from '@/components/helmUIJson'
import axios from "axios";
import CopyButton from './CopyButton';
import Highlight, { defaultProps } from 'prism-react-renderer'
import clsx from 'clsx'
import Link from 'next/link'

export function YamlGenerator() {
  const [values, setValues] = useState({})
  const [nonDefaultValues, setNonDefaultValues] = useState({})
  const [kubernetesYaml, setKubernetesYaml] = useState("")

  function validationCallback(errors) {
    if (errors) {
      console.log(errors);
    }
  };

  function valuesSetter(values, nonDefaultValues) {
    setValues(values);
    setNonDefaultValues(nonDefaultValues);
  }

  useEffect(() => {
    const stateString = window.location.hash.substr(1); // remove the '#'

    if (stateString) {
      const decodedString = atob(stateString);
      const parsedObject = JSON.parse(decodedString);
      setValues(parsedObject);
      setNonDefaultValues(parsedObject);
    }
  }, []);

  useEffect(() => {
    const nonDefaultValuesString = JSON.stringify(nonDefaultValues)
    const base64ObjectState = btoa(nonDefaultValuesString)
    const newUrl = window.location.origin + window.location.pathname + '#' + base64ObjectState;
    if (nonDefaultValuesString !== "{}") {
      window.history.pushState(null, '', newUrl);
    }
  }, [nonDefaultValues]);


  useEffect(() => {
    postWithAxios("https://yaml-generator.gimlet.io", nonDefaultValues).then(data => {
      setKubernetesYaml(data)
    }).catch(err => {
      console.error(`Error: ${err}`);
    });
  }, [nonDefaultValues, kubernetesYaml]);

  const diffBody = `cat << EOF > values.yaml
${YAML.stringify(nonDefaultValues)}EOF

helm repo add onechart https://chart.onechart.dev
helm template my-release onechart/onechart -f values.yaml`

  if (kubernetesYaml === "") {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div aria-live="assertive" className="absolute inset-x-0 top-0 pointer-events-none hidden lg:block opacity-75">
        <span className="float-right flex mr-96 -mt-12">
        <img src="/arrow.svg" className="scale-75 w-32 block dark:hidden flip"/>
        <img src="/arrow-white.svg" className="scale-75 w-32 hidden dark:block flip" />
        <span className="mt-24 -ml-4 font-mono font-bold text-xs dark:text-slate-100">Shareable link!</span>
        </span>
      </div>
      <div className="text-center pt-12 sm:pt-16">
      <Link href="/">
        <a>
          <span className="sr-only">Home page</span>
          <img src="/logo.svg" alt="Gimlet" className='h-10 sm:h-16 inline' />
        </a>
      </Link>
      </div>
      <div className="mx-auto p-2 sm:p-4 lg:p-6">
        <header className="grid sm:grid-cols-3 items-center mt-8 mb-20">
          <h1 className="text-gray-900 dark:text-slate-50 sm:text-4xl font-semibold text-center sm:col-start-2">Kubernetes YAML Generator</h1>
          <div className="col-start-3 justify-self-end mr-10">
            <ThemeSelector className="relative z-10 items-end" />
          </div>
        </header>
        <div className="sm:align-center sm:flex sm:flex-col space-y-2">
          <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-2 sm:space-y-0 xl:grid-cols-8">
            <div className="dark:bg-white border-2 p-4 rounded-md col-span-5">
              <HelmUI
                schema={schema}
                config={helmUIJson}
                values={values}
                setValues={valuesSetter}

                validate={true}
                validationCallback={validationCallback}
              />
            </div>
            <div className="p-2 rounded-md bg-highlight-dark col-span-3 flex flex-col">
              <CopyButton
                text={kubernetesYaml}
                style="light"
              />
              <Highlight
                {...defaultProps}
                code={kubernetesYaml}
                language="bash"
                theme={undefined}
              >
                {({
                  className,
                  style,
                }) => (
                  <pre
                    className={clsx(
                      className,
                      'flex overflow-x-auto pb-6'
                    )}
                    style={style}
                  >
                    <code className="px-4">
                      {kubernetesYaml}
                    </code>
                  </pre>
                )}
              </Highlight>
            </div>
          </div>
          <div className="container max-w-5xl mx-auto dark:text-slate-50 py-32 font-medium text-xl">
            <p className="">This is not magic.</p>
            <p className="pt-4">
              The YAML is generated with a Helm chart.<br />
              A Helm chart that you can also use on your terminal.
            </p>
            <p className="pt-4"></p>
            <p className="pt-4">Try this:</p>
            <div className="mt-8 p-2 rounded-md border-2 bg-highlight-light flex flex-col text-sm">
              <CopyButton
                text={diffBody}
                style="dark"
              />
              <Highlight
                {...defaultProps}
                code={diffBody}
                language="bash"
                theme={undefined}
              >
                {({
                  className,
                  style,
                }) => (
                  <pre
                    className={clsx(
                      className,
                      'flex overflow-x-auto pb-6'
                    )}
                    style={style}
                  >
                    <code className="px-4 text-gray-800">
                      {diffBody}
                    </code>
                  </pre>
                )}
              </Highlight>
            </div>
            <p className='pt-16 text-base text-blue-500'>Are you new to Helm? Check out <a href="/concepts/the-sane-helm-guide" className="underline">our SANE Helm guide</a>.</p>
            <p className='text-base text-blue-500'>Curious about onechart/onechart? See <a href="/concepts/the-sane-helm-guide" className="underline">the reference</a>.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const postWithAxios = async (path, body) => {
  try {
    const { data } = await axios
      .post(path, body, {
        withCredentials: false,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    return data;
  } catch (error) {
    this.onError(error.response);
    throw error.response;
  }
}
