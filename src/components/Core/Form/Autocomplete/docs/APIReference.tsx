import { component$ } from "@builder.io/qwik";
import {
  APIReferenceTemplate,
  type PropDetail,
  type EventDetail,
  type MethodDetail,
} from "~/components/Docs/templates";

/**
 * Autocomplete component API reference documentation
 */
export default component$(() => {
  const props: PropDetail[] = [
    {
      name: "options",
      type: "AutocompleteOption[]",
      description: "Array of options to display in the dropdown",
      required: true,
    },
    {
      name: "value",
      type: "string",
      description: "Currently selected value",
    },
    {
      name: "onValueChange$",
      type: "QRL<(value: string) => void>",
      description: "Callback fired when the selected value changes",
    },
    {
      name: "onInputChange$",
      type: "QRL<(value: string) => void>",
      description: "Callback fired when input text changes (for controlled search)",
    },
    {
      name: "inputValue",
      type: "string",
      description: "Current input value for controlled mode",
    },
    {
      name: "label",
      type: "string",
      description: "Label text displayed above the input",
    },
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder text when input is empty",
    },
    {
      name: "helperText",
      type: "string",
      description: "Helper text displayed below the input",
    },
    {
      name: "error",
      type: "string",
      description: "Error message to display when validation fails",
    },
    {
      name: "id",
      type: "string",
      description: "HTML id attribute for the input element",
    },
    {
      name: "name",
      type: "string",
      description: "HTML name attribute for form submission",
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the input is required for form submission",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the input is disabled",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: "Size variant of the input and dropdown",
    },
    {
      name: "allowCustomValue",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to allow custom values not in the options list",
    },
    {
      name: "filterOptions",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to filter options based on input text",
    },
    {
      name: "filterFunction$",
      type: "QRL<(option: AutocompleteOption, inputValue: string) => boolean>",
      description: "Custom filter function for advanced filtering logic",
    },
    {
      name: "noOptionsText",
      type: "string",
      defaultValue: "'No options found'",
      description: "Text to display when no options match the search",
    },
    {
      name: "loadingText",
      type: "string",
      description: "Text to display when options are loading",
    },
    {
      name: "loading",
      type: "boolean",
      defaultValue: "false",
      description: "Whether options are currently being loaded",
    },
    {
      name: "maxDropdownHeight",
      type: "string",
      defaultValue: "'300px'",
      description: "Maximum height of the dropdown before scrolling",
    },
    {
      name: "open",
      type: "Signal<boolean>",
      description: "Signal to control dropdown open state (controlled mode)",
    },
    {
      name: "highlightMatches",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to highlight matching text in option labels",
    },
    {
      name: "clearable",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to show a clear button when value is selected",
    },
    {
      name: "openOnFocus",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to open dropdown when input receives focus",
    },
    {
      name: "closeOnSelect",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to close dropdown after selecting an option",
    },
    {
      name: "minCharsToSearch",
      type: "number",
      defaultValue: "0",
      description: "Minimum number of characters required before showing options",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes for the wrapper element",
    },
    {
      name: "ariaLabel",
      type: "string",
      description: "ARIA label for accessibility when no visible label is provided",
    },
  ];

  const events: EventDetail[] = [
    {
      name: "onValueChange$",
      parameters: [
        {
          name: "value",
          type: "string",
          description: "The selected option value"
        }
      ],
      description: "Fired when user selects an option from the dropdown",
    },
    {
      name: "onInputChange$",
      parameters: [
        {
          name: "inputValue",
          type: "string",
          description: "Current text in the input field"
        }
      ],
      description: "Fired when input text changes, useful for implementing async search",
    },
    {
      name: "filterFunction$",
      parameters: [
        {
          name: "option",
          type: "AutocompleteOption",
          description: "The option to test"
        },
        {
          name: "inputValue",
          type: "string",
          description: "Current search text"
        }
      ],
      description: "Custom filter function that returns true if option should be shown",
      returnType: "boolean",
    },
  ];

  const methods: MethodDetail[] = [
    // Autocomplete doesn't expose public methods directly
  ];

  return (
    <APIReferenceTemplate 
      props={props} 
      events={events} 
      methods={methods}
    >
      <div class="mb-8">
        <p class="text-text-secondary dark:text-text-dark-secondary">
          The Autocomplete component provides a powerful and flexible interface for selecting values 
          from large datasets with intelligent search and filtering capabilities.
        </p>
      </div>

      {/* Type Definitions */}
      <div class="mt-8">
        <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
          Type Definitions
        </h3>
        
        <div class="space-y-6">
          <div>
            <h4 class="mb-3 text-base font-medium text-text-default dark:text-text-dark-default">
              AutocompleteOption
            </h4>
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`interface AutocompleteOption {
  value: string;        // Unique identifier for the option
  label: string;        // Display text for the option
  disabled?: boolean;   // Whether the option is disabled
  group?: string;       // Optional group name for organization
}`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 class="mb-3 text-base font-medium text-text-default dark:text-text-dark-default">
              AutocompleteGroup
            </h4>
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`interface AutocompleteGroup {
  label: string;                    // Group label
  options: AutocompleteOption[];   // Options in this group
}`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 class="mb-3 text-base font-medium text-text-default dark:text-text-dark-default">
              AutocompleteSize
            </h4>
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`type AutocompleteSize = "sm" | "md" | "lg";`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div class="mt-8">
        <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
          Basic Usage Examples
        </h3>
        
        <div class="space-y-6">
          <div>
            <h4 class="mb-3 text-base font-medium text-text-default dark:text-text-dark-default">
              Simple Autocomplete
            </h4>
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`import { Autocomplete } from "~/components/Core/Form";

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" }
];

<Autocomplete
  options={fruits}
  placeholder="Select a fruit..."
  onValueChange$={(value) => console.log(value)}
/>`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 class="mb-3 text-base font-medium text-text-default dark:text-text-dark-default">
              Async Search
            </h4>
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`const searchUsers = $((query: string) => {
  return fetch(\`/api/users?search=\${query}\`)
    .then(res => res.json());
});

<Autocomplete
  options={searchResults.value}
  loading={isLoading.value}
  onInputChange$={searchUsers}
  placeholder="Search users..."
/>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </APIReferenceTemplate>
  );
});