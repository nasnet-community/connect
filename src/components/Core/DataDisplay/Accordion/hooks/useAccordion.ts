import { useId, useSignal, useTask$, $ } from "@builder.io/qwik";
import type { Signal, QRL } from "@builder.io/qwik";
import type { AccordionProps } from "../Accordion.types";

export interface UseAccordionReturn {
  accordionId: string;
  expandedItems: Signal<string[]>;
  toggleItem$: QRL<(value: string) => void>;
}

export function useAccordion(props: AccordionProps): UseAccordionReturn {
  const {
    type = "single",
    defaultValue = [],
    disabled = false,
    collapsible = true,
    value: valueSignal,
    onValueChange$,
  } = props;

  // Initialize expanded items state
  const expandedItems = useSignal<string[]>(valueSignal?.value || defaultValue);

  // Generate unique ID for component
  const accordionId = useId();

  // Update internal state when controlled value changes
  useTask$(({ track }) => {
    const value = track(() => valueSignal?.value);
    if (value !== undefined) {
      expandedItems.value = value;
    }
  });

  // Handle item toggle
  const toggleItem$ = $((value: string) => {
    // If disabled, do nothing
    if (disabled) return;

    // Create a copy of the current expanded items
    let newValue: string[];

    // Single accordion type - only one item can be expanded at a time
    if (type === "single") {
      // If the item is already expanded
      if (expandedItems.value.includes(value)) {
        // If collapsible is enabled, collapse it
        newValue = collapsible ? [] : [value];
      } else {
        // Replace with the new item
        newValue = [value];
      }
    }
    // Multiple accordion type - multiple items can be expanded
    else {
      // If the item is already expanded, remove it
      if (expandedItems.value.includes(value)) {
        newValue = expandedItems.value.filter((item) => item !== value);
      }
      // Otherwise, add it to the expanded items
      else {
        newValue = [...expandedItems.value, value];
      }
    }

    // Update the expanded items
    expandedItems.value = newValue;

    // Call the onValueChange callback if provided
    if (onValueChange$) {
      onValueChange$(newValue);
    }

    // Sync with controlled value if provided
    if (valueSignal) {
      valueSignal.value = newValue;
    }
  });

  return {
    accordionId,
    expandedItems,
    toggleItem$,
  };
}
