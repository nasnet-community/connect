import { component$ } from "@builder.io/qwik";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/Core/Feedback/Popover";

export const BasicPopover = component$(() => {
  return (
    <div class="flex justify-center py-4">
      <Popover>
        <PopoverTrigger>
          <button class="rounded-md bg-primary-500 px-4 py-2 text-white transition-colors hover:bg-primary-600">
            Click me
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div class="p-3">
            <h4 class="font-semibold">Basic Popover</h4>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
              This is a basic popover with default settings.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
});
