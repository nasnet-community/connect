# Card Component Audit

This document provides a comprehensive audit of the Card component family in the Connect project.

## Component Overview

The Card component family consists of:

1. **Card.tsx**: A versatile card container component with multiple variants and features.
2. **ServerCard.tsx**: A specialized card component designed specifically for server and VPN configurations.

## Card Component Details

### Props

| Prop       | Type                                  | Default   | Description                                       |
| ---------- | ------------------------------------- | --------- | ------------------------------------------------- |
| variant    | 'default' \| 'bordered' \| 'elevated' | 'default' | Visual style of the card                          |
| class      | string                                | -         | Additional CSS classes                            |
| hasHeader  | boolean                               | false     | Whether the card has a header section             |
| hasFooter  | boolean                               | false     | Whether the card has a footer section             |
| hasActions | boolean                               | false     | Whether the card has action buttons in the footer |
| loading    | boolean                               | false     | Whether to show a loading spinner                 |
| noPadding  | boolean                               | false     | Whether to remove padding from the card body      |

### Variants

The card supports 3 visual variants:

1. **Default**: Standard card with regular border

   - Light mode: `border border-gray-200 bg-white`
   - Dark mode: `dark:border-gray-700 dark:bg-gray-800`

2. **Bordered**: Card with thicker border for emphasis

   - Light mode: `border-2 border-gray-300 bg-white`
   - Dark mode: `dark:border-gray-600 dark:bg-gray-800`

3. **Elevated**: Card with shadow effect for a raised appearance
   - Light mode: `border border-gray-200 bg-white shadow-md`
   - Dark mode: `dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900/20`

### Sections

The card supports several optional sections:

1. **Header**: Appears at the top with border-bottom separator

   - Styling: `border-b border-gray-200 dark:border-gray-700 px-4 py-3 md:px-6 md:py-4`

2. **Body**: Main content area

   - Styling: Padding controlled by `noPadding` prop
   - Default padding: `p-4 md:p-6` (responsive)

3. **Footer**: Appears at the bottom with border-top separator

   - Styling: `border-t border-gray-200 dark:border-gray-700 px-4 py-3 md:px-6 md:py-4`

4. **Actions**: Optional section within footer for buttons
   - Styling: `flex items-center gap-2`

### States

The card supports a loading state with overlay spinner:

- Full-width overlay with semi-transparent background
- Centered spinner with primary color
- z-index to ensure it appears above content

### Slot Support

The card uses Qwik's Slot mechanism for content:

```tsx
<Card hasHeader hasFooter hasActions>
  <h3 q:slot="header">Card Title</h3>
  Main content goes here
  <p q:slot="footer">Footer content</p>
  <div q:slot="actions">
    <Button>Action</Button>
  </div>
</Card>
```

## ServerCard Component Details

### Props

| Prop       | Type    | Default         | Description                           |
| ---------- | ------- | --------------- | ------------------------------------- |
| title      | string  | required        | Card title                            |
| enabled    | boolean | -               | Whether the server/feature is enabled |
| onToggle$  | QRL     | -               | Toggle handler for enabled state      |
| icon       | any     | HiServerOutline | Icon component or QRL                 |
| class      | string  | -               | Additional CSS classes                |
| titleClass | string  | -               | Additional CSS classes for title area |

### Features

The ServerCard has specific features for server configuration:

1. **Icon + Title Header**: Standard header with icon and title text
2. **Toggle Switch**: Optional enable/disable toggle switch
3. **Content Area**: Slot for main content

### Styling

The ServerCard uses a consistent style:

- Rounded corners: `rounded-xl`
- Border and background: `border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800`
- Shadow: `shadow-sm`
- Padding: `p-5`

## Audit Results

### Variants Testing

| Variant  | Light Mode                                 | Dark Mode                               | Status |
| -------- | ------------------------------------------ | --------------------------------------- | ------ |
| Default  | ✅ Clean, standard card with subtle border | ✅ Appropriate dark mode colors         | Passed |
| Bordered | ✅ Emphasized border for additional focus  | ✅ Visible but not harsh in dark mode   | Passed |
| Elevated | ✅ Shadow provides depth and hierarchy     | ✅ Shadow adjusted for dark backgrounds | Passed |

### Section Testing

| Section | Rendering                         | Responsive Behavior              | Status |
| ------- | --------------------------------- | -------------------------------- | ------ |
| Header  | ✅ Clear visual separation        | ✅ Responsive padding adjustment | Passed |
| Body    | ✅ Properly contains main content | ✅ Responsive padding            | Passed |
| Footer  | ✅ Clear visual separation        | ✅ Responsive padding            | Passed |
| Actions | ✅ Properly aligned on right side | ✅ Maintains alignment on resize | Passed |

### State Testing

| State   | Behavior                 | Visual Feedback                          | Status |
| ------- | ------------------------ | ---------------------------------------- | ------ |
| Default | ✅ Renders card content  | ✅ Clean visual style based on variant   | Passed |
| Loading | ✅ Shows loading spinner | ✅ Semi-transparent overlay with spinner | Passed |

### ServerCard Testing

| Feature         | Behavior                   | Visual Feedback                 | Status |
| --------------- | -------------------------- | ------------------------------- | ------ |
| Title with Icon | ✅ Displays title and icon | ✅ Proper alignment and spacing | Passed |
| Toggle Switch   | ✅ Toggles enabled state   | ✅ Visual toggle with animation | Passed |
| Content Area    | ✅ Displays slot content   | ✅ Proper spacing               | Passed |

### Accessibility Testing

| Feature            | Implementation                                         | Status            |
| ------------------ | ------------------------------------------------------ | ----------------- |
| Semantic Structure | ⚠️ No semantic headings enforced                       | Needs improvement |
| Color Contrast     | ✅ Good contrast in both modes                         | Passed            |
| Focus States       | ⚠️ No specific focus handling for interactive elements | Needs improvement |
| ARIA Support       | ⚠️ Missing loading state announcement                  | Needs improvement |

### Responsiveness Testing

Both card components adapt well to different screen sizes:

- The Card component uses responsive padding: `p-4 md:p-6`
- Header and footer sections also adjust padding at breakpoints
- The rounded corners work well across screen sizes
- No content overflow issues observed

### Dark Mode Support

| Feature           | Implementation                                | Status |
| ----------------- | --------------------------------------------- | ------ |
| Background Colors | ✅ `bg-white` → `dark:bg-gray-800`            | Passed |
| Border Colors     | ✅ `border-gray-200` → `dark:border-gray-700` | Passed |
| Text Colors       | ✅ Text color adaptations (in usage examples) | Passed |
| Shadow            | ✅ `shadow-md` → `dark:shadow-gray-900/20`    | Passed |

## Issues and Recommendations

1. **Direct Color Usage**

   - Issue: Uses gray-\* color values directly rather than semantic tokens
   - Recommendation: Replace with semantic tokens from the design system
   - Example: `bg-white` → `bg-surface-default`, `dark:bg-gray-800` → `dark:bg-surface-dark`

2. **Accessibility Improvements**

   - Issue: Missing ARIA attributes for loading state
   - Recommendation: Add `aria-busy="true"` and `aria-live="polite"` when loading

3. **Toggle Switch in ServerCard**

   - Issue: Toggle implementation duplicates functionality from Switch component
   - Recommendation: Use the core Switch component instead of reimplementing

4. **Icon Handling**

   - Issue: ServerCard accepts any icon type which can be brittle
   - Recommendation: Standardize icon handling across components

5. **Semantic Structure**
   - Issue: No semantic enforcement for headings (h1-h6)
   - Recommendation: Provide better heading guidance in documentation or component API

## Action Items

1. **Update Color Usage:**

   - Replace hardcoded color values with semantic design tokens
   - Example: Replace `bg-gray-800` with `bg-surface-dark`

2. **Improve Accessibility:**

   - Add ARIA attributes for loading state
   - Improve documentation for semantic heading usage

3. **Consolidate Components:**

   - Consider abstracting shared functionality between Card and ServerCard
   - Standardize toggle switch usage

4. **API Enhancement:**

   - Consider adding size variants (sm, md, lg)
   - Add hover/focus states for interactive cards

5. **Documentation:**
   - Create more usage examples
   - Document how to handle interactive cards
   - Provide responsive behavior guidelines
