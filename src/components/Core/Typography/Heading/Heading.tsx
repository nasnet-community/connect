import { component$, useComputed$, $ } from "@builder.io/qwik";
import type {
  HeadingProps,
  HeadingLevel,
  HeadingColor,
  HeadingSize,
} from "./Heading.types";

/**
 * Heading component for displaying headings with consistent styling.
 *
 * Supports different heading levels (h1-h6), weights, alignments, and responsive sizing.
 * Also provides semantic flexibility with the 'as' prop.
 */
export const Heading = component$<HeadingProps>(
  ({
    level = 2,
    as,
    weight = "semibold",
    align = "left",
    truncate = false,
    maxLines = 1,
    color = "primary",
    responsiveSize,
    fontFamily = "display",
    highContrast = false,
    reduceMotion = true,
    touchOptimized = false,
    theme = "auto",
    direction = "auto",
    containerResponsive = false,
    printOptimized = false,
    class: className = "",
    id,
    children,
  }) => {
    // The HTML element to render (for semantic HTML)
    const Element = as || (`h${level}` as const);

    // Enhanced size mapping for both levels and explicit sizes
    const getSize = $((sizeOrLevel: HeadingLevel | HeadingSize): string => {
      // Handle heading levels 1-6
      if (typeof sizeOrLevel === "number") {
        const levelSizeMap: Record<HeadingLevel, string> = {
          1: "text-5xl md:text-6xl lg:text-7xl", // Extra large for h1
          2: "text-4xl md:text-5xl lg:text-6xl", // Large for h2
          3: "text-3xl md:text-4xl lg:text-5xl", // Medium for h3
          4: "text-2xl md:text-3xl lg:text-4xl", // Smaller for h4
          5: "text-xl md:text-2xl lg:text-3xl",  // Small for h5
          6: "text-lg md:text-xl lg:text-2xl",   // Smallest for h6
        };
        return levelSizeMap[sizeOrLevel];
      }
      
      // Handle explicit size strings
      const sizeMap: Record<HeadingSize, string> = {
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
      return sizeMap[sizeOrLevel];
    });

    // Enhanced color system using design system colors
    const getColorClasses = (): string => {
      const colorMap: Record<HeadingColor, string> = {
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

      return theme === "auto" 
        ? colorMap[color] || `text-${color}` 
        : colorMap[color] || `${theme}:text-${color}`;
    };

    // Build responsive classes with enhanced breakpoints
    const responsiveClasses = useComputed$(() => {
      if (!responsiveSize) return "";
      
      const responsiveClassArray = [];
      
      // Standard breakpoints
      if (responsiveSize.base) responsiveClassArray.push(getSize(responsiveSize.base));
      if (responsiveSize["2xs"]) responsiveClassArray.push(`2xs:${getSize(responsiveSize["2xs"])}`);
      if (responsiveSize.xs) responsiveClassArray.push(`xs:${getSize(responsiveSize.xs)}`);
      if (responsiveSize.sm) responsiveClassArray.push(`sm:${getSize(responsiveSize.sm)}`);
      if (responsiveSize.md) responsiveClassArray.push(`md:${getSize(responsiveSize.md)}`);
      if (responsiveSize.lg) responsiveClassArray.push(`lg:${getSize(responsiveSize.lg)}`);
      if (responsiveSize.xl) responsiveClassArray.push(`xl:${getSize(responsiveSize.xl)}`);
      if (responsiveSize["2xl"]) responsiveClassArray.push(`2xl:${getSize(responsiveSize["2xl"])}`);
      if (responsiveSize["3xl"]) responsiveClassArray.push(`3xl:${getSize(responsiveSize["3xl"])}`);
      if (responsiveSize["4xl"]) responsiveClassArray.push(`4xl:${getSize(responsiveSize["4xl"])}`);
      
      // Device-specific breakpoints
      if (responsiveSize.mobile) responsiveClassArray.push(`mobile:${getSize(responsiveSize.mobile)}`);
      if (responsiveSize["mobile-md"]) responsiveClassArray.push(`mobile-md:${getSize(responsiveSize["mobile-md"])}`);
      if (responsiveSize.tablet) responsiveClassArray.push(`tablet:${getSize(responsiveSize.tablet)}`);
      if (responsiveSize.laptop) responsiveClassArray.push(`laptop:${getSize(responsiveSize.laptop)}`);
      if (responsiveSize.desktop) responsiveClassArray.push(`desktop:${getSize(responsiveSize.desktop)}`);
      
      return responsiveClassArray.join(" ");
    });

    // Combine all classes with enhanced features
    const classes = [
      // Base styles with motion preferences
      reduceMotion ? "motion-reduce:transition-none motion-safe:transition-colors motion-safe:duration-150" : "transition-colors duration-150",

      // Container responsive styles
      containerResponsive && "@container",

      // Size classes (static or responsive)
      responsiveSize ? responsiveClasses.value : getSize(level),

      // Font family
      {
        sans: "font-sans",
        "sans-rtl": "font-sans-rtl",
        serif: "font-serif", 
        "serif-rtl": "font-serif-rtl",
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
      getColorClasses(),

      // High contrast support
      highContrast && "high-contrast:text-black high-contrast:dark:text-white",

      // Text truncation with enhanced support
      truncate && maxLines === 1 && "truncate",
      truncate && maxLines > 1 && maxLines <= 6 && `line-clamp-${maxLines}`,
      truncate && maxLines > 6 && "line-clamp-6",

      // Direction support
      direction === "ltr" && "ltr:text-left",
      direction === "rtl" && "rtl:text-right",

      // Touch optimization
      touchOptimized && "touch:text-lg pointer:text-base",

      // Print optimization
      printOptimized && "print:text-black print:text-lg",

      // Focus styles for interactive headings
      "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",

      // Custom class
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Element id={id} class={classes}>
        {children}
      </Element>
    );
  },
);

export default Heading;
