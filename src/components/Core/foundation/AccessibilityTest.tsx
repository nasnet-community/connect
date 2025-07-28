import { component$, useSignal } from "@builder.io/qwik";

/**
 * Accessibility testing component for foundation elements
 */
export const AccessibilityTest = component$(() => {
  // These preferences are kept for future development but prefixed with underscore
  const _motionPreference = useSignal("unknown");
  const _colorSchemePreference = useSignal("unknown");
  const _contrastPreference = useSignal("unknown");
  const _reducedDataPreference = useSignal("unknown");

  return (
    <div class="space-y-8">
      <section>
        <h2 class="mb-6 text-2xl font-semibold">Accessibility Testing Suite</h2>
        <p class="mb-6 text-base text-neutral-600 dark:text-neutral-400">
          Test and validate accessibility features across the design system. This component helps identify
          potential accessibility issues and ensures compliance with WCAG guidelines.
        </p>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">User Preference Detection</h3>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Motion Preferences</h4>
            <div class="space-y-3">
              <div class="motion-safe:animate-pulse rounded-lg bg-primary-100 p-3 dark:bg-primary-900">
                <div class="text-sm font-medium">Animation Test</div>
                <div class="text-xs text-neutral-600 dark:text-neutral-400">
                  This element only animates if motion is not reduced
                </div>
              </div>
              <div class="motion-reduce:bg-warning-100 rounded-lg bg-success-100 p-3 dark:motion-reduce:bg-warning-900 dark:bg-success-900">
                <div class="text-sm font-medium">Motion Reduce Test</div>
                <div class="text-xs text-neutral-600 dark:text-neutral-400">
                  Background changes color if motion is reduced
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Contrast Preferences</h4>
            <div class="space-y-3">
              <div class="high-contrast:border-4 high-contrast:border-black rounded-lg border border-neutral-300 bg-neutral-100 p-3 dark:bg-neutral-800">
                <div class="text-sm font-medium">High Contrast Test</div>
                <div class="text-xs text-neutral-600 dark:text-neutral-400">
                  Border becomes thicker with high contrast preference
                </div>
              </div>
              <div class="low-contrast:opacity-80 rounded-lg bg-secondary-100 p-3 dark:bg-secondary-900">
                <div class="text-sm font-medium">Low Contrast Test</div>
                <div class="text-xs text-neutral-600 dark:text-neutral-400">
                  Opacity reduces with low contrast preference
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Color Contrast Testing</h3>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { bg: "bg-white", text: "text-neutral-900", label: "White on Black (High)", level: "AAA" },
            { bg: "bg-neutral-100", text: "text-neutral-800", label: "Light Gray on Dark Gray", level: "AA" },
            { bg: "bg-primary-500", text: "text-white", label: "Primary with White", level: "AA" },
            { bg: "bg-secondary-500", text: "text-white", label: "Secondary with White", level: "AA" },
            { bg: "bg-success-500", text: "text-white", label: "Success with White", level: "AA" },
            { bg: "bg-error-500", text: "text-white", label: "Error with White", level: "AA" },
          ].map((combo, index) => (
            <div key={index} class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
              <div class={`mb-2 rounded p-3 ${combo.bg} ${combo.text}`}>
                <div class="font-medium">Sample Text</div>
                <div class="text-sm">The quick brown fox jumps over the lazy dog.</div>
              </div>
              <div class="text-xs">
                <div class="font-medium">{combo.label}</div>
                <div class="text-neutral-500">WCAG {combo.level} Compliant</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Focus State Testing</h3>
        <div class="space-y-4">
          <p class="text-sm text-neutral-600 dark:text-neutral-400">
            Use Tab key to navigate through these elements and observe focus indicators:
          </p>
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <button class="rounded-lg border border-neutral-200 p-3 text-left hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-neutral-700 dark:hover:bg-neutral-800 dark:focus:ring-offset-neutral-900">
              <div class="font-medium">Standard Button</div>
              <div class="text-sm text-neutral-600 dark:text-neutral-400">With focus ring</div>
            </button>

            <a
              href="#"
              class="block rounded-lg border border-neutral-200 p-3 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 dark:border-neutral-700 dark:hover:bg-neutral-800 dark:focus:ring-offset-neutral-900"
            >
              <div class="font-medium">Link Element</div>
              <div class="text-sm text-neutral-600 dark:text-neutral-400">With focus ring</div>
            </a>

            <input
              type="text"
              placeholder="Input field"
              class="w-full rounded-lg border border-neutral-200 p-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-neutral-700 dark:focus:ring-offset-neutral-900"
            />

            <select class="w-full rounded-lg border border-neutral-200 p-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-neutral-700 dark:focus:ring-offset-neutral-900">
              <option>Select option</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>

            <textarea
              placeholder="Textarea field"
              rows={3}
              class="w-full rounded-lg border border-neutral-200 p-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-neutral-700 dark:focus:ring-offset-neutral-900"
            ></textarea>

            <div class="flex items-center space-x-2">
              <input
                type="checkbox"
                id="checkbox-test"
                class="rounded focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
              />
              <label for="checkbox-test" class="text-sm">
                Checkbox with label
              </label>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">ARIA Labels and Roles</h3>
        <div class="space-y-4">
          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Semantic HTML Elements</h4>
            <div class="space-y-3">
              <nav aria-label="Accessibility test navigation" class="rounded bg-neutral-100 p-3 dark:bg-neutral-800">
                <div class="mb-2 text-sm font-medium">Navigation (nav)</div>
                <ul class="flex space-x-4 text-sm">
                  <li><a href="#" class="text-primary-600 hover:text-primary-800 dark:text-primary-400">Home</a></li>
                  <li><a href="#" class="text-primary-600 hover:text-primary-800 dark:text-primary-400">About</a></li>
                  <li><a href="#" class="text-primary-600 hover:text-primary-800 dark:text-primary-400">Contact</a></li>
                </ul>
              </nav>

              <main class="rounded bg-neutral-100 p-3 dark:bg-neutral-800">
                <div class="mb-2 text-sm font-medium">Main Content (main)</div>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  This is the main content area with proper semantic markup.
                </p>
              </main>

              <aside aria-label="Additional information" class="rounded bg-neutral-100 p-3 dark:bg-neutral-800">
                <div class="mb-2 text-sm font-medium">Sidebar (aside)</div>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  Complementary content with proper ARIA label.
                </p>
              </aside>
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">ARIA Attributes</h4>
            <div class="space-y-3">
              <button
                aria-expanded="false"
                aria-controls="dropdown-menu"
                class="rounded bg-primary-500 px-4 py-2 text-white hover:bg-primary-600"
              >
                Dropdown (aria-expanded)
              </button>

              <div
                role="alert"
                class="rounded border border-error-200 bg-error-50 p-3 text-error-800 dark:border-error-800 dark:bg-error-950 dark:text-error-200"
              >
                <div class="font-medium">Error Alert (role="alert")</div>
                <div class="text-sm">This is an important error message.</div>
              </div>

              <div
                role="status"
                aria-live="polite"
                class="rounded border border-info-200 bg-info-50 p-3 text-info-800 dark:border-info-800 dark:bg-info-950 dark:text-info-200"
              >
                <div class="font-medium">Status Update (aria-live="polite")</div>
                <div class="text-sm">This content updates will be announced to screen readers.</div>
              </div>

              <div class="flex items-center space-x-2">
                <div
                  role="progressbar"
                  aria-valuenow={65}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Loading progress"
                  class="h-4 w-full rounded-full bg-neutral-200 dark:bg-neutral-700"
                >
                  <div 
                    class="h-4 rounded-full bg-primary-500 transition-all" 
                    style="width: 65%"
                  ></div>
                </div>
                <span class="text-sm">65%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Screen Reader Testing</h3>
        <div class="space-y-4">
          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Hidden Content for Screen Readers</h4>
            <div class="space-y-3">
              <button class="rounded bg-secondary-500 px-4 py-2 text-white hover:bg-secondary-600">
                <span class="sr-only">Delete item from your shopping cart</span>
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                Icon button with hidden descriptive text for screen readers
              </p>
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Skip Links</h4>
            <div class="space-y-3">
              <a
                href="#main-content"
                class="sr-only rounded bg-primary-500 px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
              >
                Skip to main content
              </a>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                Tab to reveal skip link (invisible until focused)
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Motion and Animation Testing</h3>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Respects Motion Preferences</h4>
            <div class="space-y-3">
              <div class="motion-safe:animate-bounce rounded-lg bg-success-100 p-3 dark:bg-success-900">
                <div class="text-sm font-medium">Safe Animation</div>
                <div class="text-xs text-neutral-600 dark:text-neutral-400">
                  Only animates if motion is not reduced
                </div>
              </div>
              <div class="hover:motion-safe:scale-105 rounded-lg bg-primary-100 p-3 transition-transform dark:bg-primary-900">
                <div class="text-sm font-medium">Hover Transform</div>
                <div class="text-xs text-neutral-600 dark:text-neutral-400">
                  Scales on hover if motion is safe
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Alternative Feedback</h4>
            <div class="space-y-3">
              <button class="motion-reduce:bg-warning-500 motion-safe:animate-pulse rounded-lg bg-warning-100 p-3 text-warning-800 motion-reduce:text-white dark:bg-warning-900 dark:text-warning-200">
                <div class="text-sm font-medium">Loading State</div>
                <div class="text-xs">
                  Pulses or shows color change
                </div>
              </button>
              <div class="motion-reduce:border-l-4 motion-reduce:border-info-500 motion-safe:animate-pulse rounded-lg bg-info-100 p-3 dark:bg-info-900">
                <div class="text-sm font-medium">Status Indicator</div>
                <div class="text-xs text-neutral-600 dark:text-neutral-400">
                  Animation or visual border
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="mt-8 rounded-lg border border-warning-200 bg-warning-50 p-6 dark:border-warning-800 dark:bg-warning-950">
        <h3 class="mb-2 text-lg font-medium text-warning-900 dark:text-warning-100">
          ♿ Accessibility Testing Checklist
        </h3>
        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <h4 class="mb-2 font-medium">Keyboard Navigation</h4>
            <ul class="space-y-1 text-sm text-warning-800 dark:text-warning-200">
              <li>□ All interactive elements are keyboard accessible</li>
              <li>□ Tab order is logical and intuitive</li>
              <li>□ Focus indicators are clearly visible</li>
              <li>□ No keyboard traps exist</li>
            </ul>
          </div>
          <div>
            <h4 class="mb-2 font-medium">Screen Readers</h4>
            <ul class="space-y-1 text-sm text-warning-800 dark:text-warning-200">
              <li>□ All images have appropriate alt text</li>
              <li>□ Form labels are properly associated</li>
              <li>□ ARIA labels provide context</li>
              <li>□ Page structure uses semantic HTML</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AccessibilityTest;