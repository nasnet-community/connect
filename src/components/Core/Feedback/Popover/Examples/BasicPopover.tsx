import { component$ } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/Core/Feedback/Popover';

export const BasicPopover = component$(() => {
  return (
    <div class="flex justify-center py-4">
      <Popover>
        <PopoverTrigger>
          <button class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
            Click me
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div class="p-3">
            <h4 class="font-semibold">Basic Popover</h4>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
              This is a basic popover with default settings.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}); 