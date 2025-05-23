# Connect Design System - Core Form Components

This document provides comprehensive documentation for the generalized form components in the Connect design system.

## Table of Contents

- [PasswordField](#passwordfield)
- [Checkbox](#checkbox)
- [CheckboxGroup](#checkboxgroup)
- [TabNavigation](#tabnavigation)

---

## PasswordField

The `PasswordField` component provides an enhanced password input with visibility toggle and optional password strength indication.

### Import

```tsx
import { PasswordField } from "~/components/Core/Form/PasswordField";
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Current password value |
| `onInput$` | `QRL<(event: Event, element: HTMLInputElement) => void>` | - | Callback when input value changes |
| `onValueChange$` | `QRL<(value: string) => void>` | - | Simplified callback for value changes |
| `label` | `string` | - | Label text for the field |
| `placeholder` | `string` | - | Placeholder text |
| `helperText` | `string` | - | Helper text shown below the field |
| `error` | `string` | - | Error message to display |
| `id` | `string` | Auto-generated | ID for the input element |
| `name` | `string` | - | Name attribute for the input |
| `required` | `boolean` | `false` | Whether the field is required |
| `disabled` | `boolean` | `false` | Whether the field is disabled |
| `readOnly` | `boolean` | `false` | Whether the field is read-only |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant of the field |
| `showStrength` | `boolean` | `false` | Whether to show password strength indicator |
| `strengthRules` | `PasswordStrengthRule[]` | Default rules | Custom rules for password strength |
| `strengthLabels` | `string[]` | Default labels | Labels for strength levels |
| `autocomplete` | `string` | `'off'` | Autocomplete attribute |
| `class` | `string` | - | Additional CSS classes |

### Usage Example

```tsx
import { component$ } from "@builder.io/qwik";
import { useSignal } from "@builder.io/qwik";
import { PasswordField } from "~/components/Core/Form/PasswordField";

export default component$(() => {
  const password = useSignal("");
  
  return (
    <PasswordField
      label="Password"
      value={password.value}
      onValueChange$={(value) => password.value = value}
      required
      helperText="Must be at least 8 characters"
      showStrength
    />
  );
});
```

### Features

- Password visibility toggle
- Password strength indicator (optional)
- Customizable strength rules and labels
- Comprehensive validation states
- Dark mode support
- Multiple size variants

---

## Checkbox

The `Checkbox` component provides an enhanced checkbox input with customizable styling, states, and accessibility features.

### Import

```tsx
import { Checkbox } from "~/components/Core/Form/Checkbox";
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | - | Whether the checkbox is checked |
| `onChange$` | `QRL<(checked: boolean) => void>` | - | Callback when checked state changes |
| `onValueChange$` | `QRL<(checked: boolean) => void>` | - | Simplified callback for value changes |
| `label` | `string` | - | Label text to display |
| `required` | `boolean` | `false` | Whether the checkbox is required |
| `disabled` | `boolean` | `false` | Whether the checkbox is disabled |
| `id` | `string` | Auto-generated | ID for the checkbox input |
| `name` | `string` | - | Name attribute for the input |
| `value` | `string` | - | Value attribute for the input |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant of the checkbox |
| `error` | `string` | - | Error message to display |
| `helperText` | `string` | - | Helper text to display |
| `inline` | `boolean` | `false` | Whether to display checkbox inline (without label container) |
| `indeterminate` | `boolean` | `false` | Whether to use indeterminate state |
| `class` | `string` | - | Additional CSS classes |
| `aria-label` | `string` | - | ARIA label (required if no visible label) |
| `aria-describedby` | `string` | - | ID of element that describes this checkbox |

### Usage Example

```tsx
import { component$ } from "@builder.io/qwik";
import { useSignal } from "@builder.io/qwik";
import { Checkbox } from "~/components/Core/Form/Checkbox";

export default component$(() => {
  const isAccepted = useSignal(false);
  
  return (
    <Checkbox
      label="I agree to the terms and conditions"
      checked={isAccepted.value}
      onChange$={(checked) => isAccepted.value = checked}
      required
    />
  );
});
```

### Features

- Multiple size variants (sm, md, lg)
- Support for indeterminate state
- Inline variant for custom layouts
- Comprehensive validation states
- Dark mode support
- Accessible implementation

---

## CheckboxGroup

The `CheckboxGroup` component manages a group of related checkbox options, centralizing their state and providing a consistent interface.

### Import

```tsx
import { CheckboxGroup } from "~/components/Core/Form/Checkbox";
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `CheckboxOption[]` | - | Array of checkbox options |
| `selected` | `string[]` | - | Array of selected values |
| `label` | `string` | - | Label for the checkbox group |
| `id` | `string` | Auto-generated | ID for the group |
| `helperText` | `string` | - | Helper text for the group |
| `error` | `string` | - | Error message for the group |
| `name` | `string` | - | Name attribute for all checkboxes |
| `required` | `boolean` | `false` | Whether the group is required |
| `disabled` | `boolean` | `false` | Whether the group is disabled |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | Layout direction |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of all checkboxes |
| `onToggle$` | `QRL<(value: string) => void>` | - | Callback when an option is toggled |
| `onSelectionChange$` | `QRL<(selected: string[]) => void>` | - | Callback when selection changes |
| `class` | `string` | - | Additional CSS classes |

### CheckboxOption Interface

```tsx
interface CheckboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  defaultChecked?: boolean;
  class?: string;
}
```

### Usage Example

```tsx
import { component$ } from "@builder.io/qwik";
import { useSignal } from "@builder.io/qwik";
import { CheckboxGroup } from "~/components/Core/Form/Checkbox";

export default component$(() => {
  const selectedFruits = useSignal(["apple"]);
  
  return (
    <CheckboxGroup
      label="Select your favorite fruits"
      options={[
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "orange", label: "Orange" },
        { value: "grape", label: "Grape", disabled: true }
      ]}
      selected={selectedFruits.value}
      onToggle$={(value) => {
        if (selectedFruits.value.includes(value)) {
          selectedFruits.value = selectedFruits.value.filter(v => v !== value);
        } else {
          selectedFruits.value = [...selectedFruits.value, value];
        }
      }}
      name="fruits"
      required
    />
  );
});
```

### Features

- Horizontal and vertical layouts
- Support for disabled options
- Centralized state management
- Comprehensive validation states
- Accessible implementation with proper ARIA attributes
- Dark mode support

---

## TabNavigation

The `TabNavigation` component provides a flexible and accessible way to create tabbed interfaces with various styling options.

### Import

```tsx
import { TabNavigation } from "~/components/Core/Navigation/TabNavigation";
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `Tab[]` | - | Array of tab items |
| `activeTab` | `string` | - | ID of the active tab |
| `onTabChange$` | `QRL<(tabId: string) => void>` | - | Callback when tab changes |
| `variant` | `'underline' \| 'pills' \| 'boxed' \| 'minimal'` | `'underline'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'start'` | Horizontal alignment of tabs |
| `fullWidth` | `boolean` | `false` | Whether tabs should take full width |
| `disabled` | `boolean` | `false` | Whether the entire component is disabled |
| `ariaLabel` | `string` | `'Tabs'` | ARIA label for the tab list |
| `class` | `string` | - | Additional CSS classes |

### Tab Interface

```tsx
interface Tab {
  id: string;
  label: string;
  icon?: JSXNode;
  disabled?: boolean;
  badge?: string | number;
  badgeColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  class?: string;
}
```

### Usage Example

```tsx
import { component$ } from "@builder.io/qwik";
import { useSignal } from "@builder.io/qwik";
import { TabNavigation } from "~/components/Core/Navigation/TabNavigation";

export default component$(() => {
  const activeTab = useSignal("tab1");
  
  return (
    <div>
      <TabNavigation
        tabs={[
          { id: "tab1", label: "Profile" },
          { id: "tab2", label: "Settings" },
          { id: "tab3", label: "Notifications", badge: "5", badgeColor: "primary" },
          { id: "tab4", label: "Advanced", disabled: true }
        ]}
        activeTab={activeTab.value}
        onTabChange$={(tabId) => activeTab.value = tabId}
        variant="pills"
      />
      
      <div class="p-4 border rounded-md mt-4">
        {activeTab.value === "tab1" && <div>Profile Content</div>}
        {activeTab.value === "tab2" && <div>Settings Content</div>}
        {activeTab.value === "tab3" && <div>Notifications Content</div>}
      </div>
    </div>
  );
});
```

### Features

- Multiple style variants (underline, pills, boxed, minimal)
- Support for icons and badges
- Flexible alignment options
- Full keyboard navigation support
- Comprehensive ARIA attributes for accessibility
- Dark mode support
- Responsive design

---

## Best Practices

### Accessibility

- Always provide labels for form elements
- Use aria-label when visual labels are not present
- Ensure sufficient color contrast for text and interactive elements
- Test keyboard navigation for all interactive components
- Provide helpful error messages for validation failures

### Responsive Design

- All components are designed to be responsive by default
- Use appropriate size variants based on viewport size
- Consider mobile users when designing form layouts

### Dark Mode

- All components support dark mode out of the box
- No additional configuration is needed for dark mode support
- Test your interfaces in both light and dark modes

### Form Validation

- Use the built-in validation features (required, error messages)
- Provide clear error messages that explain how to fix the issue
- Show validation errors after user interaction, not on initial render

### Performance

- Use Qwik's QRL pattern for event handlers (with $ suffix)
- Keep state changes local when possible
- Use signals for reactive state
- Consider lazy loading for complex forms
