import { component$ } from '@builder.io/qwik';
import { ComponentPage } from '~/components/Docs/ComponentPage';
import { 
  GridOverview,
  GridExamples,
  GridAPIReference,
  GridUsage,
  GridPlayground
} from '~/components/Core/Layout/Grid/docs';

export default component$(() => {
  return (
    <ComponentPage
      title="Grid"
      description="A two-dimensional layout component for creating grid-based layouts with precise control."
      overview={<GridOverview />}
      examples={<GridExamples />}
      apiReference={<GridAPIReference />}
      usage={<GridUsage />}
      playground={<GridPlayground />}
    >
      <Card class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">Import</h2>
        </div>
        <CodeExample
          code={`import { Grid, GridItem } from "~/components/Core/Layout/Grid";`}
          language="tsx"
        />
      </Card>
      
      {/* Grid Columns */}
      <section class="mb-12">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Grid Columns</h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          Use the <code class="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">columns</code> prop to define the number of columns in your grid.
        </p>
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">2 Columns</h3>
              <Grid columns="2" gap="md" class="mb-6">
                <Box padding="md" backgroundColor="secondary" borderRadius="md" class="text-center text-white p-4">
                  Column 1
                </Box>
                <Box padding="md" backgroundColor="secondary" borderRadius="md" class="text-center text-white p-4">
                  Column 2
                </Box>
              </Grid>
            </div>
            
            <div>
              <h3 class="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">4 Columns</h3>
              <Grid columns="4" gap="md" class="mb-6">
                <Box padding="md" backgroundColor="secondary" borderRadius="md" class="text-center text-white p-4">
                  Col 1
                </Box>
                <Box padding="md" backgroundColor="secondary" borderRadius="md" class="text-center text-white p-4">
                  Col 2
                </Box>
                <Box padding="md" backgroundColor="secondary" borderRadius="md" class="text-center text-white p-4">
                  Col 3
                </Box>
                <Box padding="md" backgroundColor="secondary" borderRadius="md" class="text-center text-white p-4">
                  Col 4
                </Box>
              </Grid>
            </div>
            
            <div>
              <h3 class="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Custom Column Width with GridItem</h3>
              <Grid columns="3" gap="md">
                <GridItem colSpan={2}>
                  <Box padding="md" backgroundColor="info" borderRadius="md" class="text-center text-white p-4">
                    Spans 2 columns
                  </Box>
                </GridItem>
                <Box padding="md" backgroundColor="info" borderRadius="md" class="text-center text-white p-4">
                  1 column
                </Box>
                <Box padding="md" backgroundColor="info" borderRadius="md" class="text-center text-white p-4">
                  1 column
                </Box>
                <GridItem colSpan={2}>
                  <Box padding="md" backgroundColor="info" borderRadius="md" class="text-center text-white p-4">
                    Spans 2 columns
                  </Box>
                </GridItem>
              </Grid>
            </div>
          </div>
        </div>
        <CodeExample
          code={`// 2 Columns
<Grid columns="2" gap="md">
  <Box padding="md" backgroundColor="secondary" borderRadius="md">Column 1</Box>
  <Box padding="md" backgroundColor="secondary" borderRadius="md">Column 2</Box>
</Grid>

// 4 Columns
<Grid columns="4" gap="md">
  <Box padding="md" backgroundColor="secondary" borderRadius="md">Col 1</Box>
  <Box padding="md" backgroundColor="secondary" borderRadius="md">Col 2</Box>
  <Box padding="md" backgroundColor="secondary" borderRadius="md">Col 3</Box>
  <Box padding="md" backgroundColor="secondary" borderRadius="md">Col 4</Box>
</Grid>

// Custom Column Width with GridItem
<Grid columns="3" gap="md">
  <GridItem colSpan={2}>
    <Box padding="md" backgroundColor="info" borderRadius="md">Spans 2 columns</Box>
  </GridItem>
  <Box padding="md" backgroundColor="info" borderRadius="md">1 column</Box>
  <Box padding="md" backgroundColor="info" borderRadius="md">1 column</Box>
  <GridItem colSpan={2}>
    <Box padding="md" backgroundColor="info" borderRadius="md">Spans 2 columns</Box>
  </GridItem>
</Grid>`}
          language="tsx"
        />
      </section>
      
      {/* Gap Options */}
      <section class="mb-12">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Gap Options</h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          Use the <code class="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">gap</code> prop to control the spacing between grid items. You can also use <code class="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">columnGap</code> and <code class="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">rowGap</code> for different horizontal and vertical spacing.
        </p>
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Small Gap (sm)</h3>
              <Grid columns="3" gap="sm" class="mb-6">
                <Box padding="md" backgroundColor="warning" borderRadius="md" class="text-center text-white p-4">
                  Item
                </Box>
                <Box padding="md" backgroundColor="warning" borderRadius="md" class="text-center text-white p-4">
                  Item
                </Box>
                <Box padding="md" backgroundColor="warning" borderRadius="md" class="text-center text-white p-4">
                  Item
                </Box>
              </Grid>
            </div>
            
            <div>
              <h3 class="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Large Gap (lg)</h3>
              <Grid columns="3" gap="lg" class="mb-6">
                <Box padding="md" backgroundColor="warning" borderRadius="md" class="text-center text-white p-4">
                  Item
                </Box>
                <Box padding="md" backgroundColor="warning" borderRadius="md" class="text-center text-white p-4">
                  Item
                </Box>
                <Box padding="md" backgroundColor="warning" borderRadius="md" class="text-center text-white p-4">
                  Item
                </Box>
              </Grid>
            </div>
            
            <div>
              <h3 class="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Different Column & Row Gap</h3>
              <Grid columns="3" columnGap="xs" rowGap="xl" class="mb-6">
                <Box padding="md" backgroundColor="warning" borderRadius="md" class="text-center text-white p-4">
                  Item
                </Box>
                <Box padding="md" backgroundColor="warning" borderRadius="md" class="text-center text-white p-4">
                  Item
                </Box>
                <Box padding="md" backgroundColor="warning" borderRadius="md" class="text-center text-white p-4">
                  Item
                </Box>
                <Box padding="md" backgroundColor="warning" borderRadius="md" class="text-center text-white p-4">
                  Item
                </Box>
                <Box padding="md" backgroundColor="warning" borderRadius="md" class="text-center text-white p-4">
                  Item
                </Box>
                <Box padding="md" backgroundColor="warning" borderRadius="md" class="text-center text-white p-4">
                  Item
                </Box>
              </Grid>
            </div>
          </div>
        </div>
        <CodeExample
          code={`// Small Gap
<Grid columns="3" gap="sm">
  <Box padding="md" backgroundColor="warning" borderRadius="md">Item</Box>
  <Box padding="md" backgroundColor="warning" borderRadius="md">Item</Box>
  <Box padding="md" backgroundColor="warning" borderRadius="md">Item</Box>
</Grid>

// Large Gap
<Grid columns="3" gap="lg">
  <Box padding="md" backgroundColor="warning" borderRadius="md">Item</Box>
  <Box padding="md" backgroundColor="warning" borderRadius="md">Item</Box>
  <Box padding="md" backgroundColor="warning" borderRadius="md">Item</Box>
</Grid>

// Different Column & Row Gap
<Grid columns="3" columnGap="xs" rowGap="xl">
  <Box padding="md" backgroundColor="warning" borderRadius="md">Item</Box>
  <Box padding="md" backgroundColor="warning" borderRadius="md">Item</Box>
  <Box padding="md" backgroundColor="warning" borderRadius="md">Item</Box>
  <Box padding="md" backgroundColor="warning" borderRadius="md">Item</Box>
  <Box padding="md" backgroundColor="warning" borderRadius="md">Item</Box>
  <Box padding="md" backgroundColor="warning" borderRadius="md">Item</Box>
</Grid>`}
          language="tsx"
        />
      </section>
      
      {/* Responsive Grids */}
      <section class="mb-12">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Responsive Grids</h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          Create responsive layouts by passing an object to the <code class="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">columns</code> prop with different values for each breakpoint.
        </p>
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
          <div class="space-y-2">
            <p class="text-gray-700 dark:text-gray-300 mb-2">This grid has:</p>
            <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
              <li>1 column on mobile (default)</li>
              <li>2 columns on small screens (sm)</li>
              <li>3 columns on medium screens (md)</li>
              <li>4 columns on large screens (lg)</li>
            </ul>
            <Grid columns={{
              base: '1',
              sm: '2',
              md: '3',
              lg: '4'
            }} gap="md">
              <Box padding="md" backgroundColor="success" borderRadius="md" class="text-center text-white p-4">
                Item 1
              </Box>
              <Box padding="md" backgroundColor="success" borderRadius="md" class="text-center text-white p-4">
                Item 2
              </Box>
              <Box padding="md" backgroundColor="success" borderRadius="md" class="text-center text-white p-4">
                Item 3
              </Box>
              <Box padding="md" backgroundColor="success" borderRadius="md" class="text-center text-white p-4">
                Item 4
              </Box>
              <Box padding="md" backgroundColor="success" borderRadius="md" class="text-center text-white p-4">
                Item 5
              </Box>
              <Box padding="md" backgroundColor="success" borderRadius="md" class="text-center text-white p-4">
                Item 6
              </Box>
              <Box padding="md" backgroundColor="success" borderRadius="md" class="text-center text-white p-4">
                Item 7
              </Box>
              <Box padding="md" backgroundColor="success" borderRadius="md" class="text-center text-white p-4">
                Item 8
              </Box>
            </Grid>
            <p class="text-gray-700 dark:text-gray-300 mt-4 text-sm">Resize your browser window to see the grid adapt.</p>
          </div>
        </div>
        <CodeExample
          code={`<Grid 
  columns={{
    base: '1',  // Default for mobile
    sm: '2',    // Small screens (640px+)
    md: '3',    // Medium screens (768px+)
    lg: '4'     // Large screens (1024px+)
  }} 
  gap="md"
>
  <Box padding="md" backgroundColor="success" borderRadius="md">Item 1</Box>
  <Box padding="md" backgroundColor="success" borderRadius="md">Item 2</Box>
  <Box padding="md" backgroundColor="success" borderRadius="md">Item 3</Box>
  <Box padding="md" backgroundColor="success" borderRadius="md">Item 4</Box>
  <Box padding="md" backgroundColor="success" borderRadius="md">Item 5</Box>
  <Box padding="md" backgroundColor="success" borderRadius="md">Item 6</Box>
  <Box padding="md" backgroundColor="success" borderRadius="md">Item 7</Box>
  <Box padding="md" backgroundColor="success" borderRadius="md">Item 8</Box>
</Grid>`}
          language="tsx"
        />
      </section>
      
      {/* Auto-fit and Auto-fill */}
      <section class="mb-12">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Auto-fit and Auto-fill</h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          Create responsive grids that automatically adjust the number of columns based on available space using <code class="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">auto-fit</code> or <code class="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">auto-fill</code>. The <code class="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">minColumnWidth</code> prop controls the minimum width of each column.
        </p>
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
          <div class="space-y-8">
            <div>
              <h3 class="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Auto-fit Grid</h3>
              <p class="text-gray-700 dark:text-gray-300 mb-2 text-sm">
                Auto-fit will stretch items to fill the available space
              </p>
              <Grid columns="auto-fit" minColumnWidth="150px" gap="md" class="mb-6">
                <Box padding="md" backgroundColor="primary" borderRadius="md" class="text-center text-white p-4">
                  Item 1
                </Box>
                <Box padding="md" backgroundColor="primary" borderRadius="md" class="text-center text-white p-4">
                  Item 2
                </Box>
                <Box padding="md" backgroundColor="primary" borderRadius="md" class="text-center text-white p-4">
                  Item 3
                </Box>
                <Box padding="md" backgroundColor="primary" borderRadius="md" class="text-center text-white p-4">
                  Item 4
                </Box>
              </Grid>
            </div>
            
            <div>
              <h3 class="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Auto-fill Grid</h3>
              <p class="text-gray-700 dark:text-gray-300 mb-2 text-sm">
                Auto-fill will add as many columns as possible, potentially leaving empty columns
              </p>
              <Grid columns="auto-fill" minColumnWidth="150px" gap="md">
                <Box padding="md" backgroundColor="secondary" borderRadius="md" class="text-center text-white p-4">
                  Item 1
                </Box>
                <Box padding="md" backgroundColor="secondary" borderRadius="md" class="text-center text-white p-4">
                  Item 2
                </Box>
                <Box padding="md" backgroundColor="secondary" borderRadius="md" class="text-center text-white p-4">
                  Item 3
                </Box>
                <Box padding="md" backgroundColor="secondary" borderRadius="md" class="text-center text-white p-4">
                  Item 4
                </Box>
              </Grid>
            </div>
          </div>
        </div>
        <CodeExample
          code={`// Auto-fit Grid
<Grid columns="auto-fit" minColumnWidth="150px" gap="md">
  <Box padding="md" backgroundColor="primary" borderRadius="md">Item 1</Box>
  <Box padding="md" backgroundColor="primary" borderRadius="md">Item 2</Box>
  <Box padding="md" backgroundColor="primary" borderRadius="md">Item 3</Box>
  <Box padding="md" backgroundColor="primary" borderRadius="md">Item 4</Box>
</Grid>

// Auto-fill Grid
<Grid columns="auto-fill" minColumnWidth="150px" gap="md">
  <Box padding="md" backgroundColor="secondary" borderRadius="md">Item 1</Box>
  <Box padding="md" backgroundColor="secondary" borderRadius="md">Item 2</Box>
  <Box padding="md" backgroundColor="secondary" borderRadius="md">Item 3</Box>
  <Box padding="md" backgroundColor="secondary" borderRadius="md">Item 4</Box>
</Grid>`}
          language="tsx"
        />
      </section>
      
      {/* API Reference */}
      <section class="mb-12">
        <h2 id="api" class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">API Reference</h2>
        
        <h3 class="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Grid Props</h3>
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mb-8">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Prop</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Default</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">columns</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">string | number | ResponsiveObject</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">'1'</td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Number of columns or responsive object with breakpoints</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">rows</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">string | number</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">'auto'</td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Number of rows or template</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">gap</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">GridGap</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">'md'</td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Spacing between grid items</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">columnGap</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">GridGap</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">'md'</td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Horizontal spacing between grid items</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">rowGap</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">GridGap</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">'md'</td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Vertical spacing between grid items</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">minColumnWidth</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">string</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">'250px'</td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Minimum column width for auto-fit/auto-fill</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">autoFlow</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">GridAutoFlow</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">'row'</td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Controls how the auto-placement algorithm works</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">justifyItems</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">GridPlacement</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">'stretch'</td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Alignment of items along the row axis</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">alignItems</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">GridPlacement</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">'stretch'</td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Alignment of items along the column axis</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">columnTemplate</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">string</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">-</td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Custom CSS grid-template-columns value</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">rowTemplate</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">string</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">-</td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Custom CSS grid-template-rows value</td>
            </tr>
          </tbody>
        </table>
        
        <h3 class="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">GridItem Props</h3>
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Prop</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Default</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">colSpan</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">number | string</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">-</td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Number of columns the item spans</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">rowSpan</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">number | string</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">-</td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Number of rows the item spans</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">colStart</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">number | string</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">-</td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Starting column for the item</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">colEnd</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">number | string</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">-</td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Ending column for the item</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">rowStart</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">number | string</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">-</td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Starting row for the item</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">rowEnd</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">number | string</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">-</td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Ending row for the item</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">justifySelf</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">GridPlacement</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">-</td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Horizontal alignment for this specific item</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">alignSelf</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">GridPlacement</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">-</td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Vertical alignment for this specific item</td>
            </tr>
          </tbody>
        </table>

        <div class="mt-4">
          <h3 class="text-lg font-medium mb-2">Type Definitions</h3>
          <CodeExample
            code={`// Grid gap options
type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

// Grid auto flow options
type GridAutoFlow = 'row' | 'column' | 'row-dense' | 'column-dense' | 'dense';

// Grid placement options
type GridPlacement = 'auto' | 'start' | 'center' | 'end' | 'stretch' | 'baseline';

// Responsive column configuration
interface ResponsiveGridTemplateColumns {
  base?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
}`}
            language="typescript"
          />
        </div>
      </section>
      
      {/* Accessibility */}
      <section class="mb-12">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Accessibility</h2>
        <div class="space-y-4 text-gray-700 dark:text-gray-300">
          <p>The Grid component follows accessibility best practices:</p>
          <ul class="list-disc list-inside pl-4 space-y-2">
            <li>Uses semantic HTML structure with appropriate ARIA attributes when necessary</li>
            <li>Maintains a logical DOM order to ensure keyboard navigation follows a predictable path</li>
            <li>Supports ARIA roles and labels for landmark regions when needed</li>
            <li>Preserves content readability at various viewport sizes</li>
            <li>Avoids accessibility issues common with visual grid layouts by using CSS Grid instead of older techniques</li>
          </ul>
          
          <div class="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-md border border-amber-200 dark:border-amber-800">
            <h3 class="text-amber-800 dark:text-amber-400 font-medium mb-2">Important Considerations</h3>
            <p class="text-amber-700 dark:text-amber-300">
              When using Grid for complex layouts, be mindful that the visual order might not match the DOM order. This can affect keyboard navigation, so ensure the source order remains logical for screen reader users.
            </p>
          </div>
        </div>
      </section>
      
      {/* Best Practices */}
      <section class="mb-12">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Best Practices</h2>
        <div class="space-y-4 text-gray-700 dark:text-gray-300">
          <ul class="list-disc list-inside pl-4 space-y-2">
            <li><strong>Choose the right layout component</strong>: Use Grid for two-dimensional layouts. For simpler one-dimensional layouts, consider using Stack instead.</li>
            <li><strong>Responsive design</strong>: Leverage the responsive column properties to create layouts that adapt to different screen sizes.</li>
            <li><strong>Auto-fit vs. auto-fill</strong>: Use auto-fit when you want items to stretch and fill the container, and auto-fill when you want to maintain item sizes and possibly have empty tracks.</li>
            <li><strong>Logical source order</strong>: Keep the DOM order logical for accessibility, even if the visual presentation is different.</li>
            <li><strong>Consistent gaps</strong>: Use consistent gap sizes throughout your application for visual harmony.</li>
            <li><strong>Complex layouts</strong>: For more complex layouts, combine Grid with GridItem components to precisely control item placement.</li>
            <li><strong>Minimize media queries</strong>: Let the Grid component's responsive features handle layout changes instead of writing custom media queries.</li>
            <li><strong>Performance</strong>: Be mindful of nesting too many grids, as it can affect performance; flatten your structure when possible.</li>
          </ul>
        </div>
      </section>
      
      {/* Related Components */}
      <section class="mb-12">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Related Components</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card variant="elevated" class="p-4">
            <h3 class="font-medium text-lg mb-2">Box</h3>
            <p class="text-gray-700 dark:text-gray-300 text-sm">A foundational layout component for creating containers with consistent styling.</p>
          </Card>
          <Card variant="elevated" class="p-4">
            <h3 class="font-medium text-lg mb-2">Stack</h3>
            <p class="text-gray-700 dark:text-gray-300 text-sm">A layout component for arranging elements in a one-dimensional stack with consistent spacing.</p>
          </Card>
          <Card variant="elevated" class="p-4">
            <h3 class="font-medium text-lg mb-2">Container</h3>
            <p class="text-gray-700 dark:text-gray-300 text-sm">A layout component for constraining content width and providing consistent padding.</p>
          </Card>
        </div>
      </section>
    </ComponentPage>
  );
}); 