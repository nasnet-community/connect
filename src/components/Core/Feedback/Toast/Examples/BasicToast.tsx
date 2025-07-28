import { component$, $ } from "@builder.io/qwik";
import { ToastContainer } from "~/components/Core/Feedback/Toast/ToastContainer";
import { useToast } from "~/components/Core/Feedback/Toast/useToast";

/**
 * Basic Toast examples showcasing different status types with mobile-optimized features.
 * 
 * Features demonstrated:
 * - All status types (info, success, warning, error)
 * - Mobile-optimized positioning and swipe gestures
 * - Touch-friendly buttons with proper sizing
 * - Auto-dismiss with customizable durations
 */
export const BasicToast = component$(() => {
  const toast = useToast();

  const showInfoToast = $(() => {
    toast.info("Your router configuration has been updated successfully", {
      title: "Configuration Updated",
      duration: 5000,
    });
  });

  const showSuccessToast = $(() => {
    toast.success("VPN connection established with optimal encryption settings", {
      title: "Connection Successful",
      duration: 4000,
    });
  });

  const showWarningToast = $(() => {
    toast.warning("Firmware update available - update recommended for security", {
      title: "Update Available",
      duration: 7000,
    });
  });

  const showErrorToast = $(() => {
    toast.error("Unable to connect to router - please check network settings", {
      title: "Connection Failed",
      duration: 8000,
    });
  });

  return (
    <div class="space-y-6">
      <div class="mb-4">
        <h3 class="text-lg font-semibold mb-2">Basic Toast Notifications</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Mobile-optimized toast notifications with swipe-to-dismiss gestures, 
          responsive positioning, and touch-friendly interactions.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          onClick$={showInfoToast}
          class="group rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 text-white transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <div class="flex items-center gap-2">
            <span class="text-lg">ℹ️</span>
            <div class="text-left">
              <div class="font-medium text-sm">Info Toast</div>
              <div class="text-xs opacity-80">Configuration update</div>
            </div>
          </div>
        </button>

        <button
          onClick$={showSuccessToast}
          class="group rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 text-white transition-all hover:from-green-600 hover:to-green-700 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <div class="flex items-center gap-2">
            <span class="text-lg">✅</span>
            <div class="text-left">
              <div class="font-medium text-sm">Success Toast</div>
              <div class="text-xs opacity-80">VPN connected</div>
            </div>
          </div>
        </button>

        <button
          onClick$={showWarningToast}
          class="group rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 px-4 py-3 text-white transition-all hover:from-yellow-600 hover:to-yellow-700 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
        >
          <div class="flex items-center gap-2">
            <span class="text-lg">⚠️</span>
            <div class="text-left">
              <div class="font-medium text-sm">Warning Toast</div>
              <div class="text-xs opacity-80">Update available</div>
            </div>
          </div>
        </button>

        <button
          onClick$={showErrorToast}
          class="group rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-4 py-3 text-white transition-all hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <div class="flex items-center gap-2">
            <span class="text-lg">❌</span>
            <div class="text-left">
              <div class="font-medium text-sm">Error Toast</div>
              <div class="text-xs opacity-80">Connection failed</div>
            </div>
          </div>
        </button>
      </div>

      <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
          <span>📱</span>
          Mobile-Optimized Features
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <h5 class="text-sm font-medium text-gray-800 dark:text-gray-200">Touch Interactions:</h5>
            <ul class="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <li class="flex items-start gap-2">
                <span class="text-green-500 mt-0.5">✓</span>
                <span>Swipe gestures to dismiss toasts</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-500 mt-0.5">✓</span>
                <span>Touch-friendly 44px+ button targets</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-500 mt-0.5">✓</span>
                <span>Tap outside to pause auto-dismiss</span>
              </li>
            </ul>
          </div>
          <div class="space-y-2">
            <h5 class="text-sm font-medium text-gray-800 dark:text-gray-200">Responsive Design:</h5>
            <ul class="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <li class="flex items-start gap-2">
                <span class="text-green-500 mt-0.5">✓</span>
                <span>Intelligent positioning for screen size</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-500 mt-0.5">✓</span>
                <span>Safe area support for modern devices</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-500 mt-0.5">✓</span>
                <span>Hardware-accelerated animations</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* For standalone testing - in real application, ToastContainer should be at the app root */}
      <ToastContainer position="bottom-right" limit={3} />
    </div>
  );
});
