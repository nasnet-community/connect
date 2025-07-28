import { component$ } from "@builder.io/qwik";
import { Grid } from "~/components/Core/Layout/Grid";

export const GridColumns = component$(() => {
  return (
    <div class="space-y-6">
      <>
        <Grid columns="2" gap="md" class="rounded-md bg-surface p-4">
          <>
            <div class="bg-primary rounded-md p-4 text-white">
              2 Columns - Item 1
            </div>
            <div class="bg-primary rounded-md p-4 text-white">
              2 Columns - Item 2
            </div>
          </>
        </Grid>

        <Grid columns="4" gap="md" class="rounded-md bg-surface p-4">
          <>
            <div class="bg-secondary rounded-md p-4 text-white">
              4 Columns - Item 1
            </div>
            <div class="bg-secondary rounded-md p-4 text-white">
              4 Columns - Item 2
            </div>
            <div class="bg-secondary rounded-md p-4 text-white">
              4 Columns - Item 3
            </div>
            <div class="bg-secondary rounded-md p-4 text-white">
              4 Columns - Item 4
            </div>
          </>
        </Grid>

        <Grid
          columns="auto-fill"
          minColumnWidth="150px"
          gap="md"
          class="rounded-md bg-surface p-4"
        >
          <>
            <div class="rounded-md bg-success p-4 text-white">
              Auto-fill Item 1
            </div>
            <div class="rounded-md bg-success p-4 text-white">
              Auto-fill Item 2
            </div>
            <div class="rounded-md bg-success p-4 text-white">
              Auto-fill Item 3
            </div>
            <div class="rounded-md bg-success p-4 text-white">
              Auto-fill Item 4
            </div>
            <div class="rounded-md bg-success p-4 text-white">
              Auto-fill Item 5
            </div>
          </>
        </Grid>
      </>
    </div>
  );
});

export default GridColumns;
