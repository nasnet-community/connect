import { component$, useSignal } from "@builder.io/qwik";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/Core/Feedback/Popover";
import type { PopoverTrigger as TriggerType } from "~/components/Core/Feedback/Popover/Popover.types";

export const TriggerPopover = component$(() => {
  const activeTrigger = useSignal<TriggerType>("click");
  const isOpen = useSignal(false);

  const triggers: TriggerType[] = ["click", "hover", "focus", "manual"];

  return (
    <div class="space-y-4">
      <div class="flex flex-wrap gap-3">
        {triggers.map((trigger) => (
          <button
            key={trigger}
            onClick$={() => {
              activeTrigger.value = trigger;
            }}
            class={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
              activeTrigger.value === trigger
                ? "border-primary-500 bg-primary-500 text-white"
                : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700"
            }`}
          >
            {trigger}
          </button>
        ))}
      </div>

      <div class="flex flex-wrap justify-center gap-5 py-4">
        {activeTrigger.value !== "manual" ? (
          <Popover trigger={activeTrigger.value}>
            <PopoverTrigger>
              <button class="rounded-md bg-purple-500 px-4 py-2 text-white transition-colors hover:bg-purple-600">
                {activeTrigger.value === "click"
                  ? "Click me"
                  : activeTrigger.value === "hover"
                    ? "Hover me"
                    : "Focus me"}
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <div class="p-3">
                <h4 class="font-semibold">Trigger: {activeTrigger.value}</h4>
                <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  This popover is triggered by {activeTrigger.value}.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <div class="flex items-center gap-3">
            <Popover trigger="manual" isOpen={isOpen.value}>
              <PopoverTrigger>
                <button class="rounded-md bg-purple-500 px-4 py-2 text-white transition-colors hover:bg-purple-600">
                  Manual trigger
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <div class="p-3">
                  <h4 class="font-semibold">Manual Trigger</h4>
                  <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    This popover is controlled manually through state.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
            <div class="flex gap-2">
              <button
                onClick$={() => (isOpen.value = true)}
                class="rounded-md bg-green-500 px-3 py-1.5 text-sm text-white"
              >
                Open
              </button>
              <button
                onClick$={() => (isOpen.value = false)}
                class="rounded-md bg-red-500 px-3 py-1.5 text-sm text-white"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
