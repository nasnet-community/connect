import { component$, useSignal } from "@builder.io/qwik";
import {
  PlaygroundTemplate,
  type PropertyControl,
} from "~/components/Docs/templates";
import { UnifiedSelect } from "../UnifiedSelect";

/**
 * Select component playground using the standard template
 */
export default component$(() => {
  const selectedValue = useSignal<string>("");

  // Define the SelectDemo component that will be controlled by the playground
  const SelectDemo = component$<{
    placeholder: string;
    label: string;
    required: boolean;
    disabled: boolean;
    loading: boolean;
    loadingText: string;
    helperText: string;
    errorMessage: string;
    size: "sm" | "md" | "lg";
    searchable: boolean;
    clearable: boolean;
    multiple: boolean;
    showCheckboxes: boolean;
    mode: "native" | "custom";
    validation: "default" | "valid" | "invalid";
    noResultsText: string;
  }>((props) => {
    const options = [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "orange", label: "Orange" },
      { value: "grape", label: "Grape" },
      { value: "kiwi", label: "Kiwi" },
      { value: "mango", label: "Mango" },
    ];

    const groupedOptions = [
      { value: "apple", label: "Apple", group: "Fruits" },
      { value: "banana", label: "Banana", group: "Fruits" },
      { value: "orange", label: "Orange", group: "Fruits" },
      { value: "carrot", label: "Carrot", group: "Vegetables" },
      { value: "broccoli", label: "Broccoli", group: "Vegetables" },
      { value: "spinach", label: "Spinach", group: "Vegetables" },
    ];

    // Handle a potential multiple selection
    const multipleValue = useSignal<string[]>([]);

    return (
      <div class="mx-auto w-full max-w-md">
        <UnifiedSelect
          options={props.searchable ? groupedOptions : options}
          placeholder={props.placeholder}
          label={props.label}
          required={props.required}
          disabled={props.disabled}
          loading={props.loading}
          loadingText={props.loadingText}
          errorMessage={props.errorMessage || undefined}
          helperText={props.helperText || undefined}
          size={props.size}
          searchable={props.searchable}
          clearable={props.clearable}
          multiple={props.multiple}
          showCheckboxes={props.showCheckboxes}
          mode={props.mode}
          validation={props.validation}
          noResultsText={props.noResultsText}
          value={props.multiple ? multipleValue.value : selectedValue.value}
          onChange$={(value: string | string[]) => {
            if (props.multiple && Array.isArray(value)) {
              multipleValue.value = value as string[];
            } else if (!props.multiple && typeof value === "string") {
              selectedValue.value = value;
            }
          }}
        />

        <div class="bg-surface-secondary dark:bg-surface-dark-secondary mt-4 rounded p-2 text-sm">
          <p>
            Current selection:{" "}
            {props.multiple
              ? multipleValue.value.length
                ? multipleValue.value.join(", ")
                : "None"
              : selectedValue.value || "None"}
          </p>
        </div>
      </div>
    );
  });

  // Define the controls for the playground
  const properties: PropertyControl[] = [
    {
      type: "text",
      name: "placeholder",
      label: "Placeholder",
      defaultValue: "Select an option",
    },
    {
      type: "text",
      name: "label",
      label: "Label",
      defaultValue: "Favorite fruit",
    },
    {
      type: "boolean",
      name: "required",
      label: "Required",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "disabled",
      label: "Disabled",
      defaultValue: false,
    },
    {
      type: "text",
      name: "helperText",
      label: "Helper Text",
      defaultValue: "Select your favorite option",
    },
    {
      type: "text",
      name: "errorMessage",
      label: "Error Message",
      defaultValue: "",
    },
    {
      type: "select",
      name: "validation",
      label: "Validation State",
      options: [
        { label: "Default", value: "default" },
        { label: "Valid", value: "valid" },
        { label: "Invalid", value: "invalid" },
      ],
      defaultValue: "default",
    },
    {
      type: "select",
      name: "size",
      label: "Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
      defaultValue: "md",
    },
    {
      type: "boolean",
      name: "searchable",
      label: "Searchable",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "clearable",
      label: "Clearable",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "multiple",
      label: "Multiple Selection",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "showCheckboxes",
      label: "Show Checkboxes (Multiple)",
      defaultValue: true,
    },
    {
      type: "select",
      name: "mode",
      label: "Mode",
      options: [
        { label: "Custom", value: "custom" },
        { label: "Native", value: "native" },
      ],
      defaultValue: "custom",
    },
    {
      type: "boolean",
      name: "loading",
      label: "Loading State",
      defaultValue: false,
    },
    {
      type: "text",
      name: "loadingText",
      label: "Loading Text",
      defaultValue: "Loading options...",
    },
    {
      type: "text",
      name: "noResultsText",
      label: "No Results Text",
      defaultValue: "No options found",
    },
  ];

  return <PlaygroundTemplate component={SelectDemo} properties={properties} />;
});
