# Remaining Core Components Audit

This document provides a comprehensive audit of the remaining Core components in the Connect project that haven't been individually audited yet.

## Components Covered

1. **Feedback Components**

   - Alert
   - ErrorMessage
   - PromoBanner

2. **FileInput Components**

   - FileInput
   - ConfigFileInput
   - VPNConfigFileSection

3. **Graph Components**

   - Connection
   - Container
   - Node
   - Traffic
   - Hooks

4. **Input Component**

5. **Stepper Components**

   - CStepper (Circular)
   - HStepper (Horizontal)
   - VStepper (Vertical)
   - StateViewer

6. **Switch Components**

   - Switch
   - ConfigMethodToggle

7. **TimePicker Component**

## Feedback Components

### Alert Component

The Alert component is used to display important messages to users with various status types and configurations.

#### Props

| Prop     | Type                                        | Default | Description                        |
| -------- | ------------------------------------------- | ------- | ---------------------------------- |
| status   | 'info' \| 'success' \| 'warning' \| 'error' | 'info'  | Visual style of the alert          |
| closable | boolean                                     | false   | Whether to show a close button     |
| subtle   | boolean                                     | false   | Whether to use a more subtle style |
| onClose$ | QRL                                         | -       | Callback when alert is closed      |
| title    | string                                      | -       | Optional title text                |
| noIcon   | boolean                                     | false   | Whether to hide the icon           |
| class    | string                                      | -       | Additional CSS classes             |

#### Features

- Four status variants with appropriate icons and colors
- Optional close button with callback
- Support for subtle variant with lighter background
- Title and content support
- Dark mode support

#### Styling

The Alert component uses contextual colors based on its status:

- **Info**: Blue color scheme
- **Success**: Green color scheme
- **Warning**: Yellow color scheme
- **Error**: Red color scheme

Each has proper dark mode support and subtle variants.

#### Accessibility

- Uses `role="alert"` for screen readers
- Close button has `aria-label="Close alert"`
- Maintains good color contrast
- Uses semantic HTML structure

#### Recommendations

- Replace direct color values (e.g., `bg-blue-50`) with semantic tokens
- Add animation for dismissal (currently abrupt)
- Consider adding timed auto-dismissal option
- Add more ARIA attributes for better screen reader support

### ErrorMessage Component

A specialized component for displaying error messages, typically used in forms.

#### Props

| Prop    | Type   | Default | Description              |
| ------- | ------ | ------- | ------------------------ |
| message | string | -       | Error message to display |
| class   | string | -       | Additional CSS classes   |

#### Features

- Simple, focused component for error messages
- Consistent styling for form validation errors
- Conditionally renders only when a message is provided

#### Styling

- Uses error colors consistently
- Provides appropriate dark mode variants

#### Recommendations

- Consider consolidating with Alert component (error variant)
- Add icon support for better visibility
- Standardize with form error handling

### PromoBanner Component

Used for promotional content or important announcements that span the width of the container.

#### Props

| Prop        | Type                                                        | Default   | Description                     |
| ----------- | ----------------------------------------------------------- | --------- | ------------------------------- |
| title       | string                                                      | required  | Banner title                    |
| dismissible | boolean                                                     | true      | Whether banner can be dismissed |
| variant     | 'default' \| 'primary' \| 'success' \| 'warning' \| 'error' | 'default' | Color variant                   |
| onDismiss$  | QRL                                                         | -         | Callback when dismissed         |
| class       | string                                                      | -         | Additional CSS classes          |

#### Features

- Multiple color variants
- Dismissible with callback function
- Persistent state option
- Title and content sections

#### Recommendations

- Add persistence mechanism with localStorage
- Consider consolidating style patterns with Alert
- Add animation for dismissal
- Use semantic tokens for colors

## FileInput Components

### FileInput Component

Base component for file uploads and selection.

#### Props

| Prop       | Type    | Default | Description                            |
| ---------- | ------- | ------- | -------------------------------------- |
| accept     | string  | -       | Accepted file types                    |
| multiple   | boolean | false   | Whether multiple files can be selected |
| maxSize    | number  | -       | Maximum file size in bytes             |
| onChange$  | QRL     | -       | Change event handler                   |
| label      | string  | -       | Input label                            |
| error      | string  | -       | Error message                          |
| helperText | string  | -       | Helper text                            |
| disabled   | boolean | false   | Whether input is disabled              |
| class      | string  | -       | Additional CSS classes                 |

#### Features

- Drag-and-drop support
- File type validation
- Size validation
- Multi-file support
- Progress indicator during upload
- List of selected files

#### Accessibility

- Keyboard accessible via native file input
- Error states clearly indicated
- Appropriate ARIA attributes

#### Recommendations

- Add more robust file validation
- Enhance progress visualization
- Add preview capability for images
- Improve mobile touch experience

### ConfigFileInput and VPNConfigFileSection

Specialized components for handling router configuration files.

#### Features

- Specialized validation for configuration formats
- Integration with router-specific functionality
- Configuration parsing and validation

#### Recommendations

- Evaluate potential for consolidation with base FileInput
- Extract common functionality to shared utilities
- Standardize error handling across file inputs

## Graph Components

The Graph component family implements a network visualization system.

### Common Features

- Interactive node-based visualization
- Connection lines between nodes
- Traffic flow visualization
- Draggable nodes
- Zoom and pan functionality

### Recommendations

- Improve accessibility for interactive elements
- Add keyboard navigation support
- Enhance responsive behavior for small screens
- Add proper ARIA attributes for screen readers
- Document API more comprehensively
- Consider extracting to a dedicated visualization package

## Input Component

A base text input component with various features.

#### Props

| Prop        | Type    | Default | Description               |
| ----------- | ------- | ------- | ------------------------- |
| type        | string  | 'text'  | Input type                |
| value       | string  | -       | Input value               |
| placeholder | string  | -       | Placeholder text          |
| disabled    | boolean | false   | Whether input is disabled |
| required    | boolean | false   | Whether input is required |
| label       | string  | -       | Input label               |
| error       | string  | -       | Error message             |
| helperText  | string  | -       | Helper text               |
| onChange$   | QRL     | -       | Change event handler      |
| class       | string  | -       | Additional CSS classes    |

#### Features

- Support for various input types
- Label integration
- Error state handling
- Helper text
- Dark mode support

#### Accessibility

- Proper label association
- Error state indication
- Required field indication

#### Recommendations

- Standardize with Form.Field component to reduce duplication
- Add more input variations (prefix, suffix, etc.)
- Enhance validation integration
- Use semantic tokens for colors

## Stepper Components

The Stepper component family implements multi-step processes with different layouts.

### Common Features

- Step progress visualization
- Active, completed, and pending states
- Step labels and descriptions
- Click navigation between steps

### Variants

- **CStepper**: Circular layout
- **HStepper**: Horizontal layout
- **VStepper**: Vertical layout
- **StateViewer**: Debug/development tool for stepper state

#### Recommendations

- Consolidate common functionality into a base Stepper component
- Improve mobile responsiveness, especially for horizontal variant
- Enhance keyboard navigation
- Add proper ARIA attributes
- Use semantic tokens for colors

## Switch Components

Toggle components for boolean inputs.

### Switch Component

#### Props

| Prop      | Type                 | Default  | Description                |
| --------- | -------------------- | -------- | -------------------------- |
| checked   | boolean              | required | Whether switch is on       |
| onChange$ | QRL                  | required | Change handler             |
| label     | string               | -        | Switch label               |
| disabled  | boolean              | false    | Whether switch is disabled |
| size      | 'sm' \| 'md' \| 'lg' | 'md'     | Switch size                |
| class     | string               | -        | Additional CSS classes     |

#### Features

- Toggle behavior with animation
- Label support
- Size variants
- Disabled state
- Dark mode support

### ConfigMethodToggle

Specialized switch for configuration method selection.

#### Recommendations

- Consolidate with base Switch component
- Enhance accessibility for keyboard users
- Add proper ARIA attributes
- Standardize styling with semantic tokens

## TimePicker Component

A component for time selection.

#### Props

| Prop      | Type           | Default | Description                |
| --------- | -------------- | ------- | -------------------------- |
| value     | string         | -       | Selected time value        |
| onChange$ | QRL            | -       | Change handler             |
| format    | '12h' \| '24h' | '24h'   | Time format                |
| disabled  | boolean        | false   | Whether picker is disabled |
| label     | string         | -       | Field label                |
| error     | string         | -       | Error message              |
| class     | string         | -       | Additional CSS classes     |

#### Features

- Time selection with hours and minutes
- 12-hour and 24-hour format support
- AM/PM selection for 12-hour format
- Input validation
- Dark mode support

#### Accessibility

- Keyboard navigation support
- Error state indication
- Label association

#### Recommendations

- Enhance mobile touch experience
- Add time range validation
- Improve keyboard navigation within dropdown
- Use semantic tokens for colors

## Common Issues Across Components

1. **Inconsistent Token Usage**

   - Many components use direct color values instead of semantic tokens
   - Example: `bg-blue-100` vs. `bg-info-subtle`

2. **Accessibility Gaps**

   - Incomplete ARIA attribute coverage
   - Limited keyboard navigation in custom components
   - Focus management needs improvement

3. **Responsive Design**

   - Some components need better mobile adaptation
   - Touch targets could be improved for mobile users

4. **Dark Mode Implementation**

   - Generally well-implemented but with some inconsistencies
   - Some components use different patterns for dark mode classes

5. **Component Duplication**

   - Several specialized components duplicate base functionality
   - Consolidation opportunities exist

6. **Documentation**
   - API documentation is inconsistent
   - Usage examples are limited
   - Accessibility guidelines are missing

## Action Items

1. **Standardize Color Tokens**

   - Replace direct color references with semantic tokens
   - Create consistent naming patterns for all status/state colors

2. **Improve Accessibility**

   - Audit and enhance ARIA attributes across all components
   - Implement proper focus management
   - Ensure keyboard navigation for all interactive elements

3. **Enhance Mobile Experience**

   - Review and improve touch targets
   - Optimize layouts for small screens
   - Test and enhance for touch interactions

4. **Consolidate Components**

   - Identify and merge overlapping functionality
   - Create migration paths for specialized components
   - Extract common patterns to base components

5. **Documentation Enhancement**
   - Document all component APIs consistently
   - Create usage examples for common scenarios
   - Add accessibility guidelines for each component

## Next Steps

1. Compile findings from all component audits into a comprehensive report
2. Prioritize identified issues based on impact and effort
3. Create a roadmap for addressing technical debt and improvements
4. Begin consolidation of overlapping components (Task 5)
