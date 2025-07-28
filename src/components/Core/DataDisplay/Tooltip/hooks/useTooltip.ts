import { useSignal, useVisibleTask$, useTask$, $ } from "@builder.io/qwik";
import type { Signal, QRL } from "@builder.io/qwik";
import type { TooltipProps } from "../Tooltip.types";
import { getTooltipPosition } from "../tooltip-utils";

export interface UseTooltipReturn {
  isVisible: Signal<boolean>;
  triggerElement: Signal<Element | null>;
  tooltipElement: Signal<Element | null>;
  arrowElement: Signal<Element | null>;
  position: Signal<{ x: number; y: number } | null>;
  arrowPosition: Signal<{ x: number; y: number } | null>;
  colorClasses: string;
  sizeClasses: string;
  setTriggerElement: QRL<(el: Element) => void>;
  setTooltipElement: QRL<(el: Element) => void>;
  setArrowElement: QRL<(el: Element) => void>;
  showTooltip: QRL<() => void>;
  hideTooltip: QRL<() => void>;
  mouseEnterHandler: QRL<() => void> | undefined;
  mouseLeaveHandler: QRL<() => void> | undefined;
  clickHandler: QRL<() => void> | undefined;
  focusHandler: QRL<() => void> | undefined;
  blurHandler: QRL<() => void> | undefined;
  maxWidth: string | undefined;
  className: string;
  styleProps: Record<string, string>;
  interactive: boolean;
  delay: number;
}

export function useTooltip(props: TooltipProps): UseTooltipReturn {
  // Create primitive local references to all props to avoid capturing the props object
  const placement = props.placement || "top";
  const color = props.color || "default";
  const size = props.size || "md";
  const trigger = props.trigger || "hover";
  const delay = props.delay || 300;
  const hideDelay = props.hideDelay || 200;
  const disabled = props.disabled || false;
  const offset = props.offset || 8;
  const interactive = props.interactive || false;
  const maxWidth = props.maxWidth;
  const className = props.class || "";
  const styleProps = props.style || {};
  const triggerTypes = Array.isArray(trigger) ? trigger : [trigger];

  // State
  const isVisible = useSignal(false);
  const triggerElement = useSignal<Element | null>(null);
  const tooltipElement = useSignal<Element | null>(null);
  const arrowElement = useSignal<Element | null>(null);
  const position = useSignal<{ x: number; y: number } | null>(null);
  const arrowPosition = useSignal<{ x: number; y: number } | null>(null);

  // Determine active triggers
  const hasHover = triggerTypes.includes("hover");
  const hasClick = triggerTypes.includes("click");
  const hasFocus = triggerTypes.includes("focus");

  // Store important props locally to avoid serialization issues
  const visibleProp = props.visible;
  const onVisibleChangeHandler = props.onVisibleChange$;

  // Listen for controlled visibility changes
  useTask$(({ track }) => {
    // Track the original visible prop value
    const controlledVisible = track(() => visibleProp);
    if (controlledVisible !== undefined) {
      isVisible.value = controlledVisible;
    }
  });

  // Update positioning when dependencies change
  useTask$(({ track }) => {
    const visible = track(() => isVisible.value);
    const trigger = track(() => triggerElement.value);
    const tooltip = track(() => tooltipElement.value);
    const arrow = track(() => arrowElement.value);

    if (!visible || !trigger || !tooltip) {
      position.value = null;
      arrowPosition.value = null;
      return;
    }

    // Use the locally stored values to avoid serialization issues
    const tooltipPlacement = placement;
    const tooltipOffset = offset;

    // Calculate positions
    const result = getTooltipPosition({
      triggerElement: trigger,
      tooltipElement: tooltip,
      arrowElement: arrow,
      placement: tooltipPlacement,
      offset: tooltipOffset,
    });

    position.value = result.tooltipPos;
    arrowPosition.value = result.arrowPos;
  });

  // Element refs
  const setTriggerElement = $((el: Element) => {
    triggerElement.value = el;
  });

  const setTooltipElement = $((el: Element) => {
    tooltipElement.value = el;
  });

  const setArrowElement = $((el: Element) => {
    arrowElement.value = el;
  });

  // Visibility actions
  const showTooltip = $(() => {
    if (disabled) return;

    isVisible.value = true;

    // Use the locally captured handler to avoid serialization issues
    if (onVisibleChangeHandler) {
      onVisibleChangeHandler(true);
    }
  });

  const hideTooltip = $(() => {
    if (disabled) return;

    isVisible.value = false;

    // Use the locally captured handler to avoid serialization issues
    if (onVisibleChangeHandler) {
      onVisibleChangeHandler(false);
    }
  });

  // Event handlers
  const mouseEnterHandler = hasHover
    ? $(() => {
        showTooltip();
      })
    : undefined;

  const mouseLeaveHandler = hasHover
    ? $(() => {
        // Capture the values we need
        const interactiveValue = interactive;
        const hideDelayValue = hideDelay;

        if (interactiveValue) {
          setTimeout(() => {
            const tt = tooltipElement.value;
            const tr = triggerElement.value;

            if (tt && !tt.matches(":hover") && tr && !tr.matches(":hover")) {
              hideTooltip();
            }
          }, hideDelayValue);
        } else {
          setTimeout(() => hideTooltip(), hideDelayValue);
        }
      })
    : undefined;

  const clickHandler = hasClick
    ? $(() => {
        if (isVisible.value) {
          hideTooltip();
        } else {
          showTooltip();
        }
      })
    : undefined;

  const focusHandler = hasFocus
    ? $(() => {
        showTooltip();
      })
    : undefined;

  const blurHandler = hasFocus
    ? $(() => {
        const hideDelayValue = hideDelay;
        setTimeout(() => hideTooltip(), hideDelayValue);
      })
    : undefined;

  // Close on escape key
  useVisibleTask$(({ cleanup }) => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible.value) {
        hideTooltip();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    cleanup(() => {
      document.removeEventListener("keydown", handleEscapeKey);
    });
  });

  // Style maps with dark mode support
  const colorMap = {
    default: "bg-gray-800 text-white dark:bg-gray-700 dark:text-gray-100",
    primary: "bg-primary-500 text-white dark:bg-primary-dark-500 dark:text-white",
    secondary: "bg-secondary-500 text-white dark:bg-secondary-dark-500 dark:text-white",
    success: "bg-success-500 text-white dark:bg-success-dark dark:text-white",
    warning: "bg-warning-500 text-white dark:bg-warning-dark dark:text-white",
    error: "bg-error-500 text-white dark:bg-error-dark dark:text-white",
    info: "bg-info-500 text-white dark:bg-info-dark dark:text-white",
  };

  const sizeMap = {
    sm: "text-xs py-1 px-2",
    md: "text-sm py-1.5 px-3",
    lg: "text-base py-2 px-4",
  };

  const colorClasses = colorMap[color] || colorMap.default;
  const sizeClasses = sizeMap[size] || sizeMap.md;

  return {
    isVisible,
    triggerElement,
    tooltipElement,
    arrowElement,
    position,
    arrowPosition,
    colorClasses,
    sizeClasses,
    setTriggerElement,
    setTooltipElement,
    setArrowElement,
    showTooltip,
    hideTooltip,
    mouseEnterHandler,
    mouseLeaveHandler,
    clickHandler,
    focusHandler,
    blurHandler,
    maxWidth,
    className,
    styleProps,
    interactive,
    delay,
  };
}
