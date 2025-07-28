import { component$ } from "@builder.io/qwik";
import { APIReferenceTemplate } from "~/components/Docs/templates";
import type { PropDetail } from "~/components/Docs/templates";

export default component$(() => {
  const gridProps: PropDetail[] = [
    {
      name: "columns",
      type: "GridTemplateColumns | ResponsiveGridTemplateColumns",
      defaultValue: "'1'",
      description:
        "Number of columns in the grid. Can be a single value or a responsive object.",
    },
    {
      name: "rows",
      type: "GridTemplateRows",
      defaultValue: "'auto'",
      description: "Number of rows in the grid.",
    },
    {
      name: "minColumnWidth",
      type: "string",
      defaultValue: "'250px'",
      description: "Minimum column width when using auto-fill or auto-fit.",
    },
    {
      name: "gap",
      type: "GridGap",
      description: "Unified gap between grid items (both rows and columns).",
    },
    {
      name: "columnGap",
      type: "GridGap",
      defaultValue: "'md'",
      description: "Gap between columns.",
    },
    {
      name: "rowGap",
      type: "GridGap",
      defaultValue: "'md'",
      description: "Gap between rows.",
    },
    {
      name: "autoFlow",
      type: "GridAutoFlow",
      defaultValue: "'row'",
      description: "Controls how the auto-placement algorithm works.",
    },
    {
      name: "justifyItems",
      type: "GridPlacement",
      defaultValue: "'stretch'",
      description: "Aligns grid items along the inline (row) axis.",
    },
    {
      name: "alignItems",
      type: "GridPlacement",
      defaultValue: "'stretch'",
      description: "Aligns grid items along the block (column) axis.",
    },
    {
      name: "columnTemplate",
      type: "string",
      description:
        "Custom grid-template-columns CSS value. Overrides columns prop.",
    },
    {
      name: "rowTemplate",
      type: "string",
      description: "Custom grid-template-rows CSS value. Overrides rows prop.",
    },
    {
      name: "as",
      type: "keyof QwikIntrinsicElements",
      defaultValue: "'div'",
      description: "HTML element to render the grid as.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS class names.",
    },
    {
      name: "role",
      type: "string",
      description: "ARIA role for the grid element.",
    },
    {
      name: "aria-label",
      type: "string",
      description: "Accessible label for the grid.",
    },
    {
      name: "children",
      type: "JSXChildren",
      description: "Child elements to render within the grid.",
    },
  ];

  const gridItemProps: PropDetail[] = [
    {
      name: "colSpan",
      type: "number | 'full'",
      description: "Number of columns the item should span.",
    },
    {
      name: "rowSpan",
      type: "number | 'full'",
      description: "Number of rows the item should span.",
    },
    {
      name: "colStart",
      type: "number | 'auto'",
      description: "Grid column start line.",
    },
    {
      name: "colEnd",
      type: "number | 'auto'",
      description: "Grid column end line.",
    },
    {
      name: "rowStart",
      type: "number | 'auto'",
      description: "Grid row start line.",
    },
    {
      name: "rowEnd",
      type: "number | 'auto'",
      description: "Grid row end line.",
    },
    {
      name: "justifySelf",
      type: "GridPlacement",
      description:
        "Aligns a grid item inside a cell along the inline (row) axis.",
    },
    {
      name: "alignSelf",
      type: "GridPlacement",
      description:
        "Aligns a grid item inside a cell along the block (column) axis.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS class names.",
    },
    {
      name: "role",
      type: "string",
      description: "ARIA role for the grid item.",
    },
    {
      name: "children",
      type: "JSXChildren",
      description: "Child elements to render within the grid item.",
    },
  ];

  // Since APIReferenceTemplate doesn't support multiple components,
  // we'll show both sets of props in sequence
  const allProps = [
    ...gridProps.map((prop) => ({ ...prop, name: `Grid.${prop.name}` })),
    ...gridItemProps.map((prop) => ({
      ...prop,
      name: `GridItem.${prop.name}`,
    })),
  ];

  return <APIReferenceTemplate props={allProps} />;
});
