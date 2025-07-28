import { component$ } from "@builder.io/qwik";
import { Grid } from "~/components/Core/Layout/Grid";

export const GridBasic = component$(() => {
  return (
    <Grid columns="3" gap="md" class="rounded-md bg-surface p-4">
      <>
        <div class="bg-primary rounded-md p-4 text-white">Item 1</div>
        <div class="bg-primary rounded-md p-4 text-white">Item 2</div>
        <div class="bg-primary rounded-md p-4 text-white">Item 3</div>
        <div class="bg-primary rounded-md p-4 text-white">Item 4</div>
        <div class="bg-primary rounded-md p-4 text-white">Item 5</div>
        <div class="bg-primary rounded-md p-4 text-white">Item 6</div>
      </>
    </Grid>
  );
});

export default GridBasic;
