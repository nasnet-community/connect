import { component$ } from "@builder.io/qwik";
import { Grid, GridItem } from "~/components/Core/Layout/Grid";

export const GridTemplates = component$(() => {
  return (
    <Grid
      columnTemplate="repeat(4, 1fr)"
      rowTemplate="auto auto auto"
      gap="md"
      class="rounded-md bg-surface p-4"
    >
      <>
        <GridItem
          colStart={1}
          colEnd={5}
          class="bg-primary rounded-md p-4 text-white"
        >
          Header (spans all columns)
        </GridItem>

        <GridItem
          colStart={1}
          colEnd={2}
          rowStart={2}
          rowEnd={3}
          class="bg-secondary rounded-md p-4 text-white"
        >
          Sidebar
        </GridItem>

        <GridItem
          colStart={2}
          colEnd={5}
          rowStart={2}
          rowEnd={3}
          class="rounded-md bg-success p-4 text-white"
        >
          Main Content
        </GridItem>

        <GridItem
          colStart={1}
          colEnd={5}
          class="rounded-md bg-info p-4 text-white"
        >
          Footer (spans all columns)
        </GridItem>
      </>
    </Grid>
  );
});

export default GridTemplates;
