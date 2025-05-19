import { component$ } from '@builder.io/qwik';
import { Grid } from '~/components/Core/Layout/Grid';

export const GridAutoFlow = component$(() => {
  return (
    <div class="space-y-8">
      <>
        <Grid columns="3" rows="2" autoFlow="row" gap="md" class="bg-surface p-4 rounded-md">
          <>
            <div class="bg-primary text-white p-4 rounded-md">Row Flow 1</div>
            <div class="bg-primary text-white p-4 rounded-md">Row Flow 2</div>
            <div class="bg-primary text-white p-4 rounded-md">Row Flow 3</div>
            <div class="bg-primary text-white p-4 rounded-md">Row Flow 4</div>
            <div class="bg-primary text-white p-4 rounded-md">Row Flow 5</div>
          </>
        </Grid>
        
        <Grid columns="3" rows="2" autoFlow="column" gap="md" class="bg-surface p-4 rounded-md">
          <>
            <div class="bg-secondary text-white p-4 rounded-md">Column Flow 1</div>
            <div class="bg-secondary text-white p-4 rounded-md">Column Flow 2</div>
            <div class="bg-secondary text-white p-4 rounded-md">Column Flow 3</div>
            <div class="bg-secondary text-white p-4 rounded-md">Column Flow 4</div>
            <div class="bg-secondary text-white p-4 rounded-md">Column Flow 5</div>
          </>
        </Grid>
      </>
    </div>
  );
});

export default GridAutoFlow;
