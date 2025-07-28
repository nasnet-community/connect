import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";

export default component$(() => {
  return (
    <OverviewTemplate
      title="TimePicker"
      description="A comprehensive time selection component with support for various formats, steps, and accessibility features."
    >
      <div class="space-y-6">
        <section>
          <h3 class="mb-3 text-xl font-semibold">Introduction</h3>
          <p class="text-gray-600 dark:text-gray-400">
            The TimePicker component provides an intuitive, modern interface for selecting time values with advanced 
            features and excellent user experience. It supports both 12-hour and 24-hour formats, optional seconds 
            selection, customizable step intervals, and various visual styles. Built with accessibility and mobile-first 
            design in mind, it offers enhanced keyboard navigation, touch optimization, and screen reader support.
          </p>
        </section>

        <section>
          <h3 class="mb-3 text-xl font-semibold">Key Features</h3>
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-lg border border-border-DEFAULT dark:border-border-dark p-4">
              <h4 class="mb-2 font-semibold text-primary-600 dark:text-primary-400">Flexible Formats</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Support for both 12-hour (with AM/PM) and 24-hour time formats, with optional seconds display.
              </p>
            </div>
            <div class="rounded-lg border border-border-DEFAULT dark:border-border-dark p-4">
              <h4 class="mb-2 font-semibold text-primary-600 dark:text-primary-400">Customizable Steps</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Configure minute and second intervals (1, 5, 10, 15, or 30) to match your application needs.
              </p>
            </div>
            <div class="rounded-lg border border-border-DEFAULT dark:border-border-dark p-4">
              <h4 class="mb-2 font-semibold text-primary-600 dark:text-primary-400">Accessibility First</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Full keyboard navigation, ARIA labels, and screen reader support for inclusive user experiences.
              </p>
            </div>
            <div class="rounded-lg border border-border-DEFAULT dark:border-border-dark p-4">
              <h4 class="mb-2 font-semibold text-primary-600 dark:text-primary-400">Responsive Design</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Optimized for all devices with touch-friendly targets and adaptive layouts.
              </p>
            </div>
            <div class="rounded-lg border border-border-DEFAULT dark:border-border-dark p-4">
              <h4 class="mb-2 font-semibold text-primary-600 dark:text-primary-400">Advanced Interactions</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Enhanced with ripple effects, touch gestures, and smooth animations for modern UX.
              </p>
            </div>
            <div class="rounded-lg border border-border-DEFAULT dark:border-border-dark p-4">
              <h4 class="mb-2 font-semibold text-primary-600 dark:text-primary-400">Performance Optimized</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Memoized computations and efficient state management for smooth operation.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 class="mb-3 text-xl font-semibold">When to Use</h3>
          <ul class="space-y-2 text-gray-600 dark:text-gray-400">
            <li class="flex items-start">
              <span class="mr-2 text-primary-500">•</span>
              <span>When users need to select a specific time for appointments, schedules, or events</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 text-primary-500">•</span>
              <span>In forms requiring time input with validation</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 text-primary-500">•</span>
              <span>For time range selection when paired with another TimePicker</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 text-primary-500">•</span>
              <span>When you need consistent time input across different locales and formats</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 text-primary-500">•</span>
              <span>For international applications requiring timezone-aware time selection</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 text-primary-500">•</span>
              <span>In mobile-first applications where touch optimization is crucial</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 text-primary-500">•</span>
              <span>When building accessible applications for diverse user needs</span>
            </li>
          </ul>
        </section>

        <section>
          <h3 class="mb-3 text-xl font-semibold">Visual Variants</h3>
          <p class="mb-4 text-gray-600 dark:text-gray-400">
            The TimePicker comes with three visual variants to match your design system:
          </p>
          <div class="space-y-3">
            <div class="flex items-center space-x-3">
              <div class="h-10 w-32 rounded-lg border border-border-DEFAULT dark:border-border-dark bg-surface-DEFAULT dark:bg-surface-dark"></div>
              <div>
                <span class="font-medium">Default</span>
                <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">Standard bordered style</span>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <div class="h-10 w-32 rounded-lg border-2 border-border-DEFAULT dark:border-border-dark bg-transparent"></div>
              <div>
                <span class="font-medium">Outline</span>
                <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">Prominent border with transparent background</span>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <div class="h-10 w-32 rounded-lg bg-gray-100 dark:bg-gray-800"></div>
              <div>
                <span class="font-medium">Filled</span>
                <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">Solid background with no border</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 class="mb-3 text-xl font-semibold">Size Options</h3>
          <p class="mb-4 text-gray-600 dark:text-gray-400">
            Three size options are available to fit different UI contexts:
          </p>
          <div class="flex items-end space-x-4">
            <div class="text-center">
              <div class="mb-2 h-8 w-24 rounded-lg border border-border-DEFAULT dark:border-border-dark"></div>
              <span class="text-sm">Small</span>
            </div>
            <div class="text-center">
              <div class="mb-2 h-10 w-28 rounded-lg border border-border-DEFAULT dark:border-border-dark"></div>
              <span class="text-sm">Medium</span>
            </div>
            <div class="text-center">
              <div class="mb-2 h-12 w-32 rounded-lg border border-border-DEFAULT dark:border-border-dark"></div>
              <span class="text-sm">Large</span>
            </div>
          </div>
        </section>

        <section>
          <h3 class="mb-3 text-xl font-semibold">Advanced Capabilities</h3>
          <div class="grid gap-4 md:grid-cols-2 mb-6">
            <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">🌍 Timezone Support</h4>
              <p class="text-sm text-blue-800 dark:text-blue-200">
                Built-in timezone conversion capabilities for international applications and meeting scheduling.
              </p>
            </div>
            <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">⚡ Range Validation</h4>
              <p class="text-sm text-green-800 dark:text-green-200">
                Advanced time range validation with duration constraints and real-time feedback.
              </p>
            </div>
            <div class="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">📱 Touch Optimized</h4>
              <p class="text-sm text-purple-800 dark:text-purple-200">
                Auto-detecting touch devices with enhanced interactions, haptic feedback, and larger touch targets.
              </p>
            </div>
            <div class="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <h4 class="font-semibold text-orange-900 dark:text-orange-100 mb-2">🎨 Enhanced UX</h4>
              <p class="text-sm text-orange-800 dark:text-orange-200">
                Ripple effects, press animations, and smooth transitions for a modern, polished experience.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 class="mb-3 text-xl font-semibold">Best Practices</h3>
          <ul class="space-y-2 text-gray-600 dark:text-gray-400">
            <li class="flex items-start">
              <span class="mr-2 text-success-500">✓</span>
              <span>Use appropriate time format based on user locale and preferences</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 text-success-500">✓</span>
              <span>Provide clear labels and helper text for time inputs</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 text-success-500">✓</span>
              <span>Use minute steps that make sense for your use case (e.g., 15 minutes for appointments)</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 text-success-500">✓</span>
              <span>Include validation feedback with clear error messages</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 text-success-500">✓</span>
              <span>Enable touch optimization for mobile users when appropriate</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 text-success-500">✓</span>
              <span>Consider timezone implications for international applications</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 text-error-500">✗</span>
              <span>Don't use seconds unless absolutely necessary</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 text-error-500">✗</span>
              <span>Avoid disabling too many time options as it can confuse users</span>
            </li>
          </ul>
        </section>
      </div>
    </OverviewTemplate>
  );
});