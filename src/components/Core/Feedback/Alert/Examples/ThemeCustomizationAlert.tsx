import { component$, useSignal } from "@builder.io/qwik";
import { Alert } from "~/components/Core/Feedback/Alert";

/**
 * Theme Customization Alert examples showcasing custom colors and responsive behavior.
 * 
 * Features demonstrated:
 * - Custom color schemes using Tailwind classes
 * - Responsive text and spacing
 * - Dark mode support
 * - Device-specific optimizations
 */
export const ThemeCustomizationAlert = component$(() => {
  const isDarkMode = useSignal(false);

  return (
    <div class="space-y-6">
      <div class="mb-4">
        <h3 class="text-lg font-semibold mb-2">Theme Customization Examples</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Showcase how to customize Alert components with Tailwind classes while maintaining 
          responsive behavior across devices.
        </p>
        
        {/* Dark Mode Toggle */}
        <button
          onClick$={() => {
            isDarkMode.value = !isDarkMode.value;
            document.documentElement.classList.toggle('dark');
          }}
          class="mb-4 px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {isDarkMode.value ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
      
      <div class="space-y-4">
        {/* Custom Primary Brand Alert */}
        <div>
          <h4 class="text-sm font-medium mb-2 text-primary-700 dark:text-primary-300">Brand Primary Alert</h4>
          <Alert
            status="info"
            title="Brand Update"
            message="Using primary brand colors from Tailwind config"
            dismissible
            class="bg-primary-50 text-primary-800 border-primary-200 dark:bg-primary-900 dark:text-primary-100 dark:border-primary-700"
          />
        </div>

        {/* Gradient Alert */}
        <div>
          <h4 class="text-sm font-medium mb-2">Gradient Background Alert</h4>
          <Alert
            status="success"
            title="Premium Feature"
            message="Enjoy our new premium features with a modern gradient design"
            dismissible
            class="bg-gradient-to-r from-primary-100 to-secondary-100 border-0 text-gray-800 dark:from-primary-900 dark:to-secondary-900 dark:text-gray-100"
          />
        </div>

        {/* Responsive Sizing Alert */}
        <div>
          <h4 class="text-sm font-medium mb-2">Responsive Sizing Alert</h4>
          <Alert
            status="warning"
            dismissible
            class="mobile:p-2 mobile:text-xs tablet:p-4 tablet:text-sm desktop:p-6 desktop:text-base"
          >
            <div>
              <p class="font-semibold mobile:mb-1 tablet:mb-2">Responsive Content</p>
              <p>This alert adapts its padding and text size based on screen size:</p>
              <ul class="mt-2 space-y-1 list-disc list-inside">
                <li>Mobile: Compact with small text</li>
                <li>Tablet: Medium padding and text</li>
                <li>Desktop: Generous spacing and larger text</li>
              </ul>
            </div>
          </Alert>
        </div>

        {/* Glass Morphism Alert */}
        <div>
          <h4 class="text-sm font-medium mb-2">Glass Morphism Alert</h4>
          <div class="p-6 rounded-lg bg-gradient-to-br from-blue-400 to-purple-600">
            <Alert
              status="info"
              title="Modern Glass Effect"
              message="This alert uses backdrop blur and transparency for a modern look"
              dismissible
              class="bg-white/20 backdrop-blur-md border-white/30 text-white"
              icon={false}
            />
          </div>
        </div>

        {/* Device-Specific Alert */}
        <div>
          <h4 class="text-sm font-medium mb-2">Device-Specific Styling</h4>
          <Alert
            status="error"
            dismissible
            class="touch:min-h-[60px] touch:shadow-lg can-hover:hover:shadow-xl transition-shadow"
          >
            <div>
              <p class="font-semibold">Touch vs Mouse Optimized</p>
              <p class="mt-1 text-sm">
                <span class="touch:inline can-hover:hidden">
                  📱 Touch device detected - Enhanced touch targets
                </span>
                <span class="touch:hidden can-hover:inline">
                  🖱️ Mouse device detected - Hover effects enabled
                </span>
              </p>
            </div>
          </Alert>
        </div>
      </div>

      {/* Responsive Guidelines */}
      <div class="mt-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
          <span>🎨</span>
          Customization Tips
        </h4>
        <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div class="flex items-start gap-2">
            <span class="text-primary-500 mt-0.5">•</span>
            <span>Use Tailwind's color palette for consistent theming</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-primary-500 mt-0.5">•</span>
            <span>Leverage responsive prefixes (mobile:, tablet:, desktop:) for adaptive designs</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-primary-500 mt-0.5">•</span>
            <span>Combine utility classes with the component's built-in variants</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-primary-500 mt-0.5">•</span>
            <span>Use touch: and can-hover: for device-specific optimizations</span>
          </div>
        </div>
      </div>
    </div>
  );
});