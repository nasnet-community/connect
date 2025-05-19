import { component$ } from '@builder.io/qwik';
import { Grid } from '~/components/Core/Layout/Grid';

export const GridGap = component$(() => {
  return (
    <div class="space-y-8">
      <>
        <Grid columns="3" gap="xs" class="bg-surface p-4 rounded-md">
          <>
            <div class="bg-primary text-white p-4 rounded-md">XS Gap</div>
            <div class="bg-primary text-white p-4 rounded-md">XS Gap</div>
            <div class="bg-primary text-white p-4 rounded-md">XS Gap</div>
          </>
        </Grid>
        
        <Grid columns="3" gap="md" class="bg-surface p-4 rounded-md">
          <>
            <div class="bg-primary text-white p-4 rounded-md">MD Gap</div>
            <div class="bg-primary text-white p-4 rounded-md">MD Gap</div>
            <div class="bg-primary text-white p-4 rounded-md">MD Gap</div>
          </>
        </Grid>
        
        <Grid columns="3" gap="xl" class="bg-surface p-4 rounded-md">
          <>
            <div class="bg-primary text-white p-4 rounded-md">XL Gap</div>
            <div class="bg-primary text-white p-4 rounded-md">XL Gap</div>
            <div class="bg-primary text-white p-4 rounded-md">XL Gap</div>
          </>
        </Grid>
      </>
    </div>
  );
});

export default GridGap;
