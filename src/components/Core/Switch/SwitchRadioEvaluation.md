# Switch/Radio Component Evaluation

This document evaluates the current implementations of Switch and RadioButton components in the Connect design system as part of Task 5.2.1.

## Component Overview

### Current Implementations

1. **Switch Component** (`src/components/Core/Switch/Switch.tsx`)

   - A toggle switch UI with sliding animation
   - Supports various sizes, label positions, and disabled states
   - Uses direct Tailwind color classes rather than semantic tokens

2. **RadioButtonSwitch Component** (`src/components/Core/Switch/RadioButtonSwitch.tsx`)

   - Despite its name, this is functionally a toggle switch, not a radio button
   - Similar to Switch but with different styling and implementation details
   - Uses internal signals for state management
   - Uses some semantic tokens (primary-500, primary-600)

3. **RadioGroup Component** (`src/components/Core/Form/RadioGroup/RadioGroup.tsx`)

   - True radio button implementation
   - Supports multiple options in a group with single selection
   - Horizontal or vertical layout
   - Uses semantic tokens (border-border, text-primary-600, etc.)

4. **ConfigMethodToggle Component** (`src/components/Core/Switch/ConfigMethodToggle/ConfigMethodToggle.tsx`)
   - A specialized switch component for specific use case
   - Likely built on top of one of the base switch components

## Detailed Analysis

### API Comparison

#### Switch Component API

```typescript
export interface SwitchProps {
  checked: boolean;
  onChange$: QRL<(checked: boolean) => void>;
  label?: string;
  labelPosition?: "left" | "right";
  size?: SwitchSize; // "sm" | "md" | "lg"
  disabled?: boolean;
  name?: string;
  value?: string;
  required?: boolean;
  class?: string;
  id?: string;
}
```

#### RadioButtonSwitch Component API

```typescript
export interface RadioButtonSwitchProps {
  id?: string;
  name?: string;
  checked?: boolean;
  onChange$?: (checked: boolean) => void; // Note: Not using QRL
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  class?: string;
  label?: string;
}
```

#### RadioGroup Component API

```typescript
export interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  class?: string;
  direction?: "horizontal" | "vertical";
  onChange$?: QRL<(value: string) => void>;
}
```

### Visual and Functional Differences

1. **Toggle Switch vs. Radio Button**

   - Toggle switches (Switch and RadioButtonSwitch) are for binary on/off states
   - Radio buttons (RadioGroup) are for selecting one option from multiple choices

2. **Styling Approaches**

   - Switch: Uses direct color classes (bg-gray-200, bg-primary-600)
   - RadioButtonSwitch: Mixed approach with some semantic tokens
   - RadioGroup: Better usage of semantic tokens (text-text-secondary, border-border)

3. **State Management**
   - Switch: Simple controlled component
   - RadioButtonSwitch: Uses signals with internal state tracking
   - RadioGroup: Simple controlled component

### Implementation Quality

1. **Accessibility**

   - Switch: Basic accessibility with proper labels and aria support
   - RadioButtonSwitch: Better accessibility with VisuallyHidden component
   - RadioGroup: Good accessibility with standard radio button behavior

2. **Code Structure**

   - Switch: Clean implementation but missing JSDoc comments
   - RadioButtonSwitch: Good JSDoc documentation and comments
   - RadioGroup: Clean implementation but minimal comments

3. **Theming**
   - All components have basic dark mode support
   - Inconsistent use of semantic tokens across components

## Overlap Analysis

1. **Switch and RadioButtonSwitch Overlap**

   - Both implement toggle switch UI
   - Similar props and functionality
   - Different visual styles and implementation details
   - Clear opportunity for consolidation

2. **Radio Button Implementation**
   - RadioGroup provides radio button functionality
   - No dedicated single RadioButton component
   - Does not share common styling patterns with switch components

## Recommendations

1. **Component Consolidation Strategy**

   - Create a unified `Toggle` component that replaces both Switch and RadioButtonSwitch
   - Move RadioGroup to a dedicated RadioButton directory with consistent styling
   - Develop a standalone `RadioButton` component that can be used independently or within RadioGroup

2. **API Design Principles**

   - Maintain consistent prop naming across components
   - Use clear functional names (Toggle vs. RadioButton)
   - Standardize event handler interfaces
   - Support form integration with name/value props

3. **Implementation Improvements**

   - Use semantic design tokens consistently
   - Implement consistent accessibility features
   - Add comprehensive JSDoc comments
   - Ensure proper support for form validation

4. **Visual Distinction**
   - Make clear visual distinction between toggle and radio interfaces
   - Maintain size variants for both component types
   - Ensure consistent dark mode support

This evaluation provides the foundation for the next steps in our Switch/Radio Component Consolidation task.
