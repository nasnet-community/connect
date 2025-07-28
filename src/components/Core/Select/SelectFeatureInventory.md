# Select Component Feature Inventory

This document provides a comprehensive inventory of features and capabilities in the base Select component.

## Core Functionality

- **Custom Dropdown UI**: Uses a button-triggered custom dropdown instead of native select
- **Selection Management**: Tracks and manages selected options
- **Option Rendering**: Renders each option with customized styling
- **Dropdown Toggling**: Opens/closes the dropdown on click
- **Clickaway Detection**: Closes dropdown when clicking outside
- **Native Form Integration**: Includes hidden native select for form submission

## Advanced Features

- **Multiple Selection**: Supports selecting multiple options (`multiple` prop)
- **Search Functionality**: Allows filtering options by typing (`searchable` prop)
- **Option Grouping**: Supports grouping options with section headers (`group` property in options)
- **Clearable Selection**: Button to clear selected options (`clearable` prop)
- **Custom Styling**: Extensive style customization
- **Validation States**: Support for default, valid, and invalid states (`validation` prop)
- **Size Variants**: Three size options - sm, md, lg (`size` prop)

## API Surface

### Props

| Prop         | Type                              | Default            | Description                                |
| ------------ | --------------------------------- | ------------------ | ------------------------------------------ |
| options      | SelectOption[]                    | required           | Array of options to display                |
| id           | string                            | auto-generated     | ID for the select element                  |
| name         | string                            | -                  | Name for form submission                   |
| value        | string \| string[]                | ''                 | Selected value(s)                          |
| placeholder  | string                            | 'Select an option' | Text to display when no option is selected |
| disabled     | boolean                           | false              | Whether the select is disabled             |
| required     | boolean                           | false              | Whether selection is required              |
| size         | 'sm' \| 'md' \| 'lg'              | 'md'               | Size of the select element                 |
| validation   | 'default' \| 'valid' \| 'invalid' | 'default'          | Validation state                           |
| label        | string                            | -                  | Label text                                 |
| helperText   | string                            | -                  | Helper text below the select               |
| errorMessage | string                            | -                  | Error message for invalid state            |
| class        | string                            | -                  | Additional CSS classes                     |
| multiple     | boolean                           | false              | Whether multiple selection is allowed      |
| searchable   | boolean                           | false              | Whether to show search input               |
| clearable    | boolean                           | true               | Whether selection can be cleared           |
| maxHeight    | string                            | -                  | Maximum height of dropdown                 |
| onChange$    | QRL                               | -                  | Change event handler                       |

### SelectOption Interface

```typescript
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}
```

## User Experience Features

- **Keyboard Support**: Partial keyboard navigation (tab to select button)
- **Checkbox Visualization**: Visual checkbox indicators for multiple selection mode
- **Display Text Formatting**: Shows "N selected" for multiple selections
- **No Results Message**: Shows message when search returns no results
- **Disabled Options**: Visual indication and prevention of selection for disabled options
- **Focus Indicators**: Visual focus state for the select button
- **Custom Placeholder**: Option to provide custom placeholder text

## State Management

- Uses Qwik's `useSignal` and `useStore` for reactivity
- Tracks dropdown open/closed state
- Manages search query
- Synchronizes selection state with external value

## Styling and Theming

- Light mode styling with appropriate colors and borders
- Dark mode support with dark theme variants
- Different styles for validation states (default, valid, error)
- Size variants affect padding and text size
- Hover and focus states for interactive elements

## Technical Implementation

- **Qwik Integration**: Uses Qwik components and reactivity
- **Event Handling**: Uses Qwik's serialized event handlers
- **DOM Access**: Uses refs for DOM manipulation
- **Conditional Rendering**: Shows/hides elements based on state
- **Accessibility Attributes**: Basic ARIA attributes for dropdown
