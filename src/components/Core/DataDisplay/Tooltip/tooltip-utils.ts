import { $ } from "@builder.io/qwik";
import type {
  TooltipColor,
  TooltipPlacement,
  TooltipSize,
} from "./Tooltip.types";

// Define CSSProperties type
export interface CSSProperties {
  [key: string]: string | number | CSSProperties | undefined;
  position?: "absolute" | "relative" | "fixed" | "sticky";
  maxWidth?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  zIndex?: number;
  visibility?: string;
  transform?: string;
  width?: string;
  height?: string;
}

/**
 * Get tooltip size classes based on size prop
 */
export const getTooltipSizeClasses = (size: TooltipSize | string) => {
  const sizeClasses = {
    sm: "text-xs py-1 px-2",
    md: "text-sm py-1.5 px-3",
    lg: "text-base py-2 px-4",
  };

  return sizeClasses[size as TooltipSize] || sizeClasses.md;
};

/**
 * Get tooltip color classes based on color prop
 */
export const getTooltipColorClasses = (color: TooltipColor | string) => {
  const colorClasses = {
    default: "bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800",
    primary:
      "bg-primary-700 text-white dark:bg-primary-300 dark:text-primary-900",
    secondary:
      "bg-secondary-700 text-white dark:bg-secondary-300 dark:text-secondary-900",
    success: "bg-green-700 text-white dark:bg-green-300 dark:text-green-900",
    warning: "bg-yellow-700 text-white dark:bg-yellow-300 dark:text-yellow-900",
    error: "bg-red-700 text-white dark:bg-red-300 dark:text-red-900",
    info: "bg-blue-700 text-white dark:bg-blue-300 dark:text-blue-900",
  };

  return colorClasses[color as TooltipColor] || colorClasses.default;
};

/**
 * Get arrow color classes based on color prop
 */
export const getArrowColorClasses = (color: TooltipColor | string) => {
  const arrowColorClasses = {
    default: "border-gray-800 dark:border-gray-100",
    primary: "border-primary-700 dark:border-primary-300",
    secondary: "border-secondary-700 dark:border-secondary-300",
    success: "border-green-700 dark:border-green-300",
    warning: "border-yellow-700 dark:border-yellow-300",
    error: "border-red-700 dark:border-red-300",
    info: "border-blue-700 dark:border-blue-300",
  };

  return arrowColorClasses[color as TooltipColor] || arrowColorClasses.default;
};

/**
 * Get arrow transform based on placement with RTL support
 */
export const getArrowTransform = (placement: TooltipPlacement | string) => {
  const arrowStyles: Record<string, string> = {
    top: "rotate(45deg)",
    "top-start": "rotate(45deg)",
    "top-end": "rotate(45deg)",
    bottom: "rotate(225deg)",
    "bottom-start": "rotate(225deg)",
    "bottom-end": "rotate(225deg)",
    left: "rotate(135deg)",
    "left-start": "rotate(135deg)",
    "left-end": "rotate(135deg)",
    right: "rotate(-45deg)",
    "right-start": "rotate(-45deg)",
    "right-end": "rotate(-45deg)",
  };

  return arrowStyles[placement as TooltipPlacement] || "rotate(45deg)";
};

/**
 * Calculate the position of tooltip and arrow
 */
export const calculatePosition = $(
  (
    triggerEl: HTMLElement,
    tooltipEl: HTMLElement,
    placement: string,
    offset: number,
  ) => {
    if (!triggerEl || !tooltipEl) return { top: 0, left: 0 };

    const triggerRect = triggerEl.getBoundingClientRect();
    const tooltipRect = tooltipEl.getBoundingClientRect();
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    let top = 0;
    let left = 0;

    // Calculate position based on placement
    switch (placement) {
      case "top":
        top = triggerRect.top - tooltipRect.height - offset + scrollY;
        left =
          triggerRect.left +
          (triggerRect.width - tooltipRect.width) / 2 +
          scrollX;
        break;
      case "top-start":
        top = triggerRect.top - tooltipRect.height - offset + scrollY;
        left = triggerRect.left + scrollX;
        break;
      case "top-end":
        top = triggerRect.top - tooltipRect.height - offset + scrollY;
        left = triggerRect.right - tooltipRect.width + scrollX;
        break;
      case "bottom":
        top = triggerRect.bottom + offset + scrollY;
        left =
          triggerRect.left +
          (triggerRect.width - tooltipRect.width) / 2 +
          scrollX;
        break;
      case "bottom-start":
        top = triggerRect.bottom + offset + scrollY;
        left = triggerRect.left + scrollX;
        break;
      case "bottom-end":
        top = triggerRect.bottom + offset + scrollY;
        left = triggerRect.right - tooltipRect.width + scrollX;
        break;
      case "left":
        top =
          triggerRect.top +
          (triggerRect.height - tooltipRect.height) / 2 +
          scrollY;
        left = triggerRect.left - tooltipRect.width - offset + scrollX;
        break;
      case "left-start":
        top = triggerRect.top + scrollY;
        left = triggerRect.left - tooltipRect.width - offset + scrollX;
        break;
      case "left-end":
        top = triggerRect.bottom - tooltipRect.height + scrollY;
        left = triggerRect.left - tooltipRect.width - offset + scrollX;
        break;
      case "right":
        top =
          triggerRect.top +
          (triggerRect.height - tooltipRect.height) / 2 +
          scrollY;
        left = triggerRect.right + offset + scrollX;
        break;
      case "right-start":
        top = triggerRect.top + scrollY;
        left = triggerRect.right + offset + scrollX;
        break;
      case "right-end":
        top = triggerRect.bottom - tooltipRect.height + scrollY;
        left = triggerRect.right + offset + scrollX;
        break;
    }

    // Adjust to stay within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Prevent left overflow
    if (left < 0) {
      left = 0;
    }

    // Prevent right overflow
    if (left + tooltipRect.width > viewportWidth) {
      left = viewportWidth - tooltipRect.width;
    }

    // Prevent top overflow
    if (top < 0) {
      top = 0;
    }

    // Prevent bottom overflow
    if (top + tooltipRect.height > viewportHeight + scrollY) {
      top = viewportHeight + scrollY - tooltipRect.height;
    }

    return { top, left };
  },
);

/**
 * Calculate the position of the arrow
 */
export const calculateArrowPosition = $(
  (triggerEl: HTMLElement, tooltipEl: HTMLElement, placement: string) => {
    if (!triggerEl || !tooltipEl) return { top: 0, left: 0 };

    const triggerRect = triggerEl.getBoundingClientRect();
    const tooltipRect = tooltipEl.getBoundingClientRect();
    const arrowSize = 8; // Half of the arrow width/height

    let arrowTop = 0;
    let arrowLeft = 0;

    // Calculate arrow position based on placement
    if (placement.startsWith("top")) {
      arrowTop = tooltipRect.height - arrowSize;
      arrowLeft =
        placement === "top"
          ? tooltipRect.width / 2 - arrowSize
          : placement === "top-start"
            ? triggerRect.width / 2 - arrowSize
            : tooltipRect.width - triggerRect.width / 2 - arrowSize;
    } else if (placement.startsWith("bottom")) {
      arrowTop = -arrowSize;
      arrowLeft =
        placement === "bottom"
          ? tooltipRect.width / 2 - arrowSize
          : placement === "bottom-start"
            ? triggerRect.width / 2 - arrowSize
            : tooltipRect.width - triggerRect.width / 2 - arrowSize;
    } else if (placement.startsWith("left")) {
      arrowTop =
        placement === "left"
          ? tooltipRect.height / 2 - arrowSize
          : placement === "left-start"
            ? triggerRect.height / 2 - arrowSize
            : tooltipRect.height - triggerRect.height / 2 - arrowSize;
      arrowLeft = tooltipRect.width - arrowSize;
    } else if (placement.startsWith("right")) {
      arrowTop =
        placement === "right"
          ? tooltipRect.height / 2 - arrowSize
          : placement === "right-start"
            ? triggerRect.height / 2 - arrowSize
            : tooltipRect.height - triggerRect.height / 2 - arrowSize;
      arrowLeft = -arrowSize;
    }

    return { top: arrowTop, left: arrowLeft };
  },
);

interface PositionParams {
  triggerElement: Element;
  tooltipElement: Element;
  arrowElement: Element | null;
  placement: TooltipPlacement;
  offset: number;
}

interface Position {
  x: number;
  y: number;
}

interface PositionResult {
  tooltipPos: Position;
  arrowPos: Position | null;
}

export function getTooltipPosition(params: PositionParams): PositionResult {
  const { triggerElement, tooltipElement, arrowElement, placement, offset } =
    params;

  const triggerRect = triggerElement.getBoundingClientRect();
  const tooltipRect = tooltipElement.getBoundingClientRect();

  const scrollX = window.scrollX || window.pageXOffset;
  const scrollY = window.scrollY || window.pageYOffset;

  // Check if we're in RTL mode
  const isRTL = document.documentElement.dir === 'rtl' || 
    document.body.dir === 'rtl' ||
    getComputedStyle(document.documentElement).direction === 'rtl';

  // Calculate tooltip position
  let x = 0;
  let y = 0;

  // Calculate arrow position if arrow element exists
  let arrowX = 0;
  let arrowY = 0;

  // Base positioning based on placement with RTL support
  const placementParts = placement.split("-");
  let mainPlacement = placementParts[0] as
    | "top"
    | "right"
    | "bottom"
    | "left";
  const alignment = placementParts[1] as "start" | "end" | undefined;

  // Flip left/right placements in RTL mode
  if (isRTL) {
    if (mainPlacement === "left") {
      mainPlacement = "right";
    } else if (mainPlacement === "right") {
      mainPlacement = "left";
    }
  }

  // Get arrow dimensions if it exists
  const arrowWidth = arrowElement
    ? arrowElement.getBoundingClientRect().width
    : 0;
  const arrowHeight = arrowElement
    ? arrowElement.getBoundingClientRect().height
    : 0;

  // Main placement (top, right, bottom, left)
  switch (mainPlacement) {
    case "top":
      y = triggerRect.top - tooltipRect.height - offset + scrollY;
      x =
        triggerRect.left +
        triggerRect.width / 2 -
        tooltipRect.width / 2 +
        scrollX;
      if (arrowElement) {
        arrowY = tooltipRect.height;
        arrowX = tooltipRect.width / 2 - arrowWidth / 2;
      }
      break;

    case "bottom":
      y = triggerRect.bottom + offset + scrollY;
      x =
        triggerRect.left +
        triggerRect.width / 2 -
        tooltipRect.width / 2 +
        scrollX;
      if (arrowElement) {
        arrowY = -arrowHeight;
        arrowX = tooltipRect.width / 2 - arrowWidth / 2;
      }
      break;

    case "left":
      x = triggerRect.left - tooltipRect.width - offset + scrollX;
      y =
        triggerRect.top +
        triggerRect.height / 2 -
        tooltipRect.height / 2 +
        scrollY;
      if (arrowElement) {
        arrowX = tooltipRect.width;
        arrowY = tooltipRect.height / 2 - arrowHeight / 2;
      }
      break;

    case "right":
      x = triggerRect.right + offset + scrollX;
      y =
        triggerRect.top +
        triggerRect.height / 2 -
        tooltipRect.height / 2 +
        scrollY;
      if (arrowElement) {
        arrowX = -arrowWidth;
        arrowY = tooltipRect.height / 2 - arrowHeight / 2;
      }
      break;
  }

  // Handle alignment variants (start, end) with RTL support
  if (alignment) {
    if (["top", "bottom"].includes(mainPlacement)) {
      // For top/bottom placements, start/end refer to horizontal alignment
      let effectiveAlignment = alignment;
      if (isRTL) {
        // In RTL, flip start/end for horizontal alignments
        effectiveAlignment = alignment === "start" ? "end" : "start";
      }
      
      if (effectiveAlignment === "start") {
        x = triggerRect.left + scrollX;
        if (arrowElement) {
          arrowX = Math.min(
            triggerRect.width / 2 - arrowWidth / 2,
            tooltipRect.width / 4,
          );
        }
      } else if (effectiveAlignment === "end") {
        x = triggerRect.right - tooltipRect.width + scrollX;
        if (arrowElement) {
          arrowX =
            tooltipRect.width -
            Math.min(
              triggerRect.width / 2 + arrowWidth / 2,
              (tooltipRect.width * 3) / 4,
            );
        }
      }
    } else if (["left", "right"].includes(mainPlacement)) {
      // For left/right placements, start/end refer to vertical alignment (no RTL flip needed)
      if (alignment === "start") {
        y = triggerRect.top + scrollY;
        if (arrowElement) {
          arrowY = Math.min(
            triggerRect.height / 2 - arrowHeight / 2,
            tooltipRect.height / 4,
          );
        }
      } else if (alignment === "end") {
        y = triggerRect.bottom - tooltipRect.height + scrollY;
        if (arrowElement) {
          arrowY =
            tooltipRect.height -
            Math.min(
              triggerRect.height / 2 + arrowHeight / 2,
              (tooltipRect.height * 3) / 4,
            );
        }
      }
    }
  }

  // Constrain tooltip to viewport
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  if (x < scrollX) {
    // Too far left, adjust to right side
    const oldX = x;
    x = scrollX;
    if (arrowElement && ["top", "bottom"].includes(mainPlacement)) {
      arrowX -= scrollX - oldX;
    }
  } else if (x + tooltipRect.width > scrollX + viewportWidth) {
    // Too far right, adjust to left
    const oldX = x;
    x = scrollX + viewportWidth - tooltipRect.width;
    if (arrowElement && ["top", "bottom"].includes(mainPlacement)) {
      arrowX += oldX - x;
    }
  }

  if (y < scrollY) {
    // Too far up, adjust to bottom
    const oldY = y;
    y = scrollY;
    if (arrowElement && ["left", "right"].includes(mainPlacement)) {
      arrowY -= scrollY - oldY;
    }
  } else if (y + tooltipRect.height > scrollY + viewportHeight) {
    // Too far down, adjust to top
    const oldY = y;
    y = scrollY + viewportHeight - tooltipRect.height;
    if (arrowElement && ["left", "right"].includes(mainPlacement)) {
      arrowY += oldY - y;
    }
  }

  return {
    tooltipPos: { x, y },
    arrowPos: arrowElement ? { x: arrowX, y: arrowY } : null,
  };
}
