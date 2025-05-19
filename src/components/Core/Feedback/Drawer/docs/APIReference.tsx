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
                <td class="py-2 px-4 text-sm font-medium">isOpen</td>
                <td class="py-2 px-4 text-sm"><code>boolean</code></td>
                <td class="py-2 px-4 text-sm"><code>false</code></td>
                <td class="py-2 px-4 text-sm">If true, the drawer is shown</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">onClose$</td>
                <td class="py-2 px-4 text-sm"><code>QRL&lt;() =&gt; void&gt;</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">Callback fired when the drawer is requested to be closed</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">placement</td>
                <td class="py-2 px-4 text-sm"><code>'left' | 'right' | 'top' | 'bottom'</code></td>
                <td class="py-2 px-4 text-sm"><code>'right'</code></td>
                <td class="py-2 px-4 text-sm">The placement of the drawer</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">size</td>
                <td class="py-2 px-4 text-sm"><code>'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'</code></td>
                <td class="py-2 px-4 text-sm"><code>'md'</code></td>
                <td class="py-2 px-4 text-sm">The size of the drawer</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">customSize</td>
                <td class="py-2 px-4 text-sm"><code>string</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">Custom size (width or height) of the drawer (e.g., '300px' or '50%')</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">hasOverlay</td>
                <td class="py-2 px-4 text-sm"><code>boolean</code></td>
                <td class="py-2 px-4 text-sm"><code>true</code></td>
                <td class="py-2 px-4 text-sm">If true, displays a backdrop over the page when drawer is open</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">closeOnOverlayClick</td>
                <td class="py-2 px-4 text-sm"><code>boolean</code></td>
                <td class="py-2 px-4 text-sm"><code>true</code></td>
                <td class="py-2 px-4 text-sm">If true, closes the drawer when clicking the overlay</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">closeOnEsc</td>
                <td class="py-2 px-4 text-sm"><code>boolean</code></td>
                <td class="py-2 px-4 text-sm"><code>true</code></td>
                <td class="py-2 px-4 text-sm">If true, closes the drawer when pressing the ESC key</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">trapFocus</td>
                <td class="py-2 px-4 text-sm"><code>boolean</code></td>
                <td class="py-2 px-4 text-sm"><code>true</code></td>
                <td class="py-2 px-4 text-sm">If true, traps focus within the drawer</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">restoreFocus</td>
                <td class="py-2 px-4 text-sm"><code>boolean</code></td>
                <td class="py-2 px-4 text-sm"><code>true</code></td>
                <td class="py-2 px-4 text-sm">If true, restores focus to the element that had focus before the drawer was opened</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">blockScroll</td>
                <td class="py-2 px-4 text-sm"><code>boolean</code></td>
                <td class="py-2 px-4 text-sm"><code>true</code></td>
                <td class="py-2 px-4 text-sm">If true, prevents scrolling of the body while drawer is open</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">zIndex</td>
                <td class="py-2 px-4 text-sm"><code>number</code></td>
                <td class="py-2 px-4 text-sm"><code>1000</code></td>
                <td class="py-2 px-4 text-sm">The z-index of the drawer</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">ariaLabel</td>
                <td class="py-2 px-4 text-sm"><code>string</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">Aria label for the drawer</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">ariaLabelledby</td>
                <td class="py-2 px-4 text-sm"><code>string</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">ID of the element that labels the drawer</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">ariaDescribedby</td>
                <td class="py-2 px-4 text-sm"><code>string</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">ID of the element that describes the drawer</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">drawerClass</td>
                <td class="py-2 px-4 text-sm"><code>string</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">Additional CSS class for the drawer element</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">overlayClass</td>
                <td class="py-2 px-4 text-sm"><code>string</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">Additional CSS class for the overlay element</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">id</td>
                <td class="py-2 px-4 text-sm"><code>string</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">ID attribute for the drawer element</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">hasCloseButton</td>
                <td class="py-2 px-4 text-sm"><code>boolean</code></td>
                <td class="py-2 px-4 text-sm"><code>true</code></td>
                <td class="py-2 px-4 text-sm">If true, shows a close button in the drawer header</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">header</td>
                <td class="py-2 px-4 text-sm"><code>JSXNode</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">JSX content for the drawer header (alternative to using q:slot="header")</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">footer</td>
                <td class="py-2 px-4 text-sm"><code>JSXNode</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">JSX content for the drawer footer (alternative to using q:slot="footer")</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">disableAnimation</td>
                <td class="py-2 px-4 text-sm"><code>boolean</code></td>
                <td class="py-2 px-4 text-sm"><code>false</code></td>
                <td class="py-2 px-4 text-sm">If true, disables the open/close animations</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">class</td>
                <td class="py-2 px-4 text-sm"><code>string</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">Additional CSS class for the drawer</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">children</td>
                <td class="py-2 px-4 text-sm"><code>JSXNode</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">Primary content of the drawer</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">DrawerHeader Props</h2>
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
                <td class="py-2 px-4 text-sm font-medium">hasCloseButton</td>
                <td class="py-2 px-4 text-sm"><code>boolean</code></td>
                <td class="py-2 px-4 text-sm"><code>true</code></td>
                <td class="py-2 px-4 text-sm">If true, shows a close button in the header</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">closeButtonAriaLabel</td>
                <td class="py-2 px-4 text-sm"><code>string</code></td>
                <td class="py-2 px-4 text-sm"><code>'Close drawer'</code></td>
                <td class="py-2 px-4 text-sm">Aria label for the close button</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">onClose$</td>
                <td class="py-2 px-4 text-sm"><code>QRL&lt;() =&gt; void&gt;</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">Callback fired when the close button is clicked</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">class</td>
                <td class="py-2 px-4 text-sm"><code>string</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">Additional CSS class for the header</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">DrawerContent Props</h2>
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
                <td class="py-2 px-4 text-sm font-medium">class</td>
                <td class="py-2 px-4 text-sm"><code>string</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">Additional CSS class for the content area</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">DrawerFooter Props</h2>
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
                <td class="py-2 px-4 text-sm font-medium">class</td>
                <td class="py-2 px-4 text-sm"><code>string</code></td>
                <td class="py-2 px-4 text-sm">-</td>
                <td class="py-2 px-4 text-sm">Additional CSS class for the footer</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Slots</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-800">
                <th scope="col" class="py-3 px-4 text-left text-sm font-semibold">Name</th>
                <th scope="col" class="py-3 px-4 text-left text-sm font-semibold">Description</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">header</td>
                <td class="py-2 px-4 text-sm">Content to be rendered in the drawer header</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="py-2 px-4 text-sm font-medium">(default)</td>
                <td class="py-2 px-4 text-sm">Primary content of the drawer</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="py-2 px-4 text-sm font-medium">footer</td>
                <td class="py-2 px-4 text-sm">Content to be rendered in the drawer footer</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Accessibility</h2>
        <p>
          The Drawer component follows the WAI-ARIA Dialog Pattern and implements the following ARIA attributes:
        </p>
        <ul class="list-disc pl-6 space-y-2">
          <li><code>role="dialog"</code>: Identifies the element as a dialog</li>
          <li><code>aria-modal="true"</code>: Indicates that the dialog is modal</li>
          <li><code>aria-label</code>: Provides an accessible name for the dialog (if provided)</li>
          <li><code>aria-labelledby</code>: References an element that provides the accessible name (if provided)</li>
          <li><code>aria-describedby</code>: References an element that provides a description (if provided)</li>
          <li><code>aria-hidden="true"</code>: Applied to the overlay to hide it from screen readers</li>
        </ul>
        <p>
          Additionally, the component provides these accessibility features:
        </p>
        <ul class="list-disc pl-6 space-y-2">
          <li>Focus is trapped within the drawer when open</li>
          <li>Focus is restored to the triggering element when closed</li>
          <li>The drawer can be closed with the Escape key</li>
          <li>The close button has an appropriate aria-label</li>
        </ul>
      </section>
    </div>
  );
}); 