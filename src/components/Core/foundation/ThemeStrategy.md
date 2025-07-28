# Dark/Light Mode Implementation Strategy

This document outlines the approach for implementing dark and light themes within the Connect application.

## Core Implementation

### 1. Tailwind Configuration

The project uses Tailwind CSS with the following configurations:

```js
// tailwind.config.js
export default {
  darkMode: "class", // Use class strategy for dark mode
  theme: {
    extend: {
      // Theme tokens defined for both light and dark modes
    },
  },
};
```

- The `darkMode: "class"` setting enables the class-based dark mode approach
- This allows us to manually control dark mode instead of relying solely on the user's system preferences

### 2. Theme Toggle Component

The application includes a `ThemeToggle` component that:

- Allows users to toggle between "light", "dark", and "system" preferences
- Stores the user's preference in localStorage
- Respects the system preference when set to "system"
- Listens for changes in system preference to update accordingly

### 3. Application of Dark Theme

The dark theme is applied by adding the `dark` class to the `html` element:

```js
// For dark mode
document.documentElement.classList.add("dark");

// For light mode
document.documentElement.classList.remove("dark");

// For system preference
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
document.documentElement.classList.toggle("dark", prefersDark);
```

## Component Design for Dark Mode

All components should be designed with both light and dark modes in mind:

### 1. Token-Based Theming

Use semantic tokens from the Tailwind configuration:

```jsx
// Avoid hard-coded colors
<div class="bg-white text-gray-900">...</div>

// Use semantic tokens instead
<div class="bg-surface text-text-default dark:bg-surface-dark dark:text-text-dark-default">...</div>
```

### 2. Dark Mode Variants

Use Tailwind's dark mode variant for styling:

```jsx
<button class="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
  Toggle
</button>
```

### 3. Testing Dark Mode

All components should be tested in both light and dark modes to ensure:

- Sufficient color contrast for accessibility
- All UI elements are clearly visible
- No unintended color combinations

## Design System Support

### 1. Color Tokens

The design system provides tokens for both light and dark modes:

- Default colors for light mode
- Dark variant colors with the `dark:` prefix

### Standard Naming Patterns for Dark Mode Variants

Consistent naming patterns for dark mode variants help maintain a coherent codebase. Follow these standards:

#### Token-Level Naming Patterns

| Light Mode Pattern | Dark Mode Pattern       | Example                                              |
| ------------------ | ----------------------- | ---------------------------------------------------- |
| `{token}`          | `{token}-dark`          | `bg-surface` → `bg-surface-dark`                     |
| `{token}-{weight}` | `{token}-dark-{weight}` | `bg-surface-secondary` → `bg-surface-dark-secondary` |
| `text-{token}`     | `text-{token}-dark`     | `text-text` → `text-text-dark`                       |
| `border-{token}`   | `border-{token}-dark`   | `border-border` → `border-border-dark`               |

#### Example Mapping of Light to Dark Tokens

| UI Element       | Light Mode Token              | Dark Mode Token                |
| ---------------- | ----------------------------- | ------------------------------ |
| Background       | `bg-white` or `bg-background` | `bg-background-dark`           |
| Surface          | `bg-surface`                  | `bg-surface-dark`              |
| Text             | `text-text-default`           | `text-text-dark-default`       |
| Text Secondary   | `text-text-secondary`         | `text-text-dark-secondary`     |
| Text Muted       | `text-text-muted`             | `text-text-dark-muted`         |
| Border           | `border-border`               | `border-border-dark`           |
| Border Secondary | `border-border-secondary`     | `border-border-dark-secondary` |

### 2. Storybook Integration

Storybook is configured to support both themes:

- Toggle between dark and light mode for component previews
- All component stories should demonstrate both modes

### 3. Documentation

Component documentation includes:

- Examples of components in both light and dark modes
- Guidance on appropriate color token usage
- Any special considerations for dark mode

### 4. Dark Mode Tailwind Classes Usage Guidelines

When implementing dark mode using Tailwind classes, follow these best practices:

#### Basic Dark Mode Syntax

```jsx
<div class="text-text-default bg-white dark:bg-surface-dark dark:text-text-dark-default">
  Content that changes in dark mode
</div>
```

#### Do's and Don'ts

**Do:**

- Use the `dark:` prefix for all styles that should change in dark mode
- Group light and dark mode classes for the same property together (e.g., `text-black dark:text-white`)
- Use semantic color tokens instead of direct color values
- Test all components in both light and dark themes
- Consider all interactive states (hover, focus, active) in both light and dark modes

**Don't:**

- Forget to add dark mode variants for background, text, border colors and shadows
- Use hard-coded color values instead of theme tokens
- Assume dark mode is just inverting colors (proper dark mode requires thoughtful color choices)
- Nest dark mode selectors in complex ways that make the code hard to maintain

#### Handling Interactive States in Dark Mode

For hover, focus, and other interactive states:

```jsx
<button class="bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-500">
  Button with hover state in both modes
</button>
```

#### Handling Complex Components

For components with multiple elements, ensure each element has appropriate dark mode styling:

```jsx
<div class="rounded-lg border border-border bg-white shadow-md dark:border-border-dark dark:bg-surface-dark dark:shadow-sm">
  <div class="border-b border-border p-4 dark:border-border-dark">
    <h3 class="text-text-default text-lg font-semibold dark:text-text-dark-default">
      Card Title
    </h3>
  </div>
  <div class="p-4">
    <p class="text-text-secondary dark:text-text-dark-secondary">
      Card content with proper dark mode styling
    </p>
  </div>
</div>
```

#### Using CSS Variables with Dark Mode

For complex cases, CSS variables can be combined with dark mode classes:

```css
/* In your CSS */
:root {
  --primary-bg: theme("colors.primary.500");
  --primary-text: theme("colors.white");
}

.dark {
  --primary-bg: theme("colors.primary.600");
  --primary-text: theme("colors.neutral.50");
}
```

Then in your HTML/JSX:

```jsx
<div class="bg-[var(--primary-bg)] text-[var(--primary-text)]">...</div>
```

## RTL Support with Dark Mode

For right-to-left (RTL) languages like Arabic and Persian:

- Dark mode should work seamlessly with RTL layouts
- Components should handle the combination of RTL + dark mode properly
- Testing should include RTL layouts in dark mode

## Implementation Guide for Developers

When building new components:

1. Use semantic color tokens instead of direct color values
2. Add dark mode variants for all color-related classes
3. Test component in both light and dark modes
4. Ensure state changes (hover, focus, active) work in both modes
5. Maintain sufficient contrast ratios in both modes for accessibility

## Performance Considerations

- The dark mode implementation minimizes unnecessary re-renders
- Theme switching should be instantaneous
- Dark mode styling is included in the initial CSS payload but conditionally applied

## Browser Support

This implementation supports all modern browsers:

- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers on iOS and Android
- Legacy browsers may fall back to light mode
