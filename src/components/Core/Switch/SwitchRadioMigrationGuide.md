# Switch & Radio Components Migration Guide

This document provides guidance for migrating from the old Switch and RadioButton implementations to the new unified components in the Connect design system.

## Component Changes Overview

### Switch/Toggle Components

1. **Original Components:**

   - `Switch` in `Core/Switch/Switch.tsx`
   - `RadioButtonSwitch` in `Core/Switch/RadioButtonSwitch.tsx`

2. **New Components:**
   - `Toggle` in `Core/Toggle/Toggle.tsx` - A unified toggle component
   - The original `Switch` is still available for backward compatibility

### Radio Components

1. **Original Components:**

   - `RadioGroup` in `Core/Form/RadioGroup/RadioGroup.tsx`
   - No standalone Radio button component

2. **New Components:**
   - `Radio` in `Core/Radio/Radio.tsx` - A standalone radio button
   - `RadioGroup` in `Core/Radio/RadioGroup.tsx` - An enhanced radio group

## Migration Instructions

### Migrating from Switch to Toggle

The original `Switch` component is still available for backward compatibility, but we recommend using the new `Toggle` component for new code:

```tsx
// Old
import { Switch } from "../Core/Switch";

<Switch
  checked={isDarkMode}
  onChange$={(checked) => setDarkMode(checked)}
  label="Dark Mode"
  size="md"
/>;

// New
import { Toggle } from "../Core/Toggle";

<Toggle
  checked={isDarkMode}
  onChange$={(checked) => setDarkMode(checked)}
  label="Dark Mode"
  size="md"
/>;
```

### Migrating from RadioButtonSwitch to Toggle

Despite its name, the `RadioButtonSwitch` was functionally a toggle switch, not a radio button:

```tsx
// Old
import { RadioButtonSwitch } from "../Core/Switch/RadioButtonSwitch";

<RadioButtonSwitch
  checked={isEnabled}
  onChange$={(checked) => setEnabled(checked)}
  label="Enable feature"
  size="md"
/>;

// New
import { Toggle } from "../Core/Toggle";

<Toggle
  checked={isEnabled}
  onChange$={(checked) => setEnabled(checked)}
  label="Enable feature"
  size="md"
/>;
```

### Migrating to the new RadioGroup

The new `RadioGroup` uses a more consistent API:

```tsx
// Old
import { RadioGroup } from "../Core/Form/RadioGroup/RadioGroup";

<RadioGroup
  options={[
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ]}
  value={selectedValue}
  name="options"
  onChange$={(value) => setSelectedValue(value)}
  direction="horizontal"
/>;

// New
import { RadioGroup } from "../Core/Radio/RadioGroup";

<RadioGroup
  options={[
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ]}
  value={selectedValue}
  name="options"
  onChange$={(value) => setSelectedValue(value)}
  direction="horizontal"
/>;
```

### Using the new standalone Radio component

The new system provides a standalone `Radio` component:

```tsx
import { Radio } from "../Core/Radio";

<Radio
  value="option1"
  name="options"
  checked={selectedValue === "option1"}
  onChange$={(value) => setSelectedValue(value)}
  label="Option 1"
  size="md"
/>;
```

## Property Mapping

### Switch/Toggle Properties

| Original Switch | New Toggle         | Notes                      |
| --------------- | ------------------ | -------------------------- |
| `checked`       | `checked`          | No change                  |
| `onChange$`     | `onChange$`        | No change                  |
| `label`         | `label`            | No change                  |
| `labelPosition` | `labelPosition`    | No change                  |
| `size`          | `size`             | No change                  |
| `disabled`      | `disabled`         | No change                  |
| `name`          | `name`             | No change                  |
| `value`         | `value`            | No change                  |
| `required`      | `required`         | No change                  |
| `class`         | `class`            | No change                  |
| `id`            | `id`               | No change                  |
| -               | `aria-label`       | New accessibility property |
| -               | `aria-describedby` | New accessibility property |

### RadioButtonSwitch to Toggle Properties

| RadioButtonSwitch | New Toggle      | Notes                              |
| ----------------- | --------------- | ---------------------------------- |
| `checked`         | `checked`       | No change                          |
| `onChange$`       | `onChange$`     | No change                          |
| `label`           | `label`         | No change                          |
| -                 | `labelPosition` | New in Toggle, defaults to "right" |
| `size`            | `size`          | No change                          |
| `disabled`        | `disabled`      | No change                          |
| `name`            | `name`          | No change                          |
| -                 | `value`         | New in Toggle                      |
| -                 | `required`      | New in Toggle                      |
| `class`           | `class`         | No change                          |
| `id`              | `id`            | No change                          |

### RadioGroup Properties

| Original RadioGroup | New RadioGroup     | Notes                      |
| ------------------- | ------------------ | -------------------------- |
| `options`           | `options`          | No change                  |
| `value`             | `value`            | No change                  |
| `name`              | `name`             | No change                  |
| `label`             | `label`            | No change                  |
| `required`          | `required`         | No change                  |
| `disabled`          | `disabled`         | No change                  |
| `error`             | `error`            | No change                  |
| `class`             | `class`            | No change                  |
| `direction`         | `direction`        | No change                  |
| `onChange$`         | `onChange$`        | No change                  |
| -                   | `helperText`       | New property               |
| -                   | `size`             | New property               |
| -                   | `id`               | New property               |
| -                   | `aria-label`       | New accessibility property |
| -                   | `aria-describedby` | New accessibility property |

## Styling Changes

The new components use semantic design tokens instead of direct color values:

- **Old:** `text-gray-900 dark:text-gray-300`
- **New:** `text-text-primary dark:text-text-dark-primary`

This makes them more consistent with the overall design system and easier to theme.

## Best Practices

1. **When to use Toggle vs Radio:**

   - Use `Toggle` for binary on/off states
   - Use `Radio`/`RadioGroup` for selecting one option from multiple choices

2. **Accessibility:**

   - Always provide labels for toggles and radio buttons
   - Use `aria-label` when a visible label is not present
   - Group related radio buttons using `RadioGroup`
   - Ensure proper keyboard navigation

3. **Form Integration:**
   - Always provide a `name` attribute for form submission
   - Use the `required` prop when the field is mandatory
   - Show validation states using the `error` prop

## Example Migration Scenarios

### Migrating a Settings Form

```tsx
// Before
<div>
  <h3>Notification Settings</h3>
  <Switch
    checked={emailNotifications}
    onChange$={(checked) => setEmailNotifications(checked)}
    label="Email Notifications"
  />
  <RadioButtonSwitch
    checked={darkMode}
    onChange$={(checked) => setDarkMode(checked)}
    label="Dark Mode"
  />
  <RadioGroup
    options={[
      { value: "daily", label: "Daily" },
      { value: "weekly", label: "Weekly" },
      { value: "monthly", label: "Monthly" },
    ]}
    value={frequency}
    name="frequency"
    label="Update Frequency"
    onChange$={(value) => setFrequency(value)}
  />
</div>

// After
<div>
  <h3>Notification Settings</h3>
  <Toggle
    checked={emailNotifications}
    onChange$={(checked) => setEmailNotifications(checked)}
    label="Email Notifications"
  />
  <Toggle
    checked={darkMode}
    onChange$={(checked) => setDarkMode(checked)}
    label="Dark Mode"
  />
  <RadioGroup
    options={[
      { value: "daily", label: "Daily" },
      { value: "weekly", label: "Weekly" },
      { value: "monthly", label: "Monthly" },
    ]}
    value={frequency}
    name="frequency"
    label="Update Frequency"
    onChange$={(value) => setFrequency(value)}
    helperText="How often would you like to receive updates?"
  />
</div>
```

## Common Issues and Troubleshooting

1. **Styling differences:**

   - The new components use semantic tokens which may appear slightly different
   - Adjust custom styling to use design tokens rather than direct color values

2. **Event handling:**

   - Both old and new components use Qwik's event handler pattern with the `$` suffix
   - Ensure your event handlers are properly wrapped with `$()` when extracted

3. **Form integration:**
   - The new components better support standard form behavior
   - Test form submission with the migrated components
