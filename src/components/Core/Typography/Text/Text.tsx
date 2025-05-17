import { component$ } from "@builder.io/qwik";
import { type TextProps } from "./Text.types";

/**
 * Text component for consistent typography across the application
 * 
 * @example
 * ```tsx
 * <Text>Default body text</Text>
 * <Text variant="caption" color="secondary">Secondary caption text</Text>
 * <Text size="lg" weight="bold">Large bold text</Text>
 * ```
 */
export const Text = component$<TextProps>(({
  variant = "body",
  as,
  size = "base",
  weight = "normal",
  align = "left",
  color = "primary",
  truncate = false,
  maxLines = 1,
  transform = "none",
  decoration = "none",
  italic = false,
  monospace = variant === "code",
  srOnly = false,
  responsiveSize,
  class: className = "",
  id,
  children,
  onClick$,
}) => {
  // Determine the HTML element to render based on variant and as prop
  const getElementType = () => {
    if (as) return as;
    if (variant === "paragraph" || variant === "body") return "p";
    if (variant === "code") return "code";
    if (variant === "quote") return "blockquote";
    return "span";
  };
  const Element = getElementType();

  // Build CSS classes
  const classes = [
    // Base styles
    "transition-colors duration-150",
    
    // Size classes
    !responsiveSize && {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    }[size],
    
    // Responsive size classes
    responsiveSize?.base && {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    }[responsiveSize.base],
    responsiveSize?.sm && {
      xs: "sm:text-xs",
      sm: "sm:text-sm",
      base: "sm:text-base",
      lg: "sm:text-lg",
      xl: "sm:text-xl",
      "2xl": "sm:text-2xl",
    }[responsiveSize.sm],
    responsiveSize?.md && {
      xs: "md:text-xs",
      sm: "md:text-sm",
      base: "md:text-base",
      lg: "md:text-lg",
      xl: "md:text-xl",
      "2xl": "md:text-2xl",
    }[responsiveSize.md],
    responsiveSize?.lg && {
      xs: "lg:text-xs",
      sm: "lg:text-sm",
      base: "lg:text-base",
      lg: "lg:text-lg",
      xl: "lg:text-xl",
      "2xl": "lg:text-2xl",
    }[responsiveSize.lg],
    responsiveSize?.xl && {
      xs: "xl:text-xs",
      sm: "xl:text-sm",
      base: "xl:text-base",
      lg: "xl:text-lg",
      xl: "xl:text-xl",
      "2xl": "xl:text-2xl",
    }[responsiveSize.xl],
    responsiveSize?.["2xl"] && {
      xs: "2xl:text-xs",
      sm: "2xl:text-sm",
      base: "2xl:text-base",
      lg: "2xl:text-lg",
      xl: "2xl:text-xl",
      "2xl": "2xl:text-2xl",
    }[responsiveSize["2xl"]],
    
    // Font weight
    {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    }[weight],
    
    // Text alignment
    {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    }[align],
    
    // Text color - light mode
    {
      primary: "text-gray-900 dark:text-gray-100",
      secondary: "text-gray-700 dark:text-gray-300",
      tertiary: "text-gray-500 dark:text-gray-400",
      inverse: "text-white dark:text-gray-900",
      accent: "text-blue-600 dark:text-blue-400",
      success: "text-green-600 dark:text-green-400",
      warning: "text-yellow-600 dark:text-yellow-400",
      error: "text-red-600 dark:text-red-400",
      info: "text-cyan-600 dark:text-cyan-400",
      subtle: "text-gray-400 dark:text-gray-500",
    }[color],
    
    // Text truncation
    truncate && maxLines === 1 && "truncate",
    truncate && maxLines > 1 && "line-clamp-" + Math.min(maxLines, 6),
    
    // Text transformation
    {
      uppercase: "uppercase",
      lowercase: "lowercase",
      capitalize: "capitalize",
      none: "",
    }[transform],
    
    // Text decoration
    {
      underline: "underline",
      "line-through": "line-through",
      none: "",
    }[decoration],
    
    // Font style
    italic && "italic",
    
    // Monospace font
    monospace && "font-mono",
    
    // Screen reader only
    srOnly && "sr-only",
    
    // Variant-specific styles
    variant === "caption" && "text-sm text-gray-500 dark:text-gray-400",
    variant === "label" && "font-medium",
    variant === "code" && "bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono",
    variant === "quote" && "border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic",
    
    // Interactive styles
    onClick$ && "cursor-pointer hover:underline",
    
    // Custom class
    className,
  ].filter(Boolean).join(" ");

  return (
    <Element 
      id={id} 
      class={classes}
      onClick$={onClick$}
    >
      {children}
    </Element>
  );
});
