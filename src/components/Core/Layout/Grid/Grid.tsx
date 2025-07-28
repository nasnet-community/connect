import { component$, Slot } from "@builder.io/qwik";
import type { GridProps, GridItemProps, ResponsiveGridTemplateColumns, GridTemplateColumns } from "./Grid.types";

/**
 * Grid component - a layout primitive for creating two-dimensional grid layouts.
 *
 * The Grid component provides a simple API for creating grid layouts with consistent
 * spacing, responsive behavior, and alignment control.
 */
const Grid = component$<GridProps>((props) => {
  const {
    columns = "1",
    rows = "auto",
    columnGap = "md",
    rowGap = "md",
    gap,
    autoFlow = "row",
    justifyItems = "stretch",
    alignItems = "stretch",
    minColumnWidth = "250px",
    columnTemplate,
    rowTemplate,
    role,
    "aria-label": ariaLabel,
    ...rest
  } = props;

  // Type guard to check if columns is a regular responsive object
  const isRegularResponsive = (cols: ResponsiveGridTemplateColumns): cols is {
    base?: GridTemplateColumns;
    sm?: GridTemplateColumns;
    md?: GridTemplateColumns;
    lg?: GridTemplateColumns;
    xl?: GridTemplateColumns;
    "2xl"?: GridTemplateColumns;
  } => {
    return typeof cols === "object" && ('sm' in cols || 'md' in cols || 'lg' in cols || 'xl' in cols || '2xl' in cols || 'base' in cols);
  };

  // Generate grid template columns classes
  const gridTemplateColumnsClass = (() => {
    // If a custom template is provided, use that directly
    if (columnTemplate) {
      return { "grid-cols-[var(--grid-cols)]": true };
    }

    // Handle responsive columns
    if (typeof columns === "object" && isRegularResponsive(columns)) {
      return {
        "grid-cols-1": !columns.base || columns.base === "1",
        "grid-cols-2": columns.base === "2",
        "grid-cols-3": columns.base === "3",
        "grid-cols-4": columns.base === "4",
        "grid-cols-5": columns.base === "5",
        "grid-cols-6": columns.base === "6",
        "grid-cols-7": columns.base === "7",
        "grid-cols-8": columns.base === "8",
        "grid-cols-9": columns.base === "9",
        "grid-cols-10": columns.base === "10",
        "grid-cols-11": columns.base === "11",
        "grid-cols-12": columns.base === "12",
        "grid-cols-none": columns.base === "none",
        "grid-cols-auto-fill": columns.base === "auto-fill",
        "grid-cols-auto-fit": columns.base === "auto-fit",

        "sm:grid-cols-1": columns.sm === "1",
        "sm:grid-cols-2": columns.sm === "2",
        "sm:grid-cols-3": columns.sm === "3",
        "sm:grid-cols-4": columns.sm === "4",
        "sm:grid-cols-5": columns.sm === "5",
        "sm:grid-cols-6": columns.sm === "6",
        "sm:grid-cols-7": columns.sm === "7",
        "sm:grid-cols-8": columns.sm === "8",
        "sm:grid-cols-9": columns.sm === "9",
        "sm:grid-cols-10": columns.sm === "10",
        "sm:grid-cols-11": columns.sm === "11",
        "sm:grid-cols-12": columns.sm === "12",
        "sm:grid-cols-none": columns.sm === "none",
        "sm:grid-cols-auto-fill": columns.sm === "auto-fill",
        "sm:grid-cols-auto-fit": columns.sm === "auto-fit",

        "md:grid-cols-1": columns.md === "1",
        "md:grid-cols-2": columns.md === "2",
        "md:grid-cols-3": columns.md === "3",
        "md:grid-cols-4": columns.md === "4",
        "md:grid-cols-5": columns.md === "5",
        "md:grid-cols-6": columns.md === "6",
        "md:grid-cols-7": columns.md === "7",
        "md:grid-cols-8": columns.md === "8",
        "md:grid-cols-9": columns.md === "9",
        "md:grid-cols-10": columns.md === "10",
        "md:grid-cols-11": columns.md === "11",
        "md:grid-cols-12": columns.md === "12",
        "md:grid-cols-none": columns.md === "none",
        "md:grid-cols-auto-fill": columns.md === "auto-fill",
        "md:grid-cols-auto-fit": columns.md === "auto-fit",

        "lg:grid-cols-1": columns.lg === "1",
        "lg:grid-cols-2": columns.lg === "2",
        "lg:grid-cols-3": columns.lg === "3",
        "lg:grid-cols-4": columns.lg === "4",
        "lg:grid-cols-5": columns.lg === "5",
        "lg:grid-cols-6": columns.lg === "6",
        "lg:grid-cols-7": columns.lg === "7",
        "lg:grid-cols-8": columns.lg === "8",
        "lg:grid-cols-9": columns.lg === "9",
        "lg:grid-cols-10": columns.lg === "10",
        "lg:grid-cols-11": columns.lg === "11",
        "lg:grid-cols-12": columns.lg === "12",
        "lg:grid-cols-none": columns.lg === "none",
        "lg:grid-cols-auto-fill": columns.lg === "auto-fill",
        "lg:grid-cols-auto-fit": columns.lg === "auto-fit",

        "xl:grid-cols-1": columns.xl === "1",
        "xl:grid-cols-2": columns.xl === "2",
        "xl:grid-cols-3": columns.xl === "3",
        "xl:grid-cols-4": columns.xl === "4",
        "xl:grid-cols-5": columns.xl === "5",
        "xl:grid-cols-6": columns.xl === "6",
        "xl:grid-cols-7": columns.xl === "7",
        "xl:grid-cols-8": columns.xl === "8",
        "xl:grid-cols-9": columns.xl === "9",
        "xl:grid-cols-10": columns.xl === "10",
        "xl:grid-cols-11": columns.xl === "11",
        "xl:grid-cols-12": columns.xl === "12",
        "xl:grid-cols-none": columns.xl === "none",
        "xl:grid-cols-auto-fill": columns.xl === "auto-fill",
        "xl:grid-cols-auto-fit": columns.xl === "auto-fit",

        "2xl:grid-cols-1": columns["2xl"] === "1",
        "2xl:grid-cols-2": columns["2xl"] === "2",
        "2xl:grid-cols-3": columns["2xl"] === "3",
        "2xl:grid-cols-4": columns["2xl"] === "4",
        "2xl:grid-cols-5": columns["2xl"] === "5",
        "2xl:grid-cols-6": columns["2xl"] === "6",
        "2xl:grid-cols-7": columns["2xl"] === "7",
        "2xl:grid-cols-8": columns["2xl"] === "8",
        "2xl:grid-cols-9": columns["2xl"] === "9",
        "2xl:grid-cols-10": columns["2xl"] === "10",
        "2xl:grid-cols-11": columns["2xl"] === "11",
        "2xl:grid-cols-12": columns["2xl"] === "12",
        "2xl:grid-cols-none": columns["2xl"] === "none",
        "2xl:grid-cols-auto-fill": columns["2xl"] === "auto-fill",
        "2xl:grid-cols-auto-fit": columns["2xl"] === "auto-fit",
      };
    }

    // Handle single value columns
    return {
      "grid-cols-1": columns === "1",
      "grid-cols-2": columns === "2",
      "grid-cols-3": columns === "3",
      "grid-cols-4": columns === "4",
      "grid-cols-5": columns === "5",
      "grid-cols-6": columns === "6",
      "grid-cols-7": columns === "7",
      "grid-cols-8": columns === "8",
      "grid-cols-9": columns === "9",
      "grid-cols-10": columns === "10",
      "grid-cols-11": columns === "11",
      "grid-cols-12": columns === "12",
      "grid-cols-none": columns === "none",
      "grid-cols-auto-fill": columns === "auto-fill",
      "grid-cols-auto-fit": columns === "auto-fit",
    };
  })();

  // Generate grid template rows classes
  const gridTemplateRowsClass = (() => {
    // If a custom template is provided, use that directly
    if (rowTemplate) {
      return { "grid-rows-[var(--grid-rows)]": true };
    }

    return {
      "grid-rows-1": rows === "1",
      "grid-rows-2": rows === "2",
      "grid-rows-3": rows === "3",
      "grid-rows-4": rows === "4",
      "grid-rows-5": rows === "5",
      "grid-rows-6": rows === "6",
      "grid-rows-none": rows === "none",
      "grid-rows-auto": rows === "auto",
    };
  })();

  // Generate grid gap classes
  const gridGapClass = (() => {
    // If a unified gap is provided, use that
    if (gap) {
      return {
        "gap-0": gap === "none",
        "gap-1": gap === "xs",
        "gap-2": gap === "sm",
        "gap-4": gap === "md",
        "gap-6": gap === "lg",
        "gap-8": gap === "xl",
        "gap-10": gap === "2xl",
        "gap-12": gap === "3xl",
      };
    }

    // Otherwise use separate row and column gaps
    return {
      "gap-x-0": columnGap === "none",
      "gap-x-1": columnGap === "xs",
      "gap-x-2": columnGap === "sm",
      "gap-x-4": columnGap === "md",
      "gap-x-6": columnGap === "lg",
      "gap-x-8": columnGap === "xl",
      "gap-x-10": columnGap === "2xl",
      "gap-x-12": columnGap === "3xl",

      "gap-y-0": rowGap === "none",
      "gap-y-1": rowGap === "xs",
      "gap-y-2": rowGap === "sm",
      "gap-y-4": rowGap === "md",
      "gap-y-6": rowGap === "lg",
      "gap-y-8": rowGap === "xl",
      "gap-y-10": rowGap === "2xl",
      "gap-y-12": rowGap === "3xl",
    };
  })();

  // Generate grid auto flow classes
  const gridAutoFlowClass = {
    "grid-flow-row": autoFlow === "row",
    "grid-flow-col": autoFlow === "column",
    "grid-flow-dense": autoFlow === "dense",
    "grid-flow-row-dense": autoFlow === "row-dense",
    "grid-flow-col-dense": autoFlow === "column-dense",
  };

  // Generate justify items classes
  const justifyItemsClass = {
    "justify-items-start": justifyItems === "start",
    "justify-items-center": justifyItems === "center",
    "justify-items-end": justifyItems === "end",
    "justify-items-stretch": justifyItems === "stretch",
  };

  // Generate align items classes
  const alignItemsClass = {
    "items-start": alignItems === "start",
    "items-center": alignItems === "center",
    "items-end": alignItems === "end",
    "items-stretch": alignItems === "stretch",
    "items-baseline": alignItems === "baseline",
  };

  // Define CSS variables for custom templates if needed
  const style: Record<string, string> = {};
  if (columnTemplate) {
    style["--grid-cols"] = columnTemplate;
  }

  if (rowTemplate) {
    style["--grid-rows"] = rowTemplate;
  }

  // Handle auto-fill and auto-fit columns
  if (
    typeof columns === "string" &&
    (columns === "auto-fill" || columns === "auto-fit")
  ) {
    style["--min-col-width"] = minColumnWidth;
    style.gridTemplateColumns = `repeat(${columns}, minmax(var(--min-col-width), 1fr))`;
  } else if (typeof columns === "object") {
    // Check if any breakpoint has auto-fill or auto-fit
    const hasAutoFill = Object.values(columns).includes("auto-fill");
    const hasAutoFit = Object.values(columns).includes("auto-fit");

    if (hasAutoFill || hasAutoFit) {
      style["--min-col-width"] = minColumnWidth;
      // For responsive auto-fill/auto-fit, we'll use CSS custom properties
      // and let the Tailwind classes handle the responsive behavior
    }
  }

  // Combine all classes
  const allClasses = {
    grid: true,
    ...gridTemplateColumnsClass,
    ...gridTemplateRowsClass,
    ...gridGapClass,
    ...gridAutoFlowClass,
    ...justifyItemsClass,
    ...alignItemsClass,
  };

  // Filter out undefined/null classes
  const classNames = Object.entries(allClasses)
    .filter(([, value]) => value)
    .map(([className]) => className)
    .join(" ");

  // Combine with user-provided classes
  const combinedClassNames = props.class
    ? `${classNames} ${props.class}`
    : classNames;

  return (
    <div
      {...rest}
      class={combinedClassNames}
      style={style}
      role={role}
      aria-label={ariaLabel}
    >
      <Slot />
    </div>
  );
});

/**
 * GridItem component - An individual cell within a Grid layout.
 *
 * The GridItem component allows for precise control over an item's position and span
 * within a parent Grid component.
 */
export const GridItem = component$<GridItemProps>((props) => {
  const {
    colStart,
    colEnd,
    rowStart,
    rowEnd,
    colSpan,
    rowSpan,
    justifySelf,
    alignSelf,
    ...rest
  } = props;

  // Generate column start classes
  const colStartClass = {
    "col-start-auto": colStart === "auto",
    "col-start-1": colStart === 1,
    "col-start-2": colStart === 2,
    "col-start-3": colStart === 3,
    "col-start-4": colStart === 4,
    "col-start-5": colStart === 5,
    "col-start-6": colStart === 6,
    "col-start-7": colStart === 7,
    "col-start-8": colStart === 8,
    "col-start-9": colStart === 9,
    "col-start-10": colStart === 10,
    "col-start-11": colStart === 11,
    "col-start-12": colStart === 12,
    "col-start-13": colStart === 13,
  };

  // Generate column end classes
  const colEndClass = {
    "col-end-auto": colEnd === "auto",
    "col-end-1": colEnd === 1,
    "col-end-2": colEnd === 2,
    "col-end-3": colEnd === 3,
    "col-end-4": colEnd === 4,
    "col-end-5": colEnd === 5,
    "col-end-6": colEnd === 6,
    "col-end-7": colEnd === 7,
    "col-end-8": colEnd === 8,
    "col-end-9": colEnd === 9,
    "col-end-10": colEnd === 10,
    "col-end-11": colEnd === 11,
    "col-end-12": colEnd === 12,
    "col-end-13": colEnd === 13,
  };

  // Generate row start classes
  const rowStartClass = {
    "row-start-auto": rowStart === "auto",
    "row-start-1": rowStart === 1,
    "row-start-2": rowStart === 2,
    "row-start-3": rowStart === 3,
    "row-start-4": rowStart === 4,
    "row-start-5": rowStart === 5,
    "row-start-6": rowStart === 6,
    "row-start-7": rowStart === 7,
  };

  // Generate row end classes
  const rowEndClass = {
    "row-end-auto": rowEnd === "auto",
    "row-end-1": rowEnd === 1,
    "row-end-2": rowEnd === 2,
    "row-end-3": rowEnd === 3,
    "row-end-4": rowEnd === 4,
    "row-end-5": rowEnd === 5,
    "row-end-6": rowEnd === 6,
    "row-end-7": rowEnd === 7,
  };

  // Generate column span classes
  const colSpanClass = {
    "col-span-1": colSpan === 1,
    "col-span-2": colSpan === 2,
    "col-span-3": colSpan === 3,
    "col-span-4": colSpan === 4,
    "col-span-5": colSpan === 5,
    "col-span-6": colSpan === 6,
    "col-span-7": colSpan === 7,
    "col-span-8": colSpan === 8,
    "col-span-9": colSpan === 9,
    "col-span-10": colSpan === 10,
    "col-span-11": colSpan === 11,
    "col-span-12": colSpan === 12,
    "col-span-full": colSpan === "full",
  };

  // Generate row span classes
  const rowSpanClass = {
    "row-span-1": rowSpan === 1,
    "row-span-2": rowSpan === 2,
    "row-span-3": rowSpan === 3,
    "row-span-4": rowSpan === 4,
    "row-span-5": rowSpan === 5,
    "row-span-6": rowSpan === 6,
    "row-span-full": rowSpan === "full",
  };

  // Generate justify self classes
  const justifySelfClass = {
    "justify-self-auto": justifySelf === "auto",
    "justify-self-start": justifySelf === "start",
    "justify-self-center": justifySelf === "center",
    "justify-self-end": justifySelf === "end",
    "justify-self-stretch": justifySelf === "stretch",
  };

  // Generate align self classes
  const alignSelfClass = {
    "self-auto": alignSelf === "auto",
    "self-start": alignSelf === "start",
    "self-center": alignSelf === "center",
    "self-end": alignSelf === "end",
    "self-stretch": alignSelf === "stretch",
    "self-baseline": alignSelf === "baseline",
  };

  // Combine all classes
  const allClasses = {
    ...colStartClass,
    ...colEndClass,
    ...rowStartClass,
    ...rowEndClass,
    ...colSpanClass,
    ...rowSpanClass,
    ...justifySelfClass,
    ...alignSelfClass,
  };

  // Filter out undefined/null classes
  const classNames = Object.entries(allClasses)
    .filter(([, value]) => value)
    .map(([className]) => className)
    .join(" ");

  // Combine with user-provided classes
  const combinedClassNames = props.class
    ? `${classNames} ${props.class}`
    : classNames;

  return (
    <div class={combinedClassNames} {...rest}>
      <Slot />
    </div>
  );
});

export default Grid;
