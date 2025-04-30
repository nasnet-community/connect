import { Switch } from './Switch';

export default {
  title: 'Core/Switch',
  component: Switch,
  argTypes: {
    checked: { control: 'boolean' },
    label: { control: 'text' },
    labelPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export const Default = {
  args: {
    label: 'Default Switch',
    checked: false,
    onChange$: () => {},
  },
};

export const WithoutLabel = {
  args: {
    checked: false,
    onChange$: () => {},
  },
};

export const Checked = {
  args: {
    label: 'Checked Switch',
    checked: true,
    onChange$: () => {},
  },
};

export const LabelLeft = {
  args: {
    label: 'Label on Left',
    labelPosition: 'left',
    checked: false,
    onChange$: () => {},
  },
};

export const LabelRight = {
  args: {
    label: 'Label on Right',
    labelPosition: 'right',
    checked: false,
    onChange$: () => {},
  },
};

export const Small = {
  args: {
    label: 'Small Switch',
    size: 'sm',
    checked: false,
    onChange$: () => {},
  },
};

export const Medium = {
  args: {
    label: 'Medium Switch',
    size: 'md',
    checked: false,
    onChange$: () => {},
  },
};

export const Large = {
  args: {
    label: 'Large Switch',
    size: 'lg',
    checked: false,
    onChange$: () => {},
  },
};

export const Disabled = {
  args: {
    label: 'Disabled Switch',
    disabled: true,
    checked: false,
    onChange$: () => {},
  },
};

export const DisabledChecked = {
  args: {
    label: 'Disabled Checked Switch',
    checked: true,
    disabled: true,
    onChange$: () => {},
  },
};

export const Required = {
  args: {
    label: 'Required Switch',
    required: true,
    checked: false,
    onChange$: () => {},
  },
}; 