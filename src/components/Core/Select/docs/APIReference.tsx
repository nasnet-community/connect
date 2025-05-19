import { component$ } from '@builder.io/qwik';
import { APIReferenceTemplate, type PropDetail, type MethodDetail } from '~/components/Docs/templates';

/**
 * Select component API reference documentation using the standard template
 */
export default component$(() => {
  const selectProps: PropDetail[] = [
    {
      name: "options",
      type: "{ value: string; label: string; group?: string; disabled?: boolean; }[]",
      description: "Array of options for the select dropdown",
      required: true
    },
    {
      name: "value",
      type: "string | string[]",
      description: "Current selected value(s) of the select",
    },
    {
      name: "onChange$",
      type: "QRL<(value: string | string[]) => void>",
      description: "Callback when the selected value changes",
    },
    {
      name: "onSearch$",
      type: "QRL<(query: string) => void>",
      description: "Callback when search input changes for searchable selects",
    },
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder text when no option is selected",
    },
    {
      name: "label",
      type: "string",
      description: "Label text for the select",
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the select is required",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the select is disabled",
    },
    {
      name: "multiple",
      type: "boolean",
      defaultValue: "false",
      description: "Whether multiple options can be selected",
    },
    {
      name: "searchable",
      type: "boolean",
      defaultValue: "false", 
      description: "Whether the options can be searched",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: "Size variant of the select",
    },
    {
      name: "error",
      type: "string",
      description: "Error message to display when validation fails",
    },
    {
      name: "helperText",
      type: "string",
      description: "Helper text to display below the select",
    },
    {
      name: "clearable",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the selection can be cleared",
    },
    {
      name: "id",
      type: "string",
      description: "ID for the select element",
    },
    {
      name: "name",
      type: "string",
      description: "Name attribute for the select input",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS class for styling the select container",
    },
    {
      name: "validation",
      type: "'valid' | 'invalid'",
      description: "Validation state of the select",
    },
    {
      name: "maxSelectedItems",
      type: "number",
      description: "Maximum number of items that can be selected in multiple mode",
    },
    {
      name: "noOptionsMessage",
      type: "string",
      defaultValue: "'No options available'",
      description: "Message to display when no options are available",
    },
    {
      name: "noResultsMessage",
      type: "string",
      defaultValue: "'No results found'",
      description: "Message to display when no search results are found",
    }
  ];

  const methods: MethodDetail[] = [
    // The Select component doesn't expose methods directly
  ];

  return (
    <APIReferenceTemplate
      props={selectProps}
      methods={methods}
    >
      <p>
        The Select component provides a customizable dropdown interface for selecting options from a list.
        It supports both single and multiple selection modes with additional features like search,
        grouping, and custom rendering.
      </p>
      <p class="mt-3">
        The component handles keyboard navigation, focus management, and accessibility concerns
        automatically while still allowing for customization through its comprehensive props API.
      </p>
    </APIReferenceTemplate>
  );
}); 