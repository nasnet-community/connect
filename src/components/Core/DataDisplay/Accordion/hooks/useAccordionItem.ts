import { useId, useComputed$ } from "@builder.io/qwik";
import type { AccordionItemProps } from "../Accordion.types";

export interface UseAccordionItemReturn {
  itemId: string;
  headerId: string;
  contentId: string;
  isExpanded: boolean;
  isDisabled: boolean;
}

export function useAccordionItem(
  props: AccordionItemProps,
  accordionContext: {
    expandedItems: string[];
    disabled: boolean;
  },
): UseAccordionItemReturn {
  const { value, disabled = false } = props;

  // Generate unique IDs for accessibility
  const itemId = useId();
  const headerId = useId();
  const contentId = useId();

  // Compute whether this item is expanded
  const isExpanded = useComputed$(() =>
    accordionContext.expandedItems.includes(value),
  );

  // Compute effective disabled state (from item or parent accordion)
  const isDisabled = disabled || accordionContext.disabled;

  return {
    itemId,
    headerId,
    contentId,
    isExpanded: isExpanded.value,
    isDisabled,
  };
}
