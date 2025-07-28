import type { QRL, Signal } from "@builder.io/qwik";
import type { JSXOutput } from "@builder.io/qwik";

export type AccordionVariant = "default" | "bordered" | "separated";
export type AccordionSize = "sm" | "md" | "lg";
export type AccordionType = "single" | "multiple";
export type AccordionIconPosition = "start" | "end";
export type AccordionAnimation = "slide" | "fade" | "scale" | "none";

export interface AccordionProps {
  children?: JSXOutput;
  variant?: AccordionVariant;
  size?: AccordionSize;
  type?: AccordionType;
  iconPosition?: AccordionIconPosition;
  defaultValue?: string[];
  value?: Signal<string[]>;
  onValueChange$?: QRL<(value: string[]) => void>;
  disabled?: boolean;
  collapsible?: boolean;
  animation?: AccordionAnimation;
  animationDuration?: number;
  hideIcon?: boolean;
  class?: string;
  id?: string;
}

export interface AccordionItemProps {
  children?: JSXOutput;
  value: string;
  disabled?: boolean;
  class?: string;
  id?: string;
}

export interface AccordionTriggerProps {
  children?: JSXOutput;
  class?: string;
  icon?: JSXOutput;
  hideIcon?: boolean;
}

export interface AccordionContentProps {
  children?: JSXOutput;
  class?: string;
}
