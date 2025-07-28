# Troubleshooting Guide

Common issues, solutions, and debugging techniques for Core Feedback Components.

## 🚨 Common Issues & Solutions

### Toast Components

#### Issue: Toasts Not Appearing
**Symptoms:** `useToast()` calls don't show any toasts

**Causes & Solutions:**

1. **Missing ToastContainer**
   ```tsx
   // ❌ Problem: No ToastContainer in app
   export default component$(() => {
     return (
       <html>
         <body>
           <RouterOutlet />
           {/* Missing ToastContainer */}
         </body>
       </html>
     );
   });
   
   // ✅ Solution: Add ToastContainer at root level
   export default component$(() => {
     return (
       <html>
         <body>
           <RouterOutlet />
           <ToastContainer position="top-right" />
         </body>
       </html>
     );
   });
   ```

2. **Incorrect Context Usage**
   ```tsx
   // ❌ Problem: Using useToast outside of ToastContainer context
   const MyComponent = component$(() => {
     const toast = useToast(); // Error: Hook called outside context
     return <div>Content</div>;
   });
   
   // ✅ Solution: Ensure component is rendered within ToastContainer context
   // Make sure ToastContainer is at app root level
   ```

3. **Z-index Issues**
   ```tsx
   // ❌ Problem: Toasts appearing behind other elements
   <ToastContainer position="top-right" />
   
   // ✅ Solution: Increase z-index
   <ToastContainer 
     position="top-right" 
     zIndex={9999}  // Higher than other overlays
   />
   ```

#### Issue: Toast Position Not Working on Mobile
**Symptoms:** Toasts appear in wrong position or are cut off on mobile

**Solutions:**

```tsx
// ✅ Use mobile-aware positioning
<ToastContainer 
  position="top-center"  // Better for mobile than top-right
  mobileOptimized={true}
  style={{
    '--toast-mobile-margin': '1rem', // Custom mobile margins
  }}
/>

// ✅ Check safe area support
.toast-container {
  top: max(1rem, env(safe-area-inset-top));
  left: env(safe-area-inset-left);
  right: env(safe-area-inset-right);
}
```

### Dialog Components

#### Issue: Dialog Not Showing Fullscreen on Mobile
**Symptoms:** Dialog appears as small modal on mobile instead of fullscreen

**Solutions:**

```tsx
// ❌ Problem: Fixed size on mobile
<Dialog 
  isOpen={isOpen}
  size="md"  // Fixed size doesn't adapt
>

// ✅ Solution: Use responsive sizing
<Dialog 
  isOpen={isOpen}
  size="responsive"  // Automatically adapts to screen size
  mobileOverrides={{
    fullscreen: true,
    safeAreaPadding: true,
  }}
>

// ✅ Alternative: Manual responsive control
const ResponsiveDialog = component$(() => {
  const isMobile = useSignal(false);
  
  useVisibleTask$(() => {
    isMobile.value = window.innerWidth < 768;
  });
  
  return (
    <Dialog
      isOpen={isOpen}
      size={isMobile.value ? "full" : "md"}
      class={isMobile.value ? "mobile-fullscreen" : ""}
    >
  );
});
```

#### Issue: Dialog Backdrop Not Clickable
**Symptoms:** Clicking outside dialog doesn't close it

**Solutions:**

```tsx
// ❌ Problem: Missing backdrop click handler
<Dialog isOpen={isOpen} onClose$={handleClose}>

// ✅ Solution: Enable backdrop click
<Dialog 
  isOpen={isOpen} 
  onClose$={handleClose}
  closeOnBackdropClick={true}  // Enable backdrop click
  closeOnEsc={true}           // Also enable ESC key
>

// ✅ Check for event stopPropagation issues
const handleDialogContent = $((event: MouseEvent) => {
  // Don't stop propagation if you want backdrop clicks to work
  // event.stopPropagation(); // ❌ This prevents backdrop clicks
});
```

### Drawer Components

#### Issue: Swipe Gestures Not Working
**Symptoms:** Drawer doesn't respond to swipe gestures on mobile

**Causes & Solutions:**

1. **Gestures Not Enabled**
   ```tsx
   // ❌ Problem: Gestures disabled by default
   <Drawer isOpen={isOpen} placement="left">
   
   // ✅ Solution: Enable gestures explicitly
   <Drawer 
     isOpen={isOpen} 
     placement="left"
     enableSwipeGestures={true}
   >
   ```

2. **Touch Events Blocked**
   ```tsx
   // ❌ Problem: CSS preventing touch events
   .drawer-content {
     pointer-events: none; /* Blocks touch events */
   }
   
   // ✅ Solution: Allow touch events
   .drawer-content {
     pointer-events: auto;
     touch-action: pan-y; /* Allow vertical scrolling, block horizontal */
   }
   ```

3. **Threshold Too High**
   ```tsx
   // ❌ Problem: Swipe threshold too strict
   <Drawer 
     enableSwipeGestures
     swipeThreshold={0.8}  // 80% - too hard to achieve
   >
   
   // ✅ Solution: Use reasonable threshold
   <Drawer 
     enableSwipeGestures
     swipeThreshold={0.3}  // 30% - easier to trigger
     swipeVelocityThreshold={0.5}  // Also consider velocity
   >
   ```

4. **Conflicting Event Handlers**
   ```tsx
   // ❌ Problem: Other handlers preventing gestures
   <div 
     onTouchStart$={(e) => e.preventDefault()} // Blocks gesture detection
   >
     <Drawer enableSwipeGestures>
   
   // ✅ Solution: Don't prevent touch events on gesture areas
   <div 
     onTouchStart$={(e) => {
       // Only prevent if really necessary
       if (shouldPreventDefault(e)) {
         e.preventDefault();
       }
     }}
   >
   ```

### Alert Components

#### Issue: Auto-dismiss Not Working
**Symptoms:** Alert with `autoCloseDuration` doesn't disappear automatically

**Solutions:**

```tsx
// ❌ Problem: Timer not properly set
<Alert 
  status="success"
  autoCloseDuration={5000}
  // Missing onDismiss handler
>

// ✅ Solution: Provide dismiss handler
const showAlert = useSignal(true);

<Alert 
  status="success"
  autoCloseDuration={5000}
  onDismiss$={() => (showAlert.value = false)}
  // Component needs a way to update its visibility
>

// ✅ Alternative: Use Alert's internal state management
<Alert 
  status="success"
  autoCloseDuration={5000}
  // Alert manages its own visibility when no external state provided
/>
```

#### Issue: Alert Icons Not Showing
**Symptoms:** Alert displays without status icons

**Solutions:**

```tsx
// ❌ Problem: Icons disabled
<Alert status="success" icon={false}>

// ✅ Solution: Enable icons
<Alert status="success" icon={true}>  // or just omit (default is true)

// ✅ Check for custom icon issues
<Alert 
  status="success" 
  icon={<CustomIcon />}  // Make sure CustomIcon is valid JSX
>

// ✅ Verify icon component imports
import { SuccessIcon } from "~/components/Core/Feedback/Alert/icons";
```

### Theme & Styling Issues

#### Issue: Dark Mode Colors Not Applied
**Symptoms:** Components don't change colors in dark mode

**Solutions:**

```tsx
// ❌ Problem: Missing dark mode CSS variables
:root {
  --feedback-info-500: #0ea5e9;
  /* Missing dark mode variants */
}

// ✅ Solution: Define dark mode colors
:root {
  --feedback-info-500: #0ea5e9;
}

[data-theme="dark"] {
  --feedback-info-500: #38bdf8;  // Lighter for dark backgrounds
  --feedback-info-100: #0c4a6e;  // Darker background for dark mode
  --feedback-info-800: #e0f2fe;  // Lighter text for dark mode
}

// ✅ Alternative: Use theme provider
<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>
```

#### Issue: Mobile Touch Targets Too Small
**Symptoms:** Buttons and interactive elements hard to tap on mobile

**Solutions:**

```tsx
// ❌ Problem: Touch targets below 44px
.close-button {
  width: 24px;
  height: 24px;
}

// ✅ Solution: Use touch-friendly sizing
.close-button {
  min-width: 44px;
  min-height: 44px;
  /* Content can be smaller, but touch area should be 44px+ */
}

// ✅ Use utility classes
<button class="touch-target-md">  // Applies 44px minimum
  Close
</button>

// ✅ Check component touch target settings
<Alert 
  dismissible
  size="md"  // Ensures adequate touch targets
/>
```

### Performance Issues

#### Issue: Laggy Animations on Mobile
**Symptoms:** Animations stutter or appear slow on mobile devices

**Solutions:**

```tsx
// ❌ Problem: Layout-thrashing animations
.alert-enter {
  animation: slideDown 300ms ease-out;
}

@keyframes slideDown {
  from { margin-top: -50px; }  // Causes layout recalculation
  to { margin-top: 0; }
}

// ✅ Solution: Use transform-based animations
.alert-enter {
  animation: slideDown 300ms ease-out;
}

@keyframes slideDown {
  from { transform: translateY(-50px); }  // GPU accelerated
  to { transform: translateY(0); }
}

// ✅ Add will-change for better performance
.alert-enter {
  will-change: transform;
  animation: slideDown 300ms ease-out;
}

.alert-enter:after {
  will-change: auto;  // Reset after animation
}
```

#### Issue: Memory Leaks with Event Listeners
**Symptoms:** App becomes slow after using many feedback components

**Solutions:**

```tsx
// ❌ Problem: Event listeners not cleaned up
useVisibleTask$(() => {
  const handleResize = () => updateSize();
  window.addEventListener('resize', handleResize);
  // Missing cleanup
});

// ✅ Solution: Proper cleanup
useVisibleTask$(() => {
  const handleResize = () => updateSize();
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
});

// ✅ Use cleanup in gesture handlers
const { cleanup } = useSwipeGestures({
  isOpen,
  onClose$: handleClose,
  // ... other options
});

// Cleanup is handled automatically by the hook
```

## 🔍 Debugging Techniques

### Visual Debugging

#### Debug Touch Targets
```tsx
// Add to your CSS for development
.debug-touch-targets * {
  position: relative;
}

.debug-touch-targets [data-touch-target]::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 2px dashed red;
  min-width: 44px;
  min-height: 44px;
  pointer-events: none;
  z-index: 9999;
}

// Use in development
<div class="debug-touch-targets">
  <Alert dismissible />
</div>
```

#### Debug Component State
```tsx
// Debug component for development
const FeedbackDebugger = component$(() => {
  const debugInfo = useStore({
    toastCount: 0,
    openDialogs: 0,
    openDrawers: 0,
    activeGestures: 0,
  });
  
  // Track component instances
  useVisibleTask$(() => {
    const updateCounts = () => {
      debugInfo.toastCount = document.querySelectorAll('[data-toast]').length;
      debugInfo.openDialogs = document.querySelectorAll('[data-dialog][data-open="true"]').length;
      debugInfo.openDrawers = document.querySelectorAll('[data-drawer][data-open="true"]').length;
      debugInfo.activeGestures = document.querySelectorAll('[data-swipe-active="true"]').length;
    };
    
    const observer = new MutationObserver(updateCounts);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true, 
      attributes: true,
      attributeFilter: ['data-open', 'data-swipe-active'],
    });
    
    updateCounts();
    
    return () => observer.disconnect();
  });
  
  return (
    <div class="fixed bottom-4 left-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-[9999]">
      <div>Toasts: {debugInfo.toastCount}</div>
      <div>Dialogs: {debugInfo.openDialogs}</div>
      <div>Drawers: {debugInfo.openDrawers}</div>
      <div>Gestures: {debugInfo.activeGestures}</div>
    </div>
  );
});
```

### Performance Debugging

#### Measure Component Performance
```tsx
// Performance measurement utility
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  
  console.log(`${name}: ${(end - start).toFixed(2)}ms`);
  
  // Track long-running operations
  if (end - start > 16) { // 16ms = 60fps budget
    console.warn(`Slow operation detected: ${name} took ${(end - start).toFixed(2)}ms`);
  }
};

// Usage in components
const SlowComponent = component$(() => {
  useVisibleTask$(() => {
    measurePerformance('Component Mount', () => {
      // Component initialization code
    });
  });
  
  return <div>Content</div>;
});
```

#### Monitor Memory Usage
```tsx
// Memory monitoring utility
export const MemoryMonitor = component$(() => {
  const memoryInfo = useStore({
    used: 0,
    total: 0,
    percentage: 0,
  });
  
  useVisibleTask$(() => {
    const updateMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        memoryInfo.used = Math.round(memory.usedJSHeapSize / 1024 / 1024);
        memoryInfo.total = Math.round(memory.totalJSHeapSize / 1024 / 1024);
        memoryInfo.percentage = Math.round((memoryInfo.used / memoryInfo.total) * 100);
      }
    };
    
    updateMemory();
    const interval = setInterval(updateMemory, 5000);
    
    return () => clearInterval(interval);
  });
  
  return (
    <div class="fixed top-4 right-4 bg-blue-500/90 text-white p-2 rounded text-xs">
      Memory: {memoryInfo.used}MB / {memoryInfo.total}MB ({memoryInfo.percentage}%)
    </div>
  );
});
```

### Gesture Debugging

#### Debug Touch Events
```tsx
// Touch event debugger
const TouchDebugger = component$(() => {
  const touchInfo = useStore({
    active: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    deltaX: 0,
    deltaY: 0,
    velocity: 0,
  });
  
  const handleTouchStart$ = $((event: TouchEvent) => {
    const touch = event.touches[0];
    touchInfo.active = true;
    touchInfo.startX = touch.clientX;
    touchInfo.startY = touch.clientY;
  });
  
  const handleTouchMove$ = $((event: TouchEvent) => {
    if (!touchInfo.active) return;
    
    const touch = event.touches[0];
    touchInfo.currentX = touch.clientX;
    touchInfo.currentY = touch.clientY;
    touchInfo.deltaX = touch.clientX - touchInfo.startX;
    touchInfo.deltaY = touch.clientY - touchInfo.startY;
  });
  
  const handleTouchEnd$ = $(() => {
    touchInfo.active = false;
  });
  
  return (
    <div
      class="fixed inset-0 bg-gray-100/50 flex items-center justify-center"
      onTouchStart$={handleTouchStart$}
      onTouchMove$={handleTouchMove$}
      onTouchEnd$={handleTouchEnd$}
    >
      <div class="bg-white p-4 rounded-lg shadow-lg">
        <h3 class="font-bold mb-2">Touch Debug Info</h3>
        <div class="grid grid-cols-2 gap-2 text-sm font-mono">
          <div>Active: {touchInfo.active ? 'Yes' : 'No'}</div>
          <div>Start: {touchInfo.startX}, {touchInfo.startY}</div>
          <div>Current: {touchInfo.currentX}, {touchInfo.currentY}</div>
          <div>Delta: {touchInfo.deltaX}, {touchInfo.deltaY}</div>
        </div>
      </div>
    </div>
  );
});
```

## ⚠️ Known Limitations & Workarounds

### iOS Safari Issues

#### Issue: Viewport Height on Mobile Safari
**Problem:** `100vh` doesn't account for Safari's dynamic UI

**Workaround:**
```css
/* Use dynamic viewport units when available */
.fullscreen-dialog {
  height: 100vh;
  height: 100dvh; /* Dynamic viewport height */
}

/* Fallback for older browsers */
@supports not (height: 100dvh) {
  .fullscreen-dialog {
    height: calc(100vh - env(keyboard-inset-height, 0px));
  }
}
```

#### Issue: Bounce Scrolling Interfering with Gestures
**Problem:** iOS bounce scrolling conflicts with drawer gestures

**Workaround:**
```css
/* Disable bounce scrolling on drawer areas */
.drawer-container {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: none;
}

/* Re-enable for content areas */
.drawer-content {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: auto;
}
```

### Android Chrome Issues

#### Issue: Address Bar Height Changes
**Problem:** Chrome's address bar affects viewport calculations

**Workaround:**
```tsx
// Dynamic viewport adjustment
const useViewportHeight = () => {
  const viewportHeight = useSignal('100vh');
  
  useVisibleTask$(() => {
    const updateHeight = () => {
      const vh = window.innerHeight;
      viewportHeight.value = `${vh}px`;
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    return () => window.removeEventListener('resize', updateHeight);
  });
  
  return viewportHeight;
};
```

### Performance Limitations

#### Large Number of Toasts
**Problem:** Too many simultaneous toasts can impact performance

**Solution:**
```tsx
// Implement toast stacking limits
<ToastContainer 
  maxVisible={5}  // Limit visible toasts
  stackStrategy="replace-oldest"  // Replace old toasts
/>
```

#### Complex Gesture Calculations
**Problem:** Complex gesture math can cause frame drops

**Solution:**
```tsx
// Throttle gesture calculations
let lastGestureUpdate = 0;
const GESTURE_THROTTLE = 16; // ~60fps

const handleTouchMove$ = $((event: TouchEvent) => {
  const now = Date.now();
  if (now - lastGestureUpdate < GESTURE_THROTTLE) return;
  
  lastGestureUpdate = now;
  // Perform gesture calculations
});
```

## 📱 Device-Specific Issues

### iPhone X+ (Notch Devices)

#### Safe Area Issues
```tsx
// Ensure safe area support
const SafeAreaComponent = component$(() => {
  useVisibleTask$(() => {
    // Check for safe area support
    const hasNotch = window.innerHeight !== window.screen.height;
    
    if (hasNotch) {
      document.body.classList.add('has-notch');
    }
  });
  
  return <Slot />;
});
```

### Android Devices

#### Soft Keyboard Issues
```tsx
// Handle soft keyboard appearance
const handleKeyboardAware = () => {
  const viewport = useStore({
    height: 0,
    keyboardOpen: false,
  });
  
  useVisibleTask$(() => {
    const updateViewport = () => {
      const newHeight = window.visualViewport?.height || window.innerHeight;
      viewport.keyboardOpen = newHeight < viewport.height * 0.75;
      viewport.height = newHeight;
    };
    
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateViewport);
      return () => window.visualViewport?.removeEventListener('resize', updateViewport);
    }
  });
  
  return viewport;
};
```

## 🛠️ Development Tools

### Browser DevTools Extensions

```tsx
// Add data attributes for easier debugging
<Alert 
  data-testid="success-alert"
  data-status="success"
  data-auto-close={autoCloseDuration}
>

<Toast 
  data-testid="toast-notification"
  data-position="top-right"
  data-swipeable={enableSwipeGesture}
>

<Dialog 
  data-testid="confirmation-dialog"
  data-size="responsive"
  data-backdrop="medium"
>
```

### Custom Development Utilities

```tsx
// Development-only debug overlay
const FeedbackDevTools = component$(() => {
  const isDevMode = useSignal(false);
  
  useVisibleTask$(() => {
    isDevMode.value = process.env.NODE_ENV === 'development';
  });
  
  if (!isDevMode.value) return null;
  
  return (
    <div class="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-2 text-xs">
      <div class="flex gap-4">
        <button onClick$={() => console.log('Toasts:', document.querySelectorAll('[data-toast]'))}>
          Log Toasts
        </button>
        <button onClick$={() => console.log('Dialogs:', document.querySelectorAll('[data-dialog]'))}>
          Log Dialogs
        </button>
        <button onClick$={() => document.body.classList.toggle('debug-touch-targets')}>
          Toggle Touch Debug
        </button>
      </div>
    </div>
  );
});
```

## 📞 Getting Additional Help

### Community Resources
- **GitHub Issues**: Report bugs and feature requests
- **Discord/Slack**: Real-time community support
- **Stack Overflow**: Tagged questions with `qwik-feedback-components`

### Professional Support
- **Priority Support**: Available for enterprise customers
- **Custom Implementation**: Consulting services for complex integrations
- **Training Sessions**: Team training on component usage

### Contributing
- **Bug Reports**: Include reproduction steps and environment details
- **Feature Requests**: Describe use case and expected behavior
- **Pull Requests**: Follow contribution guidelines and include tests

---

**Still experiencing issues?** Create a minimal reproduction case and reach out through our official support channels with detailed environment information and steps to reproduce the problem.