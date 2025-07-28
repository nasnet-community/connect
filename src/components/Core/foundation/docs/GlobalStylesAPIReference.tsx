import { component$ } from "@builder.io/qwik";

/**
 * API Reference documentation for GlobalStyles component
 */
export const GlobalStylesAPIReference = component$(() => {
  return (
    <div class="space-y-8">
      <section>
        <h2 class="mb-6 text-2xl font-semibold">GlobalStyles API Reference</h2>
        <p class="mb-6 text-base text-neutral-600 dark:text-neutral-400">
          The GlobalStyles component provides essential CSS styles that extend Tailwind's preflight 
          and ensure consistent behavior across browsers and themes.
        </p>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Component Interface</h3>
        <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
          <h4 class="mb-3 text-lg font-medium">Props</h4>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-neutral-200 dark:border-neutral-700">
                  <th class="pb-3 pr-6 text-left font-medium">Prop</th>
                  <th class="pb-3 pr-6 text-left font-medium">Type</th>
                  <th class="pb-3 pr-6 text-left font-medium">Default</th>
                  <th class="pb-3 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr class="border-b border-neutral-100 dark:border-neutral-800">
                  <td class="py-3 pr-6 font-mono">-</td>
                  <td class="py-3 pr-6">-</td>
                  <td class="py-3 pr-6">-</td>
                  <td class="py-3">No props required. This is a pure CSS injection component.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">CSS Features Provided</h3>
        <div class="space-y-4">
          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Box Model & Layout</h4>
            <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Consistent box-sizing: border-box for all elements</li>
              <li>• Element resets for headings, lists, buttons, and forms</li>
              <li>• Image and media display optimization</li>
              <li>• Table styling with border-collapse and fixed layout</li>
            </ul>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Accessibility & Focus Management</h4>
            <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Enhanced focus-visible states for keyboard navigation</li>
              <li>• Custom focus rings for different interactive elements</li>
              <li>• Proper outline and box-shadow for focus indicators</li>
              <li>• Screen reader and keyboard navigation optimizations</li>
            </ul>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Motion & Animation</h4>
            <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Smooth scrolling with reduced-motion preference support</li>
              <li>• Theme transition animations for color and property changes</li>
              <li>• Performance-optimized transition properties</li>
              <li>• Configurable transition durations (fast, medium, slow)</li>
            </ul>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Typography & Text</h4>
            <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Semantic heading styles (h1-h6) with proper hierarchy</li>
              <li>• Font rendering optimization (-webkit-font-smoothing)</li>
              <li>• Text utility classes (truncate, line-clamp)</li>
              <li>• Code and monospace font family definitions</li>
            </ul>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Browser Compatibility</h4>
            <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Custom scrollbar styling for WebKit and Firefox</li>
              <li>• Input autofill background fixes for Chrome/Safari</li>
              <li>• Number input spinner hiding across browsers</li>
              <li>• Mobile tap highlight removal</li>
            </ul>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Theme Support</h4>
            <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Dark mode scrollbar styling</li>
              <li>• Dark mode text color inheritance</li>
              <li>• Dark mode autofill input styling</li>
              <li>• CSS custom property integration</li>
            </ul>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">RTL (Right-to-Left) Support</h4>
            <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Text alignment adjustments for RTL languages</li>
              <li>• Spacing utilities (space-x) RTL adaptations</li>
              <li>• Margin auto adjustments (ml-auto, mr-auto)</li>
              <li>• Flexbox direction adjustments (justify-start, justify-end)</li>
              <li>• Transform rotation adjustments</li>
              <li>• Form input direction handling for specific field types</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Usage Requirements</h3>
        <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
          <h4 class="mb-3 text-lg font-medium">Implementation</h4>
          <div class="space-y-3">
            <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
              <div class="mb-2 text-sm font-medium">Required Placement</div>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                Must be placed in the root layout component to ensure global styles are applied 
                throughout the application.
              </p>
            </div>
            <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
              <div class="mb-2 text-sm font-medium">Tailwind Integration</div>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                Works alongside Tailwind CSS, extending rather than replacing its functionality.
                All styles use Tailwind's design tokens and color system.
              </p>
            </div>
            <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
              <div class="mb-2 text-sm font-medium">Performance Considerations</div>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                Optimized CSS selectors and transition properties to minimize performance impact.
                Respects user preferences for reduced motion.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">CSS Classes Provided</h3>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-neutral-200 dark:border-neutral-700">
                <th class="pb-3 pr-6 text-left font-medium">Class</th>
                <th class="pb-3 pr-6 text-left font-medium">Purpose</th>
                <th class="pb-3 text-left font-medium">Usage</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr class="border-b border-neutral-100 dark:border-neutral-800">
                <td class="py-3 pr-6 font-mono">.transition-theme</td>
                <td class="py-3 pr-6">Global theme transitions</td>
                <td class="py-3">Add to html element during theme changes</td>
              </tr>
              <tr class="border-b border-neutral-100 dark:border-neutral-800">
                <td class="py-3 pr-6 font-mono">.fast-transition</td>
                <td class="py-3 pr-6">150ms transition duration</td>
                <td class="py-3">Quick UI state changes</td>
              </tr>
              <tr class="border-b border-neutral-100 dark:border-neutral-800">
                <td class="py-3 pr-6 font-mono">.medium-transition</td>
                <td class="py-3 pr-6">300ms transition duration</td>
                <td class="py-3">Standard UI transitions</td>
              </tr>
              <tr class="border-b border-neutral-100 dark:border-neutral-800">
                <td class="py-3 pr-6 font-mono">.slow-transition</td>
                <td class="py-3 pr-6">500ms transition duration</td>
                <td class="py-3">Complex animations</td>
              </tr>
              <tr class="border-b border-neutral-100 dark:border-neutral-800">
                <td class="py-3 pr-6 font-mono">.truncate</td>
                <td class="py-3 pr-6">Text overflow ellipsis</td>
                <td class="py-3">Single-line text truncation</td>
              </tr>
              <tr class="border-b border-neutral-100 dark:border-neutral-800">
                <td class="py-3 pr-6 font-mono">.line-clamp-{1-3}</td>
                <td class="py-3 pr-6">Multi-line text clamping</td>
                <td class="py-3">Truncate text to specific line count</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Browser Support</h3>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Modern Browsers</h4>
            <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Chrome 88+</li>
              <li>• Firefox 85+</li>
              <li>• Safari 14+</li>
              <li>• Edge 88+</li>
            </ul>
          </div>
          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Mobile Support</h4>
            <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• iOS Safari 14+</li>
              <li>• Chrome Mobile 88+</li>
              <li>• Samsung Internet 15+</li>
              <li>• Firefox Mobile 85+</li>
            </ul>
          </div>
        </div>
      </section>

      <div class="mt-8 rounded-lg border border-warning-200 bg-warning-50 p-6 dark:border-warning-800 dark:bg-warning-950">
        <h3 class="mb-2 text-lg font-medium text-warning-900 dark:text-warning-100">
          ⚠️ Important Notes
        </h3>
        <ul class="space-y-2 text-sm text-warning-800 dark:text-warning-200">
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warning-500"></span>
            <span><strong>Single Instance:</strong> Only include GlobalStyles once in your application root</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warning-500"></span>
            <span><strong>Load Order:</strong> Ensure GlobalStyles loads before other component styles</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warning-500"></span>
            <span><strong>Tailwind Dependency:</strong> Requires Tailwind CSS to be properly configured</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warning-500"></span>
            <span><strong>CSS Custom Properties:</strong> Uses CSS variables for theme integration</span>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default GlobalStylesAPIReference;