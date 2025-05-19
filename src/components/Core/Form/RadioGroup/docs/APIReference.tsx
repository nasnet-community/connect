import { component$ } from '@builder.io/qwik';
import { APIReferenceTemplate, type PropDetail, type MethodDetail } from '~/components/Docs/templates';

/**
 * RadioGroup component API reference documentation using the standard template
 */
export default component$(() => {
  const radioGroupProps: PropDetail[] = [
    {
      name: "options",
      type: "RadioOption[]",
      description: "Array of radio options with value and label properties",
      required: true
    },
    {
      name: "value",
      type: "string",
      description: "Currently selected option value",
      required: true
    },
    {
      name: "name",
      type: "string",
      description: "Name attribute for the radio inputs in the group",
      required: true
    },
    {
      name: "onChange$",
      type: "QRL<(value: string) => void>",
      description: "Callback when an option is selected",
    },
    {
      name: "label",
      type: "string",
      description: "Group label displayed above the options",
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Whether a selection in the group is required",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the entire group is disabled",
    },
    {
      name: "error",
      type: "string",
      description: "Error message to display when validation fails",
    },
    {
      name: "direction",
      type: "'horizontal' | 'vertical'",
      defaultValue: "'vertical'",
      description: "Layout direction of the radio options",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS class for styling the group container",
    }
  ];

  const radioOptionProps: PropDetail[] = [
    {
      name: "value",
      type: "string",
      description: "Value of the radio option",
      required: true
    },
    {
      name: "label",
      type: "string",
      description: "Display label for the radio option",
      required: true
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Whether this specific option is disabled",
    }
  ];

  const methods: MethodDetail[] = [];

  return (
    <APIReferenceTemplate
      props={radioGroupProps}
      methods={methods}
    >
      <p>
        The RadioGroup component is used for mutually exclusive selection options in forms. It renders
        a group of radio inputs where only one can be selected at a time.
      </p>
      
      <h3 class="text-lg font-medium mt-8 mb-4">RadioOption Interface</h3>
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-border dark:border-border-dark">
            <th class="py-2 px-4 text-left">Name</th>
            <th class="py-2 px-4 text-left">Type</th>
            <th class="py-2 px-4 text-left">Default</th>
            <th class="py-2 px-4 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {radioOptionProps.map((prop) => (
            <tr key={prop.name} class="border-b border-border dark:border-border-dark">
              <td class="py-2 px-4 font-mono text-sm">
                {prop.name}
                {prop.required && <span class="text-error ml-1">*</span>}
              </td>
              <td class="py-2 px-4 font-mono text-sm">{prop.type}</td>
              <td class="py-2 px-4 font-mono text-sm">{prop.defaultValue || '-'}</td>
              <td class="py-2 px-4">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </APIReferenceTemplate>
  );
}); 