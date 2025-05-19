import { component$ } from '@builder.io/qwik';
import { Grid, GridItem } from '~/components/Core/Layout/Grid';

export const GridItems = component$(() => {
  return (
    <Grid columns="3" rows="3" gap="md" class="bg-surface p-4 rounded-md">
      <>
        <GridItem colSpan={2} rowSpan={2} class="bg-primary text-white p-4 rounded-md flex items-center justify-center">
          2x2 Cell
        </GridItem>
        
        <GridItem class="bg-secondary text-white p-4 rounded-md flex items-center justify-center">
          1x1 Cell
        </GridItem>
        
        <GridItem colStart={2} colEnd={4} class="bg-success text-white p-4 rounded-md flex items-center justify-center">
          Spans 2 Columns
        </GridItem>
        
        <GridItem colStart={1} colEnd={4} class="bg-info text-white p-4 rounded-md flex items-center justify-center">
          Full Width Cell
        </GridItem>
      </>
    </Grid>
  );
});

export default GridItems;
