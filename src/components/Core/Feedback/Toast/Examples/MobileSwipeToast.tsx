import { component$, useSignal, $ } from "@builder.io/qwik";
import { Toast } from "../Toast";
import type { ToastPosition, ToastStatus } from "../Toast.types";

/**
 * Example demonstrating mobile-optimized toasts with swipe-to-dismiss gestures
 *
 * Features:
 * - Swipe gestures in the appropriate direction based on position
 * - Touch-friendly dismiss buttons
 * - Responsive sizing for mobile devices
 * - Position variants optimized for mobile
 */
export const MobileSwipeToast = component$(() => {
  const toasts = useSignal<
    Array<{
      id: string;
      status: ToastStatus;
      title: string;
      message: string;
      position: ToastPosition;
    }>
  >([]);

  const nextId = useSignal(1);

  const showToast = $((position: ToastPosition, status: ToastStatus) => {
    const id = `mobile-toast-${nextId.value++}`;
    const positionDescriptions = {
      "top-left": "Swipe left to dismiss",
      "top-center": "Swipe up to dismiss",
      "top-right": "Swipe right to dismiss",
      "bottom-left": "Swipe left to dismiss",
      "bottom-center": "Swipe down to dismiss",
      "bottom-right": "Swipe right to dismiss",
    };

    toasts.value = [
      ...toasts.value,
      {
        id,
        status,
        title: `${status.charAt(0).toUpperCase() + status.slice(1)} Toast`,
        message: positionDescriptions[position],
        position,
      },
    ];
  });

  const dismissToast = $((id: string) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  });

  const positions: ToastPosition[] = [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ];

  const statuses: ToastStatus[] = ["info", "success", "warning", "error"];

  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-4 text-lg font-semibold">
          Mobile Toast with Swipe Gestures
        </h3>
        <p class="mb-6 text-sm text-gray-600 dark:text-gray-400">
          On mobile devices, swipe in the indicated direction to dismiss toasts.
          The swipe direction depends on the toast position.
        </p>
      </div>

      <div class="grid gap-4 mobile:grid-cols-1 tablet:grid-cols-2">
        <div>
          <h4 class="mb-3 text-sm font-medium">Position Variants</h4>
          <div class="grid grid-cols-2 gap-2">
            {positions.map((position) => (
              <button
                key={position}
                class="rounded-md bg-gray-100 px-3 py-2 text-xs font-medium transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                onClick$={() => showToast(position, "info")}
              >
                {position}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 class="mb-3 text-sm font-medium">Status Variants</h4>
          <div class="grid grid-cols-2 gap-2">
            {statuses.map((status) => (
              <button
                key={status}
                class={`rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                  {
                    info: "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50",
                    success:
                      "bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50",
                    warning:
                      "bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50",
                    error:
                      "bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50",
                  }[status]
                }`}
                onClick$={() => showToast("bottom-center", status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h4 class="text-sm font-medium">Advanced Examples</h4>

        <div class="grid gap-3 mobile:grid-cols-1 tablet:grid-cols-2 lg:grid-cols-3">
          <button
            class="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow-md active:scale-95"
            onClick$={() => {
              const id = `mobile-toast-${nextId.value++}`;
              toasts.value = [
                ...toasts.value,
                {
                  id,
                  status: "info",
                  title: "With Action Button",
                  message: "This toast includes an interactive action button",
                  position: "top-center",
                },
              ];
            }}
          >
            <div class="flex items-center gap-2">
              <span>💱</span>
              <span>Toast with Action</span>
            </div>
          </button>

          <button
            class="rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all hover:from-purple-600 hover:to-purple-700 hover:shadow-md active:scale-95"
            onClick$={() => {
              const id = `mobile-toast-${nextId.value++}`;
              toasts.value = [
                ...toasts.value,
                {
                  id,
                  status: "warning",
                  title: "Persistent Toast",
                  message: "This toast won't auto-dismiss and requires manual dismissal",
                  position: "bottom-center",
                },
              ];
            }}
          >
            <div class="flex items-center gap-2">
              <span>📌</span>
              <span>Persistent Toast</span>
            </div>
          </button>

          <button
            class="rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all hover:from-green-600 hover:to-green-700 hover:shadow-md active:scale-95"
            onClick$={() => {
              const id = `mobile-toast-${nextId.value++}`;
              toasts.value = [
                ...toasts.value,
                {
                  id,
                  status: "success",
                  title: "Loading State Demo",
                  message: "Watch this toast transform from loading to success",
                  position: "top-right",
                },
              ];
              // Simulate loading state transformation
              setTimeout(() => {
                toasts.value = toasts.value.map(t => 
                  t.id === id ? { ...t, title: "Success!", message: "Operation completed successfully" } : t
                );
              }, 2000);
            }}
          >
            <div class="flex items-center gap-2">
              <span>⏳</span>
              <span>Loading Demo</span>
            </div>
          </button>
        </div>
      </div>

      <div class="mt-8 space-y-4">
        <div class="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-900/20 dark:to-purple-900/20">
          <h4 class="mb-3 text-sm font-medium text-blue-900 dark:text-blue-100">
            Mobile Interaction Guide
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div class="space-y-2">
              <h5 class="font-medium text-blue-800 dark:text-blue-200">Swipe Gestures:</h5>
              <ul class="space-y-1 text-blue-700 dark:text-blue-300">
                <li>• Top toasts: Swipe up or sideways to dismiss</li>
                <li>• Bottom toasts: Swipe down or sideways to dismiss</li>
                <li>• Center toasts: Swipe in any direction</li>
                <li>• Velocity detection for quick swipes</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h5 class="font-medium text-blue-800 dark:text-blue-200">Touch Features:</h5>
              <ul class="space-y-1 text-blue-700 dark:text-blue-300">
                <li>• Touch and hold to pause auto-dismiss</li>
                <li>• 44px minimum touch targets</li>
                <li>• Haptic feedback support</li>
                <li>• Safe area awareness</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="rounded-lg bg-amber-50 p-4 dark:bg-amber-900/20">
          <h4 class="mb-2 text-sm font-medium text-amber-900 dark:text-amber-100">
            Performance Optimizations
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-amber-800 dark:text-amber-200">
            <div class="rounded bg-amber-100 p-2 dark:bg-amber-800/30">
              <span class="font-medium">GPU Acceleration:</span> Transform3d animations
            </div>
            <div class="rounded bg-amber-100 p-2 dark:bg-amber-800/30">
              <span class="font-medium">Memory:</span> Efficient cleanup
            </div>
            <div class="rounded bg-amber-100 p-2 dark:bg-amber-800/30">
              <span class="font-medium">Battery:</span> Optimized timing
            </div>
          </div>
        </div>

        <div class="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
          <h4 class="mb-2 text-sm font-medium text-green-900 dark:text-green-100">
            Accessibility Features
          </h4>
          <ul class="space-y-1 text-xs text-green-700 dark:text-green-300">
            <li>• Screen reader announcements for toast content</li>
            <li>• Respects prefers-reduced-motion settings</li>
            <li>• Keyboard navigation support (Tab to focus, Enter to dismiss)</li>
            <li>• High contrast mode compatibility</li>
            <li>• Focus management for dismissible toasts</li>
          </ul>
        </div>
      </div>

      {/* Render toasts */}
      {toasts.value.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          status={toast.status}
          title={toast.title}
          message={toast.message}
          position={toast.position}
          onDismiss$={dismissToast}
          swipeable={true}
          size="md"
          duration={5000}
          actionLabel={
            toast.title === "With Action Button" ? "Undo" : undefined
          }
          onAction$={
            toast.title === "With Action Button"
              ? $(() => console.log("Action clicked"))
              : undefined
          }
          persistent={toast.title === "Persistent Toast"}
        />
      ))}
    </div>
  );
});

export default MobileSwipeToast;
