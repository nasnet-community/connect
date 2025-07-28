# Mobile Optimization Guide

This guide covers the mobile-first design principles and advanced mobile features built into the Core Feedback Components.

## 📱 Mobile-First Philosophy

Our components are designed with a **mobile-first approach**, meaning they work optimally on mobile devices and progressively enhance for larger screens.

### Key Mobile Principles

1. **Touch-First Interactions** - All interactive elements meet or exceed 44px touch targets
2. **Gesture-Driven UX** - Native swipe and gesture support where appropriate  
3. **Performance Optimized** - Hardware-accelerated animations and efficient event handling
4. **Safe Area Aware** - Respects device safe areas (notches, rounded corners)
5. **Responsive by Default** - Automatically adapts to screen sizes and orientations

## 🎯 Touch Target Optimization

### Minimum Touch Target Sizes

All interactive elements automatically meet mobile accessibility standards:

```tsx
// Touch targets are automatically optimized
<Alert dismissible />          // Close button: 44x44px minimum
<Toast dismissible />          // Dismiss area: 44x44px minimum  
<Dialog onClose$ />            // Close button: 44x44px minimum
<Drawer enableSwipeGestures /> // Gesture area: full width/height
```

### Custom Touch Target Sizing

```tsx
import { getTouchTargetClasses } from "../utils/theme";

// Apply touch-friendly sizing to custom elements
const MyButton = component$(() => {
  const touchClasses = getTouchTargetClasses("md"); // 40x40 base, 44x44 on touch
  
  return (
    <button class={cn("btn", touchClasses)}>
      Mobile-Friendly Button
    </button>
  );
});
```

### Touch Target Testing

```tsx
// Visual touch target indicators for development
const TouchTargetDebug = component$(() => {
  return (
    <div class="space-y-4">
      {/* Enable touch target visualization */}
      <style>{`
        .touch-debug .touch-target::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 2px dashed red;
          pointer-events: none;
          min-width: 44px;
          min-height: 44px;
        }
      `}</style>
      
      <div class="touch-debug">
        <Alert dismissible title="Touch target visible in debug mode" />
      </div>
    </div>
  );
});
```

## 🤏 Gesture Recognition System

### Swipe Gestures

Components support native mobile gestures with customizable thresholds and behavior:

```tsx
// Drawer with full gesture support
<Drawer
  isOpen={isOpen}
  onClose$={handleClose}
  placement="bottom"
  enableSwipeGestures        // Enable native gestures
  swipeThreshold={0.3}       // 30% of drawer height triggers close
  swipeVelocityThreshold={0.5} // Velocity-based closing
>
  <DrawerContent>
    {/* Content that can be swiped to dismiss */}
  </DrawerContent>
</Drawer>
```

### Toast Swipe-to-Dismiss

```tsx
// Toast with mobile gesture support
const MobileToastExample = component$(() => {
  const toast = useToast();
  
  return (
    <button
      onClick$={() => {
        toast.success("Swipe to dismiss on mobile!", {
          enableSwipeGesture: true,    // Enable swipe to dismiss
          swipeDirection: "horizontal", // horizontal | vertical | both
          hapticFeedback: true,        // Trigger haptic feedback
        });
      }}
    >
      Show Swipeable Toast
    </button>
  );
});
```

### Advanced Gesture Configuration

```tsx
// Custom gesture thresholds and behavior
const AdvancedGestureDrawer = component$(() => {
  const isOpen = useSignal(false);
  
  return (
    <Drawer
      isOpen={isOpen.value}
      onClose$={() => (isOpen.value = false)}
      placement="right"
      enableSwipeGestures
      gestureConfig={{
        // Distance threshold (percentage of drawer size)
        distanceThreshold: 0.4,     // 40% of drawer width
        
        // Velocity threshold (pixels per millisecond)
        velocityThreshold: 0.5,     // Fast swipe triggers close
        
        // Touch sensitivity
        touchStartThreshold: 20,    // Minimum movement to start gesture
        
        // Visual feedback during gesture
        enableVisualFeedback: true, // Show drag progress
        
        // Haptic feedback
        hapticFeedback: {
          start: true,              // Haptic on gesture start
          progress: false,          // Haptic during drag
          complete: true,           // Haptic on close
        },
      }}
    >
      <DrawerContent>Advanced gesture drawer</DrawerContent>
    </Drawer>
  );
});
```

## 📱 Safe Area Support

### Automatic Safe Area Handling

Components automatically respect device safe areas:

```tsx
// Components automatically handle safe areas
<Toast position="top-center" />     // Respects status bar
<Toast position="bottom-center" />  // Respects home indicator

<Dialog size="responsive" />        // Respects notch and corners
<Drawer placement="top" />          // Accounts for status bar
<Drawer placement="bottom" />       // Accounts for home indicator
```

### Manual Safe Area Control

```tsx
import { getSafeAreaClasses } from "../utils/theme";

// Apply safe area padding manually
const SafeAreaExample = component$(() => {
  return (
    <div class={cn("fixed inset-0", getSafeAreaClasses("all"))}>
      {/* Content respects all safe areas */}
    </div>
  );
});

// Specific safe area control
const HeaderWithSafeArea = component$(() => {
  return (
    <header class={cn("fixed top-0 left-0 right-0", getSafeAreaClasses("top"))}>
      {/* Only respects top safe area (status bar, notch) */}
    </header>
  );
});
```

### Safe Area CSS Variables

Use CSS custom properties for precise control:

```css
/* Available safe area variables */
.safe-area-aware {
  padding-top: env(safe-area-inset-top);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
}

/* Component-specific safe areas */
.mobile-dialog {
  margin-top: max(1rem, env(safe-area-inset-top));
  margin-bottom: max(1rem, env(safe-area-inset-bottom));
}
```

## 🎨 Responsive Design System

### Breakpoint-Aware Components

Components automatically adapt to different screen sizes:

```tsx
// Single component, multiple behaviors
<Dialog size="responsive">
  {/* 
    Mobile: Fullscreen modal with safe area padding
    Tablet: Centered modal with max-width
    Desktop: Traditional dialog with shadows
  */}
</Dialog>

<Alert size="md">
  {/* 
    Mobile: Compact padding, smaller text
    Tablet: Balanced spacing
    Desktop: Generous padding, larger text
  */}
</Alert>
```

### Custom Responsive Behavior

```tsx
import { getResponsiveSizeClasses } from "../utils/theme";

// Create responsive custom components
const ResponsiveCard = component$<{ size: "sm" | "md" | "lg" }>((props) => {
  const sizeClasses = getResponsiveSizeClasses(props.size, "alert");
  
  return (
    <div class={cn(
      "rounded-lg border bg-white dark:bg-gray-800",
      sizeClasses,
      // Mobile-specific styles
      "mobile:rounded-none mobile:border-x-0",
      // Tablet and up
      "tablet:rounded-lg tablet:border",
    )}>
      <Slot />
    </div>
  );
});
```

### Breakpoint Utilities

```tsx
// Available responsive utilities
const ResponsiveUtilities = component$(() => {
  return (
    <div class={cn(
      // Mobile first (default)
      "p-2 text-sm",
      
      // Tablet (768px+)
      "tablet:p-4 tablet:text-base",
      
      // Desktop (1024px+)  
      "desktop:p-6 desktop:text-lg",
      
      // Large desktop (1280px+)
      "xl:p-8 xl:text-xl",
    )}>
      Responsive content
    </div>
  );
});
```

## ⚡ Performance Optimization

### Hardware-Accelerated Animations

All animations use hardware acceleration for smooth performance:

```tsx
// Animations automatically use GPU acceleration
<Alert animation="slideDown" />  // transform3d, will-change: transform
<Toast animation="slideUp" />    // GPU-accelerated transforms
<Dialog animation="scaleUp" />   // Hardware-accelerated scaling
```

### Animation Performance Configuration

```tsx
// Control animation performance
const PerformanceAwareDialog = component$(() => {
  return (
    <Dialog
      isOpen={isOpen}
      animation="fadeIn"
      animationConfig={{
        duration: 200,           // Faster on mobile
        easing: "ease-out",      // Smooth easing
        useTransform3d: true,    // Force hardware acceleration
        respectReducedMotion: true, // Honor user preferences
      }}
    >
      <DialogBody>Content</DialogBody>
    </Dialog>
  );
});
```

### Efficient Event Handling

Touch events are handled efficiently with passive listeners:

```tsx
// Automatic passive event listeners for better scrolling
<Drawer enableSwipeGestures />  // Uses passive: false only when needed

// Manual control for custom implementations
const efficientTouchHandler = $((event: TouchEvent) => {
  // Only preventDefault when necessary
  if (shouldPreventDefault(event)) {
    event.preventDefault();
  }
});
```

### Memory Management

Components automatically clean up resources:

```tsx
// Automatic cleanup of event listeners and timers
const CleanComponent = component$(() => {
  const autoClosingAlert = useSignal(true);
  
  return (
    <Alert
      isVisible={autoClosingAlert.value}
      autoCloseDuration={5000}
      // Automatically cleans up timer when component unmounts
      onDismiss$={() => (autoClosingAlert.value = false)}
    />
  );
});
```

## 📐 Layout Optimization

### Mobile-First Layouts

```tsx
// Stack on mobile, side-by-side on larger screens
const ResponsiveLayout = component$(() => {
  return (
    <div class="flex flex-col tablet:flex-row gap-4">
      <div class="flex-1">
        <Alert status="info" title="Primary content" />
      </div>
      <div class="tablet:w-80">
        <Alert status="warning" title="Sidebar content" />
      </div>
    </div>
  );
});
```

### Container Queries (Future-Ready)

```tsx
// Using container queries for component-level responsiveness
const ContainerAwareComponent = component$(() => {
  return (
    <div class="container-card">
      <style>{`
        .container-card {
          container-type: inline-size;
        }
        
        @container (min-width: 300px) {
          .alert-content {
            display: flex;
            align-items: center;
            gap: 1rem;
          }
        }
        
        @container (max-width: 299px) {
          .alert-content {
            display: block;
            text-align: center;
          }
        }
      `}</style>
      
      <Alert>
        <div class="alert-content">
          Container query responsive content
        </div>
      </Alert>
    </div>
  );
});
```

## 🔍 Mobile Testing Strategy

### Device Testing Checklist

```tsx
// Test component across different mobile scenarios
const MobileTestSuite = component$(() => {
  return (
    <div class="space-y-6 p-4">
      <section>
        <h3>Portrait Mode Tests</h3>
        <Alert dismissible title="Test touch targets in portrait" />
        <Toast position="top-center" />
      </section>
      
      <section>
        <h3>Landscape Mode Tests</h3>
        <Dialog size="responsive">
          <DialogBody>Test dialog in landscape</DialogBody>
        </Dialog>
      </section>
      
      <section>
        <h3>Gesture Tests</h3>
        <Drawer placement="bottom" enableSwipeGestures>
          <DrawerContent>Test swipe to close</DrawerContent>
        </Drawer>
      </section>
      
      <section>
        <h3>Safe Area Tests</h3>
        <div class="fixed inset-0 p-safe">
          <Alert title="Safe area test" />
        </div>
      </section>
    </div>
  );
});
```

### Automated Mobile Testing

```tsx
// Test utilities for mobile behavior
export const MobileTestHelpers = {
  // Simulate touch events
  simulateTouch: (element: Element, type: 'start' | 'move' | 'end') => {
    const touch = new Touch({
      identifier: 1,
      target: element,
      clientX: 100,
      clientY: 100,
    });
    
    const event = new TouchEvent(`touch${type}`, {
      touches: type === 'end' ? [] : [touch],
      changedTouches: [touch],
    });
    
    element.dispatchEvent(event);
  },
  
  // Test touch target sizes
  validateTouchTargets: (container: Element) => {
    const interactiveElements = container.querySelectorAll('[data-touch-target]');
    const failures: string[] = [];
    
    interactiveElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        failures.push(`Element ${element.tagName} is too small: ${rect.width}x${rect.height}`);
      }
    });
    
    return failures;
  },
  
  // Test safe area support
  testSafeAreas: () => {
    // Mock safe area environment variables
    const root = document.documentElement;
    root.style.setProperty('--safe-area-inset-top', '44px');
    root.style.setProperty('--safe-area-inset-bottom', '34px');
    
    // Test component adaptation
    return {
      top: getComputedStyle(root).getPropertyValue('--safe-area-inset-top'),
      bottom: getComputedStyle(root).getPropertyValue('--safe-area-inset-bottom'),
    };
  },
};
```

## 🎛️ Mobile-Specific Configuration

### Global Mobile Settings

```tsx
// Configure mobile behavior globally
const mobileConfig = {
  // Touch targets
  minTouchTargetSize: 44,        // Minimum touch target size in pixels
  touchTargetPadding: 4,         // Extra padding around touch targets
  
  // Gestures
  swipeThreshold: 0.3,           // Default swipe threshold (30%)
  velocityThreshold: 0.5,        // Velocity threshold for gesture recognition
  
  // Animations
  reducedMotionFallback: true,   // Provide fallbacks for reduced motion
  hardwareAcceleration: true,    // Use hardware acceleration by default
  
  // Safe areas
  respectSafeAreas: true,        // Automatically respect safe areas
  safeAreaPadding: 16,          // Minimum padding in safe areas
  
  // Performance
  passiveListeners: true,        // Use passive listeners where possible
  throttleScrollEvents: true,    // Throttle scroll-based interactions
};

// Apply configuration at app level
<FeedbackProvider mobileConfig={mobileConfig}>
  <App />
</FeedbackProvider>
```

### Component-Level Mobile Overrides

```tsx
// Override mobile behavior per component
<Dialog
  mobileOverrides={{
    fullscreen: true,              // Force fullscreen on mobile
    safeAreaPadding: true,         // Add safe area padding
    swipeToClose: true,            // Enable swipe to close
    hapticFeedback: true,          // Enable haptic feedback
  }}
>
  <DialogBody>Mobile-optimized dialog</DialogBody>
</Dialog>
```

## 🔧 Debugging Mobile Issues

### Mobile Debug Panel

```tsx
const MobileDebugPanel = component$(() => {
  const debugInfo = useStore({
    screenWidth: 0,
    screenHeight: 0,
    devicePixelRatio: 0,
    touchSupport: false,
    safeAreaTop: 0,
    safeAreaBottom: 0,
    orientation: 'portrait',
  });
  
  useVisibleTask$(() => {
    const updateDebugInfo = () => {
      debugInfo.screenWidth = window.innerWidth;
      debugInfo.screenHeight = window.innerHeight;
      debugInfo.devicePixelRatio = window.devicePixelRatio;
      debugInfo.touchSupport = 'ontouchstart' in window;
      debugInfo.orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
      
      // Get safe area values
      const style = getComputedStyle(document.documentElement);
      debugInfo.safeAreaTop = parseInt(style.getPropertyValue('--safe-area-inset-top')) || 0;
      debugInfo.safeAreaBottom = parseInt(style.getPropertyValue('--safe-area-inset-bottom')) || 0;
    };
    
    updateDebugInfo();
    window.addEventListener('resize', updateDebugInfo);
    window.addEventListener('orientationchange', updateDebugInfo);
    
    return () => {
      window.removeEventListener('resize', updateDebugInfo);
      window.removeEventListener('orientationchange', updateDebugInfo);
    };
  });
  
  return (
    <div class="fixed top-0 right-0 bg-black/80 text-white p-2 text-xs z-50">
      <div>Screen: {debugInfo.screenWidth}x{debugInfo.screenHeight}</div>
      <div>DPR: {debugInfo.devicePixelRatio}</div>
      <div>Touch: {debugInfo.touchSupport ? 'Yes' : 'No'}</div>
      <div>Orientation: {debugInfo.orientation}</div>
      <div>Safe Top: {debugInfo.safeAreaTop}px</div>
      <div>Safe Bottom: {debugInfo.safeAreaBottom}px</div>
    </div>
  );
});
```

### Touch Event Debugging

```tsx
const TouchEventDebugger = component$(() => {
  const touchInfo = useStore({
    isActive: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    deltaX: 0,
    deltaY: 0,
  });
  
  const handleTouchStart$ = $((event: TouchEvent) => {
    const touch = event.touches[0];
    touchInfo.isActive = true;
    touchInfo.startX = touch.clientX;
    touchInfo.startY = touch.clientY;
  });
  
  const handleTouchMove$ = $((event: TouchEvent) => {
    if (!touchInfo.isActive) return;
    
    const touch = event.touches[0];
    touchInfo.currentX = touch.clientX;
    touchInfo.currentY = touch.clientY;
    touchInfo.deltaX = touch.clientX - touchInfo.startX;
    touchInfo.deltaY = touch.clientY - touchInfo.startY;
  });
  
  const handleTouchEnd$ = $(() => {
    touchInfo.isActive = false;
  });
  
  return (
    <div
      class="h-64 bg-gray-100 rounded-lg flex items-center justify-center touch-none"
      onTouchStart$={handleTouchStart$}
      onTouchMove$={handleTouchMove$}
      onTouchEnd$={handleTouchEnd$}
    >
      {touchInfo.isActive ? (
        <div class="text-center">
          <div>Delta: {touchInfo.deltaX.toFixed(0)}, {touchInfo.deltaY.toFixed(0)}</div>
          <div>Position: {touchInfo.currentX.toFixed(0)}, {touchInfo.currentY.toFixed(0)}</div>
        </div>
      ) : (
        <div>Touch to debug gestures</div>
      )}
    </div>
  );
});
```

## 📊 Mobile Performance Metrics

### Performance Monitoring

```tsx
// Monitor mobile performance metrics
const MobilePerformanceMonitor = component$(() => {
  const metrics = useStore({
    animationFrameRate: 0,
    touchLatency: 0,
    memoryUsage: 0,
    gestureRecognitionTime: 0,
  });
  
  useVisibleTask$(() => {
    // Monitor animation frame rate
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFrameRate = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        metrics.animationFrameRate = frameCount;
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFrameRate);
    };
    
    measureFrameRate();
    
    // Monitor memory usage (if available)
    if ('memory' in performance) {
      const updateMemory = () => {
        metrics.memoryUsage = (performance as any).memory.usedJSHeapSize / 1024 / 1024;
      };
      
      const interval = setInterval(updateMemory, 5000);
      return () => clearInterval(interval);
    }
  });
  
  return (
    <div class="fixed bottom-0 left-0 bg-green-500/90 text-white p-2 text-xs">
      <div>FPS: {metrics.animationFrameRate}</div>
      <div>Memory: {metrics.memoryUsage.toFixed(1)}MB</div>
      <div>Touch Latency: {metrics.touchLatency}ms</div>
    </div>
  );
});
```

## 🎯 Best Practices Summary

### ✅ Do

- **Design mobile-first**, enhance for larger screens
- **Use semantic sizing** (`sm`, `md`, `lg`) instead of fixed dimensions  
- **Enable gestures** where they enhance UX (drawers, toasts)
- **Test on real devices** regularly
- **Respect user preferences** (reduced motion, high contrast)
- **Provide haptic feedback** for important interactions
- **Use safe area padding** for fullscreen components

### ❌ Don't

- **Assume desktop behavior** will work on mobile
- **Use fixed pixel dimensions** for mobile layouts
- **Ignore touch target sizes** (minimum 44px)
- **Override native scrolling** unnecessarily  
- **Forget landscape orientation** testing
- **Use hover states** as primary interaction method
- **Block native gestures** (pinch-to-zoom, swipe navigation)

### 🎯 Performance Tips

- **Use hardware acceleration** for animations
- **Implement passive listeners** for scroll events
- **Debounce gesture handlers** to prevent excessive firing
- **Cleanup event listeners** on component unmount
- **Optimize for 60fps** animations
- **Use `will-change`** sparingly and remove after animations
- **Prefer CSS transforms** over layout-affecting properties

---

**Next Steps:**
- Review [Theme Customization Guide](./ThemeCustomization.md) for mobile-specific theming
- Check [Accessibility Guide](./AccessibilityGuide.md) for mobile accessibility best practices  
- See [Performance Guide](./PerformanceGuide.md) for advanced optimization techniques