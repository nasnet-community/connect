import { component$, $, useSignal } from "@builder.io/qwik";
import { ToastContainer } from "~/components/Core/Feedback/Toast/ToastContainer";
import { useToast } from "~/components/Core/Feedback/Toast/useToast";
import type { ToastPosition } from "~/components/Core/Feedback/Toast/Toast.types";

export default component$(() => {
  const toast = useToast();
  const currentPosition = useSignal<ToastPosition>("bottom-right");

  // Handler for showing various toast types
  const showToast = $(
    async (type: "info" | "success" | "warning" | "error" | "loading") => {
      const messages = {
        info: "This is an information message",
        success: "Operation completed successfully",
        warning: "Please review before proceeding",
        error: "An error occurred while processing your request",
        loading: "Processing your request...",
      };

      const titles = {
        info: "Information",
        success: "Success",
        warning: "Warning",
        error: "Error",
        loading: "Loading",
      };

      if (type === "info") {
        toast.info(messages.info, { title: titles.info });
      } else if (type === "success") {
        toast.success(messages.success, { title: titles.success });
      } else if (type === "warning") {
        toast.warning(messages.warning, { title: titles.warning });
      } else if (type === "error") {
        toast.error(messages.error, { title: titles.error });
      } else if (type === "loading") {
        const loadingId = await toast.loading(messages.loading, {
          title: titles.loading,
        });

        // After 3 seconds, update the loading toast to a success toast
        setTimeout(() => {
          toast.update(loadingId, {
            status: "success",
            loading: false,
            title: "Completed",
            message: "Request processed successfully!",
            persistent: false,
            duration: 3000,
          });
        }, 3000);
      }
    },
  );

  // Show toast with action button
  const showActionToast = $(() => {
    toast.show({
      status: "info",
      title: "New feature available",
      message: "Try out our new dashboard experience",
      actionLabel: "Try it now",
      onAction$: $((id: string) => {
        toast.dismiss(id);
        toast.success("Welcome to the new dashboard!");
      }),
      duration: 8000,
    });
  });

  // Show persistent toast
  const showPersistentToast = $(() => {
    toast.show({
      status: "warning",
      title: "Session expiring soon",
      message: "Your session will expire in 5 minutes",
      persistent: true,
      actionLabel: "Extend session",
      onAction$: $((id: string) => {
        toast.dismiss(id);
        toast.success("Session extended by 1 hour");
      }),
    });
  });

  // Dismiss all toasts
  const dismissAllToasts = $(() => {
    toast.dismissAll();
  });

  // Change position
  const changePosition = $((position: ToastPosition) => {
    toast.dismissAll();
    currentPosition.value = position;
    toast.info(
      `Position changed to ${position}. Try swiping to dismiss on mobile!`,
      {
        title: "Position Updated",
        swipeable: true,
        position: position,
      },
    );
  });

  // Show mobile-optimized toast
  const showMobileToast = $(() => {
    toast.show({
      status: "success",
      title: "Mobile Optimized",
      message: "Swipe to dismiss on touch devices",
      swipeable: true,
      size: "md",
      variant: "solid",
      position: currentPosition.value,
      duration: 8000,
    });
  });

  // Show different variants
  const showVariantToast = $((variant: "solid" | "outline" | "subtle") => {
    toast.show({
      status: "info",
      title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Variant`,
      message: "This toast uses theme-based colors",
      variant: variant,
      swipeable: true,
      position: currentPosition.value,
    });
  });

  return (
    <div class="space-y-6 p-6">
      <h2 class="mb-4 text-xl font-semibold">Toast Component Examples</h2>

      {/* Toast Type Examples */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Toast Types</h3>
        <div class="flex flex-wrap gap-3">
          <button
            onClick$={() => showToast("info")}
            class="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            Show Info Toast
          </button>

          <button
            onClick$={() => showToast("success")}
            class="rounded-md bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
          >
            Show Success Toast
          </button>

          <button
            onClick$={() => showToast("warning")}
            class="rounded-md bg-yellow-500 px-4 py-2 text-white transition-colors hover:bg-yellow-600"
          >
            Show Warning Toast
          </button>

          <button
            onClick$={() => showToast("error")}
            class="rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
          >
            Show Error Toast
          </button>

          <button
            onClick$={() => showToast("loading")}
            class="rounded-md bg-purple-500 px-4 py-2 text-white transition-colors hover:bg-purple-600"
          >
            Show Loading Toast
          </button>
        </div>
      </div>

      {/* Toast with Actions */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Toasts with Actions</h3>
        <div class="flex flex-wrap gap-3">
          <button
            onClick$={showActionToast}
            class="rounded-md bg-indigo-500 px-4 py-2 text-white transition-colors hover:bg-indigo-600"
          >
            Toast with Action Button
          </button>

          <button
            onClick$={showPersistentToast}
            class="rounded-md bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600"
          >
            Persistent Toast
          </button>
        </div>
      </div>

      {/* Position Options */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Position Options</h3>
        <div class="grid grid-cols-3 gap-3">
          <button
            onClick$={() => changePosition("top-left")}
            class="rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300"
          >
            Top Left
          </button>

          <button
            onClick$={() => changePosition("top-center")}
            class="rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300"
          >
            Top Center
          </button>

          <button
            onClick$={() => changePosition("top-right")}
            class="rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300"
          >
            Top Right
          </button>

          <button
            onClick$={() => changePosition("bottom-left")}
            class="rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300"
          >
            Bottom Left
          </button>

          <button
            onClick$={() => changePosition("bottom-center")}
            class="rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300"
          >
            Bottom Center
          </button>

          <button
            onClick$={() => changePosition("bottom-right")}
            class="rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300"
          >
            Bottom Right
          </button>
        </div>
      </div>

      {/* Mobile Features */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Mobile Features</h3>
        <div class="flex flex-wrap gap-3">
          <button
            onClick$={showMobileToast}
            class="rounded-md bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
          >
            Mobile Optimized Toast
          </button>
        </div>
      </div>

      {/* Theme Variants */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Theme Variants</h3>
        <div class="flex flex-wrap gap-3">
          <button
            onClick$={() => showVariantToast("solid")}
            class="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            Solid Variant
          </button>
          <button
            onClick$={() => showVariantToast("outline")}
            class="rounded-md border-2 border-blue-500 bg-transparent px-4 py-2 text-blue-500 transition-colors hover:bg-blue-50"
          >
            Outline Variant
          </button>
          <button
            onClick$={() => showVariantToast("subtle")}
            class="rounded-md bg-blue-100 px-4 py-2 text-blue-700 transition-colors hover:bg-blue-200"
          >
            Subtle Variant
          </button>
        </div>
      </div>

      {/* Other Controls */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Other Controls</h3>
        <button
          onClick$={dismissAllToasts}
          class="rounded-md bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
        >
          Dismiss All Toasts
        </button>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position={currentPosition.value}
        limit={5}
        gap="md"
        defaultDuration={5000}
      />

      {/* Feature notes */}
      <div class="mt-12 space-y-6">
        <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <h3 class="text-lg font-medium text-blue-800 dark:text-blue-200">
            Accessibility Features
          </h3>
          <ul class="ml-5 mt-2 list-disc space-y-1 text-blue-700 dark:text-blue-300">
            <li>
              Uses{" "}
              <code class="rounded bg-blue-100 px-1 dark:bg-blue-800/50">
                aria-live
              </code>{" "}
              regions for screen reader announcements
            </li>
            <li>
              Provides keyboard access with Alt+T to focus the most recent toast
            </li>
            <li>Escape key to dismiss all toasts when focused</li>
            <li>Uses appropriate roles and ARIA attributes</li>
            <li>Progress indicators for auto-dismissal timing</li>
            <li>Pause auto-dismiss on hover for better usability</li>
            <li>High contrast colors and clear focus indicators</li>
          </ul>
        </div>

        <div class="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
          <h3 class="text-lg font-medium text-green-800 dark:text-green-200">
            Mobile Optimizations
          </h3>
          <ul class="ml-5 mt-2 list-disc space-y-1 text-green-700 dark:text-green-300">
            <li>Swipe-to-dismiss gestures (direction based on position)</li>
            <li>Touch-friendly dismiss buttons (44px minimum touch targets)</li>
            <li>Responsive sizing for mobile screens</li>
            <li>Full-width toasts on mobile, positioned toasts on desktop</li>
            <li>Optimized animations for touch interactions</li>
            <li>Visual feedback during swipe gestures</li>
          </ul>
        </div>

        <div class="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
          <h3 class="text-lg font-medium text-purple-800 dark:text-purple-200">
            Theme Integration
          </h3>
          <ul class="ml-5 mt-2 list-disc space-y-1 text-purple-700 dark:text-purple-300">
            <li>Uses theme-based color system for consistent styling</li>
            <li>Supports solid, outline, and subtle variants</li>
            <li>Responsive typography and spacing</li>
            <li>Automatic dark mode support</li>
            <li>Progress bar colors match toast status</li>
            <li>Backdrop blur effects for modern appearance</li>
          </ul>
        </div>
      </div>
    </div>
  );
});
