import { component$ } from '@builder.io/qwik';
import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Stack } from './index';
import { Box } from '../Box';

const meta: Meta<typeof Stack> = {
  title: 'Core/Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['row', 'column'] },
    spacing: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] },
    justify: { control: 'select', options: ['start', 'center', 'end', 'between', 'around', 'evenly'] },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch', 'baseline'] },
    wrap: { control: 'select', options: ['nowrap', 'wrap', 'wrap-reverse'] },
    dividers: { control: 'boolean' },
    dividerColor: { control: 'select', options: ['default', 'primary', 'secondary', 'muted'] },
    reverse: { control: 'boolean' },
    supportRtl: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

// Create a sample box for stacking examples
const BoxItem = component$<{ bg?: string; label: string }>(({ bg = "primary", label }) => (
  <Box
    padding="md"
    backgroundColor={bg as any}
    borderRadius="md"
    class="text-white text-center font-medium w-20 h-20 flex items-center justify-center"
  >
    {label}
  </Box>
));

// Basic Stack (Vertical)
export const BasicVertical: Story = {
  args: {
    direction: 'column',
    spacing: 'md',
  },
  render: component$(() => (
    <Stack direction="column" spacing="md">
      <BoxItem bg="primary" label="Item 1" />
      <BoxItem bg="secondary" label="Item 2" />
      <BoxItem bg="success" label="Item 3" />
      <BoxItem bg="info" label="Item 4" />
    </Stack>
  )),
};

// Basic Stack (Horizontal)
export const BasicHorizontal: Story = {
  args: {
    direction: 'row',
    spacing: 'md',
  },
  render: component$(() => (
    <Stack direction="row" spacing="md">
      <BoxItem bg="primary" label="Item 1" />
      <BoxItem bg="secondary" label="Item 2" />
      <BoxItem bg="success" label="Item 3" />
      <BoxItem bg="info" label="Item 4" />
    </Stack>
  )),
};

// Spacing Examples
export const SpacingExamples: Story = {
  render: component$(() => (
    <div class="space-y-10">
      <div>
        <h3 class="text-lg font-semibold mb-2">Extra Small Spacing (xs)</h3>
        <Stack direction="row" spacing="xs">
          <BoxItem bg="primary" label="Item 1" />
          <BoxItem bg="secondary" label="Item 2" />
          <BoxItem bg="success" label="Item 3" />
        </Stack>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Small Spacing (sm)</h3>
        <Stack direction="row" spacing="sm">
          <BoxItem bg="primary" label="Item 1" />
          <BoxItem bg="secondary" label="Item 2" />
          <BoxItem bg="success" label="Item 3" />
        </Stack>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Medium Spacing (md)</h3>
        <Stack direction="row" spacing="md">
          <BoxItem bg="primary" label="Item 1" />
          <BoxItem bg="secondary" label="Item 2" />
          <BoxItem bg="success" label="Item 3" />
        </Stack>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Large Spacing (lg)</h3>
        <Stack direction="row" spacing="lg">
          <BoxItem bg="primary" label="Item 1" />
          <BoxItem bg="secondary" label="Item 2" />
          <BoxItem bg="success" label="Item 3" />
        </Stack>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Extra Large Spacing (xl)</h3>
        <Stack direction="row" spacing="xl">
          <BoxItem bg="primary" label="Item 1" />
          <BoxItem bg="secondary" label="Item 2" />
          <BoxItem bg="success" label="Item 3" />
        </Stack>
      </div>
    </div>
  )),
};

// Alignment Examples
export const AlignmentExamples: Story = {
  render: component$(() => (
    <div class="space-y-12">
      <div>
        <h3 class="text-lg font-semibold mb-2">Justify: Start (default)</h3>
        <Box backgroundColor="surface-alt" padding="md" borderRadius="md" class="h-32">
          <Stack direction="row" spacing="md" justify="start">
            <BoxItem bg="primary" label="Item 1" />
            <BoxItem bg="secondary" label="Item 2" />
            <BoxItem bg="success" label="Item 3" />
          </Stack>
        </Box>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Justify: Center</h3>
        <Box backgroundColor="surface-alt" padding="md" borderRadius="md" class="h-32">
          <Stack direction="row" spacing="md" justify="center">
            <BoxItem bg="primary" label="Item 1" />
            <BoxItem bg="secondary" label="Item 2" />
            <BoxItem bg="success" label="Item 3" />
          </Stack>
        </Box>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Justify: End</h3>
        <Box backgroundColor="surface-alt" padding="md" borderRadius="md" class="h-32">
          <Stack direction="row" spacing="md" justify="end">
            <BoxItem bg="primary" label="Item 1" />
            <BoxItem bg="secondary" label="Item 2" />
            <BoxItem bg="success" label="Item 3" />
          </Stack>
        </Box>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Justify: Between</h3>
        <Box backgroundColor="surface-alt" padding="md" borderRadius="md" class="h-32">
          <Stack direction="row" spacing="md" justify="between">
            <BoxItem bg="primary" label="Item 1" />
            <BoxItem bg="secondary" label="Item 2" />
            <BoxItem bg="success" label="Item 3" />
          </Stack>
        </Box>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Align: Center</h3>
        <Box backgroundColor="surface-alt" padding="md" borderRadius="md" class="h-32">
          <Stack direction="row" spacing="md" align="center">
            <BoxItem bg="primary" label="Item 1" />
            <BoxItem bg="secondary" label="Item 2" />
            <BoxItem bg="success" label="Item 3" />
          </Stack>
        </Box>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Align: End</h3>
        <Box backgroundColor="surface-alt" padding="md" borderRadius="md" class="h-32">
          <Stack direction="row" spacing="md" align="end">
            <BoxItem bg="primary" label="Item 1" />
            <BoxItem bg="secondary" label="Item 2" />
            <BoxItem bg="success" label="Item 3" />
          </Stack>
        </Box>
      </div>
    </div>
  )),
};

// Direction Change on Breakpoints
export const ResponsiveDirection: Story = {
  render: component$(() => (
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold mb-2">Responsive Direction (Column on mobile, Row on larger screens)</h3>
        <Box backgroundColor="surface-alt" padding="md" borderRadius="md">
          <Stack 
            direction={{
              base: 'column',
              md: 'row'
            }} 
            spacing="md"
          >
            <BoxItem bg="primary" label="Item 1" />
            <BoxItem bg="secondary" label="Item 2" />
            <BoxItem bg="success" label="Item 3" />
            <BoxItem bg="info" label="Item 4" />
          </Stack>
        </Box>
        <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Resize the window to see the direction change</p>
      </div>
    </div>
  )),
};

// Wrapping
export const WrappingStack: Story = {
  args: {
    direction: 'row',
    wrap: 'wrap',
    spacing: 'md',
  },
  render: component$(() => (
    <Box backgroundColor="surface-alt" padding="md" borderRadius="md" class="max-w-md">
      <Stack direction="row" wrap="wrap" spacing="md">
        <BoxItem bg="primary" label="Item 1" />
        <BoxItem bg="secondary" label="Item 2" />
        <BoxItem bg="success" label="Item 3" />
        <BoxItem bg="info" label="Item 4" />
        <BoxItem bg="warning" label="Item 5" />
        <BoxItem bg="error" label="Item 6" />
        <BoxItem bg="primary" label="Item 7" />
        <BoxItem bg="secondary" label="Item 8" />
      </Stack>
    </Box>
  )),
};

// With Dividers
export const WithDividers: Story = {
  render: component$(() => (
    <div class="space-y-10">
      <div>
        <h3 class="text-lg font-semibold mb-2">Vertical Stack with Dividers</h3>
        <Box backgroundColor="surface-alt" padding="md" borderRadius="md">
          <Stack direction="column" spacing="md" dividers dividerColor="muted">
            <BoxItem bg="primary" label="Item 1" />
            <BoxItem bg="secondary" label="Item 2" />
            <BoxItem bg="success" label="Item 3" />
            <BoxItem bg="info" label="Item 4" />
          </Stack>
        </Box>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Horizontal Stack with Dividers</h3>
        <Box backgroundColor="surface-alt" padding="md" borderRadius="md">
          <Stack direction="row" spacing="md" dividers dividerColor="primary">
            <BoxItem bg="primary" label="Item 1" />
            <BoxItem bg="secondary" label="Item 2" />
            <BoxItem bg="success" label="Item 3" />
            <BoxItem bg="info" label="Item 4" />
          </Stack>
        </Box>
      </div>
    </div>
  )),
};

// Reverse Order
export const ReverseOrder: Story = {
  render: component$(() => (
    <div class="space-y-10">
      <div>
        <h3 class="text-lg font-semibold mb-2">Normal Order</h3>
        <Stack direction="row" spacing="md">
          <BoxItem bg="primary" label="Item 1" />
          <BoxItem bg="secondary" label="Item 2" />
          <BoxItem bg="success" label="Item 3" />
          <BoxItem bg="info" label="Item 4" />
        </Stack>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Reverse Order</h3>
        <Stack direction="row" spacing="md" reverse>
          <BoxItem bg="primary" label="Item 1" />
          <BoxItem bg="secondary" label="Item 2" />
          <BoxItem bg="success" label="Item 3" />
          <BoxItem bg="info" label="Item 4" />
        </Stack>
      </div>
    </div>
  )),
};

// Nested Stacks
export const NestedStacks: Story = {
  render: component$(() => (
    <Box backgroundColor="surface-alt" padding="md" borderRadius="md">
      <Stack direction="column" spacing="lg">
        <Box padding="md" backgroundColor="surface" borderRadius="md">
          <h3 class="text-lg font-semibold mb-2">Header</h3>
        </Box>
        
        <Stack direction="row" spacing="md">
          <Box padding="md" backgroundColor="surface" borderRadius="md" class="w-64">
            <Stack direction="column" spacing="md">
              <Box padding="sm" backgroundColor="primary" borderRadius="md" class="text-white">
                Sidebar Item 1
              </Box>
              <Box padding="sm" backgroundColor="primary" borderRadius="md" class="text-white">
                Sidebar Item 2
              </Box>
              <Box padding="sm" backgroundColor="primary" borderRadius="md" class="text-white">
                Sidebar Item 3
              </Box>
            </Stack>
          </Box>
          
          <Box padding="md" backgroundColor="surface" borderRadius="md" class="flex-1">
            <Stack direction="column" spacing="md">
              <Box padding="md" backgroundColor="secondary" borderRadius="md" class="text-white">
                Main Content Area
              </Box>
              
              <Stack direction="row" spacing="sm" wrap="wrap">
                <Box padding="sm" backgroundColor="info" borderRadius="md" class="text-white">
                  Card 1
                </Box>
                <Box padding="sm" backgroundColor="info" borderRadius="md" class="text-white">
                  Card 2
                </Box>
                <Box padding="sm" backgroundColor="info" borderRadius="md" class="text-white">
                  Card 3
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Stack>
        
        <Box padding="md" backgroundColor="surface" borderRadius="md">
          <h3 class="text-lg font-semibold">Footer</h3>
        </Box>
      </Stack>
    </Box>
  )),
};
