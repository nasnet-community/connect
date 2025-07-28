# Getting Started with Core Feedback Components

Welcome to the enhanced Core Feedback Components! This guide will get you up and running with all the new mobile-optimized features and theme integration.

## 🚀 Quick Installation

### Step 1: Import Components

```tsx
// Import individual components
import { Alert } from "~/components/Core/Feedback/Alert";
import { Toast, useToast } from "~/components/Core/Feedback/Toast";
import { Dialog } from "~/components/Core/Feedback/Dialog";
import { Drawer } from "~/components/Core/Feedback/Drawer";

// Or import everything from the unified index
import { 
  Alert, 
  Toast, 
  Dialog, 
  Drawer, 
  Popover, 
  PromoBanner, 
  ErrorMessage,
  useToast 
} from "~/components/Core/Feedback";
```

### Step 2: Set Up Toast Container (Optional)

For toast notifications, add the `ToastContainer` at your app root:

```tsx
// src/root.tsx or your main app component
import { ToastContainer } from "~/components/Core/Feedback";

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <RouterHead />
      </head>
      <body>
        <RouterOutlet />
        {/* Add toast container at the root */}
        <ToastContainer position="top-right" />
      </body>
    </QwikCityProvider>
  );
});
```

## 📱 Your First Mobile-Optimized Alert

```tsx
import { component$ } from "@builder.io/qwik";
import { Alert } from "~/components/Core/Feedback";

export const MyFirstAlert = component$(() => {
  return (
    <Alert
      status="success"
      title="Welcome to Enhanced Feedback Components!"
      dismissible
      size="md"
      animation="slideDown"
      autoCloseDuration={5000}
    >
      <p>This alert features:</p>
      <ul class="mt-2 space-y-1">
        <li>• Touch-friendly dismiss button (44px touch target)</li>
        <li>• Responsive sizing that adapts to screen size</li>
        <li>• Smooth animations with hardware acceleration</li>
        <li>• Auto-dismiss functionality</li>
        <li>• Theme-aware colors for light/dark mode</li>
      </ul>
    </Alert>
  );
});
```

## 🎯 Touch-Optimized Toast Notifications

```tsx
import { component$ } from "@builder.io/qwik";
import { useToast } from "~/components/Core/Feedback";

export const ToastExample = component$(() => {
  const toast = useToast();

  return (
    <div class="space-y-4">
      <button
        class="btn btn-primary"
        onClick$={() => {
          toast.success("Success! Swipe to dismiss on mobile.", {
            duration: 4000,
            dismissible: true,
          });
        }}
      >
        Show Success Toast
      </button>

      <button
        class="btn btn-warning"
        onClick$={() => {
          toast.warning("Warning message with action", {
            action: {
              label: "Undo",
              onClick$: () => console.log("Undo clicked"),
            },
          });
        }}
      >
        Show Toast with Action
      </button>

      <button
        class="btn btn-info"
        onClick$={() => {
          toast.info("This toast respects safe areas on mobile devices", {
            position: "bottom-center", // Mobile-friendly position
          });
        }}
      >
        Show Mobile-Optimized Toast
      </button>
    </div>
  );
});
```

## 📱 Mobile-First Dialog

```tsx
import { component$, useSignal } from "@builder.io/qwik";
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "~/components/Core/Feedback";

export const MobileDialog = component$(() => {
  const isOpen = useSignal(false);

  return (
    <>
      <button
        class="btn btn-primary"
        onClick$={() => (isOpen.value = true)}
      >
        Open Mobile-Optimized Dialog
      </button>

      <Dialog
        isOpen={isOpen.value}
        onClose$={() => (isOpen.value = false)}
        size="responsive" // Automatically goes fullscreen on mobile
        backdrop="medium"
        closeOnBackdropClick
        closeOnEsc
      >
        <DialogHeader>
          <h2>Mobile-First Dialog</h2>
        </DialogHeader>
        
        <DialogBody>
          <p class="mb-4">
            This dialog automatically adapts to mobile devices:
          </p>
          <ul class="space-y-2 text-sm">
            <li class="flex items-center gap-2">
              <span class="text-green-500">✓</span>
              Fullscreen on mobile, modal on desktop
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-500">✓</span>
              Safe area padding for notched devices
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-500">✓</span>
              Touch-friendly close button
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-500">✓</span>
              Swipe down to close (mobile only)
            </li>
          </ul>
        </DialogBody>
        
        <DialogFooter>
          <button
            class="btn btn-secondary"
            onClick$={() => (isOpen.value = false)}
          >
            Cancel
          </button>
          <button
            class="btn btn-primary"
            onClick$={() => {
              // Handle action
              isOpen.value = false;
            }}
          >
            Confirm
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
});
```

## 🎨 Theme-Aware Components

```tsx
import { component$ } from "@builder.io/qwik";
import { Alert } from "~/components/Core/Feedback";

export const ThemeExample = component$(() => {
  return (
    <div class="space-y-4">
      {/* Different variants automatically adapt to theme */}
      <Alert
        status="info"
        variant="solid"
        title="Solid Variant"
        message="Full background color with high contrast"
      />
      
      <Alert
        status="success"
        variant="outline"
        title="Outline Variant"
        message="Border-only style with transparent background"
      />
      
      <Alert
        status="warning"
        variant="subtle"
        title="Subtle Variant"
        message="Light background with subtle contrast"
      />
      
      {/* Different sizes for different use cases */}
      <Alert
        status="error"
        size="sm"
        title="Compact for mobile lists"
        dismissible
      />
      
      <Alert
        status="success"
        size="lg"
        title="Prominent for important messages"
        dismissible
      />
    </div>
  );
});
```

## 📱 Advanced Mobile Features

### Drawer with Native Gestures

```tsx
import { component$, useSignal } from "@builder.io/qwik";
import { Drawer, DrawerHeader, DrawerContent } from "~/components/Core/Feedback";

export const GestureDrawer = component$(() => {
  const isOpen = useSignal(false);

  return (
    <>
      <button
        class="btn btn-primary"
        onClick$={() => (isOpen.value = true)}
      >
        Open Gesture Drawer
      </button>

      <Drawer
        isOpen={isOpen.value}
        onClose$={() => (isOpen.value = false)}
        placement="bottom" // Great for mobile
        size="md"
        enableSwipeGestures // Enable native swipe to close
        backdrop="heavy"
      >
        <DrawerHeader>
          <h3>Swipe Down to Close</h3>
        </DrawerHeader>
        
        <DrawerContent>
          <div class="space-y-4">
            <p>
              This drawer supports native mobile gestures:
            </p>
            <ul class="space-y-2">
              <li>• Swipe down to close</li>
              <li>• Momentum-based closing</li>
              <li>• Visual feedback during swipe</li>
              <li>• Respects swipe thresholds</li>
            </ul>
            
            {/* Your drawer content */}
            <div class="h-64 rounded bg-gray-100 dark:bg-gray-800 p-4">
              <p>Interactive content here...</p>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
});
```

### Mobile-Optimized Popover

```tsx
import { component$, useSignal } from "@builder.io/qwik";
import { 
  Popover, 
  PopoverTrigger, 
  PopoverContent 
} from "~/components/Core/Feedback";

export const MobilePopover = component$(() => {
  const isOpen = useSignal(false);

  return (
    <Popover
      isOpen={isOpen.value}
      onOpenChange$={(open) => (isOpen.value = open)}
      placement="auto" // Automatically positions based on available space
      mobileStrategy="modal" // Becomes a modal on mobile
    >
      <PopoverTrigger>
        <button class="btn btn-outline">
          Show Info
        </button>
      </PopoverTrigger>
      
      <PopoverContent>
        <div class="p-4 max-w-xs">
          <h4 class="font-semibold mb-2">Mobile-Optimized</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            On mobile, this becomes a modal for better interaction.
            On desktop, it's a traditional popover.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
});
```

## 🎯 Best Practices

### 1. **Mobile-First Sizing**
```tsx
// ✅ Good: Start with mobile size, scale up
<Alert size="sm" /> // Compact on mobile, readable on desktop

// ❌ Avoid: Desktop-first sizing
<Alert size="lg" /> // May be too large on mobile
```

### 2. **Touch-Friendly Interactions**
```tsx
// ✅ Good: Always enable dismissible for better UX
<Alert dismissible status="info" title="Tip" />

// ✅ Good: Use appropriate auto-dismiss timing
<Alert autoCloseDuration={4000} /> // 4 seconds is good for mobile
```

### 3. **Performance Optimization**
```tsx
// ✅ Good: Use specific imports for better tree-shaking
import { Alert } from "~/components/Core/Feedback/Alert";

// ⚠️ OK but less optimal: Import everything
import { Alert } from "~/components/Core/Feedback";
```

### 4. **Accessibility**
```tsx
// ✅ Good: Provide meaningful titles and descriptions
<Alert
  status="error"
  title="Validation Error"
  message="Please check the required fields below"
  dismissible
/>

// ✅ Good: Use semantic HTML in content
<Alert status="info" title="System Status">
  <p>Current status: <strong>All systems operational</strong></p>
  <a href="/status" class="underline">View detailed status</a>
</Alert>
```

## 🔧 Configuration Options

### Global Configuration

You can configure default behavior globally:

```tsx
// src/app.tsx or your main component
import { FeedbackProvider } from "~/components/Core/Feedback";

const feedbackConfig = {
  // Default toast position
  defaultToastPosition: "top-right",
  
  // Mobile breakpoint for responsive behavior
  mobileBreakpoint: 768,
  
  // Default animation preferences
  respectReducedMotion: true,
  
  // Touch target minimum size (in pixels)
  minTouchTargetSize: 44,
};

export default component$(() => {
  return (
    <FeedbackProvider config={feedbackConfig}>
      <App />
    </FeedbackProvider>
  );
});
```

## 🎉 Next Steps

Now that you have the basics:

1. **Explore Individual Components**: Check out each component's documentation folder for advanced features
2. **Customize Themes**: Read the [Theme Customization Guide](./ThemeCustomization.md)
3. **Mobile Optimization**: Dive deeper into [Mobile Optimization Guide](./MobileOptimization.md)
4. **Accessibility**: Review the [Accessibility Guide](./AccessibilityGuide.md)
5. **Performance**: Learn optimization techniques in the [Performance Guide](./PerformanceGuide.md)

## 🆘 Need Help?

- **Common Issues**: Check the [Troubleshooting Guide](./TroubleshootingGuide.md)
- **API Reference**: See the complete [API Documentation](./APIReference.md)
- **Migration**: Upgrading from v2.x? See the [Migration Guide](./MigrationGuide.md)

Happy building! 🚀