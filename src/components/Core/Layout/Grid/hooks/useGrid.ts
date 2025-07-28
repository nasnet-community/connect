import { useSignal, useTask$ } from "@builder.io/qwik";
import type { 
  GridProps, 
  ResponsiveGridTemplateColumns, 
  ResponsiveGridGap,
  ContainerResponsiveValue,
  GridGap,
  GridTemplateColumns
} from "../Grid.types";

/**
 * Enhanced useGrid hook with mobile-first responsive support, container queries,
 * auto-sizing, and performance optimizations for grid layouts
 */
export function useGrid(props: GridProps) {
  const {
    columns = "1",
    rows = "auto",
    minColumnWidth = "250px",
    gap,
    columnGap = "md",
    rowGap = "md",
    autoFlow = "row",
    justifyItems = "stretch",
    alignItems = "stretch",
    columnTemplate,
    rowTemplate,
    containerQuery = false,
    mobileStacking = false,
    mobileBehavior = "adaptive",
    touchMode = "none",
    autoSize = "content",
    adaptiveColumns = true,
    mobileSafe = false,
    safeAreaInsets = false,
    focusManagement = false,
    keyboardNavigation = false,
    optimize = false,
    virtualizeItems = false,
    scrollSnapType = "none",
    overscrollBehavior = "auto",
  } = props;

  // Signals for dynamic state management
  const isMobile = useSignal(false);
  const isContainerQuery = useSignal(false);
  const containerWidth = useSignal(0);
  const gridElement = useSignal<HTMLElement>();

  // Initialize mobile detection and container query support
  useTask$(() => {
    if (typeof document !== "undefined") {
      // Detect mobile device
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['android', 'iphone', 'ipad', 'mobile', 'tablet'];
      isMobile.value = mobileKeywords.some(keyword => userAgent.includes(keyword));
      
      // Check container query support
      isContainerQuery.value = 'container' in document.documentElement.style;
      
      // Set up container width tracking if container queries are enabled
      if (containerQuery && isContainerQuery.value && gridElement.value) {
        const resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            containerWidth.value = entry.contentRect.width;
          }
        });
        resizeObserver.observe(gridElement.value);
        
        return () => resizeObserver.disconnect();
      }
    }
  });

  // Helper function to generate responsive classes
  const generateResponsiveClasses = <T>(
    value: T | ResponsiveGridTemplateColumns | ResponsiveGridGap | ContainerResponsiveValue<T> | undefined,
    classGenerator: (val: T, breakpoint?: string) => Record<string, boolean>
  ): Record<string, boolean> => {
    if (value === undefined) return {};

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      const responsiveValue = value as any;
      let classes: Record<string, boolean> = {};

      // Handle base responsive breakpoints
      if (responsiveValue.base !== undefined) {
        classes = { ...classes, ...classGenerator(responsiveValue.base) };
      }
      
      // Apply standard responsive breakpoints
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

      // Handle container queries (if supported)
      if (isContainerQuery.value) {
        const containerBreakpoints = ['@sm', '@md', '@lg', '@xl'] as const;
        containerBreakpoints.forEach(bp => {
          if (responsiveValue[bp] !== undefined) {
            const bpClasses = classGenerator(responsiveValue[bp]!);
            const containerClasses = Object.fromEntries(
              Object.entries(bpClasses).map(([key, val]) => [`@container ${bp.substring(1)}:${key}`, val])
            );
            classes = { ...classes, ...containerClasses };
          }
        });
      }

      return classes;
    }

    return classGenerator(value as T);
  };

  // Enhanced gap class generator with mobile-specific options
  const generateGapClasses = (gapValue: GridGap | ResponsiveGridGap | undefined, prefix: string = ""): Record<string, boolean> => {
    if (!gapValue) return {};
    
    const prefixStr = prefix ? `${prefix}-` : "";
    
    return generateResponsiveClasses(gapValue, (gap: GridGap) => {
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

  // Generate column classes with mobile-first approach
  const generateColumnClasses = (cols: GridTemplateColumns | ResponsiveGridTemplateColumns): Record<string, boolean> => {
    return generateResponsiveClasses(cols, (column: GridTemplateColumns) => {
      // Handle mobile stacking override
      if (mobileStacking && isMobile.value && mobileBehavior === "stack") {
        return { "grid-cols-1": true };
      }

      // Handle adaptive columns for mobile
      if (adaptiveColumns && isMobile.value) {
        // Auto-adjust based on screen size
        if (column === "auto-fill" || column === "auto-fit") {
          return { 
            [`grid-cols-[repeat(${column},minmax(min(${minColumnWidth},100%),1fr))]`]: true 
          };
        }
        
        // Reduce columns on mobile if too many
        const numColumns = parseInt(column);
        if (!isNaN(numColumns) && numColumns > 2) {
          return { "grid-cols-2": true };
        }
      }

      // Standard column classes - ensure all values are boolean
      const classes = {
        "grid-cols-1": column === "1",
        "grid-cols-2": column === "2",
        "grid-cols-3": column === "3",
        "grid-cols-4": column === "4",
        "grid-cols-5": column === "5",
        "grid-cols-6": column === "6",
        "grid-cols-7": column === "7",
        "grid-cols-8": column === "8",
        "grid-cols-9": column === "9",
        "grid-cols-10": column === "10",
        "grid-cols-11": column === "11",
        "grid-cols-12": column === "12",
        "grid-cols-none": column === "none",
        [`grid-cols-[repeat(auto-fill,minmax(${minColumnWidth},1fr))]`]: column === "auto-fill",
        [`grid-cols-[repeat(auto-fit,minmax(${minColumnWidth},1fr))]`]: column === "auto-fit",
      };
      
      // Return only the classes that are true
      return Object.fromEntries(
        Object.entries(classes).filter(([, value]) => value === true)
      ) as Record<string, boolean>;
    });
  };

  // Generate grid template columns
  const gridTemplateColumnsClass = generateColumnClasses(columns);

  // Generate grid template rows
  const gridTemplateRowsClass = {
    "grid-rows-1": rows === "1",
    "grid-rows-2": rows === "2",
    "grid-rows-3": rows === "3",
    "grid-rows-4": rows === "4",
    "grid-rows-5": rows === "5",
    "grid-rows-6": rows === "6",
    "grid-rows-none": rows === "none",
    "grid-rows-auto": rows === "auto",
  };

  // Generate gap classes
  const gridGapClass = (() => {
    // If unified gap is provided, use that
    if (gap) {
      return generateGapClasses(gap);
    }

    // Otherwise use separate row and column gaps
    return {
      ...generateGapClasses(columnGap, "x"),
      ...generateGapClasses(rowGap, "y"),
    };
  })();

  // Generate auto flow classes
  const gridAutoFlowClass = {
    "grid-flow-row": autoFlow === "row",
    "grid-flow-col": autoFlow === "column",
    "grid-flow-dense": autoFlow === "dense",
    "grid-flow-row-dense": autoFlow === "row-dense",
    "grid-flow-col-dense": autoFlow === "column-dense",
  };

  // Generate justify and align classes
  const justifyItemsClass = {
    "justify-items-start": justifyItems === "start",
    "justify-items-center": justifyItems === "center",
    "justify-items-end": justifyItems === "end",
    "justify-items-stretch": justifyItems === "stretch",
  };

  const alignItemsClass = {
    "items-start": alignItems === "start",
    "items-center": alignItems === "center",
    "items-end": alignItems === "end",
    "items-stretch": alignItems === "stretch",
    "items-baseline": alignItems === "baseline",
  };

  // Mobile behavior classes
  const mobileClasses = (() => {
    if (!isMobile.value) return {};
    
    switch (mobileBehavior) {
      case "scroll":
        return {
          "overflow-x-auto": true,
          "grid-auto-flow": "column",
          "snap-x": scrollSnapType.includes("x"),
        };
      case "stack":
        return {
          "grid-cols-1": true,
          "gap-y-4": true,
        };
      case "masonry":
        return {
          "grid-auto-rows": "masonry", // CSS Grid Level 3 feature
        };
      default:
        return {};
    }
  })();

  // Touch optimization classes
  const touchClasses = {
    "touch-pan-x": touchMode === "pan",
    "touch-manipulation": touchMode === "manipulation",
    "touch-pinch-zoom": touchMode === "pinch-zoom",
    "select-none": touchMode !== "none",
  };

  // Container query classes
  const containerClasses = {
    "@container": containerQuery && isContainerQuery.value,
  };

  // Safe area classes
  const safeAreaClasses = {
    "pb-safe-bottom": mobileSafe || safeAreaInsets,
    "pt-safe-top": safeAreaInsets,
    "pl-safe-left": safeAreaInsets,
    "pr-safe-right": safeAreaInsets,
  };

  // Accessibility classes
  const a11yClasses = {
    "focus-within:ring-2 focus-within:ring-primary-500": focusManagement,
    "focus-visible:outline-2 focus-visible:outline-primary-500": keyboardNavigation,
  };

  // Performance and scrolling classes
  const performanceClasses = {
    "will-change-transform": virtualizeItems,
    "scroll-smooth": scrollSnapType !== "none",
    "snap-x snap-mandatory": scrollSnapType === "x" || scrollSnapType === "both",
    "snap-y snap-mandatory": scrollSnapType === "y" || scrollSnapType === "both",
    "overscroll-contain": overscrollBehavior === "contain",
    "overscroll-none": overscrollBehavior === "none",
  };

  // Auto-sizing classes
  const autoSizeClasses = {
    "grid-auto-columns-min": autoSize === "min-content",
    "grid-auto-columns-max": autoSize === "max-content",
    "grid-auto-columns-auto": autoSize === "content",
    "grid-auto-columns-fr": autoSize === "stretch",
  };

  // Combine all classes and filter out undefined values
  const baseClasses = {
    // Base grid
    grid: true,
    
    // Layout classes
    ...gridTemplateColumnsClass,
    ...gridTemplateRowsClass,
    ...gridGapClass,
    ...gridAutoFlowClass,
    ...justifyItemsClass,
    ...alignItemsClass,
    
    // Mobile & Touch
    ...mobileClasses,
    ...touchClasses,
    ...safeAreaClasses,
    
    // Advanced features
    ...containerClasses,
    ...a11yClasses,
    ...performanceClasses,
    ...autoSizeClasses,
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
  
  // Custom grid templates
  if (columnTemplate) {
    styleProperties.gridTemplateColumns = columnTemplate;
  }
  if (rowTemplate) {
    styleProperties.gridTemplateRows = rowTemplate;
  }
  
  // Container query setup
  if (containerQuery && isContainerQuery.value) {
    styleProperties.containerType = "inline-size";
  }
  
  // Auto-sizing based on content
  if (autoSize !== "content") {
    styleProperties.gridAutoColumns = autoSize;
  }

  // Mobile-specific styles
  if (isMobile.value && mobileBehavior === "scroll") {
    styleProperties.WebkitOverflowScrolling = "touch";
  }

  return {
    combinedClassNames,
    styleProperties,
    gridElement,
    
    // Additional state for component consumers
    isMobile: isMobile.value,
    supportsContainerQueries: isContainerQuery.value,
    containerWidth: containerWidth.value,
    
    // Development debugging
    ...(process.env.NODE_ENV === 'development' && {
      debug: {
        generatedClasses: Object.keys(allClasses).filter(key => allClasses[key]),
        userClasses: props.class,
        mobileBehavior,
        touchMode,
        isMobile: isMobile.value,
        containerQuery,
        adaptiveColumns,
      }
    })
  };
}