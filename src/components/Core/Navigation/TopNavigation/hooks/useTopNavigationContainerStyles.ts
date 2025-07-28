import { useComputed$ } from "@builder.io/qwik";
import type { TopNavigationProps } from "../TopNavigation.types";

export interface UseTopNavigationContainerStylesProps {
  position: TopNavigationProps["position"];
  variant: TopNavigationProps["variant"];
  size: TopNavigationProps["size"];
  className?: string;
}

export function useTopNavigationContainerStyles(
  props: UseTopNavigationContainerStylesProps,
) {
  const { position, variant, size, className = "" } = props;

  // Determine position-specific classes
  const positionClass = useComputed$(() => {
    return position === "sticky"
      ? "sticky top-0 z-40"
      : position === "fixed"
        ? "fixed top-0 left-0 right-0 z-40"
        : "";
  });

  // Determine background and shadow classes based on variant
  const variantClass = useComputed$(() => {
    if (variant === "transparent") return "bg-transparent";
    if (variant === "minimal")
      return "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800";
    if (variant === "filled") return "bg-primary-600 text-white shadow";
    if (variant === "bordered")
      return "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm";
    return "bg-white dark:bg-gray-900 shadow"; // default
  });

  // Determine padding based on size
  const sizeClass = useComputed$(() => {
    return size === "sm"
      ? "px-2 py-1"
      : size === "lg"
        ? "px-6 py-4"
        : "px-4 py-2"; // md (default)
  });

  // Combine all classes
  const containerClass = useComputed$(() =>
    [positionClass.value, variantClass.value, sizeClass.value, className].join(
      " ",
    ),
  );

  return {
    containerClass,
    positionClass,
    variantClass,
    sizeClass,
  };
}
