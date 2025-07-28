import { useSignal, useTask$ } from "@builder.io/qwik";
import type { 
  StackProps, 
  ResponsiveStackValue,
  StackDirection,
  StackSpacing,
  StackJustify,
  StackAlign,
  StackWrap
} from "../Stack.types";

/**
 * Enhanced useStack hook with mobile-first responsive support,
 * RTL improvements, and touch optimization for Stack layouts
 */
export function useStack(props: StackProps) {
  const {
    direction = "column",
    spacing = "md",
    justify = "start",
    align = "start",
    wrap = "nowrap",
    dividers = false,
    dividerColor = "muted",
    dividerThickness = "medium",
    reverse = false,
    supportRtl = true,
    rtlStrategy = "logical",
    mobileBehavior = "adaptive",
    touchMode = "none",
    mobileSpacing,
    safeAreaInsets = false,
    mobileSafe = false,
    touchTargetSpacing = false,
    containerQuery = false,
    optimize = false,
    focusManagement = false,
    scrollSnap = false,
    as = "div",
  } = props;

  // Signals for dynamic state management
  const isMobile = useSignal(false);
  const isRtl = useSignal(false);
  const isContainerQuery = useSignal(false);
  const containerWidth = useSignal(0);

  // Initialize mobile detection, RTL detection, and container query support
  useTask$(() => {
    if (typeof document !== "undefined") {
      // Detect mobile device
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['android', 'iphone', 'ipad', 'mobile', 'tablet'];
      isMobile.value = mobileKeywords.some(keyword => userAgent.includes(keyword));
      
      // Detect RTL mode
      const dir = document.documentElement.dir || document.dir || 
                  getComputedStyle(document.documentElement).direction;
      isRtl.value = dir === "rtl";
      
      // Check container query support
      isContainerQuery.value = 'container' in document.documentElement.style;
    }
  });

  // Type guard to check if a value is a responsive object
  const isResponsiveObject = <T>(value: unknown): value is {
    base?: T;
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
    '2xl'?: T;
  } => {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  };

  // Helper function to generate responsive classes
  const generateResponsiveClasses = <T>(
    value: T | ResponsiveStackValue<T> | undefined,
    classGenerator: (val: T, breakpoint?: string) => Record<string, boolean>
  ): Record<string, boolean> => {
    if (value === undefined) return {};

    if (isResponsiveObject<T>(value)) {
      let classes: Record<string, boolean> = {};

      // Handle base responsive breakpoints
      if (value.base !== undefined) {
        classes = { ...classes, ...classGenerator(value.base) };
      }
      
      // Apply standard responsive breakpoints
      const breakpoints = ['sm', 'md', 'lg', 'xl', '2xl'] as const;
      breakpoints.forEach(bp => {
        if (value[bp] !== undefined) {
          const bpClasses = classGenerator(value[bp]!, bp);
          const prefixedClasses = Object.fromEntries(
            Object.entries(bpClasses).map(([key, val]) => [`${bp}:${key}`, val])
          );
          classes = { ...classes, ...prefixedClasses };
        }
      });

      return classes;
    }

    return classGenerator(value as T);
  };

  // Enhanced spacing class generator with mobile-specific options
  const generateSpacingClasses = (spacingValue: StackSpacing | ResponsiveStackValue<StackSpacing>): Record<string, boolean> => {
    return generateResponsiveClasses(spacingValue, (space: StackSpacing) => {
      // Base spacing classes
      const baseClasses = {
        "gap-0": space === "none",
        "gap-1": space === "xs",
        "gap-2": space === "sm",
        "gap-4": space === "md",
        "gap-6": space === "lg",
        "gap-8": space === "xl",
        "gap-10": space === "2xl",
        "gap-12": space === "3xl",
      };

      // Mobile-specific spacing classes
      const mobileClasses = {
        "gap-safe": space === "safe",
        "gap-3": space === "touch",
        "gap-2": space === "touch-sm",
        "gap-5": space === "touch-lg",
      };

      // Adaptive spacing (adjusts based on device and content)
      const adaptiveClasses = {
        "gap-2 md:gap-4 lg:gap-6": space === "adaptive",
      };

      return { ...baseClasses, ...mobileClasses, ...adaptiveClasses };
    });
  };

  // Generate direction classes with enhanced RTL support
  const generateDirectionClasses = (dir: StackDirection | ResponsiveStackValue<StackDirection>): Record<string, boolean> => {
    return generateResponsiveClasses(dir, (direction: StackDirection) => {
      // Use logical properties when RTL strategy is "logical"
      if (rtlStrategy === "logical" && supportRtl) {
        const logicalClasses = {
          "flex-col": direction === "column" && !reverse,
          "flex-col-reverse": direction === "column" && reverse,
          "flex-row": direction === "row" && !reverse,
          "flex-row-reverse": direction === "row" && reverse,
        };

        // Add RTL-aware classes using logical properties
        if (direction === "row") {
          return {
            ...logicalClasses,
            "[direction:rtl]_&:flex-row-reverse": !reverse && isRtl.value,
            "[direction:rtl]_&:flex-row": reverse && isRtl.value,
          };
        }

        return logicalClasses;
      }

      // Standard flex direction classes
      return {
        "flex-col": direction === "column" && !reverse,
        "flex-col-reverse": direction === "column" && reverse,
        "flex-row": direction === "row" && !reverse,
        "flex-row-reverse": direction === "row" && reverse,
      };
    });
  };

  // Generate justify classes
  const generateJustifyClasses = (justifyValue: StackJustify | ResponsiveStackValue<StackJustify>): Record<string, boolean> => {
    return generateResponsiveClasses(justifyValue, (just: StackJustify) => ({
      "justify-start": just === "start",
      "justify-center": just === "center",
      "justify-end": just === "end",
      "justify-between": just === "between",
      "justify-around": just === "around",
      "justify-evenly": just === "evenly",
    }));
  };

  // Generate align classes
  const generateAlignClasses = (alignValue: StackAlign | ResponsiveStackValue<StackAlign>): Record<string, boolean> => {
    return generateResponsiveClasses(alignValue, (al: StackAlign) => ({
      "items-start": al === "start",
      "items-center": al === "center",
      "items-end": al === "end",
      "items-stretch": al === "stretch",
      "items-baseline": al === "baseline",
    }));
  };

  // Generate wrap classes
  const generateWrapClasses = (wrapValue: StackWrap | ResponsiveStackValue<StackWrap>): Record<string, boolean> => {
    return generateResponsiveClasses(wrapValue, (wr: StackWrap) => ({
      "flex-nowrap": wr === "nowrap",
      "flex-wrap": wr === "wrap",
      "flex-wrap-reverse": wr === "wrap-reverse",
    }));
  };

  // Determine effective spacing (mobile override if specified)
  const effectiveSpacing = isMobile.value && mobileSpacing ? mobileSpacing : spacing;

  // Generate all responsive classes
  const directionClasses = generateDirectionClasses(direction);
  const spacingClasses = generateSpacingClasses(effectiveSpacing);
  const justifyClasses = generateJustifyClasses(justify);
  const alignClasses = generateAlignClasses(align);
  const wrapClasses = generateWrapClasses(wrap);

  // Mobile behavior classes
  const mobileClasses = (() => {
    if (!isMobile.value) return {};
    
    switch (mobileBehavior) {
      case "stack":
        return {
          "flex-col": true,
          "gap-y-3": true,
        };
      case "scroll":
        return {
          "overflow-x-auto": true,
          "flex-row": true,
          "snap-x": scrollSnap,
          "scroll-smooth": scrollSnap,
        };
      case "wrap":
        return {
          "flex-wrap": true,
          "gap-2": true,
        };
      default:
        return {};
    }
  })();

  // Touch optimization classes
  const touchClasses = {
    "touch-pan-x": touchMode === "pan" || touchMode === "scrollable",
    "touch-manipulation": touchMode === "manipulation",
    "select-none": touchMode !== "none",
    "overscroll-contain": touchMode === "scrollable",
  };

  // Safe area classes
  const safeAreaClasses = (() => {
    if (!mobileSafe && !safeAreaInsets) return {};
    
    const areas = Array.isArray(safeAreaInsets) ? safeAreaInsets : 
                  safeAreaInsets === true ? ["all"] : [];
    
    let classes: Record<string, boolean> = {};
    
    if (mobileSafe || areas.includes("all")) {
      classes = {
        "pb-safe-bottom": true,
        "pt-safe-top": true,
        "pl-safe-left": true,
        "pr-safe-right": true,
      };
    } else {
      areas.forEach((area) => {
        switch (area) {
          case "top":
            classes["pt-safe-top"] = true;
            break;
          case "bottom":
            classes["pb-safe-bottom"] = true;
            break;
          case "left":
            classes["pl-safe-left"] = true;
            break;
          case "right":
            classes["pr-safe-right"] = true;
            break;
          case "horizontal":
            classes["pl-safe-left"] = true;
            classes["pr-safe-right"] = true;
            break;
          case "vertical":
            classes["pt-safe-top"] = true;
            classes["pb-safe-bottom"] = true;
            break;
        }
      });
    }
    
    return classes;
  })();

  // Touch target spacing classes
  const touchTargetClasses = {
    "gap-y-3 gap-x-3": touchTargetSpacing && isMobile.value,
  };

  // Enhanced divider classes with mobile support
  const getDividerDirection = () => {
    if (typeof direction === "string") return direction;
    // Use mobile behavior if on mobile, otherwise use base direction
    if (isMobile.value && mobileBehavior === "stack") return "column";
    if (isResponsiveObject<StackDirection>(direction)) {
      return direction.base || "column";
    }
    return "column";
  };

  const dividerClasses = (() => {
    if (!dividers) return {};
    
    const divDirection = getDividerDirection();
    const baseClasses = {
      "divide-y": divDirection === "column",
      "divide-x": divDirection === "row",
    };

    // Enhanced divider styling
    const colorClasses = (() => {
      switch (dividerColor) {
        case "primary":
          return { "divide-primary-200 dark:divide-primary-700": true };
        case "secondary":
          return { "divide-secondary-200 dark:divide-secondary-700": true };
        case "muted":
          return { "divide-gray-200 dark:divide-gray-700": true };
        case "touch":
          return { 
            "divide-gray-300 dark:divide-gray-600": true,
            "divide-y-2": divDirection === "column",
            "divide-x-2": divDirection === "row",
          };
        case "minimal":
          return { "divide-gray-100 dark:divide-gray-800": true };
        default:
          return { "divide-gray-200 dark:divide-gray-700": true };
      }
    })();

    const thicknessClasses = {
      "divide-y-[0.5px]": divDirection === "column" && dividerThickness === "thin",
      "divide-x-[0.5px]": divDirection === "row" && dividerThickness === "thin",
      "divide-y-2": divDirection === "column" && dividerThickness === "thick",
      "divide-x-2": divDirection === "row" && dividerThickness === "thick",
    };

    return { ...baseClasses, ...colorClasses, ...thicknessClasses };
  })();

  // Container query classes
  const containerClasses = {
    "@container": containerQuery && isContainerQuery.value,
  };

  // Accessibility classes
  const a11yClasses = {
    "focus-within:ring-2 focus-within:ring-primary-500": focusManagement,
    "focus-visible:outline-2 focus-visible:outline-primary-500": focusManagement,
  };

  // Combine all classes and filter out undefined values
  const baseClasses = {
    // Base
    flex: true,
    
    // Layout
    ...directionClasses,
    ...spacingClasses,
    ...justifyClasses,
    ...alignClasses,
    ...wrapClasses,
    
    // Mobile & Touch
    ...mobileClasses,
    ...touchClasses,
    ...safeAreaClasses,
    ...touchTargetClasses,
    
    // Visual
    ...dividerClasses,
    
    // Advanced
    ...containerClasses,
    ...a11yClasses,
  };

  // Filter out undefined values and ensure all values are boolean
  const allClasses: Record<string, boolean> = Object.fromEntries(
    Object.entries(baseClasses).filter(([, value]) => value !== undefined)
  ) as Record<string, boolean>;

  // Performance optimization: filter classes efficiently
  const classNames = optimize 
    ? Object.entries(allClasses)
        .filter(([, value]) => value)
        .map(([className]) => className)
        .join(" ")
    : Object.entries(allClasses)
        .filter(([, value]) => value)
        .map(([className]) => className)
        .join(" ");

  // Combine with user-provided classes
  const combinedClassNames = props.class
    ? `${classNames} ${props.class}`
    : classNames;

  // CSS custom properties for advanced features
  const styleProperties: Record<string, string> = {};
  
  // Container query setup
  if (containerQuery && isContainerQuery.value) {
    styleProperties.containerType = "inline-size";
  }

  // RTL-specific styles using CSS logical properties
  if (supportRtl && rtlStrategy === "logical") {
    styleProperties.marginInlineStart = "0";
    styleProperties.marginInlineEnd = "0";
  }

  // Mobile-specific styles
  if (isMobile.value) {
    if (mobileBehavior === "scroll") {
      styleProperties.WebkitOverflowScrolling = "touch";
      styleProperties.scrollBehavior = "smooth";
    }
    
    if (touchMode === "scrollable") {
      styleProperties.touchAction = "pan-x pan-y";
    }
  }

  return {
    combinedClassNames,
    styleProperties,
    elementType: as,
    
    // Additional state for component consumers
    isMobile: isMobile.value,
    isRtl: isRtl.value,
    supportsContainerQueries: isContainerQuery.value,
    containerWidth: containerWidth.value,
    effectiveDirection: getDividerDirection(),
    
    // Development debugging
    ...(process.env.NODE_ENV === 'development' && {
      debug: {
        generatedClasses: Object.keys(allClasses).filter(key => allClasses[key]),
        userClasses: props.class,
        mobileBehavior,
        touchMode,
        isMobile: isMobile.value,
        isRtl: isRtl.value,
        effectiveSpacing,
        rtlStrategy,
      }
    })
  };
}