# Core Component Audit

This document provides an audit of existing Core components in the Connect project, evaluating them for responsiveness, dark/light mode compatibility, accessibility, and adherence to design tokens.

## Button Component

**Location**: `src/components/Core/button/Button.tsx`

### Strengths:

- ✅ Well-implemented variants (primary, secondary, outline, ghost)
- ✅ Good size options (sm, md, lg)
- ✅ Dark mode support
- ✅ Support for icons (leftIcon, rightIcon)
- ✅ Loading state
- ✅ Uses semantic Tailwind classes

### Areas for Improvement:

- 🔄 Could benefit from more ARIA attributes
- 🔄 Consider adding more variants (e.g., link button, danger button)

## RadioButton Component

**Location**: `src/components/Core/button/RadioButton.tsx`

### Strengths:

- ✅ Basic functionality works
- ✅ Basic dark mode support

### Areas for Improvement:

- ⚠️ This appears to be a toggle switch rather than a radio button
- ⚠️ Should be moved to `Switch` folder
- ⚠️ Missing adequate keyboard accessibility
- 🔄 Missing disabled state
- 🔄 No size variants

## Card Component

**Location**: `src/components/Core/Card/Card.tsx`

### Strengths:

- ✅ Multiple variants (default, bordered, elevated)
- ✅ Support for header, footer, and actions
- ✅ Loading state
- ✅ Dark mode support
- ✅ Good use of design tokens

### Areas for Improvement:

- 🔄 Could benefit from more predefined spacing options
- 🔄 Consider adding hover state variant

## ServerCard Component

**Location**: `src/components/Core/Card/ServerCard.tsx`

### Strengths:

- ✅ Specialized for server configurations
- ✅ Good dark mode support
- ✅ Toggle functionality

### Areas for Improvement:

- ⚠️ Very specific to one use case
- 🔄 Should extract the base styling to a more general component
- 🔄 Could use more semantic design tokens

## ErrorMessage Component

**Location**: `src/components/Core/Feedback/ErrorMessage/ErrorMessage.tsx`

### Strengths:

- ✅ Clear visual indication of error state
- ✅ Dark mode support
- ✅ Animation

### Areas for Improvement:

- 🔄 Should be generalized to support other message types (warning, info, success)
- 🔄 Consider adding dismissible option

## PromoBanner Component

**Location**: `src/components/Core/Feedback/PromoBanner/PromoBanner.tsx`

### Strengths:

- ✅ Good responsive layout
- ✅ Dark mode support
- ✅ Supports images

### Areas for Improvement:

- 🔄 Could be generalized to be a more flexible banner component
- 🔄 Specific credential functionality should be separated

## ConfigFileInput Component

**Location**: `src/components/Core/FileInput/ConfigFileInput/ConfigFileInput.tsx`

### Strengths:

- ✅ Specialized for config file input
- ✅ Dark mode support
- ✅ Paste functionality

### Areas for Improvement:

- ⚠️ Very specific to one use case
- ⚠️ Should extract core functionality to a more general file input component

## VPNConfigFileSection Component

**Location**: `src/components/Core/FileInput/VPNConfigFileSection/VPNConfigFileSection.tsx`

### Strengths:

- ✅ Comprehensive file upload UI
- ✅ Drag and drop support
- ✅ Dark mode support

### Areas for Improvement:

- ⚠️ Highly specific to VPN configuration
- ⚠️ Should be refactored into a more general file upload component with props for specialization

## Form Container Component

**Location**: `src/components/Core/Form/Container/Container.tsx`

### Strengths:

- ✅ Clean, simple API
- ✅ Dark mode support
- ✅ Good slot usage

### Areas for Improvement:

- 🔄 Could benefit from more spacing/layout options

## Field Component

**Location**: `src/components/Core/Form/Field/Field.tsx`

### Strengths:

- ✅ Supports multiple input types
- ✅ Error and helper text support
- ✅ Dark mode compatibility
- ✅ Prefix/suffix slots

### Areas for Improvement:

- 🔄 Could benefit from more validation state indicators
- 🔄 Consider adding more input types

## FormErrorMessage Component

**Location**: `src/components/Core/Form/FormErrorMessage/FormErrorMessage.tsx`

### Strengths:

- ✅ Simple, focused component
- ✅ Dark mode support
- ✅ Slot support

### Areas for Improvement:

- ✅ Well-implemented, no significant issues

## FormHelperText Component

**Location**: `src/components/Core/Form/FormHelperText/FormHelperText.tsx`

### Strengths:

- ✅ Simple, focused component
- ✅ Dark mode support
- ✅ Slot support

### Areas for Improvement:

- ✅ Well-implemented, no significant issues

## FormLabel Component

**Location**: `src/components/Core/Form/FormLabel/FormLabel.tsx`

### Strengths:

- ✅ Simple, focused component
- ✅ Required state indicator
- ✅ Dark mode support
- ✅ Slot support

### Areas for Improvement:

- ✅ Well-implemented, no significant issues

## RadioGroup Component

**Location**: `src/components/Core/Form/RadioGroup/RadioGroup.tsx`

### Strengths:

- ✅ Support for horizontal/vertical layouts
- ✅ Dark mode compatibility
- ✅ Disabled state for individual options

### Areas for Improvement:

- 🔄 Missing group-level disabled state
- 🔄 Could benefit from more spacing options

## Server Form Components

**Location**: `src/components/Core/Form/ServerField/`

Several components:

- Checkbox
- CheckboxGroup
- InlineCheckbox
- PasswordField
- SectionTitle
- Select
- ServerButton
- ServerFormField
- TabNavigation

### Strengths:

- ✅ Specialized components for specific server-related forms
- ✅ Dark mode support generally good

### Areas for Improvement:

- ⚠️ Many of these should be generalized and moved to their own directories
- ⚠️ TabNavigation is misplaced in the ServerField directory
- ⚠️ Password field should be a general component
- 🔄 Components should use more semantic design tokens

## Graph Components

**Location**: `src/components/Core/Graph/`

### Strengths:

- ✅ Comprehensive graph visualization system
- ✅ Good dark mode support
- ✅ Well-organized file structure

### Areas for Improvement:

- 🔄 Highly specific to network visualization
- 🔄 Should consider extracting general-purpose visualization tools

## Input Component

**Location**: `src/components/Core/Input/Input.tsx`

### Strengths:

- ✅ Multiple input types
- ✅ Validation states
- ✅ Dark mode support

### Areas for Improvement:

- 🔄 Could benefit from more explicit accessibility attributes

## Modal Component

**Location**: `src/components/Core/Modal/Modal.tsx`

### Strengths:

- ✅ Multiple size options
- ✅ Header/footer support
- ✅ Dark mode support

### Areas for Improvement:

- 🔄 Consider adding more animation options
- 🔄 Need to ensure focus management for accessibility

## Select Component

**Location**: `src/components/Core/Select/Select.tsx`

### Strengths:

- ✅ Support for option groups
- ✅ Dark mode compatibility
- ✅ Multiple sizes

### Areas for Improvement:

- 🔄 Could add searchable option
- 🔄 Consider adding multi-select capability

## VPNSelect Component

**Location**: `src/components/Core/Select/VPNSelect/VPNSelect.tsx`

### Strengths:

- ✅ Specialized for VPN selection
- ✅ Dark mode support

### Areas for Improvement:

- ⚠️ Very specific to VPN use case
- ⚠️ Should be consolidated with the main Select component

## Stepper Components

**Location**: `src/components/Core/Stepper/`

- CStepper
- HStepper
- VStepper
- StateViewer

### Strengths:

- ✅ Multiple stepper variants
- ✅ Good dark mode support
- ✅ Well-structured context and hooks

### Areas for Improvement:

- 🔄 Complex components with some overlapping functionality
- 🔄 Consider consolidating similar functionality

## Switch Components

**Location**: `src/components/Core/Switch/`

- ConfigMethodToggle
- Switch

### Strengths:

- ✅ Good dark mode support
- ✅ Basic functionality works

### Areas for Improvement:

- ⚠️ RadioButton component should be moved here
- 🔄 ConfigMethodToggle is very specific to one use case

## TimePicker Component

**Location**: `src/components/Core/TimePicker/Timepicker.tsx`

### Strengths:

- ✅ Basic functionality

### Areas for Improvement:

- 🔄 Limited functionality
- 🔄 Needs better dark mode support
- 🔄 Missing accessibility features

## Summary of Consolidation Opportunities

1. **Button and RadioButton**: RadioButton should be moved to Switch
2. **Card and ServerCard**: Extract common functionality from ServerCard
3. **ErrorMessage**: Generalize to support all message types
4. **FileInput components**: Extract common file upload functionality
5. **Form Field components**: Consolidate various field types
6. **Server Form components**: Move to appropriate category folders
7. **VPNSelect**: Consolidate with main Select component
8. **Stepper components**: Consider consolidating similar functionality
9. **Switch and RadioButton**: Consolidate toggle functionality

## Next Steps

Based on this audit, the following actions are recommended:

1. Consolidate overlapping components
2. Move components to more appropriate locations
3. Generalize specialized components for broader use cases
4. Enhance dark mode support where lacking
5. Improve accessibility across all components
6. Ensure consistent use of design tokens
