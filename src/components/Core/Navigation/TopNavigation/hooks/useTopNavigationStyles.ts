import type { TopNavigationProps } from "../TopNavigation.types";

export interface UseTopNavigationStylesProps {
  size: TopNavigationProps["size"];
  variant: TopNavigationProps["variant"];
  isActive: boolean;
  isDisabled: boolean;
  hasDropdown: boolean;
  customClass?: string;
}

export function useTopNavigationStyles(props: UseTopNavigationStylesProps) {
  const {
    size = "md",
    variant = "default",
    isActive,
    isDisabled,
    hasDropdown,
    customClass,
  } = props;

  // Determine size-based classes
  const linkClass =
    size === "sm"
      ? "px-2 py-1 text-xs"
      : size === "lg"
        ? "px-4 py-2.5 text-base"
        : "px-3 py-2 text-sm"; // md (default)

  // Determine variant-based classes
  let variantClass = "";

  if (variant === "minimal") {
    variantClass = isActive
      ? "text-primary-600 dark:text-primary-400"
      : "text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400";
  } else if (variant === "filled") {
    variantClass = isActive
      ? "bg-primary-500 text-white"
      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800";
  } else {
    // default variant
    variantClass = isActive
      ? "text-gray-900 dark:text-white border-b-2 border-primary-500"
      : "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:border-b-2 hover:border-gray-300 dark:hover:border-gray-600";
  }

  // Disabled state
  const disabledClass = isDisabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  // Combined classes
  const combinedClass = `
    inline-flex items-center
    ${linkClass}
    ${variantClass}
    ${disabledClass}
    ${hasDropdown ? "gap-1" : ""}
    ${customClass || ""}
    transition-colors duration-200
    rounded-md
  `;

  // Menu item styles
  const menuItemClass =
    size === "sm"
      ? "py-2 px-3 text-xs"
      : size === "lg"
        ? "py-3 px-5 text-base"
        : "py-2 px-4 text-sm"; // md (default)

  return { combinedClass, menuItemClass };
}
