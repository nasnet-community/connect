# Mobile Optimizations for DataDisplay Components

This document outlines the mobile-specific optimizations implemented for the Card and Table components in the DataDisplay module.

## Overview

The mobile optimizations focus on creating touch-friendly, performant, and accessible experiences for mobile devices. All optimizations follow mobile-first design principles and leverage the custom utilities defined in `tailwind.config.js`.

## Features Implemented

### 1. Safe Area Spacing

Components now support iOS and Android safe area insets to prevent content from being hidden behind notches, home indicators, and navigation bars.

#### Implementation:

- `safe-top`: `env(safe-area-inset-top)`
- `safe-bottom`: `env(safe-area-inset-bottom)`
- `safe-left`: `env(safe-area-inset-left)`
- `safe-right`: `env(safe-area-inset-right)`

#### Usage:

```tsx
<Card mobileSafeArea className="pb-safe-bottom">
  Content that respects device safe areas
</Card>
```

### 2. Mobile Animations

Enhanced animations optimized for mobile interactions and performance.

#### Available Animations:

- `animate-fade-in`: 0.2s fade in effect
- `animate-slide-up`: 0.3s slide up from bottom
- `animate-press`: 0.2s press down effect
- `animate-lift`: 0.2s lift up effect

#### Touch-Specific Animations:

- Press animations on touch start
- Scale transformations for interactive feedback
- Smooth transitions with hardware acceleration

#### Usage:

```tsx
<Card
  touchFeedback
  mobileOptimized
  className="animate-fade-in motion-safe:animate-slide-up"
>
  Interactive card with mobile animations
</Card>
```

### 3. Touch-Friendly Interactions

Implemented comprehensive touch gesture support with appropriate feedback.

#### Features:

- Touch press states with visual feedback
- Swipe gesture detection (left, right, up, down)
- Long press recognition
- Pinch/zoom gesture support
- Touch manipulation optimization

#### Implementation:

```tsx
// Card component with touch feedback
<Card
  interactive
  touchFeedback
  onTouchStart$={handleTouchStart$}
  onTouchEnd$={handleTouchEnd$}
>
  Content
</Card>

// Advanced touch gestures
<TouchGesture
  onSwipeLeft$={() => console.log('Swiped left')}
  onSwipeRight$={() => console.log('Swiped right')}
  onLongPress$={() => console.log('Long pressed')}
>
  <div>Gesture-enabled content</div>
</TouchGesture>
```

### 4. Mobile-Specific Shadows

Optimized shadow system for mobile devices with performance considerations.

#### Shadow Classes:

- `mobile-card`: `0 2px 4px 0 rgb(0 0 0 / 0.05)` - Subtle card shadows
- `mobile-nav`: `0 -2px 10px 0 rgb(0 0 0 / 0.1)` - Navigation bar shadows

#### Usage:

```tsx
<Card elevation="md" className="mobile:shadow-mobile-card">
  Card with mobile-optimized shadows
</Card>
```

### 5. Table Mobile Layout

Responsive table component that automatically switches to card layout on mobile devices.

#### Features:

- Automatic desktop/mobile layout switching
- Card-based mobile layout for better readability
- Column visibility control for mobile
- Touch-optimized row interactions
- Preserved sorting and filtering functionality

#### Implementation:

```tsx
<MobileOptimizedTable
  data={tableData}
  columns={[
    {
      id: "name",
      header: "Name",
      field: "name",
      mobileLabel: "Full Name", // Custom label for mobile
      hideOnMobile: false, // Show on mobile
    },
    {
      id: "details",
      header: "Details",
      field: "details",
      hideOnMobile: true, // Hide on mobile
      hideOn: { sm: true }, // Hide on small screens
    },
  ]}
  mobileLayout="card" // Use card layout on mobile
  mobileSafeArea // Apply safe area padding
/>
```

### 6. Backdrop Blur for Overlays

Enhanced overlay components with proper backdrop blur support.

#### Features:

- Hardware-accelerated backdrop blur
- Configurable blur intensity
- Performance optimizations for mobile
- Smooth fade-in/out transitions

#### Implementation:

```tsx
<MobileOverlay
  isOpen={showOverlay.value}
  onClose$={() => (showOverlay.value = false)}
  backdropBlur // Enable backdrop blur
  safeArea // Respect safe areas
>
  <div>Overlay content</div>
</MobileOverlay>
```

## Performance Considerations

### Hardware Acceleration

- All animations use `transform` and `opacity` properties
- GPU acceleration enabled for smooth performance
- Minimal layout thrashing

### Reduced Motion Support

- Respects `prefers-reduced-motion` media query
- Provides alternative non-animated states
- Maintains accessibility compliance

### Touch Optimization

- `touch-manipulation` CSS property applied
- Prevents 300ms click delay
- Optimized for touch scrolling

## Accessibility Features

### Screen Reader Support

- Proper ARIA labels and roles
- Touch gesture alternatives for keyboard users
- Focus management for overlay components

### High Contrast Mode

- Supports `prefers-contrast: high` media query
- Enhanced color ratios for better visibility
- Appropriate focus indicators

## Responsive Breakpoints

The components use the following breakpoints defined in `tailwind.config.js`:

- `mobile`: 360px - Small phones
- `mobile-md`: 475px - Standard phones
- `tablet`: 768px - Tablets
- `desktop`: 1024px - Desktop and up

### Device-Specific Variants:

- `touch`: Devices with touch capability
- `can-hover`: Devices with hover capability
- `portrait`: Portrait orientation
- `landscape`: Landscape orientation

## Usage Examples

### Basic Mobile-Optimized Card

```tsx
<Card
  elevation="md"
  interactive
  touchFeedback
  mobileOptimized
  className="p-4 mobile:p-3"
>
  <h3>Mobile-First Card</h3>
  <p>Content adapts to mobile devices</p>
</Card>
```

### Responsive Data Table

```tsx
<MobileOptimizedTable
  data={users}
  columns={userColumns}
  mobileLayout="card"
  mobileSafeArea
  hoverable
  onRowClick$={(user) => console.log("Selected user:", user)}
/>
```

### Touch Gesture Component

```tsx
<TouchGesture
  onSwipeLeft$={handleNextItem}
  onSwipeRight$={handlePrevItem}
  onLongPress$={handleOptions}
>
  <Card>Swipeable content</Card>
</TouchGesture>
```

### Mobile Overlay

```tsx
<MobileOverlay
  isOpen={isOpen.value}
  onClose$={() => (isOpen.value = false)}
  backdropBlur
  safeArea
>
  <div className="p-6">
    <h2>Mobile-Optimized Modal</h2>
    <p>With backdrop blur and safe area support</p>
  </div>
</MobileOverlay>
```

## Browser Support

- iOS Safari 12+
- Chrome Mobile 70+
- Firefox Mobile 68+
- Samsung Internet 10+
- Edge Mobile 79+

## Migration Guide

### From Standard Card to Mobile-Optimized Card

```tsx
// Before
<Card className="p-4">Content</Card>

// After
<Card
  className="p-4 mobile:p-3"
  mobileOptimized
  touchFeedback
>
  Content
</Card>
```

### From Standard Table to Mobile-Optimized Table

```tsx
// Before
<Table data={data} columns={columns} />

// After
<MobileOptimizedTable
  data={data}
  columns={enhancedColumns}
  mobileLayout="card"
  mobileSafeArea
/>
```

## Best Practices

1. **Always test on real devices** - Emulators don't capture all mobile nuances
2. **Use safe area padding** - Especially for full-screen components
3. **Implement touch feedback** - Users expect immediate visual response
4. **Consider gesture conflicts** - Be mindful of system gestures
5. **Optimize for thumb navigation** - Place interactive elements within thumb reach
6. **Test with reduced motion** - Ensure accessibility compliance
7. **Use appropriate shadows** - Mobile-specific shadows perform better

## Future Enhancements

- [ ] Haptic feedback integration
- [ ] Advanced gesture recognition (rotation, multi-finger)
- [ ] PWA-specific optimizations
- [ ] Voice interaction support
- [ ] Foldable device support
- [ ] Advanced animation choreography
