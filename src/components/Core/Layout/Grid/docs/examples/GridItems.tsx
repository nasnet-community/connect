import { component$ } from "@builder.io/qwik";
import { Grid, GridItem } from "~/components/Core/Layout/Grid";

export const GridItems = component$(() => {
  return (
    <Grid columns="3" rows="3" gap="md" class="rounded-md bg-surface p-4">
      <>
        <GridItem
          colSpan={2}
          rowSpan={2}
          class="bg-primary flex items-center justify-center rounded-md p-4 text-white"
        >
          2x2 Cell
        </GridItem>

        <GridItem class="bg-secondary flex items-center justify-center rounded-md p-4 text-white">
          1x1 Cell
        </GridItem>

        <GridItem
          colStart={2}
          colEnd={4}
          class="flex items-center justify-center rounded-md bg-success p-4 text-white"
        >
          Spans 2 Columns
        </GridItem>

        <GridItem
          colStart={1}
          colEnd={4}
          class="flex items-center justify-center rounded-md bg-info p-4 text-white"
        >
          Full Width Cell
        </GridItem>
      </>
    </Grid>
  );
});

export default GridItems;
