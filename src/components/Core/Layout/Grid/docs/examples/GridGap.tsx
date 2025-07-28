import { component$ } from "@builder.io/qwik";
import { Grid } from "~/components/Core/Layout/Grid";

export const GridGap = component$(() => {
  return (
    <div class="space-y-8">
      <>
        <Grid columns="3" gap="xs" class="rounded-md bg-surface p-4">
          <>
            <div class="bg-primary rounded-md p-4 text-white">XS Gap</div>
            <div class="bg-primary rounded-md p-4 text-white">XS Gap</div>
            <div class="bg-primary rounded-md p-4 text-white">XS Gap</div>
          </>
        </Grid>

        <Grid columns="3" gap="md" class="rounded-md bg-surface p-4">
          <>
            <div class="bg-primary rounded-md p-4 text-white">MD Gap</div>
            <div class="bg-primary rounded-md p-4 text-white">MD Gap</div>
            <div class="bg-primary rounded-md p-4 text-white">MD Gap</div>
          </>
        </Grid>

        <Grid columns="3" gap="xl" class="rounded-md bg-surface p-4">
          <>
            <div class="bg-primary rounded-md p-4 text-white">XL Gap</div>
            <div class="bg-primary rounded-md p-4 text-white">XL Gap</div>
            <div class="bg-primary rounded-md p-4 text-white">XL Gap</div>
          </>
        </Grid>
      </>
    </div>
  );
});

export default GridGap;
