import { component$ } from '@builder.io/qwik';
import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { Grid, GridItem } from './index';
import { Box } from '../Box';

const meta: Meta<typeof Grid> = {
  title: 'Core/Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'select', options: ['1', '2', '3', '4', '5', '6', '12', 'auto-fill', 'auto-fit'] },
    rows: { control: 'select', options: ['auto', '1', '2', '3', '4', '5', '6'] },
    gap: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] },
    columnGap: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] },
    rowGap: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] },
    autoFlow: { control: 'select', options: ['row', 'column', 'dense', 'row-dense', 'column-dense'] },
    justifyItems: { control: 'select', options: ['start', 'center', 'end', 'stretch'] },
    alignItems: { control: 'select', options: ['start', 'center', 'end', 'stretch', 'baseline'] },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

// Create a sample cell for grid examples
const GridCell = component$<{ color?: string; label: string }>(({ color = "primary", label }) => (
  <Box
    padding="md"
    backgroundColor={color as any}
    borderRadius="md"
    class="text-white text-center font-medium h-full w-full flex items-center justify-center"
  >
    {label}
  </Box>
));

// Basic Grid
export const Basic: Story = {
  args: {
    columns: '3',
    gap: 'md',
    children: [
      <GridCell color="primary" label="Cell 1" key={1} />,
      <GridCell color="secondary" label="Cell 2" key={2} />,
      <GridCell color="success" label="Cell 3" key={3} />,
      <GridCell color="info" label="Cell 4" key={4} />,
      <GridCell color="warning" label="Cell 5" key={5} />,
      <GridCell color="error" label="Cell 6" key={6} />,
      <GridCell color="primary" label="Cell 7" key={7} />,
      <GridCell color="secondary" label="Cell 8" key={8} />,
      <GridCell color="success" label="Cell 9" key={9} />
    ]
  },
  render: (args: any) => (
    <Grid columns={args.columns} gap={args.gap}>
      {args.children}
    </Grid>
  ),
};

// Responsive Grid
export const ResponsiveColumns: Story = {
  args: {
    responsiveChildren: [
      <GridCell color="primary" label="Cell 1" key={1} />,
      <GridCell color="secondary" label="Cell 2" key={2} />,
      <GridCell color="success" label="Cell 3" key={3} />,
      <GridCell color="info" label="Cell 4" key={4} />,
      <GridCell color="warning" label="Cell 5" key={5} />,
      <GridCell color="error" label="Cell 6" key={6} />,
      <GridCell color="primary" label="Cell 7" key={7} />,
      <GridCell color="secondary" label="Cell 8" key={8} />
    ],
    responsiveColumns: {
      base: '1',
      sm: '2',
      md: '3',
      lg: '4'
    }
  },
  render: (args: any) => (
    <div>
      <h3 class="text-lg font-semibold mb-2">Responsive Columns (1 on mobile, 2 on tablet, 4 on desktop)</h3>
      <Grid
        columns={args.responsiveColumns}
        gap="md"
      >
        {args.responsiveChildren}
      </Grid>
      <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Resize the window to see the grid adapt</p>
    </div>
  ),
};

// Auto-fit Grid Example
export const AutofitGrid: Story = {
  args: {
    columns: 'auto-fit',
    gap: 'md',
    minColumnWidth: '150px',
    autofitChildren: [
      <GridCell color="primary" label="Cell 1" key={1} />,
      <GridCell color="secondary" label="Cell 2" key={2} />,
      <GridCell color="success" label="Cell 3" key={3} />,
      <GridCell color="info" label="Cell 4" key={4} />,
      <GridCell color="warning" label="Cell 5" key={5} />,
      <GridCell color="error" label="Cell 6" key={6} />,
      <GridCell color="primary" label="Cell 7" key={7} />,
      <GridCell color="secondary" label="Cell 8" key={8} />
    ]
  },
  render: (args: any) => (
    <div>
      <h3 class="text-lg font-semibold mb-2">Auto-fit Grid (min column width: 150px)</h3>
      <Grid columns={args.columns} gap={args.gap} minColumnWidth={args.minColumnWidth}>
        {args.autofitChildren}
      </Grid>
      <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Resize the window to see columns adapt automatically</p>
    </div>
  ),
};

// Column and Row Span Example
export const ColumnAndRowSpans: Story = {
  args: {
    colSpanGridChildren: [
      <GridItem colSpan={3} key={1}>
        <GridCell color="primary" label="Span 3 columns" />
      </GridItem>,
      <GridItem colSpan={2} key={2}>
        <GridCell color="secondary" label="Span 2 columns" />
      </GridItem>,
      <GridItem key={3}>
        <GridCell color="success" label="1 column" />
      </GridItem>,
      <GridItem key={4}>
        <GridCell color="info" label="1 column" />
      </GridItem>,
      <GridItem colSpan={2} key={5}>
        <GridCell color="warning" label="Span 2 columns" />
      </GridItem>,
      <GridItem key={6}>
        <GridCell color="error" label="1 column" />
      </GridItem>,
      <GridItem colSpan={2} key={7}>
        <GridCell color="primary" label="Span 2 columns" />
      </GridItem>,
      <GridItem key={8}>
        <GridCell color="secondary" label="1 column" />
      </GridItem>,
      <GridItem rowSpan={2} key={9}>
        <GridCell color="info" label="Span 2 rows" />
      </GridItem>,
      <GridItem key={10}>
        <GridCell color="primary" label="1x1" />
      </GridItem>,
      <GridItem key={11}>
        <GridCell color="secondary" label="1x1" />
      </GridItem>,
      <GridItem colSpan={2} key={12}>
        <GridCell color="warning" label="Span 2 columns" />
      </GridItem>,
      <GridItem key={13}>
        <GridCell color="error" label="1x1" />
      </GridItem>,
      <GridItem colSpan={2} key={14}>
        <GridCell color="primary" label="Span 2 columns" />
      </GridItem>,
    ],
    rowSpanGridChildren: [
      <GridItem rowSpan={2} key={1}>
        <GridCell color="primary" label="Span 2 rows" />
      </GridItem>,
      <GridItem key={2}>
        <GridCell color="secondary" label="1x1" />
      </GridItem>,
      <GridItem key={3}>
        <GridCell color="success" label="1x1" />
      </GridItem>,
      <GridItem rowSpan={3} key={4}>
        <GridCell color="info" label="Span 3 rows" />
      </GridItem>,
      <GridItem colSpan={2} key={5}>
        <GridCell color="warning" label="Span 2 columns" />
      </GridItem>,
      <GridItem key={6}>
        <GridCell color="error" label="1x1" />
      </GridItem>,
      <GridItem colSpan={2} key={7}>
        <GridCell color="primary" label="Span 2 columns" />
      </GridItem>,
    ],
  },
  render: (args: any) => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Column Spans</h3>
        <Grid columns="3" gap="md">
          {args.colSpanGridChildren}
        </Grid>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Row Spans</h3>
        <Grid columns="4" rows="3" gap="md" class="h-64">
          {args.rowSpanGridChildren}
        </Grid>
      </div>
    </div>
  ),
};

// Grid Positioning Example
export const GridPositioning: Story = {
  render: () => (
    <div>
      <h3 class="text-lg font-semibold mb-2">Explicit Grid Positioning</h3>
      <Grid columns="3" rows="3" gap="md" class="h-64">
        <GridItem colStart={1} colEnd={3} rowStart={1} rowEnd={2}>
          <GridCell color="primary" label="col 1-2, row 1" />
        </GridItem>
        <GridItem colStart={3} colEnd={4} rowStart={1} rowEnd={3}>
          <GridCell color="secondary" label="col 3, row 1-2" />
        </GridItem>
        <GridItem colStart={1} colEnd={2} rowStart={2} rowEnd={4}>
          <GridCell color="success" label="col 1, row 2-3" />
        </GridItem>
        <GridItem colStart={2} colEnd={3} rowStart={2} rowEnd={3}>
          <GridCell color="info" label="col 2, row 2" />
        </GridItem>
        <GridItem colStart={2} colEnd={4} rowStart={3} rowEnd={4}>
          <GridCell color="warning" label="col 2-3, row 3" />
        </GridItem>
      </Grid>
    </div>
  ),
};

// Gap Sizes Example
export const GapSizes: Story = {
  args: {
    gridCells: [
      <GridCell color="primary" label="Cell 1" key={1} />,
      <GridCell color="secondary" label="Cell 2" key={2} />,
      <GridCell color="success" label="Cell 3" key={3} />,
      <GridCell color="info" label="Cell 4" key={4} />,
      <GridCell color="warning" label="Cell 5" key={5} />,
      <GridCell color="error" label="Cell 6" key={6} />
    ]
  },
  render: (args: any) => (
    <div class="space-y-12">
      <div>
        <h3 class="text-lg font-semibold mb-2">No Gap</h3>
        <Grid columns="3" gap="none">
          {args.gridCells}
        </Grid>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Small Gap</h3>
        <Grid columns="3" gap="sm">
          {args.gridCells}
        </Grid>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Medium Gap (Default)</h3>
        <Grid columns="3" gap="md">
          {args.gridCells}
        </Grid>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Large Gap</h3>
        <Grid columns="3" gap="lg">
          {args.gridCells}
        </Grid>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Different Row and Column Gaps</h3>
        <Grid columns="3" columnGap="xs" rowGap="xl" rows="2">
          {args.gridCells}
        </Grid>
        <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Small column gaps, extra large row gaps</p>
      </div>
    </div>
  ),
};

// Auto Flow Examples
export const AutoFlowExamples: Story = {
  args: {
    standardCells: [
      <GridCell color="primary" label="Cell 1" key={1} />,
      <GridCell color="secondary" label="Cell 2" key={2} />,
      <GridCell color="success" label="Cell 3" key={3} />,
      <GridCell color="info" label="Cell 4" key={4} />,
      <GridCell color="warning" label="Cell 5" key={5} />,
      <GridCell color="error" label="Cell 6" key={6} />,
      <GridCell color="primary" label="Cell 7" key={7} />,
      <GridCell color="secondary" label="Cell 8" key={8} />
    ],
    denseCells: [
      <GridCell color="primary" label="Cell 1" key={1} />,
      <GridItem colSpan={2} key={2}>
        <GridCell color="secondary" label="Cell 2 (span 2)" />
      </GridItem>,
      <GridItem colSpan={2} key={3}>
        <GridCell color="success" label="Cell 3 (span 2)" />
      </GridItem>,
      <GridCell color="info" label="Cell 4" key={4} />,
      <GridCell color="warning" label="Cell 5" key={5} />,
      <GridCell color="error" label="Cell 6" key={6} />,
      <GridCell color="primary" label="Cell 7" key={7} />
    ]
  },
  render: (args: any) => (
    <div class="space-y-12">
      <div>
        <h3 class="text-lg font-semibold mb-2">Row Auto Flow (default)</h3>
        <Grid columns="3" rows="2" gap="md" autoFlow="row">
          {args.standardCells}
        </Grid>
        <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Items flow to the next row when a row is filled</p>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Column Auto Flow</h3>
        <Grid columns="3" rows="3" gap="md" autoFlow="column">
          {args.standardCells}
        </Grid>
        <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Items flow to the next column when a column is filled</p>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Dense Auto Flow</h3>
        <Grid columns="3" rows="3" gap="md" autoFlow="dense">
          {args.denseCells}
        </Grid>
        <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Items are packed densely, filling in gaps</p>
      </div>
    </div>
  ),
};

// Alignment Examples
export const AlignmentExamples: Story = {
  args: {
    justifyBoxes: [
      <Box class="w-3/4 h-16" key={1}>
        <GridCell color="primary" label="Cell 1" />
      </Box>,
      <Box class="w-1/2 h-16" key={2}>
        <GridCell color="secondary" label="Cell 2" />
      </Box>,
      <Box class="w-2/3 h-16" key={3}>
        <GridCell color="success" label="Cell 3" />
      </Box>
    ],
    alignBoxes: [
      <Box class="h-3/4" key={1}>
        <GridCell color="primary" label="Cell 1" />
      </Box>,
      <Box class="h-1/2" key={2}>
        <GridCell color="secondary" label="Cell 2" />
      </Box>,
      <Box class="h-2/3" key={3}>
        <GridCell color="success" label="Cell 3" />
      </Box>
    ]
  },
  render: (args: any) => (
    <div class="space-y-12">
      <div>
        <h3 class="text-lg font-semibold mb-2">Justify Items: Start</h3>
        <Grid columns="3" gap="md" justifyItems="start">
          {args.justifyBoxes}
        </Grid>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Justify Items: Center</h3>
        <Grid columns="3" gap="md" justifyItems="center">
          {args.justifyBoxes}
        </Grid>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Justify Items: End</h3>
        <Grid columns="3" gap="md" justifyItems="end">
          {args.justifyBoxes}
        </Grid>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Align Items: Start</h3>
        <Grid columns="3" gap="md" alignItems="start" class="h-32">
          {args.alignBoxes}
        </Grid>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Align Items: Center</h3>
        <Grid columns="3" gap="md" alignItems="center" class="h-32">
          {args.alignBoxes}
        </Grid>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Align Items: End</h3>
        <Grid columns="3" gap="md" alignItems="end" class="h-32">
          {args.alignBoxes}
        </Grid>
      </div>
    </div>
  ),
};

// Custom Template Example
export const CustomTemplate: Story = {
  args: {
    templateItems: [
      <GridItem colSpan={3} key={1}>
        <GridCell color="primary" label="Header (Spans all columns)" />
      </GridItem>,
      <GridCell color="secondary" label="Sidebar" key={2} />,
      <GridCell color="success" label="Main Content" key={3} />,
      <GridCell color="info" label="Right Panel" key={4} />,
      <GridItem colSpan={3} key={5}>
        <GridCell color="warning" label="Footer (Spans all columns)" />
      </GridItem>
    ]
  },
  render: (args: any) => (
    <div>
      <h3 class="text-lg font-semibold mb-2">Custom Grid Template</h3>
      <Grid columnTemplate="1fr 2fr 1fr" rowTemplate="auto 200px 1fr" gap="md" class="h-96">
        {args.templateItems}
      </Grid>
      <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Using custom template: "1fr 2fr 1fr" for columns and "auto 200px 1fr" for rows</p>
    </div>
  ),
};
