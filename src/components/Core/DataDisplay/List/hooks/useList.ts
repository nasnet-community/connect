import type {
  ListVariant,
  ListSize,
  ListSpacing,
  ListMarker,
} from "../List.types";

export interface UseListParams {
  variant?: ListVariant;
  size?: ListSize;
  spacing?: ListSpacing;
  marker?: ListMarker;
  nested?: boolean;
}

export interface UseListReturn {
  baseClasses: string;
}

export function useList(params: UseListParams, className = ""): UseListReturn {
  const {
    variant = "unordered",
    size = "md",
    spacing = "normal",
    marker = variant === "ordered" ? "decimal" : "disc",
    nested = false,
  } = params;

  // Responsive size classes with mobile optimization
  const sizeClasses = {
    sm: [
      "text-sm",
      "mobile:text-xs",
      "tablet:text-sm",
      "desktop:text-sm",
    ].join(" "),
    md: [
      "text-base",
      "mobile:text-sm",
      "tablet:text-base",
      "desktop:text-base",
    ].join(" "),
    lg: [
      "text-lg",
      "mobile:text-base",
      "tablet:text-lg",
      "desktop:text-lg",
    ].join(" "),
  }[size];

  // Responsive spacing classes
  const spacingClasses = {
    compact: [
      "space-y-1",
      "mobile:space-y-0.5",
      "tablet:space-y-1",
    ].join(" "),
    normal: [
      "space-y-2",
      "mobile:space-y-1.5",
      "tablet:space-y-2",
    ].join(" "),
    relaxed: [
      "space-y-3",
      "mobile:space-y-2",
      "tablet:space-y-3",
    ].join(" "),
  }[spacing];

  // Marker classes for unordered lists
  const markerClasses =
    variant === "unordered"
      ? {
          disc: "list-disc",
          circle: "list-circle",
          square: "list-square",
          none: "list-none",
          // These are not valid for unordered lists but included for type safety
          decimal: "list-disc",
          roman: "list-disc",
          alpha: "list-disc",
        }[marker]
      : variant === "ordered"
        ? {
            decimal: "list-decimal",
            roman: "list-roman",
            alpha: "list-alpha",
            disc: "list-decimal",
            circle: "list-decimal",
            square: "list-decimal",
            none: "list-none",
          }[marker]
        : "";

  // Responsive padding with RTL support
  const paddingClasses = variant !== "definition" 
    ? [
        "ps-6",
        "mobile:ps-4",
        "tablet:ps-5",
        "desktop:ps-6",
      ].join(" ")
    : "";

  // Base classes with mobile optimizations
  const baseClasses = [
    // Core classes
    sizeClasses,
    spacingClasses,
    variant !== "definition" ? markerClasses : "",
    nested ? "mt-2 mobile:mt-1.5" : "",
    paddingClasses,
    
    // Mobile optimizations
    "marker:text-current", // Ensure marker color matches text
    "marker:mobile:text-sm", // Smaller markers on mobile
    
    // Dark mode support
    "text-gray-900 dark:text-gray-100",
    "marker:text-gray-600 dark:marker:text-gray-400",
    
    // Print optimizations
    "print:text-black print:marker:text-black",
    
    // Accessibility
    "focus-within:outline-none",
    
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    baseClasses,
  };
}
