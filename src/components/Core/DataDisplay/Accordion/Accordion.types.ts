import type { JSXChildren, QRL, Signal } from '@builder.io/qwik';

export type AccordionVariant = 'default' | 'bordered' | 'separated';
export type AccordionSize = 'sm' | 'md' | 'lg';
export type AccordionType = 'single' | 'multiple';
export type AccordionIconPosition = 'start' | 'end';
export type AccordionAnimation = 'slide' | 'fade' | 'scale' | 'none';

export interface AccordionProps {
  children: JSXChildren;
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
  class?: string;
  id?: string;
}

export interface AccordionItemProps {
  children: JSXChildren;
  value: string;
  disabled?: boolean;
  class?: string;
  id?: string;
}

export interface AccordionTriggerProps {
  children: JSXChildren;
  class?: string;
  icon?: JSXChildren;
  hideIcon?: boolean;
}

export interface AccordionContentProps {
  children: JSXChildren;
  class?: string;
}
