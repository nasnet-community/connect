# Icon Component Usage Guide

## Getting Started

### Basic Import and Usage

```tsx
import { component$ } from "@builder.io/qwik";
import { Icon, HomeIcon } from "~/components/Core/Iconography";

export default component$(() => {
  return (
    <div>
      <Icon icon={HomeIcon} />
    </div>
  );
});
```

## Common Use Cases

### 1. Navigation Icons

Perfect for menu items, breadcrumbs, and navigation elements:

```tsx
// Navigation menu
<nav class="flex space-x-4">
  <a href="/" class="flex items-center space-x-2">
    <Icon icon={HomeIcon} size="sm" color="on-surface" />
    <span>Home</span>
  </a>
  <a href="/settings" class="flex items-center space-x-2">
    <Icon icon={SettingsIcon} size="sm" color="on-surface" />
    <span>Settings</span>
  </a>
</nav>
```

### 2. Button Icons

Enhance buttons with visual context:

```tsx
// Primary action button
<button class="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded">
  <Icon icon={PlusIcon} size="sm" color="inherit" />
  <span>Add Item</span>
</button>

// Icon-only button
<button class="p-2 rounded hover:bg-gray-100">
  <Icon 
    icon={CloseIcon} 
    size="md" 
    interactive 
    label="Close dialog" 
  />
</button>
```

### 3. Status Indicators

Communicate state with semantic colors:

```tsx
// Success message
<div class="flex items-center space-x-2 text-success-700">
  <Icon icon={CheckCircleIcon} size="sm" color="success" />
  <span>Operation completed successfully</span>
</div>

// Error message
<div class="flex items-center space-x-2 text-error-700">
  <Icon icon={ExclamationCircleIcon} size="sm" color="error" />
  <span>An error occurred</span>
</div>
```

### 4. Input Field Icons

Add visual context to form fields:

```tsx
// Search input
<div class="relative">
  <Icon 
    icon={MagnifyingGlassIcon} 
    size="sm" 
    color="muted" 
    class="absolute left-3 top-1/2 transform -translate-y-1/2" 
  />
  <input 
    class="pl-10 pr-4 py-2 border rounded-lg" 
    placeholder="Search..." 
  />
</div>
```

### 5. Data Display

Enhance content with contextual icons:

```tsx
// Feature list
<ul class="space-y-3">
  <li class="flex items-center space-x-3">
    <Icon icon={ShieldCheckIcon} size="sm" color="success" />
    <span>End-to-end encryption</span>
  </li>
  <li class="flex items-center space-x-3">
    <Icon icon={ClockIcon} size="sm" color="info" />
    <span>24/7 support</span>
  </li>
</ul>
```

## Responsive Design Patterns

### Mobile-First Approach

```tsx
// Responsive navigation icon
<Icon 
  icon={MenuIcon} 
  size="md" 
  responsive 
  interactive 
  label="Open menu"
  class="md:hidden" // Only show on mobile
/>
```

### Touch-Friendly Interactions

```tsx
// Mobile-optimized action buttons
<div class="grid grid-cols-2 gap-4 md:flex md:space-x-4">
  <button class="flex items-center justify-center space-x-2 p-4 border rounded-lg">
    <Icon icon={ShareIcon} size="lg" responsive />
    <span>Share</span>
  </button>
  <button class="flex items-center justify-center space-x-2 p-4 border rounded-lg">
    <Icon icon={BookmarkIcon} size="lg" responsive />
    <span>Save</span>
  </button>
</div>
```

## Dark Mode Integration

### Automatic Theme Adaptation

```tsx
// Icons automatically adapt to dark mode
<div class="bg-white dark:bg-gray-900 p-4">
  <Icon icon={SunIcon} color="warning" /> {/* Adapts colors automatically */}
  <Icon icon={MoonIcon} color="info" />
</div>
```

### Manual Theme Control

```tsx
// Explicit dark mode styling
<Icon 
  icon={ThemeIcon} 
  color="on-surface" 
  class="text-gray-900 dark:text-gray-100" 
/>
```

## Accessibility Best Practices

### Meaningful Icons

Always provide labels for icons that convey meaning:

```tsx
// ✅ Good - Meaningful icon with label
<Icon 
  icon={TrashIcon} 
  size="sm" 
  color="error" 
  label="Delete item" 
/>

// ❌ Bad - Meaningful icon without label
<Icon icon={TrashIcon} size="sm" color="error" />
```

### Decorative Icons

Hide decorative icons from screen readers:

```tsx
// ✅ Good - Decorative icon (no label needed)
<h2 class="flex items-center space-x-2">
  <Icon icon={StarIcon} size="sm" color="warning" />
  <span>Featured Content</span>
</h2>
```

### Interactive Icons

Ensure interactive icons are keyboard accessible:

```tsx
// ✅ Good - Interactive icon with proper accessibility
<Icon 
  icon={HeartIcon} 
  size="md" 
  interactive 
  label="Add to favorites"
  onClick$={() => toggleFavorite()}
  onKeyDown$={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleFavorite();
    }
  }}
/>
```

## Performance Optimization

### Tree-Shaking Icons

Import only the icons you need:

```tsx
// ✅ Good - Import specific icons
import { 
  HomeIcon, 
  SettingsIcon, 
  UserIcon 
} from "~/components/Core/Iconography";

// ❌ Bad - Import all icons
import * as Icons from "~/components/Core/Iconography";
```

### Lazy Loading Icons

Use dynamic imports for large icon sets:

```tsx
import { component$, useSignal, $ } from "@builder.io/qwik";

export default component$(() => {
  const iconSet = useSignal<any>(null);
  
  const loadIcons = $(async () => {
    const { AdvancedIconSet } = await import("./advanced-icons");
    iconSet.value = AdvancedIconSet;
  });
  
  return (
    <div>
      <button onClick$={loadIcons}>Load Advanced Icons</button>
      {iconSet.value && <iconSet.value />}
    </div>
  );
});
```

## Advanced Patterns

### Icon with Tooltip

```tsx
<div class="relative group">
  <Icon 
    icon={InfoIcon} 
    size="sm" 
    color="info" 
    interactive 
    label="More information" 
  />
  <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
    Additional details
  </div>
</div>
```

### Icon Badge

```tsx
<div class="relative inline-block">
  <Icon icon={BellIcon} size="lg" color="on-surface" />
  <span class="absolute -top-1 -right-1 h-3 w-3 bg-error-500 rounded-full"></span>
</div>
```

### Animated Icon States

```tsx
import { component$, useSignal } from "@builder.io/qwik";

export default component$(() => {
  const isLoading = useSignal(false);
  
  return (
    <button 
      onClick$={async () => {
        isLoading.value = true;
        await performAction();
        isLoading.value = false;
      }}
      disabled={isLoading.value}
    >
      <Icon 
        icon={isLoading.value ? SpinnerIcon : SaveIcon} 
        size="sm" 
        class={isLoading.value ? "animate-spin" : ""} 
      />
      <span>{isLoading.value ? "Saving..." : "Save"}</span>
    </button>
  );
});
```

## Common Gotchas

### 1. Missing QRL Wrapper

```tsx
// ❌ Wrong - Icon not wrapped with $()
import { HiHomeOutline } from "@qwikest/icons/heroicons";
<Icon icon={HiHomeOutline} />

// ✅ Correct - Icon properly wrapped
import { HomeIcon } from "~/components/Core/Iconography";
<Icon icon={HomeIcon} />
```

### 2. Accessibility Labels

```tsx
// ❌ Wrong - Interactive icon without label
<Icon icon={CloseIcon} interactive onClick$={closeDialog} />

// ✅ Correct - Interactive icon with label
<Icon 
  icon={CloseIcon} 
  interactive 
  label="Close dialog" 
  onClick$={closeDialog} 
/>
```

### 3. Size Consistency

```tsx
// ❌ Wrong - Inconsistent sizes in same context
<div class="flex items-center space-x-2">
  <Icon icon={HomeIcon} size="sm" />
  <Icon icon={SettingsIcon} size="lg" />
</div>

// ✅ Correct - Consistent sizes
<div class="flex items-center space-x-2">
  <Icon icon={HomeIcon} size="sm" />
  <Icon icon={SettingsIcon} size="sm" />
</div>
```

## Testing Icons

### Unit Testing

```tsx
// Example test for icon component
import { createDOM } from "@builder.io/qwik/testing";
import { Icon, HomeIcon } from "~/components/Core/Iconography";

test("should render icon with correct attributes", async () => {
  const { screen, render } = await createDOM();
  
  await render(
    <Icon 
      icon={HomeIcon} 
      size="lg" 
      color="primary" 
      label="Home page" 
    />
  );
  
  const icon = screen.querySelector('[aria-label="Home page"]');
  expect(icon).toBeTruthy();
  expect(icon?.getAttribute('role')).toBe('img');
});
```

### Accessibility Testing

```tsx
// Test with screen reader simulation
test("should be accessible to screen readers", async () => {
  const { screen, render } = await createDOM();
  
  await render(<Icon icon={TrashIcon} label="Delete item" />);
  
  const icon = screen.querySelector('[role="img"]');
  expect(icon?.getAttribute('aria-label')).toBe('Delete item');
  expect(icon?.getAttribute('aria-hidden')).toBeFalsy();
});
```