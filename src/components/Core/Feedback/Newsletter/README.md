# Newsletter Component

A modern, professional newsletter subscription component with support for multiple layout variants, RTL/LTR text direction, and responsive design optimized for mobile, tablet, and desktop devices.

## Features

- ✨ **Multiple Layout Variants**: Vertical, horizontal, and responsive layouts
- 🌍 **RTL/LTR Support**: Full internationalization with logical CSS properties
- 📱 **Mobile Optimized**: Touch-friendly interactions and responsive design
- 🎨 **Modern Design**: Glassmorphism effects, brand colors, and animations
- ♿ **Accessible**: WCAG AA compliant with proper ARIA labels
- 🔧 **Customizable**: Extensive theming and configuration options
- 🖼️ **Logo Integration**: Built-in NASNET Connect logo support
- ✅ **Form Validation**: Real-time email validation with error states
- 🎯 **TypeScript**: Fully typed with comprehensive interfaces

## Basic Usage

```tsx
import { Newsletter } from "~/components/Core";

export default component$(() => {
  const handleSubscription$ = $(async (subscription) => {
    // Handle newsletter subscription
    console.log("New subscription:", subscription);

    // Send to your API
    await fetch("/api/newsletter/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
    });
  });

  return (
    <Newsletter
      title="Stay Updated"
      description="Get the latest router configuration tips and updates."
      onSubscribe$={handleSubscription$}
    />
  );
});
```

## Layout Variants

### Responsive (Default)
Automatically adapts to screen size - vertical on mobile, horizontal on desktop.

```tsx
<Newsletter variant="responsive" />
```

### Vertical
Logo and content stacked vertically. Perfect for sidebars and narrow spaces.

```tsx
<Newsletter variant="vertical" />
```

### Horizontal
Logo and content side-by-side. Ideal for headers and wide content areas.

```tsx
<Newsletter variant="horizontal" />
```

## Themes and Styling

### Brand Theme (Default)
Uses your primary and secondary brand colors.

```tsx
<Newsletter
  themeColors={true}
  theme="branded"
/>
```

### Glassmorphism Effect
Modern glass-like appearance with backdrop blur.

```tsx
<Newsletter
  glassmorphism={true}
  theme="glass"
/>
```

### Custom Styling
```tsx
<Newsletter
  theme="dark"
  surfaceElevation="elevated"
  animated={true}
  class="custom-newsletter"
/>
```

## Device Optimization

### Mobile Features
- Touch-optimized input fields (44px minimum height)
- Large tap targets for buttons
- Optimized spacing and typography
- Vertical layout on small screens

### Tablet & Desktop
- Horizontal layouts where appropriate
- Enhanced visual hierarchy
- Hover effects and animations
- Larger typography options

## RTL/LTR Support

The component automatically adapts to text direction using logical CSS properties:

```tsx
// Works seamlessly in RTL environments
<Newsletter
  title="اشترك في النشرة الإخبارية"
  description="احصل على آخر النصائح والتحديثات"
/>
```

## Size Variants

```tsx
{/* Compact for tight spaces */}
<Newsletter size="sm" compact={true} />

{/* Standard size */}
<Newsletter size="md" />

{/* Large for hero sections */}
<Newsletter size="lg" />
```

## Advanced Features

### Custom Content
```tsx
<Newsletter
  title="Router Security Updates"
  description="Critical security patches and configuration tips."
  placeholder="your.email@example.com"
  buttonText="Get Updates"
  privacyNoticeText="We'll never share your email. GDPR compliant."
/>
```

### External State Control
```tsx
export default component$(() => {
  const isLoading = useSignal(false);
  const isSuccess = useSignal(false);
  const error = useSignal<string | null>(null);

  return (
    <Newsletter
      loading={isLoading.value}
      success={isSuccess.value}
      error={error.value}
      onSubscribe$={handleSubscription$}
    />
  );
});
```

### Without Logo
```tsx
<Newsletter
  showLogo={false}
  title="Technical Newsletter"
  description="For network administrators and router enthusiasts."
/>
```

## API Reference

### NewsletterProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'vertical' \| 'horizontal' \| 'responsive'` | `'responsive'` | Layout variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size |
| `title` | `string` | `'Stay Connected'` | Newsletter title |
| `description` | `string` | `'Subscribe to get...'` | Description text |
| `placeholder` | `string` | `'Enter your email...'` | Input placeholder |
| `buttonText` | `string` | `'Subscribe'` | Button text |
| `onSubscribe$` | `QRL<(subscription) => Promise<void>>` | - | Subscription handler |
| `showLogo` | `boolean` | `true` | Show NASNET logo |
| `glassmorphism` | `boolean` | `false` | Enable glassmorphism |
| `themeColors` | `boolean` | `true` | Use theme colors |
| `theme` | `'light' \| 'dark' \| 'glass' \| 'branded'` | `'branded'` | Theme variant |
| `disabled` | `boolean` | `false` | Disable component |
| `showPrivacyNotice` | `boolean` | `true` | Show privacy notice |
| `loading` | `boolean` | - | External loading state |
| `success` | `boolean` | - | External success state |
| `error` | `string` | - | External error message |
| `touchOptimized` | `boolean` | `true` | Touch-friendly sizing |
| `compact` | `boolean` | `false` | Reduced padding |
| `fullWidth` | `boolean` | `false` | Full container width |
| `animated` | `boolean` | `true` | Enable animations |

### NewsletterSubscription

```typescript
interface NewsletterSubscription {
  email: string;
  timestamp: Date;
  source?: string;
}
```

## Hook Usage

For advanced use cases, you can use the `useNewsletter` hook directly:

```tsx
import { useNewsletter } from "~/components/Core";

export default component$(() => {
  const {
    email,
    loading,
    error,
    success,
    isValid,
    handleEmailInput$,
    handleSubmit$,
    reset$,
  } = useNewsletter({
    onSubscribe$: handleSubscription$,
    validateEmail: true,
  });

  // Custom implementation using the hook...
});
```

## Accessibility

The Newsletter component follows WCAG AA guidelines:

- Proper ARIA labels and descriptions
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management
- Error announcements

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Examples

See the `/Examples` folder for comprehensive usage examples:

- `BasicNewsletter.tsx` - Simple usage patterns
- `NewsletterVariants.tsx` - Advanced variants and themes

## Contributing

When extending the Newsletter component:

1. Follow the existing TypeScript patterns
2. Ensure RTL compatibility using logical properties
3. Test on mobile, tablet, and desktop
4. Update this documentation
5. Add comprehensive examples

## Related Components

- `PromoBanner` - For promotional content
- `Alert` - For system messages
- `Dialog` - For modal interactions
- `Input` - For form fields