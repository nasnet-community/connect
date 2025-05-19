import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class="space-y-6">
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Popover Props</h2>
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
                <td class="py-2 px-4 text-sm font-medium">trigger</td>
                <td class="py-2 px-4 text-sm"><code>'click' | 'hover' | 'focus' | 'manual'</code></td>
                <td class="py-2 px-4 text-sm"><code>'click'</code></td>
                <td class="py-2 px-4 text-sm">The event that triggers the popover</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">placement</td>
                <td class="py-2 px-4 text-sm"><code>PopoverPlacement</code></td>
                <td class="py-2 px-4 text-sm"><code>'bottom'</code></td>
                <td class="py-2 px-4 text-sm">The placement of the popover relative to the trigger</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">size</td>
                <td class="py-2 px-4 text-sm"><code>'sm' | 'md' | 'lg'</code></td>
                <td class="py-2 px-4 text-sm"><code>'md'</code></td>
                <td class="py-2 px-4 text-sm">The size of the popover</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">hasArrow</td>
                <td class="py-2 px-4 text-sm"><code>boolean</code></td>
                <td class="py-2 px-4 text-sm"><code>true</code></td>
                <td class="py-2 px-4 text-sm">Whether to show an arrow pointing to the trigger</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">isOpen</td>
                <td class="py-2 px-4 text-sm"><code>boolean</code></td>
                <td class="py-2 px-4 text-sm"><code>undefined</code></td>
                <td class="py-2 px-4 text-sm">Controls the open state when using manual trigger mode</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">onOpen$</td>
                <td class="py-2 px-4 text-sm"><code>QRL</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">Callback called when the popover opens</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">onClose$</td>
                <td class="py-2 px-4 text-sm"><code>QRL</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">Callback called when the popover closes</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">onOpenChange$</td>
                <td class="py-2 px-4 text-sm"><code>QRL</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">Callback called when the open state changes, with the new state as parameter</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">offset</td>
                <td class="py-2 px-4 text-sm"><code>number</code></td>
                <td class="py-2 px-4 text-sm"><code>8</code></td>
                <td class="py-2 px-4 text-sm">Offset distance between the popover and the trigger in pixels</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">closeOnBlur</td>
                <td class="py-2 px-4 text-sm"><code>boolean</code></td>
                <td class="py-2 px-4 text-sm"><code>true</code></td>
                <td class="py-2 px-4 text-sm">Whether to close the popover when clicking outside</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">closeOnEsc</td>
                <td class="py-2 px-4 text-sm"><code>boolean</code></td>
                <td class="py-2 px-4 text-sm"><code>true</code></td>
                <td class="py-2 px-4 text-sm">Whether to close the popover when the Escape key is pressed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">PopoverTrigger Props</h2>
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
                <td class="py-2 px-4 text-sm font-medium">as</td>
                <td class="py-2 px-4 text-sm"><code>string</code></td>
                <td class="py-2 px-4 text-sm"><code>'div'</code></td>
                <td class="py-2 px-4 text-sm">The HTML element to render the trigger as</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">children</td>
                <td class="py-2 px-4 text-sm"><code>JSXNode</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">The content of the trigger element</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">PopoverContent Props</h2>
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
                <td class="py-2 px-4 text-sm font-medium">as</td>
                <td class="py-2 px-4 text-sm"><code>string</code></td>
                <td class="py-2 px-4 text-sm"><code>'div'</code></td>
                <td class="py-2 px-4 text-sm">The HTML element to render the content as</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">children</td>
                <td class="py-2 px-4 text-sm"><code>JSXNode</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">The content to display inside the popover</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">class</td>
                <td class="py-2 px-4 text-sm"><code>string</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">Additional CSS classes to apply to the content container</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Type Definitions</h2>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <pre class="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`type PopoverPlacement = 
  | 'top' 
  | 'top-start' 
  | 'top-end' 
  | 'right' 
  | 'right-start' 
  | 'right-end' 
  | 'bottom' 
  | 'bottom-start' 
  | 'bottom-end' 
  | 'left' 
  | 'left-start' 
  | 'left-end';

type PopoverSize = 'sm' | 'md' | 'lg';

type PopoverTrigger = 'click' | 'hover' | 'focus' | 'manual';`}
          </pre>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Accessibility</h2>
        <p>
          The Popover component implements the following accessibility features:
        </p>
        <ul class="list-disc pl-6 space-y-2">
          <li>
            <strong>ARIA Attributes:</strong> The trigger element has <code>aria-expanded</code> and <code>aria-controls</code> attributes to associate it with the popover content.
          </li>
          <li>
            <strong>Focus Management:</strong> Focus is trapped inside the popover when it's open, and returned to the trigger when closed.
          </li>
          <li>
            <strong>Keyboard Navigation:</strong> The popover can be closed by pressing the Escape key.
          </li>
          <li>
            <strong>Screen Reader Announcements:</strong> The popover content uses <code>role="dialog"</code> to ensure proper screen reader announcements.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">CSS Variables</h2>
        <p>
          The Popover component uses the following CSS variables for customization:
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
                <td class="py-2 px-4 text-sm font-medium"><code>--popover-bg</code></td>
                <td class="py-2 px-4 text-sm"><code>white</code> (light) / <code>#1f2937</code> (dark)</td>
                <td class="py-2 px-4 text-sm">Background color of the popover</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium"><code>--popover-border-color</code></td>
                <td class="py-2 px-4 text-sm"><code>#e5e7eb</code> (light) / <code>#374151</code> (dark)</td>
                <td class="py-2 px-4 text-sm">Border color of the popover</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium"><code>--popover-shadow</code></td>
                <td class="py-2 px-4 text-sm"><code>0 4px 6px -1px rgba(0, 0, 0, 0.1)</code></td>
                <td class="py-2 px-4 text-sm">Box shadow of the popover</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium"><code>--popover-radius</code></td>
                <td class="py-2 px-4 text-sm"><code>0.375rem</code></td>
                <td class="py-2 px-4 text-sm">Border radius of the popover</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}); 