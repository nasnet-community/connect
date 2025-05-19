import { component$ } from '@builder.io/qwik';
import { Grid } from '~/components/Core/Layout/Grid';

export const GridAlignment = component$(() => {
  return (
    <div class="space-y-8">
      <>
        <Grid columns="3" alignItems="start" gap="md" class="bg-surface p-4 rounded-md h-32">
          <>
            <div class="bg-primary text-white p-2 rounded-md">Top Aligned</div>
            <div class="bg-primary text-white p-2 rounded-md">Top Aligned</div>
            <div class="bg-primary text-white p-2 rounded-md">Top Aligned</div>
          </>
        </Grid>
        
        <Grid columns="3" alignItems="center" gap="md" class="bg-surface p-4 rounded-md h-32">
          <>
            <div class="bg-secondary text-white p-2 rounded-md">Center Aligned</div>
            <div class="bg-secondary text-white p-2 rounded-md">Center Aligned</div>
            <div class="bg-secondary text-white p-2 rounded-md">Center Aligned</div>
          </>
        </Grid>
        
        <Grid columns="3" justifyItems="center" gap="md" class="bg-surface p-4 rounded-md">
          <>
            <div class="bg-success text-white p-2 rounded-md">Center Justified</div>
            <div class="bg-success text-white p-2 rounded-md">Center Justified</div>
            <div class="bg-success text-white p-2 rounded-md">Center Justified</div>
          </>
        </Grid>
      </>
    </div>
  );
});

export default GridAlignment;
