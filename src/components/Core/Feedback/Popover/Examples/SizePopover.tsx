import { component$, useSignal } from "@builder.io/qwik";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/Core/Feedback/Popover";
import type { PopoverSize } from "~/components/Core/Feedback/Popover";

export const SizePopover = component$(() => {
  const activeSize = useSignal<PopoverSize>("md");
  const sizes: PopoverSize[] = ["sm", "md", "lg"];

  return (
    <div class="space-y-4">
      <div class="flex gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick$={() => {
              activeSize.value = size;
            }}
            class={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
              activeSize.value === size
                ? "border-primary-500 bg-primary-500 text-white"
                : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700"
            }`}
          >
            {size.toUpperCase()}
          </button>
        ))}
      </div>

      <div class="flex justify-center py-4">
        <Popover size={activeSize.value}>
          <PopoverTrigger>
            <button class="rounded-md bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600">
              {activeSize.value.toUpperCase()} Size Popover
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <div class="p-3">
              <h4 class="font-semibold">
                Size: {activeSize.value.toUpperCase()}
              </h4>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                This popover uses the {activeSize.value} size variant.
              </p>
              {activeSize.value === "lg" && (
                <div class="mt-2 text-sm">
                  <p>Larger popovers are great for:</p>
                  <ul class="ml-5 mt-1 list-disc space-y-1">
                    <li>Displaying more complex content</li>
                    <li>Forms and input fields</li>
                    <li>Rich media content</li>
                    <li>Detailed information display</li>
                  </ul>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
});
