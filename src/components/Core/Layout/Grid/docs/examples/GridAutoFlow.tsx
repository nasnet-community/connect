import { component$ } from "@builder.io/qwik";
import { Grid } from "~/components/Core/Layout/Grid";

export const GridAutoFlow = component$(() => {
  return (
    <div class="space-y-8">
      <>
        <Grid
          columns="3"
          rows="2"
          autoFlow="row"
          gap="md"
          class="rounded-md bg-surface p-4"
        >
          <>
            <div class="bg-primary rounded-md p-4 text-white">Row Flow 1</div>
            <div class="bg-primary rounded-md p-4 text-white">Row Flow 2</div>
            <div class="bg-primary rounded-md p-4 text-white">Row Flow 3</div>
            <div class="bg-primary rounded-md p-4 text-white">Row Flow 4</div>
            <div class="bg-primary rounded-md p-4 text-white">Row Flow 5</div>
          </>
        </Grid>

        <Grid
          columns="3"
          rows="2"
          autoFlow="column"
          gap="md"
          class="rounded-md bg-surface p-4"
        >
          <>
            <div class="bg-secondary rounded-md p-4 text-white">
              Column Flow 1
            </div>
            <div class="bg-secondary rounded-md p-4 text-white">
              Column Flow 2
            </div>
            <div class="bg-secondary rounded-md p-4 text-white">
              Column Flow 3
            </div>
            <div class="bg-secondary rounded-md p-4 text-white">
              Column Flow 4
            </div>
            <div class="bg-secondary rounded-md p-4 text-white">
              Column Flow 5
            </div>
          </>
        </Grid>
      </>
    </div>
  );
});

export default GridAutoFlow;
