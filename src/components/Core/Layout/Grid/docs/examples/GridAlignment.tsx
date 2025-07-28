import { component$ } from "@builder.io/qwik";
import { Grid } from "~/components/Core/Layout/Grid";

export const GridAlignment = component$(() => {
  return (
    <div class="space-y-8">
      <>
        <Grid
          columns="3"
          alignItems="start"
          gap="md"
          class="h-32 rounded-md bg-surface p-4"
        >
          <>
            <div class="bg-primary rounded-md p-2 text-white">Top Aligned</div>
            <div class="bg-primary rounded-md p-2 text-white">Top Aligned</div>
            <div class="bg-primary rounded-md p-2 text-white">Top Aligned</div>
          </>
        </Grid>

        <Grid
          columns="3"
          alignItems="center"
          gap="md"
          class="h-32 rounded-md bg-surface p-4"
        >
          <>
            <div class="bg-secondary rounded-md p-2 text-white">
              Center Aligned
            </div>
            <div class="bg-secondary rounded-md p-2 text-white">
              Center Aligned
            </div>
            <div class="bg-secondary rounded-md p-2 text-white">
              Center Aligned
            </div>
          </>
        </Grid>

        <Grid
          columns="3"
          justifyItems="center"
          gap="md"
          class="rounded-md bg-surface p-4"
        >
          <>
            <div class="rounded-md bg-success p-2 text-white">
              Center Justified
            </div>
            <div class="rounded-md bg-success p-2 text-white">
              Center Justified
            </div>
            <div class="rounded-md bg-success p-2 text-white">
              Center Justified
            </div>
          </>
        </Grid>
      </>
    </div>
  );
});

export default GridAlignment;
