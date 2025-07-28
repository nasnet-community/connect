import { component$ } from "@builder.io/qwik";
import {
  APIReferenceTemplate,
  type PropDetail,
  type MethodDetail,
} from "~/components/Docs/templates";

/**
 * Select component API reference documentation using the standard template
 */
export default component$(() => {
  const selectProps: PropDetail[] = [
    {
      name: "options",
      type: "{ value: string; label: string; group?: string; disabled?: boolean; }[]",
      description: "Array of options for the select dropdown",
      required: true,
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
      name: "onOpenChange$",
      type: "QRL<(isOpen: boolean) => void>",
      description: "Callback fired when dropdown opens or closes",
    },
    {
      name: "onOpen$",
      type: "QRL<() => void>",
      description: "Callback fired when dropdown is opened",
    },
    {
      name: "onClose$",
      type: "QRL<() => void>",
      description: "Callback fired when dropdown is closed",
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
      name: "errorMessage",
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
      defaultValue: "true",
      description: "Whether the selection can be cleared (custom mode only)",
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
      type: "'default' | 'valid' | 'invalid'",
      defaultValue: "'default'",
      description: "Validation state of the select",
    },
    {
      name: "mode",
      type: "'native' | 'custom'",
      defaultValue: "'custom'",
      description: "Rendering mode - native uses browser select, custom uses enhanced UI",
    },
    {
      name: "loading",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the select is in a loading state",
    },
    {
      name: "loadingText",
      type: "string",
      defaultValue: "'Loading options...'",
      description: "Custom loading text to display alongside spinner",
    },
    {
      name: "noResultsText",
      type: "string",
      defaultValue: "'No options found'",
      description: "Text to display when search returns no results",
    },
    {
      name: "showCheckboxes",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to show checkbox indicators in multiple mode",
    },
    {
      name: "trapFocus",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to trap focus within dropdown when open",
    },
    {
      name: "maxHeight",
      type: "string",
      description: "Maximum height of dropdown in custom mode",
    },
    {
      name: "aria-label",
      type: "string",
      description: "ARIA label for the select",
    },
    {
      name: "aria-describedby",
      type: "string",
      description: "ID of element that describes this select",
    },
  ];

  const methods: MethodDetail[] = [
    // The Select component doesn't expose methods directly
  ];

  return (
    <APIReferenceTemplate props={selectProps} methods={methods}>
      <p>
        The UnifiedSelect component provides a highly customizable dropdown interface for
        selecting options from a list. It supports both native browser select elements
        and custom-styled dropdowns with advanced features.
      </p>
      <p class="mt-3">
        Key features include single and multiple selection, searchable options with debounced
        input, option grouping, loading states, mobile-optimized UI, comprehensive keyboard
        navigation, and full accessibility support with ARIA labels and focus management.
      </p>
      <p class="mt-3">
        The component is optimized for mobile, tablet, and desktop devices with touch-friendly
        targets, responsive sizing, and enhanced mobile experiences including gesture support
        and native-feeling interactions.
      </p>
    </APIReferenceTemplate>
  );
});
