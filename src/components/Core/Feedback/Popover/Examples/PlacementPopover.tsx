import { component$, useSignal, $ } from "@builder.io/qwik";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/Core/Feedback/Popover";
import type { PopoverPlacement } from "~/components/Core/Feedback/Popover";

export const PlacementPopover = component$(() => {
  const activePlacement = useSignal<PopoverPlacement>("bottom");
  const hasArrow = useSignal(true);

  const placements: PopoverPlacement[] = [
    "top",
    "top-start",
    "top-end",
    "right",
    "right-start",
    "right-end",
    "bottom",
    "bottom-start",
    "bottom-end",
    "left",
    "left-start",
    "left-end",
  ];

  const toggleArrow = $(() => {
    hasArrow.value = !hasArrow.value;
  });

  return (
    <div class="space-y-4">
      <div class="flex flex-wrap gap-2">
        {placements.map((placement) => (
          <button
            key={placement}
            onClick$={() => {
              activePlacement.value = placement;
            }}
            class={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
              activePlacement.value === placement
                ? "border-primary-500 bg-primary-500 text-white"
                : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700"
            }`}
          >
            {placement}
          </button>
        ))}
      </div>

      <div class="flex items-center justify-between">
        <div>
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              checked={hasArrow.value}
              onChange$={toggleArrow}
            />
            <span>Show arrow</span>
          </label>
        </div>
      </div>

      <div class="flex h-60 items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 dark:border-gray-600">
        <Popover placement={activePlacement.value} hasArrow={hasArrow.value}>
          <PopoverTrigger>
            <button class="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
              {activePlacement.value} placement
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <div class="p-3">
              <h4 class="font-semibold">Placement: {activePlacement.value}</h4>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                This popover is positioned at the {activePlacement.value} of the
                trigger.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
});
