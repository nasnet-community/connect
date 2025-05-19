import { component$, useSignal } from '@builder.io/qwik';
import { PlaygroundTemplate, type PropertyControl } from '~/components/Docs/templates';
import { Form } from '../Form';
import { Field } from '../../Field';
import { Checkbox } from '../../Checkbox';

/**
 * Form component playground using the standard template
 */
export default component$(() => {
  const formResults = useSignal<Record<string, any> | null>(null);
  const submissionCount = useSignal(0);

  // Define the FormDemo component that will be controlled by the playground
  const FormDemo = component$<{
    validateOnMount: boolean;
    validateOnChange: boolean;
    validateOnBlur: boolean;
    validateOnSubmit: boolean;
    resetAfterSubmit: boolean;
    noValidate: boolean;
    requireName: boolean;
    requireEmail: boolean;
    validateEmail: boolean;
    requirePassword: boolean;
    passwordMinLength: boolean;
  }>((props) => {
    return (
      <div class="w-full max-w-md mx-auto">
        <Form
          validateOnMount={props.validateOnMount}
          validateOnChange={props.validateOnChange}
          validateOnBlur={props.validateOnBlur}
          validateOnSubmit={props.validateOnSubmit}
          resetAfterSubmit={props.resetAfterSubmit}
          noValidate={props.noValidate}
          onSubmit$={(values) => {
            formResults.value = values;
            submissionCount.value++;
          }}
          class="space-y-4"
        >
          <Field 
            label="Full Name"
            required={props.requireName}
          />
          
          <Field 
            type="email"
            label="Email Address"
            required={props.requireEmail}
          />
          
          <Field 
            type="password"
            label="Password"
            required={props.requirePassword}
          />
          
          <Checkbox 
            name="subscribe"
            checked={false}
            onChange$={() => {}}
            label="Subscribe to newsletter"
          />
          
          <div class="mt-4">
            <button 
              type="submit" 
              class="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded"
            >
              Submit Form
            </button>
          </div>
        </Form>
        
        {formResults.value && (
          <div class="mt-6 p-4 bg-surface-secondary dark:bg-surface-dark-secondary rounded">
            <h4 class="text-md font-medium mb-2">Form Results (Submission #{submissionCount.value})</h4>
            <pre class="text-sm overflow-x-auto whitespace-pre-wrap">
              {JSON.stringify(formResults.value, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  });

  // Define the controls for the playground
  const properties: PropertyControl[] = [
    {
      type: 'boolean',
      name: 'validateOnMount',
      label: 'Validate on Mount',
      defaultValue: false
    },
    {
      type: 'boolean',
      name: 'validateOnChange',
      label: 'Validate on Change',
      defaultValue: true
    },
    {
      type: 'boolean',
      name: 'validateOnBlur',
      label: 'Validate on Blur',
      defaultValue: true
    },
    {
      type: 'boolean',
      name: 'validateOnSubmit',
      label: 'Validate on Submit',
      defaultValue: true
    },
    {
      type: 'boolean',
      name: 'resetAfterSubmit',
      label: 'Reset After Submit',
      defaultValue: false
    },
    {
      type: 'boolean',
      name: 'noValidate',
      label: 'No Validate (HTML)',
      defaultValue: true
    },
    {
      type: 'boolean',
      name: 'requireName',
      label: 'Require Name',
      defaultValue: true
    },
    {
      type: 'boolean',
      name: 'requireEmail',
      label: 'Require Email',
      defaultValue: true
    },
    {
      type: 'boolean',
      name: 'validateEmail',
      label: 'Validate Email Format',
      defaultValue: true
    },
    {
      type: 'boolean',
      name: 'requirePassword',
      label: 'Require Password',
      defaultValue: true
    },
    {
      type: 'boolean',
      name: 'passwordMinLength',
      label: 'Password Min Length (8)',
      defaultValue: true
    }
  ];

  return (
    <PlaygroundTemplate
      component={FormDemo}
      properties={properties}
    />
  );
}); 