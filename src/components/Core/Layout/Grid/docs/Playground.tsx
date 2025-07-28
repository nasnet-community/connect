import { component$, useSignal, useStore } from "@builder.io/qwik";
import { PlaygroundTemplate } from "~/components/Docs/templates";
import { Grid, GridItem } from "~/components/Core/Layout/Grid";
import type {
  GridTemplateColumns,
  GridGap,
  GridAutoFlow,
  GridPlacement,
} from "~/components/Core/Layout/Grid/Grid.types";

export default component$(() => {
  const gridProps = useStore({
    columns: "3" as GridTemplateColumns,
    rows: "auto" as any,
    gap: "md" as GridGap,
    autoFlow: "row" as GridAutoFlow,
    alignItems: "stretch" as GridPlacement,
    justifyItems: "stretch" as GridPlacement,
    minColumnWidth: "100px",
  });

  const itemCount = useSignal(6);
  const showGridItem = useSignal(false);

  const preview = (
    <Grid
      columns={gridProps.columns}
      rows={gridProps.rows}
      gap={gridProps.gap}
      autoFlow={gridProps.autoFlow}
      alignItems={gridProps.alignItems}
      justifyItems={gridProps.justifyItems}
      minColumnWidth={
        gridProps.columns === "auto-fill" || gridProps.columns === "auto-fit"
          ? gridProps.minColumnWidth
          : undefined
      }
      class="min-h-[300px] rounded-lg border border-gray-200 bg-surface p-6 dark:border-gray-700"
    >
      {Array.from({ length: itemCount.value }).map((_, i) =>
        showGridItem.value ? (
          <GridItem
            key={i}
            class="flex items-center justify-center rounded-md bg-primary-500 p-4 text-white dark:bg-primary-400"
          >
            Item {i + 1}
          </GridItem>
        ) : (
          <div
            key={i}
            class="flex items-center justify-center rounded-md bg-primary-500 p-4 text-white dark:bg-primary-400"
          >
            Item {i + 1}
          </div>
        ),
      )}
    </Grid>
  );

  const code = `<Grid
  columns="${gridProps.columns}"
  rows="${gridProps.rows}"
  gap="${gridProps.gap}"
  autoFlow="${gridProps.autoFlow}"
  alignItems="${gridProps.alignItems}"
  justifyItems="${gridProps.justifyItems}"${
    gridProps.columns === "auto-fill" || gridProps.columns === "auto-fit"
      ? `\n  minColumnWidth="${gridProps.minColumnWidth}"`
      : ""
  }
>
  ${showGridItem.value ? "<GridItem>" : "<div>"}
    Item
  ${showGridItem.value ? "</GridItem>" : "</div>"}
</Grid>`;

  return (
    <PlaygroundTemplate
      controls={[
        {
          type: "select",
          label: "Columns",
          value: gridProps.columns,
          onChange$: (value: any) => (gridProps.columns = value),
          options: [
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "4", value: "4" },
            { label: "6", value: "6" },
            { label: "Auto-fill", value: "auto-fill" },
            { label: "Auto-fit", value: "auto-fit" },
          ],
        },
        {
          type: "select",
          label: "Rows",
          value: gridProps.rows,
          onChange$: (value: any) => (gridProps.rows = value),
          options: [
            { label: "Auto", value: "auto" },
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "4", value: "4" },
          ],
        },
        {
          type: "select",
          label: "Gap",
          value: gridProps.gap,
          onChange$: (value: any) => (gridProps.gap = value),
          options: [
            { label: "None", value: "none" },
            { label: "XS", value: "xs" },
            { label: "SM", value: "sm" },
            { label: "MD", value: "md" },
            { label: "LG", value: "lg" },
            { label: "XL", value: "xl" },
            { label: "2XL", value: "2xl" },
            { label: "3XL", value: "3xl" },
          ],
        },
        {
          type: "select",
          label: "Auto Flow",
          value: gridProps.autoFlow,
          onChange$: (value: any) => (gridProps.autoFlow = value),
          options: [
            { label: "Row", value: "row" },
            { label: "Column", value: "column" },
            { label: "Dense", value: "dense" },
            { label: "Row Dense", value: "row-dense" },
            { label: "Column Dense", value: "column-dense" },
          ],
        },
        {
          type: "select",
          label: "Align Items",
          value: gridProps.alignItems,
          onChange$: (value: any) => (gridProps.alignItems = value),
          options: [
            { label: "Stretch", value: "stretch" },
            { label: "Start", value: "start" },
            { label: "Center", value: "center" },
            { label: "End", value: "end" },
            { label: "Baseline", value: "baseline" },
          ],
        },
        {
          type: "select",
          label: "Justify Items",
          value: gridProps.justifyItems,
          onChange$: (value: any) => (gridProps.justifyItems = value),
          options: [
            { label: "Stretch", value: "stretch" },
            { label: "Start", value: "start" },
            { label: "Center", value: "center" },
            { label: "End", value: "end" },
          ],
        },
        {
          type: "range",
          label: "Number of Items",
          value: itemCount.value.toString(),
          min: "1",
          max: "12",
          step: "1",
          onChange$: (value: string) => (itemCount.value = parseInt(value)),
        },
        {
          type: "toggle",
          label: "Use GridItem Component",
          checked: showGridItem.value,
          onChange$: (value: boolean) => (showGridItem.value = value),
        },
        ...(gridProps.columns === "auto-fill" ||
        gridProps.columns === "auto-fit"
          ? [
              {
                type: "text" as const,
                label: "Min Column Width",
                value: gridProps.minColumnWidth,
                onChange$: (value: string) =>
                  (gridProps.minColumnWidth = value),
              },
            ]
          : []),
      ]}
      preview={preview}
      code={code}
    />
  );
});
