import { component$ } from '@builder.io/qwik';
import { PlaygroundTemplate, type PropertyControl } from '~/components/Docs/templates';
import { FormErrorMessage } from '../';

/**
 * FormErrorMessage component playground using the standard template
 */
export default component$(() => {
  // Define the FormErrorMessageDemo component that will be controlled by the playground
  const FormErrorMessageDemo = component$<{
    text: string;
    size: 'sm' | 'md' | 'lg';
    hasTopMargin: boolean;
    animate: boolean;
    showIcon: boolean;
    iconType: 'default' | 'circle' | 'triangle';
  }>((props) => {
    // Generate the appropriate icon based on iconType
    const getIcon = () => {
      if (!props.showIcon) return null;
      
      const iconClasses = "w-4 h-4";
      
      switch (props.iconType) {
        case 'default':
          return <span class={`i-lucide-x ${iconClasses}`} />;
        case 'circle':
          return <span class={`i-lucide-x-circle ${iconClasses}`} />;
        case 'triangle':
          return <span class={`i-lucide-alert-triangle ${iconClasses}`} />;
        default:
          return null;
      }
    };
    
    return (
      <div class="mb-6">
        <div class="pb-2 mb-2 border-b border-gray-200 dark:border-gray-800">
          <span class="text-gray-500 dark:text-gray-400 text-sm font-medium">Form Input (for context)</span>
          <input 
            type="text" 
            class="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-error dark:border-error rounded-md"
            placeholder="Sample input with error"
            aria-invalid="true"
            aria-describedby="error-message"
          />
        </div>
        
        <FormErrorMessage
          id="error-message"
          size={props.size}
          hasTopMargin={props.hasTopMargin}
          animate={props.animate}
          icon={getIcon()}
        >
          {props.text}
        </FormErrorMessage>
      </div>
    );
  });

  // Define the controls for the playground
  const properties: PropertyControl[] = [
    {
      type: 'text',
      name: 'text',
      label: 'Error Message',
      defaultValue: 'This field is required and cannot be left empty'
    },
    {
      type: 'select',
      name: 'size',
      label: 'Size',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' }
      ],
      defaultValue: 'md'
    },
    {
      type: 'boolean',
      name: 'hasTopMargin',
      label: 'Has Top Margin',
      defaultValue: true
    },
    {
      type: 'boolean',
      name: 'animate',
      label: 'Animate',
      defaultValue: false
    },
    {
      type: 'boolean',
      name: 'showIcon',
      label: 'Show Icon',
      defaultValue: true
    },
    {
      type: 'select',
      name: 'iconType',
      label: 'Icon Type',
      options: [
        { label: 'Default (X)', value: 'default' },
        { label: 'Circle (X Circle)', value: 'circle' },
        { label: 'Triangle (Alert)', value: 'triangle' }
      ],
      defaultValue: 'default'
    }
  ];

  return (
    <PlaygroundTemplate
      component={FormErrorMessageDemo}
      properties={properties}
    />
  );
}); 