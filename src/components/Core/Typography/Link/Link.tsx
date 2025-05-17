import { component$, useComputed$ } from "@builder.io/qwik";
import { Link as QwikLink } from "@builder.io/qwik-city";
import { type LinkProps } from "./Link.types";

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
export const Link = component$<LinkProps>(({
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
  class: className = "",
  id,
  children,
  onClick$,
  qwikCity,
}) => {
  // Detect if the link is external based on the href if not explicitly set
  const isExternalLink = useComputed$(() => {
    if (external !== undefined) return external;
    return href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
  });

  // Determine if the link should open in a new tab
  const openInNewTab = useComputed$(() => {
    if (newTab !== undefined) return newTab;
    return isExternalLink.value;
  });

  // Build security related attributes for external links
  const securityAttrs = useComputed$(() => {
    if (!isExternalLink.value || !secure) return {};
    
    const relValues = ['noopener'];
    
    // Add noreferrer for security if it's a new tab
    if (openInNewTab.value) {
      relValues.push('noreferrer');
    }
    
    // Combine with user-provided rel values if any
    if (rel) {
      relValues.push(...rel.split(' '));
    }
    
    return {
      rel: relValues.join(' '),
      target: openInNewTab.value ? '_blank' : undefined
    };
  });

  // Build CSS classes
  const classes = [
    // Base styles
    "inline-flex items-center transition-colors duration-150",
    
    // Variant styles
    variant === "standard" && "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
    variant === "button" && "px-4 py-2 rounded-md border border-current hover:bg-opacity-10 hover:bg-current focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
    variant === "nav" && "py-2 px-1 border-b-2 hover:border-current focus:outline-none",
    variant === "subtle" && "hover:opacity-80 focus:outline-none",
    variant === "icon" && "inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
    variant === "breadcrumb" && "flex items-center gap-1 hover:opacity-80 focus:outline-none",
    
    // Size classes for text
    {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    }[size],
    
    // Font weight
    {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    }[weight],
    
    // Link color - light mode and dark mode
    {
      primary: "text-blue-600 dark:text-blue-400",
      secondary: "text-gray-700 dark:text-gray-300",
      tertiary: "text-gray-500 dark:text-gray-400",
      inverse: "text-white dark:text-gray-900",
      accent: "text-indigo-600 dark:text-indigo-400",
      inherit: "text-inherit",
      success: "text-green-600 dark:text-green-400",
      error: "text-red-600 dark:text-red-400",
      warning: "text-amber-600 dark:text-amber-400",
      info: "text-cyan-600 dark:text-cyan-400",
    }[color],
    
    // Underline styles
    {
      none: "no-underline",
      hover: "no-underline hover:underline",
      always: "underline",
      animate: "no-underline relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-current hover:after:w-full after:transition-all",
    }[underline],
    
    // Active state (for navigation links)
    active && variant === "nav" && "border-current font-semibold",
    active && variant !== "nav" && "font-semibold",
    
    // Disabled state
    disabled && "opacity-50 pointer-events-none cursor-default",
    
    // Truncate text
    truncate && "truncate",
    
    // Custom class
    className,
  ].filter(Boolean).join(" ");

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
});
