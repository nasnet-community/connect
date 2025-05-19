import { component$ } from '@builder.io/qwik';
import { DocsHeading, DocsSection, DocsSectionTitle, DocsParagraph, DocsCodeBlock } from '~/components/Docs/DocBlocks';

export const GridUsage = component$(() => {
  return (
    <div class="space-y-8">
      <DocsHeading>Grid Usage</DocsHeading>
      
      <DocsSection>
        <DocsSectionTitle>Installation</DocsSectionTitle>
        <DocsParagraph>
          The Grid component is part of the Connect design system. No additional installation is required
          if you're already using the Connect package.
        </DocsParagraph>
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Importing</DocsSectionTitle>
        <DocsParagraph>
          Import the Grid component from the Connect layout module:
        </DocsParagraph>
        <DocsCodeBlock
          code={`import { Grid, GridItem } from '~/components/Core/Layout/Grid';`}
          language="tsx"
        />
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Basic Usage</DocsSectionTitle>
        <DocsParagraph>
          Create a simple grid with 3 columns and default gap spacing:
        </DocsParagraph>
        <DocsCodeBlock
          code={`<Grid columns="3" gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>`}
          language="tsx"
        />
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Responsive Grid</DocsSectionTitle>
        <DocsParagraph>
          Create a responsive grid with different column counts at different breakpoints:
        </DocsParagraph>
        <DocsCodeBlock
          code={`<Grid 
  columns={{ 
    base: "1",  // 1 column on mobile
    md: "2",    // 2 columns on medium screens
    lg: "3"     // 3 columns on large screens
  }} 
  gap="md"
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>`}
          language="tsx"
        />
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Auto-Fill and Auto-Fit</DocsSectionTitle>
        <DocsParagraph>
          Use auto-fill or auto-fit for responsive grids with a minimum column width:
        </DocsParagraph>
        <DocsCodeBlock
          code={`// Auto-fill: Creates as many columns as possible, even empty ones
<Grid columns="auto-fill" minColumnWidth="200px" gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>

// Auto-fit: Creates as many columns as needed, expanding them to fill the space
<Grid columns="auto-fit" minColumnWidth="200px" gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>`}
          language="tsx"
        />
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Column and Row Gap</DocsSectionTitle>
        <DocsParagraph>
          Specify different gaps for columns and rows:
        </DocsParagraph>
        <DocsCodeBlock
          code={`<Grid 
  columns="3" 
  columnGap="md" 
  rowGap="lg"
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
  <div>Item 5</div>
  <div>Item 6</div>
</Grid>`}
          language="tsx"
        />
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Using GridItem for Cell Placement</DocsSectionTitle>
        <DocsParagraph>
          Use the GridItem component for precise control over item placement:
        </DocsParagraph>
        <DocsCodeBlock
          code={`<Grid columns="3" rows="3" gap="md">
  {/* Item that spans 2 columns and 2 rows */}
  <GridItem colSpan={2} rowSpan={2}>
    Spans 2x2
  </GridItem>
  
  {/* Regular 1x1 item */}
  <GridItem>
    Regular cell
  </GridItem>
  
  {/* Item that spans from column 2 to 4 */}
  <GridItem colStart={2} colEnd={4}>
    Spans column 2-3
  </GridItem>
  
  {/* Item that spans all columns */}
  <GridItem colSpan="full">
    Full width
  </GridItem>
</Grid>`}
          language="tsx"
        />
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Alignment Options</DocsSectionTitle>
        <DocsParagraph>
          Control the alignment of all grid items or individual items:
        </DocsParagraph>
        <DocsCodeBlock
          code={`// Align all items in the grid
<Grid 
  columns="3" 
  gap="md"
  alignItems="center"    // Vertical alignment
  justifyItems="center"  // Horizontal alignment
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>

// Align individual items
<Grid columns="3" gap="md">
  <GridItem>Default alignment</GridItem>
  <GridItem alignSelf="center" justifySelf="center">
    Center aligned
  </GridItem>
  <GridItem alignSelf="end" justifySelf="end">
    Bottom-right aligned
  </GridItem>
</Grid>`}
          language="tsx"
        />
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Custom Grid Templates</DocsSectionTitle>
        <DocsParagraph>
          For more complex layouts, use custom grid templates:
        </DocsParagraph>
        <DocsCodeBlock
          code={`<Grid 
  columnTemplate="200px 1fr 1fr"
  rowTemplate="auto 1fr auto"
  gap="md"
>
  <GridItem colStart={1} colEnd={4}>Header</GridItem>
  <GridItem>Sidebar</GridItem>
  <GridItem colStart={2} colEnd={4}>Main Content</GridItem>
  <GridItem colStart={1} colEnd={4}>Footer</GridItem>
</Grid>`}
          language="tsx"
        />
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Best Practices</DocsSectionTitle>
        <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
          <li>Use the columns prop for simple grid layouts and columnTemplate for more complex ones</li>
          <li>Prefer responsive column configurations for better mobile experience</li>
          <li>Consider using auto-fit or auto-fill with minColumnWidth for dynamic content</li>
          <li>Use GridItem when you need precise control over item placement</li>
          <li>Use semantic child elements to improve accessibility</li>
          <li>Add appropriate aria-label or role props when grid content is not self-explanatory</li>
        </ul>
      </DocsSection>
    </div>
  );
});

export default GridUsage;
