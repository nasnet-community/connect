import { component$ } from '@builder.io/qwik';
import { Grid } from '~/components/Core/Layout/Grid';

export const GridBasic = component$(() => {
  return (
    <Grid columns="3" gap="md" class="bg-surface p-4 rounded-md">
      <>
        <div class="bg-primary text-white p-4 rounded-md">Item 1</div>
        <div class="bg-primary text-white p-4 rounded-md">Item 2</div>
        <div class="bg-primary text-white p-4 rounded-md">Item 3</div>
        <div class="bg-primary text-white p-4 rounded-md">Item 4</div>
        <div class="bg-primary text-white p-4 rounded-md">Item 5</div>
        <div class="bg-primary text-white p-4 rounded-md">Item 6</div>
      </>
    </Grid>
  );
});

export default GridBasic;
