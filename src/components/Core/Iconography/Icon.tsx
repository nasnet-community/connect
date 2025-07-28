import { component$, useStyles$, type QRL } from "@builder.io/qwik";
import type { IconProps } from "./Icon.types";

/**
 * Icon component for the Connect design system.
 *
 * This component provides a consistent interface for rendering icons from
 * the @qwikest/icons library with support for various sizes, colors, responsive design,
 * and accessibility features. Optimized for mobile, tablet, and desktop experiences
 * with advanced dark mode support.
 */
const Icon = component$<IconProps>((props) => {
  const {
    icon,
    size = "md",
    color = "current",
    fixedWidth = false,
    responsive = false,
    interactive = false,
    class: className = "",
    label,
    ...attrs
  } = props;

  // Enhanced CSS for the icon component with responsive and accessibility improvements
  useStyles$(`
    .icon-fixed-width {
      width: 1em;
      text-align: center;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    
    .icon-interactive {
      cursor: pointer;
      transition: all 0.2s ease-out;
      border-radius: 0.25rem;
      padding: 0.125rem;
    }
    
    .icon-interactive:hover {
      background-color: rgba(0, 0, 0, 0.05);
      transform: scale(1.05);
    }
    
    .dark .icon-interactive:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .icon-interactive:focus-visible {
      outline: 2px solid var(--tw-color-primary-500);
      outline-offset: 2px;
    }
    
    .icon-interactive:active {
      transform: scale(0.95);
    }
    
    @media (hover: none) and (pointer: coarse) {
      .icon-interactive {
        min-height: 44px;
        min-width: 44px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      
      .icon-interactive:hover {
        transform: none;
        background-color: transparent;
      }
    }
    
    @media (prefers-reduced-motion: reduce) {
      .icon-interactive {
        transition: none;
      }
      
      .icon-interactive:hover,
      .icon-interactive:active {
        transform: none;
      }
    }
  `);

  // Enhanced size classes with responsive considerations and using config values
  const sizeClasses = {
    "2xs": "w-2.5 h-2.5", // 10px - micro icons
    xs: "w-3 h-3", // 12px - small UI elements
    sm: "w-4 h-4", // 16px - compact layouts
    md: "w-5 h-5", // 20px - standard size
    lg: "w-6 h-6", // 24px - prominent elements
    xl: "w-8 h-8", // 32px - large features
    "2xl": "w-10 h-10", // 40px - hero elements
    "3xl": "w-12 h-12", // 48px - major visual elements
  }[size];

  // Responsive size classes for mobile-first approach
  const responsiveSizeClasses = responsive ? {
    "2xs": "w-3 h-3 mobile:w-4 mobile:h-4 tablet:w-2.5 tablet:h-2.5",
    xs: "w-4 h-4 mobile:w-5 mobile:h-5 tablet:w-4 tablet:h-4",
    sm: "w-5 h-5 mobile:w-6 mobile:h-6 tablet:w-5 tablet:h-5",
    md: "w-6 h-6 mobile:w-7 mobile:h-7 tablet:w-6 tablet:h-6",
    lg: "w-7 h-7 mobile:w-8 mobile:h-8 tablet:w-7 tablet:h-7",
    xl: "w-8 h-8 mobile:w-10 mobile:h-10 tablet:w-8 tablet:h-8",
    "2xl": "w-10 h-10 mobile:w-12 mobile:h-12 tablet:w-10 tablet:h-10",
    "3xl": "w-12 h-12 mobile:w-14 mobile:h-14 tablet:w-12 tablet:h-12",
  }[size] : sizeClasses;

  // Enhanced color classes using the comprehensive theme system
  const colorClasses = {
    inherit: "",
    current: "text-current",
    primary: "text-primary-600 dark:text-primary-400",
    secondary: "text-secondary-600 dark:text-secondary-400",
    success: "text-success-600 dark:text-success-400",
    warning: "text-warning-600 dark:text-warning-400",
    error: "text-error-600 dark:text-error-400",
    info: "text-info-600 dark:text-info-400",
    muted: "text-gray-500 dark:text-gray-400",
    "on-surface": "text-gray-900 dark:text-gray-100",
    "on-surface-variant": "text-gray-700 dark:text-gray-300",
    inverse: "text-white dark:text-gray-900",
  }[color];

  // Base classes with enhanced accessibility and responsive design
  const baseClasses = [
    "inline-flex",
    "items-center",
    "justify-center",
    "flex-shrink-0",
    "select-none",
    // Responsive considerations
    responsive ? responsiveSizeClasses : sizeClasses,
    colorClasses,
    // Interactive enhancements
    interactive ? "icon-interactive" : "",
    // Fixed width for alignment
    fixedWidth ? "icon-fixed-width" : "",
    // High contrast mode support
    "high-contrast:text-black high-contrast:dark:text-white",
    // Print optimizations
    "print:text-black",
    className,
  ];

  // Combine all classes and filter out empty values
  const combinedClasses = baseClasses
    .filter(Boolean)
    .join(" ");

  // Enhanced accessibility attributes
  const accessibilityProps = label ? {
    "aria-label": label,
    role: "img",
    "aria-hidden": undefined,
  } : {
    "aria-hidden": true,
    role: undefined,
  };

  // Interactive attributes for keyboard navigation
  const interactiveProps = interactive ? {
    tabIndex: 0,
    role: label ? "button" : "img",
  } : {};

  // Helper function to check if icon is a QRL function
  const isQRLFunction = (icon: any): icon is QRL<any> => {
    return icon && typeof icon === "function" && (icon.__brand === "QRL" || icon.__qrl);
  };

  // Render the appropriate icon based on its type
  const renderIcon = () => {
    if (isQRLFunction(icon)) {
      // For QRL icon functions, render as a component with SVG props
      const IconComponent = icon as any;
      return <IconComponent class="w-full h-full" />;
    } else {
      // For JSX elements or JSXOutput, render directly
      return icon;
    }
  };

  return (
    <span
      class={combinedClasses}
      {...accessibilityProps}
      {...interactiveProps}
      {...attrs}
    >
      {renderIcon()}
    </span>
  );
});

export default Icon;
