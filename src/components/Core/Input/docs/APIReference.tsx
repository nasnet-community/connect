import { component$ } from "@builder.io/qwik";
import { APIReferenceTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const inputProps = [
    {
      name: "type",
      type: "'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local'",
      defaultValue: "text",
      description: "The type of input field to render.",
    },
    {
      name: "id",
      type: "string",
      description: "The ID attribute for the input element. Auto-generated if not provided.",
    },
    {
      name: "name",
      type: "string",
      description: "The name attribute for the input element.",
    },
    {
      name: "value",
      type: "string | number",
      description: "The controlled value of the input.",
    },
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder text shown when the input is empty.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the input is disabled.",
    },
    {
      name: "readonly",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the input is read-only.",
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the input is required for form submission.",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg' | 'xl'",
      defaultValue: "md",
      description: "The size of the input with mobile-optimized touch targets.",
    },
    {
      name: "validation",
      type: "'default' | 'valid' | 'invalid' | 'warning'",
      defaultValue: "default",
      description: "The validation state of the input with visual feedback.",
    },
    {
      name: "label",
      type: "string",
      description: "Label text displayed above the input.",
    },
    {
      name: "helperText",
      type: "string",
      description: "Helper text displayed below the input when not in error state.",
    },
    {
      name: "errorMessage",
      type: "string",
      description: "Error message displayed when validation is 'invalid'.",
    },
    {
      name: "warningMessage",
      type: "string",
      description: "Warning message displayed when validation is 'warning'.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the input.",
    },
    {
      name: "hasPrefixSlot",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the input has a prefix slot for icons or content.",
    },
    {
      name: "hasSuffixSlot",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the input has a suffix slot for icons or content.",
    },
    {
      name: "fluid",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the input should take full width of its container.",
    },
    {
      name: "animate",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to enable smooth animations and transitions.",
    },
    {
      name: "min",
      type: "string | number",
      description: "Minimum value for number, date, or time inputs.",
    },
    {
      name: "max",
      type: "string | number",
      description: "Maximum value for number, date, or time inputs.",
    },
    {
      name: "step",
      type: "string | number",
      description: "Step value for number inputs.",
    },
    {
      name: "pattern",
      type: "string",
      description: "Regex pattern for input validation.",
    },
    {
      name: "autoComplete",
      type: "string",
      description: "Autocomplete behavior for the input.",
    },
    {
      name: "autoFocus",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the input should be focused on mount.",
    },
    {
      name: "onChange$",
      type: "QRL<(event: Event, value: string) => void>",
      description: "Event handler called when the input value changes.",
    },
    {
      name: "onInput$",
      type: "QRL<(event: Event, value: string) => void>",
      description: "Event handler called on every input event.",
    },
    {
      name: "onFocus$",
      type: "QRL<(event: FocusEvent) => void>",
      description: "Event handler called when the input receives focus.",
    },
    {
      name: "onBlur$",
      type: "QRL<(event: FocusEvent) => void>",
      description: "Event handler called when the input loses focus.",
    },
    {
      name: "onKeyDown$",
      type: "QRL<(event: KeyboardEvent) => void>",
      description: "Event handler called when a key is pressed down.",
    },
    {
      name: "onKeyUp$",
      type: "QRL<(event: KeyboardEvent) => void>",
      description: "Event handler called when a key is released.",
    },
  ];

  const radioInputProps = [
    {
      name: "id",
      type: "string",
      description: "The ID attribute for the radio group. Auto-generated if not provided.",
    },
    {
      name: "name",
      type: "string",
      required: true,
      description: "The name attribute for all radio inputs in the group.",
    },
    {
      name: "value",
      type: "string",
      description: "The currently selected value in the radio group.",
    },
    {
      name: "options",
      type: "RadioOption[]",
      required: true,
      description: "Array of options for the radio group. Each option has value, label, disabled, and description properties.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Whether all radio inputs in the group are disabled.",
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Whether selecting an option is required.",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg' | 'xl'",
      defaultValue: "md",
      description: "The size of the radio inputs and labels.",
    },
    {
      name: "validation",
      type: "'default' | 'valid' | 'invalid' | 'warning'",
      defaultValue: "default",
      description: "The validation state of the radio group.",
    },
    {
      name: "label",
      type: "string",
      description: "Label text displayed above the radio group as a fieldset legend.",
    },
    {
      name: "helperText",
      type: "string",
      description: "Helper text displayed below the radio group.",
    },
    {
      name: "errorMessage",
      type: "string",
      description: "Error message displayed when validation is 'invalid'.",
    },
    {
      name: "warningMessage",
      type: "string",
      description: "Warning message displayed when validation is 'warning'.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the radio group container.",
    },
    {
      name: "direction",
      type: "'horizontal' | 'vertical'",
      defaultValue: "vertical",
      description: "Layout direction for the radio options.",
    },
    {
      name: "animate",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to enable smooth animations and transitions.",
    },
    {
      name: "onChange$",
      type: "QRL<(event: Event, value: string) => void>",
      description: "Event handler called when the selected value changes.",
    },
    {
      name: "onFocus$",
      type: "QRL<(event: FocusEvent) => void>",
      description: "Event handler called when any radio input receives focus.",
    },
    {
      name: "onBlur$",
      type: "QRL<(event: FocusEvent) => void>",
      description: "Event handler called when any radio input loses focus.",
    },
  ];

  const radioOptionInterface = [
    {
      name: "value",
      type: "string",
      required: true,
      description: "The value of the radio option.",
    },
    {
      name: "label",
      type: "string",
      required: true,
      description: "The display label for the radio option.",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether this specific option is disabled.",
    },
    {
      name: "description",
      type: "string",
      description: "Optional description text displayed below the label.",
    },
  ];

  return (
    <APIReferenceTemplate props={inputProps}>
      <p>
        The Input component provides a comprehensive text input solution with
        validation, accessibility, and responsive design features. It supports
        multiple input types and includes prefix/suffix slot functionality.
      </p>

      <h3 class="mb-2 mt-6 text-lg font-semibold">RadioInput Props</h3>
      <APIReferenceTemplate props={radioInputProps} />

      <h3 class="mb-2 mt-6 text-lg font-semibold">RadioOption Interface</h3>
      <APIReferenceTemplate props={radioOptionInterface} />

      <h3 class="mb-4 mt-6 text-lg font-semibold">Accessibility Features</h3>
      <ul class="list-disc space-y-1 pl-6">
        <li>Proper ARIA attributes for screen readers</li>
        <li>Keyboard navigation support (Tab, Enter, Space, Arrow keys for radio groups)</li>
        <li>Focus management with visible focus indicators</li>
        <li>Error and helper messages properly associated with inputs</li>
        <li>Required field indicators with proper aria-label</li>
        <li>High contrast mode support</li>
        <li>Touch-friendly sizing for mobile devices</li>
      </ul>

      <h3 class="mb-4 mt-6 text-lg font-semibold">Slots</h3>
      <div class="mb-4">
        <h4 class="mb-2 font-medium">Input Component Slots</h4>
        <ul class="list-disc space-y-1 pl-6">
          <li><strong>prefix</strong>: Content displayed at the start of the input (icons, labels)</li>
          <li><strong>suffix</strong>: Content displayed at the end of the input (buttons, units)</li>
        </ul>
      </div>

      <h3 class="mb-4 mt-6 text-lg font-semibold">Responsive Design</h3>
      <ul class="list-disc space-y-1 pl-6">
        <li>Mobile-first design with touch-friendly targets</li>
        <li>Responsive sizing using Tailwind breakpoints</li>
        <li>Minimum height ensures accessibility on touch devices</li>
        <li>Logical properties for RTL language support</li>
        <li>Safe area support for mobile devices</li>
      </ul>
    </APIReferenceTemplate>
  );
});