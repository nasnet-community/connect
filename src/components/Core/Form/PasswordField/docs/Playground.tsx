import { component$, useSignal } from "@builder.io/qwik";
import {
  PlaygroundTemplate,
  type PropertyControl,
} from "~/components/Docs/templates";
import { PasswordField } from "../index";

/**
 * PasswordField component playground using the standard template
 */
export default component$(() => {
  const password = useSignal<string>("");

  // Define the PasswordFieldDemo component that will be controlled by the playground
  const PasswordFieldDemo = component$<{
    placeholder: string;
    label: string;
    required: boolean;
    disabled: boolean;
    helperText: string;
    errorMessage: string;
    size: "sm" | "md" | "lg";
    initiallyVisible: boolean;
    showStrength: boolean;
    toggleLabel: string;
  }>((props) => {
    return (
      <div class="mx-auto w-full max-w-md">
        <PasswordField
          value={password.value}
          onValueChange$={(value: string) => (password.value = value)}
          placeholder={props.placeholder}
          label={props.label}
          required={props.required}
          disabled={props.disabled}
          helperText={props.helperText || undefined}
          error={props.errorMessage || undefined}
          size={props.size}
          initiallyVisible={props.initiallyVisible}
          showStrength={props.showStrength}
          toggleLabel={props.toggleLabel || undefined}
        />

        <div class="bg-surface-secondary dark:bg-surface-dark-secondary mt-4 rounded p-2 text-sm">
          <p>Current value: {password.value || "(empty)"}</p>
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
      defaultValue: "Enter your password",
    },
    {
      type: "text",
      name: "label",
      label: "Label",
      defaultValue: "Password",
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
      defaultValue: "Password must be at least 8 characters",
    },
    {
      type: "text",
      name: "errorMessage",
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
      name: "initiallyVisible",
      label: "Initially Visible",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "showStrength",
      label: "Show Strength Indicator",
      defaultValue: false,
    },
    {
      type: "text",
      name: "toggleLabel",
      label: "Toggle Button Label",
      defaultValue: "Toggle password visibility",
    },
  ];

  return (
    <PlaygroundTemplate component={PasswordFieldDemo} properties={properties} />
  );
});
