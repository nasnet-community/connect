import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="space-y-6">
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Props</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-800">
                <th
                  scope="col"
                  class="px-4 py-3 text-left text-sm font-semibold"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left text-sm font-semibold"
                >
                  Type
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left text-sm font-semibold"
                >
                  Default
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left text-sm font-semibold"
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">checked</td>
                <td class="px-4 py-2 text-sm">
                  <code>boolean</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>required</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  The controlled checked state of the switch
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">onChange$</td>
                <td class="px-4 py-2 text-sm">
                  <code>QRL&lt;(checked: boolean) =&gt; void&gt;</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>required</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Callback fired when the state changes
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">label</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">
                  Label text to display next to the switch
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">labelPosition</td>
                <td class="px-4 py-2 text-sm">
                  <code>'left' | 'right'</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>'right'</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Position of the label relative to the switch
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">size</td>
                <td class="px-4 py-2 text-sm">
                  <code>'sm' | 'md' | 'lg'</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>'md'</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  The size of the switch. Mobile-responsive with touch-friendly sizes
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">variant</td>
                <td class="px-4 py-2 text-sm">
                  <code>'default' | 'success' | 'warning' | 'error'</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>'default'</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Semantic color variant to convey meaning and context
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">disabled</td>
                <td class="px-4 py-2 text-sm">
                  <code>boolean</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>false</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  If true, the switch will be disabled
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">required</td>
                <td class="px-4 py-2 text-sm">
                  <code>boolean</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>false</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  If true, the switch is marked as required with an asterisk
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">id</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">auto-generated</td>
                <td class="px-4 py-2 text-sm">
                  The ID attribute of the switch input
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">name</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">
                  The name attribute for form submission
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">value</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">
                  The value attribute for form submission
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">class</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">
                  Additional CSS class for the switch container
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">trackClass</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">
                  Additional CSS class for the switch track (background)
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">thumbClass</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">
                  Additional CSS class for the switch thumb (moving circle)
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">aria-label</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">
                  ARIA label for the switch (defaults to label prop if not provided)
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">aria-labelledby</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">
                  ID of the element that labels the switch
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">aria-describedby</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">
                  ID of the element that describes the switch
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Theme Colors Used</h2>
        <p>
          The Switch component uses the following colors from your Tailwind configuration:
        </p>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-800">
                <th
                  scope="col"
                  class="px-4 py-3 text-left text-sm font-semibold"
                >
                  Element
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left text-sm font-semibold"
                >
                  Light Mode
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left text-sm font-semibold"
                >
                  Dark Mode
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left text-sm font-semibold"
                >
                  Tailwind Classes
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">
                  Track (checked)
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>primary-500</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>primary-600</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>bg-primary-500 dark:bg-primary-600</code>
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">
                  Track (unchecked)
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>surface-quaternary</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>surface-dark-tertiary</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>bg-surface-quaternary dark:bg-surface-dark-tertiary</code>
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">
                  Thumb
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>surface-elevated</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>surface-dark-elevated</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>bg-surface-elevated dark:bg-surface-dark-elevated</code>
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">
                  Focus Ring
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>primary-400</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>primary-500</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>ring-primary-400 dark:ring-primary-500</code>
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">
                  Label Text
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>text-text-primary</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>text-text-dark-primary</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>text-text-primary dark:text-text-dark-primary</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Semantic Variant Colors</h2>
        <p>
          The Switch component supports semantic color variants that use the comprehensive color 
          system from your Tailwind configuration:
        </p>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-800">
                <th
                  scope="col"
                  class="px-4 py-3 text-left text-sm font-semibold"
                >
                  Variant
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left text-sm font-semibold"
                >
                  Use Case
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left text-sm font-semibold"
                >
                  Track Color (Checked)
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left text-sm font-semibold"
                >
                  Focus Ring
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">
                  <code>default</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  General settings, preferences
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>primary-500 dark:primary-600</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>ring-primary-400 dark:ring-primary-500</code>
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">
                  <code>success</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Positive actions, confirmations
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>success-500 dark:success-600</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>ring-success-400 dark:ring-success-500</code>
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">
                  <code>warning</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Caution, maintenance modes
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>warning-500 dark:warning-600</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>ring-warning-400 dark:ring-warning-500</code>
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">
                  <code>error</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Destructive actions, deletions
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>error-500 dark:error-600</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>ring-error-400 dark:ring-error-500</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Responsive Behavior</h2>
        <p>
          The Switch component is optimized for different screen sizes:
        </p>
        <ul class="list-disc space-y-2 pl-6">
          <li>
            <strong>Mobile (default):</strong> Touch-friendly sizes with minimum 44px touch targets
          </li>
          <li>
            <strong>Tablet and Desktop (sm: and up):</strong> Compact sizes for dense interfaces
          </li>
          <li>
            Size adjustments are automatic based on screen size for optimal usability
          </li>
          <li>
            Focus indicators and hover states adapt to input method (touch vs pointer)
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Accessibility</h2>
        <p>
          The Switch component follows the WAI-ARIA Switch pattern and includes
          the following accessibility features:
        </p>
        <ul class="list-disc space-y-2 pl-6">
          <li>
            Uses <code>role="switch"</code> to explicitly identify as a switch
            control
          </li>
          <li>
            Sets <code>aria-checked</code> based on the current state
          </li>
          <li>
            Can be labeled with <code>aria-label</code> or{" "}
            <code>aria-labelledby</code>
          </li>
          <li>Supports keyboard navigation (Space/Enter to toggle)</li>
          <li>Shows focus indicators when navigated with keyboard</li>
          <li>
            When disabled, adds <code>aria-disabled="true"</code>
          </li>
        </ul>
      </section>
    </div>
  );
});
