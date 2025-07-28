import { component$, useSignal } from "@builder.io/qwik";
import {
  PlaygroundTemplate,
  type PropertyControl,
} from "~/components/Docs/templates";
import { Checkbox } from "../Checkbox";

/**
 * Checkbox component playground using the standard template
 */
export default component$(() => {
  const checkedValue = useSignal(false);

  // Define the CheckboxDemo component that will be controlled by the playground
  const CheckboxDemo = component$<{
    label: string;
    required: boolean;
    disabled: boolean;
    helperText: string;
    error: string;
    size: "sm" | "md" | "lg";
    indeterminate: boolean;
    inline: boolean;
  }>((props) => {
    return (
      <div class="mx-auto w-full max-w-md">
        {props.inline ? (
          <div class="flex items-center gap-2">
            <Checkbox
              checked={checkedValue.value}
              onChange$={(checked: boolean) => (checkedValue.value = checked)}
              required={props.required}
              disabled={props.disabled}
              size={props.size}
              indeterminate={props.indeterminate}
              inline={props.inline}
              aria-label={props.label}
            />
            <span class="text-sm">{props.label}</span>
          </div>
        ) : (
          <Checkbox
            checked={checkedValue.value}
            onChange$={(checked: boolean) => (checkedValue.value = checked)}
            label={props.label}
            required={props.required}
            disabled={props.disabled}
            error={props.error || undefined}
            helperText={props.helperText || undefined}
            size={props.size}
            indeterminate={props.indeterminate}
          />
        )}

        <div class="bg-surface-secondary dark:bg-surface-dark-secondary mt-4 rounded p-2 text-sm">
          <p>Current state: {checkedValue.value ? "Checked" : "Unchecked"}</p>
        </div>
      </div>
    );
  });

  // Define the controls for the playground
  const properties: PropertyControl[] = [
    {
      type: "text",
      name: "label",
      label: "Label Text",
      defaultValue: "Checkbox Label",
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
      defaultValue: "This is a helper text",
    },
    {
      type: "text",
      name: "error",
      label: "Error Message",
      defaultValue: "",
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
      name: "indeterminate",
      label: "Indeterminate",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "inline",
      label: "Inline",
      defaultValue: false,
    },
  ];

  return (
    <PlaygroundTemplate component={CheckboxDemo} properties={properties} />
  );
});
