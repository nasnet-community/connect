import { component$, Slot, useContextProvider } from "@builder.io/qwik";
import { useAccordion } from "./hooks/useAccordion";
import { AccordionContext } from "./AccordionContext";
import type { AccordionProps } from "./Accordion.types";

/**
 * Accordion Component
 *
 * A vertically stacked set of interactive headings that each reveal a section of content.
 */
export const Accordion = component$<AccordionProps>((props) => {
  const {
    variant = "default",
    size = "md",
    iconPosition = "end",
    animation = "slide",
    animationDuration = 300,
    hideIcon = false,
    class: className = "",
    disabled = false,
  } = props;

  // Use hook to manage accordion state
  const { accordionId, expandedItems, toggleItem$ } = useAccordion(props);

  // Set up context for child components
  useContextProvider(AccordionContext, {
    expandedItems: expandedItems.value,
    toggleItem$,
    disabled,
    iconPosition,
    hideIcon,
    size,
    variant,
    animation,
    animationDuration,
  });

  // Determine classes based on props
  const variantClasses = {
    default: "divide-y divide-gray-200 dark:divide-gray-700",
    bordered:
      "border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden",
    separated: "space-y-2",
  }[variant];

  return (
    <div
      id={accordionId}
      class={`w-full ${variantClasses} ${className}`}
      role="presentation"
    >
      <Slot />
    </div>
  );
});
