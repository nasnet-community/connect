import { component$ } from "@builder.io/qwik";
import {
  APIReferenceTemplate,
  type PropDetail,
  type MethodDetail,
} from "~/components/Docs/templates";

/**
 * TextArea component API reference documentation using the standard template
 */
export default component$(() => {
  const props: PropDetail[] = [
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: "Size variant of the text area",
    },
    {
      name: "label",
      type: "string",
      description: "Label text for the field",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the text area is disabled",
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the text area is required",
    },
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder text when the text area is empty",
    },
    {
      name: "helperText",
      type: "string",
      description: "Helper text shown below the text area",
    },
    {
      name: "errorMessage",
      type: "string",
      description: "Error message to display when in error state",
    },
    {
      name: "successMessage",
      type: "string",
      description: "Success message to display when in success state",
    },
    {
      name: "warningMessage",
      type: "string",
      description: "Warning message to display when in warning state",
    },
    {
      name: "state",
      type: "'default' | 'success' | 'error' | 'warning'",
      defaultValue: "'default'",
      description: "Current validation state of the text area",
    },
    {
      name: "containerClass",
      type: "string",
      description: "Additional CSS class for the container element",
    },
    {
      name: "textareaClass",
      type: "string",
      description: "Additional CSS class for the textarea element",
    },
    {
      name: "labelClass",
      type: "string",
      description: "Additional CSS class for the label element",
    },
    {
      name: "messageClass",
      type: "string",
      description: "Additional CSS class for the message element",
    },
    {
      name: "autoResize",
      type: "boolean",
      defaultValue: "false",
      description:
        "Whether to automatically resize the text area based on content",
    },
    {
      name: "resize",
      type: "'none' | 'vertical' | 'horizontal' | 'both' | 'auto'",
      defaultValue: "'vertical'",
      description: "How the user can resize the text area",
    },
    {
      name: "minRows",
      type: "number",
      defaultValue: "3",
      description: "Minimum number of rows to display",
    },
    {
      name: "maxRows",
      type: "number",
      description: "Maximum number of rows when auto-resizing",
    },
    {
      name: "showCharCount",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to show a character counter",
    },
    {
      name: "maxLength",
      type: "number",
      description: "Maximum number of characters allowed",
    },
    {
      name: "charCountFormatter$",
      type: "QRL<(current: number, max?: number) => string>",
      description: "Custom formatter for character count display",
    },
    {
      name: "autofocus",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the text area should auto-focus when mounted",
    },
    {
      name: "fullWidth",
      type: "boolean",
      defaultValue: "false",
      description:
        "Whether the text area should take full width of its container",
    },
    {
      name: "showClear",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to show a clear button to reset content",
    },
    {
      name: "onInput$",
      type: "QRL<(event: InputEvent, element: HTMLTextAreaElement) => any>",
      description: "Callback when input value changes",
    },
    {
      name: "onChange$",
      type: "QRL<(event: Event, element: HTMLTextAreaElement) => any>",
      description: "Callback when field value changes",
    },
    {
      name: "onBlur$",
      type: "QRL<(event: FocusEvent) => any>",
      description: "Callback when text area loses focus",
    },
    {
      name: "name",
      type: "string",
      description: "Name attribute for form submission",
    },
  ];

  const methods: MethodDetail[] = [
    // The TextArea component doesn't expose methods directly, but if it did, they would be listed here
  ];

  return (
    <APIReferenceTemplate props={props} methods={methods}>
      <p>
        The TextArea component is designed for collecting multi-line text input
        in forms. It extends the standard HTML textarea with additional features
        and capabilities while maintaining a consistent styling and behavior
        with other form components.
      </p>
      <p class="mt-3">
        This component offers advanced features like auto-resizing, character
        counting, various resize behaviors, and robust validation state
        handling. It's built to be accessible and integrate seamlessly with both
        controlled and uncontrolled form patterns.
      </p>
    </APIReferenceTemplate>
  );
});
