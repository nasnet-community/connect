import { useComputed$ } from "@builder.io/qwik";
import type { SideNavigationProps } from "../SideNavigation.types";

export interface UseSideNavigationItemStylesProps {
  isActive: boolean;
  isDisabled: boolean;
  size: SideNavigationProps["size"];
  variant: SideNavigationProps["variant"];
  customClass?: string;
}

export function useSideNavigationItemStyles(
  props: UseSideNavigationItemStylesProps,
) {
  const {
    isActive,
    isDisabled,
    size = "md",
    variant = "default",
    customClass = "",
  } = props;

  // Compute text size based on component size
  const textSizeClass = useComputed$(() => {
    return {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    }[size];
  });

  // Compute item height based on component size
  const heightClass = useComputed$(() => {
    return {
      sm: "h-8",
      md: "h-10",
      lg: "h-12",
    }[size];
  });

  // Compute icon size based on component size
  const iconSizeClass = useComputed$(() => {
    return {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    }[size];
  });

  // Generate base class for all states
  const baseItemClass = useComputed$(
    () => `
    group flex items-center w-full
    ${heightClass.value} ${textSizeClass.value}
    transition-colors duration-150
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50
  `,
  );

  // Determine the item class based on active state and variant
  const itemStateClass = useComputed$(() => {
    if (isActive) {
      return `
        text-primary-700 dark:text-primary-300 font-medium
        ${variant === "default" ? "bg-primary-50 dark:bg-primary-900/30" : ""}
        ${variant === "bordered" ? "border-l-2 border-primary-500" : ""}
      `;
    } else {
      return `
        text-gray-700 dark:text-gray-300
        hover:text-primary-600 dark:hover:text-primary-400
        ${variant === "default" ? "hover:bg-gray-50 dark:hover:bg-gray-800/50" : ""}
        ${variant === "bordered" ? "border-l-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600" : ""}
      `;
    }
  });

  // Disabled state overrides other states
  const disabledClass = useComputed$(() =>
    isDisabled ? "opacity-50 pointer-events-none" : "",
  );

  // Computed classes for the container
  const containerClass = useComputed$(() => {
    return [
      baseItemClass.value,
      itemStateClass.value,
      disabledClass.value,
      customClass,
    ].join(" ");
  });

  return {
    containerClass,
    textSizeClass,
    heightClass,
    iconSizeClass,
  };
}
