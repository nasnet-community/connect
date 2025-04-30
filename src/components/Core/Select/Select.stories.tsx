import { Select } from './Select';

export default {
  title: 'Core/Select',
  component: Select,
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4' },
      { value: 'option5', label: 'Option 5' },
    ],
    placeholder: 'Select an option',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    validation: {
      control: { type: 'select' },
      options: ['default', 'valid', 'invalid'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    multiple: { control: 'boolean' },
    searchable: { control: 'boolean' },
  },
};

export const Default = {
  args: {
    label: 'Default Select',
    helperText: 'This is helper text for the select',
  },
};

export const WithLabel = {
  args: {
    label: 'Select with Label',
  },
};

export const Required = {
  args: {
    label: 'Required Select',
    required: true,
  },
};

export const Disabled = {
  args: {
    label: 'Disabled Select',
    disabled: true,
  },
};

export const Multiple = {
  args: {
    label: 'Multiple Select',
    multiple: true,
    helperText: 'You can select multiple options',
  },
};

export const Searchable = {
  args: {
    label: 'Searchable Select',
    searchable: true,
    helperText: 'Type to search for options',
  },
};

export const SearchableMultiple = {
  args: {
    label: 'Searchable Multiple Select',
    searchable: true,
    multiple: true,
    helperText: 'Type to search and select multiple options',
  },
};

export const WithGroupedOptions = {
  args: {
    label: 'Grouped Options',
    options: [
      { value: 'fruit1', label: 'Apple', group: 'Fruits' },
      { value: 'fruit2', label: 'Banana', group: 'Fruits' },
      { value: 'fruit3', label: 'Orange', group: 'Fruits' },
      { value: 'vegetable1', label: 'Carrot', group: 'Vegetables' },
      { value: 'vegetable2', label: 'Broccoli', group: 'Vegetables' },
      { value: 'vegetable3', label: 'Spinach', group: 'Vegetables' },
      { value: 'meat1', label: 'Chicken', group: 'Meat' },
      { value: 'meat2', label: 'Beef', group: 'Meat' },
    ],
    searchable: true,
  },
};

export const WithDisabledOptions = {
  args: {
    label: 'With Disabled Options',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2', disabled: true },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4', disabled: true },
      { value: 'option5', label: 'Option 5' },
    ],
    helperText: 'Some options are disabled',
  },
};

export const Valid = {
  args: {
    label: 'Valid Select',
    validation: 'valid',
    value: 'option1',
    helperText: 'This select is valid',
  },
};

export const Invalid = {
  args: {
    label: 'Invalid Select',
    validation: 'invalid',
    errorMessage: 'Please select a valid option',
  },
};

export const Small = {
  args: {
    label: 'Small Select',
    size: 'sm',
  },
};

export const Medium = {
  args: {
    label: 'Medium Select',
    size: 'md',
  },
};

export const Large = {
  args: {
    label: 'Large Select',
    size: 'lg',
  },
}; 