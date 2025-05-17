import { component$, Slot, type QRL } from '@builder.io/qwik';

export interface DrawerHeaderProps {
  hasCloseButton?: boolean;
  closeButtonAriaLabel?: string;
  onClose$?: QRL<() => void>;
  class?: string;
}

export const DrawerHeader = component$<DrawerHeaderProps>(({
  hasCloseButton = true,
  closeButtonAriaLabel = 'Close drawer',
  onClose$,
  class: className
}) => {
  return (
    <header class={`flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 ${className || ''}`}>
      <div class="flex-1 min-w-0">
        <Slot />
      </div>
      
      {hasCloseButton && (
        <button
          type="button"
          class="ml-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          onClick$={onClose$}
          aria-label={closeButtonAriaLabel}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </header>
  );
}); 