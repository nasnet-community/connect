import type { JSXChildren, QRL } from "@builder.io/qwik";

export type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "right"
  | "right-start"
  | "right-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end";

export type TooltipTriggerType = "hover" | "click" | "focus" | "manual";
export type TooltipSize = "sm" | "md" | "lg";
export type TooltipColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

export interface TooltipProps {
  content: string | JSXChildren;
  placement?: TooltipPlacement;
  size?: TooltipSize;
  color?: TooltipColor;
  trigger?: TooltipTriggerType | TooltipTriggerType[];
  delay?: number;
  hideDelay?: number;
  disabled?: boolean;
  visible?: boolean;
  onVisibleChange$?: QRL<(visible: boolean) => void>;
  offset?: number;
  interactive?: boolean;
  maxWidth?: string;
  class?: string;
  style?: Record<string, string>;
}

export interface TooltipTriggerProps {
  setTriggerElement: QRL<(el: Element) => void>;
  mouseEnterHandler?: QRL<() => void>;
  mouseLeaveHandler?: QRL<() => void>;
  clickHandler?: QRL<() => void>;
  focusHandler?: QRL<() => void>;
  blurHandler?: QRL<() => void>;
}

export interface TooltipContentProps {
  content: string | JSXChildren;
  isVisible: boolean;
  colorClasses: string;
  sizeClasses: string;
  position: { x: number; y: number } | null;
  setTooltipElement: QRL<(el: Element) => void>;
  interactive?: boolean;
  maxWidth?: string;
  class?: string;
  style?: Record<string, string>;
}

export interface TooltipArrowProps {
  position: { x: number; y: number } | null;
  colorClasses: string;
  setArrowElement: QRL<(el: Element) => void>;
}
