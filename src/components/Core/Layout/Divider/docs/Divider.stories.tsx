import { component$ } from '@builder.io/qwik';
import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Divider } from './index';

const meta: Meta<typeof Divider> = {
  title: 'Core/Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    thickness: { control: 'select', options: ['thin', 'medium', 'thick'] },
    variant: { control: 'select', options: ['solid', 'dashed', 'dotted'] },
    color: { control: 'select', options: ['default', 'primary', 'secondary', 'muted'] },
    labelPosition: { control: 'select', options: ['start', 'center', 'end'] },
    spacing: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'] },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

interface DividerStoryArgs {
  orientation?: 'horizontal' | 'vertical';
  thickness?: 'thin' | 'medium' | 'thick';
  variant?: 'solid' | 'dashed' | 'dotted';
  color?: 'default' | 'primary' | 'secondary' | 'muted';
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

// Basic Horizontal Divider
export const Basic: Story = {
  args: {
    orientation: 'horizontal',
    thickness: 'thin',
    variant: 'solid',
    color: 'default',
    spacing: 'md',
  },
  render: (args: DividerStoryArgs) => (
    <div>
      <p class="mb-4">Content above the divider</p>
      <Divider 
        orientation={args.orientation} 
        thickness={args.thickness} 
        variant={args.variant} 
        color={args.color} 
        spacing={args.spacing}
      />
      <p class="mt-4">Content below the divider</p>
    </div>
  ),
};

// Vertical Divider
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    thickness: 'thin',
    variant: 'solid',
    color: 'default',
    spacing: 'md',
  },
  render: (args: DividerStoryArgs) => (
    <div class="flex items-center h-32">
      <p>Left content</p>
      <Divider 
        orientation={args.orientation} 
        thickness={args.thickness} 
        variant={args.variant} 
        color={args.color} 
        spacing={args.spacing}
      />
      <p class="ml-4">Right content</p>
    </div>
  ),
};

// Thickness Variants
export const ThicknessVariants: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Thin (Default)</h3>
        <Divider thickness="thin" />
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Medium</h3>
        <Divider thickness="medium" />
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Thick</h3>
        <Divider thickness="thick" />
      </div>
    </div>
  )),
};

// Style Variants
export const StyleVariants: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Solid (Default)</h3>
        <Divider variant="solid" />
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Dashed</h3>
        <Divider variant="dashed" />
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Dotted</h3>
        <Divider variant="dotted" />
      </div>
    </div>
  )),
};

// Color Variants
export const ColorVariants: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Default</h3>
        <Divider color="default" />
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Primary</h3>
        <Divider color="primary" />
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Secondary</h3>
        <Divider color="secondary" />
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Muted</h3>
        <Divider color="muted" />
      </div>
    </div>
  )),
};

// With Label
export const WithLabel: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">With Label (Center)</h3>
        <Divider label="OR" labelPosition="center" />
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">With Label (Start)</h3>
        <Divider label="Start" labelPosition="start" />
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">With Label (End)</h3>
        <Divider label="End" labelPosition="end" />
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">With Label and Color</h3>
        <Divider label="Section Divider" color="primary" thickness="medium" />
      </div>
    </div>
  )),
};

// In Context
export const InContext: Story = {
  render: component$(() => (
    <div class="p-6 bg-gray-100 dark:bg-gray-800 rounded-md">
      <h2 class="text-xl font-bold">First Section</h2>
      <p class="my-3">This is content for the first section of the example. The divider below separates this from the next section.</p>
      
      <Divider spacing="lg" />
      
      <h2 class="text-xl font-bold mt-4">Second Section</h2>
      <p class="my-3">This is content for the second section. Here we're showing the divider in a real-world context.</p>
      
      <Divider label="Comments" labelPosition="center" color="primary" spacing="lg" />
      
      <div class="mt-4 space-y-3">
        <div class="p-4 bg-white dark:bg-gray-700 rounded-md">
          <h3 class="font-medium">User Comment</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">This is a sample user comment.</p>
        </div>
        
        <div class="p-4 bg-white dark:bg-gray-700 rounded-md">
          <h3 class="font-medium">Another Comment</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">This is another sample comment.</p>
        </div>
      </div>
    </div>
  )),
};
