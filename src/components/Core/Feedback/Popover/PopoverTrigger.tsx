import { component$, Slot } from '@builder.io/qwik';
import type { PopoverTriggerProps } from './Popover.types';

/**
 * PopoverTrigger - Component for the trigger element
 */
export const PopoverTrigger = component$<PopoverTriggerProps>((props) => {
  const { class: className, disabled, ariaLabel } = props;
  
  return (
    <div 
      class={`inline-block ${className || ''} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      aria-label={ariaLabel}
      q:slot="trigger"
    >
      <Slot />
    </div>
  );
}); 