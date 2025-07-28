import { component$ } from "@builder.io/qwik";
import {
  PlaygroundTemplate,
  type PropertyControl,
} from "~/components/Docs/templates";
import { FormHelperText } from "../";

/**
 * FormHelperText component playground using the standard template
 */
export default component$(() => {
  // Define the FormHelperTextDemo component that will be controlled by the playground
  const FormHelperTextDemo = component$<{
    text: string;
    size: "sm" | "md" | "lg";
    disabled: boolean;
    error: boolean;
    success: boolean;
    warning: boolean;
    hasTopMargin: boolean;
    srOnly: boolean;
    showIcon: boolean;
    iconType: "info" | "error" | "success" | "warning";
  }>((props) => {
    // Generate the appropriate icon based on iconType
    const getIcon = () => {
      if (!props.showIcon) return null;

      const iconClasses = "w-4 h-4";

      switch (props.iconType) {
        case "info":
          return <span class={`i-lucide-info ${iconClasses}`} />;
        case "error":
          return <span class={`i-lucide-alert-circle ${iconClasses}`} />;
        case "success":
          return <span class={`i-lucide-check-circle ${iconClasses}`} />;
        case "warning":
          return <span class={`i-lucide-alert-triangle ${iconClasses}`} />;
        default:
          return null;
      }
    };

    return (
      <div class="mb-6">
        <div class="mb-2 border-b border-gray-200 pb-2 dark:border-gray-800">
          <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Form Input (for context)
          </span>
          <input
            type="text"
            class={`mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 dark:border-gray-600 dark:bg-gray-700
            ${props.disabled ? "cursor-not-allowed opacity-60" : ""}
            ${props.error ? "border-error dark:border-error" : ""}
            ${props.success ? "border-success dark:border-success" : ""}
            ${props.warning ? "border-warning dark:border-warning" : ""}`}
            placeholder="Sample input"
            disabled={props.disabled}
          />
        </div>

        <FormHelperText
          size={props.size}
          disabled={props.disabled}
          error={props.error}
          success={props.success}
          warning={props.warning}
          hasTopMargin={props.hasTopMargin}
          srOnly={props.srOnly}
          icon={getIcon()}
        >
          {props.text}
        </FormHelperText>

        {props.srOnly && (
          <div class="mt-4 rounded-md bg-gray-100 p-2 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            <span class="font-medium">Note:</span> The helper text is visually
            hidden but accessible to screen readers.
          </div>
        )}
      </div>
    );
  });

  // Define the controls for the playground
  const properties: PropertyControl[] = [
    {
      type: "text",
      name: "text",
      label: "Helper Text",
      defaultValue: "This is a helper text providing additional information",
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
      name: "hasTopMargin",
      label: "Has Top Margin",
      defaultValue: true,
    },
    {
      type: "boolean",
      name: "srOnly",
      label: "Screen Reader Only",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "showIcon",
      label: "Show Icon",
      defaultValue: false,
    },
    {
      type: "select",
      name: "iconType",
      label: "Icon Type",
      options: [
        { label: "Info", value: "info" },
        { label: "Error", value: "error" },
        { label: "Success", value: "success" },
        { label: "Warning", value: "warning" },
      ],
      defaultValue: "info",
    },
  ];

  return (
    <PlaygroundTemplate
      component={FormHelperTextDemo}
      properties={properties}
    />
  );
});
