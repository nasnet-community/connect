import { component$, useSignal } from "@builder.io/qwik";
import { Switch } from "~/components/Core/Switch";

export const ThemeAwareSwitch = component$(() => {
  const darkMode = useSignal(false);
  const autoTheme = useSignal(true);
  const reduceMotion = useSignal(false);
  const highContrast = useSignal(false);

  return (
    <div class="space-y-6">
      <div class="grid gap-6 sm:grid-cols-2">
        {/* Light Mode Preview */}
        <div class="rounded-lg border border-gray-200 bg-white p-6" data-theme="light">
          <h3 class="mb-4 text-lg font-semibold text-gray-900">
            Light Mode
          </h3>
          <div class="space-y-4">
            <Switch
              checked={darkMode.value}
              onChange$={(checked) => (darkMode.value = checked)}
              label="Enable Dark Mode"
              size="md"
            />
            <Switch
              checked={autoTheme.value}
              onChange$={(checked) => (autoTheme.value = checked)}
              label="Auto Theme"
              size="sm"
            />
            <p class="text-sm text-gray-600">
              Switches adapt their colors to match the light theme automatically.
            </p>
          </div>
        </div>

        {/* Dark Mode Preview */}
        <div class="rounded-lg border border-gray-700 bg-gray-900 p-6" data-theme="dark">
          <h3 class="mb-4 text-lg font-semibold text-gray-100">
            Dark Mode
          </h3>
          <div class="space-y-4">
            <Switch
              checked={darkMode.value}
              onChange$={(checked) => (darkMode.value = checked)}
              label="Enable Dark Mode"
              size="md"
            />
            <Switch
              checked={autoTheme.value}
              onChange$={(checked) => (autoTheme.value = checked)}
              label="Auto Theme"
              size="sm"
            />
            <p class="text-sm text-gray-400">
              Switches use appropriate colors for dark backgrounds.
            </p>
          </div>
        </div>
      </div>

      <div class="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
        <h3 class="mb-4 text-lg font-semibold">Accessibility Preferences</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex-1 pr-4">
              <label class="text-sm font-medium text-gray-900 dark:text-gray-100">
                Reduce Motion
              </label>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Minimize animations and transitions
              </p>
            </div>
            <Switch
              checked={reduceMotion.value}
              onChange$={(checked) => (reduceMotion.value = checked)}
              aria-describedby="reduce-motion-desc"
            />
          </div>

          <div class="flex items-center justify-between">
            <div class="flex-1 pr-4">
              <label class="text-sm font-medium text-gray-900 dark:text-gray-100">
                High Contrast
              </label>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Increase color contrast for better visibility
              </p>
            </div>
            <Switch
              checked={highContrast.value}
              onChange$={(checked) => (highContrast.value = checked)}
              aria-describedby="high-contrast-desc"
            />
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Theme Colors Reference
        </h4>
        <div class="grid grid-cols-2 gap-4 text-xs">
          <div class="space-y-2">
            <p class="font-medium">Light Mode:</p>
            <div class="flex items-center gap-2">
              <div class="h-4 w-4 rounded bg-primary-500"></div>
              <span>Track (ON): primary-500</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="h-4 w-4 rounded bg-surface-quaternary"></div>
              <span>Track (OFF): surface-quaternary</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="h-4 w-4 rounded bg-surface-elevated shadow"></div>
              <span>Thumb: surface-elevated</span>
            </div>
          </div>
          <div class="space-y-2">
            <p class="font-medium">Dark Mode:</p>
            <div class="flex items-center gap-2">
              <div class="h-4 w-4 rounded bg-primary-600"></div>
              <span>Track (ON): primary-600</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="h-4 w-4 rounded bg-surface-dark-tertiary"></div>
              <span>Track (OFF): surface-dark-tertiary</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="h-4 w-4 rounded bg-surface-dark-elevated shadow"></div>
              <span>Thumb: surface-dark-elevated</span>
            </div>
          </div>
        </div>
      </div>

      <div class="text-sm text-gray-600 dark:text-gray-400">
        <p class="font-medium mb-2">Theme Features:</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Automatic color adaptation based on theme</li>
          <li>Proper contrast ratios for WCAG compliance</li>
          <li>Smooth transitions between themes</li>
          <li>Focus indicators that work in both modes</li>
          <li>Consistent shadows and elevation</li>
        </ul>
      </div>
    </div>
  );
});