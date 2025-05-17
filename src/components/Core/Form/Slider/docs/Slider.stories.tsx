import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Slider } from './Slider';
import type { SliderProps } from './Slider.types';
import { component$, useSignal, $ } from '@builder.io/qwik';

export default {
  title: 'Core/Form/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 
          'Slider component for selecting numeric values with a draggable thumb. Supports both single value and range selection.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the slider',
      defaultValue: 'md',
    },
    variant: {
      control: 'select',
      options: ['default', 'filled'],
      description: 'Visual variant of the slider',
      defaultValue: 'default',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the slider',
      defaultValue: 'horizontal',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the slider is disabled',
      defaultValue: false,
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the slider is read-only',
      defaultValue: false,
    },
    label: {
      control: 'text',
      description: 'Label for the slider',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the slider',
    },
    min: {
      control: 'number',
      description: 'Minimum value',
      defaultValue: 0,
    },
    max: {
      control: 'number',
      description: 'Maximum value',
      defaultValue: 100,
    },
    step: {
      control: 'number',
      description: 'Step increment value',
      defaultValue: 1,
    },
    showValue: {
      control: 'boolean',
      description: 'Whether to display the current value',
      defaultValue: false,
    },
    showMarks: {
      control: 'boolean',
      description: 'Whether to show marks on the slider track',
      defaultValue: false,
    },
    markCount: {
      control: 'number',
      description: 'Number of marks to display (evenly distributed)',
      defaultValue: 5,
    },
    showTicks: {
      control: 'boolean',
      description: 'Whether to show tick marks',
      defaultValue: false,
    },
    tickCount: {
      control: 'number',
      description: 'Number of ticks to display',
      defaultValue: 5,
    },
    type: {
      control: 'select',
      options: ['single', 'range'],
      description: 'Type of slider',
      defaultValue: 'single',
    },
  },
} satisfies Meta<SliderProps>;

type Story = StoryObj<SliderProps>;

// Basic slider
export const Default: Story = {
  args: {
    label: 'Basic Slider',
    helperText: 'Drag the thumb to select a value',
    min: 0,
    max: 100,
    defaultValue: 50,
    showValue: true,
  },
};

// Range slider
export const Range: Story = {
  args: {
    type: 'range',
    label: 'Price Range',
    helperText: 'Select a range of values',
    min: 0,
    max: 1000,
    defaultValue: [200, 800],
    showValue: true,
    formatLabel$: $((value: number) => `$${value}`),
  },
};

// With marks
export const WithMarks: Story = {
  args: {
    label: 'Slider with Marks',
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 30,
    showValue: true,
    showMarks: true,
    markCount: 11,
  },
};

// With custom marks
export const WithCustomMarks: Story = {
  args: {
    label: 'Temperature',
    min: 0,
    max: 40,
    defaultValue: 22,
    showValue: true,
    showMarks: true,
    formatLabel$: $((value: number) => `${value}°C`),
    marks: [
      { value: 0, label: '0°C' },
      { value: 10, label: '10°C' },
      { value: 20, label: '20°C' },
      { value: 30, label: '30°C' },
      { value: 40, label: '40°C' },
    ],
  },
};

// Vertical orientation
export const Vertical: Story = {
  args: {
    label: 'Volume Control',
    orientation: 'vertical',
    min: 0,
    max: 100,
    defaultValue: 50,
    showValue: true,
    helperText: 'Adjust the volume level',
    formatLabel$: $((value: number) => `${value}%`),
  },
  parameters: {
    docs: {
      description: {
        story: 'A vertical slider with custom height, useful for volume or level controls.',
      },
    },
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div class="flex flex-col gap-8 w-[400px]">
      <div>
        <h3 class="text-sm font-medium mb-2">Small</h3>
        <Slider
          size="sm"
          defaultValue={30}
          showValue={true}
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Medium (Default)</h3>
        <Slider
          size="md"
          defaultValue={50}
          showValue={true}
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Large</h3>
        <Slider
          size="lg"
          defaultValue={70}
          showValue={true}
        />
      </div>
    </div>
  ),
};

// Different variants
export const Variants: Story = {
  render: () => (
    <div class="flex flex-col gap-8 w-[400px]">
      <div>
        <h3 class="text-sm font-medium mb-2">Default</h3>
        <Slider
          variant="default"
          defaultValue={40}
          showValue={true}
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Filled</h3>
        <Slider
          variant="filled"
          defaultValue={60}
          showValue={true}
        />
      </div>
    </div>
  ),
};

// Different states
export const States: Story = {
  render: () => (
    <div class="flex flex-col gap-8 w-[400px]">
      <div>
        <h3 class="text-sm font-medium mb-2">Default</h3>
        <Slider
          label="Default state"
          defaultValue={50}
          showValue={true}
          helperText="Default slider state"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Disabled</h3>
        <Slider
          label="Disabled state"
          defaultValue={50}
          showValue={true}
          disabled={true}
          helperText="Slider is disabled"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Read-only</h3>
        <Slider
          label="Read-only state"
          defaultValue={50}
          showValue={true}
          readonly={true}
          helperText="Slider is read-only"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Error</h3>
        <Slider
          label="Error state"
          defaultValue={50}
          showValue={true}
          errorMessage="There was an error with this value"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Success</h3>
        <Slider
          label="Success state"
          defaultValue={50}
          showValue={true}
          successMessage="Value successfully updated"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Warning</h3>
        <Slider
          label="Warning state"
          defaultValue={50}
          showValue={true}
          warningMessage="This value may cause performance issues"
        />
      </div>
    </div>
  ),
};

// Range slider with constraints
export const RangeWithConstraints: Story = {
  args: {
    type: 'range',
    label: 'Date Range (Days)',
    helperText: 'Select minimum 7 days, maximum 30 days',
    min: 1,
    max: 60,
    defaultValue: [10, 25],
    showValue: true,
    minRange: 7,
    maxRange: 30,
    showMarks: true,
    markCount: 7,
  },
};

// Controlled slider example
const ControlledSlider = component$(() => {
  const value = useSignal(50);
  
  return (
    <div class="flex flex-col gap-4 w-[400px]">
      <Slider
        label="Controlled Slider"
        helperText="This slider's value is controlled via state"
        value={value.value}
        onChange$={$((newValue: number) => {
          value.value = newValue;
        })}
        showValue={true}
        showMarks={true}
        markCount={5}
      />
      
      <div class="flex justify-between mt-4">
        <button
          onClick$={() => (value.value = Math.max(0, value.value - 10))}
          class="px-3 py-1 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Decrease -10
        </button>
        
        <button
          onClick$={() => (value.value = Math.min(100, value.value + 10))}
          class="px-3 py-1 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Increase +10
        </button>
      </div>
      
      <div class="bg-gray-100 p-4 rounded mt-4">
        <pre class="text-sm">Current value: {value.value}</pre>
      </div>
    </div>
  );
});

export const Controlled: Story = {
  render: () => <ControlledSlider />,
};

// Form integration example
const SliderFormExample = component$(() => {
  const brightness = useSignal(50);
  const volume = useSignal([20, 80] as [number, number]);
  const temperature = useSignal(22);
  const submitted = useSignal(false);
  const formData = useSignal('');
  
  const handleSubmit$ = $((e: Event) => {
    e.preventDefault();
    submitted.value = true;
    
    formData.value = JSON.stringify({
      brightness: brightness.value,
      volumeRange: volume.value,
      temperature: temperature.value,
    }, null, 2);
    
    setTimeout(() => {
      submitted.value = false;
    }, 3000);
  });
  
  return (
    <div class="w-[500px] p-6 border border-gray-200 rounded-md">
      <h2 class="text-xl font-medium mb-4">Media Settings</h2>
      
      {submitted.value && (
        <div class="bg-green-50 p-4 rounded-md mb-4">
          <p class="text-green-700">Settings saved successfully!</p>
        </div>
      )}
      
      <form onSubmit$={handleSubmit$} class="flex flex-col gap-6">
        <Slider
          label="Brightness"
          value={brightness.value}
          onChange$={$((value: number) => (brightness.value = value))}
          min={0}
          max={100}
          step={1}
          showValue={true}
          showMarks={true}
          markCount={5}
          formatLabel$={$((value: number) => `${value}%`)}
        />
        
        <Slider
          type="range"
          label="Volume Range"
          value={volume.value}
          onChange$={$((values: [number, number]) => (volume.value = values))}
          min={0}
          max={100}
          step={5}
          showValue={true}
          showMarks={true}
          markCount={5}
          formatLabel$={$((value: number) => `${value}%`)}
        />
        
        <Slider
          label="Temperature"
          value={temperature.value}
          onChange$={$((value: number) => (temperature.value = value))}
          min={16}
          max={30}
          step={0.5}
          showValue={true}
          showMarks={true}
          formatLabel$={$((value: number) => `${value}°C`)}
          marks={[
            { value: 16, label: '16°C' },
            { value: 20, label: '20°C' },
            { value: 22, label: '22°C' },
            { value: 24, label: '24°C' },
            { value: 30, label: '30°C' },
          ]}
        />
        
        <div class="mt-2">
          <button
            type="submit"
            class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Save Settings
          </button>
        </div>
      </form>
      
      {formData.value && (
        <div class="mt-6 bg-gray-50 p-4 rounded-md">
          <h3 class="text-sm font-medium mb-2">Form Data:</h3>
          <pre class="text-xs overflow-auto">{formData.value}</pre>
        </div>
      )}
    </div>
  );
});

export const FormIntegration: Story = {
  render: () => <SliderFormExample />,
};
