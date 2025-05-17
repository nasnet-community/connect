import { type Meta, type StoryObj } from '@storybook/qwik/storybook';
import { UnifiedSelect, type SelectProps } from './UnifiedSelect';

const meta: Meta<SelectProps> = {
  title: 'Core/Form/UnifiedSelect',
  component: UnifiedSelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A unified select component that combines features from both Select and VPNSelect components. Supports both native and custom UI modes.',
      },
    },
  },
  argTypes: {
    mode: { 
      control: 'select', 
      options: ['native', 'custom'],
      description: 'Rendering mode - native or custom UI',
      defaultValue: 'custom',
      table: {
        type: { summary: '"native" | "custom"' },
        defaultValue: { summary: 'custom' },
      },
    },
    options: { 
      control: 'object',
      description: 'Array of options to display in the select',
    },
    value: { 
      control: 'text',
      description: 'Currently selected value(s)',
    },
    placeholder: { 
      control: 'text',
      description: 'Placeholder text when no option is selected',
    },
    disabled: { 
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    required: { 
      control: 'boolean',
      description: 'Whether the select is required',
    },
    size: { 
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the select',
    },
    validation: { 
      control: 'select',
      options: ['default', 'valid', 'invalid'],
      description: 'Validation state of the select',
    },
    label: { 
      control: 'text',
      description: 'Label text to display above the select',
    },
    helperText: { 
      control: 'text',
      description: 'Helper text to display below the select',
    },
    errorMessage: { 
      control: 'text',
      description: 'Error message to display when validation is "invalid"',
    },
    multiple: { 
      control: 'boolean',
      description: 'Whether to allow multiple selection',
    },
    searchable: { 
      control: 'boolean',
      description: 'Whether to enable search functionality (custom mode only)',
    },
    clearable: { 
      control: 'boolean',
      description: 'Whether selection can be cleared (custom mode only)',
    },
  },
};

export default meta;
type Story = StoryObj<SelectProps>;

// Basic options for select
const basicOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'mango', label: 'Mango' },
];

export const BasicSelect: Story = {
  args: {
    options: basicOptions,
    label: 'Select a fruit',
    placeholder: 'Choose a fruit',
    helperText: 'Select your favorite fruit',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic select component with default styling and behavior.',
      },
    },
  },
};

export const NativeSelect: Story = {
  args: {
    options: basicOptions,
    label: 'Select a fruit',
    placeholder: 'Choose a fruit',
    helperText: 'Using native browser select element',
    mode: 'native',
  },
  parameters: {
    docs: {
      description: {
        story: 'Native select implementation that uses browser\'s built-in select element.',
      },
    },
  },
};

export const ValidatedSelect: Story = {
  args: {
    options: basicOptions,
    label: 'Select a valid option',
    placeholder: 'Choose an option',
    validation: 'valid',
    value: 'apple',
    helperText: 'This selection is valid',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select component with validation state set to valid.',
      },
    },
  },
};

export const ErrorSelect: Story = {
  args: {
    options: basicOptions,
    label: 'Required selection',
    placeholder: 'Select an option',
    validation: 'invalid',
    errorMessage: 'Please select an option to continue',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Select component with validation state set to invalid, showing an error message.',
      },
    },
  },
};

export const DisabledSelect: Story = {
  args: {
    options: basicOptions,
    label: 'Disabled select',
    placeholder: 'Cannot select',
    disabled: true,
    helperText: 'This select is disabled',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled select component that cannot be interacted with.',
      },
    },
  },
};

export const SizeVariants: Story = {
  render: (args: any) => (
    <div class="flex flex-col gap-4">
      <UnifiedSelect
        {...args}
        size="sm"
        label="Small Size"
        options={basicOptions}
        placeholder="Small select"
      />
      <UnifiedSelect
        {...args}
        size="md"
        label="Medium Size (default)"
        options={basicOptions}
        placeholder="Medium select"
      />
      <UnifiedSelect
        {...args}
        size="lg"
        label="Large Size"
        options={basicOptions}
        placeholder="Large select"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select component with different size variants: small, medium, and large.',
      },
    },
  },
};

export const MultipleSelect: Story = {
  args: {
    options: basicOptions,
    label: 'Select multiple fruits',
    placeholder: 'Choose fruits',
    multiple: true,
    helperText: 'You can select multiple options',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select component that allows selection of multiple options.',
      },
    },
  },
};

export const SearchableSelect: Story = {
  args: {
    options: [
      ...basicOptions,
      { value: 'pineapple', label: 'Pineapple' },
      { value: 'watermelon', label: 'Watermelon' },
      { value: 'grape', label: 'Grape' },
      { value: 'kiwi', label: 'Kiwi' },
      { value: 'peach', label: 'Peach' },
      { value: 'plum', label: 'Plum' },
      { value: 'cherry', label: 'Cherry' },
    ],
    label: 'Search for a fruit',
    placeholder: 'Search...',
    searchable: true,
    helperText: 'Type to search for fruits',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select component with search functionality to filter options.',
      },
    },
  },
};

// Options with groups for grouped select story
const groupedOptions = [
  { value: 'apple', label: 'Apple', group: 'Common Fruits' },
  { value: 'banana', label: 'Banana', group: 'Common Fruits' },
  { value: 'orange', label: 'Orange', group: 'Common Fruits' },
  { value: 'strawberry', label: 'Strawberry', group: 'Berries' },
  { value: 'blueberry', label: 'Blueberry', group: 'Berries' },
  { value: 'raspberry', label: 'Raspberry', group: 'Berries' },
  { value: 'watermelon', label: 'Watermelon', group: 'Large Fruits' },
  { value: 'pineapple', label: 'Pineapple', group: 'Large Fruits' },
  { value: 'mango', label: 'Mango' }, // Ungrouped option
  { value: 'kiwi', label: 'Kiwi', group: 'Exotic Fruits' },
  { value: 'dragonfruit', label: 'Dragon Fruit', group: 'Exotic Fruits' },
  { value: 'lychee', label: 'Lychee', group: 'Exotic Fruits' },
];

export const GroupedSelect: Story = {
  args: {
    options: groupedOptions,
    label: 'Grouped Fruit Selection',
    placeholder: 'Select a fruit',
    helperText: 'Options are organized into groups',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select component with options organized into groups with headers.',
      },
    },
  },
};

export const GroupedSearchableSelect: Story = {
  args: {
    options: groupedOptions,
    label: 'Search Grouped Fruits',
    placeholder: 'Search...',
    searchable: true,
    helperText: 'Search within grouped options',
  },
  parameters: {
    docs: {
      description: {
        story: 'Grouped select with searchable functionality.',
      },
    },
  },
};

export const GroupedMultiSelect: Story = {
  args: {
    options: groupedOptions,
    label: 'Select Multiple Fruits',
    placeholder: 'Choose fruits...',
    multiple: true,
    helperText: 'You can select multiple options from different groups',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select component that allows multiple selection across option groups.',
      },
    },
  },
};

// VPN-specific options for demonstration
const vpnOptions = [
  { value: "openvpn", label: "OpenVPN" },
  { value: "wireguard", label: "WireGuard" },
  { value: "ipsec", label: "IPSec" },
  { value: "l2tp", label: "L2TP" },
  { value: "pptp", label: "PPTP" },
  { value: "sstp", label: "SSTP", disabled: true },
];

export const VPNNativeSelect: Story = {
  args: {
    options: vpnOptions,
    label: 'VPN Protocol',
    placeholder: 'Select protocol',
    required: true,
    mode: 'native',
    helperText: 'Select the VPN protocol to configure',
  },
  parameters: {
    docs: {
      description: {
        story: 'VPN Select component demonstration using native select mode (used for VPNSelect replacement).',
      },
    },
  },
};

export const VPNCustomSelect: Story = {
  args: {
    options: vpnOptions,
    label: 'VPN Protocol',
    placeholder: 'Select protocol',
    required: true,
    helperText: 'Select the VPN protocol to configure',
  },
  parameters: {
    docs: {
      description: {
        story: 'VPN Select component demonstration using custom select mode with enhanced UI.',
      },
    },
  },
};

// Helper story to compare both modes side by side
export const VPNComparisonExample: Story = {
  render: (args: any) => (
    <div class="flex flex-col gap-6">
      <div>
        <h3 class="text-lg font-medium mb-4">Native Mode (VPNSelect Replacement)</h3>
        <UnifiedSelect
          {...args}
          options={vpnOptions}
          mode="native"
          label="VPN Protocol (Native)"
          placeholder="Select protocol"
          helperText="Using browser's native select element"
        />
      </div>

      <div>
        <h3 class="text-lg font-medium mb-4">Custom Mode (Enhanced UI)</h3>
        <UnifiedSelect
          {...args}
          options={vpnOptions}
          label="VPN Protocol (Custom)"
          placeholder="Select protocol"
          helperText="Using custom UI with enhanced features"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of native and custom modes for VPN protocol selection.',
      },
    },
  },
};
