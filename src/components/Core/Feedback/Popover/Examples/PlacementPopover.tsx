import { component$, useSignal, $ } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/Core/Feedback/Popover';
import type { PopoverPlacement } from '~/components/Core/Feedback/Popover';

export const PlacementPopover = component$(() => {
  const activePlacement = useSignal<PopoverPlacement>('bottom');
  const hasArrow = useSignal(true);

  const placements: PopoverPlacement[] = [
    'top', 'top-start', 'top-end',
    'right', 'right-start', 'right-end',
    'bottom', 'bottom-start', 'bottom-end',
    'left', 'left-start', 'left-end'
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
            class={`px-3 py-1.5 border rounded-md text-sm transition-colors ${
              activePlacement.value === placement
                ? 'bg-primary-500 text-white border-primary-500'
                : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
            }`}
          >
            {placement}
          </button>
        ))}
      </div>

      <div class="flex justify-between items-center">
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
      
      <div class="flex items-center justify-center h-60 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
        <Popover 
          placement={activePlacement.value}
          hasArrow={hasArrow.value}
        >
          <PopoverTrigger>
            <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              {activePlacement.value} placement
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <div class="p-3">
              <h4 class="font-semibold">Placement: {activePlacement.value}</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                This popover is positioned at the {activePlacement.value} of the trigger.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}); 