import { component$, useVisibleTask$, Slot } from "@builder.io/qwik";
import type { TooltipTriggerProps } from "./Tooltip.types";

export const TooltipTrigger = component$<TooltipTriggerProps>((props) => {
  const {
    setTriggerElement,
    mouseEnterHandler,
    mouseLeaveHandler,
    clickHandler,
    focusHandler,
    blurHandler,
  } = props;

  // Set the element reference when the component mounts
  useVisibleTask$(({ cleanup }) => {
    const element = document.querySelector("[data-tooltip-trigger]");
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
      <Slot />
    </span>
  );
});
