import { component$ } from '@builder.io/qwik';
import { DocsHeading, DocsSection, DocsSectionTitle, DocsParagraph, DocsCodeBlock } from '~/components/Docs/DocBlocks';

export const GridOverview = component$(() => {
  return (
    <div class="space-y-8">
      <DocsHeading>Grid Component</DocsHeading>
      
      <DocsParagraph>
        The Grid component is a powerful layout primitive for creating two-dimensional grid layouts based on CSS Grid.
        It provides a simple API for creating complex layouts with consistent spacing, responsive behavior, and alignment control.
      </DocsParagraph>

      <DocsSection>
        <DocsSectionTitle>Key Features</DocsSectionTitle>
        <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Create responsive grid layouts with intuitive props</li>
          <li>Control column and row counts with standard values (1-12)</li>
          <li>Auto-fill and auto-fit modes for dynamic grid layouts</li>
          <li>Customize gap spacing between grid items</li>
          <li>Adjust alignment of items within the grid</li>
          <li>Precise control over grid item placement with the GridItem component</li>
          <li>Support for custom grid templates for advanced layouts</li>
        </ul>
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>When To Use</DocsSectionTitle>
        <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Creating card layouts, image galleries, or dashboards</li>
          <li>Building responsive page layouts with multiple columns</li>
          <li>Arranging form elements in a grid</li>
          <li>Creating complex, area-based layouts with precise control</li>
          <li>Any scenario where you need a two-dimensional layout system</li>
        </ul>
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Basic Example</DocsSectionTitle>
        <DocsParagraph>
          Here's a simple example of the Grid component in action:
        </DocsParagraph>
        <DocsCodeBlock
          code={`<Grid columns="3" gap="md">
  <div class="bg-primary text-white p-4 rounded-md">Item 1</div>
  <div class="bg-primary text-white p-4 rounded-md">Item 2</div>
  <div class="bg-primary text-white p-4 rounded-md">Item 3</div>
  <div class="bg-primary text-white p-4 rounded-md">Item 4</div>
  <div class="bg-primary text-white p-4 rounded-md">Item 5</div>
  <div class="bg-primary text-white p-4 rounded-md">Item 6</div>
</Grid>`}
          language="tsx"
        />
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Responsive Grid Example</DocsSectionTitle>
        <DocsParagraph>
          The Grid component supports responsive layouts using breakpoint-specific props:
        </DocsParagraph>
        <DocsCodeBlock
          code={`<Grid 
  columns={{ base: "1", md: "2", lg: "3" }} 
  gap="md"
>
  <div class="bg-primary text-white p-4 rounded-md">Item 1</div>
  <div class="bg-primary text-white p-4 rounded-md">Item 2</div>
  <div class="bg-primary text-white p-4 rounded-md">Item 3</div>
</Grid>`}
          language="tsx"
        />
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>With GridItem</DocsSectionTitle>
        <DocsParagraph>
          Use the GridItem component for precise control over grid cell placement:
        </DocsParagraph>
        <DocsCodeBlock
          code={`<Grid columns="3" rows="3" gap="md">
  <GridItem colSpan={2} rowSpan={2} class="bg-primary text-white p-4 rounded-md">
    Spans 2x2
  </GridItem>
  <GridItem class="bg-secondary text-white p-4 rounded-md">
    Regular cell
  </GridItem>
  <GridItem colStart={2} colEnd={4} class="bg-success text-white p-4 rounded-md">
    Spans column 2-3
  </GridItem>
</Grid>`}
          language="tsx"
        />
      </DocsSection>
    </div>
  );
});

export default GridOverview;
