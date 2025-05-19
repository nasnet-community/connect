import { component$, useSignal } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/Core/Feedback/Popover';
import type { PopoverSize } from '~/components/Core/Feedback/Popover';

export const SizePopover = component$(() => {
  const activeSize = useSignal<PopoverSize>('md');
  const sizes: PopoverSize[] = ['sm', 'md', 'lg'];

  return (
    <div class="space-y-4">
      <div class="flex gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick$={() => {
              activeSize.value = size;
            }}
            class={`px-3 py-1.5 border rounded-md text-sm transition-colors ${
              activeSize.value === size
                ? 'bg-primary-500 text-white border-primary-500'
                : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
            }`}
          >
            {size.toUpperCase()}
          </button>
        ))}
      </div>
      
      <div class="flex justify-center py-4">
        <Popover size={activeSize.value}>
          <PopoverTrigger>
            <button class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
              {activeSize.value.toUpperCase()} Size Popover
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <div class="p-3">
              <h4 class="font-semibold">Size: {activeSize.value.toUpperCase()}</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                This popover uses the {activeSize.value} size variant.
              </p>
              {activeSize.value === 'lg' && (
                <div class="mt-2 text-sm">
                  <p>Larger popovers are great for:</p>
                  <ul class="list-disc ml-5 mt-1 space-y-1">
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