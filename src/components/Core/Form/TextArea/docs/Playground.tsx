import { component$, useSignal } from '@builder.io/qwik';
import { PlaygroundTemplate, type PropertyControl } from '~/components/Docs/templates';
import { TextArea } from '../TextArea';

/**
 * TextArea component playground using the standard template
 */
export default component$(() => {
  const textValue = useSignal('');

  // Define the TextAreaDemo component that will be controlled by the playground
  const TextAreaDemo = component$<{
    label: string;
    placeholder: string;
    required: boolean;
    disabled: boolean;
    helperText: string;
    errorMessage: string;
    state: 'default' | 'error' | 'success' | 'warning';
    size: 'sm' | 'md' | 'lg';
    resize: 'none' | 'vertical' | 'horizontal' | 'both';
    autoResize: boolean;
    minRows: number;
    maxRows: number;
    showCharCount: boolean;
    maxLength: number;
    fullWidth: boolean;
  }>((props) => {
    return (
      <div class="w-full max-w-md mx-auto">
        <TextArea
          label={props.label}
          placeholder={props.placeholder}
          required={props.required}
          disabled={props.disabled}
          helperText={props.helperText || undefined}
          errorMessage={(props.state === 'error' && props.errorMessage) ? props.errorMessage : undefined}
          successMessage={props.state === 'success' ? 'Input is valid!' : undefined}
          warningMessage={props.state === 'warning' ? 'This input needs attention' : undefined}
          state={props.state}
          size={props.size}
          resize={props.resize}
          autoResize={props.autoResize}
          minRows={props.minRows}
          maxRows={props.maxRows || undefined}
          showCharCount={props.showCharCount}
          maxLength={props.maxLength || undefined}
          fullWidth={props.fullWidth}
          value={textValue.value}
          onInput$={(event, element) => {
            textValue.value = element.value;
          }}
        />
        
        <div class="mt-4 p-2 bg-surface-secondary dark:bg-surface-dark-secondary rounded text-sm">
          <p>Current value: {textValue.value ? `"${textValue.value}"` : '(empty)'}</p>
        </div>
      </div>
    );
  });

  // Define the controls for the playground
  const properties: PropertyControl[] = [
    {
      type: 'text',
      name: 'label',
      label: 'Label Text',
      defaultValue: 'Text Area Label'
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
      name: 'helperText',
      label: 'Helper Text',
      defaultValue: 'This is a helper text'
    },
    {
      type: 'text',
      name: 'errorMessage',
      label: 'Error Message',
      defaultValue: 'This field has an error'
    },
    {
      type: 'select',
      name: 'state',
      label: 'State',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Error', value: 'error' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' }
      ],
      defaultValue: 'default'
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
      type: 'select',
      name: 'resize',
      label: 'Resize Behavior',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Vertical', value: 'vertical' },
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Both', value: 'both' }
      ],
      defaultValue: 'vertical'
    },
    {
      type: 'boolean',
      name: 'autoResize',
      label: 'Auto Resize',
      defaultValue: false
    },
    {
      type: 'number',
      name: 'minRows',
      label: 'Minimum Rows',
      defaultValue: 3
    },
    {
      type: 'number',
      name: 'maxRows',
      label: 'Maximum Rows',
      defaultValue: 10
    },
    {
      type: 'boolean',
      name: 'showCharCount',
      label: 'Show Character Count',
      defaultValue: false
    },
    {
      type: 'number',
      name: 'maxLength',
      label: 'Maximum Length',
      defaultValue: 200
    },
    {
      type: 'boolean',
      name: 'fullWidth',
      label: 'Full Width',
      defaultValue: false
    }
  ];

  return (
    <PlaygroundTemplate
      component={TextAreaDemo}
      properties={properties}
    />
  );
}); 