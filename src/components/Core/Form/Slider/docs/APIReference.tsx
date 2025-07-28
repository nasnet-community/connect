import { component$ } from "@builder.io/qwik";
import {
  APIReferenceTemplate,
  type PropDetail,
  type MethodDetail,
} from "~/components/Docs/templates";

/**
 * Slider component API reference documentation using the standard template
 */
export default component$(() => {
  const commonProps: PropDetail[] = [
    {
      name: "id",
      type: "string",
      description: "Unique identifier for the slider",
      defaultValue: "auto-generated",
    },
    {
      name: "name",
      type: "string",
      description: "Name attribute for the hidden input field",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      description: "Size variant of the slider",
      defaultValue: "'md'",
    },
    {
      name: "variant",
      type: "'default' | 'filled'",
      description: "Visual variant of the slider",
      defaultValue: "'default'",
    },
    {
      name: "orientation",
      type: "'horizontal' | 'vertical'",
      description: "Orientation of the slider",
      defaultValue: "'horizontal'",
    },
    {
      name: "label",
      type: "string",
      description: "Label text for the slider",
    },
    {
      name: "helperText",
      type: "string",
      description: "Helper text displayed below the slider",
    },
    {
      name: "errorMessage",
      type: "string",
      description: "Error message to display when validation fails",
    },
    {
      name: "successMessage",
      type: "string",
      description: "Success message to display",
    },
    {
      name: "warningMessage",
      type: "string",
      description: "Warning message to display",
    },
    {
      name: "formatLabel$",
      type: "QRL<(value: number) => string>",
      description: "Custom formatter for slider values",
    },
    {
      name: "min",
      type: "number",
      description: "Minimum value for the slider",
      defaultValue: "0",
    },
    {
      name: "max",
      type: "number",
      description: "Maximum value for the slider",
      defaultValue: "100",
    },
    {
      name: "step",
      type: "number",
      description: "Step increment value",
      defaultValue: "1",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the slider is disabled",
      defaultValue: "false",
    },
    {
      name: "readonly",
      type: "boolean",
      description: "Whether the slider is read-only",
      defaultValue: "false",
    },
    {
      name: "required",
      type: "boolean",
      description: "Whether the slider value is required",
      defaultValue: "false",
    },
    {
      name: "showValue",
      type: "boolean",
      description: "Whether to display the current value",
      defaultValue: "false",
    },
    {
      name: "showMarks",
      type: "boolean",
      description: "Whether to display marks on the track",
      defaultValue: "false",
    },
    {
      name: "marks",
      type: "SliderMark[]",
      description: "Custom marks to display on the track",
    },
    {
      name: "markCount",
      type: "number",
      description:
        "Number of marks to auto-generate when marks array is not provided",
      defaultValue: "0",
    },
    {
      name: "showTicks",
      type: "boolean",
      description: "Whether to display tick marks on the track",
      defaultValue: "false",
    },
    {
      name: "tickCount",
      type: "number",
      description: "Number of tick marks to display",
      defaultValue: "0",
    },
    {
      name: "containerClass",
      type: "string",
      description: "Additional CSS class for the container element",
    },
    {
      name: "trackClass",
      type: "string",
      description: "Additional CSS class for the track element",
    },
    {
      name: "thumbClass",
      type: "string",
      description: "Additional CSS class for the thumb element",
    },
    {
      name: "marksClass",
      type: "string",
      description: "Additional CSS class for the marks",
    },
    {
      name: "labelClass",
      type: "string",
      description: "Additional CSS class for the label",
    },
    {
      name: "valueClass",
      type: "string",
      description: "Additional CSS class for the value display",
    },
    {
      name: "messageClass",
      type: "string",
      description: "Additional CSS class for messages",
    },
  ];

  const singleSliderProps: PropDetail[] = [
    {
      name: "type",
      type: "'single'",
      description: "Type of slider for single value selection",
      defaultValue: "'single'",
    },
    {
      name: "value",
      type: "number",
      description: "Current value of the slider (controlled)",
    },
    {
      name: "defaultValue",
      type: "number",
      description: "Default value of the slider (uncontrolled)",
    },
    {
      name: "onChange$",
      type: "QRL<(value: number) => void>",
      description: "Callback when the slider value changes during interaction",
    },
    {
      name: "onChangeEnd$",
      type: "QRL<(value: number) => void>",
      description: "Callback when the slider interaction ends",
    },
  ];

  const rangeSliderProps: PropDetail[] = [
    {
      name: "type",
      type: "'range'",
      description: "Type of slider for range selection",
      required: true,
    },
    {
      name: "value",
      type: "[number, number]",
      description: "Current range values [start, end] (controlled)",
    },
    {
      name: "defaultValue",
      type: "[number, number]",
      description: "Default range values [start, end] (uncontrolled)",
    },
    {
      name: "minRange",
      type: "number",
      description: "Minimum allowed range between start and end values",
    },
    {
      name: "maxRange",
      type: "number",
      description: "Maximum allowed range between start and end values",
    },
    {
      name: "onChange$",
      type: "QRL<(values: [number, number]) => void>",
      description: "Callback when the range values change during interaction",
    },
    {
      name: "onChangeEnd$",
      type: "QRL<(values: [number, number]) => void>",
      description: "Callback when the range slider interaction ends",
    },
  ];

  const methods: MethodDetail[] = [];

  return (
    <APIReferenceTemplate props={commonProps} methods={methods}>
      <p>
        The Slider component provides a way to select numeric values through an
        interactive track and thumb interface. It supports both single value
        selection and range selection with numerous customization options.
      </p>

      <h3 class="mb-4 mt-8 text-lg font-medium">Single Slider Props</h3>
      <p class="mb-4">
        These props are specific to single value sliders (when type is 'single'
        or not specified).
      </p>
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-border dark:border-border-dark">
            <th class="px-4 py-2 text-left">Name</th>
            <th class="px-4 py-2 text-left">Type</th>
            <th class="px-4 py-2 text-left">Default</th>
            <th class="px-4 py-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {singleSliderProps.map((prop) => (
            <tr
              key={prop.name}
              class="border-b border-border dark:border-border-dark"
            >
              <td class="px-4 py-2 font-mono text-sm">
                {prop.name}
                {prop.required && <span class="ml-1 text-error">*</span>}
              </td>
              <td class="px-4 py-2 font-mono text-sm">{prop.type}</td>
              <td class="px-4 py-2 font-mono text-sm">
                {prop.defaultValue || "-"}
              </td>
              <td class="px-4 py-2">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 class="mb-4 mt-8 text-lg font-medium">Range Slider Props</h3>
      <p class="mb-4">
        These props are specific to range sliders (when type is 'range').
      </p>
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-border dark:border-border-dark">
            <th class="px-4 py-2 text-left">Name</th>
            <th class="px-4 py-2 text-left">Type</th>
            <th class="px-4 py-2 text-left">Default</th>
            <th class="px-4 py-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {rangeSliderProps.map((prop) => (
            <tr
              key={prop.name}
              class="border-b border-border dark:border-border-dark"
            >
              <td class="px-4 py-2 font-mono text-sm">
                {prop.name}
                {prop.required && <span class="ml-1 text-error">*</span>}
              </td>
              <td class="px-4 py-2 font-mono text-sm">{prop.type}</td>
              <td class="px-4 py-2 font-mono text-sm">
                {prop.defaultValue || "-"}
              </td>
              <td class="px-4 py-2">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 class="mb-4 mt-8 text-lg font-medium">Types</h3>
      <div class="bg-surface-secondary dark:bg-surface-dark-secondary mb-4 rounded p-4 font-mono text-sm">
        <pre>{`
interface SliderMark {
  value: number;
  label?: string;
}
        `}</pre>
      </div>
    </APIReferenceTemplate>
  );
});
