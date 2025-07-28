import { useSignal, useTask$ } from "@builder.io/qwik";
import type { GridItemProps, ResponsiveGridItemValue } from "../Grid.types";

/**
 * Enhanced useGridItem hook with mobile-first responsive support and 
 * touch optimization for individual grid items
 */
export function useGridItem(props: GridItemProps) {
  const {
    colSpan,
    rowSpan,
    colStart,
    colEnd,
    rowStart,
    rowEnd,
    justifySelf,
    alignSelf,
    touchTarget = "none",
    mobilePriority = "normal",
    adaptiveSize = false,
    scrollSnap = "none",
    mobileOrder,
  } = props;

  // Signal for mobile detection
  const isMobile = useSignal(false);

  // Initialize mobile detection
  useTask$(() => {
    if (typeof document !== "undefined") {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['android', 'iphone', 'ipad', 'mobile', 'tablet'];
      isMobile.value = mobileKeywords.some(keyword => userAgent.includes(keyword));
    }
  });

  // Helper function to generate responsive classes for grid items
  const generateResponsiveClasses = <T>(
    value: ResponsiveGridItemValue<T> | undefined,
    classPrefix: string,
    valueTransform?: (val: T) => string | number
  ): Record<string, boolean> => {
    if (value === undefined) return {};

    const transform = valueTransform || ((val: T) => String(val));

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      const responsiveValue = value as any;
      const classes: Record<string, boolean> = {};

      if (responsiveValue.base !== undefined) {
        classes[`${classPrefix}-${transform(responsiveValue.base)}`] = true;
      }
      
      const breakpoints = ['sm', 'md', 'lg', 'xl', '2xl'] as const;
      breakpoints.forEach(bp => {
        if (responsiveValue[bp] !== undefined) {
          classes[`${bp}:${classPrefix}-${transform(responsiveValue[bp])}`] = true;
        }
      });

      return classes;
    }

    return { [`${classPrefix}-${transform(value as T)}`]: true };
  };

  // Generate column span classes
  const colSpanClasses = generateResponsiveClasses(colSpan, "col-span", (val) => 
    val === "full" ? "full" : String(val)
  );

  // Generate row span classes
  const rowSpanClasses = generateResponsiveClasses(rowSpan, "row-span", (val) =>
    val === "full" ? "full" : String(val)
  );

  // Generate column start classes
  const colStartClasses = generateResponsiveClasses(colStart, "col-start", (val) =>
    val === "auto" ? "auto" : String(val)
  );

  // Generate column end classes
  const colEndClasses = generateResponsiveClasses(colEnd, "col-end", (val) =>
    val === "auto" ? "auto" : String(val)
  );

  // Generate row start classes
  const rowStartClasses = generateResponsiveClasses(rowStart, "row-start", (val) =>
    val === "auto" ? "auto" : String(val)
  );

  // Generate row end classes
  const rowEndClasses = generateResponsiveClasses(rowEnd, "row-end", (val) =>
    val === "auto" ? "auto" : String(val)
  );

  // Generate justify self classes
  const justifySelfClasses = generateResponsiveClasses(justifySelf, "justify-self");

  // Generate align self classes
  const alignSelfClasses = generateResponsiveClasses(alignSelf, "self", (val) => {
    // Map align values to CSS class names
    const alignMap: Record<string, string> = {
      "auto": "auto",
      "start": "start",
      "center": "center", 
      "end": "end",
      "stretch": "stretch",
      "baseline": "baseline"
    };
    return alignMap[val] || val;
  });

  // Mobile-specific grid item features
  const touchTargetClasses = {
    "min-h-[32px] min-w-[32px]": touchTarget === "sm",
    "min-h-[44px] min-w-[44px]": touchTarget === "md",
    "min-h-[48px] min-w-[48px]": touchTarget === "lg",
    "min-h-[44px] min-w-[44px] touch:min-h-[48px] touch:min-w-[48px]": touchTarget === "accessible",
  };

  // Mobile priority classes (affects order on mobile)
  const mobilePriorityClasses = (() => {
    if (!isMobile.value) return {};
    
    return {
      "order-last": mobilePriority === "low",
      "order-first": mobilePriority === "high",
      [`order-${mobileOrder}`]: typeof mobileOrder === "number" && mobileOrder >= 0 && mobileOrder <= 12,
    };
  })();

  // Adaptive sizing classes
  const adaptiveSizeClasses = {
    "min-w-0 min-h-0": adaptiveSize, // Allows item to shrink below content size
    "place-self-stretch": adaptiveSize, // Stretch to fill available space
  };

  // Scroll snap classes
  const scrollSnapClasses = {
    "snap-start": scrollSnap === "start",
    "snap-center": scrollSnap === "center", 
    "snap-end": scrollSnap === "end",
  };

  // Mobile behavior overrides
  const mobileOverrideClasses = (() => {
    if (!isMobile.value) return {};
    
    // On mobile, often better to span full width for readability
    if (colSpan && typeof colSpan === "number" && colSpan > 2) {
      return {
        "col-span-full": true,
        "max-sm:col-span-full": true,
      };
    }
    
    return {};
  })();

  // Combine all classes and filter out undefined values
  const baseClasses = {
    // Grid positioning
    ...colSpanClasses,
    ...rowSpanClasses,
    ...colStartClasses,
    ...colEndClasses,
    ...rowStartClasses,
    ...rowEndClasses,
    
    // Alignment
    ...justifySelfClasses,
    ...alignSelfClasses,
    
    // Mobile features
    ...touchTargetClasses,
    ...mobilePriorityClasses,
    ...adaptiveSizeClasses,
    ...scrollSnapClasses,
    ...mobileOverrideClasses,
  };

  // Filter out undefined values and ensure all values are boolean
  const allClasses: Record<string, boolean> = Object.fromEntries(
    Object.entries(baseClasses).filter(([, value]) => value !== undefined)
  ) as Record<string, boolean>;

  // Filter out undefined/null classes
  const classNames = Object.entries(allClasses)
    .filter(([, value]) => value)
    .map(([className]) => className)
    .join(" ");

  // Combine with user-provided classes
  const combinedClassNames = props.class
    ? `${classNames} ${props.class}`
    : classNames;

  return {
    combinedClassNames,
    
    // Additional state
    isMobile: isMobile.value,
    
    // Development debugging
    ...(process.env.NODE_ENV === 'development' && {
      debug: {
        generatedClasses: Object.keys(allClasses).filter(key => allClasses[key]),
        userClasses: props.class,
        touchTarget,
        mobilePriority,
        isMobile: isMobile.value,
      }
    })
  };
}