import { component$, useSignal } from '@builder.io/qwik';
import { PlaygroundTemplate, type PropertyControl } from '~/components/Docs/templates';
import { Field } from '../Field';

/**
 * Field component playground using the standard template
 */
export default component$(() => {
  const fieldValue = useSignal('');

  // Define the FieldDemo component that will be controlled by the playground
  const FieldDemo = component$<{
    type: string;
    label: string;
    placeholder: string;
    required: boolean;
    disabled: boolean;
    error: string;
    helperText: string;
    inline: boolean;
    size: 'sm' | 'md' | 'lg';
  }>((props) => {
    return (
      <div class="w-full max-w-md mx-auto">
        <Field
          type={props.type as any}
          label={props.label}
          placeholder={props.placeholder}
          required={props.required}
          disabled={props.disabled}
          error={props.error || undefined}
          helperText={props.helperText || undefined}
          inline={props.inline}
          size={props.size}
          value={fieldValue.value}
          onInput$={(event, element) => {
            fieldValue.value = element.value;
          }}
        />
        
        <div class="mt-4 p-2 bg-surface-secondary dark:bg-surface-dark-secondary rounded text-sm">
          <p>Current value: {fieldValue.value || '(empty)'}</p>
        </div>
      </div>
    );
  });

  // Define the controls for the playground
  const properties: PropertyControl[] = [
    {
      type: 'select',
      name: 'type',
      label: 'Input Type',
      options: [
        { label: 'Text', value: 'text' },
        { label: 'Email', value: 'email' },
        { label: 'Password', value: 'password' },
        { label: 'Number', value: 'number' },
        { label: 'Tel', value: 'tel' },
        { label: 'URL', value: 'url' },
        { label: 'Date', value: 'date' },
        { label: 'Time', value: 'time' }
      ],
      defaultValue: 'text'
    },
    {
      type: 'text',
      name: 'label',
      label: 'Label Text',
      defaultValue: 'Field Label'
    },
    {
      type: 'text',
      name: 'placeholder',
      label: 'Placeholder',
      defaultValue: 'Enter text here...'
    },
    {
      type: 'boolean',
      name: 'required',
      label: 'Required',
      defaultValue: false
    },
    {
      type: 'boolean',
      name: 'disabled',
      label: 'Disabled',
      defaultValue: false
    },
    {
      type: 'text',
      name: 'error',
      label: 'Error Message',
      defaultValue: ''
    },
    {
      type: 'text',
      name: 'helperText',
      label: 'Helper Text',
      defaultValue: 'This is a helper text'
    },
    {
      type: 'boolean',
      name: 'inline',
      label: 'Inline Label',
      defaultValue: false
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
    }
  ];

  return (
    <PlaygroundTemplate
      component={FieldDemo}
      properties={properties}
    />
  );
}); 