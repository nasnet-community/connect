import {
  component$,
  Slot,
  useContext,
  useContextProvider,
} from "@builder.io/qwik";
import { useAccordionItem } from "./hooks/useAccordionItem";
import { AccordionContext, AccordionItemContext } from "./AccordionContext";
import type { AccordionItemProps } from "./Accordion.types";

export const AccordionItem = component$<AccordionItemProps>((props) => {
  const { value, class: className = "" } = props;

  // Get accordion context
  const accordionContext = useContext(AccordionContext);

  // Use hook to manage item state
  const { itemId, headerId, contentId, isExpanded, isDisabled } =
    useAccordionItem(props, {
      expandedItems: accordionContext.expandedItems,
      disabled: accordionContext.disabled,
    });

  // Provide context for trigger and content components
  useContextProvider(AccordionItemContext, {
    value,
    isExpanded,
    isDisabled,
    headerId,
    contentId,
  });

  // Determine classes based on variant and state
  const variantClasses = {
    default: "",
    bordered: "",
    separated:
      "border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden",
  }[accordionContext.variant];

  const stateClasses = isDisabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <div
      id={itemId}
      class={`${variantClasses} ${stateClasses} ${className}`}
      data-state={isExpanded ? "open" : "closed"}
    >
      <Slot />
    </div>
  );
});
