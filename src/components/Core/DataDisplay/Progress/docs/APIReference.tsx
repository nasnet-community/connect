import { component$ } from "@builder.io/qwik";
import { APIReferenceTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const progressBarProps = [
    {
      name: "value",
      type: "number",
      description:
        "Current value of the progress. Should be between min and max.",
    },
    {
      name: "min",
      type: "number",
      defaultValue: "0",
      description: "Minimum value for the progress bar.",
    },
    {
      name: "max",
      type: "number",
      defaultValue: "100",
      description: "Maximum value for the progress bar.",
    },
    {
      name: "buffer",
      type: "number",
      description:
        "Buffer value for operations with a preparatory phase (like video buffering).",
    },
    {
      name: "size",
      type: "'xs' | 'sm' | 'md' | 'lg'",
      defaultValue: "md",
      description: "Size of the progress bar, controlling its height.",
    },
    {
      name: "color",
      type: "'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'",
      defaultValue: "primary",
      description: "Color theme for the progress bar.",
    },
    {
      name: "variant",
      type: "'solid' | 'gradient'",
      defaultValue: "solid",
      description: "Visual style of the progress bar.",
    },
    {
      name: "shape",
      type: "'flat' | 'rounded' | 'pill'",
      defaultValue: "rounded",
      description: "Shape of the progress bar edges.",
    },
    {
      name: "animation",
      type: "'none' | 'pulse' | 'striped' | 'striped-animated'",
      defaultValue: "none",
      description:
        "Animation applied to the filled portion of the progress bar.",
    },
    {
      name: "showValue",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to show the progress value.",
    },
    {
      name: "valuePosition",
      type: "'right' | 'center' | 'inside'",
      defaultValue: "right",
      description: "Position of the value label relative to the progress bar.",
    },
    {
      name: "valueFormat",
      type: "QRL<(value: number) => string>",
      description: "Function to format the displayed value.",
    },
    {
      name: "indeterminate",
      type: "boolean",
      defaultValue: "false",
      description:
        "Whether the progress is indeterminate (animated without specific value).",
    },
    {
      name: "error",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the progress is in an error state.",
    },
    {
      name: "fullWidth",
      type: "boolean",
      defaultValue: "true",
      description:
        "Whether the progress bar should take up the full width of its container.",
    },
    {
      name: "ariaLabel",
      type: "string",
      description: "Accessible label for the progress bar.",
    },
    {
      name: "class",
      type: "string",
      description:
        "Additional CSS classes to apply to the progress bar container.",
    },
  ];

  const spinnerProps = [
    {
      name: "size",
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      defaultValue: "md",
      description: "Size of the spinner.",
    },
    {
      name: "color",
      type: "'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'white'",
      defaultValue: "primary",
      description: "Color theme for the spinner.",
    },
    {
      name: "variant",
      type: "'border' | 'grow' | 'dots' | 'bars' | 'circle'",
      defaultValue: "border",
      description: "Visual style of the spinner.",
    },
    {
      name: "speed",
      type: "number",
      defaultValue: "0.75",
      description:
        "Animation speed in seconds for one complete rotation or animation cycle.",
    },
    {
      name: "showLabel",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to show a label with the spinner.",
    },
    {
      name: "label",
      type: "string",
      defaultValue: "Loading...",
      description: "Text to display as the spinner label.",
    },
    {
      name: "labelPosition",
      type: "'top' | 'right' | 'bottom' | 'left'",
      defaultValue: "right",
      description: "Position of the label relative to the spinner.",
    },
    {
      name: "centered",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the spinner should be centered in its container.",
    },
    {
      name: "ariaLabel",
      type: "string",
      defaultValue: "Loading",
      description: "Accessible label for the spinner.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the spinner container.",
    },
    {
      name: "labelClass",
      type: "string",
      description: "Additional CSS classes to apply to the spinner label.",
    },
  ];

  return (
    <APIReferenceTemplate props={progressBarProps}>
      <h2 class="mb-4 text-xl font-semibold">Progress Components API</h2>
      <p class="mb-6">
        The Progress module exports two main components: ProgressBar and
        Spinner, each with their own set of props and customization options.
        Both components are designed to provide visual feedback for operations
        with different loading patterns.
      </p>

      <h3 class="mb-2 mt-6 text-lg font-semibold">ProgressBar Props</h3>
      <p class="mb-4">
        The ProgressBar component shows the completion progress of an operation,
        typically displayed as a horizontal bar that fills as the operation
        progresses.
      </p>

      <h3 class="mb-2 mt-8 text-lg font-semibold">Spinner Props</h3>
      <APIReferenceTemplate props={spinnerProps} />

      <h3 class="mb-2 mt-8 text-lg font-semibold">Component Exports</h3>
      <p class="mb-2">The Progress module exports the following:</p>
      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>
          <code>ProgressBar</code> - Main progress bar component
        </li>
        <li>
          <code>Spinner</code> - Loading spinner component
        </li>
        <li>
          <code>useProgressBar</code> - Hook for custom progress bar
          implementations
        </li>
        <li>
          <code>useSpinner</code> - Hook for custom spinner implementations
        </li>
        <li>Type definitions for both components</li>
      </ul>
    </APIReferenceTemplate>
  );
});
