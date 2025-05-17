import { component$ } from '@builder.io/qwik';
import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Breadcrumbs } from './index';
import { BreadcrumbItem, BreadcrumbsProps } from './Breadcrumbs.types';

// Import an icon for the home example
import { HiHomeOutline } from '@qwikest/icons/heroicons';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Core/Navigation/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  argTypes: {
    separator: { 
      control: 'select', 
      options: ['/', '>', '-', '•', '|']
    },
    maxItems: { control: 'number' },
    expanderLabel: { control: 'text' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

// Sample breadcrumb items
const sampleItems: BreadcrumbItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Products',
    href: '/products',
  },
  {
    label: 'Networking',
    href: '/products/networking',
  },
  {
    label: 'Routers',
    href: '/products/networking/routers',
  },
  {
    label: 'MikroTik',
    isCurrent: true,
  },
];

// Basic breadcrumbs
export const Basic: Story = {
  args: {
    items: sampleItems,
    separator: '/',
  },
  render: (args: BreadcrumbsProps) => (
    <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded">
      <Breadcrumbs 
        items={args.items} 
        separator={args.separator}
        maxItems={args.maxItems}
        expanderLabel={args.expanderLabel}
        label={args.label}
      />
    </div>
  ),
};

// Different separators
export const SeparatorVariants: Story = {
  render: component$(() => (
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold mb-2">Slash Separator (Default)</h3>
        <Breadcrumbs items={sampleItems} separator="/" />
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Chevron Separator</h3>
        <Breadcrumbs items={sampleItems} separator=">" />
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Dash Separator</h3>
        <Breadcrumbs items={sampleItems} separator="-" />
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Bullet Separator</h3>
        <Breadcrumbs items={sampleItems} separator="•" />
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Pipe Separator</h3>
        <Breadcrumbs items={sampleItems} separator="|" />
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Custom JSX Separator</h3>
        <Breadcrumbs 
          items={sampleItems} 
          separator={<span class="text-primary">→</span>} 
        />
      </div>
    </div>
  )),
};

// With home icon
export const WithIcon: Story = {
  render: component$(() => {
    const itemsWithIcon = [
      {
        label: 'Home',
        href: '/',
        icon: <HiHomeOutline class="w-4 h-4" />,
      },
      ...sampleItems.slice(1),
    ];

    return (
      <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded">
        <Breadcrumbs items={itemsWithIcon} />
      </div>
    );
  }),
};

// Collapsed breadcrumbs (for responsive views)
export const Collapsed: Story = {
  args: {
    items: sampleItems,
    maxItems: 3,
    expanderLabel: '...',
  },
  render: (args: BreadcrumbsProps) => (
    <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded max-w-xs">
      <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
        Breadcrumbs will collapse on narrow screens. In this story,
        we're forcing collapsed mode by setting maxItems={args.maxItems}.
      </p>
      <Breadcrumbs 
        items={args.items} 
        maxItems={args.maxItems}
        expanderLabel={args.expanderLabel}
      />
    </div>
  ),
};

// Different depth levels
export const DifferentDepths: Story = {
  render: component$(() => (
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold mb-2">Depth 2</h3>
        <Breadcrumbs items={sampleItems.slice(0, 2)} />
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Depth 3</h3>
        <Breadcrumbs items={sampleItems.slice(0, 3)} />
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Depth 4</h3>
        <Breadcrumbs items={sampleItems.slice(0, 4)} />
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Depth 5</h3>
        <Breadcrumbs items={sampleItems} />
      </div>
    </div>
  )),
};

// RTL Support (for Arabic and other right-to-left languages)
export const RTLSupport: Story = {
  render: component$(() => {
    // In a real app, this would be set automatically based on the language
    return (
      <div dir="rtl" class="p-4 bg-gray-50 dark:bg-gray-800 rounded">
        <p class="mb-2 text-sm text-right">RTL breadcrumbs (for Arabic, Hebrew, etc.)</p>
        <Breadcrumbs items={sampleItems} />
      </div>
    );
  }),
};

// In context
export const InContext: Story = {
  render: component$(() => (
    <div class="p-6 bg-white dark:bg-gray-800 rounded-md shadow">
      <Breadcrumbs items={sampleItems} />
      
      <div class="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-md">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">MikroTik Routers</h1>
        <p class="text-gray-700 dark:text-gray-300">
          MikroTik manufactures routers, switches and wireless systems for every purpose,
          from small office or home, to carrier ISP networks, there is a device for every purpose.
        </p>
      </div>
    </div>
  )),
};
