import { $, component$, useSignal } from '@builder.io/qwik';
import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { Badge, BadgeGroup } from './index';
import { 
  CheckIcon, 
  InfoIcon, 
  WarningIcon, 
  ErrorIcon,
  PlusIcon,
  UserIcon
} from '~/components/Core/Iconography';

const meta: Meta<typeof Badge> = {
  title: 'Core/Data Display/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'outline'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'],
    },
    shape: {
      control: 'radio',
      options: ['square', 'rounded', 'pill'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/**
 * Basic usage of the Badge component.
 */
export const Basic: Story = {
  args: {
    children: 'Badge',
    variant: 'solid',
    size: 'md',
    color: 'default',
    shape: 'rounded',
  },
};

/**
 * Badge variants demonstration.
 */
export const Variants: Story = {
  render: component$(() => (
    <div class="flex flex-col gap-6">
      <div>
        <h3 class="text-lg font-medium mb-3">Solid Badges</h3>
        <div class="flex flex-wrap gap-3">
          <Badge variant="solid" color="default">Default</Badge>
          <Badge variant="solid" color="primary">Primary</Badge>
          <Badge variant="solid" color="secondary">Secondary</Badge>
          <Badge variant="solid" color="success">Success</Badge>
          <Badge variant="solid" color="warning">Warning</Badge>
          <Badge variant="solid" color="error">Error</Badge>
          <Badge variant="solid" color="info">Info</Badge>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-medium mb-3">Soft Badges</h3>
        <div class="flex flex-wrap gap-3">
          <Badge variant="soft" color="default">Default</Badge>
          <Badge variant="soft" color="primary">Primary</Badge>
          <Badge variant="soft" color="secondary">Secondary</Badge>
          <Badge variant="soft" color="success">Success</Badge>
          <Badge variant="soft" color="warning">Warning</Badge>
          <Badge variant="soft" color="error">Error</Badge>
          <Badge variant="soft" color="info">Info</Badge>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-medium mb-3">Outline Badges</h3>
        <div class="flex flex-wrap gap-3">
          <Badge variant="outline" color="default">Default</Badge>
          <Badge variant="outline" color="primary">Primary</Badge>
          <Badge variant="outline" color="secondary">Secondary</Badge>
          <Badge variant="outline" color="success">Success</Badge>
          <Badge variant="outline" color="warning">Warning</Badge>
          <Badge variant="outline" color="error">Error</Badge>
          <Badge variant="outline" color="info">Info</Badge>
        </div>
      </div>
    </div>
  )),
};

/**
 * Different badge sizes.
 */
export const Sizes: Story = {
  render: component$(() => (
    <div class="flex items-center gap-3">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  )),
};

/**
 * Badge shapes: square, rounded, and pill.
 */
export const Shapes: Story = {
  render: component$(() => (
    <div class="flex items-center gap-3">
      <Badge shape="square" color="primary">Square</Badge>
      <Badge shape="rounded" color="primary">Rounded</Badge>
      <Badge shape="pill" color="primary">Pill</Badge>
    </div>
  )),
};

/**
 * Interactive dismissible badges.
 */
export const Dismissible: Story = {
  render: component$(() => {
    const badges = useSignal([
      { id: 1, label: 'React', color: 'primary' },
      { id: 2, label: 'Vue', color: 'secondary' },
      { id: 3, label: 'Angular', color: 'warning' },
      { id: 4, label: 'Qwik', color: 'success' },
      { id: 5, label: 'Svelte', color: 'info' },
    ]);
    
    const removeBadge = $((id: number) => {
      badges.value = badges.value.filter(badge => badge.id !== id);
    });
    
    return (
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-medium mb-3">Dismissible Badges</h3>
          <div class="flex flex-wrap gap-2">
            {badges.value.map(badge => (
              <Badge 
                key={badge.id} 
                color={badge.color as any} 
                dismissible 
                onDismiss$={() => removeBadge(badge.id)}
              >
                {badge.label}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-medium mb-3">Dismissible with different variants</h3>
          <div class="flex flex-wrap gap-2">
            <Badge variant="solid" color="primary" dismissible>Solid</Badge>
            <Badge variant="soft" color="primary" dismissible>Soft</Badge>
            <Badge variant="outline" color="primary" dismissible>Outline</Badge>
          </div>
        </div>
      </div>
    );
  }),
};

/**
 * Badges with icons.
 */
export const WithIcons: Story = {
  render: component$(() => (
    <div class="flex flex-col gap-6">
      <div>
        <h3 class="text-lg font-medium mb-3">Start Icons</h3>
        <div class="flex flex-wrap gap-2">
          <Badge color="success" startIcon={<CheckIcon class="h-3 w-3" />}>Success</Badge>
          <Badge color="info" startIcon={<InfoIcon class="h-3 w-3" />}>Info</Badge>
          <Badge color="warning" startIcon={<WarningIcon class="h-3 w-3" />}>Warning</Badge>
          <Badge color="error" startIcon={<ErrorIcon class="h-3 w-3" />}>Error</Badge>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-medium mb-3">End Icons</h3>
        <div class="flex flex-wrap gap-2">
          <Badge color="primary" endIcon={<PlusIcon class="h-3 w-3" />}>Add</Badge>
          <Badge color="secondary" endIcon={<UserIcon class="h-3 w-3" />}>User</Badge>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-medium mb-3">Both Icons</h3>
        <div class="flex flex-wrap gap-2">
          <Badge 
            color="success" 
            startIcon={<CheckIcon class="h-3 w-3" />}
            endIcon={<InfoIcon class="h-3 w-3" />}
          >
            Verified
          </Badge>
        </div>
      </div>
    </div>
  )),
};

/**
 * Badges with dot indicators.
 */
export const WithDots: Story = {
  render: component$(() => (
    <div class="flex flex-col gap-6">
      <div>
        <h3 class="text-lg font-medium mb-3">Start Dot</h3>
        <div class="flex flex-wrap gap-2">
          <Badge dot dotPosition="start" color="success">Online</Badge>
          <Badge dot dotPosition="start" color="error">Offline</Badge>
          <Badge dot dotPosition="start" color="warning">Away</Badge>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-medium mb-3">End Dot</h3>
        <div class="flex flex-wrap gap-2">
          <Badge dot dotPosition="end" color="success">Online</Badge>
          <Badge dot dotPosition="end" color="error">Offline</Badge>
          <Badge dot dotPosition="end" color="warning">Away</Badge>
        </div>
      </div>
    </div>
  )),
};

/**
 * Badges with hover effects.
 */
export const Hoverable: Story = {
  render: component$(() => (
    <div class="flex flex-col gap-6">
      <div>
        <h3 class="text-lg font-medium mb-3">Hover Effects</h3>
        <div class="flex flex-wrap gap-2">
          <Badge hover variant="solid" color="primary">Solid</Badge>
          <Badge hover variant="soft" color="primary">Soft</Badge>
          <Badge hover variant="outline" color="primary">Outline</Badge>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-medium mb-3">Hoverable Links</h3>
        <div class="flex flex-wrap gap-2">
          <Badge hover href="#" color="primary">Primary Link</Badge>
          <Badge hover href="#" color="secondary">Secondary Link</Badge>
          <Badge hover href="#" color="info">Info Link</Badge>
        </div>
      </div>
    </div>
  )),
};

/**
 * Bordered badges for additional visual emphasis.
 */
export const Bordered: Story = {
  render: component$(() => (
    <div class="flex flex-col gap-6">
      <div>
        <h3 class="text-lg font-medium mb-3">Bordered Solid Badges</h3>
        <div class="flex flex-wrap gap-2">
          <Badge variant="solid" bordered color="primary">Primary</Badge>
          <Badge variant="solid" bordered color="secondary">Secondary</Badge>
          <Badge variant="solid" bordered color="success">Success</Badge>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-medium mb-3">Bordered Soft Badges</h3>
        <div class="flex flex-wrap gap-2">
          <Badge variant="soft" bordered color="primary">Primary</Badge>
          <Badge variant="soft" bordered color="secondary">Secondary</Badge>
          <Badge variant="soft" bordered color="success">Success</Badge>
        </div>
      </div>
    </div>
  )),
};

/**
 * Badges with truncation for long text.
 */
export const Truncated: Story = {
  render: component$(() => (
    <div class="space-y-3">
      <div class="w-32">
        <Badge truncate maxWidth="100%">This is a very long badge text that will be truncated</Badge>
      </div>
      <div class="w-48">
        <Badge truncate maxWidth="100%" color="primary">This is a very long badge text that will be truncated</Badge>
      </div>
      <div class="w-64">
        <Badge truncate maxWidth="100%" color="secondary">This is a very long badge text that will be truncated</Badge>
      </div>
    </div>
  )),
};

/**
 * Badge group for arranging multiple badges.
 */
export const BadgeGroups: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-medium mb-3">Default Badge Group</h3>
        <BadgeGroup>
          <Badge color="primary">React</Badge>
          <Badge color="secondary">Vue</Badge>
          <Badge color="success">Qwik</Badge>
          <Badge color="info">Angular</Badge>
          <Badge color="warning">Svelte</Badge>
        </BadgeGroup>
      </div>
      
      <div>
        <h3 class="text-lg font-medium mb-3">Different Spacing</h3>
        <div class="space-y-4">
          <div>
            <h4 class="text-sm font-medium mb-2">Small Spacing</h4>
            <BadgeGroup spacing="sm">
              <Badge variant="soft" color="primary">React</Badge>
              <Badge variant="soft" color="secondary">Vue</Badge>
              <Badge variant="soft" color="success">Qwik</Badge>
            </BadgeGroup>
          </div>
          
          <div>
            <h4 class="text-sm font-medium mb-2">Medium Spacing (Default)</h4>
            <BadgeGroup spacing="md">
              <Badge variant="soft" color="primary">React</Badge>
              <Badge variant="soft" color="secondary">Vue</Badge>
              <Badge variant="soft" color="success">Qwik</Badge>
            </BadgeGroup>
          </div>
          
          <div>
            <h4 class="text-sm font-medium mb-2">Large Spacing</h4>
            <BadgeGroup spacing="lg">
              <Badge variant="soft" color="primary">React</Badge>
              <Badge variant="soft" color="secondary">Vue</Badge>
              <Badge variant="soft" color="success">Qwik</Badge>
            </BadgeGroup>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-medium mb-3">Alignment</h3>
        <div class="space-y-4">
          <div>
            <h4 class="text-sm font-medium mb-2">Start Alignment (Default)</h4>
            <BadgeGroup align="start" class="w-full">
              <Badge variant="soft" color="primary">React</Badge>
              <Badge variant="soft" color="secondary">Vue</Badge>
              <Badge variant="soft" color="success">Qwik</Badge>
            </BadgeGroup>
          </div>
          
          <div>
            <h4 class="text-sm font-medium mb-2">Center Alignment</h4>
            <BadgeGroup align="center" class="w-full">
              <Badge variant="soft" color="primary">React</Badge>
              <Badge variant="soft" color="secondary">Vue</Badge>
              <Badge variant="soft" color="success">Qwik</Badge>
            </BadgeGroup>
          </div>
          
          <div>
            <h4 class="text-sm font-medium mb-2">End Alignment</h4>
            <BadgeGroup align="end" class="w-full">
              <Badge variant="soft" color="primary">React</Badge>
              <Badge variant="soft" color="secondary">Vue</Badge>
              <Badge variant="soft" color="success">Qwik</Badge>
            </BadgeGroup>
          </div>
        </div>
      </div>
    </div>
  )),
};

/**
 * Custom styled badges.
 */
export const CustomStyles: Story = {
  render: component$(() => (
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-medium mb-3">Custom Styled Badges</h3>
        <div class="flex flex-wrap gap-2">
          <Badge class="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none">
            Gradient
          </Badge>
          
          <Badge 
            class="bg-white text-gray-800 shadow-md hover:shadow-lg transition-shadow" 
            hover
          >
            Shadow
          </Badge>
          
          <Badge 
            shape="pill"
            class="bg-black text-white border border-gray-700"
          >
            Dark Mode
          </Badge>
          
          <Badge 
            class="bg-transparent border-2 border-dashed border-primary-500 text-primary-700"
          >
            Dashed
          </Badge>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-medium mb-3">Status Badges</h3>
        <div class="flex flex-wrap gap-2">
          <Badge 
            color="success" 
            shape="pill" 
            variant="soft" 
            dot 
            class="font-normal"
          >
            Available
          </Badge>
          
          <Badge 
            color="warning" 
            shape="pill" 
            variant="soft" 
            dot 
            class="font-normal"
          >
            Away
          </Badge>
          
          <Badge 
            color="error" 
            shape="pill" 
            variant="soft" 
            dot 
            class="font-normal"
          >
            Busy
          </Badge>
          
          <Badge 
            color="default" 
            shape="pill" 
            variant="soft" 
            dot 
            class="font-normal"
          >
            Offline
          </Badge>
        </div>
      </div>
    </div>
  )),
};
