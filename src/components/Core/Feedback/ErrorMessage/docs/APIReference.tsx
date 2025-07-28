import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="space-y-6">
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">ErrorMessage Props</h2>
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
                <td class="px-4 py-2 text-sm font-medium">message</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">
                  The error message to display (required)
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">title</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>"Configuration Error"</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Optional title for the error message
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">class</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">
                  Optional CSS classes to apply to the root element
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">dismissible</td>
                <td class="px-4 py-2 text-sm">
                  <code>boolean</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>false</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Whether the error message can be dismissed by user action
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">onDismiss$</td>
                <td class="px-4 py-2 text-sm">
                  <code>QRL</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">
                  Callback when the error message is dismissed
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">
                  autoDismissDuration
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>number</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>0</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Duration in milliseconds to automatically hide the error
                  message (0 = no auto-hide)
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">id</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">
                  Optional ID for the error message element
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">animate</td>
                <td class="px-4 py-2 text-sm">
                  <code>boolean</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>true</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Whether to animate the error message appearance
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">useErrorMessage Hook</h2>
        <p>
          The <code>useErrorMessage</code> hook provides a convenient way to
          manage error message state.
        </p>

        <h3 class="mt-4 text-lg font-semibold">Parameters</h3>
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
                <td class="px-4 py-2 text-sm font-medium">initialMessage</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>''</code>
                </td>
                <td class="px-4 py-2 text-sm">Initial error message</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">initialVisible</td>
                <td class="px-4 py-2 text-sm">
                  <code>boolean</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>false</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Whether the error is initially visible
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">autoHideDuration</td>
                <td class="px-4 py-2 text-sm">
                  <code>number</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>0</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Duration in milliseconds to automatically hide the error
                  message
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">onHide$</td>
                <td class="px-4 py-2 text-sm">
                  <code>QRL</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">
                  Callback when the error message is hidden
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="mt-4 text-lg font-semibold">Return Value</h3>
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
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">message</td>
                <td class="px-4 py-2 text-sm">
                  <code>Signal</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Signal containing the current error message
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">visible</td>
                <td class="px-4 py-2 text-sm">
                  <code>Signal</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Signal indicating if the error message is visible
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">setMessage$</td>
                <td class="px-4 py-2 text-sm">
                  <code>QRL</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Function to set the error message text
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">showError$</td>
                <td class="px-4 py-2 text-sm">
                  <code>QRL</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Function to show an error message
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">hideError$</td>
                <td class="px-4 py-2 text-sm">
                  <code>QRL</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Function to hide the current error message
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Accessibility</h2>
        <p>
          The ErrorMessage component includes the following accessibility
          features:
        </p>
        <ul class="list-disc space-y-2 pl-6">
          <li>
            <code>role="alert"</code> is applied to the root element to ensure
            screen readers announce the error
          </li>
          <li>
            The dismiss button includes an <code>aria-label</code> for screen
            reader users
          </li>
          <li>
            Color contrast meets WCAG AA standards for both light and dark
            themes
          </li>
          <li>
            Error icon is decorative and does not interfere with screen reader
            interpretation
          </li>
        </ul>
      </section>
    </div>
  );
});
