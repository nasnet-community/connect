# Kbd Component

The Kbd component displays keyboard keys and key combinations with proper semantic HTML and visual styling.

## Features

- **Semantic HTML**: Uses the native `<kbd>` element for accessibility
- **Multiple visual styles**: Raised (3D), flat, and outlined variants
- **Size variants**: Small, medium, and large sizes
- **OS-specific display**: Automatically shows correct symbols for macOS/Windows/Linux
- **Key combinations**: Group multiple keys with customizable separators
- **Theme-aware**: Adapts to light and dark themes
- **Fully typed**: Complete TypeScript support

## Basic Usage

```tsx
import { Kbd } from '@/components/Core/DataDisplay/Kbd';

// Simple key
<Kbd>Enter</Kbd>

// With size
<Kbd size="sm">Esc</Kbd>

// With variant
<Kbd variant="flat">Tab</Kbd>
```

## Key Combinations

```tsx
import { KbdGroup } from '@/components/Core/DataDisplay/Kbd';

// Basic combination
<KbdGroup keys={['Ctrl', 'C']} />

// With custom separator
<KbdGroup keys={['Cmd', 'K']} separator="-" />

// Multi-step combination
<KbdGroup keys={['Ctrl', 'K', 'Ctrl', 'S']} separator="then" />
```

## OS-Specific Keys

```tsx
// Auto-detect OS and show appropriate symbols
<Kbd osSpecific>Cmd</Kbd> // Shows ⌘ on Mac, Ctrl on Windows

// Force specific OS
<Kbd osSpecific forceOs="mac">Option</Kbd> // Always shows ⌥

// In combinations
<KbdGroup keys={['Cmd', 'Shift', 'P']} osSpecific />
```

## Props

### Kbd Props

| Prop       | Type                               | Default    | Description              |
| ---------- | ---------------------------------- | ---------- | ------------------------ |
| variant    | `'raised' \| 'flat' \| 'outlined'` | `'raised'` | Visual style of the key  |
| size       | `'sm' \| 'md' \| 'lg'`             | `'md'`     | Size of the key          |
| osSpecific | `boolean`                          | `false`    | Show OS-specific symbols |
| forceOs    | `'mac' \| 'windows' \| 'linux'`    | -          | Force specific OS style  |
| class      | `string`                           | -          | Additional CSS classes   |

### KbdGroup Props

| Prop       | Type                               | Default    | Description               |
| ---------- | ---------------------------------- | ---------- | ------------------------- |
| keys       | `string[]`                         | -          | Array of keys to display  |
| separator  | `string`                           | `'+'`      | Separator between keys    |
| variant    | `'raised' \| 'flat' \| 'outlined'` | `'raised'` | Visual style for all keys |
| size       | `'sm' \| 'md' \| 'lg'`             | `'md'`     | Size for all keys         |
| osSpecific | `boolean`                          | `false`    | Show OS-specific symbols  |
| forceOs    | `'mac' \| 'windows' \| 'linux'`    | -          | Force specific OS style   |
| class      | `string`                           | -          | Additional CSS classes    |

## OS-Specific Key Mappings

### macOS Symbols

- Command: ⌘
- Option/Alt: ⌥
- Control: ⌃
- Shift: ⇧
- Caps Lock: ⇪
- Tab: ⇥
- Return/Enter: ⏎
- Delete: ⌫
- Escape: ⎋
- Space: ␣
- Arrows: ← ↑ → ↓

### Windows/Linux

- Cmd → Ctrl
- Option → Alt
- Meta → Win/Super
- Return → Enter
- Delete → Del

## Examples

### In Context

```tsx
// In help text
<p>
  Press <Kbd>Esc</Kbd> to close the dialog
</p>

// In buttons
<button>
  Save <Kbd size="sm" variant="flat">Ctrl+S</Kbd>
</button>

// In search bars
<div class="search-input">
  <input placeholder="Search..." />
  <KbdGroup keys={['Cmd', 'K']} size="sm" />
</div>
```

### Custom Styling

```tsx
// Custom colors
<Kbd class="bg-blue-500 text-white border-blue-600">
  Custom
</Kbd>

// Gradient background
<Kbd class="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
  Gradient
</Kbd>
```

## Accessibility

- Uses semantic `<kbd>` element
- Proper contrast ratios in all themes
- Clear visual indicators for key boundaries
- Screen reader friendly

## Best Practices

1. **Use OS-specific keys** when showing platform shortcuts
2. **Be consistent** with key naming (e.g., always use "Cmd" or "Command")
3. **Consider context** - use smaller sizes in dense UIs
4. **Group related keys** using KbdGroup for combinations
5. **Provide alternatives** for complex shortcuts
