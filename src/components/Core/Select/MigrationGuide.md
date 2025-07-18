# Migration Guide: VPNSelect to UnifiedSelect

This document provides instructions for migrating from the VPNSelect component to the new UnifiedSelect component.

## Overview

The UnifiedSelect component is a consolidated version that combines both the original Select and VPNSelect components into a single, flexible component. It supports both a native HTML select mode (equivalent to VPNSelect) and a custom UI mode (equivalent to Select).

## Migration Path for VPNSelect Users

### Quick Migration

For the fastest migration with minimal changes:

```tsx
// BEFORE: Using VPNSelect
import { VPNSelect } from '~/components/Core/Select/VPNSelect/VPNSelect';

<VPNSelect
  options={options}
  value={value}
  label="Protocol"
  onChange$={handleChange}
  required={true}
  error="Please select a protocol"
/>

// AFTER: Using UnifiedSelect in native mode
import { UnifiedSelect } from '~/components/Core/Select/UnifiedSelect';

<UnifiedSelect
  options={options}
  value={value}
  label="Protocol"
  onChange$={handleChange}
  required={true}
  errorMessage="Please select a protocol"
  mode="native"
/>
```

### Key Changes

1. **Import Path**: 
   - Change from `~/components/Core/Select/VPNSelect/VPNSelect` to `~/components/Core/Select/UnifiedSelect`

2. **Component Name**: 
   - Change from `VPNSelect` to `UnifiedSelect`

3. **New Properties**:
   - Add `mode="native"` to maintain the native HTML select behavior
   
4. **Renamed Properties**:
   - Change `error` to `errorMessage`

5. **Default Properties**:
   - Note that some default property values might be different - check the documentation

### Property Mapping

| VPNSelect Property | UnifiedSelect Property | Notes |
|-------------------|------------------------|-------|
| `options`         | `options`              | Same format |
| `value`           | `value`                | Same usage |
| `name`            | `name`                 | Same usage |
| `id`              | `id`                   | Same usage |
| `class`           | `class`                | Same usage |
| `required`        | `required`             | Same usage |
| `disabled`        | `disabled`             | Same usage |
| `placeholder`     | `placeholder`          | Same usage |
| `label`           | `label`                | Same usage |
| `onChange$`       | `onChange$`            | Same functionality |
| `error`           | `errorMessage`         | Renamed for clarity |
| `helper`          | `helperText`           | Renamed for clarity |
| N/A               | `mode`                 | New - set to "native" to match VPNSelect behavior |
| N/A               | `validation`           | New - set to "invalid" when providing errorMessage |

## Enhancing the Migration

Once you've completed the basic migration, you can take advantage of new features:

### 1. Validation States

```tsx
// Add explicit validation state
<UnifiedSelect
  options={options}
  value={value}
  mode="native"
  validation={isValid ? "valid" : hasError ? "invalid" : "default"}
  errorMessage={hasError ? "Please select a protocol" : undefined}
/>
```

### 2. Size Variants

```tsx
// Choose from size variants
<UnifiedSelect
  options={options}
  value={value}
  mode="native"
  size="sm" // Options: "sm", "md", "lg"
/>
```

### 3. Consider Custom Mode

If your use case would benefit from enhanced features:

```tsx
// Enhanced features with custom mode
<UnifiedSelect
  options={options}
  value={value}
  searchable={true} // Enable search functionality
  mode="custom"     // Use custom UI
/>
```

## Multiple Select Support

The UnifiedSelect component supports multiple selection:

```tsx
// Multiple selection
<UnifiedSelect
  options={options}
  value={selectedValues} // Array of values
  multiple={true}
/>
```

## Option Groups

Organize options into logical groups:

```tsx
const groupedOptions = [
  { value: "openvpn", label: "OpenVPN", group: "Standard Protocols" },
  { value: "wireguard", label: "WireGuard", group: "Standard Protocols" },
  { value: "ipsec", label: "IPSec", group: "Enterprise Protocols" },
];

<UnifiedSelect
  options={groupedOptions}
  value={value}
  mode="native" // or "custom"
/>
```

## Testing Your Migration

After migration:

1. **Test Form Submission**: Ensure the form still submits correctly with the selected value
2. **Test Validation**: Check that validation messages display properly
3. **Test Styling**: Verify that the component respects your styling customizations
4. **Test Accessibility**: Confirm that accessibility features still work properly

## Component Reference

For complete API reference, see:

- [UnifiedSelect.types.ts](./UnifiedSelect.types.ts) - Full TypeScript interface
- [UnifiedSelect.tsx](./UnifiedSelect.tsx) - Component implementation
- [UnifiedSelect.stories.tsx](./UnifiedSelect.stories.tsx) - Usage examples

## Need Help?

If you encounter any issues during migration, please consult the component audit documentation or reach out to the team for assistance.
