import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="space-y-6">
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">PromoBanner Props</h2>
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
                <td class="px-4 py-2 text-sm font-medium">title</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">Required</td>
                <td class="px-4 py-2 text-sm">Title of the promo banner</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">description</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">Required</td>
                <td class="px-4 py-2 text-sm">
                  Description text for the promo
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">provider</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">Required</td>
                <td class="px-4 py-2 text-sm">VPN provider name</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">imageUrl</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">
                  Optional image URL for the promo banner
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">bgColorClass</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>"bg-secondary-500/10"</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Optional background color class (TailwindCSS)
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">
                  onCredentialsReceived$
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>QRL{`<(credentials: VPNCredentials) => void>`}</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">
                  Callback function when credentials are received
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
        <h2 class="text-xl font-semibold">VPNCredentials Interface</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-800">
                <th
                  scope="col"
                  class="px-4 py-3 text-left text-sm font-semibold"
                >
                  Property
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
                <td class="px-4 py-2 text-sm font-medium">server</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">The VPN server address</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">username</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  The username for VPN authentication
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">password</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  The password for VPN authentication
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">[key: string]</td>
                <td class="px-4 py-2 text-sm">
                  <code>string</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Additional credential properties specific to the VPN provider
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">usePromoBanner Hook</h2>
        <p>
          The PromoBanner component uses the <code>usePromoBanner</code> hook
          internally to manage state and handle credential retrieval. You can
          also use this hook directly for more custom implementations.
        </p>

        <h3 class="mt-4 text-lg font-medium">Parameters</h3>
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
                <td class="px-4 py-2 text-sm font-medium">
                  onCredentialsReceived$
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>QRL{`<(credentials: VPNCredentials) => void>`}</code>
                </td>
                <td class="px-4 py-2 text-sm">-</td>
                <td class="px-4 py-2 text-sm">
                  Callback when credentials are received
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">mockCredentials</td>
                <td class="px-4 py-2 text-sm">
                  <code>VPNCredentials</code>
                </td>
                <td class="px-4 py-2 text-sm">Default mock credentials</td>
                <td class="px-4 py-2 text-sm">
                  Mock credentials for development/testing
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">initialLoading</td>
                <td class="px-4 py-2 text-sm">
                  <code>boolean</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  <code>false</code>
                </td>
                <td class="px-4 py-2 text-sm">Initial loading state</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="mt-4 text-lg font-medium">Return Values</h3>
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
                <td class="px-4 py-2 text-sm font-medium">loading</td>
                <td class="px-4 py-2 text-sm">
                  <code>{`{ value: boolean }`}</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Loading state for credential fetch
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">error</td>
                <td class="px-4 py-2 text-sm">
                  <code>{`{ value: string | null }`}</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Error state if credential fetch fails
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2 text-sm font-medium">success</td>
                <td class="px-4 py-2 text-sm">
                  <code>{`{ value: boolean }`}</code>
                </td>
                <td class="px-4 py-2 text-sm">
                  Success state when credentials are received
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-950">
                <td class="px-4 py-2 text-sm font-medium">getCredentials$</td>
                <td class="px-4 py-2 text-sm">
                  <code>
                    QRL{`<() => Promise<VPNCredentials | undefined>>`}
                  </code>
                </td>
                <td class="px-4 py-2 text-sm">Fetch credentials action</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">CSS Considerations</h2>
        <p>
          The PromoBanner component uses the following CSS classes for styling:
        </p>
        <ul class="list-disc space-y-2 pl-6">
          <li>
            <code>rounded-lg</code>: For rounded corners of the banner
          </li>
          <li>
            <code>overflow-hidden</code>: To ensure content doesn't overflow the
            container
          </li>
          <li>
            <code>bgColorClass</code>: User-provided background color (defaults
            to <code>bg-secondary-500/10</code>)
          </li>
          <li>
            <code>p-4</code>, <code>p-6</code>: Padding for content sections
          </li>
          <li>
            <code>flex flex-col md:flex-row</code>: Responsive layout that
            stacks on mobile and aligns side-by-side on desktop
          </li>
          <li>
            <code>bg-primary-500</code>, <code>hover:bg-primary-600</code>: For
            the action button
          </li>
          <li>
            <code>
              bg-success-100 text-success-800 dark:bg-success-900/30
              dark:text-success-300
            </code>
            : For success messages
          </li>
        </ul>
      </section>
    </div>
  );
});
