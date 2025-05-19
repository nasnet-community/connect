import { component$, useSignal } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/Core/Feedback/Popover';
import type { PopoverTrigger as TriggerType } from '~/components/Core/Feedback/Popover';

export const TriggerPopover = component$(() => {
  const activeTrigger = useSignal<TriggerType>('click');
  const isOpen = useSignal(false);
  
  const triggers: TriggerType[] = ['click', 'hover', 'focus', 'manual'];

  return (
    <div class="space-y-4">
      <div class="flex flex-wrap gap-3">
        {triggers.map((trigger) => (
          <button
            key={trigger}
            onClick$={() => {
              activeTrigger.value = trigger;
            }}
            class={`px-3 py-1.5 border rounded-md text-sm transition-colors ${
              activeTrigger.value === trigger
                ? 'bg-primary-500 text-white border-primary-500'
                : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
            }`}
          >
            {trigger}
          </button>
        ))}
      </div>
      
      <div class="flex flex-wrap gap-5 justify-center py-4">
        {activeTrigger.value !== 'manual' ? (
          <Popover trigger={activeTrigger.value}>
            <PopoverTrigger>
              <button class="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors">
                {activeTrigger.value === 'click' ? 'Click me' : 
                activeTrigger.value === 'hover' ? 'Hover me' : 'Focus me'}
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <div class="p-3">
                <h4 class="font-semibold">Trigger: {activeTrigger.value}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  This popover is triggered by {activeTrigger.value}.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <div class="flex items-center gap-3">
            <Popover trigger="manual" isOpen={isOpen.value}>
              <PopoverTrigger>
                <button class="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors">
                  Manual trigger
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <div class="p-3">
                  <h4 class="font-semibold">Manual Trigger</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    This popover is controlled manually through state.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
            <div class="flex gap-2">
              <button 
                onClick$={() => isOpen.value = true}
                class="px-3 py-1.5 bg-green-500 text-white rounded-md text-sm"
              >
                Open
              </button>
              <button 
                onClick$={() => isOpen.value = false}
                class="px-3 py-1.5 bg-red-500 text-white rounded-md text-sm"
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