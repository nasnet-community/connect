import { component$ } from "@builder.io/qwik";
import { Popover } from "../Popover";

/**
 * Mobile-optimized Popover examples showing touch-friendly interactions
 */
export const MobileInteractionPopover = component$(() => {
  return (
    <div class="space-y-8 p-4">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Mobile Fullscreen Popover</h3>
        <div class="flex justify-center">
          <Popover
            trigger="click"
            mobileFullscreen={true}
            touchOptimized={true}
            size="md"
            surfaceElevation="elevated"
            animationType="slideUp"
          >
            <button
              slot="trigger"
              class="rounded-lg bg-primary-500 px-6 py-3 text-white hover:bg-primary-600 active:bg-primary-700"
            >
              Open Mobile Menu
            </button>
            <div class="space-y-4">
              <h4 class="text-lg font-semibold">Mobile Menu</h4>
              <div class="grid gap-3">
                <button class="w-full rounded-lg bg-gray-100 px-4 py-3 text-left hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
                  Account Settings
                </button>
                <button class="w-full rounded-lg bg-gray-100 px-4 py-3 text-left hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
                  Notifications
                </button>
                <button class="w-full rounded-lg bg-gray-100 px-4 py-3 text-left hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
                  Privacy
                </button>
                <button class="w-full rounded-lg bg-red-100 px-4 py-3 text-left text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300">
                  Sign Out
                </button>
              </div>
            </div>
          </Popover>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Touch-Optimized Form Popover</h3>
        <div class="flex justify-center">
          <Popover
            trigger="click"
            touchOptimized={true}
            size="lg"
            surfaceElevation="elevated"
            animationType="scaleUp"
            mobileFullscreen={false}
          >
            <button
              slot="trigger"
              class="rounded-lg border-2 border-dashed border-gray-300 px-6 py-3 text-gray-600 hover:border-gray-400 hover:text-gray-700 dark:border-gray-600 dark:text-gray-400"
            >
              Add Network Config
            </button>
            <div class="w-full max-w-sm space-y-4">
              <h4 class="text-lg font-semibold">Network Configuration</h4>
              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Network Name
                  </label>
                  <input
                    type="text"
                    class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-base dark:border-gray-600 dark:bg-gray-700"
                    placeholder="Enter network name"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    IP Range
                  </label>
                  <input
                    type="text"
                    class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-base dark:border-gray-600 dark:bg-gray-700"
                    placeholder="192.168.1.0/24"
                  />
                </div>
                <div class="flex space-x-3 pt-2">
                  <button class="flex-1 rounded-lg bg-primary-500 px-4 py-3 text-white hover:bg-primary-600 active:bg-primary-700">
                    Save
                  </button>
                  <button class="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </Popover>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Quick Action Popover</h3>
        <div class="flex justify-center">
          <Popover
            trigger="click"
            touchOptimized={true}
            size="sm"
            surfaceElevation="elevated"
            animationType="fadeIn"
            placement="top"
          >
            <button
              slot="trigger"
              class="rounded-full bg-blue-500 p-4 text-white shadow-lg hover:bg-blue-600 active:bg-blue-700"
              aria-label="Quick Actions"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
            <div class="space-y-2">
              <button class="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg class="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Rule</span>
              </button>
              <button class="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M9 12l2 2 4-4" />
                </svg>
                <span>Test Config</span>
              </button>
              <button class="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg class="h-5 w-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span>Export</span>
              </button>
            </div>
          </Popover>
        </div>
      </div>

      <div class="space-y-4">
        <div class="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800">
          <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
            <span>📱</span>
            Mobile Interaction Features
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div class="space-y-2">
              <h5 class="font-medium text-blue-700 dark:text-blue-300">Touch Optimization:</h5>
              <ul class="space-y-1 text-blue-600 dark:text-blue-400">
                <li>• 44px+ touch targets for accessibility</li>
                <li>• Tap-to-close outside popover area</li>
                <li>• Touch-friendly scrolling in large content</li>
                <li>• Haptic feedback on supported devices</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h5 class="font-medium text-blue-700 dark:text-blue-300">Responsive Behavior:</h5>
              <ul class="space-y-1 text-blue-600 dark:text-blue-400">
                <li>• Fullscreen mode on small screens</li>
                <li>• Intelligent positioning and overflow handling</li>
                <li>• Smooth hardware-accelerated animations</li>
                <li>• Safe area support for modern devices</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="rounded-lg bg-green-50 p-4 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <h4 class="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
            <span>🎨</span>
            Visual Design System
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div class="rounded bg-white/60 p-3 dark:bg-black/20">
              <h6 class="font-medium text-green-700 dark:text-green-300 mb-1">Surface Elevation</h6>
              <p class="text-green-600 dark:text-green-400">Subtle shadows and blur effects create visual depth hierarchy</p>
            </div>
            <div class="rounded bg-white/60 p-3 dark:bg-black/20">
              <h6 class="font-medium text-green-700 dark:text-green-300 mb-1">Animation Types</h6>
              <p class="text-green-600 dark:text-green-400">slideUp, scaleUp, fadeIn with spring physics</p>
            </div>
            <div class="rounded bg-white/60 p-3 dark:bg-black/20">
              <h6 class="font-medium text-green-700 dark:text-green-300 mb-1">Theme Integration</h6>
              <p class="text-green-600 dark:text-green-400">Automatic dark/light mode with consistent styling</p>
            </div>
          </div>
        </div>

        <div class="rounded-lg bg-amber-50 p-4 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <div class="flex items-start gap-3">
            <span class="text-amber-500 text-xl">💡</span>
            <div>
              <h4 class="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                Performance & Accessibility
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-amber-700 dark:text-amber-300">
                <div>
                  <h6 class="font-medium mb-1">Performance:</h6>
                  <ul class="space-y-1 text-xs">
                    <li>✓ GPU-accelerated animations</li>
                    <li>✓ Lazy rendering for large content</li>
                    <li>✓ Optimized event handling</li>
                  </ul>
                </div>
                <div>
                  <h6 class="font-medium mb-1">Accessibility:</h6>
                  <ul class="space-y-1 text-xs">
                    <li>✓ ARIA labels and roles</li>
                    <li>✓ Keyboard navigation support</li>
                    <li>✓ Screen reader compatibility</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});