import { component$ } from '@builder.io/qwik';
import { Grid, GridItem } from '~/components/Core/Layout/Grid';

export const GridTemplates = component$(() => {
  return (
    <Grid 
      columnTemplate="repeat(4, 1fr)" 
      rowTemplate="auto auto auto" 
      gap="md" 
      class="bg-surface p-4 rounded-md"
    >
      <>
        <GridItem colStart={1} colEnd={5} class="bg-primary text-white p-4 rounded-md">
          Header (spans all columns)
        </GridItem>
        
        <GridItem colStart={1} colEnd={2} rowStart={2} rowEnd={3} class="bg-secondary text-white p-4 rounded-md">
          Sidebar
        </GridItem>
        
        <GridItem colStart={2} colEnd={5} rowStart={2} rowEnd={3} class="bg-success text-white p-4 rounded-md">
          Main Content
        </GridItem>
        
        <GridItem colStart={1} colEnd={5} class="bg-info text-white p-4 rounded-md">
          Footer (spans all columns)
        </GridItem>
      </>
    </Grid>
  );
});

export default GridTemplates;
