import { component$, useSignal } from '@builder.io/qwik';
import { Card } from '../../Core/Card/Card';

export interface ControlOption {
  label: string;
  value: string | number | boolean;
}

export interface PropertyControl {
  type: 'text' | 'select' | 'number' | 'boolean' | 'color';
  name: string;
  label: string;
  defaultValue: any;
  options?: ControlOption[];
  min?: number;
  max?: number;
  step?: number;
}

export interface PlaygroundTemplateProps {
  component: any; // The component to be used in the playground
  properties: PropertyControl[];
}

export const PlaygroundTemplate = component$<PlaygroundTemplateProps>(({ 
  component: Component,
  properties = []
}) => {
  // Create a store for all the property values
  const propertyValues = useSignal<Record<string, any>>({});
  
  // Initialize with default values
  properties.forEach(prop => {
    if (propertyValues.value[prop.name] === undefined) {
      propertyValues.value[prop.name] = prop.defaultValue;
    }
  });
  
  return (
    <div class="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Controls Panel - Centered */}
      <div class="flex justify-center">
        <Card variant="elevated" class="overflow-hidden max-w-4xl w-full">
          <div class="p-3 sm:p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">Controls</h3>
          </div>
          
          <div class="p-3 sm:p-4 lg:p-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {properties.map((property, index) => (
                <div key={index} class="space-y-2 sm:space-y-3 p-2 sm:p-3 lg:p-4 border border-gray-100 dark:border-gray-800 rounded-lg">
                  <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                    {property.label}
                  </label>
                  
                  {/* Text Input */}
                  {property.type === 'text' && (
                    <input
                      type="text"
                      class="w-full px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-xs sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      value={propertyValues.value[property.name] || ''}
                      onInput$={(e: any) => {
                        propertyValues.value = {
                          ...propertyValues.value,
                          [property.name]: e.target.value
                        };
                      }}
                    />
                  )}
                  
                  {/* Number Input */}
                  {property.type === 'number' && (
                    <div class="space-y-1 sm:space-y-2">
                      <input
                        type="number"
                        class="w-full px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-xs sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        value={propertyValues.value[property.name] || 0}
                        min={property.min}
                        max={property.max}
                        step={property.step || 1}
                        onInput$={(e: any) => {
                          propertyValues.value = {
                            ...propertyValues.value,
                            [property.name]: Number(e.target.value)
                          };
                        }}
                      />
                      {property.min !== undefined && property.max !== undefined && (
                        <div class="flex justify-between text-xxs sm:text-xs text-gray-500 dark:text-gray-400 px-1">
                          <span>Min: {property.min}</span>
                          <span>Max: {property.max}</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Select Input */}
                  {property.type === 'select' && property.options && (
                    <select
                      class="w-full px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-xs sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      value={propertyValues.value[property.name] || ''}
                      onChange$={(e: any) => {
                        propertyValues.value = {
                          ...propertyValues.value,
                          [property.name]: e.target.value
                        };
                      }}
                    >
                      {property.options.map((option, optIndex) => (
                        <option key={optIndex} value={String(option.value)}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                  
                  {/* Boolean Input */}
                  {property.type === 'boolean' && (
                    <div class="flex items-center pt-1">
                      <input
                        type="checkbox"
                        class="h-3 w-3 sm:h-4 sm:w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-700 rounded"
                        checked={propertyValues.value[property.name] || false}
                        id={`prop-${property.name}`}
                        onChange$={(e: any) => {
                          propertyValues.value = {
                            ...propertyValues.value,
                            [property.name]: e.target.checked
                          };
                        }}
                      />
                      <label
                        for={`prop-${property.name}`}
                        class="ml-2 block text-xs sm:text-sm text-gray-700 dark:text-gray-300"
                      >
                        Enable
                      </label>
                    </div>
                  )}
                  
                  {/* Color Input */}
                  {property.type === 'color' && (
                    <div class="space-y-2 sm:space-y-3">
                      <div class="flex items-center gap-2 sm:gap-4">
                        <input
                          type="color"
                          class="h-6 w-8 sm:h-8 sm:w-10 border-0 cursor-pointer"
                          value={propertyValues.value[property.name] || '#000000'}
                          onChange$={(e: any) => {
                            propertyValues.value = {
                              ...propertyValues.value,
                              [property.name]: e.target.value
                            };
                          }}
                        />
                        <div class="w-6 h-6 sm:w-8 sm:h-8 rounded" style={{ backgroundColor: propertyValues.value[property.name] || '#000000' }}></div>
                      </div>
                      <input
                        type="text"
                        class="w-full px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-xs sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        value={propertyValues.value[property.name] || '#000000'}
                        onInput$={(e: any) => {
                          propertyValues.value = {
                            ...propertyValues.value,
                            [property.name]: e.target.value
                          };
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Reset Button */}
            <div class="flex justify-center">
              <button
                class="mt-4 sm:mt-6 lg:mt-8 px-4 sm:px-6 py-1 sm:py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-xs sm:text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                onClick$={() => {
                  const defaultValues: Record<string, any> = {};
                  properties.forEach(prop => {
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
        <Card variant="elevated" class="overflow-hidden max-w-4xl w-full">
          <div class="p-3 sm:p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">Preview</h3>
          </div>
          
          <div class="p-3 sm:p-4 lg:p-6 flex items-center justify-center bg-gray-50 dark:bg-gray-900 min-h-[150px] sm:min-h-[200px] lg:min-h-[250px]">
            <Component {...propertyValues.value} />
          </div>
        </Card>
      </div>
    </div>
  );
});

export default PlaygroundTemplate; 