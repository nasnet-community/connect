import { component$ } from '@builder.io/qwik';
import { Grid } from '~/components/Core/Layout/Grid';

export const GridResponsive = component$(() => {
  return (
    <Grid 
      columns={{ base: "1", md: "2", lg: "4" }} 
      gap="md"
      class="bg-surface p-4 rounded-md"
    >
      <>
        <div class="bg-primary text-white p-4 rounded-md">
          1 column on mobile, 2 on tablet, 4 on desktop
        </div>
        <div class="bg-primary text-white p-4 rounded-md">
          1 column on mobile, 2 on tablet, 4 on desktop
        </div>
        <div class="bg-primary text-white p-4 rounded-md">
          1 column on mobile, 2 on tablet, 4 on desktop
        </div>
        <div class="bg-primary text-white p-4 rounded-md">
          1 column on mobile, 2 on tablet, 4 on desktop
        </div>
      </>
    </Grid>
  );
});

export default GridResponsive;
