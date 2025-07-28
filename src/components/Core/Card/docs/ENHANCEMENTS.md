# Card Component Enhancements

## Overview

The Card component has been enhanced with improved responsive design, new variants, and better accessibility features while maintaining backward compatibility.

## New Features

### 1. Enhanced Responsive Design

- **Mobile-first breakpoints**: Uses `mobile:`, `tablet:`, `desktop:` utilities from tailwind config
- **Fluid spacing**: Responsive padding that adapts to screen size
- **Container queries**: Support for `@container` queries for component-level responsiveness
- **Touch-friendly**: Minimum 44px touch targets for mobile devices

### 2. New Card Variants

- **success**: Green-themed card for success messages
- **warning**: Yellow-themed card for warnings
- **error**: Red-themed card for error states
- **info**: Blue-themed card for informational content
- **glass**: Glass morphism effect with backdrop blur
- **gradient**: Gradient background using primary colors

### 3. Improved Accessibility

- **ARIA attributes**: Support for `role`, `aria-label`, and `aria-labelledby`
- **Focus states**: Enhanced `focus-visible` styles for keyboard navigation
- **Data attributes**: `data-testid` and `data-card-variant` for testing
- **Semantic HTML**: Proper semantic structure with default `role="article"`

## Usage Examples

### Basic Usage

```tsx
<Card variant="success" hasHeader>
  <span q:slot="header">Success!</span>
  <p>Your changes have been saved.</p>
</Card>
```

### Glass Effect Card

```tsx
<Card variant="glass" hasHeader hasFooter hasActions>
  <span q:slot="header">Glass Card</span>
  <p>Beautiful glass morphism effect</p>
  <span q:slot="footer">Footer</span>
  <span q:slot="actions">
    <Button size="sm">Action</Button>
  </span>
</Card>
```

### Accessible Card

```tsx
<Card
  variant="info"
  role="region"
  aria-label="Important information"
  data-testid="info-card"
>
  <p>Important information goes here</p>
</Card>
```

### Container Query Support

```tsx
<Card variant="elevated" containerClass="max-w-2xl mx-auto">
  <p>This card uses container queries for responsive design</p>
</Card>
```

## Props

### New Props

- `role?: string` - ARIA role attribute (default: "article")
- `aria-label?: string` - Accessible label for the card
- `aria-labelledby?: string` - ID of element that labels the card
- `data-testid?: string` - Test identifier
- `data-card-variant?: string` - Custom variant identifier
- `containerClass?: string` - Classes for container query wrapper

### Updated Variants

- `variant?: CardVariant` - Now includes: "default" | "bordered" | "elevated" | "success" | "warning" | "error" | "info" | "glass" | "gradient"

## Migration Guide

The component maintains full backward compatibility. Existing usage will continue to work without changes. To take advantage of new features:

1. Update variant usage for semantic cards
2. Add accessibility props where appropriate
3. Use containerClass for container query support

## Browser Support

- All modern browsers
- Container queries require Chrome 105+, Firefox 110+, Safari 16+
- Fallbacks provided for older browsers
