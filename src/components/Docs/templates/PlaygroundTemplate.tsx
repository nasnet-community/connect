import { component$, useSignal, $ } from "@builder.io/qwik";
import { Card } from "../../Core/Card/Card";

export interface ControlOption {
  label: string;
  value: string | number | boolean;
}

export interface PropertyControl {
  type: "text" | "select" | "number" | "boolean" | "color";
  name: string;
  label: string;
  defaultValue?: any;
  options?: ControlOption[];
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}

export interface PlaygroundTemplateProps {
  title?: string;
  description?: string;
  component?: any; // The component to be used in the playground
  properties?: PropertyControl[];
  propControls?: Record<string, any>; // Custom prop controls format
  renderComponent?: (props: any) => any; // Custom render function
  initialProps?: Record<string, any>; // Initial prop values
  children?: any; // Description content
  controls?: any[]; // Controls array format for complex playgrounds
  preview?: any; // Preview component
  code?: any; // Code display
  onMount$?: () => void; // Mount callback
  onControlChange$?: (property: string, value: any) => void; // Control change callback
  state?: Record<string, any>; // State for controlled playgrounds
  sections?: Array<{ title: string; description: string; component: any }>; // For sectioned playgrounds
}

export const PlaygroundTemplate = component$<PlaygroundTemplateProps>(
  ({
    title,
    description,
    component: Component,
    properties = [],
    renderComponent,
    initialProps,
    children,
    preview,
    code,
    onControlChange$: _controlChangeHandler,
    state,
    sections,
  }) => {
    
    // Create a store for all the property values
    const propertyValues = useSignal<Record<string, any>>(initialProps || {});
    
    // Always update local state in event handlers
    // If controlChangeHandler is provided, it should watch the state changes externally

    // Initialize with default values for properties array format
    properties.forEach((prop) => {
      if (propertyValues.value[prop.name] === undefined) {
        propertyValues.value[prop.name] = prop.defaultValue;
      }
    });

    return (
      <div class="space-y-4 sm:space-y-6 lg:space-y-8">
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
        
        {/* Sections if provided */}
        {sections && sections.length > 0 && (
          <div class="space-y-4 sm:space-y-6">
            {sections.map((section, index) => (
              <div key={index} class="space-y-2">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {section.title}
                </h3>
                {section.description && (
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    {section.description}
                  </p>
                )}
                <div class="mt-4">{section.component}</div>
              </div>
            ))}
          </div>
        )}
        
        {/* Controls Panel - Centered */}
        <div class="flex justify-center">
          <Card variant="elevated" class="w-full max-w-4xl overflow-hidden">
            <div class="border-b border-gray-200 p-3 sm:p-4 lg:p-6 dark:border-gray-700">
              <h3 class="text-base font-semibold text-gray-900 sm:text-lg lg:text-xl dark:text-white">
                Controls
              </h3>
            </div>

            <div class="p-3 sm:p-4 lg:p-6">
              <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-6">
                {properties.map((property, index) => (
                  <div
                    key={index}
                    class="space-y-2 rounded-lg border border-gray-100 p-2 sm:space-y-3 sm:p-3 lg:p-4 dark:border-gray-800"
                  >
                    <label class="block text-xs font-medium text-gray-700 sm:text-sm dark:text-gray-300">
                      {property.label}
                    </label>

                    {/* Text Input */}
                    {property.type === "text" && (
                      <input
                        type="text"
                        class="w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:px-3 sm:py-2 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        value={state?.[property.name] ?? propertyValues.value[property.name] ?? ""}
                        placeholder={property.placeholder}
                        onInput$={$((e: any) => {
                          const newValue = e.target.value;
                          propertyValues.value = {
                            ...propertyValues.value,
                            [property.name]: newValue,
                          };
                        })}
                      />
                    )}

                    {/* Number Input */}
                    {property.type === "number" && (
                      <div class="space-y-1 sm:space-y-2">
                        <input
                          type="number"
                          class="w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:px-3 sm:py-2 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                          value={state?.[property.name] ?? propertyValues.value[property.name] ?? 0}
                          min={property.min}
                          max={property.max}
                          step={property.step || 1}
                          onInput$={$((e: any) => {
                            const newValue = Number(e.target.value);
                            propertyValues.value = {
                              ...propertyValues.value,
                              [property.name]: newValue,
                            };
                          })}
                        />
                        {property.min !== undefined &&
                          property.max !== undefined && (
                            <div class="text-xxs flex justify-between px-1 text-gray-500 sm:text-xs dark:text-gray-400">
                              <span>Min: {property.min}</span>
                              <span>Max: {property.max}</span>
                            </div>
                          )}
                      </div>
                    )}

                    {/* Select Input */}
                    {property.type === "select" && property.options && (
                      <select
                        class="w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:px-3 sm:py-2 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        value={state?.[property.name] ?? propertyValues.value[property.name] ?? ""}
                        onChange$={$((e: any) => {
                          const newValue = e.target.value;
                          propertyValues.value = {
                            ...propertyValues.value,
                            [property.name]: newValue,
                          };
                        })}
                      >
                        {property.options.map((option, optIndex) => (
                          <option key={optIndex} value={String(option.value)}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}

                    {/* Boolean Input */}
                    {property.type === "boolean" && (
                      <div class="flex items-center pt-1">
                        <input
                          type="checkbox"
                          class="h-3 w-3 rounded border-gray-300 text-primary-600 focus:ring-primary-500 sm:h-4 sm:w-4 dark:border-gray-700"
                          checked={state?.[property.name] ?? propertyValues.value[property.name] ?? false}
                          id={`prop-${property.name}`}
                          onChange$={$((e: any) => {
                            const newValue = e.target.checked;
                            propertyValues.value = {
                              ...propertyValues.value,
                              [property.name]: newValue,
                            };
                          })}
                        />
                        <label
                          for={`prop-${property.name}`}
                          class="ml-2 block text-xs text-gray-700 sm:text-sm dark:text-gray-300"
                        >
                          Enable
                        </label>
                      </div>
                    )}

                    {/* Color Input */}
                    {property.type === "color" && (
                      <div class="space-y-2 sm:space-y-3">
                        <div class="flex items-center gap-2 sm:gap-4">
                          <input
                            type="color"
                            class="h-6 w-8 cursor-pointer border-0 sm:h-8 sm:w-10"
                            value={
                              state?.[property.name] ?? propertyValues.value[property.name] ?? "#000000"
                            }
                            onChange$={$((e: any) => {
                              const newValue = e.target.value;
                              propertyValues.value = {
                                ...propertyValues.value,
                                [property.name]: newValue,
                              };
                            })}
                          />
                          <div
                            class="h-6 w-6 rounded sm:h-8 sm:w-8"
                            style={{
                              backgroundColor:
                                state?.[property.name] ?? propertyValues.value[property.name] ??
                                "#000000",
                            }}
                          ></div>
                        </div>
                        <input
                          type="text"
                          class="w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:px-3 sm:py-2 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                          value={
                            state?.[property.name] ?? propertyValues.value[property.name] ?? "#000000"
                          }
                          onInput$={$((e: any) => {
                            const newValue = e.target.value;
                            propertyValues.value = {
                              ...propertyValues.value,
                              [property.name]: newValue,
                            };
                          })}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Reset Button */}
              <div class="flex justify-center">
                <button
                  class="mt-4 rounded-md border border-gray-300 bg-white px-4 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:mt-6 sm:px-6 sm:py-2 sm:text-sm lg:mt-8 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  onClick$={() => {
                    const defaultValues: Record<string, any> = {};
                    properties.forEach((prop) => {
                      defaultValues[prop.name] = prop.defaultValue;
                    });
                    propertyValues.value = defaultValues;
                  }}
                >
                  Reset to Defaults
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Preview - Centered */}
        <div class="flex justify-center">
          <Card variant="elevated" class="w-full max-w-4xl overflow-hidden">
            <div class="border-b border-gray-200 p-3 sm:p-4 lg:p-6 dark:border-gray-700">
              <h3 class="text-base font-semibold text-gray-900 sm:text-lg lg:text-xl dark:text-white">
                Preview
              </h3>
            </div>

            <div class="flex min-h-[150px] items-center justify-center bg-gray-50 p-3 sm:min-h-[200px] sm:p-4 lg:min-h-[250px] lg:p-6 dark:bg-gray-900">
              {preview ||
                (renderComponent
                  ? renderComponent(propertyValues.value)
                  : Component && <Component {...propertyValues.value} />)}
            </div>
          </Card>
        </div>

        {/* Code Display */}
        {code && (
          <div class="flex justify-center">
            <Card variant="elevated" class="w-full max-w-4xl overflow-hidden">
              <div class="border-b border-gray-200 p-3 sm:p-4 lg:p-6 dark:border-gray-700">
                <h3 class="text-base font-semibold text-gray-900 sm:text-lg lg:text-xl dark:text-white">
                  Code
                </h3>
              </div>
              <div class="p-3 sm:p-4 lg:p-6">
                <pre class="rounded-md bg-gray-100 p-3 text-xs text-gray-800 sm:text-sm dark:bg-gray-800 dark:text-gray-200">
                  <code>{code.value || code}</code>
                </pre>
              </div>
            </Card>
          </div>
        )}

        {/* Description */}
        {children && (
          <div class="flex justify-center">
            <Card variant="elevated" class="w-full max-w-4xl overflow-hidden">
              <div class="p-3 sm:p-4 lg:p-6">
                <div class="text-sm text-gray-600 sm:text-base dark:text-gray-300">
                  {children}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    );
  },
);

export default PlaygroundTemplate;
