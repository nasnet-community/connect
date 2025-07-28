import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="space-y-6">
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Toast Component Props</h2>
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
                <td class="px-4 py-2 text-sm font-medium">id</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">Required</td>
                <td class="px-4 py-2 text-sm">
                  Unique identifier for the toast
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">status</td>
                <td class="px-4 py-2 text-sm">
                  <code>'info' | 'success' | 'warning' | 'error'</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>'info'</code>
                </td>
                <td class="px-4 py-2 text-sm">Visual status of the toast</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">title</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">Title text for the toast</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">message</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">Message content of the toast</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">dismissible</td>
                <td class="px-4 py-2 text-sm">
                  <code>boolean</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>true</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Whether the toast can be manually dismissed
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">onDismiss$</td>
                <td class="px-4 py-2 text-sm">
                  <code>QRL{`<(id: string) => void>`}</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">
                  Callback when toast is dismissed
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">icon</td>
                <td class="px-4 py-2 text-sm">
                  <code>boolean | JSXNode</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>true</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Icon to display (true uses default, can be custom JSX)
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">size</td>
                <td class="px-4 py-2 text-sm">
                  <code>'sm' | 'md' | 'lg'</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>'md'</code>
                </td>
                <td class="px-4 py-2 text-sm">Size of the toast component</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">duration</td>
                <td class="px-4 py-2 text-sm">
                  <code>number</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>5000</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Duration in milliseconds before auto-dismiss
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">loading</td>
                <td class="px-4 py-2 text-sm">
                  <code>boolean</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>false</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Whether to show loading spinner
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">persistent</td>
                <td class="px-4 py-2 text-sm">
                  <code>boolean</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>false</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  If true, prevents auto-dismissal
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">actionLabel</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">Text for action button</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">onAction$</td>
                <td class="px-4 py-2 text-sm">
                  <code>QRL{`<(id: string) => void>`}</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">
                  Callback when action button is clicked
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">ariaLive</td>
                <td class="px-4 py-2 text-sm">
                  <code>'assertive' | 'polite' | 'off'</code>
                </td>
                <td class="px-4 py-2 text-sm">Depends on status</td>
                <td class="px-4 py-2 text-sm">
                  ARIA live region setting for screen readers
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">ariaLabel</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">
                  Accessible label for the toast
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">class</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">Additional CSS classes</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">children</td>
                <td class="px-4 py-2 text-sm">
                  <code>JSXNode</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">
                  Additional content to render inside the toast
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">ToastContainer Props</h2>
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
                <td class="px-4 py-2 text-sm font-medium">position</td>
                <td class="px-4 py-2 text-sm">
                  <code>ToastPosition</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>'bottom-right'</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Position of the toast container
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">limit</td>
                <td class="px-4 py-2 text-sm">
                  <code>number</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>3</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Maximum number of toasts to display
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">gap</td>
                <td class="px-4 py-2 text-sm">
                  <code>'sm' | 'md' | 'lg'</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>'md'</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Spacing between toast messages
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">gutter</td>
                <td class="px-4 py-2 text-sm">
                  <code>'sm' | 'md' | 'lg'</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>'md'</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Spacing between container edge and screen
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">defaultDuration</td>
                <td class="px-4 py-2 text-sm">
                  <code>number</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>5000</code>
                </td>
                <td class="px-4 py-2 text-sm">Default duration for toasts</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">zIndex</td>
                <td class="px-4 py-2 text-sm">
                  <code>number</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>9999</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  z-index for the toast container
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">class</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Toast Service Methods</h2>
        <p>
          The <code>useToast()</code> hook provides the following methods for
          managing toasts:
        </p>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-800">
                <th
                  scope="col"
                  class="px-4 py-3 text-left text-sm font-semibold"
                >
                  Method
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left text-sm font-semibold"
                >
                  Parameters
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left text-sm font-semibold"
                >
                  Return Type
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
                <td class="px-4 py-2 text-sm font-medium">show</td>
                <td class="px-4 py-2 text-sm">
                  <code>options: ToastOptions</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>Promise{`<string>`}</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Shows a toast with custom options, returns toast ID
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">info</td>
                <td class="px-4 py-2 text-sm">
                  <code>
                    message: string, options?: Partial{`<ToastOptions>`}
                  </code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>Promise{`<string>`}</code>
                </td>
                <td class="px-4 py-2 text-sm">Shows an info toast</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">success</td>
                <td class="px-4 py-2 text-sm">
                  <code>
                    message: string, options?: Partial{`<ToastOptions>`}
                  </code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>Promise{`<string>`}</code>
                </td>
                <td class="px-4 py-2 text-sm">Shows a success toast</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">warning</td>
                <td class="px-4 py-2 text-sm">
                  <code>
                    message: string, options?: Partial{`<ToastOptions>`}
                  </code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>Promise{`<string>`}</code>
                </td>
                <td class="px-4 py-2 text-sm">Shows a warning toast</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">error</td>
                <td class="px-4 py-2 text-sm">
                  <code>
                    message: string, options?: Partial{`<ToastOptions>`}
                  </code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>Promise{`<string>`}</code>
                </td>
                <td class="px-4 py-2 text-sm">Shows an error toast</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">loading</td>
                <td class="px-4 py-2 text-sm">
                  <code>
                    message: string, options?: Partial{`<ToastOptions>`}
                  </code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>Promise{`<string>`}</code>
                </td>
                <td class="px-4 py-2 text-sm">Shows a loading toast</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">dismiss</td>
                <td class="px-4 py-2 text-sm">
                  <code>id: string</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>void</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Dismisses a specific toast by ID
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">dismissAll</td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">
                  <code>void</code>
                </td>
                <td class="px-4 py-2 text-sm">Dismisses all toasts</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">update</td>
                <td class="px-4 py-2 text-sm">
                  <code>id: string, options: Partial{`<ToastOptions>`}</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>void</code>
                </td>
                <td class="px-4 py-2 text-sm">Updates an existing toast</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">getToasts</td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">
                  <code>ToastProps[]</code>
                </td>
                <td class="px-4 py-2 text-sm">Gets all current toasts</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Type Definitions</h2>
        <div class="overflow-x-auto">
          <pre class="rounded-lg bg-gray-100 p-4 text-sm dark:bg-gray-900">
            {`
// Toast status type
export type ToastStatus = 'info' | 'success' | 'warning' | 'error';

// Toast position options
export type ToastPosition = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right';

// Toast size options
export type ToastSize = 'sm' | 'md' | 'lg';

// ToastOptions type (used with toast.show())
export interface ToastOptions extends Omit<ToastProps, 'id'> {
  id?: string;
}`}
          </pre>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Accessibility Features</h2>
        <ul class="list-disc space-y-2 pl-6">
          <li>
            <code>aria-live</code> regions help screen readers announce toast
            messages appropriately
          </li>
          <li>
            Default <code>aria-live</code> values set based on status type:
            "assertive" for errors, "polite" for others
          </li>
          <li>Alt+T keyboard shortcut to focus the first toast</li>
          <li>Escape key to dismiss all toasts when a toast is focused</li>
          <li>
            Progress bar provides visual indication of when a toast will
            auto-dismiss
          </li>
          <li>
            Toast progress pauses on hover to give users time to read the
            content
          </li>
        </ul>
      </section>
    </div>
  );
});
