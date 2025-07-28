import { component$ } from "@builder.io/qwik";
import {
  APIReferenceTemplate,
  type PropDetail,
  type MethodDetail,
} from "~/components/Docs/templates";

/**
 * Field component API reference documentation using the standard template
 */
export default component$(() => {
  const props: PropDetail[] = [
    {
      name: "type",
      type: "'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local' | 'checkbox' | 'radio'",
      defaultValue: "'text'",
      description: "Type of the input field",
    },
    {
      name: "label",
      type: "string",
      description: "Label text for the field",
    },
    {
      name: "value",
      type: "string | boolean | number",
      description: "Current value of the field",
    },
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder text for the input",
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the field is required",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the field is disabled",
    },
    {
      name: "id",
      type: "string",
      description: "ID for the input element",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes",
    },
    {
      name: "error",
      type: "string",
      description: "Error message to display",
    },
    {
      name: "helperText",
      type: "string",
      description: "Helper text to display below the field",
    },
    {
      name: "inline",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to display label inline with the input",
    },
    {
      name: "onInput$",
      type: "QRL<(event: Event, element: HTMLInputElement) => void>",
      description: "Callback when input value changes",
    },
    {
      name: "onChange$",
      type: "QRL<(event: Event, element: HTMLInputElement) => void>",
      description: "Callback when field value changes",
    },
    {
      name: "onValueChange$",
      type: "QRL<(value: string | boolean | number) => void>",
      description: "Simplified callback for value changes",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: "Size variant of the field",
    },
  ];

  const methods: MethodDetail[] = [
    // The Field component doesn't expose methods directly, but if it did, they would be listed here
  ];

  return (
    <APIReferenceTemplate props={props} methods={methods}>
      <p>
        The Field component provides a standardized interface for input fields.
        It supports various input types, validation states, and customization
        options to create consistent form fields throughout your application.
      </p>
      <p class="mt-3">
        The Field component is designed to work both as a standalone component
        and in conjunction with the Form component for more complex form
        handling. It provides appropriate aria attributes and styling based on
        the field's state.
      </p>
    </APIReferenceTemplate>
  );
});
