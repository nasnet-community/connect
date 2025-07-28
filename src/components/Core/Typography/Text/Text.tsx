import { component$, useComputed$ } from "@builder.io/qwik";
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
export const Text = component$<TextProps>(
  ({
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
    fontFamily = "sans",
    highContrast = false,
    reduceMotion = true,
    touchOptimized = false,
    theme = "auto",
    direction = "auto",
    containerResponsive = false,
    printOptimized = false,
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

    // Size mapping for enhanced Tailwind configuration
    const sizeMap = {
      "3xs": "text-3xs",
      "2xs": "text-2xs", 
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
      "7xl": "text-7xl",
      "8xl": "text-8xl",
      "9xl": "text-9xl",
      "fluid-xs": "text-fluid-xs",
      "fluid-sm": "text-fluid-sm",
      "fluid-base": "text-fluid-base",
      "fluid-lg": "text-fluid-lg",
      "fluid-xl": "text-fluid-xl",
      "fluid-2xl": "text-fluid-2xl",
      "fluid-3xl": "text-fluid-3xl",
      "fluid-4xl": "text-fluid-4xl",
    };

    // Enhanced color system using design system colors
    const colorMap = {
      primary: theme === "dark" 
        ? "text-gray-100" 
        : theme === "dim" 
          ? "text-gray-200" 
          : "text-gray-900",
      secondary: theme === "dark" 
        ? "text-gray-300" 
        : theme === "dim" 
          ? "text-gray-400" 
          : "text-gray-700",
      tertiary: theme === "dark" 
        ? "text-gray-400" 
        : theme === "dim" 
          ? "text-gray-500" 
          : "text-gray-500",
      inverse: "text-white dark:text-gray-900",
      accent: "text-primary-600 dark:text-primary-400",
      success: "text-success-600 dark:text-success-400", 
      warning: "text-warning-600 dark:text-warning-400",
      error: "text-error-600 dark:text-error-400",
      info: "text-info-600 dark:text-info-400",
      subtle: "text-gray-400 dark:text-gray-500",
      "surface-light": "text-surface-light-DEFAULT",
      "surface-dark": "text-surface-dark-DEFAULT",
      "surface-dim": "text-surface-dim-DEFAULT",
      "primary-light": "text-primary-light",
      "primary-dark": "text-primary-dark-400",
      "secondary-light": "text-secondary-light",
      "secondary-dark": "text-secondary-dark-400",
      "contrast-medium": "text-contrast-medium",
      "contrast-high": "text-contrast-high",
    };

    // Build responsive classes with enhanced breakpoints
    const responsiveClasses = useComputed$(() => {
      if (!responsiveSize) return "";
      
      const responsiveClassArray = [];
      
      // Standard breakpoints
      if (responsiveSize.base) responsiveClassArray.push(sizeMap[responsiveSize.base]);
      if (responsiveSize["2xs"]) responsiveClassArray.push(`2xs:${sizeMap[responsiveSize["2xs"]]}`);
      if (responsiveSize.xs) responsiveClassArray.push(`xs:${sizeMap[responsiveSize.xs]}`);
      if (responsiveSize.sm) responsiveClassArray.push(`sm:${sizeMap[responsiveSize.sm]}`);
      if (responsiveSize.md) responsiveClassArray.push(`md:${sizeMap[responsiveSize.md]}`);
      if (responsiveSize.lg) responsiveClassArray.push(`lg:${sizeMap[responsiveSize.lg]}`);
      if (responsiveSize.xl) responsiveClassArray.push(`xl:${sizeMap[responsiveSize.xl]}`);
      if (responsiveSize["2xl"]) responsiveClassArray.push(`2xl:${sizeMap[responsiveSize["2xl"]]}`);
      if (responsiveSize["3xl"]) responsiveClassArray.push(`3xl:${sizeMap[responsiveSize["3xl"]]}`);
      if (responsiveSize["4xl"]) responsiveClassArray.push(`4xl:${sizeMap[responsiveSize["4xl"]]}`);
      
      // Device-specific breakpoints
      if (responsiveSize.mobile) responsiveClassArray.push(`mobile:${sizeMap[responsiveSize.mobile]}`);
      if (responsiveSize["mobile-md"]) responsiveClassArray.push(`mobile-md:${sizeMap[responsiveSize["mobile-md"]]}`);
      if (responsiveSize.tablet) responsiveClassArray.push(`tablet:${sizeMap[responsiveSize.tablet]}`);
      if (responsiveSize.laptop) responsiveClassArray.push(`laptop:${sizeMap[responsiveSize.laptop]}`);
      if (responsiveSize.desktop) responsiveClassArray.push(`desktop:${sizeMap[responsiveSize.desktop]}`);
      
      return responsiveClassArray.join(" ");
    });

    // Build CSS classes with enhanced features
    const classes = [
      // Base styles with motion preferences
      reduceMotion ? "motion-reduce:transition-none motion-safe:transition-colors motion-safe:duration-150" : "transition-colors duration-150",

      // Container responsive styles
      containerResponsive && "@container",

      // Size classes (static or responsive)
      responsiveSize ? responsiveClasses.value : sizeMap[size],

      // Font family
      {
        sans: "font-sans",
        "sans-rtl": "font-sans-rtl", 
        serif: "font-serif",
        "serif-rtl": "font-serif-rtl",
        mono: "font-mono",
        display: "font-display",
        body: "font-body",
      }[fontFamily],

      // Font weight
      {
        light: "font-light",
        normal: "font-normal", 
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
      }[weight],

      // Text alignment with logical properties
      {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        start: "text-start",
        end: "text-end",
      }[align],

      // Enhanced color system
      theme === "auto" 
        ? colorMap[color] || `text-${color}` 
        : colorMap[color] || `${theme}:text-${color}`,

      // High contrast support
      highContrast && "high-contrast:text-black high-contrast:dark:text-white",

      // Text truncation with enhanced support
      truncate && maxLines === 1 && "truncate",
      truncate && maxLines > 1 && maxLines <= 6 && `line-clamp-${maxLines}`,
      truncate && maxLines > 6 && "line-clamp-6",

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

      // Direction support
      direction === "ltr" && "ltr:text-left",
      direction === "rtl" && "rtl:text-right",

      // Touch optimization
      touchOptimized && "touch:text-lg pointer:text-base",

      // Print optimization
      printOptimized && "print:text-black print:text-sm",

      // Variant-specific styles with enhanced colors
      variant === "caption" && "text-sm text-gray-500 dark:text-gray-400",
      variant === "label" && "font-medium",
      variant === "code" && [
        "bg-surface-light-secondary dark:bg-surface-dark-secondary",
        "text-primary-600 dark:text-primary-400",
        "px-1.5 py-0.5 rounded font-mono border border-gray-200 dark:border-gray-700"
      ].join(" "),
      variant === "quote" && [
        "border-s-4 border-primary-300 dark:border-primary-700",
        "ps-4 italic text-gray-700 dark:text-gray-300"
      ].join(" "),

      // Interactive styles with touch support
      onClick$ && [
        "cursor-pointer",
        touchOptimized ? "touch:active:scale-95" : "hover:underline",
        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      ].join(" "),

      // Custom class
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Element id={id} class={classes} onClick$={onClick$}>
        {children}
      </Element>
    );
  },
);
