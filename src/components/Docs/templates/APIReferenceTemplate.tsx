import { component$, Slot } from "@builder.io/qwik";
import { Card } from "../../Core/Card/Card";

export interface PropDetail {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required?: boolean;
  example?: string;
}

export interface EventDetail {
  name: string;
  description: string;
  args?: string;
  parameters?: Array<{
    name: string;
    type: string;
    description: string;
  }>;
  returnType?: string;
  example?: string;
}

export interface MethodDetail {
  name: string;
  description: string;
  args?: string;
  returnType?: string;
}

export interface TypeDefinition {
  name: string;
  definition: string;
  description: string;
}

export interface APIReferenceTemplateProps {
  title?: string;
  description?: string;
  props?: PropDetail[];
  events?: EventDetail[];
  methods?: MethodDetail[];
  types?: TypeDefinition[];
  cssVariables?: { name: string; description: string; defaultValue?: string }[];
  dataAttributes?: { name: string; description: string }[];
}

export const APIReferenceTemplate = component$<APIReferenceTemplateProps>(
  ({
    title,
    description,
    props = [],
    events = [],
    methods = [],
    types = [],
    cssVariables = [],
    dataAttributes = [],
  }) => {
    return (
      <div class="space-y-5 sm:space-y-6 lg:space-y-8">
        {/* Title and Description */}
        {(title || description) && (
          <div class="mb-4 sm:mb-5 lg:mb-6">
            {title && (
              <h2 class="mb-2 text-xl font-semibold text-gray-900 sm:text-2xl lg:text-3xl dark:text-white">
                {title}
              </h2>
            )}
            {description && (
              <p class="text-sm text-gray-600 sm:text-base dark:text-gray-300">
                {description}
              </p>
            )}
          </div>
        )}
        
        {/* Introduction to API */}
        <div class="mb-4 sm:mb-5 lg:mb-6">
          <div class="text-sm sm:text-base">
            <Slot />
          </div>
        </div>

        {/* Props Table */}
        {props.length > 0 && (
          <Card variant="elevated" class="overflow-hidden">
            <div class="border-b border-gray-200 p-3 sm:p-4 lg:p-6 dark:border-gray-700">
              <h3 class="text-base font-semibold text-gray-900 sm:text-lg lg:text-xl dark:text-white">
                Props
              </h3>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs sm:text-sm">
                <thead class="bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  <tr>
                    <th class="px-2 py-2 font-medium sm:px-3 sm:py-3 lg:px-4">
                      Name
                    </th>
                    <th class="px-2 py-2 font-medium sm:px-3 sm:py-3 lg:px-4">
                      Type
                    </th>
                    <th class="px-2 py-2 font-medium sm:px-3 sm:py-3 lg:px-4">
                      Default
                    </th>
                    <th class="px-2 py-2 font-medium sm:px-3 sm:py-3 lg:px-4">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  {props.map((prop, index) => (
                    <tr key={index} class="bg-white dark:bg-gray-900">
                      <td class="whitespace-nowrap px-2 py-2 font-mono text-primary-600 sm:px-3 sm:py-3 lg:px-4 dark:text-primary-400">
                        {prop.name}
                        {prop.required && (
                          <span class="ml-1 text-red-500">*</span>
                        )}
                      </td>
                      <td class="px-2 py-2 font-mono text-gray-500 sm:px-3 sm:py-3 lg:px-4 dark:text-gray-400">
                        {prop.type}
                      </td>
                      <td class="px-2 py-2 font-mono text-gray-500 sm:px-3 sm:py-3 lg:px-4 dark:text-gray-400">
                        {prop.defaultValue || (
                          <span class="text-gray-400 dark:text-gray-500">
                            -
                          </span>
                        )}
                      </td>
                      <td class="px-2 py-2 text-gray-600 sm:px-3 sm:py-3 lg:px-4 dark:text-gray-300">
                        {prop.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Events Table */}
        {events.length > 0 && (
          <Card variant="elevated" class="overflow-hidden">
            <div class="border-b border-gray-200 p-3 sm:p-4 lg:p-6 dark:border-gray-700">
              <h3 class="text-base font-semibold text-gray-900 sm:text-lg lg:text-xl dark:text-white">
                Events
              </h3>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs sm:text-sm">
                <thead class="bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  <tr>
                    <th class="px-2 py-2 font-medium sm:px-3 sm:py-3 lg:px-4">
                      Name
                    </th>
                    <th class="px-2 py-2 font-medium sm:px-3 sm:py-3 lg:px-4">
                      Arguments
                    </th>
                    <th class="px-2 py-2 font-medium sm:px-3 sm:py-3 lg:px-4">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  {events.map((event, index) => (
                    <tr key={index} class="bg-white dark:bg-gray-900">
                      <td class="whitespace-nowrap px-2 py-2 font-mono text-primary-600 sm:px-3 sm:py-3 lg:px-4 dark:text-primary-400">
                        {event.name}
                      </td>
                      <td class="px-2 py-2 font-mono text-gray-500 sm:px-3 sm:py-3 lg:px-4 dark:text-gray-400">
                        {event.args || (
                          <span class="text-gray-400 dark:text-gray-500">
                            -
                          </span>
                        )}
                      </td>
                      <td class="px-2 py-2 text-gray-600 sm:px-3 sm:py-3 lg:px-4 dark:text-gray-300">
                        {event.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Methods Table */}
        {methods.length > 0 && (
          <Card variant="elevated" class="overflow-hidden">
            <div class="border-b border-gray-200 p-3 sm:p-4 lg:p-6 dark:border-gray-700">
              <h3 class="text-base font-semibold text-gray-900 sm:text-lg lg:text-xl dark:text-white">
                Methods
              </h3>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs sm:text-sm">
                <thead class="bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  <tr>
                    <th class="px-2 py-2 font-medium sm:px-3 sm:py-3 lg:px-4">
                      Name
                    </th>
                    <th class="px-2 py-2 font-medium sm:px-3 sm:py-3 lg:px-4">
                      Arguments
                    </th>
                    <th class="px-2 py-2 font-medium sm:px-3 sm:py-3 lg:px-4">
                      Return Type
                    </th>
                    <th class="px-2 py-2 font-medium sm:px-3 sm:py-3 lg:px-4">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  {methods.map((method, index) => (
                    <tr key={index} class="bg-white dark:bg-gray-900">
                      <td class="whitespace-nowrap px-2 py-2 font-mono text-primary-600 sm:px-3 sm:py-3 lg:px-4 dark:text-primary-400">
                        {method.name}
                      </td>
                      <td class="px-2 py-2 font-mono text-gray-500 sm:px-3 sm:py-3 lg:px-4 dark:text-gray-400">
                        {method.args || (
                          <span class="text-gray-400 dark:text-gray-500">
                            -
                          </span>
                        )}
                      </td>
                      <td class="px-2 py-2 font-mono text-gray-500 sm:px-3 sm:py-3 lg:px-4 dark:text-gray-400">
                        {method.returnType || (
                          <span class="text-gray-400 dark:text-gray-500">
                            -
                          </span>
                        )}
                      </td>
                      <td class="px-2 py-2 text-gray-600 sm:px-3 sm:py-3 lg:px-4 dark:text-gray-300">
                        {method.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Types Table */}
        {types.length > 0 && (
          <Card variant="elevated" class="overflow-hidden">
            <div class="border-b border-gray-200 p-3 sm:p-4 lg:p-6 dark:border-gray-700">
              <h3 class="text-base font-semibold text-gray-900 sm:text-lg lg:text-xl dark:text-white">
                Type Definitions
              </h3>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs sm:text-sm">
                <thead class="bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  <tr>
                    <th class="px-2 py-2 font-medium sm:px-3 sm:py-3 lg:px-4">
                      Name
                    </th>
                    <th class="px-2 py-2 font-medium sm:px-3 sm:py-3 lg:px-4">
                      Definition
                    </th>
                    <th class="px-2 py-2 font-medium sm:px-3 sm:py-3 lg:px-4">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  {types.map((type, index) => (
                    <tr key={index} class="bg-white dark:bg-gray-900">
                      <td class="whitespace-nowrap px-2 py-2 font-mono text-primary-600 sm:px-3 sm:py-3 lg:px-4 dark:text-primary-400">
                        {type.name}
                      </td>
                      <td class="px-2 py-2 font-mono text-gray-500 sm:px-3 sm:py-3 lg:px-4 dark:text-gray-400">
                        <pre class="whitespace-pre-wrap text-xs">{type.definition}</pre>
                      </td>
                      <td class="px-2 py-2 text-gray-600 sm:px-3 sm:py-3 lg:px-4 dark:text-gray-300">
                        {type.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* CSS Variables Table */}
        {cssVariables.length > 0 && (
          <Card variant="elevated" class="overflow-hidden">
            <div class="border-b border-gray-200 p-3 sm:p-4 lg:p-6 dark:border-gray-700">
              <h3 class="text-base font-semibold text-gray-900 sm:text-lg lg:text-xl dark:text-white">
                CSS Variables
              </h3>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs sm:text-sm">
                <thead class="bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  <tr>
                    <th class="px-2 py-2 font-medium sm:px-3 sm:py-3 lg:px-4">
                      Name
                    </th>
                    <th class="px-2 py-2 font-medium sm:px-3 sm:py-3 lg:px-4">
                      Default
                    </th>
                    <th class="px-2 py-2 font-medium sm:px-3 sm:py-3 lg:px-4">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  {cssVariables.map((variable, index) => (
                    <tr key={index} class="bg-white dark:bg-gray-900">
                      <td class="whitespace-nowrap px-2 py-2 font-mono text-primary-600 sm:px-3 sm:py-3 lg:px-4 dark:text-primary-400">
                        {variable.name}
                      </td>
                      <td class="px-2 py-2 font-mono text-gray-500 sm:px-3 sm:py-3 lg:px-4 dark:text-gray-400">
                        {variable.defaultValue || (
                          <span class="text-gray-400 dark:text-gray-500">
                            -
                          </span>
                        )}
                      </td>
                      <td class="px-2 py-2 text-gray-600 sm:px-3 sm:py-3 lg:px-4 dark:text-gray-300">
                        {variable.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Data Attributes Table */}
        {dataAttributes.length > 0 && (
          <Card variant="elevated" class="overflow-hidden">
            <div class="border-b border-gray-200 p-3 sm:p-4 lg:p-6 dark:border-gray-700">
              <h3 class="text-base font-semibold text-gray-900 sm:text-lg lg:text-xl dark:text-white">
                Data Attributes
              </h3>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs sm:text-sm">
                <thead class="bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  <tr>
                    <th class="px-2 py-2 font-medium sm:px-3 sm:py-3 lg:px-4">
                      Name
                    </th>
                    <th class="px-2 py-2 font-medium sm:px-3 sm:py-3 lg:px-4">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  {dataAttributes.map((attr, index) => (
                    <tr key={index} class="bg-white dark:bg-gray-900">
                      <td class="whitespace-nowrap px-2 py-2 font-mono text-primary-600 sm:px-3 sm:py-3 lg:px-4 dark:text-primary-400">
                        {attr.name}
                      </td>
                      <td class="px-2 py-2 text-gray-600 sm:px-3 sm:py-3 lg:px-4 dark:text-gray-300">
                        {attr.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    );
  },
);

export default APIReferenceTemplate;
