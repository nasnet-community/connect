import { component$, useSignal, $ } from "@builder.io/qwik";
import { Toast } from "../Toast";
import type { ToastStatus } from "../Toast.types";

/**
 * Example showcasing different toast variants and styles
 *
 * Features:
 * - Solid, outline, and subtle variants
 * - Different sizes (sm, md, lg)
 * - Loading states
 * - Custom icons
 */
export const ToastVariants = component$(() => {
  const toasts = useSignal<
    Array<{
      id: string;
      status: ToastStatus;
      title: string;
      message: string;
      variant: "solid" | "outline" | "subtle";
      size: "sm" | "md" | "lg";
      loading?: boolean;
    }>
  >([]);

  const nextId = useSignal(1);

  const showToast = $(
    (
      variant: "solid" | "outline" | "subtle",
      size: "sm" | "md" | "lg",
      status: ToastStatus,
      loading = false,
    ) => {
      const id = `variant-toast-${nextId.value++}`;
      toasts.value = [
        ...toasts.value,
        {
          id,
          status,
          title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} ${size.toUpperCase()} Toast`,
          message: loading
            ? "Processing your request..."
            : `This is a ${variant} toast in ${size} size`,
          variant,
          size,
          loading,
        },
      ];
    },
  );

  const dismissToast = $((id: string) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  });

  const variants: Array<"solid" | "outline" | "subtle"> = [
    "solid",
    "outline",
    "subtle",
  ];
  const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];
  const statuses: ToastStatus[] = ["info", "success", "warning", "error"];

  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-4 text-lg font-semibold">Toast Variants & Styles</h3>
        <p class="mb-6 text-sm text-gray-600 dark:text-gray-400">
          Explore different visual styles and sizes for toast notifications. All
          variants support theme colors and are fully responsive.
        </p>
      </div>

      <div class="space-y-6">
        <div>
          <h4 class="mb-3 text-sm font-medium">Variant Styles</h4>
          <div class="grid grid-cols-3 gap-3">
            {variants.map((variant) => (
              <div key={variant} class="space-y-2">
                <p class="text-xs capitalize text-gray-500 dark:text-gray-400">
                  {variant}
                </p>
                <div class="space-y-1">
                  {statuses.map((status) => (
                    <button
                      key={`${variant}-${status}`}
                      class="w-full rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                      onClick$={() => showToast(variant, "md", status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 class="mb-3 text-sm font-medium">Size Variants</h4>
          <div class="grid grid-cols-3 gap-3">
            {sizes.map((size) => (
              <button
                key={size}
                class="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                onClick$={() => showToast("solid", size, "info")}
              >
                {size.toUpperCase()} Size
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 class="mb-3 text-sm font-medium">Special States & Interactive Examples</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <button
              class="group rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all hover:from-indigo-600 hover:to-indigo-700 hover:shadow-md hover:scale-105 active:scale-95"
              onClick$={() => showToast("solid", "md", "info", true)}
            >
              <div class="flex items-center gap-2">
                <span class="animate-spin">⏳</span>
                <span>Loading Toast</span>
              </div>
            </button>
            
            <button
              class="group rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all hover:from-pink-600 hover:to-pink-700 hover:shadow-md hover:scale-105 active:scale-95"
              onClick$={() => {
                const id = `custom-toast-${nextId.value++}`;
                toasts.value = [
                  ...toasts.value,
                  {
                    id,
                    status: "success",
                    title: "Custom Content",
                    message: "",
                    variant: "subtle",
                    size: "lg",
                  },
                ];
              }}
            >
              <div class="flex items-center gap-2">
                <span>🎨</span>
                <span>Custom Content</span>
              </div>
            </button>

            <button
              class="group rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all hover:from-emerald-600 hover:to-emerald-700 hover:shadow-md hover:scale-105 active:scale-95"
              onClick$={() => {
                // Show multiple toasts with stacking
                for (let i = 0; i < 3; i++) {
                  setTimeout(() => {
                    const id = `stack-toast-${nextId.value++}`;
                    toasts.value = [
                      ...toasts.value,
                      {
                        id,
                        status: i === 0 ? "info" : i === 1 ? "success" : "warning",
                        title: `Stacked Toast ${i + 1}`,
                        message: `This demonstrates toast stacking behavior`,
                        variant: "solid",
                        size: "md",
                      },
                    ];
                  }, i * 500);
                }
              }}
            >
              <div class="flex items-center gap-2">
                <span>🎭</span>
                <span>Stack Demo</span>
              </div>
            </button>

            <button
              class="group rounded-lg bg-gradient-to-r from-violet-500 to-violet-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all hover:from-violet-600 hover:to-violet-700 hover:shadow-md hover:scale-105 active:scale-95"
              onClick$={() => {
                const id = `rtl-toast-${nextId.value++}`;
                toasts.value = [
                  ...toasts.value,
                  {
                    id,
                    status: "info",
                    title: "RTL Support Demo",
                    message: "This toast demonstrates right-to-left text support: مرحبا بالعالم",
                    variant: "outline",
                    size: "lg",
                  },
                ];
              }}
            >
              <div class="flex items-center gap-2">
                <span>🌍</span>
                <span>RTL Support</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div class="grid gap-4 mobile:grid-cols-1 tablet:grid-cols-2">
        <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-blue-500">💪</span>
            <h4 class="text-sm font-medium text-blue-800 dark:text-blue-200">
              Solid Variant
            </h4>
          </div>
          <p class="text-xs text-blue-600 dark:text-blue-300 mb-2">
            High contrast with solid background. Best for important
            notifications that need immediate attention.
          </p>
          <div class="text-xs text-blue-500 dark:text-blue-400 font-mono">
            Use case: Critical alerts, errors, confirmations
          </div>
        </div>

        <div class="rounded-lg bg-green-50 p-4 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-green-500">🌿</span>
            <h4 class="text-sm font-medium text-green-800 dark:text-green-200">
              Outline Variant
            </h4>
          </div>
          <p class="text-xs text-green-600 dark:text-green-300 mb-2">
            Medium emphasis with transparent background. Good for secondary
            notifications.
          </p>
          <div class="text-xs text-green-500 dark:text-green-400 font-mono">
            Use case: Status updates, progress notifications
          </div>
        </div>

        <div class="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-purple-500">🌸</span>
            <h4 class="text-sm font-medium text-purple-800 dark:text-purple-200">
              Subtle Variant
            </h4>
          </div>
          <p class="text-xs text-purple-600 dark:text-purple-300 mb-2">
            Low emphasis with subtle background. Perfect for non-intrusive
            informational messages.
          </p>
          <div class="text-xs text-purple-500 dark:text-purple-400 font-mono">
            Use case: Tips, info messages, background updates
          </div>
        </div>

        <div class="rounded-lg bg-orange-50 p-4 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-orange-500">📱</span>
            <h4 class="text-sm font-medium text-orange-800 dark:text-orange-200">
              Mobile Responsive
            </h4>
          </div>
          <p class="text-xs text-orange-600 dark:text-orange-300 mb-2">
            All sizes automatically adapt to mobile screens with appropriate
            padding, font sizes, and touch targets.
          </p>
          <div class="text-xs text-orange-500 dark:text-orange-400 space-y-1">
            <div>• Touch targets: 44px+ for accessibility</div>
            <div>• Swipe gestures: Native mobile feel</div>
            <div>• Safe areas: Notch and corner support</div>
          </div>
        </div>
      </div>

      <div class="mt-6 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 p-4 dark:from-indigo-900/20 dark:to-purple-900/20">
        <h4 class="mb-3 text-sm font-medium text-indigo-900 dark:text-indigo-100">
          🎨 Advanced Styling Features
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div class="rounded bg-white/60 p-3 dark:bg-black/20">
            <h5 class="font-medium text-indigo-800 dark:text-indigo-200 mb-1">Theme Integration</h5>
            <p class="text-indigo-600 dark:text-indigo-300">Automatic dark/light mode with consistent colors and proper contrast ratios</p>
          </div>
          <div class="rounded bg-white/60 p-3 dark:bg-black/20">
            <h5 class="font-medium text-indigo-800 dark:text-indigo-200 mb-1">Animation System</h5>
            <p class="text-indigo-600 dark:text-indigo-300">Hardware-accelerated animations with spring physics and easing</p>
          </div>
          <div class="rounded bg-white/60 p-3 dark:bg-black/20">
            <h5 class="font-medium text-indigo-800 dark:text-indigo-200 mb-1">Performance</h5>
            <p class="text-indigo-600 dark:text-indigo-300">Optimized rendering with minimal reflows and efficient memory usage</p>
          </div>
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
          position="top-right"
          onDismiss$={dismissToast}
          variant={toast.variant}
          size={toast.size}
          loading={toast.loading}
          duration={toast.loading ? 0 : 5000}
          persistent={toast.loading}
          swipeable={true}
        >
          {toast.title === "Custom Content" && (
            <div class="mt-2 space-y-2">
              <div class="flex items-center gap-2">
                <div class="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                <span class="text-sm">System online</span>
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                All services are operational
              </div>
            </div>
          )}
        </Toast>
      ))}
    </div>
  );
});

export default ToastVariants;
