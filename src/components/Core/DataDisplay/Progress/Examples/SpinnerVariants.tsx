import { component$ } from "@builder.io/qwik";
import { Spinner } from "~/components/Core/DataDisplay/Progress";

export const SpinnerVariants = component$(() => {
  return (
    <div class="flex flex-col gap-6">
      <div>
        <h3 class="mb-2 text-sm font-medium">Size Variants</h3>
        <div class="flex items-center gap-4">
          <Spinner size="xs" />
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner size="xl" />
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Visual Variants</h3>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-5">
          <div>
            <span class="mb-2 block text-xs">Border</span>
            <Spinner variant="border" />
          </div>

          <div>
            <span class="mb-2 block text-xs">Grow</span>
            <Spinner variant="grow" />
          </div>

          <div>
            <span class="mb-2 block text-xs">Dots</span>
            <Spinner variant="dots" />
          </div>

          <div>
            <span class="mb-2 block text-xs">Bars</span>
            <Spinner variant="bars" />
          </div>

          <div>
            <span class="mb-2 block text-xs">Circle</span>
            <Spinner variant="circle" />
          </div>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Label Positions</h3>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <span class="mb-2 block text-xs">Top</span>
            <Spinner label="Loading" labelPosition="top" />
          </div>

          <div>
            <span class="mb-2 block text-xs">Right</span>
            <Spinner label="Loading" labelPosition="right" />
          </div>

          <div>
            <span class="mb-2 block text-xs">Bottom</span>
            <Spinner label="Loading" labelPosition="bottom" />
          </div>

          <div>
            <span class="mb-2 block text-xs">Left</span>
            <Spinner label="Loading" labelPosition="left" />
          </div>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Centered Spinner</h3>
        <div class="relative h-32 w-full rounded-lg border border-gray-200 dark:border-gray-700">
          <Spinner centered />
        </div>
      </div>
    </div>
  );
});
