import { JSXChildren, component$, useVisibleTask$ } from '@builder.io/qwik';
import type { QRL } from '@builder.io/qwik';

export interface TooltipTriggerProps {
  children: JSXChildren;
  setTriggerElement: QRL<(el: Element) => void>;
  mouseEnterHandler?: QRL<() => void>;
  mouseLeaveHandler?: QRL<() => void>;
  clickHandler?: QRL<() => void>;
  focusHandler?: QRL<() => void>;
  blurHandler?: QRL<() => void>;
}

export const TooltipTrigger = component$<TooltipTriggerProps>((props) => {
  const {
    setTriggerElement,
    mouseEnterHandler,
    mouseLeaveHandler,
    clickHandler,
    focusHandler,
    blurHandler,
    children
  } = props;

  // Set the element reference when the component mounts
  useVisibleTask$(({ cleanup }) => {
    const element = document.querySelector('[data-tooltip-trigger]');
    if (element) {
      // Store the QRL locally to avoid serialization issues
      const setRef = setTriggerElement;
      setRef(element);
      
      // Clean up when component unmounts
      cleanup(() => {
        // Using undefined instead of null for better serialization
        setRef(undefined as any);
      });
    }
  });

  return (
    <span
      data-tooltip-trigger
      onMouseEnter$={mouseEnterHandler}
      onMouseLeave$={mouseLeaveHandler}
      onClick$={clickHandler}
      onFocus$={focusHandler}
      onBlur$={blurHandler}
      tabIndex={0}
      class="inline-block"
    >
      {children}
    </span>
  );
}); 