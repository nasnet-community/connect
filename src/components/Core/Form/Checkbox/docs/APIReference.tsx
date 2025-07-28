import { component$ } from "@builder.io/qwik";
import {
  APIReferenceTemplate,
  type PropDetail,
  type MethodDetail,
} from "~/components/Docs/templates";

/**
 * Checkbox component API reference documentation using the standard template
 */
export default component$(() => {
  const checkboxProps: PropDetail[] = [
    {
      name: "checked",
      type: "boolean",
      description: "Current checked state of the checkbox",
      required: true,
    },
    {
      name: "onChange$",
      type: "QRL<(checked: boolean) => void>",
      description: "Callback when the checkbox state changes",
      required: true,
    },
    {
      name: "onValueChange$",
      type: "QRL<(checked: boolean) => void>",
      description:
        "Alternative callback for state changes, allows integration with different state patterns",
    },
    {
      name: "label",
      type: "string",
      description: "Text label for the checkbox",
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the checkbox is required",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the checkbox is disabled",
    },
    {
      name: "id",
      type: "string",
      description: "ID for the checkbox input element",
    },
    {
      name: "name",
      type: "string",
      description: "Name attribute for the checkbox input element",
    },
    {
      name: "value",
      type: "string",
      description: "Value attribute for the checkbox input element",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: "Size variant of the checkbox",
    },
    {
      name: "error",
      type: "string",
      description: "Error message to display when validation fails",
    },
    {
      name: "helperText",
      type: "string",
      description: "Additional information text displayed below the checkbox",
    },
    {
      name: "inline",
      type: "boolean",
      defaultValue: "false",
      description:
        "Whether to render just the checkbox input without the label container",
    },
    {
      name: "indeterminate",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the checkbox is in an indeterminate state",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS class for styling the checkbox container",
    },
    {
      name: "aria-label",
      type: "string",
      description: "Accessible label when no visible label is provided",
    },
    {
      name: "aria-describedby",
      type: "string",
      description: "ID of element describing the checkbox for accessibility",
    },
  ];

  const checkboxGroupProps: PropDetail[] = [
    {
      name: "options",
      type: "CheckboxOption[]",
      description: "Array of checkbox options with value and label properties",
      required: true,
    },
    {
      name: "selected",
      type: "string[]",
      description: "Array of currently selected option values",
      required: true,
    },
    {
      name: "onToggle$",
      type: "QRL<(value: string) => void>",
      description: "Callback when an option is toggled",
      required: true,
    },
    {
      name: "onSelectionChange$",
      type: "QRL<(selectedValues: string[]) => void>",
      description:
        "Callback with the complete array of selected values when selection changes",
    },
    {
      name: "label",
      type: "string",
      description: "Group label displayed above the options",
    },
    {
      name: "id",
      type: "string",
      description: "ID for the checkbox group element",
    },
    {
      name: "helperText",
      type: "string",
      description:
        "Additional information text displayed below the group label",
    },
    {
      name: "error",
      type: "string",
      description: "Error message to display when validation fails",
    },
    {
      name: "name",
      type: "string",
      description: "Name attribute for the checkbox inputs in the group",
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Whether at least one option in the group must be selected",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the entire group is disabled",
    },
    {
      name: "direction",
      type: "'horizontal' | 'vertical'",
      defaultValue: "'vertical'",
      description: "Layout direction of the checkbox options",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: "Size variant for all checkboxes in the group",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS class for styling the group container",
    },
  ];

  const methods: MethodDetail[] = [
    // The Checkbox component doesn't expose methods directly
  ];

  return (
    <APIReferenceTemplate props={checkboxProps} methods={methods}>
      <p>
        The Checkbox component is used for boolean selection options in forms.
        It can be used as a standalone component or as part of a CheckboxGroup
        for multiple related options.
      </p>
      <p class="mt-3">
        In addition to the standard checkbox functionality, this component
        provides features like indeterminate state support, different sizes, and
        robust accessibility attributes.
      </p>

      <h3 class="mb-4 mt-8 text-lg font-medium">CheckboxGroup Props</h3>
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-border dark:border-border-dark">
            <th class="px-4 py-2 text-left">Name</th>
            <th class="px-4 py-2 text-left">Type</th>
            <th class="px-4 py-2 text-left">Default</th>
            <th class="px-4 py-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {checkboxGroupProps.map((prop) => (
            <tr
              key={prop.name}
              class="border-b border-border dark:border-border-dark"
            >
              <td class="px-4 py-2 font-mono text-sm">
                {prop.name}
                {prop.required && <span class="ml-1 text-error">*</span>}
              </td>
              <td class="px-4 py-2 font-mono text-sm">{prop.type}</td>
              <td class="px-4 py-2 font-mono text-sm">
                {prop.defaultValue || "-"}
              </td>
              <td class="px-4 py-2">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </APIReferenceTemplate>
  );
});
