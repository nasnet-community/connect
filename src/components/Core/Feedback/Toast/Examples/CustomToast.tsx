import { component$, $ } from "@builder.io/qwik";
import { ToastContainer } from "~/components/Core/Feedback/Toast/ToastContainer";
import { useToast } from "~/components/Core/Feedback/Toast/useToast";

// Custom icon component
const LightningIcon = component$(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6 text-green-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
));

export const CustomToast = component$(() => {
  const toast = useToast();

  const showCustomSizeToast = $((size: "sm" | "md" | "lg") => {
    toast.show({
      status: "info",
      title: `${size.toUpperCase()} Size Toast`,
      message: "This toast demonstrates different size options",
      size: size,
      duration: 5000,
    });
  });

  const showCustomDurationToast = $((duration: number) => {
    toast.info(`This toast will disappear in ${duration / 1000} seconds`, {
      title: "Custom Duration",
      duration: duration,
    });
  });

  const showCustomIconToast = $(() => {
    toast.show({
      status: "success",
      title: "Custom Icon",
      message: "This toast uses a custom icon",
      icon: <LightningIcon />,
      duration: 5000,
    });
  });

  const showNoIconToast = $(() => {
    toast.error("This toast has no icon", {
      title: "No Icon",
      icon: false,
    });
  });

  return (
    <div class="space-y-4">
      <div class="space-y-2">
        <h3 class="text-sm font-medium">Size Options</h3>
        <div class="flex gap-3">
          <button
            onClick$={() => showCustomSizeToast("sm")}
            class="rounded-md bg-blue-500 px-3 py-1 text-xs text-white transition-colors hover:bg-blue-600"
          >
            Small Toast
          </button>

          <button
            onClick$={() => showCustomSizeToast("md")}
            class="rounded-md bg-blue-500 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-600"
          >
            Medium Toast
          </button>

          <button
            onClick$={() => showCustomSizeToast("lg")}
            class="rounded-md bg-blue-500 px-3 py-1 text-white transition-colors hover:bg-blue-600"
          >
            Large Toast
          </button>
        </div>
      </div>

      <div class="space-y-2">
        <h3 class="text-sm font-medium">Duration Options</h3>
        <div class="flex gap-3">
          <button
            onClick$={() => showCustomDurationToast(2000)}
            class="rounded-md bg-purple-500 px-3 py-1 text-white transition-colors hover:bg-purple-600"
          >
            2s Duration
          </button>

          <button
            onClick$={() => showCustomDurationToast(5000)}
            class="rounded-md bg-purple-500 px-3 py-1 text-white transition-colors hover:bg-purple-600"
          >
            5s Duration
          </button>

          <button
            onClick$={() => showCustomDurationToast(10000)}
            class="rounded-md bg-purple-500 px-3 py-1 text-white transition-colors hover:bg-purple-600"
          >
            10s Duration
          </button>
        </div>
      </div>

      <div class="space-y-2">
        <h3 class="text-sm font-medium">Icon Options</h3>
        <div class="flex gap-3">
          <button
            onClick$={showCustomIconToast}
            class="rounded-md bg-green-500 px-3 py-1 text-white transition-colors hover:bg-green-600"
          >
            Custom Icon
          </button>

          <button
            onClick$={showNoIconToast}
            class="rounded-md bg-red-500 px-3 py-1 text-white transition-colors hover:bg-red-600"
          >
            No Icon
          </button>
        </div>
      </div>

      <ToastContainer position="bottom-right" limit={5} />
    </div>
  );
});
