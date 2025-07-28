import { component$ } from "@builder.io/qwik";
import { ThemeToggle } from "../ThemeToggle";

/**
 * Basic ThemeToggle example demonstrating simple usage
 */
export const BasicThemeToggle = component$(() => {
  return (
    <div class="space-y-8">
      <section>
        <h3 class="mb-4 text-xl font-semibold">Basic Theme Toggle</h3>
        <p class="mb-6 text-neutral-600 dark:text-neutral-400">
          The simplest implementation of the ThemeToggle component with default styling.
        </p>

        <div class="rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-700 dark:bg-neutral-900">
          <div class="flex items-center justify-center">
            <ThemeToggle />
          </div>
        </div>

        <div class="mt-4 rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`import { ThemeToggle } from "~/components/Core/foundation";

<ThemeToggle />`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">How It Works</h3>
        <div class="grid gap-6 md:grid-cols-3">
          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900">
              <svg class="h-5 w-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h4 class="mb-2 text-lg font-medium">System Detection</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Automatically detects your system's color scheme preference and shows the appropriate icon.
            </p>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-secondary-100 dark:bg-secondary-900">
              <svg class="h-5 w-5 text-secondary-600 dark:text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h4 class="mb-2 text-lg font-medium">Toggle Cycling</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Click to cycle through: System → Light → Dark → System. Each mode has a distinct icon.
            </p>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-success-100 dark:bg-success-900">
              <svg class="h-5 w-5 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <h4 class="mb-2 text-lg font-medium">Persistent Storage</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Your preference is saved automatically and restored when you return to the site.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Theme States Demo</h3>
        <p class="mb-6 text-neutral-600 dark:text-neutral-400">
          Click the toggle above and observe how this entire section changes appearance. 
          Notice the smooth transitions and how all elements adapt to the new theme.
        </p>

        <div class="space-y-4">
          <div class="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
            <h4 class="mb-2 text-lg font-medium">Text and Background</h4>
            <p class="text-neutral-600 dark:text-neutral-400">
              This text changes color automatically based on the current theme. The background 
              also adapts to provide proper contrast.
            </p>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <div class="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
              <h5 class="mb-2 font-medium">Primary Card</h5>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                Cards adapt their background and border colors seamlessly.
              </p>
            </div>

            <div class="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
              <h5 class="mb-2 font-medium">Secondary Card</h5>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                All UI elements maintain proper contrast and readability.
              </p>
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <button class="rounded-md bg-primary-500 px-4 py-2 text-white hover:bg-primary-600">
              Primary Button
            </button>
            <button class="rounded-md bg-secondary-500 px-4 py-2 text-white hover:bg-secondary-600">
              Secondary Button
            </button>
            <button class="rounded-md border border-neutral-300 px-4 py-2 hover:bg-neutral-50 dark:border-neutral-600 dark:hover:bg-neutral-800">
              Outline Button
            </button>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Accessibility Features</h3>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="rounded-lg border border-info-200 bg-info-50 p-4 dark:border-info-800 dark:bg-info-950">
            <h4 class="mb-2 text-lg font-medium text-info-900 dark:text-info-100">
              Keyboard Support
            </h4>
            <ul class="space-y-1 text-sm text-info-800 dark:text-info-200">
              <li>• <kbd class="rounded bg-white px-1 text-xs">Tab</kbd> to focus the toggle</li>
              <li>• <kbd class="rounded bg-white px-1 text-xs">Space</kbd> or <kbd class="rounded bg-white px-1 text-xs">Enter</kbd> to activate</li>
              <li>• Clear visual focus indicators</li>
            </ul>
          </div>

          <div class="rounded-lg border border-success-200 bg-success-50 p-4 dark:border-success-800 dark:bg-success-950">
            <h4 class="mb-2 text-lg font-medium text-success-900 dark:text-success-100">
              Screen Reader Support
            </h4>
            <ul class="space-y-1 text-sm text-success-800 dark:text-success-200">
              <li>• Descriptive ARIA labels</li>
              <li>• Current state announcements</li>
              <li>• Semantic button role</li>
            </ul>
          </div>
        </div>
      </section>

      <div class="mt-8 rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
        <h3 class="mb-4 text-xl font-medium">Try It Yourself</h3>
        <p class="mb-4 text-neutral-600 dark:text-neutral-400">
          Experiment with the theme toggle above:
        </p>
        <ol class="list-decimal space-y-2 pl-5 text-sm text-neutral-600 dark:text-neutral-400">
          <li>Click the toggle button to cycle through themes</li>
          <li>Notice how the icon changes for each theme mode</li>
          <li>Observe the smooth transitions between themes</li>
          <li>Refresh the page to see that your preference is remembered</li>
          <li>Try using Tab and Space/Enter keys to navigate and activate</li>
        </ol>
      </div>
    </div>
  );
});

export default BasicThemeToggle;