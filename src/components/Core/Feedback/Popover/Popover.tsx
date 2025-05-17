import { 
  component$, 
  useComputed$,
  Slot,
  useContextProvider
} from '@builder.io/qwik';
import type { PopoverProps } from './Popover.types';
import { PopoverContext, usePopover } from './usePopover';

/**
 * Popover Component - A container that combines trigger and content
 */
export const Popover = component$<PopoverProps>((props) => {
  const {
    size = 'md',
    disableAnimation = false,
    zIndex = 1000,
    class: className,
    contentClass,
    triggerClass,
  } = props;

  const {
    state,
    handleTriggerHover$,
    handleTriggerLeave$,
    handleContentHover$,
    handleContentLeave$
  } = usePopover(props);

  // Calculate base classes for size
  const sizeClasses = useComputed$(() => {
    switch (size) {
      case 'sm': return 'max-w-xs';
      case 'lg': return 'max-w-xl';
      default: return 'max-w-md';
    }
  });

  // Provide the context for child components
  useContextProvider(PopoverContext, state);

  return (
    <div class={`relative inline-block ${className || ''}`}>
      {/* Trigger */}
      <div
        ref={state.triggerRef}
        class={triggerClass}
        onClick$={props.trigger === 'click' ? state.togglePopover : undefined}
        onFocus$={props.trigger === 'focus' ? state.openPopover : undefined}
        onBlur$={props.trigger === 'focus' ? state.closePopover : undefined}
        onMouseEnter$={handleTriggerHover$}
        onMouseLeave$={handleTriggerLeave$}
        aria-describedby={state.popoverId}
        aria-expanded={state.isOpen.value ? 'true' : 'false'}
      >
        <Slot name="trigger" />
      </div>

      {/* Content */}
      {state.isOpen.value && (
        <div
          ref={state.contentRef}
          id={state.popoverId}
          role="tooltip"
          aria-label={props.ariaLabel}
          class={`
            absolute z-[${zIndex}] bg-white dark:bg-gray-800 rounded-md shadow-lg
            border border-gray-200 dark:border-gray-700 p-4
            ${sizeClasses.value}
            ${disableAnimation ? '' : 'animate-fadeIn'}
            ${contentClass || ''}
          `}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          onMouseEnter$={handleContentHover$}
          onMouseLeave$={handleContentLeave$}
        >
          {props.hasArrow && (
            <div
              ref={state.arrowRef}
              class="absolute w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45 border border-gray-200 dark:border-gray-700"
              style={{
                position: 'absolute',
              }}
            ></div>
          )}
          <div class="relative z-10">
            <Slot />
          </div>
        </div>
      )}
    </div>
  );
});
