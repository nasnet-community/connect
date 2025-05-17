import { component$ } from '@builder.io/qwik';
import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Spacer } from './index';

const meta: Meta<typeof Spacer> = {
  title: 'Core/Layout/Spacer',
  component: Spacer,
  tags: ['autodocs'],
  argTypes: {
    size: { 
      control: 'select', 
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] 
    },
    isFlexible: { control: 'boolean' },
    horizontal: { control: 'boolean' },
    vertical: { control: 'boolean' },
    hideOnMobile: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Spacer>;

interface SpacerStoryArgs {
  size?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  isFlexible?: boolean;
  horizontal?: boolean;
  vertical?: boolean;
  hideOnMobile?: boolean;
}

// Basic Vertical Spacer
export const VerticalSpacer: Story = {
  args: {
    size: 'md',
    vertical: true,
  },
  render: (args: SpacerStoryArgs) => (
    <div>
      <div class="py-2 px-4 bg-primary text-white rounded">Content before spacer</div>
      <Spacer 
        size={args.size} 
        vertical={args.vertical}
        isFlexible={args.isFlexible}
        hideOnMobile={args.hideOnMobile}
      />
      <div class="py-2 px-4 bg-secondary text-white rounded">Content after spacer</div>
    </div>
  ),
};

// Horizontal Spacer
export const HorizontalSpacer: Story = {
  args: {
    size: 'md',
    horizontal: true,
  },
  render: (args: SpacerStoryArgs) => (
    <div class="flex flex-row items-center">
      <div class="py-2 px-4 bg-primary text-white rounded">Left content</div>
      <Spacer 
        size={args.size} 
        horizontal={args.horizontal}
        isFlexible={args.isFlexible}
        hideOnMobile={args.hideOnMobile}
      />
      <div class="py-2 px-4 bg-secondary text-white rounded">Right content</div>
    </div>
  ),
};

// Spacer Size Variants
export const SizeVariants: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Extra Small (xs)</h3>
        <div class="flex flex-row items-center">
          <div class="py-2 px-4 bg-primary text-white rounded">Content</div>
          <Spacer size="xs" horizontal />
          <div class="py-2 px-4 bg-secondary text-white rounded">Content</div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Small (sm)</h3>
        <div class="flex flex-row items-center">
          <div class="py-2 px-4 bg-primary text-white rounded">Content</div>
          <Spacer size="sm" horizontal />
          <div class="py-2 px-4 bg-secondary text-white rounded">Content</div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Medium (md) - Default</h3>
        <div class="flex flex-row items-center">
          <div class="py-2 px-4 bg-primary text-white rounded">Content</div>
          <Spacer size="md" horizontal />
          <div class="py-2 px-4 bg-secondary text-white rounded">Content</div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Large (lg)</h3>
        <div class="flex flex-row items-center">
          <div class="py-2 px-4 bg-primary text-white rounded">Content</div>
          <Spacer size="lg" horizontal />
          <div class="py-2 px-4 bg-secondary text-white rounded">Content</div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Extra Large (xl)</h3>
        <div class="flex flex-row items-center">
          <div class="py-2 px-4 bg-primary text-white rounded">Content</div>
          <Spacer size="xl" horizontal />
          <div class="py-2 px-4 bg-secondary text-white rounded">Content</div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">2XL</h3>
        <div class="flex flex-row items-center">
          <div class="py-2 px-4 bg-primary text-white rounded">Content</div>
          <Spacer size="2xl" horizontal />
          <div class="py-2 px-4 bg-secondary text-white rounded">Content</div>
        </div>
      </div>
    </div>
  )),
};

// Responsive Spacer
export const ResponsiveSpacer: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Responsive Size (sm on mobile, lg on desktop)</h3>
        <div class="flex flex-row items-center">
          <div class="py-2 px-4 bg-primary text-white rounded">Content</div>
          <Spacer 
            size={{
              base: 'sm',
              md: 'lg'
            }} 
            horizontal 
          />
          <div class="py-2 px-4 bg-secondary text-white rounded">Content</div>
        </div>
        <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Resize the window to see the spacer change size</p>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-2">Hide on Mobile</h3>
        <div class="flex flex-row items-center">
          <div class="py-2 px-4 bg-primary text-white rounded">Content</div>
          <Spacer size="lg" horizontal hideOnMobile />
          <div class="py-2 px-4 bg-secondary text-white rounded">Content</div>
        </div>
        <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Spacer will disappear on mobile screens</p>
      </div>
    </div>
  )),
};

// Flexible Spacer
export const FlexibleSpacer: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Flexible Spacer (Pushes Content Apart)</h3>
        <div class="flex flex-row items-center w-full border border-gray-300 dark:border-gray-700 rounded p-2">
          <div class="py-2 px-4 bg-primary text-white rounded">Left Content</div>
          <Spacer horizontal isFlexible />
          <div class="py-2 px-4 bg-secondary text-white rounded">Right Content</div>
        </div>
        <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">The flexible spacer grows to push content to opposite sides</p>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Multiple Flexible Spacers</h3>
        <div class="flex flex-row items-center w-full border border-gray-300 dark:border-gray-700 rounded p-2">
          <div class="py-2 px-4 bg-primary text-white rounded">Left</div>
          <Spacer horizontal size="md" />
          <div class="py-2 px-4 bg-info text-white rounded">Middle Left</div>
          <Spacer horizontal isFlexible />
          <div class="py-2 px-4 bg-success text-white rounded">Middle Right</div>
          <Spacer horizontal size="md" />
          <div class="py-2 px-4 bg-secondary text-white rounded">Right</div>
        </div>
        <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Fixed and flexible spacers can be combined</p>
      </div>
    </div>
  )),
};

// Spacer in Layout Context
export const SpacerInContext: Story = {
  render: component$(() => (
    <div class="p-6 bg-gray-100 dark:bg-gray-800 rounded-md">
      <h2 class="text-xl font-bold">Form Example</h2>
      <Spacer size="lg" />
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Username</label>
          <input type="text" class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded" placeholder="Enter username" />
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input type="email" class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded" placeholder="Enter email" />
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <input type="password" class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded" placeholder="Enter password" />
        </div>
      </div>
      
      <Spacer size="xl" />
      
      <div class="flex items-center">
        <button class="px-4 py-2 bg-primary text-white rounded">Submit</button>
        <Spacer size="md" horizontal />
        <button class="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded">Cancel</button>
        <Spacer horizontal isFlexible />
        <a href="#" class="text-primary">Need help?</a>
      </div>
    </div>
  )),
};
