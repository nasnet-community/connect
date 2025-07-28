import { component$ } from "@builder.io/qwik";
import { APIReferenceTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const radioProps = [
    {
      name: "value",
      type: "string",
      required: true,
      description: "The value of the radio button that will be submitted when selected.",
    },
    {
      name: "name",
      type: "string",
      required: true,
      description: "The name attribute for the radio input, groups radio buttons together.",
    },
    {
      name: "checked",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the radio button is currently selected.",
    },
    {
      name: "label",
      type: "string",
      description: "Label text displayed next to the radio button.",
    },
    {
      name: "onChange$",
      type: "QRL<(value: string) => void>",
      description: "Function called when the radio button selection changes.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "When true, disables the radio button and prevents user interaction.",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "md",
      description: "Controls the size of the radio button and its label.",
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "When true, marks the field as required and shows an asterisk.",
    },
    {
      name: "id",
      type: "string",
      description: "HTML id attribute for the radio input. Auto-generated if not provided.",
    },
    {
      name: "aria-label",
      type: "string",
      description: "Accessible label for the radio button for screen readers.",
    },
    {
      name: "aria-describedby",
      type: "string",
      description: "ID of element that provides additional description for this radio button.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the radio container.",
    },
  ];

  const radioGroupProps = [
    {
      name: "options",
      type: "RadioOption[]",
      required: true,
      description: "Array of radio options to display in the group.",
    },
    {
      name: "value",
      type: "string",
      required: true,
      description: "Currently selected value in the radio group.",
    },
    {
      name: "name",
      type: "string",
      required: true,
      description: "Name attribute shared by all radio buttons in the group.",
    },
    {
      name: "label",
      type: "string",
      description: "Label for the entire radio group (fieldset legend).",
    },
    {
      name: "helperText",
      type: "string",
      description: "Additional helper text displayed below the label.",
    },
    {
      name: "error",
      type: "string",
      description: "Error message to display. When present, helper text is hidden.",
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the radio group requires a selection.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "When true, disables all radio buttons in the group.",
    },
    {
      name: "direction",
      type: "'horizontal' | 'vertical'",
      defaultValue: "vertical",
      description: "Layout direction for the radio buttons.",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "md",
      description: "Size applied to all radio buttons in the group.",
    },
    {
      name: "onChange$",
      type: "QRL<(value: string) => void>",
      description: "Function called when the selected value changes.",
    },
    {
      name: "id",
      type: "string",
      description: "HTML id for the fieldset element. Auto-generated if not provided.",
    },
    {
      name: "aria-label",
      type: "string",
      description: "Accessible label for the radio group.",
    },
    {
      name: "aria-describedby",
      type: "string",
      description: "ID of element that provides additional description for this radio group.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the fieldset container.",
    },
  ];

  const radioOptionType = [
    {
      name: "value",
      type: "string",
      required: true,
      description: "The value of this radio option.",
    },
    {
      name: "label",
      type: "string",
      required: true,
      description: "The label text for this radio option.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Whether this specific option is disabled.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes for this specific radio option.",
    },
  ];

  return (
    <APIReferenceTemplate props={radioProps}>
      <p>
        The Radio component provides an accessible way to select a single option
        from a set of choices. It can be used individually or as part of a
        RadioGroup for better management of multiple options.
      </p>

      <h3 class="mb-2 mt-6 text-lg font-semibold">RadioGroup Props</h3>
      <p class="mb-4">
        The RadioGroup component manages a collection of related radio buttons:
      </p>
      <div class="mb-6">
        <APIReferenceTemplate props={radioGroupProps} />
      </div>

      <h3 class="mb-2 mt-6 text-lg font-semibold">RadioOption Type</h3>
      <p class="mb-4">
        Structure for individual options in the RadioGroup:
      </p>
      <div class="mb-6">
        <APIReferenceTemplate props={radioOptionType} />
      </div>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Size Variants</h3>
      <p class="mb-2">
        The Radio component supports three size variants:
      </p>
      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>
          <code>sm</code> - Small size (14px radio, 12px text)
        </li>
        <li>
          <code>md</code> - Medium size (16px radio, 14px text) - Default
        </li>
        <li>
          <code>lg</code> - Large size (20px radio, 16px text)
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Accessibility Features</h3>
      <p class="mb-2">
        The Radio components include comprehensive accessibility support:
      </p>
      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>Proper labeling with visible labels or aria-label</li>
        <li>Keyboard navigation support with Tab and Arrow keys</li>
        <li>Focus indicators for keyboard users</li>
        <li>Proper ARIA attributes including aria-checked and role</li>
        <li>Fieldset and legend elements for grouped radios</li>
        <li>Support for aria-describedby for additional context</li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Mobile Optimization</h3>
      <p class="mb-2">
        Radio components are optimized for touch devices:
      </p>
      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>
          Minimum touch target size of 44x44px for better mobile usability
        </li>
        <li>
          Responsive sizing that adapts to screen size
        </li>
        <li>
          Touch-friendly spacing between options
        </li>
        <li>
          Clear visual feedback for selection states
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Theme Integration</h3>
      <p class="mb-2">
        The Radio component fully integrates with the application theme:
      </p>
      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>Uses theme colors for checked states (primary-600/500)</li>
        <li>Supports dark mode with appropriate color adjustments</li>
        <li>Respects system color preferences</li>
        <li>Maintains proper contrast ratios for accessibility</li>
      </ul>
    </APIReferenceTemplate>
  );
});