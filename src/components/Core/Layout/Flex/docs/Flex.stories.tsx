import { component$ } from '@builder.io/qwik';
import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Flex, FlexItem } from './index';
import { Box } from '../Box';

const meta: Meta<typeof Flex> = {
  title: 'Core/Layout/Flex',
  component: Flex,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['row', 'column', 'row-reverse', 'column-reverse'] },
    wrap: { control: 'select', options: ['nowrap', 'wrap', 'wrap-reverse'] },
    justify: { control: 'select', options: ['start', 'center', 'end', 'between', 'around', 'evenly'] },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch', 'baseline'] },
    alignContent: { control: 'select', options: ['start', 'center', 'end', 'between', 'around', 'stretch'] },
    gap: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] },
    supportRtl: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Flex>;

// Create a demo box to use in examples
const DemoBox = component$<{ label: string; color?: string; class?: string }>(
  ({ label, color = 'primary', class: className }) => (
    <Box
      backgroundColor={color as any}
      padding="md"
      borderRadius="md"
      class={`text-white text-center font-medium ${className || ''}`}
    >
      {label}
    </Box>
  )
);

// Basic Flex (Row)
export const BasicRow: Story = {
  args: {
    direction: 'row',
    gap: 'md',
  },
  render: component$(() => (
    <Flex direction="row" gap="md">
      <DemoBox label="Item 1" />
      <DemoBox label="Item 2" color="secondary" />
      <DemoBox label="Item 3" color="success" />
    </Flex>
  )),
};

// Basic Flex (Column)
export const BasicColumn: Story = {
  args: {
    direction: 'column',
    gap: 'md',
  },
  render: component$(() => (
    <Flex direction="column" gap="md">
      <DemoBox label="Item 1" />
      <DemoBox label="Item 2" color="secondary" />
      <DemoBox label="Item 3" color="success" />
    </Flex>
  )),
};

// Direction Examples
export const DirectionExamples: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Row (Default)</h3>
        <Flex direction="row" gap="md">
          <DemoBox label="Item 1" />
          <DemoBox label="Item 2" color="secondary" />
          <DemoBox label="Item 3" color="success" />
        </Flex>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Column</h3>
        <Flex direction="column" gap="md">
          <DemoBox label="Item 1" />
          <DemoBox label="Item 2" color="secondary" />
          <DemoBox label="Item 3" color="success" />
        </Flex>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Row Reverse</h3>
        <Flex direction="row-reverse" gap="md">
          <DemoBox label="Item 1" />
          <DemoBox label="Item 2" color="secondary" />
          <DemoBox label="Item 3" color="success" />
        </Flex>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Column Reverse</h3>
        <Flex direction="column-reverse" gap="md">
          <DemoBox label="Item 1" />
          <DemoBox label="Item 2" color="secondary" />
          <DemoBox label="Item 3" color="success" />
        </Flex>
      </div>
    </div>
  )),
};

// Responsive Direction
export const ResponsiveDirection: Story = {
  render: component$(() => (
    <div>
      <h3 class="text-lg font-semibold mb-2">Responsive Direction (Column on mobile, Row on larger screens)</h3>
      <Flex
        direction={{
          base: 'column',
          md: 'row'
        }}
        gap="md"
      >
        <DemoBox label="Item 1" />
        <DemoBox label="Item 2" color="secondary" />
        <DemoBox label="Item 3" color="success" />
      </Flex>
      <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Resize the window to see the direction change</p>
    </div>
  )),
};

// Wrap Examples
export const WrapExamples: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">No Wrap (Default)</h3>
        <Flex direction="row" gap="md" wrap="nowrap" class="overflow-x-auto max-w-full">
          <DemoBox label="Item 1" />
          <DemoBox label="Item 2" color="secondary" />
          <DemoBox label="Item 3" color="success" />
          <DemoBox label="Item 4" color="info" />
          <DemoBox label="Item 5" color="warning" />
          <DemoBox label="Item 6" color="error" />
        </Flex>
        <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Items will not wrap (may scroll horizontally)</p>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Wrap</h3>
        <Flex direction="row" gap="md" wrap="wrap" class="max-w-md">
          <DemoBox label="Item 1" />
          <DemoBox label="Item 2" color="secondary" />
          <DemoBox label="Item 3" color="success" />
          <DemoBox label="Item 4" color="info" />
          <DemoBox label="Item 5" color="warning" />
          <DemoBox label="Item 6" color="error" />
        </Flex>
        <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Items will wrap to the next line when needed</p>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Wrap Reverse</h3>
        <Flex direction="row" gap="md" wrap="wrap-reverse" class="max-w-md">
          <DemoBox label="Item 1" />
          <DemoBox label="Item 2" color="secondary" />
          <DemoBox label="Item 3" color="success" />
          <DemoBox label="Item 4" color="info" />
          <DemoBox label="Item 5" color="warning" />
          <DemoBox label="Item 6" color="error" />
        </Flex>
        <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Items will wrap but in reverse order</p>
      </div>
    </div>
  )),
};

// Justify Content Examples
export const JustifyContentExamples: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Justify: Start (Default)</h3>
        <Box backgroundColor="surface-alt" padding="md" borderRadius="md">
          <Flex direction="row" gap="md" justify="start">
            <DemoBox label="Item 1" />
            <DemoBox label="Item 2" color="secondary" />
            <DemoBox label="Item 3" color="success" />
          </Flex>
        </Box>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Justify: Center</h3>
        <Box backgroundColor="surface-alt" padding="md" borderRadius="md">
          <Flex direction="row" gap="md" justify="center">
            <DemoBox label="Item 1" />
            <DemoBox label="Item 2" color="secondary" />
            <DemoBox label="Item 3" color="success" />
          </Flex>
        </Box>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Justify: End</h3>
        <Box backgroundColor="surface-alt" padding="md" borderRadius="md">
          <Flex direction="row" gap="md" justify="end">
            <DemoBox label="Item 1" />
            <DemoBox label="Item 2" color="secondary" />
            <DemoBox label="Item 3" color="success" />
          </Flex>
        </Box>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Justify: Between</h3>
        <Box backgroundColor="surface-alt" padding="md" borderRadius="md">
          <Flex direction="row" gap="md" justify="between">
            <DemoBox label="Item 1" />
            <DemoBox label="Item 2" color="secondary" />
            <DemoBox label="Item 3" color="success" />
          </Flex>
        </Box>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Justify: Around</h3>
        <Box backgroundColor="surface-alt" padding="md" borderRadius="md">
          <Flex direction="row" gap="md" justify="around">
            <DemoBox label="Item 1" />
            <DemoBox label="Item 2" color="secondary" />
            <DemoBox label="Item 3" color="success" />
          </Flex>
        </Box>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Justify: Evenly</h3>
        <Box backgroundColor="surface-alt" padding="md" borderRadius="md">
          <Flex direction="row" gap="md" justify="evenly">
            <DemoBox label="Item 1" />
            <DemoBox label="Item 2" color="secondary" />
            <DemoBox label="Item 3" color="success" />
          </Flex>
        </Box>
      </div>
    </div>
  )),
};

// Align Items Examples
export const AlignItemsExamples: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Align: Stretch (Default)</h3>
        <Box backgroundColor="surface-alt" padding="md" borderRadius="md" class="h-32">
          <Flex direction="row" gap="md" align="stretch">
            <DemoBox label="Item 1" class="h-auto" />
            <DemoBox label="Item 2" color="secondary" class="h-auto" />
            <DemoBox label="Item 3" color="success" class="h-auto" />
          </Flex>
        </Box>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Align: Start</h3>
        <Box backgroundColor="surface-alt" padding="md" borderRadius="md" class="h-32">
          <Flex direction="row" gap="md" align="start">
            <DemoBox label="Item 1" />
            <DemoBox label="Item 2" color="secondary" />
            <DemoBox label="Item 3" color="success" />
          </Flex>
        </Box>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Align: Center</h3>
        <Box backgroundColor="surface-alt" padding="md" borderRadius="md" class="h-32">
          <Flex direction="row" gap="md" align="center">
            <DemoBox label="Item 1" />
            <DemoBox label="Item 2" color="secondary" />
            <DemoBox label="Item 3" color="success" />
          </Flex>
        </Box>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Align: End</h3>
        <Box backgroundColor="surface-alt" padding="md" borderRadius="md" class="h-32">
          <Flex direction="row" gap="md" align="end">
            <DemoBox label="Item 1" />
            <DemoBox label="Item 2" color="secondary" />
            <DemoBox label="Item 3" color="success" />
          </Flex>
        </Box>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Align: Baseline</h3>
        <Box backgroundColor="surface-alt" padding="md" borderRadius="md" class="h-32">
          <Flex direction="row" gap="md" align="baseline">
            <div class="pt-4">
              <DemoBox label="Item 1" />
            </div>
            <div class="pt-8">
              <DemoBox label="Item 2" color="secondary" />
            </div>
            <DemoBox label="Item 3" color="success" />
          </Flex>
        </Box>
      </div>
    </div>
  )),
};

// Align Content Examples (for multi-line flex containers)
export const AlignContentExamples: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Align Content: Start</h3>
        <Box backgroundColor="surface-alt" padding="md" borderRadius="md" class="h-64">
          <Flex 
            direction="row" 
            gap="md" 
            wrap="wrap" 
            alignContent="start" 
            class="max-w-md h-full"
          >
            <DemoBox label="Item 1" />
            <DemoBox label="Item 2" color="secondary" />
            <DemoBox label="Item 3" color="success" />
            <DemoBox label="Item 4" color="info" />
            <DemoBox label="Item 5" color="warning" />
            <DemoBox label="Item 6" color="error" />
          </Flex>
        </Box>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Align Content: Center</h3>
        <Box backgroundColor="surface-alt" padding="md" borderRadius="md" class="h-64">
          <Flex 
            direction="row" 
            gap="md" 
            wrap="wrap" 
            alignContent="center" 
            class="max-w-md h-full"
          >
            <DemoBox label="Item 1" />
            <DemoBox label="Item 2" color="secondary" />
            <DemoBox label="Item 3" color="success" />
            <DemoBox label="Item 4" color="info" />
            <DemoBox label="Item 5" color="warning" />
            <DemoBox label="Item 6" color="error" />
          </Flex>
        </Box>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Align Content: End</h3>
        <Box backgroundColor="surface-alt" padding="md" borderRadius="md" class="h-64">
          <Flex 
            direction="row" 
            gap="md" 
            wrap="wrap" 
            alignContent="end" 
            class="max-w-md h-full"
          >
            <DemoBox label="Item 1" />
            <DemoBox label="Item 2" color="secondary" />
            <DemoBox label="Item 3" color="success" />
            <DemoBox label="Item 4" color="info" />
            <DemoBox label="Item 5" color="warning" />
            <DemoBox label="Item 6" color="error" />
          </Flex>
        </Box>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Align Content: Between</h3>
        <Box backgroundColor="surface-alt" padding="md" borderRadius="md" class="h-64">
          <Flex 
            direction="row" 
            gap="md" 
            wrap="wrap" 
            alignContent="between" 
            class="max-w-md h-full"
          >
            <DemoBox label="Item 1" />
            <DemoBox label="Item 2" color="secondary" />
            <DemoBox label="Item 3" color="success" />
            <DemoBox label="Item 4" color="info" />
            <DemoBox label="Item 5" color="warning" />
            <DemoBox label="Item 6" color="error" />
          </Flex>
        </Box>
      </div>
    </div>
  )),
};

// Gap Examples
export const GapExamples: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">No Gap</h3>
        <Flex direction="row" gap="none">
          <DemoBox label="Item 1" />
          <DemoBox label="Item 2" color="secondary" />
          <DemoBox label="Item 3" color="success" />
        </Flex>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Small Gap (sm)</h3>
        <Flex direction="row" gap="sm">
          <DemoBox label="Item 1" />
          <DemoBox label="Item 2" color="secondary" />
          <DemoBox label="Item 3" color="success" />
        </Flex>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Medium Gap (md)</h3>
        <Flex direction="row" gap="md">
          <DemoBox label="Item 1" />
          <DemoBox label="Item 2" color="secondary" />
          <DemoBox label="Item 3" color="success" />
        </Flex>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Large Gap (lg)</h3>
        <Flex direction="row" gap="lg">
          <DemoBox label="Item 1" />
          <DemoBox label="Item 2" color="secondary" />
          <DemoBox label="Item 3" color="success" />
        </Flex>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Different X and Y Gaps</h3>
        <Flex 
          direction="row" 
          wrap="wrap" 
          columnGap="xs" 
          rowGap="xl" 
          class="max-w-md"
        >
          <DemoBox label="Item 1" />
          <DemoBox label="Item 2" color="secondary" />
          <DemoBox label="Item 3" color="success" />
          <DemoBox label="Item 4" color="info" />
          <DemoBox label="Item 5" color="warning" />
          <DemoBox label="Item 6" color="error" />
        </Flex>
        <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Small column gaps, extra large row gaps</p>
      </div>
    </div>
  )),
};

// FlexItem Examples
export const FlexItemExamples: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Order</h3>
        <Flex direction="row" gap="md">
          <FlexItem order={3}>
            <DemoBox label="Order 3" />
          </FlexItem>
          <FlexItem order={1}>
            <DemoBox label="Order 1" color="secondary" />
          </FlexItem>
          <FlexItem order={2}>
            <DemoBox label="Order 2" color="success" />
          </FlexItem>
        </Flex>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Grow</h3>
        <Flex direction="row" gap="md">
          <FlexItem grow={1}>
            <DemoBox label="Grow 1" class="w-full" />
          </FlexItem>
          <FlexItem grow={2}>
            <DemoBox label="Grow 2" color="secondary" class="w-full" />
          </FlexItem>
          <FlexItem grow={1}>
            <DemoBox label="Grow 1" color="success" class="w-full" />
          </FlexItem>
        </Flex>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Shrink</h3>
        <Flex direction="row" gap="md" class="w-full">
          <FlexItem shrink={0} class="w-48">
            <DemoBox label="No Shrink" class="w-full" />
          </FlexItem>
          <FlexItem shrink={1} class="w-48">
            <DemoBox label="Shrink 1" color="secondary" class="w-full" />
          </FlexItem>
          <FlexItem shrink={2} class="w-48">
            <DemoBox label="Shrink 2" color="success" class="w-full" />
          </FlexItem>
        </Flex>
        <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Resize the window to see shrinking behavior</p>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Align Self</h3>
        <Box backgroundColor="surface-alt" padding="md" borderRadius="md" class="h-32">
          <Flex direction="row" gap="md">
            <FlexItem alignSelf="start">
              <DemoBox label="Self Start" />
            </FlexItem>
            <FlexItem alignSelf="center">
              <DemoBox label="Self Center" color="secondary" />
            </FlexItem>
            <FlexItem alignSelf="end">
              <DemoBox label="Self End" color="success" />
            </FlexItem>
            <FlexItem alignSelf="stretch" class="h-auto">
              <DemoBox label="Self Stretch" color="info" class="h-full" />
            </FlexItem>
          </Flex>
        </Box>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Responsive Item Properties</h3>
        <Flex direction="row" gap="md">
          <FlexItem 
            grow={{
              base: 1,
              md: 2,
              lg: 3
            }}
          >
            <DemoBox label="Responsive Grow" class="w-full" />
          </FlexItem>
          <FlexItem>
            <DemoBox label="Regular Item" color="secondary" />
          </FlexItem>
          <FlexItem 
            alignSelf={{
              base: 'center',
              md: 'start',
              lg: 'end'
            }}
          >
            <DemoBox label="Responsive Align" color="success" />
          </FlexItem>
        </Flex>
        <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Resize the window to see responsive behavior</p>
      </div>
    </div>
  )),
};

// Complex Layout Example
export const ComplexLayout: Story = {
  render: component$(() => (
    <Box backgroundColor="surface-alt" padding="md" borderRadius="md">
      <Flex direction="column" gap="md">
        <Box padding="md" backgroundColor="surface" borderRadius="md">
          <h3 class="text-lg font-semibold">Header</h3>
        </Box>
        
        <Flex direction={{ base: 'column', md: 'row' }} gap="md">
          <FlexItem shrink={0} class="w-full md:w-64">
            <Box padding="md" backgroundColor="surface" borderRadius="md" class="h-full">
              <Flex direction="column" gap="md">
                <h4 class="font-medium">Sidebar</h4>
                <DemoBox label="Nav Item 1" />
                <DemoBox label="Nav Item 2" color="secondary" />
                <DemoBox label="Nav Item 3" color="success" />
              </Flex>
            </Box>
          </FlexItem>
          
          <FlexItem grow={1}>
            <Box padding="md" backgroundColor="surface" borderRadius="md">
              <Flex direction="column" gap="md">
                <h4 class="font-medium">Main Content</h4>
                <p>This is a complex layout example using Flex and FlexItem components.</p>
                
                <Flex direction="row" wrap="wrap" gap="md">
                  <DemoBox label="Card 1" color="info" />
                  <DemoBox label="Card 2" color="info" />
                  <DemoBox label="Card 3" color="info" />
                </Flex>
                
                <Flex direction="row" justify="between" align="center" gap="md">
                  <DemoBox label="Footer Item 1" color="warning" />
                  <FlexItem grow={1}>
                    <Box backgroundColor="muted" padding="md" borderRadius="md" class="text-center">
                      Flexible Space
                    </Box>
                  </FlexItem>
                  <DemoBox label="Footer Item 2" color="warning" />
                </Flex>
              </Flex>
            </Box>
          </FlexItem>
        </Flex>
        
        <Box padding="md" backgroundColor="surface" borderRadius="md">
          <h3 class="text-lg font-semibold">Footer</h3>
        </Box>
      </Flex>
    </Box>
  )),
};
