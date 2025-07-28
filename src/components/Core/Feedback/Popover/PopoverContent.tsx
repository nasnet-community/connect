import { component$, Slot } from "@builder.io/qwik";
import type { PopoverContentProps } from "./Popover.types";

/**
 * PopoverContent - Component for the content element
 */
export const PopoverContent = component$<PopoverContentProps>((props) => {
  const { class: className, ariaLabel } = props;

  return (
    <div class={`${className || ""}`} aria-label={ariaLabel}>
      <Slot />
    </div>
  );
});
