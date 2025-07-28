import { useSignal, useTask$, $ } from "@builder.io/qwik";
import type { UseStatGroupOptions } from "../Stat.types";

export const useStatGroup = (options: UseStatGroupOptions = {}) => {
  const { columns = 3, gap = "md", responsive = true } = options;

  const containerRef = useSignal<HTMLElement>();
  const currentColumns = useSignal(columns);
  const isMobile = useSignal(false);
  const isTablet = useSignal(false);

  // Responsive breakpoints
  const breakpoints = {
    mobile: 640,
    tablet: 768,
    desktop: 1024,
  };

  const updateLayout = $(() => {
    if (!containerRef.value || !responsive) {
      currentColumns.value = columns;
      return;
    }

    const width = containerRef.value.offsetWidth || window.innerWidth;

    isMobile.value = width < breakpoints.mobile;
    isTablet.value = width >= breakpoints.mobile && width < breakpoints.tablet;

    if (isMobile.value) {
      currentColumns.value = 1;
    } else if (isTablet.value) {
      currentColumns.value = Math.min(2, columns) as 1 | 2 | 3 | 4 | 5 | 6;
    } else if (width < breakpoints.desktop) {
      currentColumns.value = Math.min(3, columns) as 1 | 2 | 3 | 4 | 5 | 6;
    } else {
      currentColumns.value = columns;
    }
  });

  useTask$(({ track, cleanup }) => {
    track(() => responsive);
    track(() => columns);

    if (typeof window === "undefined") return;

    updateLayout();

    const handleResize = () => updateLayout();

    window.addEventListener("resize", handleResize);

    cleanup(() => {
      window.removeEventListener("resize", handleResize);
    });
  });

  const getGridStyles = $(() => {
    const gapValue = {
      sm: "var(--spacing-2)",
      md: "var(--spacing-4)",
      lg: "var(--spacing-6)",
    }[gap];

    return {
      display: "grid",
      gap: gapValue,
      gridTemplateColumns: `repeat(${currentColumns.value}, 1fr)`,
      width: "100%",
    };
  });

  const getItemStyles = $((index: number) => {
    const isLastInRow = (index + 1) % currentColumns.value === 0;
    const isLastItem = index === (containerRef.value?.children.length || 0) - 1;

    return {
      position: "relative" as const,
      // Add divider for bordered stats
      ...(isLastInRow || isLastItem
        ? {}
        : {
            "::after": {
              content: '""',
              position: "absolute" as const,
              top: "50%",
              right: "0",
              transform: "translate(50%, -50%)",
              width: "1px",
              height: "60%",
              background: "var(--border-color)",
              opacity: "0.5",
            },
          }),
    };
  });

  const calculateOptimalColumns = $(
    (itemCount: number, maxColumns: number = columns): number => {
      if (!responsive) return columns;

      if (isMobile.value) return 1;
      if (isTablet.value) return Math.min(2, Math.min(itemCount, maxColumns));

      // For desktop, try to balance the grid
      const optimalColumns = Math.min(itemCount, maxColumns);
      const remainder = itemCount % optimalColumns;

      // If we have a remainder, try to adjust for better balance
      if (remainder !== 0 && optimalColumns > 2) {
        const alternativeColumns = optimalColumns - 1;
        const alternativeRemainder = itemCount % alternativeColumns;

        // Choose the option with better balance
        if (alternativeRemainder === 0 || alternativeRemainder > remainder) {
          return alternativeColumns;
        }
      }

      return optimalColumns;
    },
  );

  const isResponsiveBreakpoint = $(
    (): {
      isMobile: boolean;
      isTablet: boolean;
      isDesktop: boolean;
    } => ({
      isMobile: isMobile.value,
      isTablet: isTablet.value,
      isDesktop: !isMobile.value && !isTablet.value,
    }),
  );

  return {
    containerRef,
    currentColumns,
    isMobile,
    isTablet,
    updateLayout,
    getGridStyles,
    getItemStyles,
    calculateOptimalColumns,
    isResponsiveBreakpoint,
  };
};
