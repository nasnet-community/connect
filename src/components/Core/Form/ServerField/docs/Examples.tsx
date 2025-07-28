import { component$ } from "@builder.io/qwik";
import ExamplesTemplate from "../../../../Docs/templates/ExamplesTemplate";
import { DocExample } from "../../../../Docs/DocExample";

import BasicExample from "../Examples/Basic";
import VariantsExample from "../Examples/Variants";
import ErrorStatesExample from "../Examples/ErrorStates";
import IntegrationExample from "../Examples/Integration";

// Code examples as strings
const basicExampleCode = `import { component$ } from '@builder.io/qwik';
import { ServerFormField } from '../ServerFormField';

export default component$(() => {
  return (
    <div class="space-y-4">
      <ServerFormField label="Username">
        <input 
          type="text" 
          class="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white" 
          placeholder="Enter your username"
        />
      </ServerFormField>

      <ServerFormField label="Email" required={true}>
        <input 
          type="email" 
          class="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white" 
          placeholder="Enter your email"
        />
      </ServerFormField>
    </div>
  );
});`;

const variantsExampleCode = `import { component$ } from '@builder.io/qwik';
import { ServerFormField } from '../ServerFormField';

export default component$(() => {
  return (
    <div class="space-y-6">
      {/* Standard vertical layout */}
      <ServerFormField label="Standard Field" labelClass="text-blue-600">
        <input 
          type="text" 
          class="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder="This is a standard field layout"
        />
      </ServerFormField>

      {/* Inline layout for checkbox */}
      <ServerFormField label="Accept terms and conditions" inline={true}>
        <input type="checkbox" class="mr-2" />
      </ServerFormField>

      {/* Custom styling */}
      <ServerFormField 
        label="Custom Styled Field" 
        class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg"
      >
        <input 
          type="text" 
          class="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder="This field has custom background styling"
        />
      </ServerFormField>
    </div>
  );
});`;

const errorStatesExampleCode = `import { component$ } from '@builder.io/qwik';
import { ServerFormField } from '../ServerFormField';

export default component$(() => {
  return (
    <div class="space-y-4">
      <ServerFormField 
        label="Username" 
        errorMessage="Username is already taken"
      >
        <input 
          type="text" 
          class="w-full rounded-md border border-red-300 p-2 text-sm shadow-sm dark:border-red-600 dark:bg-gray-800 dark:text-white"
          value="john_doe"
        />
      </ServerFormField>

      <ServerFormField 
        label="Email" 
        required={true}
        errorMessage="Please enter a valid email address"
      >
        <input 
          type="email" 
          class="w-full rounded-md border border-red-300 p-2 text-sm shadow-sm dark:border-red-600 dark:bg-gray-800 dark:text-white"
          value="invalid-email"
        />
      </ServerFormField>

      <ServerFormField 
        label="Password" 
        errorMessage="Password must be at least 8 characters long"
      >
        <input 
          type="password" 
          class="w-full rounded-md border border-red-300 p-2 text-sm shadow-sm dark:border-red-600 dark:bg-gray-800 dark:text-white"
          value="123"
        />
      </ServerFormField>
    </div>
  );
});`;

const integrationExampleCode = `import { component$, useSignal } from '@builder.io/qwik';
import { ServerFormField } from '../ServerFormField';
import { Select } from '../Select';
import { ServerButton } from '../ServerButton';

export default component$(() => {
  const selectedCountry = useSignal('');

  return (
    <form class="space-y-4">
      <ServerFormField label="Full Name" required={true}>
        <input 
          type="text" 
          class="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder="Enter your full name"
        />
      </ServerFormField>

      <ServerFormField label="Country" required={true}>
        <Select 
          value={selectedCountry.value}
          onChange$={(value) => { selectedCountry.value = value; }}
          options={[
            { value: 'us', label: 'United States' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'ca', label: 'Canada' },
            { value: 'au', label: 'Australia' }
          ]}
          placeholder="Select a country"
        />
      </ServerFormField>

      <ServerFormField label="Message">
        <textarea 
          class="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          rows={4}
          placeholder="Enter your message"
        />
      </ServerFormField>

      <ServerFormField label="Subscribe to newsletter" inline={true}>
        <input type="checkbox" class="mr-2" />
      </ServerFormField>

      <div class="flex space-x-2 pt-4">
        <ServerButton onClick$={() => console.log('Submit clicked')}>
          Submit
        </ServerButton>
        <ServerButton onClick$={() => console.log('Cancel clicked')} primary={false}>
          Cancel
        </ServerButton>
      </div>
    </form>
  );
});`;

export default component$(() => {
  return (
    <ExamplesTemplate>
      <div class="space-y-8">
        <DocExample
          title="Basic Usage"
          description="ServerFormField provides the layout structure for form fields with labels and input elements. It supports text inputs, checkboxes, selects, and other input types."
          preview={<BasicExample />}
          code={basicExampleCode}
        />

        <DocExample
          title="Layout Variants"
          description="ServerFormField supports both standard vertical layout and inline layout for checkboxes and radio buttons. You can also apply custom classes for additional styling."
          preview={<VariantsExample />}
          code={variantsExampleCode}
        />

        <DocExample
          title="Error States"
          description="ServerFormField can display error messages from server-side validation with appropriate styling. Error messages appear below the input element."
          preview={<ErrorStatesExample />}
          code={errorStatesExampleCode}
        />

        <DocExample
          title="Integration with Other Components"
          description="ServerFormField works seamlessly with other server components like Select and ServerButton to create complete forms."
          preview={<IntegrationExample />}
          code={integrationExampleCode}
        />
      </div>
    </ExamplesTemplate>
  );
});
