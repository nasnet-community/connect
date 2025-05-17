import { Meta, StoryObj } from 'storybook-framework-qwik';
import { ProgressBar } from './ProgressBar';
import type { ProgressBarProps } from '../Progress.types';
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

export default {
  title: 'Core/DataDisplay/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Progress bar component for displaying progress of a task or process'
      }
    }
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current value of the progress bar',
      defaultValue: 50
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum possible value',
      defaultValue: 0
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum possible value',
      defaultValue: 100
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size of the progress bar',
      defaultValue: 'md'
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Color of the progress bar',
      defaultValue: 'primary'
    },
    variant: {
      control: 'select',
      options: ['solid', 'gradient'],
      description: 'Visual variant of the progress bar',
      defaultValue: 'solid'
    },
    shape: {
      control: 'select',
      options: ['flat', 'rounded', 'pill'],
      description: 'Shape of the progress bar',
      defaultValue: 'rounded'
    },
    animation: {
      control: 'select',
      options: ['none', 'pulse', 'striped', 'striped-animated'],
      description: 'Animation style of the progress bar',
      defaultValue: 'none'
    },
    showValue: {
      control: 'boolean',
      description: 'Whether to show a label with the current value',
      defaultValue: false
    },
    valuePosition: {
      control: 'select',
      options: ['right', 'center', 'inside'],
      description: 'Position of the value label',
      defaultValue: 'right'
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the progress bar is indeterminate (loading state)',
      defaultValue: false
    },
    error: {
      control: 'boolean',
      description: 'Whether the progress bar is in error state',
      defaultValue: false
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the progress bar should take the full width of its container',
      defaultValue: true
    },
    buffer: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Buffer value for buffering state (useful for media playback)'
    }
  }
} satisfies Meta<ProgressBarProps>;

type Story = StoryObj<ProgressBarProps>;

// Basic progress bar
export const Default: Story = {
  args: {
    value: 50,
    size: 'md',
    color: 'primary',
    variant: 'solid',
    shape: 'rounded',
    animation: 'none',
    showValue: false,
    valuePosition: 'right',
    indeterminate: false,
    error: false,
    fullWidth: true
  },
  render: (args: ProgressBarProps) => (
    <div class="w-64">
      <ProgressBar {...args} />
    </div>
  )
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div class="flex flex-col gap-4 w-64">
      <div>
        <p class="text-sm font-medium mb-1">Extra Small</p>
        <ProgressBar value={75} size="xs" />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-1">Small</p>
        <ProgressBar value={75} size="sm" />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-1">Medium (Default)</p>
        <ProgressBar value={75} size="md" />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-1">Large</p>
        <ProgressBar value={75} size="lg" />
      </div>
    </div>
  )
};

// Different colors
export const Colors: Story = {
  render: () => (
    <div class="flex flex-col gap-4 w-64">
      <div>
        <p class="text-sm font-medium mb-1">Primary</p>
        <ProgressBar value={75} color="primary" />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-1">Secondary</p>
        <ProgressBar value={75} color="secondary" />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-1">Success</p>
        <ProgressBar value={75} color="success" />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-1">Warning</p>
        <ProgressBar value={75} color="warning" />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-1">Error</p>
        <ProgressBar value={75} color="error" />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-1">Info</p>
        <ProgressBar value={75} color="info" />
      </div>
    </div>
  )
};

// Different variants
export const Variants: Story = {
  render: () => (
    <div class="flex flex-col gap-4 w-64">
      <div>
        <p class="text-sm font-medium mb-1">Solid (Default)</p>
        <ProgressBar value={75} variant="solid" />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-1">Gradient</p>
        <ProgressBar value={75} variant="gradient" />
      </div>
    </div>
  )
};

// Different shapes
export const Shapes: Story = {
  render: () => (
    <div class="flex flex-col gap-4 w-64">
      <div>
        <p class="text-sm font-medium mb-1">Flat</p>
        <ProgressBar value={75} shape="flat" />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-1">Rounded (Default)</p>
        <ProgressBar value={75} shape="rounded" />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-1">Pill</p>
        <ProgressBar value={75} shape="pill" />
      </div>
    </div>
  )
};

// Different animations
export const Animations: Story = {
  render: () => (
    <div class="flex flex-col gap-4 w-64">
      <div>
        <p class="text-sm font-medium mb-1">None (Default)</p>
        <ProgressBar value={75} animation="none" />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-1">Pulse</p>
        <ProgressBar value={75} animation="pulse" />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-1">Striped</p>
        <ProgressBar value={75} animation="striped" />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-1">Striped Animated</p>
        <ProgressBar value={75} animation="striped-animated" />
      </div>
    </div>
  )
};

// Label positions
export const ValueLabels: Story = {
  render: () => (
    <div class="flex flex-col gap-4 w-64">
      <div>
        <p class="text-sm font-medium mb-1">Right</p>
        <ProgressBar value={75} showValue={true} valuePosition="right" />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-1">Center</p>
        <ProgressBar value={75} showValue={true} valuePosition="center" />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-1">Inside</p>
        <ProgressBar value={75} showValue={true} valuePosition="inside" />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-1">Custom Format</p>
        <ProgressBar 
          value={75} 
          showValue={true} 
          valueFormat={(value) => `${value.toFixed(1)} of 100`} 
        />
      </div>
    </div>
  )
};

// Indeterminate
export const Indeterminate: Story = {
  render: () => (
    <div class="flex flex-col gap-4 w-64">
      <div>
        <p class="text-sm font-medium mb-1">Indeterminate</p>
        <ProgressBar value={0} indeterminate={true} />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-1">Indeterminate with gradient</p>
        <ProgressBar value={0} indeterminate={true} variant="gradient" />
      </div>
    </div>
  )
};

// Error state
export const ErrorState: Story = {
  render: () => (
    <div class="flex flex-col gap-4 w-64">
      <div>
        <p class="text-sm font-medium mb-1">Error State</p>
        <ProgressBar value={75} error={true} />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-1">Error with value</p>
        <ProgressBar value={75} error={true} showValue={true} />
      </div>
    </div>
  )
};

// Buffer state
export const BufferState: Story = {
  render: () => (
    <div class="flex flex-col gap-4 w-64">
      <div>
        <p class="text-sm font-medium mb-1">Buffer State</p>
        <ProgressBar value={45} buffer={75} />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-1">Buffer with value</p>
        <ProgressBar value={45} buffer={75} showValue={true} />
      </div>
    </div>
  )
};

// Animated progress (actual demonstration)
const AnimatedProgress = component$(() => {
  const progress = useSignal(0);
  
  useVisibleTask$(({ cleanup }) => {
    const interval = setInterval(() => {
      progress.value = (progress.value + 1) % 101;
    }, 50);

    cleanup(() => clearInterval(interval));
  });

  return (
    <div class="flex flex-col gap-4 w-64">
      <div>
        <p class="text-sm font-medium mb-1">Animated Progress</p>
        <ProgressBar value={progress.value} showValue={true} />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-1">Animated with buffer</p>
        <ProgressBar 
          value={progress.value} 
          buffer={Math.min(100, progress.value + 15)} 
          showValue={true} 
        />
      </div>
    </div>
  );
});

export const DynamicProgress: Story = {
  render: () => <AnimatedProgress />
};
