import { component$, createContextId, Slot } from "@builder.io/qwik";
import type { TooltipProps } from "./Tooltip.types";
import { useTooltip } from "./hooks/useTooltip";
import { TooltipTrigger } from "./TooltipTrigger";
import { TooltipContent } from "./TooltipContent";
import { TooltipArrow } from "./TooltipArrow";

// Create a context for sharing state between tooltip components
export const TooltipContext = createContextId<{
  isVisible: boolean;
  triggerRef: Element | null;
  position: { x: number; y: number };
  arrowPosition: { x: number; y: number };
  // Functions
  showTooltip$: () => void;
  hideTooltip$: () => void;
  toggleTooltip$: () => void;
  // Props
  placement: string;
  arrow: boolean;
  offset: number;
  animationDuration: number;
  interactive: boolean;
  id?: string;
  color: string;
  size: string;
  maxWidth: number;
  appendToBody: boolean;
  content: any;
  disabled: boolean;
  isControlled: boolean;
}>("tooltip-context");

/**
 * Tooltip component for displaying additional information when users hover over, focus on, or click an element
 */
export const Tooltip = component$<TooltipProps>((props) => {
  const tooltipState = useTooltip(props);
  const {
    isVisible,
    position,
    arrowPosition,
    colorClasses,
    sizeClasses,
    setTriggerElement,
    setTooltipElement,
    setArrowElement,
    mouseEnterHandler,
    mouseLeaveHandler,
    clickHandler,
    focusHandler,
    blurHandler,
    maxWidth,
    className,
    styleProps,
    interactive,
  } = tooltipState;

  return (
    <>
      <TooltipTrigger
        setTriggerElement={setTriggerElement}
        mouseEnterHandler={mouseEnterHandler}
        mouseLeaveHandler={mouseLeaveHandler}
        clickHandler={clickHandler}
        focusHandler={focusHandler}
        blurHandler={blurHandler}
      >
        <Slot />
      </TooltipTrigger>

      <TooltipContent
        isVisible={isVisible.value}
        content={props.content}
        colorClasses={colorClasses}
        sizeClasses={sizeClasses}
        position={position.value}
        setTooltipElement={setTooltipElement}
        interactive={interactive}
        maxWidth={maxWidth}
        class={className}
        style={styleProps}
      >
        <TooltipArrow
          position={arrowPosition.value}
          colorClasses={colorClasses}
          setArrowElement={setArrowElement}
        />
      </TooltipContent>
    </>
  );
});
