import { component$, useContext } from '@builder.io/qwik';
import type { PopoverArrowProps } from './Popover.types';
import { PopoverContext } from './usePopover';

/**
 * PopoverArrow - Component for customizing the arrow
 */
export const PopoverArrow = component$<PopoverArrowProps>((props) => {
  const { class: className } = props;
  const popoverState = useContext(PopoverContext);
  
  return (
    <div 
      class={`absolute w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45 border border-gray-200 dark:border-gray-700 ${className || ''}`}
      ref={popoverState.arrowRef}
    ></div>
  );
}); 