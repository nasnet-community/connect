import { useComputed$ } from "@builder.io/qwik";
import type { SideNavigationProps } from "../SideNavigation.types";

export interface UseSideNavigationClassesProps {
  widthClass: string;
  variant: SideNavigationProps["variant"];
  isCollapsed: boolean;
  isMobileModal: boolean;
  isMobileOpen: boolean;
  className?: string;
}

export function useSideNavigationClasses(props: UseSideNavigationClassesProps) {
  const {
    widthClass,
    variant,
    isCollapsed,
    isMobileModal,
    isMobileOpen,
    className = "",
  } = props;

  // Base styles for the navigation container
  const baseNavClass = useComputed$(
    () => `
    flex flex-col
    ${widthClass}
    transition-all duration-300
    overflow-hidden
  `,
  );

  // Additional styles based on variant
  const variantClass = useComputed$(() => {
    switch (variant) {
      case "bordered":
        return "bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800";
      case "minimal":
        return "bg-transparent";
      case "default":
      default:
        return "bg-white dark:bg-gray-900 shadow-sm";
    }
  });

  // Mobile modal styles
  const mobileModalClass = useComputed$(() =>
    isMobileModal
      ? "fixed inset-y-0 left-0 z-40 transform transition-transform ease-in-out duration-300"
      : "",
  );

  const mobileOpenClass = useComputed$(() =>
    isMobileModal && isMobileOpen
      ? "translate-x-0"
      : isMobileModal
        ? "-translate-x-full"
        : "",
  );

  // Mobile backdrop styles
  const backdropClass = useComputed$(() =>
    isMobileModal && isMobileOpen
      ? "fixed inset-0 bg-black bg-opacity-50 z-30"
      : "hidden",
  );

  // Generate final container class
  const containerClass = useComputed$(() =>
    [
      baseNavClass.value,
      variantClass.value,
      mobileModalClass.value,
      mobileOpenClass.value,
      className,
    ].join(" "),
  );

  // Header classes
  const headerClass = useComputed$(
    () => `
    ${isCollapsed ? "justify-center py-4" : "px-4 py-3"}
    border-b border-gray-200 dark:border-gray-800
    flex items-center
  `,
  );

  // Toggle button classes
  const toggleButtonClass = useComputed$(
    () => `
    flex-shrink-0 p-1 rounded-md
    ${isCollapsed ? "mx-auto" : "ml-auto"}
    text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300
    hover:bg-gray-100 dark:hover:bg-gray-800
    focus:outline-none focus:ring-2 focus:ring-primary-500
    transition-colors duration-150
  `,
  );

  return {
    containerClass,
    backdropClass,
    headerClass,
    toggleButtonClass,
  };
}
