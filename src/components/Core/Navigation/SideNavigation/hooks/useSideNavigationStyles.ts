import { useComputed$ } from "@builder.io/qwik";
import type { SideNavigationProps } from "../SideNavigation.types";

export interface UseSideNavigationStylesProps {
  isCollapsed: boolean;
  size: SideNavigationProps["size"];
  optimizeTouchTargets?: boolean;
  isMobileModal?: boolean;
}

export function useSideNavigationStyles(props: UseSideNavigationStylesProps) {
  const { isCollapsed, size, optimizeTouchTargets = true, isMobileModal = false } = props;

  // Width class based on collapse state and size
  const widthClass = useComputed$(() => {
    if (isCollapsed) {
      return "w-16";
    }

    // For mobile modal, use full screen width on small screens
    if (isMobileModal) {
      switch (size) {
        case "sm":
          return "w-full max-w-sm max-md:w-[280px]";
        case "lg":
          return "w-full max-w-sm max-md:w-[320px]";
        case "md":
        default:
          return "w-full max-w-sm max-md:w-[300px]";
      }
    }

    // Standard desktop widths
    switch (size) {
      case "sm":
        return "w-48";
      case "lg":
        return "w-64";
      case "md":
      default:
        return "w-56";
    }
  });

  // Touch-optimized spacing classes
  const touchSpacingClass = useComputed$(() => {
    if (!optimizeTouchTargets) return "";
    
    return "touch:py-3 touch:px-4";
  });

  // Mobile-optimized padding for navigation items
  const itemPaddingClass = useComputed$(() => {
    if (isCollapsed) {
      return optimizeTouchTargets ? "p-3" : "p-2";
    }

    switch (size) {
      case "sm":
        return optimizeTouchTargets ? "px-4 py-3" : "px-3 py-2";
      case "lg":
        return optimizeTouchTargets ? "px-6 py-3" : "px-4 py-2";
      case "md":
      default:
        return optimizeTouchTargets ? "px-4 py-3" : "px-4 py-2";
    }
  });

  // Mobile-specific touch target size for icons and buttons
  const touchTargetClass = useComputed$(() => {
    if (!optimizeTouchTargets) return "";
    
    return "min-h-[44px] min-w-[44px]";
  });

  // Font size adjustments for mobile
  const fontSizeClass = useComputed$(() => {
    if (isCollapsed) return "";

    switch (size) {
      case "sm":
        return "text-sm";
      case "lg":
        return "text-base";
      case "md":
      default:
        return "text-sm md:text-base";
    }
  });

  return { 
    widthClass, 
    touchSpacingClass, 
    itemPaddingClass, 
    touchTargetClass, 
    fontSizeClass 
  };
}
