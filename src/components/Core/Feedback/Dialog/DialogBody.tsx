import { component$, Slot } from '@builder.io/qwik';
import type { DialogBodyProps } from './Dialog.types';

/**
 * DialogBody Component
 * 
 * Provides a styled body area for the Dialog with optional scrolling.
 */
export const DialogBody = component$<DialogBodyProps>((props) => {
  const {
    scrollable = true,
    class: className
  } = props;

  return (
    <div
      class={`
        px-6 py-4
        ${scrollable ? 'max-h-[calc(100vh-200px)] overflow-y-auto' : ''}
        ${className || ''}
      `}
    >
      <Slot />
    </div>
  );
}); 