import { component$, useSignal } from "@builder.io/qwik";
import { Spinner } from "../Spinner";

/**
 * Test component demonstrating inline spinner usage in buttons
 */
export const SpinnerInlineButtonTest = component$(() => {
  const isLoading = useSignal(false);

  return (
    <div class="space-y-6 p-8">
      <h2 class="text-2xl font-bold">Inline Spinner Button Test</h2>

      <div class="space-y-4">
        {/* Standard button with inline spinner */}
        <button
          type="button"
          disabled={isLoading.value}
          onClick$={() => {
            isLoading.value = true;
            setTimeout(() => {
              isLoading.value = false;
            }, 3000);
          }}
          class="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading.value && (
            <Spinner
              size="inline"
              color="white"
              variant="border"
              class="mr-2"
            />
          )}
          {isLoading.value ? "Saving..." : "Save Changes"}
        </button>

        {/* Small button with inline spinner */}
        <button
          type="button"
          class="inline-flex items-center rounded bg-secondary-600 px-3 py-1.5 text-sm text-white transition-colors hover:bg-secondary-700"
        >
          <Spinner
            size="inline"
            color="white"
            variant="circle"
            class="mr-1.5"
          />
          Loading
        </button>

        {/* Text button with inline spinner */}
        <button
          type="button"
          class="inline-flex items-center text-primary-600 transition-colors hover:text-primary-700"
        >
          <Spinner size="inline" color="primary" variant="dots" class="mr-2" />
          Refreshing data
        </button>
      </div>

      <div class="mt-8 space-y-2">
        <h3 class="text-lg font-semibold">
          Inline Spinner in Different Contexts
        </h3>

        {/* Inline with text */}
        <p class="flex items-center text-gray-600">
          <Spinner size="inline" color="info" variant="border" class="mr-2" />
          Checking for updates...
        </p>

        {/* In a badge */}
        <span class="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
          <Spinner size="inline" color="warning" variant="grow" class="mr-1" />
          Processing
        </span>

        {/* In a link */}
        <a
          href="#"
          class="inline-flex items-center text-blue-600 hover:underline"
        >
          <Spinner size="inline" color="info" variant="bars" class="mr-1.5" />
          Loading more results
        </a>
      </div>
    </div>
  );
});
