import { component$, Slot } from '@builder.io/qwik';
import type { DialogHeaderProps } from './Dialog.types';

/**
 * DialogHeader Component
 * 
 * Provides a styled header area for the Dialog with an optional close button.
 */
export const DialogHeader = component$<DialogHeaderProps>((props) => {
  const {
    hasCloseButton = true,
    closeButtonAriaLabel = 'Close dialog',
    class: className,
    onClose$
  } = props;

  return (
    <div
      class={`
        px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between
        ${className || ''}
      `}
      q:slot="header"
    >
      {/* Content */}
      <div>
        <Slot />
      </div>
      
      {/* Close button */}
      {hasCloseButton && (
        <button
          type="button"
          class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          onClick$={onClose$}
          aria-label={closeButtonAriaLabel}
        >
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}); 