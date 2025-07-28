import { component$ } from "@builder.io/qwik";
import {
  APIReferenceTemplate,
  type PropDetail,
  type MethodDetail,
} from "~/components/Docs/templates";

/**
 * PasswordField component API reference documentation using the standard template
 */
export default component$(() => {
  const props: PropDetail[] = [
    {
      name: "value",
      type: "string",
      description: "Current value of the password field",
      required: true,
    },
    {
      name: "label",
      type: "string",
      description: "Label text for the password field",
    },
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder text when no password is entered",
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the password field is required",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the password field is disabled",
    },
    {
      name: "id",
      type: "string",
      description:
        "ID for the password input element. If not provided, a unique ID is generated",
    },
    {
      name: "class",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS class(es) for the input element",
    },
    {
      name: "error",
      type: "string",
      description: "Error message to display when validation fails",
    },
    {
      name: "helperText",
      type: "string",
      description: "Helper text displayed below the password field",
    },
    {
      name: "onInput$",
      type: "QRL<(event: Event, element: HTMLInputElement) => void>",
      description: "Callback when the input value changes via input event",
    },
    {
      name: "onChange$",
      type: "QRL<(event: Event, element: HTMLInputElement) => void>",
      description: "Callback when the input value changes via change event",
    },
    {
      name: "onValueChange$",
      type: "QRL<(value: string) => void>",
      description: "Simplified callback that provides just the new value",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: "Size variant of the password field",
    },
    {
      name: "initiallyVisible",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the password is initially displayed as plain text",
    },
    {
      name: "toggleLabel",
      type: "string",
      description:
        "Accessibility label for the password visibility toggle button",
    },
    {
      name: "showStrength",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to display a password strength indicator",
    },
  ];

  const methods: MethodDetail[] = [
    // The PasswordField component doesn't expose methods directly
  ];

  return (
    <APIReferenceTemplate props={props} methods={methods}>
      <p>
        The PasswordField component is built on top of the standard HTML
        password input with additional features like visibility toggling and
        strength indicators. It supports all standard input behaviors along with
        specialized password-related functionality.
      </p>
      <p class="mt-3">
        The component handles both controlled and uncontrolled input patterns
        through the value and onValueChange$ props. For more complex event
        handling, you can use the onInput$ and onChange$ props.
      </p>
      <p class="mt-3">
        The PasswordStrengthIndicator subcomponent is automatically included
        when the showStrength prop is set to true. It calculates password
        strength based on length and character variety.
      </p>
    </APIReferenceTemplate>
  );
});
