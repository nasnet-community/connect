import { component$, useVisibleTask$ } from "@builder.io/qwik";
import type { TooltipArrowProps } from "./Tooltip.types";

export const TooltipArrow = component$<TooltipArrowProps>((props) => {
  const { position, colorClasses, setArrowElement } = props;

  // Bail early if no position
  if (!position) {
    return null;
  }

  // Set arrow element reference when mounted
  useVisibleTask$(({ cleanup }) => {
    const element = document.querySelector("[data-tooltip-arrow]");
    if (element) {
      // Store the setArrowElement QRL locally to avoid serialization issues
      const setRef = setArrowElement;
      setRef(element);

      // Clean up when component unmounts
      cleanup(() => {
        // Don't pass null directly, use undefined to avoid serialization issues
        // The receiver can handle undefined as equivalent to null
        setRef(undefined as any);
      });
    }
  });

  // Calculate the position style
  const arrowStyle = {
    position: "absolute" as const,
    width: "10px",
    height: "10px",
    transform: "rotate(45deg)",
    top: `${position.y}px`,
    left: `${position.x}px`,
  };

  return (
    <div data-tooltip-arrow class={colorClasses} style={arrowStyle as any} />
  );
});
