import { component$ } from "@builder.io/qwik";
import { ThemeToggle } from "../ThemeToggle";

/**
 * ThemeToggle variants example showing different styling options
 */
export const ThemeToggleVariants = component$(() => {
  return (
    <div class="space-y-8">
      <section>
        <h3 class="mb-4 text-xl font-semibold">Theme Toggle Variants</h3>
        <p class="mb-6 text-neutral-600 dark:text-neutral-400">
          Explore different visual styles and configurations for the ThemeToggle component.
        </p>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Size Variants</h3>
        <div class="mb-6 rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-700 dark:bg-neutral-900">
          <div class="flex flex-wrap items-center justify-center gap-8">
            <div class="text-center">
              <ThemeToggle buttonClass="p-1.5 rounded text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Small</p>
            </div>
            <div class="text-center">
              <ThemeToggle buttonClass="p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Medium</p>
            </div>
            <div class="text-center">
              <ThemeToggle buttonClass="p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Large</p>
            </div>
            <div class="text-center">
              <ThemeToggle buttonClass="p-4 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Extra Large</p>
            </div>
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`// Small
<ThemeToggle buttonClass="p-1.5 rounded text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800" />

// Medium (Default)
<ThemeToggle buttonClass="p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800" />

// Large
<ThemeToggle buttonClass="p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800" />

// Extra Large
<ThemeToggle buttonClass="p-4 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800" />`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Shape Variants</h3>
        <div class="mb-6 rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-700 dark:bg-neutral-900">
          <div class="flex flex-wrap items-center justify-center gap-8">
            <div class="text-center">
              <ThemeToggle buttonClass="p-2 rounded-none hover:bg-neutral-100 dark:hover:bg-neutral-800" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Square</p>
            </div>
            <div class="text-center">
              <ThemeToggle buttonClass="p-2 rounded-sm hover:bg-neutral-100 dark:hover:bg-neutral-800" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Slightly Rounded</p>
            </div>
            <div class="text-center">
              <ThemeToggle buttonClass="p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Rounded</p>
            </div>
            <div class="text-center">
              <ThemeToggle buttonClass="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Large Rounded</p>
            </div>
            <div class="text-center">
              <ThemeToggle buttonClass="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Circle</p>
            </div>
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`// Square
<ThemeToggle buttonClass="p-2 rounded-none hover:bg-neutral-100 dark:hover:bg-neutral-800" />

// Circle  
<ThemeToggle buttonClass="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800" />`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Background Variants</h3>
        <div class="mb-6 rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-700 dark:bg-neutral-900">
          <div class="flex flex-wrap items-center justify-center gap-8">
            <div class="text-center">
              <ThemeToggle buttonClass="p-2 rounded bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Neutral</p>
            </div>
            <div class="text-center">
              <ThemeToggle buttonClass="p-2 rounded bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Primary</p>
            </div>
            <div class="text-center">
              <ThemeToggle buttonClass="p-2 rounded bg-secondary-100 text-secondary-700 hover:bg-secondary-200 dark:bg-secondary-900 dark:text-secondary-300 dark:hover:bg-secondary-800" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Secondary</p>
            </div>
            <div class="text-center">
              <ThemeToggle buttonClass="p-2 rounded bg-success-100 text-success-700 hover:bg-success-200 dark:bg-success-900 dark:text-success-300 dark:hover:bg-success-800" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Success</p>
            </div>
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`// Primary Background
<ThemeToggle buttonClass="p-2 rounded bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800" />

// Secondary Background
<ThemeToggle buttonClass="p-2 rounded bg-secondary-100 text-secondary-700 hover:bg-secondary-200 dark:bg-secondary-900 dark:text-secondary-300 dark:hover:bg-secondary-800" />`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Border Variants</h3>
        <div class="mb-6 rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-700 dark:bg-neutral-900">
          <div class="flex flex-wrap items-center justify-center gap-8">
            <div class="text-center">
              <ThemeToggle buttonClass="p-2 rounded border border-neutral-300 hover:bg-neutral-50 dark:border-neutral-600 dark:hover:bg-neutral-800" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Light Border</p>
            </div>
            <div class="text-center">
              <ThemeToggle buttonClass="p-2 rounded border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-950" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Thick Primary</p>
            </div>
            <div class="text-center">
              <ThemeToggle buttonClass="p-2 rounded border border-dashed border-secondary-500 text-secondary-600 hover:bg-secondary-50 dark:border-secondary-400 dark:text-secondary-400 dark:hover:bg-secondary-950" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Dashed</p>
            </div>
            <div class="text-center">
              <ThemeToggle buttonClass="p-2 rounded border-2 border-dotted border-warning-500 text-warning-600 hover:bg-warning-50 dark:border-warning-400 dark:text-warning-400 dark:hover:bg-warning-950" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Dotted</p>
            </div>
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`// Light Border
<ThemeToggle buttonClass="p-2 rounded border border-neutral-300 hover:bg-neutral-50 dark:border-neutral-600 dark:hover:bg-neutral-800" />

// Thick Primary Border
<ThemeToggle buttonClass="p-2 rounded border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-950" />`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Shadow Variants</h3>
        <div class="mb-6 rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-700 dark:bg-neutral-900">
          <div class="flex flex-wrap items-center justify-center gap-8">
            <div class="text-center">
              <ThemeToggle buttonClass="p-2 rounded shadow-sm hover:shadow-md transition-shadow" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Subtle Shadow</p>
            </div>
            <div class="text-center">
              <ThemeToggle buttonClass="p-2 rounded shadow-md hover:shadow-lg transition-shadow" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Medium Shadow</p>
            </div>
            <div class="text-center">
              <ThemeToggle buttonClass="p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Large Shadow</p>
            </div>
            <div class="text-center">
              <ThemeToggle buttonClass="p-3 rounded-lg shadow-primary hover:shadow-lg transition-shadow" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Colored Shadow</p>
            </div>
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`// Subtle Shadow
<ThemeToggle buttonClass="p-2 rounded shadow-sm hover:shadow-md transition-shadow" />

// Large Shadow
<ThemeToggle buttonClass="p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow" />

// Colored Shadow
<ThemeToggle buttonClass="p-3 rounded-lg shadow-primary hover:shadow-lg transition-shadow" />`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Special Effects</h3>
        <div class="mb-6 rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-700 dark:bg-neutral-900">
          <div class="flex flex-wrap items-center justify-center gap-8">
            <div class="text-center">
              <ThemeToggle buttonClass="p-3 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg hover:shadow-xl transition-all" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Gradient</p>
            </div>
            <div class="text-center">
              <ThemeToggle buttonClass="p-2 rounded backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20 transition-all" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Glass Effect</p>
            </div>
            <div class="text-center">
              <ThemeToggle buttonClass="p-2 rounded hover:scale-110 active:scale-95 transition-transform" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Scale Effect</p>
            </div>
            <div class="text-center">
              <ThemeToggle buttonClass="p-2 rounded hover:rotate-12 transition-transform" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Rotate Effect</p>
            </div>
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`// Gradient Background
<ThemeToggle buttonClass="p-3 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg hover:shadow-xl transition-all" />

// Glass Effect
<ThemeToggle buttonClass="p-2 rounded backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20 transition-all" />

// Scale on Hover
<ThemeToggle buttonClass="p-2 rounded hover:scale-110 active:scale-95 transition-transform" />`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Container Styling</h3>
        <div class="mb-6 space-y-6">
          <div class="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
            <h4 class="mb-4 text-lg font-medium">Bordered Container</h4>
            <div class="flex justify-center">
              <ThemeToggle class="rounded-lg border border-primary-200 p-2 dark:border-primary-800" />
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
            <h4 class="mb-4 text-lg font-medium">Background Container</h4>
            <div class="flex justify-center">
              <ThemeToggle class="rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800" />
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
            <h4 class="mb-4 text-lg font-medium">Shadowed Container</h4>
            <div class="flex justify-center">
              <ThemeToggle class="rounded-lg p-2 shadow-md" />
            </div>
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`// Bordered Container
<ThemeToggle class="rounded-lg border border-primary-200 p-2 dark:border-primary-800" />

// Background Container
<ThemeToggle class="rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800" />

// Shadowed Container
<ThemeToggle class="rounded-lg p-2 shadow-md" />`}</code>
          </pre>
        </div>
      </section>

      <div class="mt-8 rounded-lg border border-info-200 bg-info-50 p-6 dark:border-info-800 dark:bg-info-950">
        <h3 class="mb-2 text-lg font-medium text-info-900 dark:text-info-100">
          🎨 Design Tips
        </h3>
        <ul class="space-y-2 text-sm text-info-800 dark:text-info-200">
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span>Choose variants that match your app's overall design language</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span>Ensure sufficient contrast in both light and dark modes</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span>Test hover and focus states across all variants</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span>Consider mobile touch targets when using smaller variants</span>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default ThemeToggleVariants;