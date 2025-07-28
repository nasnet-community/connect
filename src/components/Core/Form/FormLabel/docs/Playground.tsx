import { component$ } from "@builder.io/qwik";
import {
  PlaygroundTemplate,
  type PropertyControl,
} from "~/components/Docs/templates";
import { FormLabel } from "../";

/**
 * FormLabel component playground using the standard template
 */
export default component$(() => {
  // Define the FormLabelDemo component that will be controlled by the playground
  const FormLabelDemo = component$<{
    labelText: string;
    htmlFor: string;
    required: boolean;
    size: "sm" | "md" | "lg";
    disabled: boolean;
    error: boolean;
    success: boolean;
    warning: boolean;
    srOnly: boolean;
  }>((props) => {
    return (
      <div class="space-y-2">
        <FormLabel
          for={props.htmlFor}
          required={props.required}
          size={props.size}
          disabled={props.disabled}
          error={props.error}
          success={props.success}
          warning={props.warning}
          srOnly={props.srOnly}
        >
          {props.labelText}
        </FormLabel>

        <input
          id={props.htmlFor}
          type="text"
          class={`block w-full rounded-md border px-3 py-2
            ${props.disabled ? "cursor-not-allowed border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-800" : ""}
            ${props.error ? "border-error dark:border-error" : ""}
            ${props.success ? "border-success dark:border-success" : ""}
            ${props.warning ? "border-warning dark:border-warning" : ""}
            ${!props.disabled && !props.error && !props.success && !props.warning ? "border-gray-300 dark:border-gray-700" : ""}
          `}
          placeholder="Input field"
          disabled={props.disabled}
          aria-invalid={props.error ? "true" : undefined}
          required={props.required}
        />

        {props.srOnly && (
          <div class="mt-2 text-sm italic text-gray-500 dark:text-gray-400">
            Note: The label is visually hidden but accessible to screen readers.
          </div>
        )}
      </div>
    );
  });

  // Define the controls for the playground
  const properties: PropertyControl[] = [
    {
      type: "text",
      name: "labelText",
      label: "Label Text",
      defaultValue: "Form Label",
    },
    {
      type: "text",
      name: "htmlFor",
      label: "For (ID of input)",
      defaultValue: "playground-input",
    },
    {
      type: "boolean",
      name: "required",
      label: "Required",
      defaultValue: false,
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
      name: "disabled",
      label: "Disabled",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "error",
      label: "Error",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "success",
      label: "Success",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "warning",
      label: "Warning",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "srOnly",
      label: "Screen Reader Only",
      defaultValue: false,
    },
  ];

  return (
    <PlaygroundTemplate component={FormLabelDemo} properties={properties} />
  );
});
