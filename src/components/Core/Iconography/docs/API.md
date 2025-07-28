# Icon Component API Reference

## Props

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `icon` | `QRL<any>` | The icon to display - should be a QRL created with $() from an icon component |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `IconSize` | `"md"` | Size of the icon with extended size options |
| `color` | `IconColor` | `"current"` | Color variant for the icon with comprehensive theme support |
| `fixedWidth` | `boolean` | `false` | Whether the icon should have a fixed width (useful for alignment) |
| `responsive` | `boolean` | `false` | Enable responsive sizing that adapts to different screen sizes |
| `interactive` | `boolean` | `false` | Enable interactive behavior with hover, focus, and active states |
| `class` | `string` | `""` | Additional CSS classes to apply to the icon |
| `label` | `string` | `undefined` | Accessible label for the icon (for screen readers) |

### Extended HTML Attributes

The Icon component extends the native `span` element, so it accepts all standard HTML attributes except `children` and `size`.

## Type Definitions

### IconSize

```typescript
type IconSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
```

**Size Reference:**
- `2xs`: 10px (w-2.5 h-2.5) - Micro icons for dense interfaces
- `xs`: 12px (w-3 h-3) - Small UI elements and inline content
- `sm`: 16px (w-4 h-4) - Compact layouts and secondary actions
- `md`: 20px (w-5 h-5) - Standard size for most use cases
- `lg`: 24px (w-6 h-6) - Prominent elements and primary actions
- `xl`: 32px (w-8 h-8) - Large features and hero sections
- `2xl`: 40px (w-10 h-10) - Hero elements and major visual impact
- `3xl`: 48px (w-12 h-12) - Maximum impact for hero sections

### IconColor

```typescript
type IconColor =
  | "inherit"
  | "current"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "muted"
  | "on-surface"
  | "on-surface-variant"
  | "inverse";
```

**Color Reference:**
- `inherit`: No color classes applied
- `current`: Inherits parent text color
- `primary`: Brand primary color (text-primary-600 dark:text-primary-400)
- `secondary`: Brand secondary color (text-secondary-600 dark:text-secondary-400)
- `success`: Success semantic color (text-success-600 dark:text-success-400)
- `warning`: Warning semantic color (text-warning-600 dark:text-warning-400)
- `error`: Error semantic color (text-error-600 dark:text-error-400)
- `info`: Info semantic color (text-info-600 dark:text-info-400)
- `muted`: Subdued gray color (text-gray-500 dark:text-gray-400)
- `on-surface`: High contrast text (text-gray-900 dark:text-gray-100)
- `on-surface-variant`: Medium contrast text (text-gray-700 dark:text-gray-300)
- `inverse`: Inverted color (text-white dark:text-gray-900)

## Extended Interfaces

### IconButtonProps

For icons used as interactive buttons:

```typescript
interface IconButtonProps extends IconProps {
  onClick$?: QRL<() => void>;
  disabled?: boolean;
  loading?: boolean;
}
```

### IconGroupProps

For displaying multiple icons in a group:

```typescript
interface IconGroupProps {
  icons: Array<{
    icon: QRL<any>;
    label?: string;
    id?: string;
  }>;
  size?: IconSize;
  color?: IconColor;
  spacing?: "sm" | "md" | "lg";
  direction?: "horizontal" | "vertical";
}
```

### IconConfig

Configuration interface for icon system:

```typescript
interface IconConfig {
  defaultSize?: IconSize;
  defaultColor?: IconColor;
  defaultResponsive?: boolean;
  responsiveSizes?: Partial<Record<IconSize, {
    mobile: string;
    tablet: string;
    desktop: string;
  }>>;
}
```

## Usage Examples

### Basic Usage

```tsx
import { Icon, HomeIcon } from "~/components/Core/Iconography";

export default component$(() => {
  return <Icon icon={HomeIcon} />;
});
```

### With Custom Size and Color

```tsx
<Icon 
  icon={SuccessIcon} 
  size="lg" 
  color="success" 
  label="Operation successful" 
/>
```

### Responsive Icon

```tsx
<Icon 
  icon={MenuIcon} 
  size="md" 
  responsive 
  interactive 
  label="Open menu" 
/>
```

### Fixed Width for Alignment

```tsx
<div class="flex flex-col">
  <div class="flex items-center">
    <Icon icon={HomeIcon} fixedWidth />
    <span>Home</span>
  </div>
  <div class="flex items-center">
    <Icon icon={SettingsIcon} fixedWidth />
    <span>Settings</span>
  </div>
</div>
```

## CSS Classes Applied

### Base Classes
The component automatically applies these classes:
- `inline-flex` - Flexbox layout
- `items-center` - Center alignment
- `justify-center` - Center justification
- `flex-shrink-0` - Prevent shrinking
- `select-none` - Prevent text selection

### Responsive Classes (when `responsive={true}`)
Dynamic classes based on screen size:
- `mobile:w-* mobile:h-*` - Mobile-specific sizing
- `tablet:w-* tablet:h-*` - Tablet-specific sizing

### Interactive Classes (when `interactive={true}`)
- `icon-interactive` - Base interactive styles
- Touch-optimized minimum sizes on mobile
- Hover, focus, and active state styles

### Accessibility Classes
- `high-contrast:text-black` - High contrast mode
- `print:text-black` - Print optimization

## Event Handling

While the Icon component doesn't directly handle events, you can attach event handlers using standard HTML attributes:

```tsx
<Icon 
  icon={CloseIcon} 
  interactive 
  onClick$={() => console.log('Icon clicked')} 
  onKeyDown$={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      console.log('Icon activated via keyboard');
    }
  }}
/>
```

## Accessibility Features

### ARIA Attributes
- `aria-label`: Applied when `label` prop is provided
- `aria-hidden="true"`: Applied when no label is provided (decorative icons)
- `role="img"`: Applied when label is provided
- `role="button"`: Applied when interactive and labeled

### Keyboard Navigation
- `tabIndex={0}`: Applied when `interactive={true}`
- Focus visible indicators
- Keyboard activation support

### Screen Reader Support
- Proper labeling for meaningful icons
- Hidden decorative icons
- Context-appropriate roles

## Performance Considerations

### Bundle Size
- Tree-shaking friendly icon imports
- Minimal runtime overhead
- Efficient CSS injection

### Runtime Performance
- No unnecessary re-renders
- Optimized class concatenation
- Lazy-loaded icon assets

### Memory Usage
- Shared style injection
- Minimal DOM overhead
- Efficient event handling