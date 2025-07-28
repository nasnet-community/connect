import { useSignal, useTask$ } from "@builder.io/qwik";
import type { FlexProps, ResponsiveValue } from "../Flex.types";

/**
 * Enhanced useFlex hook with mobile-first responsive support, container queries,
 * touch optimization, and modern CSS features
 */
export function useFlex(props: FlexProps) {
  const {
    direction = "row",
    wrap = "nowrap",
    justify = "start",
    align = "stretch",
    alignContent,
    gap = "none",
    columnGap,
    rowGap,
    supportRtl = true,
    touchMode = "none",
    mobileBehavior = "adaptive",
    touchOptimized = false,
    containerQuery = false,
    containerBreakpoint = "md",
    mobileSafe = false,
    safeAreaInsets = false,
    optimize = false,
    focusManagement = false,
    scrollBehavior = "auto",
    overscrollBehavior = "auto",
    scrollSnapType = "none",
  } = props;

  // Signals for dynamic state
  const isRtl = useSignal(false);
  const isMobile = useSignal(false);
  const isContainerQuery = useSignal(false);

  // Check for RTL mode, mobile device, and container query support
  useTask$(() => {
    if (typeof document !== "undefined") {
      const dir = document.documentElement.dir || document.dir;
      isRtl.value = dir === "rtl";
      
      // Detect mobile device
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['android', 'iphone', 'ipad', 'mobile', 'tablet'];
      isMobile.value = mobileKeywords.some(keyword => userAgent.includes(keyword));
      
      // Check container query support
      isContainerQuery.value = 'container' in document.documentElement.style;
    }
  });

  // Helper function to generate responsive classes with mobile-first approach
  const generateResponsiveClasses = <T>(
    value: T | ResponsiveValue<T> | undefined,
    classGenerator: (val: T, breakpoint?: string) => Record<string, boolean>
  ): Record<string, boolean> => {
    if (value === undefined) return {};

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      const responsiveValue = value as ResponsiveValue<T>;
      let classes: Record<string, boolean> = {};

      // Mobile-first: base is mobile, then enhance for larger screens
      if (responsiveValue.base !== undefined) {
        classes = { ...classes, ...classGenerator(responsiveValue.base) };
      }
      
      // Apply responsive breakpoints
      const breakpoints = ['sm', 'md', 'lg', 'xl', '2xl'] as const;
      breakpoints.forEach(bp => {
        if (responsiveValue[bp] !== undefined) {
          const bpClasses = classGenerator(responsiveValue[bp]!, bp);
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

  // Enhanced gap class generator with mobile-specific options
  const generateGapClasses = (gapValue: FlexProps["gap"], prefix: string = ""): Record<string, boolean> => {
    const prefixStr = prefix ? `${prefix}-` : "";
    
    return generateResponsiveClasses(gapValue, (gap: string) => {
      const baseClasses = {
        [`${prefixStr}gap-0`]: gap === "none",
        [`${prefixStr}gap-1`]: gap === "xs",
        [`${prefixStr}gap-2`]: gap === "sm",
        [`${prefixStr}gap-4`]: gap === "md",
        [`${prefixStr}gap-6`]: gap === "lg",
        [`${prefixStr}gap-8`]: gap === "xl",
        [`${prefixStr}gap-10`]: gap === "2xl",
        [`${prefixStr}gap-12`]: gap === "3xl",
      };

      // Mobile-specific gap sizes
      const mobileClasses = {
        [`${prefixStr}gap-safe`]: gap === "safe",
        [`${prefixStr}gap-3`]: gap === "touch",
        [`${prefixStr}gap-2`]: gap === "touch-sm",
        [`${prefixStr}gap-5`]: gap === "touch-lg",
      };

      return { ...baseClasses, ...mobileClasses };
    });
  };

  // Direction classes with RTL support
  const directionClasses = generateResponsiveClasses(direction, (dir: string) => ({
    "flex-row": dir === "row",
    "flex-col": dir === "column",
    "flex-row-reverse": dir === "row-reverse",
    "flex-col-reverse": dir === "column-reverse",
  }));

  // Wrap classes with mobile behavior
  const wrapClasses = generateResponsiveClasses(wrap, (w: string) => {
    const baseWrap = {
      "flex-nowrap": w === "nowrap",
      "flex-wrap": w === "wrap",
      "flex-wrap-reverse": w === "wrap-reverse",
    };

    // Apply mobile behavior overrides
    if (mobileBehavior === "stack" && isMobile.value) {
      return { 
        "flex-col": true, 
        "flex-wrap": false,
        "flex-nowrap": false,
        "flex-wrap-reverse": false,
        "overflow-x-auto": false
      };
    }
    if (mobileBehavior === "scroll" && isMobile.value) {
      return { 
        "flex-nowrap": true, 
        "overflow-x-auto": true,
        "flex-col": false,
        "flex-wrap": false,
        "flex-wrap-reverse": false
      };
    }
    if (mobileBehavior === "wrap" && isMobile.value) {
      return { 
        "flex-wrap": true,
        "flex-nowrap": false,
        "flex-wrap-reverse": false,
        "flex-col": false,
        "overflow-x-auto": false
      };
    }

    return baseWrap;
  });

  // Justify classes
  const justifyClasses = generateResponsiveClasses(justify, (j: string) => ({
    "justify-start": j === "start",
    "justify-center": j === "center",
    "justify-end": j === "end",
    "justify-between": j === "between",
    "justify-around": j === "around",
    "justify-evenly": j === "evenly",
  }));

  // Align classes
  const alignClasses = generateResponsiveClasses(align, (a: string) => ({
    "items-start": a === "start",
    "items-center": a === "center",
    "items-end": a === "end",
    "items-stretch": a === "stretch",
    "items-baseline": a === "baseline",
  }));

  // Align content classes
  const alignContentClasses = generateResponsiveClasses(alignContent, (ac: string) => ({
    "content-start": ac === "start",
    "content-center": ac === "center",
    "content-end": ac === "end",
    "content-between": ac === "between",
    "content-around": ac === "around",
    "content-stretch": ac === "stretch",
  }));

  // Gap classes
  const gapClasses = {
    ...(columnGap || rowGap ? {} : generateGapClasses(gap)),
    ...(columnGap ? generateGapClasses(columnGap, "x") : {}),
    ...(rowGap ? generateGapClasses(rowGap, "y") : {}),
  };

  // Touch optimization classes
  const touchClasses = {
    "touch-pan-x": touchMode === "pan-x",
    "touch-pan-y": touchMode === "pan-y",
    "touch-manipulation": touchMode === "manipulation" || touchOptimized,
    "touch-auto": touchMode === "auto",
    "select-none": touchOptimized,
    "cursor-pointer touch:cursor-default": touchOptimized,
  };

  // Container query classes
  const containerClasses = {
    "@container": containerQuery && isContainerQuery.value,
    [`@container/${containerBreakpoint}`]: containerQuery && isContainerQuery.value,
  };

  // Mobile safe area classes
  const safeAreaClasses = {
    "pb-safe-bottom": mobileSafe || safeAreaInsets,
    "pt-safe-top": safeAreaInsets,
    "pl-safe-left": safeAreaInsets,
    "pr-safe-right": safeAreaInsets,
  };

  // RTL support classes
  const rtlClasses = (() => {
    if (!supportRtl || !isRtl.value) return {};

    const baseDirection = typeof direction === "object" ? direction.base : direction;
    
    // RTL direction adjustments
    if (baseDirection === "row") {
      return { "rtl:flex-row-reverse": true };
    }
    if (baseDirection === "row-reverse") {
      return { "rtl:flex-row": true };
    }
    
    return {};
  })();

  // Accessibility classes
  const a11yClasses = {
    "focus-within:ring-2 focus-within:ring-primary-500": focusManagement,
    "scroll-smooth": scrollBehavior === "smooth",
    "overscroll-contain": overscrollBehavior === "contain",
    "overscroll-none": overscrollBehavior === "none",
    "overscroll-auto": overscrollBehavior === "auto",
  };

  // Scroll snap classes
  const scrollSnapClasses = {
    "snap-x": scrollSnapType === "x",
    "snap-y": scrollSnapType === "y",
    "snap-both": scrollSnapType === "both",
    "snap-mandatory": scrollSnapType === "mandatory",
    "snap-proximity": scrollSnapType === "proximity",
  };

  // Mobile behavior classes
  const mobileClasses = (() => {
    if (!isMobile.value) return {};
    
    switch (mobileBehavior) {
      case "scroll":
        return {
          "overflow-x-auto": true,
          "scrollbar-hidden": true,
          "-webkit-overflow-scrolling": true,
        };
      case "stack":
        return {
          "flex-col": true,
          "space-y-2": true,
        };
      case "wrap":
        return {
          "flex-wrap": true,
        };
      default:
        return {};
    }
  })();

  // Combine all classes and filter out undefined values
  const baseClasses = {
    // Base flex
    flex: true,
    
    // Layout classes
    ...directionClasses,
    ...wrapClasses,
    ...justifyClasses,
    ...alignClasses,
    ...alignContentClasses,
    ...gapClasses,
    
    // Mobile & Touch
    ...touchClasses,
    ...safeAreaClasses,
    ...mobileClasses,
    
    // Advanced features
    ...containerClasses,
    ...rtlClasses,
    ...a11yClasses,
    ...scrollSnapClasses,
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
  
  if (containerQuery && isContainerQuery.value) {
    styleProperties.containerType = "inline-size";
  }
  
  if (mobileBehavior === "scroll") {
    styleProperties.WebkitOverflowScrolling = "touch";
  }

  return {
    combinedClassNames,
    styleProperties,
    // Additional state for component consumers
    isMobile: isMobile.value,
    isRtl: isRtl.value,
    supportsContainerQueries: isContainerQuery.value,
    
    // Development debugging
    ...(process.env.NODE_ENV === 'development' && {
      debug: {
        generatedClasses: Object.keys(allClasses).filter(key => allClasses[key]),
        userClasses: props.class,
        mobileBehavior,
        touchMode,
        isMobile: isMobile.value,
        isRtl: isRtl.value,
        containerQuery,
      }
    })
  };
}