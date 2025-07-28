# Icon Component Overview

The Icon component is a foundational element of the Connect design system, providing a consistent and accessible way to display icons throughout the application. Built with Qwik's resumability in mind, it offers comprehensive support for responsive design, dark mode, and accessibility features.

## Key Features

### 🎨 **Comprehensive Design System Integration**
- Seamless integration with the Connect theme system
- Full support for light, dark, and high-contrast modes
- Semantic color variants that adapt to context

### 📱 **Mobile-First Responsive Design**
- Touch-friendly sizing with 44px minimum touch targets
- Adaptive sizing across mobile, tablet, and desktop
- Optimized for various screen densities and orientations

### ♿ **Accessibility Excellence**
- WCAG 2.1 AA compliant
- Screen reader optimized with proper ARIA attributes
- Keyboard navigation support for interactive icons
- High contrast mode support

### ⚡ **Performance Optimized**
- Leverages Qwik's resumability for instant loading
- Tree-shaking support to minimize bundle size
- Efficient CSS-in-JS with minimal runtime overhead

## Design Principles

### **Consistency**
All icons follow a consistent visual language using HeroIcons as the foundation, ensuring harmony across the entire application.

### **Scalability**
The component supports 8 different sizes from micro (2xs) to hero (3xl), adapting to various use cases and contexts.

### **Flexibility**
Multiple configuration options allow for customization while maintaining design system consistency.

### **Accessibility**
Built with accessibility as a priority, not an afterthought, ensuring all users can interact with icons effectively.

## Usage Guidelines

### **When to Use Icons**
- ✅ Enhance navigation and wayfinding
- ✅ Provide visual context for actions
- ✅ Support content categorization
- ✅ Indicate status or state changes

### **When to Avoid Icons**
- ❌ As the sole method of communication (always pair with text for important actions)
- ❌ When the meaning isn't universally understood
- ❌ In dense layouts where they add visual noise

### **Best Practices**
1. **Pair with text** for important actions and navigation
2. **Use consistent sizing** within the same interface context
3. **Leverage semantic colors** to convey meaning
4. **Ensure adequate spacing** around interactive icons
5. **Test with screen readers** to verify accessibility

## Component Variants

### **Sizes**
- `2xs` (10px) - Micro icons for dense interfaces
- `xs` (12px) - Small UI elements and inline content
- `sm` (16px) - Compact layouts and secondary actions
- `md` (20px) - Standard size for most use cases
- `lg` (24px) - Prominent elements and primary actions
- `xl` (32px) - Large features and hero sections
- `2xl` (40px) - Hero elements and major visual impact
- `3xl` (48px) - Maximum impact for hero sections

### **Colors**
- `current` - Inherits text color (default)
- `primary` - Brand primary color
- `secondary` - Brand secondary color
- `success` - Success states and positive actions
- `warning` - Warning states and cautions
- `error` - Error states and destructive actions
- `info` - Informational content
- `muted` - Subdued, secondary content
- `on-surface` - High contrast on surface
- `on-surface-variant` - Medium contrast on surface
- `inverse` - Inverted color for dark backgrounds

### **Interactive States**
When `interactive={true}` is enabled, icons automatically include:
- Hover effects with subtle scaling and background
- Focus management with keyboard navigation
- Active states with press feedback
- Touch-optimized targets for mobile devices

## Technical Implementation

### **Framework Integration**
Built specifically for Qwik with:
- Component$ wrapper for optimal resumability
- QRL-based icon loading for lazy loading
- useStyles$ for efficient CSS injection

### **Responsive Behavior**
Mobile-first approach with:
- Larger touch targets on mobile devices
- Adaptive sizing based on screen size
- Orientation-aware adjustments

### **Dark Mode**
Automatic dark mode support through:
- Theme-aware color variants
- High contrast mode compatibility
- Print-friendly optimizations

## Browser Support

- **Modern Browsers**: Full support for all features
- **Older Browsers**: Graceful degradation with core functionality
- **Screen Readers**: Comprehensive support for assistive technologies
- **Touch Devices**: Optimized for touch interaction patterns

## Performance Characteristics

- **Initial Load**: ~2KB gzipped for base component
- **Runtime**: Minimal JavaScript execution
- **Memory**: Efficient rendering with shared styles
- **Bundle Impact**: Tree-shakeable icon imports