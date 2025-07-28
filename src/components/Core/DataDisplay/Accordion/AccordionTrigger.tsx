import { component$, Slot, useContext, $ } from "@builder.io/qwik";
import { AccordionContext, AccordionItemContext } from "./AccordionContext";
import type { AccordionTriggerProps } from "./Accordion.types";

export const AccordionTrigger = component$<AccordionTriggerProps>((props) => {
  const { class: className = "", hideIcon = false, icon } = props;

  // Get accordion and item context
  const accordionContext = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);

  // Handle click to toggle the accordion item
  const handleClick$ = $(() => {
    if (!itemContext.isDisabled) {
      accordionContext.toggleItem$(itemContext.value);
    }
  });

  // Determine classes based on size, position and state
  const sizeClasses = {
    sm: "p-2 text-sm",
    md: "p-3 text-base",
    lg: "p-4 text-lg",
  }[accordionContext.size];

  const iconPositionClass =
    accordionContext.iconPosition === "start" ? "flex-row-reverse" : "flex-row";
  const expandedClass = itemContext.isExpanded
    ? "text-primary-600 dark:text-primary-400"
    : "";
  const disabledClass = itemContext.isDisabled
    ? "cursor-not-allowed"
    : "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800";

  // Default chevron icon
  const defaultIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={`h-5 w-5 transition-transform duration-200 ${itemContext.isExpanded ? "rotate-180 transform" : ""}`}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );

  // Icon to display (custom or default)
  const iconToShow = icon || defaultIcon;

  return (
    <h3>
      <button
        id={itemContext.headerId}
        class={`flex ${iconPositionClass} w-full items-center justify-between text-left font-medium ${sizeClasses} ${expandedClass} ${disabledClass} ${className}`}
        onClick$={handleClick$}
        aria-expanded={itemContext.isExpanded}
        aria-controls={itemContext.contentId}
        aria-disabled={itemContext.isDisabled}
        disabled={itemContext.isDisabled}
        type="button"
      >
        <span class="flex-1">
          <Slot />
        </span>
        {!hideIcon && !accordionContext.hideIcon && (
          <span
            class={`ml-2 flex-shrink-0 ${accordionContext.iconPosition === "start" ? "ml-0 mr-2" : ""}`}
          >
            {iconToShow}
          </span>
        )}
      </button>
    </h3>
  );
});
