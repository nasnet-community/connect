import { component$ } from '@builder.io/qwik';
import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Container } from './index';
import { Box } from '../Box';

const meta: Meta<typeof Container> = {
  title: 'Core/Layout/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    maxWidth: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full', 'fluid'] },
    centered: { control: 'boolean' },
    paddingX: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'] },
    paddingY: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'] },
    fixedWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

// Basic Container
export const Basic: Story = {
  args: {
    maxWidth: 'lg',
    centered: true,
    paddingX: 'md',
  },
  render: component$(() => (
    <Container maxWidth="lg" paddingX="md">
      <Box 
        backgroundColor="surface-alt" 
        padding="md" 
        borderRadius="md"
        class="min-h-24 flex items-center justify-center"
      >
        <p class="text-center">This is a basic container with "lg" max width</p>
      </Box>
    </Container>
  )),
};

// Container Size Examples
export const ContainerSizes: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Extra Small (xs)</h3>
        <Container maxWidth="xs" paddingX="md">
          <Box 
            backgroundColor="primary" 
            padding="md" 
            borderRadius="md"
            class="text-white text-center font-medium"
          >
            max-width: 20rem (320px)
          </Box>
        </Container>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Small (sm)</h3>
        <Container maxWidth="sm" paddingX="md">
          <Box 
            backgroundColor="secondary" 
            padding="md" 
            borderRadius="md"
            class="text-white text-center font-medium"
          >
            max-width: 24rem (384px)
          </Box>
        </Container>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Medium (md)</h3>
        <Container maxWidth="md" paddingX="md">
          <Box 
            backgroundColor="success" 
            padding="md" 
            borderRadius="md"
            class="text-white text-center font-medium"
          >
            max-width: 28rem (448px)
          </Box>
        </Container>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Large (lg - Default)</h3>
        <Container maxWidth="lg" paddingX="md">
          <Box 
            backgroundColor="info" 
            padding="md" 
            borderRadius="md"
            class="text-white text-center font-medium"
          >
            max-width: 32rem (512px)
          </Box>
        </Container>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Extra Large (xl)</h3>
        <Container maxWidth="xl" paddingX="md">
          <Box 
            backgroundColor="warning" 
            padding="md" 
            borderRadius="md"
            class="text-white text-center font-medium"
          >
            max-width: 36rem (576px)
          </Box>
        </Container>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">2X Large (2xl)</h3>
        <Container maxWidth="2xl" paddingX="md">
          <Box 
            backgroundColor="error" 
            padding="md" 
            borderRadius="md"
            class="text-white text-center font-medium"
          >
            max-width: 42rem (672px)
          </Box>
        </Container>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Full Width</h3>
        <Container maxWidth="full" paddingX="md">
          <Box 
            backgroundColor="primary" 
            padding="md" 
            borderRadius="md"
            class="text-white text-center font-medium"
          >
            max-width: 100%
          </Box>
        </Container>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Fluid (No Max Width)</h3>
        <Container maxWidth="fluid" paddingX="md">
          <Box 
            backgroundColor="secondary" 
            padding="md" 
            borderRadius="md"
            class="text-white text-center font-medium"
          >
            No max-width constraint
          </Box>
        </Container>
      </div>
    </div>
  )),
};

// Fixed Width vs Responsive Example
export const FixedVsResponsive: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Responsive Container (Default)</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Container is fluid on small screens, then has a max-width at the breakpoint and up
        </p>
        <Container maxWidth="lg" paddingX="md">
          <Box 
            backgroundColor="primary" 
            padding="md" 
            borderRadius="md"
            class="text-white text-center font-medium"
          >
            Fluid on small screens, max-width on lg and up
          </Box>
        </Container>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Fixed Width Container</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Container has the same max-width at all screen sizes
        </p>
        <Container maxWidth="lg" paddingX="md" fixedWidth>
          <Box 
            backgroundColor="secondary" 
            padding="md" 
            borderRadius="md"
            class="text-white text-center font-medium"
          >
            Fixed max-width on all screen sizes
          </Box>
        </Container>
      </div>
    </div>
  )),
};

// Padding Examples
export const PaddingExamples: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Horizontal Padding (paddingX)</h3>
        <div class="space-y-4">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">None</p>
            <Container maxWidth="full" paddingX="none" class="bg-gray-200 dark:bg-gray-700">
              <Box 
                backgroundColor="primary" 
                padding="md" 
                borderRadius="md"
                class="text-white text-center font-medium"
              >
                No horizontal padding
              </Box>
            </Container>
          </div>
          
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Small (sm)</p>
            <Container maxWidth="full" paddingX="sm" class="bg-gray-200 dark:bg-gray-700">
              <Box 
                backgroundColor="secondary" 
                padding="md" 
                borderRadius="md"
                class="text-white text-center font-medium"
              >
                Small horizontal padding
              </Box>
            </Container>
          </div>
          
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Medium (md - Default)</p>
            <Container maxWidth="full" paddingX="md" class="bg-gray-200 dark:bg-gray-700">
              <Box 
                backgroundColor="success" 
                padding="md" 
                borderRadius="md"
                class="text-white text-center font-medium"
              >
                Medium horizontal padding
              </Box>
            </Container>
          </div>
          
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Large (lg)</p>
            <Container maxWidth="full" paddingX="lg" class="bg-gray-200 dark:bg-gray-700">
              <Box 
                backgroundColor="info" 
                padding="md" 
                borderRadius="md"
                class="text-white text-center font-medium"
              >
                Large horizontal padding
              </Box>
            </Container>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Vertical Padding (paddingY)</h3>
        <div class="space-y-4">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">None (Default)</p>
            <Container maxWidth="full" paddingX="md" paddingY="none" class="bg-gray-200 dark:bg-gray-700">
              <Box 
                backgroundColor="primary" 
                padding="md" 
                borderRadius="md"
                class="text-white text-center font-medium"
              >
                No vertical padding
              </Box>
            </Container>
          </div>
          
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Small (sm)</p>
            <Container maxWidth="full" paddingX="md" paddingY="sm" class="bg-gray-200 dark:bg-gray-700">
              <Box 
                backgroundColor="secondary" 
                padding="md" 
                borderRadius="md"
                class="text-white text-center font-medium"
              >
                Small vertical padding
              </Box>
            </Container>
          </div>
          
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Medium (md)</p>
            <Container maxWidth="full" paddingX="md" paddingY="md" class="bg-gray-200 dark:bg-gray-700">
              <Box 
                backgroundColor="success" 
                padding="md" 
                borderRadius="md"
                class="text-white text-center font-medium"
              >
                Medium vertical padding
              </Box>
            </Container>
          </div>
          
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Large (lg)</p>
            <Container maxWidth="full" paddingX="md" paddingY="lg" class="bg-gray-200 dark:bg-gray-700">
              <Box 
                backgroundColor="info" 
                padding="md" 
                borderRadius="md"
                class="text-white text-center font-medium"
              >
                Large vertical padding
              </Box>
            </Container>
          </div>
        </div>
      </div>
    </div>
  )),
};

// Centering Example
export const CenteringExamples: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Centered Container (Default)</h3>
        <div class="w-full bg-gray-200 dark:bg-gray-700">
          <Container maxWidth="md" paddingX="md" centered>
            <Box 
              backgroundColor="primary" 
              padding="md" 
              borderRadius="md"
              class="text-white text-center font-medium"
            >
              Centered within parent
            </Box>
          </Container>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Not Centered Container</h3>
        <div class="w-full bg-gray-200 dark:bg-gray-700">
          <Container maxWidth="md" paddingX="md" centered={false}>
            <Box 
              backgroundColor="secondary" 
              padding="md" 
              borderRadius="md"
              class="text-white text-center font-medium"
            >
              Aligned to the left
            </Box>
          </Container>
        </div>
      </div>
    </div>
  )),
};

// Nested Containers Example
export const NestedContainers: Story = {
  render: component$(() => (
    <Container maxWidth="xl" paddingX="md" class="bg-gray-100 dark:bg-gray-800">
      <Box padding="lg" backgroundColor="surface" borderRadius="md">
        <h3 class="text-lg font-semibold mb-4">Main Container (XL)</h3>
        <p class="mb-4">This is a container with xl max-width.</p>
        
        <Container maxWidth="md" paddingX="md" paddingY="md" class="bg-gray-200 dark:bg-gray-700">
          <Box padding="md" backgroundColor="primary" borderRadius="md" class="text-white">
            <h4 class="font-medium mb-2">Nested Container (MD)</h4>
            <p>This is a nested container with md max-width.</p>
          </Box>
        </Container>
      </Box>
    </Container>
  )),
};

// Page Layout Example
export const PageLayoutExample: Story = {
  render: component$(() => (
    <div class="space-y-4">
      <Box padding="md" backgroundColor="surface-alt" borderRadius="none" class="w-full">
        <Container maxWidth="xl" paddingX="md">
          <h3 class="text-lg font-semibold">Site Header</h3>
        </Container>
      </Box>
      
      <Container maxWidth="xl" paddingX="md" paddingY="md">
        <Box padding="lg" backgroundColor="surface" borderRadius="md">
          <h3 class="text-lg font-semibold mb-4">Main Content</h3>
          <p class="mb-4">This demonstrates a typical page layout with a Container.</p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Box padding="md" backgroundColor="primary" borderRadius="md" class="text-white">
              <h4 class="font-medium mb-2">Feature 1</h4>
              <p>Feature description goes here.</p>
            </Box>
            
            <Box padding="md" backgroundColor="secondary" borderRadius="md" class="text-white">
              <h4 class="font-medium mb-2">Feature 2</h4>
              <p>Feature description goes here.</p>
            </Box>
            
            <Box padding="md" backgroundColor="success" borderRadius="md" class="text-white">
              <h4 class="font-medium mb-2">Feature 3</h4>
              <p>Feature description goes here.</p>
            </Box>
          </div>
        </Box>
      </Container>
      
      <Box padding="md" backgroundColor="surface-alt" borderRadius="none" class="w-full">
        <Container maxWidth="xl" paddingX="md">
          <h3 class="text-lg font-semibold">Site Footer</h3>
        </Container>
      </Box>
    </div>
  )),
};
