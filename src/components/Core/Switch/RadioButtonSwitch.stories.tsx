import { RadioButtonSwitch } from './RadioButtonSwitch';

export default {
  title: 'Core/Switch/RadioButtonSwitch',
  component: RadioButtonSwitch,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
  },
};

export const Default = {
  args: {
    checked: false,
    label: 'Toggle switch',
  },
};

export const Checked = {
  args: {
    checked: true,
    label: 'Active toggle',
  },
};

export const Disabled = {
  args: {
    disabled: true,
    label: 'Disabled toggle',
  },
};

export const CheckedDisabled = {
  args: {
    checked: true,
    disabled: true,
    label: 'Disabled active toggle',
  },
};

export const Small = {
  args: {
    size: 'sm',
    label: 'Small toggle',
  },
};

export const Medium = {
  args: {
    size: 'md',
    label: 'Medium toggle',
  },
};

export const Large = {
  args: {
    size: 'lg',
    label: 'Large toggle',
  },
};

export const NoLabel = {
  args: {
    checked: false,
  },
};

export const AllVariants = {
  render: () => (
    <div class="space-y-4">
      <div>
        <p class="mb-2 font-semibold">Regular</p>
        <div class="flex items-center space-x-6">
          <RadioButtonSwitch label="Off" />
          <RadioButtonSwitch checked label="On" />
        </div>
      </div>
      
      <div>
        <p class="mb-2 font-semibold">Disabled</p>
        <div class="flex items-center space-x-6">
          <RadioButtonSwitch label="Off (Disabled)" disabled />
          <RadioButtonSwitch checked label="On (Disabled)" disabled />
        </div>
      </div>
      
      <div>
        <p class="mb-2 font-semibold">Sizes</p>
        <div class="flex flex-col space-y-4">
          <RadioButtonSwitch size="sm" label="Small" />
          <RadioButtonSwitch size="md" label="Medium" />
          <RadioButtonSwitch size="lg" label="Large" />
        </div>
      </div>
    </div>
  ),
}; 