# Rating Component

A flexible rating component that allows users to select numeric values using stars or custom icons. The component supports half-star precision, keyboard navigation, and various customization options.

## Features

- **Star Rating**: Default star icons with customizable appearance
- **Half-Star Precision**: Support for 0.5 increments for more granular ratings
- **Custom Icons**: Replace default stars with any custom icon component
- **Keyboard Navigation**: Full keyboard support with arrow keys, numbers, and shortcuts
- **Size Variants**: Small, medium, and large sizes
- **Read-Only Mode**: Display ratings without interaction
- **Clear Functionality**: Option to clear rating by clicking the current value
- **Accessibility**: Full ARIA support with labels and descriptions
- **Form Integration**: Hidden input for form submissions
- **Dark Mode**: Automatic dark mode support
- **Hover Effects**: Visual feedback on hover
- **Custom Labels**: Text labels for each rating value

## Usage

### Basic Rating

```tsx
import { Rating } from "@/components/Core/Form/Rating";

<Rating
  value={rating.value}
  onValueChange$={(value) => {
    rating.value = value || 0;
  }}
  label="Rate your experience"
/>;
```

### Half-Star Precision

```tsx
<Rating value={2.5} precision={0.5} label="Rate with half stars" showValue />
```

### Custom Icons

```tsx
const HeartIcon = component$<{ filled: boolean }>(({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"}>
    <path d="..." />
  </svg>
));

<Rating
  value={rating.value}
  icon={<HeartIcon filled={true} />}
  emptyIcon={<HeartIcon filled={false} />}
  label="Rate with hearts"
/>;
```

### With Form States

```tsx
<Rating
  value={2}
  label="Product rating"
  error="Please rate at least 3 stars"
  required
/>

<Rating
  value={4}
  label="Service rating"
  successMessage="Thank you for your feedback!"
/>
```

### Custom Labels

```tsx
<Rating
  value={rating.value}
  labels={["Terrible", "Bad", "OK", "Good", "Excellent"]}
  onValueChange$={(value) => {
    rating.value = value || 0;
  }}
  label="How was your meal?"
/>
```

## Props

| Prop             | Type                                                 | Default | Description                                       |
| ---------------- | ---------------------------------------------------- | ------- | ------------------------------------------------- |
| `value`          | `number`                                             | -       | Current rating value (controlled)                 |
| `defaultValue`   | `number`                                             | `0`     | Default value for uncontrolled component          |
| `max`            | `number`                                             | `5`     | Maximum rating value                              |
| `precision`      | `0.5 \| 1`                                           | `1`     | Rating precision (1 for full stars, 0.5 for half) |
| `size`           | `"sm" \| "md" \| "lg"`                               | `"md"`  | Size variant                                      |
| `readOnly`       | `boolean`                                            | `false` | Whether the rating is read-only                   |
| `disabled`       | `boolean`                                            | `false` | Whether the rating is disabled                    |
| `allowClear`     | `boolean`                                            | `false` | Allow clearing by clicking current value          |
| `icon`           | `any`                                                | -       | Custom icon for filled state                      |
| `emptyIcon`      | `any`                                                | -       | Custom icon for empty state                       |
| `labels`         | `string[]`                                           | -       | Text labels for each rating value                 |
| `label`          | `string`                                             | -       | Field label                                       |
| `helperText`     | `string`                                             | -       | Helper text below the rating                      |
| `error`          | `string`                                             | -       | Error message                                     |
| `required`       | `boolean`                                            | `false` | Whether the field is required                     |
| `showValue`      | `boolean`                                            | `false` | Show numeric value display                        |
| `onValueChange$` | `QRL<(value: number \| null) => void>`               | -       | Value change handler                              |
| `onChange$`      | `QRL<(event: Event, value: number \| null) => void>` | -       | Standard change handler                           |
| `onHoverChange$` | `QRL<(value: number \| null) => void>`               | -       | Hover change handler                              |

## Keyboard Navigation

- **Arrow Left/Down**: Decrease rating
- **Arrow Right/Up**: Increase rating
- **Number Keys (0-9)**: Jump to specific rating
- **Home**: Jump to minimum rating (0)
- **End**: Jump to maximum rating
- **Delete/Backspace**: Clear rating (if `allowClear` is enabled)
- **Tab**: Navigate to/from the component

## Accessibility

The Rating component is fully accessible:

- Uses `role="slider"` with appropriate ARIA attributes
- Provides `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`
- Includes `aria-valuetext` with human-readable value
- Supports `aria-label` and `aria-describedby`
- Keyboard navigation follows ARIA slider patterns
- Screen reader announcements for value changes

## Styling

The component uses Tailwind CSS classes and supports:

- Dark mode automatically
- Custom class names via the `class` prop
- Size variants with predefined text sizes
- Hover and focus states
- Smooth transitions for interactions

## Examples

See `Examples/BasicRating.tsx` for comprehensive examples including:

- Basic usage
- Half-star ratings
- Size variants
- Custom icons
- Form states
- Read-only display
- Custom maximum values
- Keyboard navigation demo
