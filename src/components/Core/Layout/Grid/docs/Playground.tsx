import { component$, useSignal, useStore } from '@builder.io/qwik';
import { DocsHeading, DocsSection, DocsSectionTitle, DocsParagraph } from '~/components/Docs/DocBlocks';
import { Grid, GridItem } from '~/components/Core/Layout/Grid';
import { PlaygroundControl } from '~/components/Docs/PlaygroundControl';

export const GridPlayground = component$(() => {
  const gridProps = useStore({
    columns: '3',
    rows: 'auto',
    gap: 'md',
    autoFlow: 'row',
    alignItems: 'stretch',
    justifyItems: 'stretch',
    minColumnWidth: '100px',
  });

  const itemCount = useSignal(6);
  const showGridItem = useSignal(false);

  return (
    <div class="space-y-8">
      <DocsHeading>Grid Playground</DocsHeading>
      
      <DocsParagraph>
        Experiment with different Grid properties to see how they affect the layout.
      </DocsParagraph>

      <div class="flex flex-col lg:flex-row gap-8">
        <div class="w-full lg:w-2/3 order-2 lg:order-1">
          <div class="bg-surface p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <Grid
              columns={gridProps.columns === 'auto-fill' || gridProps.columns === 'auto-fit' 
                ? gridProps.columns 
                : gridProps.columns}
              rows={gridProps.rows}
              gap={gridProps.gap}
              autoFlow={gridProps.autoFlow}
              alignItems={gridProps.alignItems}
              justifyItems={gridProps.justifyItems}
              minColumnWidth={gridProps.minColumnWidth}
              class="min-h-[300px]"
            >
              {Array.from({ length: itemCount.value }).map((_, i) => 
                showGridItem.value ? (
                  <GridItem 
                    key={i}
                    class="bg-primary-500 dark:bg-primary-400 rounded-md p-4 text-white flex items-center justify-center"
                  >
                    Item {i + 1}
                  </GridItem>
                ) : (
                  <div 
                    key={i}
                    class="bg-primary-500 dark:bg-primary-400 rounded-md p-4 text-white flex items-center justify-center"
                  >
                    Item {i + 1}
                  </div>
                )
              )}
            </Grid>
          </div>
        </div>
        
        <div class="w-full lg:w-1/3 space-y-6 order-1 lg:order-2">
          <DocsSection>
            <DocsSectionTitle>Grid Properties</DocsSectionTitle>
            
            <div class="space-y-4">
              <PlaygroundControl
                type="select"
                label="Columns"
                value={gridProps.columns}
                onChange$={(value) => (gridProps.columns = value)}
                options={[
                  { label: '1', value: '1' },
                  { label: '2', value: '2' },
                  { label: '3', value: '3' },
                  { label: '4', value: '4' },
                  { label: '6', value: '6' },
                  { label: 'Auto-fill', value: 'auto-fill' },
                  { label: 'Auto-fit', value: 'auto-fit' },
                ]}
              />
              
              <PlaygroundControl
                type="select"
                label="Rows"
                value={gridProps.rows}
                onChange$={(value) => (gridProps.rows = value)}
                options={[
                  { label: 'Auto', value: 'auto' },
                  { label: '1', value: '1' },
                  { label: '2', value: '2' },
                  { label: '3', value: '3' },
                  { label: '4', value: '4' },
                ]}
              />
              
              <PlaygroundControl
                type="select"
                label="Gap"
                value={gridProps.gap}
                onChange$={(value) => (gridProps.gap = value)}
                options={[
                  { label: 'None', value: 'none' },
                  { label: 'XS', value: 'xs' },
                  { label: 'SM', value: 'sm' },
                  { label: 'MD', value: 'md' },
                  { label: 'LG', value: 'lg' },
                  { label: 'XL', value: 'xl' },
                  { label: '2XL', value: '2xl' },
                  { label: '3XL', value: '3xl' },
                ]}
              />
              
              <PlaygroundControl
                type="select"
                label="Auto Flow"
                value={gridProps.autoFlow}
                onChange$={(value) => (gridProps.autoFlow = value)}
                options={[
                  { label: 'Row', value: 'row' },
                  { label: 'Column', value: 'column' },
                  { label: 'Dense', value: 'dense' },
                  { label: 'Row Dense', value: 'row-dense' },
                  { label: 'Column Dense', value: 'column-dense' },
                ]}
              />
              
              <PlaygroundControl
                type="select"
                label="Align Items"
                value={gridProps.alignItems}
                onChange$={(value) => (gridProps.alignItems = value)}
                options={[
                  { label: 'Stretch', value: 'stretch' },
                  { label: 'Start', value: 'start' },
                  { label: 'Center', value: 'center' },
                  { label: 'End', value: 'end' },
                  { label: 'Baseline', value: 'baseline' },
                ]}
              />
              
              <PlaygroundControl
                type="select"
                label="Justify Items"
                value={gridProps.justifyItems}
                onChange$={(value) => (gridProps.justifyItems = value)}
                options={[
                  { label: 'Stretch', value: 'stretch' },
                  { label: 'Start', value: 'start' },
                  { label: 'Center', value: 'center' },
                  { label: 'End', value: 'end' },
                ]}
              />
              
              <PlaygroundControl
                type="range"
                label="Number of Items"
                value={itemCount.value}
                min={1}
                max={12}
                step={1}
                onChange$={(value) => (itemCount.value = parseInt(value))}
              />
              
              <PlaygroundControl
                type="toggle"
                label="Use GridItem Component"
                checked={showGridItem.value}
                onChange$={(value) => (showGridItem.value = value)}
              />
              
              {(gridProps.columns === 'auto-fill' || gridProps.columns === 'auto-fit') && (
                <PlaygroundControl
                  type="text"
                  label="Min Column Width"
                  value={gridProps.minColumnWidth}
                  onChange$={(value) => (gridProps.minColumnWidth = value)}
                />
              )}
            </div>
          </DocsSection>
        </div>
      </div>
    </div>
  );
});

export default GridPlayground;
