import { component$, Slot } from '@builder.io/qwik';
import type { DialogFooterProps } from './Dialog.types';

/**
 * DialogFooter Component
 * 
 * Provides a styled footer area for the Dialog, typically for buttons.
 */
export const DialogFooter = component$<DialogFooterProps>((props) => {
  const { class: className } = props;

  return (
    <div
      class={`
        px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 rounded-b-lg
        ${className || ''}
      `}
      q:slot="footer"
    >
      <Slot />
    </div>
  );
}); 