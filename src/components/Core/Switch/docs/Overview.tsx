import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="space-y-4">
      <p>
        The <code>Switch</code> component provides a toggle control that allows users to switch between two states: on and off.
        It's commonly used for enabling or disabling a setting or feature.
      </p>

      <h2 class="text-xl font-semibold mt-4">Key Features</h2>
      <ul class="list-disc pl-6 space-y-2">
        <li>
          <strong>Simple Toggling:</strong> Intuitive control for boolean states (on/off, enabled/disabled)
        </li>
        <li>
          <strong>Visual Feedback:</strong> Clear visual indication of the current state
        </li>
        <li>
          <strong>Customizable Appearance:</strong> Support for different sizes, colors, and labels
        </li>
        <li>
          <strong>Keyboard Navigation:</strong> Fully accessible via keyboard with Space/Enter keys
        </li>
        <li>
          <strong>Form Integration:</strong> Works seamlessly within forms for data collection
        </li>
        <li>
          <strong>Accessibility:</strong> Built with ARIA attributes and keyboard navigation support
        </li>
      </ul>

      <h2 class="text-xl font-semibold mt-4">When to Use</h2>
      <ul class="list-disc pl-6 space-y-2">
        <li>
          For binary choices that take immediate effect (rather than requiring a submission)
        </li>
        <li>
          When users need to toggle a specific feature or setting on/off
        </li>
        <li>
          For preferences that can be changed with a single action
        </li>
        <li>
          When space is limited and a compact control is needed
        </li>
        <li>
          In settings panels, dashboards, and configuration interfaces
        </li>
      </ul>

      <h2 class="text-xl font-semibold mt-4">Accessibility</h2>
      <p>
        The Switch component follows accessibility best practices:
      </p>
      <ul class="list-disc pl-6 space-y-2">
        <li>Uses <code>role="switch"</code> with <code>aria-checked</code> to indicate state</li>
        <li>Supports labeling via <code>aria-label</code> and <code>aria-labelledby</code></li>
        <li>Provides keyboard navigation (Space/Enter to toggle)</li>
        <li>Has sufficient color contrast in both light and dark modes</li>
        <li>Includes focus indicators for keyboard navigation</li>
      </ul>
    </div>
  );
}); 