import { component$ } from '@builder.io/qwik';
import { DocsHeading, DocsSection, DocsSectionTitle, DocsParagraph } from '~/components/Docs/DocBlocks';
import { PropsTable, PropRow } from '~/components/Docs/PropsTable';

export const GridAPIReference = component$(() => {
  return (
    <div class="space-y-12">
      <DocsHeading>Grid API Reference</DocsHeading>
      
      <DocsSection>
        <DocsSectionTitle>Grid Props</DocsSectionTitle>
        <PropsTable>
          <PropRow
            name="columns"
            type="GridTemplateColumns | ResponsiveGridTemplateColumns"
            defaultValue="'1'"
            description="Number of columns in the grid. Can be a single value or a responsive object."
          />
          <PropRow
            name="rows"
            type="GridTemplateRows"
            defaultValue="'auto'"
            description="Number of rows in the grid."
          />
          <PropRow
            name="minColumnWidth"
            type="string"
            defaultValue="'250px'"
            description="Minimum column width when using auto-fill or auto-fit."
          />
          <PropRow
            name="gap"
            type="GridGap"
            description="Unified gap between grid items (both rows and columns)."
          />
          <PropRow
            name="columnGap"
            type="GridGap"
            defaultValue="'md'"
            description="Gap between columns."
          />
          <PropRow
            name="rowGap"
            type="GridGap"
            defaultValue="'md'"
            description="Gap between rows."
          />
          <PropRow
            name="autoFlow"
            type="GridAutoFlow"
            defaultValue="'row'"
            description="Controls how the auto-placement algorithm works."
          />
          <PropRow
            name="justifyItems"
            type="GridPlacement"
            defaultValue="'stretch'"
            description="Aligns grid items along the inline (row) axis."
          />
          <PropRow
            name="alignItems"
            type="GridPlacement"
            defaultValue="'stretch'"
            description="Aligns grid items along the block (column) axis."
          />
          <PropRow
            name="columnTemplate"
            type="string"
            description="Custom grid-template-columns CSS value. Overrides columns prop."
          />
          <PropRow
            name="rowTemplate"
            type="string"
            description="Custom grid-template-rows CSS value. Overrides rows prop."
          />
          <PropRow
            name="as"
            type="keyof QwikIntrinsicElements"
            defaultValue="'div'"
            description="HTML element to render the grid as."
          />
          <PropRow
            name="class"
            type="string"
            description="Additional CSS class names."
          />
          <PropRow
            name="role"
            type="string"
            description="ARIA role for the grid element."
          />
          <PropRow
            name="aria-label"
            type="string"
            description="Accessible label for the grid."
          />
          <PropRow
            name="children"
            type="JSXChildren"
            description="Child elements to render within the grid."
          />
        </PropsTable>
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>GridItem Props</DocsSectionTitle>
        <PropsTable>
          <PropRow
            name="colSpan"
            type="number | 'full'"
            description="Number of columns the item should span."
          />
          <PropRow
            name="rowSpan"
            type="number | 'full'"
            description="Number of rows the item should span."
          />
          <PropRow
            name="colStart"
            type="number | 'auto'"
            description="Grid column start line."
          />
          <PropRow
            name="colEnd"
            type="number | 'auto'"
            description="Grid column end line."
          />
          <PropRow
            name="rowStart"
            type="number | 'auto'"
            description="Grid row start line."
          />
          <PropRow
            name="rowEnd"
            type="number | 'auto'"
            description="Grid row end line."
          />
          <PropRow
            name="justifySelf"
            type="GridPlacement"
            description="Aligns a grid item inside a cell along the inline (row) axis."
          />
          <PropRow
            name="alignSelf"
            type="GridPlacement"
            description="Aligns a grid item inside a cell along the block (column) axis."
          />
          <PropRow
            name="class"
            type="string"
            description="Additional CSS class names."
          />
          <PropRow
            name="role"
            type="string"
            description="ARIA role for the grid item."
          />
          <PropRow
            name="children"
            type="JSXChildren"
            description="Child elements to render within the grid item."
          />
        </PropsTable>
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Type Definitions</DocsSectionTitle>
        <DocsParagraph>
          The Grid component uses the following type definitions:
        </DocsParagraph>
        
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4 overflow-auto">
          <pre class="text-sm text-gray-800 dark:text-gray-200">
{`// Column templates
type GridTemplateColumns = 
  | 'none'
  | '1' | '2' | '3' | '4' | '5' | '6'
  | '7' | '8' | '9' | '10' | '11' | '12'
  | 'auto-fill' | 'auto-fit';

// Row templates
type GridTemplateRows = 
  | 'none'
  | '1' | '2' | '3' | '4' | '5' | '6'
  | 'auto';

// Gap sizes
type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

// Auto flow options
type GridAutoFlow = 'row' | 'column' | 'dense' | 'row-dense' | 'column-dense';

// Placement options
type GridPlacement = 'auto' | 'start' | 'center' | 'end' | 'stretch' | 'baseline';

// Responsive breakpoints
type GridBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Responsive column templates
type ResponsiveGridTemplateColumns = {
  base?: GridTemplateColumns;
  sm?: GridTemplateColumns;
  md?: GridTemplateColumns;
  lg?: GridTemplateColumns;
  xl?: GridTemplateColumns;
  '2xl'?: GridTemplateColumns;
};`}
          </pre>
        </div>
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Accessibility</DocsSectionTitle>
        <DocsParagraph>
          The Grid component follows these accessibility best practices:
        </DocsParagraph>
        <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
          <li>Renders as a semantic HTML element (div by default, customizable with the "as" prop)</li>
          <li>Supports custom ARIA roles and labels through the role and aria-label props</li>
          <li>Preserves the accessibility properties of child elements</li>
          <li>Maintains proper focus order based on DOM structure</li>
        </ul>
      </DocsSection>
    </div>
  );
});

export default GridAPIReference;
