import { component$ } from "@builder.io/qwik";
import { ThemeToggle } from "../ThemeToggle";

/**
 * Overview documentation for ThemeToggle component
 */
export const ThemeToggleOverview = component$(() => {
  return (
    <div class="space-y-8">
      <section>
        <h2 class="mb-6 text-2xl font-semibold">ThemeToggle Overview</h2>
        <p class="mb-6 text-lg text-neutral-600 dark:text-neutral-400">
          A comprehensive theme switching component that allows users to toggle between 
          light mode, dark mode, and system preference with smooth transitions and 
          persistent storage.
        </p>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Live Example</h3>
        <div class="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
          <div class="flex items-center justify-center">
            <ThemeToggle />
          </div>
          <p class="mt-4 text-center text-sm text-neutral-600 dark:text-neutral-400">
            Click the button above to cycle through theme modes
          </p>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Key Features</h3>
        <div class="grid gap-6 md:grid-cols-2">
          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div class="mb-2 flex items-center">
              <div class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900">
                <svg class="h-4 w-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h4 class="text-lg font-medium">Three Theme Modes</h4>
            </div>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Supports light mode, dark mode, and automatic system preference detection.
            </p>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div class="mb-2 flex items-center">
              <div class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-secondary-100 dark:bg-secondary-900">
                <svg class="h-4 w-4 text-secondary-600 dark:text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h4 class="text-lg font-medium">Persistent Storage</h4>
            </div>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Automatically saves user preference to localStorage and restores on page reload.
            </p>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div class="mb-2 flex items-center">
              <div class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-success-100 dark:bg-success-900">
                <svg class="h-4 w-4 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 class="text-lg font-medium">Smooth Transitions</h4>
            </div>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Includes polished CSS transitions that respect reduced motion preferences.
            </p>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div class="mb-2 flex items-center">
              <div class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-info-100 dark:bg-info-900">
                <svg class="h-4 w-4 text-info-600 dark:text-info-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
              <h4 class="text-lg font-medium">Fully Accessible</h4>
            </div>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Complete keyboard navigation, ARIA labels, and screen reader support.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Theme Mode Details</h3>
        <div class="space-y-4">
          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div class="mb-2 flex items-center">
              <svg class="mr-2 h-5 w-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h4 class="text-lg font-medium">Light Mode</h4>
            </div>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Forces light theme regardless of system preference. Ideal for users who 
              prefer bright interfaces or work in well-lit environments.
            </p>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div class="mb-2 flex items-center">
              <svg class="mr-2 h-5 w-5 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <h4 class="text-lg font-medium">Dark Mode</h4>
            </div>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Forces dark theme regardless of system preference. Perfect for reduced 
              eye strain in low-light conditions and modern aesthetic preferences.
            </p>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div class="mb-2 flex items-center">
              <svg class="mr-2 h-5 w-5 text-secondary-600 dark:text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h4 class="text-lg font-medium">System Preference</h4>
            </div>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Automatically follows the user's operating system theme preference and 
              updates in real-time when the system setting changes.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Integration with Design System</h3>
        <div class="rounded-lg bg-neutral-50 p-6 dark:bg-neutral-800">
          <p class="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
            The ThemeToggle component works seamlessly with the Connect design system:
          </p>
          <ul class="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
            <li class="flex items-start">
              <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500"></span>
              <span>
                <strong>Tailwind Integration:</strong> Uses Tailwind's dark mode strategy with the 
                <code class="rounded bg-neutral-200 px-1 dark:bg-neutral-700">dark:</code> prefix
              </span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500"></span>
              <span>
                <strong>Design Tokens:</strong> Utilizes the foundation color tokens for consistent theming
              </span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500"></span>
              <span>
                <strong>Global Styles:</strong> Works with GlobalStyles component for comprehensive theme support
              </span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500"></span>
              <span>
                <strong>RTL Support:</strong> Fully compatible with RTL layouts and internationalization
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">When to Use</h3>
        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <h4 class="mb-2 text-lg font-medium text-success-600 dark:text-success-400">✓ Recommended</h4>
            <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Application headers and navigation bars</li>
              <li>• Settings and preferences pages</li>
              <li>• User dashboard interfaces</li>
              <li>• Any location where users expect theme control</li>
              <li>• Applications with extended usage sessions</li>
            </ul>
          </div>
          <div>
            <h4 class="mb-2 text-lg font-medium text-warning-600 dark:text-warning-400">⚠ Consider Carefully</h4>
            <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Marketing landing pages (may distract from CTA)</li>
              <li>• Print-focused content</li>
              <li>• Highly branded experiences with fixed color schemes</li>
              <li>• Temporary or one-time use interfaces</li>
            </ul>
          </div>
        </div>
      </section>

      <div class="mt-8 rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
        <h3 class="mb-4 text-xl font-medium">Quick Start</h3>
        <p class="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
          Get started with ThemeToggle in just a few lines of code:
        </p>
        <pre class="overflow-x-auto rounded-md bg-neutral-50 p-3 text-sm dark:bg-neutral-800">
          {`import { ThemeToggle } from "~/components/Core/foundation";

export default component$(() => {
  return (
    <header class="flex items-center justify-between p-4">
      <h1>My App</h1>
      <ThemeToggle />
    </header>
  );
});`}
        </pre>
      </div>
    </div>
  );
});

export default ThemeToggleOverview;