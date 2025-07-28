import { component$, useSignal } from "@builder.io/qwik";
import { Switch } from "~/components/Core/Switch";

export const AccessibilityFeatures = component$(() => {
  const reduceMotion = useSignal(false);
  const highContrast = useSignal(false);
  const largeText = useSignal(false);
  const screenReader = useSignal(true);
  const keyboardOnly = useSignal(false);

  return (
    <div class="space-y-8">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-text-primary dark:text-text-dark-primary">
          Accessibility Features
        </h3>
        <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
          The Switch component includes comprehensive accessibility features that work
          seamlessly with system preferences and assistive technologies.
        </p>
      </div>

      <div class="space-y-6">
        <h4 class="text-base font-medium text-text-primary dark:text-text-dark-primary">
          Motion Preferences
        </h4>

        {/* Reduce Motion Demo */}
        <div class="space-y-4">
          <div class="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div>
              <label id="reduce-motion-label" class="text-sm font-medium text-text-primary dark:text-text-dark-primary">
                Reduce Motion
              </label>
              <p id="reduce-motion-desc" class="text-xs text-text-secondary dark:text-text-dark-secondary">
                Minimize animations and transitions (uses motion-safe/reduce classes)
              </p>
            </div>
            <Switch
              checked={reduceMotion.value}
              onChange$={(checked) => (reduceMotion.value = checked)}
              aria-labelledby="reduce-motion-label"
              aria-describedby="reduce-motion-desc"
              size="md"
            />
          </div>

          <div class="text-xs text-text-tertiary dark:text-text-dark-tertiary">
            <p>• When enabled, the switch uses <code>motion-reduce:transition-none</code></p>
            <p>• Hover effects use <code>motion-reduce:hover:scale-100</code> to disable scaling</p>
            <p>• Respects system <code>prefers-reduced-motion</code> setting</p>
          </div>
        </div>

        {/* High Contrast Mode */}
        <div class="space-y-4">
          <div class="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div>
              <label id="high-contrast-label" class="text-sm font-medium text-text-primary dark:text-text-dark-primary">
                High Contrast Mode
              </label>
              <p id="high-contrast-desc" class="text-xs text-text-secondary dark:text-text-dark-secondary">
                Enhanced color contrast for better visibility
              </p>
            </div>
            <Switch
              checked={highContrast.value}
              onChange$={(checked) => (highContrast.value = checked)}
              aria-labelledby="high-contrast-label"
              aria-describedby="high-contrast-desc"
              class={highContrast.value ? "high-contrast:filter high-contrast:contrast-150" : ""}
            />
          </div>

          <div class="text-xs text-text-tertiary dark:text-text-dark-tertiary">
            <p>• Uses semantic colors that maintain WCAG AA contrast ratios</p>
            <p>• Dark mode provides enhanced contrast automatically</p>
            <p>• Focus rings are prominent and clearly visible</p>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <h4 class="text-base font-medium text-text-primary dark:text-text-dark-primary">
          Touch and Interaction
        </h4>

        {/* Large Text/Touch Targets */}
        <div class="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div>
            <label id="large-text-label" class="text-sm font-medium text-text-primary dark:text-text-dark-primary">
              Large Touch Targets
            </label>
            <p id="large-text-desc" class="text-xs text-text-secondary dark:text-text-dark-secondary">
              Larger switches for easier interaction (44px minimum touch target)
            </p>
          </div>
          <Switch
            checked={largeText.value}
            onChange$={(checked) => (largeText.value = checked)}
            aria-labelledby="large-text-label"
            aria-describedby="large-text-desc"
            size="lg"
          />
        </div>

        {/* Screen Reader Support */}
        <div class="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div>
            <label id="screen-reader-label" class="text-sm font-medium text-text-primary dark:text-text-dark-primary">
              Screen Reader Announcements
            </label>
            <p id="screen-reader-desc" class="text-xs text-text-secondary dark:text-text-dark-secondary">
              Proper ARIA labels and state announcements
            </p>
          </div>
          <Switch
            checked={screenReader.value}
            onChange$={(checked) => (screenReader.value = checked)}
            aria-labelledby="screen-reader-label"
            aria-describedby="screen-reader-desc"
            variant="success"
          />
        </div>

        {/* Keyboard Navigation */}
        <div class="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div>
            <label id="keyboard-label" class="text-sm font-medium text-text-primary dark:text-text-dark-primary">
              Keyboard Only Navigation
            </label>
            <p id="keyboard-desc" class="text-xs text-text-secondary dark:text-text-dark-secondary">
              Full keyboard support with visible focus indicators
            </p>
          </div>
          <Switch
            checked={keyboardOnly.value}
            onChange$={(checked) => (keyboardOnly.value = checked)}
            aria-labelledby="keyboard-label"
            aria-describedby="keyboard-desc"
          />
        </div>
      </div>

      <div class="space-y-4">
        <h4 class="text-base font-medium text-text-primary dark:text-text-dark-primary">
          Size Responsiveness
        </h4>
        <div class="grid gap-4 sm:grid-cols-3">
          <div class="space-y-2 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <Switch
              checked={reduceMotion.value}
              onChange$={(checked) => (reduceMotion.value = checked)}
              size="sm"
              label="Small (Mobile optimized)"
              labelPosition="left"
            />
            <p class="text-xs text-text-tertiary dark:text-text-dark-tertiary">
              44px touch target on mobile, compact on desktop
            </p>
          </div>

          <div class="space-y-2 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <Switch
              checked={highContrast.value}
              onChange$={(checked) => (highContrast.value = checked)}
              size="md"
              label="Medium (Default)"
              labelPosition="left"
            />
            <p class="text-xs text-text-tertiary dark:text-text-dark-tertiary">
              44px touch target across all devices
            </p>
          </div>

          <div class="space-y-2 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <Switch
              checked={largeText.value}
              onChange$={(checked) => (largeText.value = checked)}
              size="lg"
              label="Large (Accessibility)"
              labelPosition="left"
            />
            <p class="text-xs text-text-tertiary dark:text-text-dark-tertiary">
              48px touch target for easier interaction
            </p>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-info-50 border border-info-200 p-4 dark:bg-info-900/20 dark:border-info-800">
        <h4 class="text-sm font-medium text-info-800 dark:text-info-200 mb-2">
          ♿ Accessibility Compliance
        </h4>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <h5 class="text-xs font-medium text-info-700 dark:text-info-300 mb-1">WCAG 2.1 AA Features:</h5>
            <ul class="text-xs text-info-600 dark:text-info-400 space-y-0.5">
              <li>• Color contrast ratios ≥ 4.5:1</li>
              <li>• Minimum 44px touch targets</li>
              <li>• Keyboard navigation support</li>
              <li>• Screen reader compatibility</li>
            </ul>
          </div>
          <div>
            <h5 class="text-xs font-medium text-info-700 dark:text-info-300 mb-1">ARIA Implementation:</h5>
            <ul class="text-xs text-info-600 dark:text-info-400 space-y-0.5">
              <li>• <code>role="switch"</code></li>
              <li>• <code>aria-checked</code> state</li>
              <li>• <code>aria-label/labelledby</code></li>
              <li>• <code>aria-describedby</code> support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});