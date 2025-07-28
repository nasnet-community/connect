import { component$, useComputed$ } from "@builder.io/qwik";
import { Link as QwikLink } from "@builder.io/qwik-city";
import { type LinkProps, type LinkColor } from "./Link.types";

/**
 * Link component for consistent styling of both internal and external links
 *
 * @example
 * ```tsx
 * // Internal link (uses Qwik routing)
 * <Link href="/about">About Us</Link>
 *
 * // External link
 * <Link href="https://qwik.builder.io/" external>Qwik Documentation</Link>
 *
 * // Custom styled link
 * <Link href="/contact" variant="button" color="accent">Contact Us</Link>
 * ```
 */
export const Link = component$<LinkProps>(
  ({
    href,
    external,
    variant = "standard",
    size = "base",
    weight = "medium",
    color = "primary",
    underline = "hover",
    newTab,
    prefixIcon,
    suffixIcon,
    truncate = false,
    disabled = false,
    active = false,
    secure = true,
    rel,
    ariaLabel,
    fontFamily = "sans",
    highContrast = false,
    reduceMotion = true,
    touchOptimized = false,
    theme = "auto",
    direction = "auto",
    printOptimized = false,
    focusRing = true,
    rippleEffect = false,
    class: className = "",
    id,
    children,
    onClick$,
    qwikCity,
  }) => {
    // Detect if the link is external based on the href if not explicitly set
    const isExternalLink = useComputed$(() => {
      if (external !== undefined) return external;
      return (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      );
    });

    // Determine if the link should open in a new tab
    const openInNewTab = useComputed$(() => {
      if (newTab !== undefined) return newTab;
      return isExternalLink.value;
    });

    // Build security related attributes for external links
    const securityAttrs = useComputed$(() => {
      if (!isExternalLink.value || !secure) return {};

      const relValues = ["noopener"];

      // Add noreferrer for security if it's a new tab
      if (openInNewTab.value) {
        relValues.push("noreferrer");
      }

      // Combine with user-provided rel values if any
      if (rel) {
        relValues.push(...rel.split(" "));
      }

      return {
        rel: relValues.join(" "),
        target: openInNewTab.value ? "_blank" : undefined,
      };
    });

    // Enhanced size mapping with fluid typography
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
    const getColorClasses = (): string => {
      const colorMap: Record<LinkColor, string> = {
        primary: "text-primary-600 dark:text-primary-400",
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
        accent: "text-secondary-600 dark:text-secondary-400",
        inherit: "text-inherit",
        success: "text-success-600 dark:text-success-400",
        error: "text-error-600 dark:text-error-400",
        warning: "text-warning-600 dark:text-warning-400",
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

    // Build CSS classes with enhanced features
    const classes = [
      // Base styles with motion preferences and direction support
      "inline-flex items-center",
      reduceMotion 
        ? "motion-reduce:transition-none motion-safe:transition-all motion-safe:duration-150" 
        : "transition-all duration-150",

      // Direction support
      direction === "ltr" && "ltr:flex-row",
      direction === "rtl" && "rtl:flex-row-reverse",

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

      // Size classes
      sizeMap[size],

      // Font weight
      {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      }[weight],

      // Enhanced color system
      getColorClasses(),

      // High contrast support
      highContrast && "high-contrast:text-black high-contrast:dark:text-white",

      // Variant styles with enhanced interactions
      variant === "standard" && [
        focusRing && "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
        touchOptimized && "touch:active:scale-95",
        rippleEffect && "relative overflow-hidden"
      ].filter(Boolean).join(" "),

      variant === "button" && [
        "px-4 py-2 rounded-md border border-current",
        "hover:bg-opacity-10 hover:bg-current",
        "active:bg-opacity-20 active:bg-current",
        focusRing && "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
        touchOptimized && "touch:py-3 touch:px-5",
        rippleEffect && "relative overflow-hidden"
      ].filter(Boolean).join(" "),

      variant === "nav" && [
        "py-2 px-1 border-b-2 border-transparent",
        "hover:border-current",
        "focus:outline-none focus:border-current",
        touchOptimized && "touch:py-3"
      ].filter(Boolean).join(" "),

      variant === "subtle" && [
        "hover:opacity-80 focus:outline-none",
        touchOptimized && "touch:opacity-70"
      ].filter(Boolean).join(" "),

      variant === "icon" && [
        "gap-2",
        focusRing && "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
        touchOptimized && "touch:gap-3"
      ].filter(Boolean).join(" "),

      variant === "breadcrumb" && [
        "gap-1 hover:opacity-80 focus:outline-none",
        touchOptimized && "touch:gap-2"
      ].filter(Boolean).join(" "),

      // Underline styles with enhanced animations
      {
        none: "no-underline",
        hover: "no-underline hover:underline",
        always: "underline",
        animate: [
          "no-underline relative",
          "after:absolute after:bottom-0",
          direction === "rtl" ? "after:right-0" : "after:left-0",
          "after:h-0.5 after:w-0 after:bg-current",
          "hover:after:w-full",
          reduceMotion 
            ? "motion-reduce:after:transition-none motion-safe:after:transition-all motion-safe:after:duration-300"
            : "after:transition-all after:duration-300"
        ].join(" "),
      }[underline],

      // Active state with enhanced styling
      active && variant === "nav" && "border-current font-semibold",
      active && variant !== "nav" && "font-semibold opacity-100",

      // Disabled state
      disabled && [
        "opacity-50 pointer-events-none cursor-default",
        "focus:ring-0 focus:outline-none"
      ].join(" "),

      // Touch optimization
      touchOptimized && [
        "touch:min-h-[44px] touch:min-w-[44px]",
        "touch:flex touch:items-center touch:justify-center"
      ].join(" "),

      // Print optimization
      printOptimized && "print:text-black print:no-underline",

      // Truncate text
      truncate && "truncate",

      // Ripple effect container
      rippleEffect && "before:absolute before:inset-0 before:rounded-inherit before:bg-current before:opacity-0 hover:before:opacity-10 active:before:opacity-20 before:transition-opacity",

      // Custom class
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // For internal links, use Qwik's Link component for client-side routing
    if (!isExternalLink.value && !disabled) {
      return (
        <QwikLink
          id={id}
          href={href}
          class={classes}
          aria-label={ariaLabel}
          {...qwikCity}
          onClick$={onClick$}
        >
          {prefixIcon && <span class="mr-1">{prefixIcon}</span>}
          {children}
          {suffixIcon && <span class="ml-1">{suffixIcon}</span>}
        </QwikLink>
      );
    }

    // For external links or disabled state, use a regular anchor tag
    return (
      <a
        id={id}
        href={!disabled ? href : undefined}
        class={classes}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        onClick$={!disabled ? onClick$ : undefined}
        {...(!disabled ? securityAttrs.value : {})}
      >
        {prefixIcon && <span class="mr-1">{prefixIcon}</span>}
        {children}
        {suffixIcon && <span class="ml-1">{suffixIcon}</span>}
      </a>
    );
  },
);
