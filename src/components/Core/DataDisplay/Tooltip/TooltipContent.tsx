import { component$, Slot, useVisibleTask$ } from "@builder.io/qwik";
import type { TooltipContentProps } from "./Tooltip.types";
import type { CSSProperties } from "./tooltip-utils";

export const TooltipContent = component$<TooltipContentProps>((props) => {
  const {
    isVisible,
    content,
    colorClasses,
    sizeClasses,
    position,
    setTooltipElement,
    interactive = false,
    maxWidth,
    class: className = "",
    style: styleProps = {},
  } = props;

  // Set element reference when mounted
  useVisibleTask$(({ cleanup }) => {
    if (isVisible) {
      const element = document.querySelector("[data-tooltip-content]");
      if (element) {
        // Store the QRL locally to avoid serialization issues
        const setRef = setTooltipElement;
        setRef(element);

        // Clean up when the component unmounts
        cleanup(() => {
          // Using undefined instead of null for better serialization
          setRef(undefined as any);
        });
      }
    }
  });

  // Don't render if not visible
  if (!isVisible) {
    return null;
  }

  // Calculate style for positioning
  const positionStyle: CSSProperties = position
    ? {
        position: "absolute" as const,
        top: `${position.y}px`,
        left: `${position.x}px`,
        zIndex: 1000,
        ...(styleProps as any),
      }
    : {
        visibility: "hidden",
        position: "absolute" as const,
        zIndex: 1000,
        ...(styleProps as any),
      };

  // Add max width if provided
  if (maxWidth) {
    positionStyle.maxWidth = maxWidth;
  }

  return (
    <div
      data-tooltip-content
      role="tooltip"
      class={`
        pointer-events-none rounded shadow-md transition-opacity
        ${colorClasses}
        ${sizeClasses}
        ${interactive ? "pointer-events-auto" : ""}
        ${className}
      `}
      style={positionStyle as any}
    >
      {typeof content === "string" ? content : content}
      <Slot />
    </div>
  );
});
