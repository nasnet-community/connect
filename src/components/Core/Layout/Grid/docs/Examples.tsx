import { component$ } from '@builder.io/qwik';
import { DocsHeading, DocsSection, DocsSectionTitle, DocsParagraph } from '~/components/Docs/DocBlocks';
import { ExampleCard } from '~/components/Docs/ExampleCard';

// Import examples
import { GridBasic } from './examples/GridBasic';
import { GridColumns } from './examples/GridColumns';
import { GridResponsive } from './examples/GridResponsive';
import { GridGap } from './examples/GridGap';
import { GridAutoFlow } from './examples/GridAutoFlow';
import { GridAlignment } from './examples/GridAlignment';
import { GridItems } from './examples/GridItems';
import { GridTemplates } from './examples/GridTemplates';

export const GridExamples = component$(() => {
  return (
    <div class="space-y-12">
      <DocsHeading>Grid Examples</DocsHeading>
      
      <DocsSection>
        <DocsSectionTitle>Basic Grid</DocsSectionTitle>
        <DocsParagraph>
          The simplest use of the Grid component with default properties.
        </DocsParagraph>
        <ExampleCard
          example={<GridBasic />}
          code={`import { component$ } from '@builder.io/qwik';
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
});`}
        />
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Column Configurations</DocsSectionTitle>
        <DocsParagraph>
          You can specify different column counts from 1 to 12, as well as "auto-fill" and "auto-fit" options.
        </DocsParagraph>
        <ExampleCard
          example={<GridColumns />}
          code={`import { component$ } from '@builder.io/qwik';
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
});`}
        />
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Responsive Grid</DocsSectionTitle>
        <DocsParagraph>
          Create responsive layouts by specifying different column counts for different screen sizes.
        </DocsParagraph>
        <ExampleCard
          example={<GridResponsive />}
          code={`import { component$ } from '@builder.io/qwik';
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
});`}
        />
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Grid Gap</DocsSectionTitle>
        <DocsParagraph>
          Control the spacing between grid items with the gap prop.
        </DocsParagraph>
        <ExampleCard
          example={<GridGap />}
          code={`import { component$ } from '@builder.io/qwik';
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
});`}
        />
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Auto Flow</DocsSectionTitle>
        <DocsParagraph>
          Control the auto placement algorithm's behavior with the autoFlow prop.
        </DocsParagraph>
        <ExampleCard
          example={<GridAutoFlow />}
          code={`import { component$ } from '@builder.io/qwik';
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
});`}
        />
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Grid Alignment</DocsSectionTitle>
        <DocsParagraph>
          Control the alignment of items within the grid using the alignItems and justifyItems props.
        </DocsParagraph>
        <ExampleCard
          example={<GridAlignment />}
          code={`import { component$ } from '@builder.io/qwik';
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
});`}
        />
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>GridItem Component</DocsSectionTitle>
        <DocsParagraph>
          Use GridItem for precise control over placement within the grid.
        </DocsParagraph>
        <ExampleCard
          example={<GridItems />}
          code={`import { component$ } from '@builder.io/qwik';
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
});`}
        />
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Custom Templates</DocsSectionTitle>
        <DocsParagraph>
          Use custom grid templates for more advanced layouts.
        </DocsParagraph>
        <ExampleCard
          example={<GridTemplates />}
          code={`import { component$ } from '@builder.io/qwik';
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
});`}
        />
      </DocsSection>
    </div>
  );
});

export default GridExamples;
