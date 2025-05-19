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
                <th scope="col" class="py-3 px-4 text-left text-sm font-semibold">Name</th>
                <th scope="col" class="py-3 px-4 text-left text-sm font-semibold">Type</th>
                <th scope="col" class="py-3 px-4 text-left text-sm font-semibold">Default</th>
                <th scope="col" class="py-3 px-4 text-left text-sm font-semibold">Description</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">checked</td>
                <td class="py-2 px-4 text-sm"><code>boolean</code></td>
                <td class="py-2 px-4 text-sm"><code>false</code></td>
                <td class="py-2 px-4 text-sm">If true, the switch is checked (on)</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">onChange$</td>
                <td class="py-2 px-4 text-sm"><code>QRL&lt;(checked: boolean) =&gt; void&gt;</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">Callback fired when the state changes</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">size</td>
                <td class="py-2 px-4 text-sm"><code>'sm' | 'md' | 'lg'</code></td>
                <td class="py-2 px-4 text-sm"><code>'md'</code></td>
                <td class="py-2 px-4 text-sm">The size of the switch</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">disabled</td>
                <td class="py-2 px-4 text-sm"><code>boolean</code></td>
                <td class="py-2 px-4 text-sm"><code>false</code></td>
                <td class="py-2 px-4 text-sm">If true, the switch will be disabled</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">id</td>
                <td class="py-2 px-4 text-sm"><code>string</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">The ID attribute of the switch</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">name</td>
                <td class="py-2 px-4 text-sm"><code>string</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">The name attribute of the switch</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">value</td>
                <td class="py-2 px-4 text-sm"><code>string</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">The value attribute of the switch</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">class</td>
                <td class="py-2 px-4 text-sm"><code>string</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">Additional CSS class for the switch container</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">trackClass</td>
                <td class="py-2 px-4 text-sm"><code>string</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">Additional CSS class for the switch track</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">thumbClass</td>
                <td class="py-2 px-4 text-sm"><code>string</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">Additional CSS class for the switch thumb</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">aria-label</td>
                <td class="py-2 px-4 text-sm"><code>string</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">ARIA label for the switch</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">aria-labelledby</td>
                <td class="py-2 px-4 text-sm"><code>string</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">ID of the element that labels the switch</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">aria-describedby</td>
                <td class="py-2 px-4 text-sm"><code>string</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">ID of the element that describes the switch</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">CSS Variables</h2>
        <p>
          The Switch component uses the following CSS variables that you can override:
        </p>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-800">
                <th scope="col" class="py-3 px-4 text-left text-sm font-semibold">Variable</th>
                <th scope="col" class="py-3 px-4 text-left text-sm font-semibold">Default</th>
                <th scope="col" class="py-3 px-4 text-left text-sm font-semibold">Description</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium"><code>--switch-track-bg</code></td>
                <td class="py-2 px-4 text-sm"><code>gray-200 / gray-700</code></td>
                <td class="py-2 px-4 text-sm">Background color of the track when unchecked</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium"><code>--switch-track-checked-bg</code></td>
                <td class="py-2 px-4 text-sm"><code>primary-600</code></td>
                <td class="py-2 px-4 text-sm">Background color of the track when checked</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium"><code>--switch-thumb-bg</code></td>
                <td class="py-2 px-4 text-sm"><code>white</code></td>
                <td class="py-2 px-4 text-sm">Background color of the thumb</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium"><code>--switch-focus-ring-color</code></td>
                <td class="py-2 px-4 text-sm"><code>primary-400</code></td>
                <td class="py-2 px-4 text-sm">Color of the focus ring</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Accessibility</h2>
        <p>
          The Switch component follows the WAI-ARIA Switch pattern and includes the following accessibility features:
        </p>
        <ul class="list-disc pl-6 space-y-2">
          <li>Uses <code>role="switch"</code> to explicitly identify as a switch control</li>
          <li>Sets <code>aria-checked</code> based on the current state</li>
          <li>Can be labeled with <code>aria-label</code> or <code>aria-labelledby</code></li>
          <li>Supports keyboard navigation (Space/Enter to toggle)</li>
          <li>Shows focus indicators when navigated with keyboard</li>
          <li>When disabled, adds <code>aria-disabled="true"</code></li>
        </ul>
      </section>
    </div>
  );
}); 