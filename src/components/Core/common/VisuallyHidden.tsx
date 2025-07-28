import { component$, Slot, type PropsOf } from "@builder.io/qwik";
import { classNames } from "./utils";

export interface VisuallyHiddenProps extends Omit<PropsOf<"span">, "class"> {
  /**
   * The HTML element to render. Defaults to "span"
   */
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  
  /**
   * Additional CSS classes to apply
   */
  class?: string;
  
  /**
   * Whether the element should become visible when focused (useful for skip links)
   */
  focusable?: boolean;
  
  /**
   * Position variant for focusable elements
   */
  focusPosition?: "top-left" | "top-right" | "top-center" | "center";
  
  /**
   * Whether to use a more robust screen reader only approach
   */
  robust?: boolean;
}

/**
 * VisuallyHidden component that hides content visually while keeping it accessible to screen readers.
 * 
 * This component supports:
 * - Multiple element types (span, div, p, headings)
 * - Focusable mode for skip links and interactive elements
 * - Responsive positioning for focused elements
 * - Robust screen reader only styling
 * - Dark mode compatibility (though visually hidden)
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <VisuallyHidden>Screen reader only text</VisuallyHidden>
 * 
 * // Skip link
 * <VisuallyHidden focusable focusPosition="top-center">
 *   <a href="#main">Skip to main content</a>
 * </VisuallyHidden>
 * 
 * // Robust approach for complex content
 * <VisuallyHidden robust as="div">
 *   Complex screen reader content
 * </VisuallyHidden>
 * ```
 */
export const VisuallyHidden = component$<VisuallyHiddenProps>((props) => {
  const {
    as: Element = "span",
    class: className,
    focusable = false,
    focusPosition = "top-left",
    robust = false,
    ...rest
  } = props;

  // Base screen reader only classes - these work across all browsers and screen readers
  const baseClasses = robust
    ? // More robust approach that works better with some screen readers
      classNames(
        "absolute left-[-10000px] top-auto h-px w-px overflow-hidden",
        // Ensures the element is not focusable unless explicitly made so
        !focusable && "focus:left-[-10000px]"
      )
    : // Standard approach - more performant and widely supported
      classNames(
        "absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0",
        // Additional safety for some screen readers
        "not-sr-only:sr-only"
      );

  // Focus styles for when the element should become visible (skip links, etc.)
  const focusClasses = focusable
    ? classNames(
        // Remove screen reader only styles when focused
        "focus:not-sr-only focus:static focus:h-auto focus:w-auto focus:overflow-visible",
        "focus:whitespace-normal focus:border focus:p-2 focus:m-0",
        
        // Position the focused element
        focusPosition === "top-left" && "focus:absolute focus:top-4 focus:left-4 focus:z-50",
        focusPosition === "top-right" && "focus:absolute focus:top-4 focus:right-4 focus:z-50", 
        focusPosition === "top-center" && "focus:absolute focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-50",
        focusPosition === "center" && "focus:fixed focus:top-1/2 focus:left-1/2 focus:-translate-x-1/2 focus:-translate-y-1/2 focus:z-50",
        
        // Enhanced focus styling for better visibility
        "focus:bg-primary-500 focus:text-white focus:font-medium",
        "focus:rounded-md focus:shadow-lg",
        "focus:ring-2 focus:ring-primary-400 focus:ring-offset-2",
        
        // Dark mode support for focused state
        "dark:focus:bg-primary-400 dark:focus:text-gray-900",
        "dark:focus:ring-primary-300 dark:focus:ring-offset-gray-800",
        
        // Responsive adjustments for focused elements
        "focus:text-sm focus:px-3 focus:py-2",
        "sm:focus:text-base sm:focus:px-4 sm:focus:py-2",
        "md:focus:text-lg md:focus:px-6 md:focus:py-3",
        
        // Smooth transitions
        "transition-all duration-200 ease-out"
      )
    : "";

  const combinedClasses = classNames(
    baseClasses,
    focusClasses,
    className
  );

  // Inline styles for maximum compatibility (some screen readers ignore classes)
  const inlineStyles = !focusable && !robust
    ? {
        clip: "rect(0, 0, 0, 0)",
        clipPath: "inset(50%)",
        ...(typeof rest.style === 'object' && rest.style ? rest.style : {}),
      }
    : rest.style;

  return (
    <Element
      {...rest}
      class={combinedClasses}
      style={inlineStyles}
      // ARIA attributes for better screen reader support
      aria-hidden={focusable ? undefined : "false"}
      // Ensure focusable elements are included in tab order
      tabIndex={focusable ? rest.tabIndex : -1}
    >
      <Slot />
    </Element>
  );
});
