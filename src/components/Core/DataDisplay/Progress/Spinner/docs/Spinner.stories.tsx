import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { Spinner } from './Spinner';
import type { SpinnerProps } from './Spinner.types';

export default {
  title: 'Core/DataDisplay/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Spinner component for indicating loading states'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the spinner',
      defaultValue: 'md'
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'white'],
      description: 'Color of the spinner',
      defaultValue: 'primary'
    },
    variant: {
      control: 'select',
      options: ['border', 'grow', 'dots', 'bars', 'circle'],
      description: 'Visual variant of the spinner',
      defaultValue: 'border'
    },
    speed: {
      control: { type: 'range', min: 500, max: 3000, step: 100 },
      description: 'Speed of the animation in milliseconds (lower is faster)',
      defaultValue: 1000
    },
    showLabel: {
      control: 'boolean',
      description: 'Whether to show a label with the spinner',
      defaultValue: false
    },
    label: {
      control: 'text',
      description: 'Label text to display with the spinner',
      defaultValue: 'Loading...'
    },
    labelPosition: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Position of the label',
      defaultValue: 'right'
    },
    centered: {
      control: 'boolean',
      description: 'Whether to center the spinner in its container',
      defaultValue: false
    }
  }
} satisfies Meta<SpinnerProps>;

type Story = StoryObj<SpinnerProps>;

// Basic spinner
export const Default: Story = {
  args: {
    size: 'md',
    color: 'primary',
    variant: 'border',
    speed: 1000,
    showLabel: false,
    label: 'Loading...',
    labelPosition: 'right',
    centered: false
  }
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div class="flex flex-col gap-8 items-start">
      <div class="flex flex-row gap-8 items-center">
        <div>
          <p class="text-sm font-medium mb-2">Extra Small</p>
          <Spinner size="xs" />
        </div>
        
        <div>
          <p class="text-sm font-medium mb-2">Small</p>
          <Spinner size="sm" />
        </div>
        
        <div>
          <p class="text-sm font-medium mb-2">Medium (Default)</p>
          <Spinner size="md" />
        </div>
        
        <div>
          <p class="text-sm font-medium mb-2">Large</p>
          <Spinner size="lg" />
        </div>
        
        <div>
          <p class="text-sm font-medium mb-2">Extra Large</p>
          <Spinner size="xl" />
        </div>
      </div>
    </div>
  )
};

// Different colors
export const Colors: Story = {
  render: () => (
    <div class="flex flex-wrap gap-8">
      <div>
        <p class="text-sm font-medium mb-2">Primary</p>
        <Spinner color="primary" />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-2">Secondary</p>
        <Spinner color="secondary" />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-2">Success</p>
        <Spinner color="success" />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-2">Warning</p>
        <Spinner color="warning" />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-2">Error</p>
        <Spinner color="error" />
      </div>
      
      <div>
        <p class="text-sm font-medium mb-2">Info</p>
        <Spinner color="info" />
      </div>
      
      <div class="bg-gray-800 p-2 rounded">
        <p class="text-sm font-medium mb-2 text-white">White</p>
        <Spinner color="white" />
      </div>
    </div>
  )
};

// Different variants
export const Variants: Story = {
  render: () => (
    <div class="flex flex-col gap-8">
      <div class="flex flex-row gap-8 items-center">
        <div>
          <p class="text-sm font-medium mb-2">Border (Default)</p>
          <Spinner variant="border" />
        </div>
        
        <div>
          <p class="text-sm font-medium mb-2">Grow</p>
          <Spinner variant="grow" />
        </div>
        
        <div>
          <p class="text-sm font-medium mb-2">Dots</p>
          <Spinner variant="dots" />
        </div>
        
        <div>
          <p class="text-sm font-medium mb-2">Bars</p>
          <Spinner variant="bars" />
        </div>
        
        <div>
          <p class="text-sm font-medium mb-2">Circle</p>
          <Spinner variant="circle" />
        </div>
      </div>
    </div>
  )
};

// Label positions
export const LabelPositions: Story = {
  render: () => (
    <div class="flex flex-col gap-8">
      <div class="flex flex-row gap-8 items-center">
        <div>
          <p class="text-sm font-medium mb-2">Top</p>
          <Spinner showLabel={true} labelPosition="top" />
        </div>
        
        <div>
          <p class="text-sm font-medium mb-2">Right (Default)</p>
          <Spinner showLabel={true} labelPosition="right" />
        </div>
        
        <div>
          <p class="text-sm font-medium mb-2">Bottom</p>
          <Spinner showLabel={true} labelPosition="bottom" />
        </div>
        
        <div>
          <p class="text-sm font-medium mb-2">Left</p>
          <Spinner showLabel={true} labelPosition="left" />
        </div>
      </div>
    </div>
  )
};

// Different speeds
export const AnimationSpeeds: Story = {
  render: () => (
    <div class="flex flex-col gap-8">
      <div class="flex flex-row gap-8 items-center">
        <div>
          <p class="text-sm font-medium mb-2">Fast (500ms)</p>
          <Spinner speed={500} />
        </div>
        
        <div>
          <p class="text-sm font-medium mb-2">Normal (1000ms)</p>
          <Spinner speed={1000} />
        </div>
        
        <div>
          <p class="text-sm font-medium mb-2">Slow (2000ms)</p>
          <Spinner speed={2000} />
        </div>
      </div>
    </div>
  )
};

// Custom labels
export const CustomLabels: Story = {
  render: () => (
    <div class="flex flex-col gap-8">
      <div class="flex flex-row gap-8 items-center">
        <div>
          <Spinner 
            showLabel={true} 
            label="Please wait..." 
          />
        </div>
        
        <div>
          <Spinner 
            showLabel={true} 
            label="Fetching data..." 
            labelClass="text-sm text-primary-600 font-medium"
          />
        </div>
        
        <div>
          <Spinner 
            variant="dots"
            showLabel={true} 
            label="Processing..." 
          />
        </div>
      </div>
    </div>
  )
};

// Centered in container
export const CenteredInContainer: Story = {
  render: () => (
    <div class="border border-gray-300 rounded-md w-64 h-32 relative">
      <Spinner centered={true} />
      <p class="text-center text-sm text-gray-500 absolute bottom-2 left-0 right-0">Centered in container</p>
    </div>
  )
};

// In context usage examples
export const ContextExamples: Story = {
  render: () => (
    <div class="flex flex-col gap-8 w-full max-w-md">
      <div class="border border-gray-300 rounded-md p-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium">Loading Card</h3>
          <Spinner size="sm" />
        </div>
        <p class="text-gray-600">Content is loading, please wait...</p>
      </div>
      
      <button class="flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-md w-full" disabled>
        <Spinner size="sm" color="white" />
        <span>Processing</span>
      </button>
      
      <div class="flex flex-col items-center justify-center p-8 border border-gray-300 rounded-md">
        <Spinner size="lg" variant="circle" />
        <p class="mt-4 text-gray-600">Loading data...</p>
      </div>
    </div>
  )
};
