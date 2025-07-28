import { component$ } from "@builder.io/qwik";

/**
 * API Reference documentation for ThemeToggle component
 */
export const ThemeToggleAPIReference = component$(() => {
  return (
    <div class="space-y-8">
      <section>
        <h2 class="mb-6 text-2xl font-semibold">API Reference</h2>
        <p class="mb-6 text-base text-neutral-600 dark:text-neutral-400">
          Complete API documentation for the ThemeToggle component.
        </p>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Props</h3>
        <div class="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
          <table class="w-full">
            <thead class="bg-neutral-50 dark:bg-neutral-800">
              <tr>
                <th class="px-4 py-3 text-left text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  Name
                </th>
                <th class="px-4 py-3 text-left text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  Type
                </th>
                <th class="px-4 py-3 text-left text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  Default
                </th>
                <th class="px-4 py-3 text-left text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-neutral-200 dark:divide-neutral-700">
              <tr>
                <td class="px-4 py-3 text-sm font-mono text-neutral-900 dark:text-neutral-100">
                  class
                </td>
                <td class="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                  <code class="rounded bg-neutral-100 px-1 py-0.5 text-xs dark:bg-neutral-800">
                    string
                  </code>
                </td>
                <td class="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                  undefined
                </td>
                <td class="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                  Optional CSS class for styling the container element
                </td>
              </tr>
              <tr>
                <td class="px-4 py-3 text-sm font-mono text-neutral-900 dark:text-neutral-100">
                  buttonClass
                </td>
                <td class="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                  <code class="rounded bg-neutral-100 px-1 py-0.5 text-xs dark:bg-neutral-800">
                    string
                  </code>
                </td>
                <td class="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                  Default styles
                </td>
                <td class="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                  Optional CSS class for styling the toggle button element
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Theme Type</h3>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`type Theme = "light" | "dark" | "system";`}</code>
          </pre>
        </div>
        <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          The theme type represents the three possible theme states:
        </p>
        <ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-600 dark:text-neutral-400">
          <li><strong>light</strong>: Forces light mode regardless of system preference</li>
          <li><strong>dark</strong>: Forces dark mode regardless of system preference</li>
          <li><strong>system</strong>: Follows the user's system color scheme preference</li>
        </ul>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Behavior</h3>
        <div class="space-y-4">
          <div>
            <h4 class="mb-2 text-lg font-medium">Theme Cycling</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              The component cycles through themes in the following order when clicked:
              <span class="font-mono">system → light → dark → system</span>
            </p>
          </div>
          
          <div>
            <h4 class="mb-2 text-lg font-medium">Persistence</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Theme preference is automatically saved to localStorage and restored on page reload.
            </p>
          </div>
          
          <div>
            <h4 class="mb-2 text-lg font-medium">System Preference Detection</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              When set to "system", the component automatically detects and responds to changes 
              in the user's system color scheme preference.
            </p>
          </div>
          
          <div>
            <h4 class="mb-2 text-lg font-medium">Smooth Transitions</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Theme changes include smooth CSS transitions for a polished user experience.
              Transitions are automatically disabled for users who prefer reduced motion.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Accessibility</h3>
        <div class="space-y-4">
          <div>
            <h4 class="mb-2 text-lg font-medium">ARIA Support</h4>
            <ul class="list-disc space-y-1 pl-5 text-sm text-neutral-600 dark:text-neutral-400">
              <li>Includes proper <code>aria-label</code> for screen readers</li>
              <li>Dynamic <code>title</code> attribute shows current theme and action</li>
              <li>Button is properly focusable with keyboard navigation</li>
            </ul>
          </div>
          
          <div>
            <h4 class="mb-2 text-lg font-medium">Keyboard Support</h4>
            <ul class="list-disc space-y-1 pl-5 text-sm text-neutral-600 dark:text-neutral-400">
              <li><kbd class="rounded bg-neutral-200 px-1 text-xs dark:bg-neutral-700">Space</kbd> or <kbd class="rounded bg-neutral-200 px-1 text-xs dark:bg-neutral-700">Enter</kbd>: Toggle theme</li>
              <li><kbd class="rounded bg-neutral-200 px-1 text-xs dark:bg-neutral-700">Tab</kbd>: Focus/unfocus the toggle button</li>
            </ul>
          </div>
          
          <div>
            <h4 class="mb-2 text-lg font-medium">Motion Preferences</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Respects <code>prefers-reduced-motion</code> media query to disable transitions
              for users who prefer reduced motion.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Implementation Details</h3>
        <div class="space-y-4">
          <div>
            <h4 class="mb-2 text-lg font-medium">DOM Manipulation</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              The component adds/removes the <code>dark</code> class on the <code>html</code> element
              to trigger Tailwind's dark mode styles throughout the application.
            </p>
          </div>
          
          <div>
            <h4 class="mb-2 text-lg font-medium">Storage Key</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Theme preference is stored in localStorage under the key <code>"theme"</code>.
            </p>
          </div>
          
          <div>
            <h4 class="mb-2 text-lg font-medium">Media Query</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Uses <code>window.matchMedia("(prefers-color-scheme: dark)")</code> to detect
              system preference and respond to changes.
            </p>
          </div>
        </div>
      </section>

      <div class="mt-8 rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
        <h3 class="mb-4 text-xl font-medium">Usage Example</h3>
        <pre class="overflow-x-auto rounded-md bg-neutral-50 p-3 text-sm dark:bg-neutral-800">
          {`import { ThemeToggle } from "~/components/Core/foundation";

// Basic usage
<ThemeToggle />

// With custom styling
<ThemeToggle 
  class="my-4" 
  buttonClass="p-3 rounded-lg hover:bg-primary-100" 
/>`}
        </pre>
      </div>
    </div>
  );
});

export default ThemeToggleAPIReference;