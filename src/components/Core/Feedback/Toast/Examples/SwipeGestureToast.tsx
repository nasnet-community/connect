import { component$, useSignal, $ } from "@builder.io/qwik";
import { ToastContainer } from "~/components/Core/Feedback/Toast/ToastContainer";
import { useToast } from "~/components/Core/Feedback/Toast/useToast";

/**
 * Swipe Gesture Toast examples showcasing mobile touch interactions.
 * 
 * Features demonstrated:
 * - Swipe to dismiss functionality
 * - Different swipe directions based on position
 * - Touch feedback and visual indicators
 * - Responsive positioning
 */
export const SwipeGestureToast = component$(() => {
  const toastPosition = useSignal<"top-right" | "top-left" | "bottom-right" | "bottom-left">("top-right");
  const swipeEnabled = useSignal(true);
  
  const toast = useToast();

  const showToast = $(async (position: typeof toastPosition.value) => {
    toastPosition.value = position;
    
    const swipeDirection = position.includes('right') ? 'left' : 'right';
    const verticalDirection = position.includes('top') ? 'down' : 'up';
    
    await toast.info(`Swipe ${swipeDirection} or ${verticalDirection} to dismiss this toast`, {
      title: "Swipe to Dismiss",
      position,
      swipeable: swipeEnabled.value,
      duration: 10000, // Longer duration for testing
    });
  });

  return (
    <div class="space-y-6">
      <div class="mb-4">
        <h3 class="text-lg font-semibold mb-2">Mobile Swipe Gestures</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Test swipe-to-dismiss functionality on touch devices. The swipe direction 
          adapts based on toast position.
        </p>
      </div>

      {/* Controls */}
      <div class="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div class="flex items-center space-x-2">
          <input
            type="checkbox"
            id="swipe-enabled"
            checked={swipeEnabled.value}
            onChange$={(e) => swipeEnabled.value = (e.target as HTMLInputElement).checked}
            class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label for="swipe-enabled" class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Enable Swipe Gestures
          </label>
        </div>
      </div>

      {/* Position Grid */}
      <div class="grid grid-cols-2 gap-4">
        <button
          onClick$={() => showToast("top-left")}
          class="p-4 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary-400 transition-colors"
        >
          <div class="flex flex-col items-center">
            <span class="text-2xl mb-2">↖️</span>
            <span class="font-medium">Top Left</span>
            <span class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Swipe right or down
            </span>
          </div>
        </button>

        <button
          onClick$={() => showToast("top-right")}
          class="p-4 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary-400 transition-colors"
        >
          <div class="flex flex-col items-center">
            <span class="text-2xl mb-2">↗️</span>
            <span class="font-medium">Top Right</span>
            <span class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Swipe left or down
            </span>
          </div>
        </button>

        <button
          onClick$={() => showToast("bottom-left")}
          class="p-4 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary-400 transition-colors"
        >
          <div class="flex flex-col items-center">
            <span class="text-2xl mb-2">↙️</span>
            <span class="font-medium">Bottom Left</span>
            <span class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Swipe right or up
            </span>
          </div>
        </button>

        <button
          onClick$={() => showToast("bottom-right")}
          class="p-4 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary-400 transition-colors"
        >
          <div class="flex flex-col items-center">
            <span class="text-2xl mb-2">↘️</span>
            <span class="font-medium">Bottom Right</span>
            <span class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Swipe left or up
            </span>
          </div>
        </button>
      </div>

      {/* Mobile Gesture Demo */}
      <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-2">
          📱 Mobile Testing Tips
        </h4>
        <ul class="space-y-1 text-sm text-blue-700 dark:text-blue-300">
          <li>• Open DevTools and enable device emulation</li>
          <li>• Select a touch-enabled device (e.g., iPhone, iPad)</li>
          <li>• Click buttons to show toasts at different positions</li>
          <li>• Use touch/drag gestures to swipe toasts away</li>
          <li>• Notice the swipe direction changes based on position</li>
        </ul>
      </div>

      {/* Advanced Features */}
      <div class="space-y-4">
        <h4 class="font-medium text-gray-900 dark:text-gray-100">Advanced Toast Examples</h4>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick$={async () => {
              await toast.warning("This action cannot be undone", {
                title: "Confirm Action",
                actionLabel: "Undo",
                onAction$: $((id: string) => console.log("Action clicked:", id)),
                persistent: true,
                swipeable: true,
              });
            }}
            class="px-4 py-2 bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-100 rounded-md hover:bg-warning-200 dark:hover:bg-warning-800 transition-colors"
          >
            Toast with Action
          </button>

          <button
            onClick$={async () => {
              await toast.info("Please wait while we process your request", {
                title: "Processing...",
                loading: true,
                persistent: true,
                swipeable: false,
              });
            }}
            class="px-4 py-2 bg-info-100 text-info-800 dark:bg-info-900 dark:text-info-100 rounded-md hover:bg-info-200 dark:hover:bg-info-800 transition-colors"
          >
            Loading Toast
          </button>
        </div>
      </div>

      {/* Visual Guide */}
      <div class="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-3">
          Swipe Gesture Visual Guide
        </h4>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="text-2xl">👆</span>
              <span>Swipe Up: Dismiss bottom toasts</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-2xl">👇</span>
              <span>Swipe Down: Dismiss top toasts</span>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="text-2xl">👈</span>
              <span>Swipe Left: Dismiss right toasts</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-2xl">👉</span>
              <span>Swipe Right: Dismiss left toasts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container - Required for toasts to appear */}
      <ToastContainer position={toastPosition.value} />
    </div>
  );
});