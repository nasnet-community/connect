import { component$ } from "@builder.io/qwik";
import type {
  HeadingProps,
  HeadingLevel,
  HeadingWeight,
  HeadingAlignment,
  HeadingColor
} from "./Heading.types";

/**
 * Heading component for displaying headings with consistent styling.
 * 
 * Supports different heading levels (h1-h6), weights, alignments, and responsive sizing.
 * Also provides semantic flexibility with the 'as' prop.
 */
export const Heading = component$<HeadingProps>(({
  level = 2,
  as,
  weight = "semibold",
  align = "left",
  truncate = false,
  maxLines = 1,
  color = "primary",
  responsiveSize,
  class: className = "",
  id,
  children,
}) => {
  // The HTML element to render (for semantic HTML)
  const Element = as || `h${level}` as const;
  
  // Weight classes - mapping the weight prop to Tailwind classes
  const weightClasses: Record<HeadingWeight, string> = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
  };
  
  // Alignment classes
  const alignClasses: Record<HeadingAlignment, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };
  
  // Static size classes based on heading level (h1-h6)
  const sizeClasses: Record<HeadingLevel, string> = {
    1: "text-4xl",
    2: "text-3xl",
    3: "text-2xl",
    4: "text-xl",
    5: "text-lg",
    6: "text-base",
  };
  
  // Color variant classes
  const colorClasses: Record<HeadingColor, string> = {
    primary: "text-text-primary dark:text-text-dark-primary",
    secondary: "text-text-secondary dark:text-text-dark-secondary",
    tertiary: "text-text-tertiary dark:text-text-dark-tertiary",
    inverse: "text-white dark:text-text-primary",
    accent: "text-primary-600 dark:text-primary-400",
    success: "text-success-600 dark:text-success-400",
    warning: "text-warning-600 dark:text-warning-400",
    error: "text-error-600 dark:text-error-400",
    info: "text-info-600 dark:text-info-400",
  };
  
  // Truncation classes
  const truncateClasses = truncate
    ? maxLines > 1
      ? `overflow-hidden line-clamp-${maxLines}`
      : "truncate"
    : "";
  
  // Generate responsive classes if responsiveSize is provided
  let responsiveClasses = "";
  if (responsiveSize) {
    const { base, sm, md, lg, xl } = responsiveSize;
    
    if (base) responsiveClasses += ` ${sizeClasses[base]}`;
    if (sm) responsiveClasses += ` sm:${sizeClasses[sm]}`;
    if (md) responsiveClasses += ` md:${sizeClasses[md]}`;
    if (lg) responsiveClasses += ` lg:${sizeClasses[lg]}`;
    if (xl) responsiveClasses += ` xl:${sizeClasses[xl]}`;
  }
  
  // Combine all classes
  const classes = [
    // Use responsive size classes if provided, otherwise use the static size class based on level
    responsiveSize ? responsiveClasses : sizeClasses[level],
    weightClasses[weight],
    alignClasses[align],
    colorClasses[color],
    truncateClasses,
    className,
  ].filter(Boolean).join(" ");
  
  return (
    <Element id={id} class={classes}>
      {children}
    </Element>
  );
});

export default Heading;
