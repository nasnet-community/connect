import { component$, Slot } from '@builder.io/qwik';
import { Card } from '../../Core/Card/Card';

export interface PropDetail {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required?: boolean;
}

export interface EventDetail {
  name: string;
  description: string;
  args?: string;
}

export interface MethodDetail {
  name: string;
  description: string;
  args?: string;
  returnType?: string;
}

export interface APIReferenceTemplateProps {
  props?: PropDetail[];
  events?: EventDetail[];
  methods?: MethodDetail[];
  cssVariables?: { name: string; description: string; defaultValue?: string }[];
  dataAttributes?: { name: string; description: string }[];
}

export const APIReferenceTemplate = component$<APIReferenceTemplateProps>(({ 
  props = [],
  events = [],
  methods = [],
  cssVariables = [],
  dataAttributes = []
}) => {
  return (
    <div class="space-y-5 sm:space-y-6 lg:space-y-8">
      {/* Introduction to API */}
      <div class="mb-4 sm:mb-5 lg:mb-6">
        <div class="text-sm sm:text-base">
          <Slot />
        </div>
      </div>
      
      {/* Props Table */}
      {props.length > 0 && (
        <Card variant="elevated" class="overflow-hidden">
          <div class="p-3 sm:p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">Props</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-xs sm:text-sm text-left">
              <thead class="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                <tr>
                  <th class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-medium">Name</th>
                  <th class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-medium">Type</th>
                  <th class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-medium">Default</th>
                  <th class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                {props.map((prop, index) => (
                  <tr key={index} class="bg-white dark:bg-gray-900">
                    <td class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-mono text-primary-600 dark:text-primary-400 whitespace-nowrap">
                      {prop.name}
                      {prop.required && <span class="text-red-500 ml-1">*</span>}
                    </td>
                    <td class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-mono text-gray-500 dark:text-gray-400">{prop.type}</td>
                    <td class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-mono text-gray-500 dark:text-gray-400">
                      {prop.defaultValue || <span class="text-gray-400 dark:text-gray-500">-</span>}
                    </td>
                    <td class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-gray-600 dark:text-gray-300">{prop.description}</td>
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
          <div class="p-3 sm:p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">Events</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-xs sm:text-sm text-left">
              <thead class="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                <tr>
                  <th class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-medium">Name</th>
                  <th class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-medium">Arguments</th>
                  <th class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                {events.map((event, index) => (
                  <tr key={index} class="bg-white dark:bg-gray-900">
                    <td class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-mono text-primary-600 dark:text-primary-400 whitespace-nowrap">{event.name}</td>
                    <td class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-mono text-gray-500 dark:text-gray-400">
                      {event.args || <span class="text-gray-400 dark:text-gray-500">-</span>}
                    </td>
                    <td class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-gray-600 dark:text-gray-300">{event.description}</td>
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
          <div class="p-3 sm:p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">Methods</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-xs sm:text-sm text-left">
              <thead class="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                <tr>
                  <th class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-medium">Name</th>
                  <th class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-medium">Arguments</th>
                  <th class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-medium">Return Type</th>
                  <th class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                {methods.map((method, index) => (
                  <tr key={index} class="bg-white dark:bg-gray-900">
                    <td class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-mono text-primary-600 dark:text-primary-400 whitespace-nowrap">{method.name}</td>
                    <td class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-mono text-gray-500 dark:text-gray-400">
                      {method.args || <span class="text-gray-400 dark:text-gray-500">-</span>}
                    </td>
                    <td class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-mono text-gray-500 dark:text-gray-400">
                      {method.returnType || <span class="text-gray-400 dark:text-gray-500">-</span>}
                    </td>
                    <td class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-gray-600 dark:text-gray-300">{method.description}</td>
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
          <div class="p-3 sm:p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">CSS Variables</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-xs sm:text-sm text-left">
              <thead class="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                <tr>
                  <th class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-medium">Name</th>
                  <th class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-medium">Default</th>
                  <th class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                {cssVariables.map((variable, index) => (
                  <tr key={index} class="bg-white dark:bg-gray-900">
                    <td class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-mono text-primary-600 dark:text-primary-400 whitespace-nowrap">{variable.name}</td>
                    <td class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-mono text-gray-500 dark:text-gray-400">
                      {variable.defaultValue || <span class="text-gray-400 dark:text-gray-500">-</span>}
                    </td>
                    <td class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-gray-600 dark:text-gray-300">{variable.description}</td>
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
          <div class="p-3 sm:p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">Data Attributes</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-xs sm:text-sm text-left">
              <thead class="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                <tr>
                  <th class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-medium">Name</th>
                  <th class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                {dataAttributes.map((attr, index) => (
                  <tr key={index} class="bg-white dark:bg-gray-900">
                    <td class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-mono text-primary-600 dark:text-primary-400 whitespace-nowrap">{attr.name}</td>
                    <td class="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-gray-600 dark:text-gray-300">{attr.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
});

export default APIReferenceTemplate; 