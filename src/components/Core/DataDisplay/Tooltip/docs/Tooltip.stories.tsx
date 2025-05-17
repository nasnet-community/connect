import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { Tooltip } from '../Tooltip';
import type { TooltipProps } from '../Tooltip.types';
import { component$ } from '@builder.io/qwik';

export default {
  title: 'Core/DataDisplay/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tooltip component for displaying additional information on hover or focus'
      }
    }
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'Content of the tooltip',
    },
    placement: {
      control: 'select',
      options: [
        'top', 'top-start', 'top-end',
        'right', 'right-start', 'right-end',
        'bottom', 'bottom-start', 'bottom-end',
        'left', 'left-start', 'left-end'
      ],
      description: 'Placement of the tooltip relative to the trigger',
      defaultValue: 'top'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the tooltip',
      defaultValue: 'md'
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Color variant of the tooltip',
      defaultValue: 'default'
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'focus', 'manual'],
      description: 'Event that triggers the tooltip',
      defaultValue: 'hover'
    },
    delay: {
      control: 'number',
      description: 'Delay in milliseconds before showing the tooltip',
      defaultValue: 0
    },
    hideDelay: {
      control: 'number',
      description: 'Delay in milliseconds before hiding the tooltip',
      defaultValue: 0
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the tooltip is disabled',
      defaultValue: false
    },
    arrow: {
      control: 'boolean',
      description: 'Whether to show an arrow that points to the trigger element',
      defaultValue: true
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the tooltip should be interactive',
      defaultValue: false
    },
    maxWidth: {
      control: 'number',
      description: 'Maximum width for the tooltip in pixels',
      defaultValue: 300
    },
    offset: {
      control: 'number',
      description: 'Offset in pixels between the tooltip and the trigger element',
      defaultValue: 8
    }
  }
} satisfies Meta<TooltipProps>;

type Story = StoryObj<TooltipProps>;

// Basic Tooltip
export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    placement: 'top',
    size: 'md',
    color: 'default',
    trigger: 'hover',
    delay: 0,
    hideDelay: 0,
    disabled: false,
    arrow: true,
    interactive: false,
    maxWidth: 300,
    offset: 8
  },
  render: (args) => (
    <div class="p-8">
      <Tooltip {...args}>
        <button class="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Hover me
        </button>
      </Tooltip>
    </div>
  )
};

// Tooltip Placements
export const Placements = {
  render: () => (
    <div class="grid grid-cols-3 gap-6 p-16">
      <Tooltip content="Top placement" placement="top">
        <button class="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Top
        </button>
      </Tooltip>
      
      <Tooltip content="Top-start placement" placement="top-start">
        <button class="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Top-start
        </button>
      </Tooltip>
      
      <Tooltip content="Top-end placement" placement="top-end">
        <button class="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Top-end
        </button>
      </Tooltip>
      
      <Tooltip content="Right placement" placement="right">
        <button class="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Right
        </button>
      </Tooltip>
      
      <Tooltip content="Right-start placement" placement="right-start">
        <button class="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Right-start
        </button>
      </Tooltip>
      
      <Tooltip content="Right-end placement" placement="right-end">
        <button class="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Right-end
        </button>
      </Tooltip>
      
      <Tooltip content="Bottom placement" placement="bottom">
        <button class="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Bottom
        </button>
      </Tooltip>
      
      <Tooltip content="Bottom-start placement" placement="bottom-start">
        <button class="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Bottom-start
        </button>
      </Tooltip>
      
      <Tooltip content="Bottom-end placement" placement="bottom-end">
        <button class="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Bottom-end
        </button>
      </Tooltip>
      
      <Tooltip content="Left placement" placement="left">
        <button class="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Left
        </button>
      </Tooltip>
      
      <Tooltip content="Left-start placement" placement="left-start">
        <button class="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Left-start
        </button>
      </Tooltip>
      
      <Tooltip content="Left-end placement" placement="left-end">
        <button class="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Left-end
        </button>
      </Tooltip>
    </div>
  )
};

// Tooltip Sizes
export const Sizes = {
  render: () => (
    <div class="flex gap-4 items-center p-8">
      <Tooltip content="Small tooltip" size="sm">
        <button class="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Small
        </button>
      </Tooltip>
      
      <Tooltip content="Medium tooltip" size="md">
        <button class="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Medium
        </button>
      </Tooltip>
      
      <Tooltip content="Large tooltip" size="lg">
        <button class="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Large
        </button>
      </Tooltip>
    </div>
  )
};

// Tooltip Colors
export const Colors = {
  render: () => (
    <div class="flex flex-wrap gap-4 p-8">
      <Tooltip content="Default tooltip" color="default">
        <button class="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
          Default
        </button>
      </Tooltip>
      
      <Tooltip content="Primary tooltip" color="primary">
        <button class="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Primary
        </button>
      </Tooltip>
      
      <Tooltip content="Secondary tooltip" color="secondary">
        <button class="px-3 py-1 bg-secondary-500 text-white rounded hover:bg-secondary-600 transition-colors">
          Secondary
        </button>
      </Tooltip>
      
      <Tooltip content="Success tooltip" color="success">
        <button class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
          Success
        </button>
      </Tooltip>
      
      <Tooltip content="Warning tooltip" color="warning">
        <button class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors">
          Warning
        </button>
      </Tooltip>
      
      <Tooltip content="Error tooltip" color="error">
        <button class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
          Error
        </button>
      </Tooltip>
      
      <Tooltip content="Info tooltip" color="info">
        <button class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Info
        </button>
      </Tooltip>
    </div>
  )
};

// Tooltip Triggers
export const Triggers = {
  render: () => (
    <div class="flex flex-wrap gap-4 p-8">
      <Tooltip content="Hover to show tooltip" trigger="hover">
        <button class="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Hover trigger
        </button>
      </Tooltip>
      
      <Tooltip content="Click to toggle tooltip" trigger="click">
        <button class="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Click trigger
        </button>
      </Tooltip>
      
      <Tooltip content="Focus to show tooltip" trigger="focus">
        <button class="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Focus trigger
        </button>
      </Tooltip>
      
      <Tooltip 
        content="Multiple triggers (hover and focus)" 
        trigger={['hover', 'focus']}
      >
        <button class="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Multiple triggers
        </button>
      </Tooltip>
    </div>
  )
};

// Without Arrow
export const WithoutArrow = {
  render: () => (
    <div class="p-8">
      <Tooltip content="Tooltip without arrow" arrow={false}>
        <button class="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          No arrow
        </button>
      </Tooltip>
    </div>
  )
};

// Rich Content
const RichContent = component$(() => (
  <div class="p-2">
    <h3 class="font-bold mb-1">Rich tooltip content</h3>
    <p class="mb-2">This tooltip contains rich HTML content</p>
    <div class="flex items-center gap-2">
      <div class="w-3 h-3 rounded-full bg-green-500"></div>
      <span>Status: Active</span>
    </div>
  </div>
));

export const RichContentTooltip = {
  render: () => (
    <div class="p-8">
      <Tooltip content={<RichContent />} size="lg" interactive={true}>
        <button class="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Hover for rich content
        </button>
      </Tooltip>
    </div>
  )
};

// Interactive Tooltip
export const InteractiveTooltip = {
  render: () => (
    <div class="p-8">
      <Tooltip 
        content={
          <div class="p-1">
            <p class="mb-2">This tooltip is interactive. You can hover over it.</p>
            <a
              href="#"
              class="text-blue-300 underline hover:text-blue-100 transition-colors"
              onClick$={(e) => {
                e.preventDefault();
                alert('Link clicked!');
              }}
            >
              Click this link
            </a>
          </div>
        } 
        interactive={true}
      >
        <button class="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Interactive tooltip
        </button>
      </Tooltip>
    </div>
  )
};

// Delayed Tooltip
export const DelayedTooltip = {
  render: () => (
    <div class="flex gap-4 p-8">
      <Tooltip 
        content="Shows after 500ms delay" 
        delay={500}
      >
        <button class="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Show delay (500ms)
        </button>
      </Tooltip>
      
      <Tooltip 
        content="Hides after 500ms delay" 
        hideDelay={500}
      >
        <button class="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Hide delay (500ms)
        </button>
      </Tooltip>
      
      <Tooltip 
        content="500ms show delay, 1000ms hide delay" 
        delay={500}
        hideDelay={1000}
      >
        <button class="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Both delays
        </button>
      </Tooltip>
    </div>
  )
};

// Controlled Tooltip
export const ControlledTooltip = {
  render: () => {
    // This would be implemented with useState in a real component
    // For storybook purposes, we'll just show a static controlled tooltip
    return (
      <div class="p-8">
        <Tooltip 
          content="This tooltip is controlled externally" 
          visible={true}
          trigger="manual"
        >
          <button class="px-4 py-2 bg-primary-500 text-white rounded">
            Controlled tooltip (always visible)
          </button>
        </Tooltip>
      </div>
    );
  }
};

// Accessible Tooltip Example
export const AccessibleTooltip = {
  render: () => (
    <div class="p-8">
      <Tooltip 
        content="This tooltip has explicit ARIA attributes" 
        id="accessible-tooltip"
      >
        <button 
          class="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
          aria-describedby="accessible-tooltip"
        >
          Accessible tooltip
        </button>
      </Tooltip>
    </div>
  )
};

// Tooltip on Different Elements
export const DifferentElements = {
  render: () => (
    <div class="flex flex-col gap-4 p-8">
      <Tooltip content="Tooltip on button">
        <button class="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors w-32">
          Button
        </button>
      </Tooltip>
      
      <Tooltip content="Tooltip on input">
        <input 
          type="text" 
          placeholder="Input with tooltip"
          class="px-3 py-1 border border-gray-300 rounded w-48"
        />
      </Tooltip>
      
      <Tooltip content="Tooltip on span">
        <span class="text-blue-600 underline cursor-help">
          Text with tooltip
        </span>
      </Tooltip>
      
      <Tooltip content="Tooltip on div">
        <div class="bg-gray-100 p-4 rounded w-64">
          Div with tooltip
        </div>
      </Tooltip>
      
      <Tooltip content="Tooltip on icon">
        <span class="cursor-help">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </span>
      </Tooltip>
    </div>
  )
};
