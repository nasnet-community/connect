import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate } from "~/components/Docs/templates";

// Import examples
import { GridBasic } from "./examples/GridBasic";
import { GridColumns } from "./examples/GridColumns";
import { GridResponsive } from "./examples/GridResponsive";
import { GridGap } from "./examples/GridGap";
import { GridAutoFlow } from "./examples/GridAutoFlow";
import { GridAlignment } from "./examples/GridAlignment";
import { GridItems } from "./examples/GridItems";
import { GridTemplates } from "./examples/GridTemplates";

export default component$(() => {
  const examples = [
    {
      title: "Basic Grid",
      description:
        "The simplest use of the Grid component with default properties.",
      component: GridBasic,
      code: `import { component$ } from '@builder.io/qwik';
import { Grid } from '~/components/Core/Layout/Grid';

export const GridBasic = component$(() => {
  return (
    <Grid columns="3" gap="md" class="bg-surface p-4 rounded-md">
      <div class="bg-primary text-white p-4 rounded-md">Item 1</div>
      <div class="bg-primary text-white p-4 rounded-md">Item 2</div>
      <div class="bg-primary text-white p-4 rounded-md">Item 3</div>
      <div class="bg-primary text-white p-4 rounded-md">Item 4</div>
      <div class="bg-primary text-white p-4 rounded-md">Item 5</div>
      <div class="bg-primary text-white p-4 rounded-md">Item 6</div>
    </Grid>
  );
});`,
    },
    {
      title: "Column Configurations",
      description:
        "You can specify different column counts from 1 to 12, as well as 'auto-fill' and 'auto-fit' options.",
      component: GridColumns,
      code: `import { component$ } from '@builder.io/qwik';
import { Grid } from '~/components/Core/Layout/Grid';

export const GridColumns = component$(() => {
  return (
    <div class="space-y-6">
      <Grid columns="2" gap="md" class="bg-surface p-4 rounded-md">
        <div class="bg-primary text-white p-4 rounded-md">2 Columns - Item 1</div>
        <div class="bg-primary text-white p-4 rounded-md">2 Columns - Item 2</div>
      </Grid>
      
      <Grid columns="4" gap="md" class="bg-surface p-4 rounded-md">
        <div class="bg-secondary text-white p-4 rounded-md">4 Columns - Item 1</div>
        <div class="bg-secondary text-white p-4 rounded-md">4 Columns - Item 2</div>
        <div class="bg-secondary text-white p-4 rounded-md">4 Columns - Item 3</div>
        <div class="bg-secondary text-white p-4 rounded-md">4 Columns - Item 4</div>
      </Grid>
      
      <Grid columns="auto-fill" minColumnWidth="150px" gap="md" class="bg-surface p-4 rounded-md">
        <div class="bg-success text-white p-4 rounded-md">Auto-fill Item 1</div>
        <div class="bg-success text-white p-4 rounded-md">Auto-fill Item 2</div>
        <div class="bg-success text-white p-4 rounded-md">Auto-fill Item 3</div>
        <div class="bg-success text-white p-4 rounded-md">Auto-fill Item 4</div>
        <div class="bg-success text-white p-4 rounded-md">Auto-fill Item 5</div>
      </Grid>
    </div>
  );
});`,
    },
    {
      title: "Responsive Grid",
      description:
        "Create responsive layouts by specifying different column counts for different screen sizes.",
      component: GridResponsive,
      code: `import { component$ } from '@builder.io/qwik';
import { Grid } from '~/components/Core/Layout/Grid';

export const GridResponsive = component$(() => {
  return (
    <Grid 
      columns={{ base: "1", md: "2", lg: "4" }} 
      gap="md"
      class="bg-surface p-4 rounded-md"
    >
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
    </Grid>
  );
});`,
    },
    {
      title: "Grid Gap",
      description: "Control the spacing between grid items with the gap prop.",
      component: GridGap,
      code: `import { component$ } from '@builder.io/qwik';
import { Grid } from '~/components/Core/Layout/Grid';

export const GridGap = component$(() => {
  return (
    <div class="space-y-8">
      <Grid columns="3" gap="xs" class="bg-surface p-4 rounded-md">
        <div class="bg-primary text-white p-4 rounded-md">XS Gap</div>
        <div class="bg-primary text-white p-4 rounded-md">XS Gap</div>
        <div class="bg-primary text-white p-4 rounded-md">XS Gap</div>
      </Grid>
      
      <Grid columns="3" gap="md" class="bg-surface p-4 rounded-md">
        <div class="bg-primary text-white p-4 rounded-md">MD Gap</div>
        <div class="bg-primary text-white p-4 rounded-md">MD Gap</div>
        <div class="bg-primary text-white p-4 rounded-md">MD Gap</div>
      </Grid>
      
      <Grid columns="3" gap="xl" class="bg-surface p-4 rounded-md">
        <div class="bg-primary text-white p-4 rounded-md">XL Gap</div>
        <div class="bg-primary text-white p-4 rounded-md">XL Gap</div>
        <div class="bg-primary text-white p-4 rounded-md">XL Gap</div>
      </Grid>
    </div>
  );
});`,
    },
    {
      title: "Auto Flow",
      description:
        "Control the auto placement algorithm's behavior with the autoFlow prop.",
      component: GridAutoFlow,
      code: `import { component$ } from '@builder.io/qwik';
import { Grid } from '~/components/Core/Layout/Grid';

export const GridAutoFlow = component$(() => {
  return (
    <div class="space-y-8">
      <Grid columns="3" rows="2" autoFlow="row" gap="md" class="bg-surface p-4 rounded-md">
        <div class="bg-primary text-white p-4 rounded-md">Row Flow 1</div>
        <div class="bg-primary text-white p-4 rounded-md">Row Flow 2</div>
        <div class="bg-primary text-white p-4 rounded-md">Row Flow 3</div>
        <div class="bg-primary text-white p-4 rounded-md">Row Flow 4</div>
        <div class="bg-primary text-white p-4 rounded-md">Row Flow 5</div>
      </Grid>
      
      <Grid columns="3" rows="2" autoFlow="column" gap="md" class="bg-surface p-4 rounded-md">
        <div class="bg-secondary text-white p-4 rounded-md">Column Flow 1</div>
        <div class="bg-secondary text-white p-4 rounded-md">Column Flow 2</div>
        <div class="bg-secondary text-white p-4 rounded-md">Column Flow 3</div>
        <div class="bg-secondary text-white p-4 rounded-md">Column Flow 4</div>
        <div class="bg-secondary text-white p-4 rounded-md">Column Flow 5</div>
      </Grid>
    </div>
  );
});`,
    },
    {
      title: "Grid Alignment",
      description:
        "Control the alignment of items within the grid using the alignItems and justifyItems props.",
      component: GridAlignment,
      code: `import { component$ } from '@builder.io/qwik';
import { Grid } from '~/components/Core/Layout/Grid';

export const GridAlignment = component$(() => {
  return (
    <div class="space-y-8">
      <Grid columns="3" alignItems="start" gap="md" class="bg-surface p-4 rounded-md h-32">
        <div class="bg-primary text-white p-2 rounded-md">Top Aligned</div>
        <div class="bg-primary text-white p-2 rounded-md">Top Aligned</div>
        <div class="bg-primary text-white p-2 rounded-md">Top Aligned</div>
      </Grid>
      
      <Grid columns="3" alignItems="center" gap="md" class="bg-surface p-4 rounded-md h-32">
        <div class="bg-secondary text-white p-2 rounded-md">Center Aligned</div>
        <div class="bg-secondary text-white p-2 rounded-md">Center Aligned</div>
        <div class="bg-secondary text-white p-2 rounded-md">Center Aligned</div>
      </Grid>
      
      <Grid columns="3" justifyItems="center" gap="md" class="bg-surface p-4 rounded-md">
        <div class="bg-success text-white p-2 rounded-md">Center Justified</div>
        <div class="bg-success text-white p-2 rounded-md">Center Justified</div>
        <div class="bg-success text-white p-2 rounded-md">Center Justified</div>
      </Grid>
    </div>
  );
});`,
    },
    {
      title: "GridItem Component",
      description:
        "Use GridItem for precise control over placement within the grid.",
      component: GridItems,
      code: `import { component$ } from '@builder.io/qwik';
import { Grid, GridItem } from '~/components/Core/Layout/Grid';

export const GridItems = component$(() => {
  return (
    <Grid columns="3" rows="3" gap="md" class="bg-surface p-4 rounded-md">
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
    </Grid>
  );
});`,
    },
    {
      title: "Custom Templates",
      description: "Use custom grid templates for more advanced layouts.",
      component: GridTemplates,
      code: `import { component$ } from '@builder.io/qwik';
import { Grid, GridItem } from '~/components/Core/Layout/Grid';

export const GridTemplates = component$(() => {
  return (
    <Grid 
      columnTemplate="repeat(4, 1fr)" 
      rowTemplate="auto auto auto" 
      gap="md" 
      class="bg-surface p-4 rounded-md"
    >
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
    </Grid>
  );
});`,
    },
  ];

  return <ExamplesTemplate examples={examples} />;
});
