import { component$ } from "@builder.io/qwik";
import { APIReferenceTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const timePickerProps = [
    {
      name: "time",
      type: "TimeValue",
      required: true,
      description: "The current time value object containing hour, minute, and optionally second and period (AM/PM).",
    },
    {
      name: "onChange$",
      type: "QRL<(type: keyof TimeValue, value: string) => void>",
      required: true,
      description: "Callback function that is called when any time value changes.",
    },
    {
      name: "format",
      type: "'12' | '24'",
      defaultValue: "24",
      description: "Time format - 12-hour (with AM/PM) or 24-hour format.",
    },
    {
      name: "showSeconds",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to show seconds selector.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables all time inputs when true.",
    },
    {
      name: "disabledTimes",
      type: "{ hours?: number[], minutes?: number[], seconds?: number[] }",
      description: "Object containing arrays of disabled values for each time unit.",
    },
    {
      name: "minuteStep",
      type: "1 | 5 | 10 | 15 | 30",
      defaultValue: "5",
      description: "Step interval for minute values.",
    },
    {
      name: "secondStep",
      type: "1 | 5 | 10 | 15 | 30",
      defaultValue: "5",
      description: "Step interval for second values.",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "md",
      description: "Controls the size of the time picker inputs.",
    },
    {
      name: "variant",
      type: "'default' | 'outline' | 'filled'",
      defaultValue: "default",
      description: "Visual style variant of the time picker.",
    },
    {
      name: "showClearButton",
      type: "boolean",
      defaultValue: "false",
      description: "Shows a clear button to reset the time value.",
    },
    {
      name: "onClear$",
      type: "QRL<() => void>",
      description: "Callback function called when the clear button is clicked. Required when showClearButton is true.",
    },
    {
      name: "placeholder",
      type: "{ hour?: string, minute?: string, second?: string }",
      description: "Placeholder text for each time input.",
    },
    {
      name: "error",
      type: "boolean",
      defaultValue: "false",
      description: "Shows error state styling when true.",
    },
    {
      name: "errorMessage",
      type: "string",
      description: "Error message text displayed below the time picker when error is true.",
    },
    {
      name: "label",
      type: "string",
      description: "Label text displayed above the time picker.",
    },
    {
      name: "id",
      type: "string",
      description: "HTML id attribute for the time picker container.",
    },
    {
      name: "name",
      type: "string",
      description: "HTML name attribute base for form inputs. Individual inputs will have -hour, -minute, -second suffixes.",
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Marks the field as required and adds an asterisk to the label.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the container element.",
    },
    {
      name: "inline",
      type: "boolean",
      defaultValue: "false",
      description: "Makes the time picker display inline instead of block.",
    },
    {
      name: "readOnly",
      type: "boolean",
      defaultValue: "false",
      description: "Makes all inputs read-only when true.",
    },
    {
      name: "loading",
      type: "boolean",
      defaultValue: "false",
      description: "Shows loading state with spinner overlay and disables inputs.",
    },
    {
      name: "autoFocus",
      type: "boolean",
      defaultValue: "false",
      description: "Automatically focuses the first time input when the component mounts.",
    },
    {
      name: "tabIndex",
      type: "number",
      description: "Sets the tab index for the time inputs.",
    },
    {
      name: "dir",
      type: "'ltr' | 'rtl' | 'auto'",
      defaultValue: "auto",
      description: "Sets the text direction for the component. Auto detects from document.",
    },
    {
      name: "touchOptimized",
      type: "boolean",
      description: "Enables touch-optimized interactions and larger touch targets. Auto-detects on mobile by default.",
    },
  ];

  const timeValueInterface = [
    {
      name: "hour",
      type: "string",
      required: true,
      description: "Hour value as a two-digit string (00-23 for 24-hour format, 01-12 for 12-hour format).",
    },
    {
      name: "minute",
      type: "string",
      required: true,
      description: "Minute value as a two-digit string (00-59).",
    },
    {
      name: "second",
      type: "string",
      description: "Second value as a two-digit string (00-59). Optional, only used when showSeconds is true.",
    },
    {
      name: "period",
      type: "'AM' | 'PM'",
      description: "Time period for 12-hour format. Only used when format is '12'.",
    },
  ];

  return (
    <APIReferenceTemplate props={timePickerProps}>
      <p>
        The TimePicker component provides a flexible time selection interface with support for 12/24 hour formats,
        seconds, custom steps, and various visual styles. It's fully accessible and works great on all devices.
      </p>

      <h3 class="mb-2 mt-6 text-lg font-semibold">TimeValue Interface</h3>
      <p class="mb-4">
        The TimeValue interface defines the structure of the time object used by the TimePicker:
      </p>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border-DEFAULT dark:border-border-dark">
              <th class="px-4 py-2 text-left">Property</th>
              <th class="px-4 py-2 text-left">Type</th>
              <th class="px-4 py-2 text-left">Required</th>
              <th class="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {timeValueInterface.map((prop) => (
              <tr key={prop.name} class="border-b border-border-DEFAULT dark:border-border-dark">
                <td class="px-4 py-2 font-mono text-primary-600 dark:text-primary-400">{prop.name}</td>
                <td class="px-4 py-2 font-mono text-xs">{prop.type}</td>
                <td class="px-4 py-2">{prop.required ? "Yes" : "No"}</td>
                <td class="px-4 py-2">{prop.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Features</h3>
      <ul class="mb-4 ml-4 list-inside list-disc space-y-1">
        <li>12-hour and 24-hour time formats</li>
        <li>Optional seconds display</li>
        <li>Customizable minute and second steps (1, 5, 10, 15, 30)</li>
        <li>Disabled time ranges support</li>
        <li>Three size variants (sm, md, lg) with responsive sizing</li>
        <li>Three visual variants (default, outline, filled)</li>
        <li>Enhanced keyboard navigation with arrow keys and Home/End shortcuts</li>
        <li>Full RTL support with logical properties</li>
        <li>Dark mode support with semantic color tokens</li>
        <li>Loading and error states with enhanced animations</li>
        <li>Fully accessible with ARIA attributes and screen reader support</li>
        <li>Mobile-optimized with touch-friendly targets and haptic feedback</li>
        <li>Advanced animations (ripple effects, press feedback, hover states)</li>
        <li>Touch gesture support for mobile interactions</li>
        <li>Auto-detection of touch devices with optimized experience</li>
        <li>Performance optimized with memoized computations</li>
        <li>Focus management and auto-focus support</li>
        <li>Enhanced visual polish with shadows and transitions</li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Keyboard Navigation</h3>
      <p class="mb-2">
        The TimePicker supports keyboard navigation for improved accessibility:
      </p>
      <ul class="mb-4 ml-4 list-inside list-disc space-y-1">
        <li><kbd>Tab</kbd> - Navigate between time fields</li>
        <li><kbd>Arrow Up</kbd> - Increment the selected time value</li>
        <li><kbd>Arrow Down</kbd> - Decrement the selected time value</li>
        <li><kbd>Enter</kbd> - Confirm selection in dropdown</li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Accessibility</h3>
      <p class="mb-2">
        The TimePicker component follows accessibility best practices:
      </p>
      <ul class="mb-4 ml-4 list-inside list-disc space-y-1">
        <li>Proper ARIA labels for all interactive elements</li>
        <li>ARIA invalid and describedby attributes for error states</li>
        <li>Keyboard navigation support</li>
        <li>High contrast mode compatible</li>
        <li>Screen reader friendly with proper announcements</li>
        <li>Required field indication with visual and semantic markers</li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Form Integration</h3>
      <p class="mb-2">
        The TimePicker integrates seamlessly with HTML forms:
      </p>
      <ul class="mb-4 ml-4 list-inside list-disc space-y-1">
        <li>Each time field has its own name attribute with appropriate suffix</li>
        <li>Supports form validation with error states</li>
        <li>Works with native form submission</li>
        <li>Respects disabled and readonly states</li>
      </ul>
    </APIReferenceTemplate>
  );
});