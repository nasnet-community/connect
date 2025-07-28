import { createContextId } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";

// Context for sharing state between accordion components
export const AccordionContext = createContextId<{
  expandedItems: string[];
  toggleItem$: QRL<(value: string) => void>;
  disabled: boolean;
  iconPosition: "start" | "end";
  hideIcon: boolean;
  size: "sm" | "md" | "lg";
  variant: "default" | "bordered" | "separated";
  animation: "slide" | "fade" | "scale" | "none";
  animationDuration: number;
}>("accordion-context");

// Context for item state
export const AccordionItemContext = createContextId<{
  value: string;
  isExpanded: boolean;
  isDisabled: boolean;
  headerId: string;
  contentId: string;
}>("accordion-item-context");
