import { component$, useSignal } from '@builder.io/qwik';
import PlaygroundTemplate, { type PropertyControl } from '../../../../Docs/templates/PlaygroundTemplate';
import { ServerFormField } from '../ServerFormField';

export default component$(() => {
  // Configure the preview component
  const PreviewComponent = component$((props: any) => {
    return (
      <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
        <ServerFormField
          label={props.label || 'Username'}
          required={props.required || false}
          inline={props.inline || false}
          errorMessage={props.errorMessage || ''}
          class={props.customClass || ''}
        >
          {getInputElement(props.inputType || 'text')}
        </ServerFormField>
      </div>
    );
  });
  
  // Initial values for properties
  const label = useSignal('Username');
  const required = useSignal(false);
  const inline = useSignal(false);
  const errorMessage = useSignal('');
  const customClass = useSignal('');
  const inputType = useSignal('text');

  // Sample input for preview based on selected type
  const getInputElement = (type: string) => {
    switch (type) {
      case 'checkbox':
        return (
          <input 
            type="checkbox" 
            class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800" 
          />
        );
      case 'select':
        return (
          <select class="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white">
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        );
      case 'textarea':
        return (
          <textarea 
            class="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white" 
            rows={3}
            placeholder="Enter text here"
          ></textarea>
        );
      default: // text, email, password, etc.
        return (
          <input 
            type={type} 
            class={`w-full rounded-md border ${errorMessage.value ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'} p-2 text-sm shadow-sm dark:bg-gray-800 dark:text-white`} 
            placeholder={`Enter ${label.value.toLowerCase()}`}
          />
        );
    }
  };

  // Properties for the playground
  const properties: PropertyControl[] = [
    {
      name: 'label',
      type: 'text',
      label: 'Label',
      defaultValue: 'Username',
    },
    {
      name: 'required',
      type: 'boolean',
      label: 'Required',
      defaultValue: false,
    },
    {
      name: 'inline',
      type: 'boolean',
      label: 'Inline Layout',
      defaultValue: false,
    },
    {
      name: 'errorMessage',
      type: 'text',
      label: 'Error Message',
      defaultValue: '',
    },
    {
      name: 'customClass',
      type: 'text',
      label: 'Custom Class',
      defaultValue: '',
    },
    {
      name: 'inputType',
      type: 'select',
      label: 'Input Type',
      defaultValue: 'text',
      options: [
        { label: 'Text Input', value: 'text' },
        { label: 'Email Input', value: 'email' },
        { label: 'Password Input', value: 'password' },
        { label: 'Checkbox', value: 'checkbox' },
        { label: 'Select Dropdown', value: 'select' },
        { label: 'Text Area', value: 'textarea' },
      ],
    }
  ];

  // Code snippet to display in the playground
  const getCodeSnippet = () => {
    const codeLines = ['<ServerFormField'];
    codeLines.push(`  label="${label.value}"`);
    
    if (required.value) {
      codeLines.push('  required={true}');
    }
    
    if (inline.value) {
      codeLines.push('  inline={true}');
    }
    
    if (errorMessage.value) {
      codeLines.push(`  errorMessage="${errorMessage.value}"`);
    }
    
    if (customClass.value) {
      codeLines.push(`  class="${customClass.value}"`);
    }
    
    codeLines.push('>');
    
    // Add the appropriate input based on type
    switch (inputType.value) {
      case 'checkbox':
        codeLines.push('  <input');
        codeLines.push('    type="checkbox"');
        codeLines.push('    class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"');
        codeLines.push('  />');
        break;
      case 'select':
        codeLines.push('  <select class="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white">');
        codeLines.push('    <option value="">Select an option</option>');
        codeLines.push('    <option value="option1">Option 1</option>');
        codeLines.push('    <option value="option2">Option 2</option>');
        codeLines.push('    <option value="option3">Option 3</option>');
        codeLines.push('  </select>');
        break;
      case 'textarea':
        codeLines.push('  <textarea');
        codeLines.push('    class="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"');
        codeLines.push('    rows={3}');
        codeLines.push(`    placeholder="Enter text here"`);
        codeLines.push('  ></textarea>');
        break;
      default: // text, email, password, etc.
        codeLines.push('  <input');
        codeLines.push(`    type="${inputType.value}"`);
        codeLines.push(`    class="w-full rounded-md border ${errorMessage.value ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'} p-2 text-sm shadow-sm dark:bg-gray-800 dark:text-white"`);
        codeLines.push(`    placeholder="Enter ${label.value.toLowerCase()}"`);
        codeLines.push('  />');
        break;
    }
    
    codeLines.push('</ServerFormField>');
    
    return codeLines.join('\n');
  };

  return (
    <PlaygroundTemplate
      component={PreviewComponent}
      properties={properties}
    />
  );
});
