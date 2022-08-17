import React, { Component } from 'react'
import { Tile } from "./tile";
import HelmUI from "helm-react-ui";
import { XIcon } from "@heroicons/react/outline";

export class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleState: {},
      tabState: {}
    }

    this.toggleComponent = this.toggleComponent.bind(this)
  }

  toggleComponent(category, component) {
    this.setState(prevState => ({
      toggleState: {
        ...prevState.toggleState,
        [category]: prevState.toggleState[category] == component ? undefined : component
      },
      tabState: {
        ...prevState.tabState,
        [component]: prevState.tabState[component] === undefined ? 'getting-started' : prevState.tabState[component]
      }
    }))
  }

  switchTab(component, tab) {
    this.setState(prevState => ({
      tabState: {
        ...prevState.tabState,
        [component]: tab
      }
    }))
  }

  render() {
    let { toggleState } = this.state

    const {
      category,
      stackDefinition,
      stack,
      genericComponentSaver,
      genericValidationCallback
    } = this.props;

    let selectedComponent = undefined;
    let selectedComponentConfig = undefined;
    let componentSaver = undefined;
    let validationCallback = undefined;
    const selectedComponentName = toggleState[category.id];

    if (selectedComponentName !== undefined) {
      const selectedComponentArray = stackDefinition.components.filter(component => component.variable === toggleState[category.id]);
      selectedComponent = selectedComponentArray[0];
      selectedComponentConfig = stack[selectedComponent.variable];
      if (selectedComponentConfig === undefined) {
        selectedComponentConfig = {}
      }
      componentSaver = function (values, nonDefaultValues) {
        genericComponentSaver(selectedComponent.variable, values, nonDefaultValues)
      };
      validationCallback = function (errors) {
        genericValidationCallback(selectedComponent.variable, errors)
      };
    }

    const componentsForCategory = stackDefinition.components.filter(component => component.category === category.id);
    const componentTitles = componentsForCategory.map(component => {
      return (
        <Tile
          key={component.variable}
          category={category}
          component={component}
          componentConfig={stack[component.variable]}
          selectedComponentName={selectedComponentName}
          toggleComponentHandler={this.toggleComponent}
        />
      )
    })

    if (selectedComponentName !== undefined) {
      if (typeof selectedComponent.schema !== 'object') {
        selectedComponent.schema = JSON.parse(selectedComponent.schema)
      }

      if (typeof selectedComponent.uiSchema !== 'object') {
        selectedComponent.uiSchema = JSON.parse(selectedComponent.uiSchema)
      }
    }

    const componentConfigPanel = selectedComponentName === undefined ? null : (
      <div className="py-6 px-4 space-y-6 sm:p-6">
        <HelmUI
          schema={selectedComponent.schema}
          config={selectedComponent.uiSchema}
          values={selectedComponentConfig}
          setValues={componentSaver}
          validate={true}
          validationCallback={validationCallback}
        />
      </div>
    );

    return (
      <div className="my-8 text-gray-600 dark:text-gray-300">
        <h2 className="text-lg">{category.name}</h2>
        <div className="flex space-x-2 my-2">
          {componentTitles}
        </div>
        <div className="my-2">
          {selectedComponentName !== undefined &&
            <div className="shadow sm:rounded-md sm:overflow-hidden bg-white relative">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => this.toggleComponent(category.id, selectedComponent.variable)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {componentConfigPanel}
            </div>
          }
        </div>
      </div>
    )
  }
}
