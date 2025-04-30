import { Input, type InputProps } from './Input';

export default {
  title: 'Core/Input',
  component: Input,
  args: {
    placeholder: 'Placeholder text',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    validation: {
      control: { type: 'select' },
      options: ['default', 'valid', 'invalid'],
    },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    hasPrefixSlot: { control: 'boolean' },
    hasSuffixSlot: { control: 'boolean' },
  },
};

export const Default = {
  args: {
    label: 'Default Input',
    helperText: 'This is helper text for the input',
  },
};

export const WithPlaceholder = {
  args: {
    label: 'Input with Placeholder',
    placeholder: 'Enter a value',
    helperText: 'This input has a placeholder',
  },
};

export const Password = {
  args: {
    type: 'password',
    label: 'Password Input',
    placeholder: 'Enter your password',
  },
};

export const Email = {
  args: {
    type: 'email',
    label: 'Email Input',
    placeholder: 'Enter your email',
  },
};

export const Number = {
  args: {
    type: 'number',
    label: 'Number Input',
    placeholder: 'Enter a number',
  },
};

export const Small = {
  args: {
    size: 'sm',
    label: 'Small Input',
    placeholder: 'Small size input',
  },
};

export const Medium = {
  args: {
    size: 'md',
    label: 'Medium Input',
    placeholder: 'Medium size input',
  },
};

export const Large = {
  args: {
    size: 'lg',
    label: 'Large Input',
    placeholder: 'Large size input',
  },
};

export const Required = {
  args: {
    label: 'Required Input',
    required: true,
    placeholder: 'This input is required',
  },
};

export const Disabled = {
  args: {
    label: 'Disabled Input',
    disabled: true,
    placeholder: 'This input is disabled',
  },
};

export const ReadOnly = {
  args: {
    label: 'Read-only Input',
    readonly: true,
    value: 'This is a read-only value',
  },
};

export const Valid = {
  args: {
    label: 'Valid Input',
    validation: 'valid',
    value: 'Valid input value',
    helperText: 'This input is valid',
  },
};

export const Invalid = {
  args: {
    label: 'Invalid Input',
    validation: 'invalid',
    value: 'Invalid input value',
    errorMessage: 'This input has an error',
  },
};

export const WithPrefixIcon = {
  args: {
    label: 'Input with Prefix Icon',
    placeholder: 'Search...',
    hasPrefixSlot: true,
  },
  render: (args: InputProps) => (
    <Input {...args}>
      <svg
        q:slot="prefix"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-gray-500"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
    </Input>
  ),
};

export const WithSuffixIcon = {
  args: {
    label: 'Input with Suffix Icon',
    placeholder: 'Enter email...',
    hasSuffixSlot: true,
  },
  render: (args: InputProps) => (
    <Input {...args}>
      <svg
        q:slot="suffix"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-gray-500"
      >
        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
      </svg>
    </Input>
  ),
}; 