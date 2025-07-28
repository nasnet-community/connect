# API Reference

Complete API documentation for all Core Feedback Components with TypeScript definitions, props, and usage examples.

## 🧩 Component APIs

### Alert Component

Enhanced alert component for displaying various types of messages with mobile-first design.

#### Props

```tsx
interface AlertProps {
  /** Alert status type */
  status?: 'info' | 'success' | 'warning' | 'error';
  
  /** Visual variant */
  variant?: 'solid' | 'outline' | 'subtle';
  
  /** Responsive size */
  size?: 'sm' | 'md' | 'lg';
  
  /** Alert title */
  title?: string;
  
  /** Alert message (alternative to children) */
  message?: string;
  
  /** Show/hide icon */
  icon?: boolean | JSX.Element;
  
  /** Enable dismiss button */
  dismissible?: boolean;
  
  /** Show loading state */
  loading?: boolean;
  
  /** Animation type */
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleUp';
  
  /** Auto-close duration in milliseconds */
  autoCloseDuration?: number;
  
  /** Dismiss callback */
  onDismiss$?: QRL<() => void>;
  
  /** Component ID */
  id?: string;
  
  /** Additional CSS classes */
  class?: string;
}
```

#### Usage Examples

```tsx
// Basic alert
<Alert status="success" title="Success!" dismissible>
  Your changes have been saved.
</Alert>

// Auto-closing alert with animation
<Alert
  status="warning"
  title="Session Expiring"
  autoCloseDuration={5000}
  animation="slideDown"
  onDismiss$={() => console.log('Alert dismissed')}
>
  Your session will expire in 5 minutes.
</Alert>

// Loading state
<Alert
  status="info"
  title="Processing..."
  loading
  icon={false}
>
  Please wait while we process your request.
</Alert>

// Custom icon
<Alert
  status="error"
  title="Custom Error"
  icon={<CustomErrorIcon />}
  variant="outline"
  size="lg"
>
  Something went wrong with a custom icon.
</Alert>
```

---

### Toast Component & Hook

Temporary notification system with mobile swipe gestures and stacking management.

#### useToast Hook

```tsx
interface ToastService {
  /** Show info toast */
  info: (message: string, options?: ToastOptions) => string;
  
  /** Show success toast */
  success: (message: string, options?: ToastOptions) => string;
  
  /** Show warning toast */
  warning: (message: string, options?: ToastOptions) => string;
  
  /** Show error toast */
  error: (message: string, options?: ToastOptions) => string;
  
  /** Show custom toast */
  show: (toast: ToastItem) => string;
  
  /** Dismiss specific toast */
  dismiss: (id: string) => void;
  
  /** Dismiss all toasts */
  dismissAll: () => void;
  
  /** Update existing toast */
  update: (id: string, updates: Partial<ToastItem>) => void;
}

interface ToastOptions {
  /** Toast duration in milliseconds */
  duration?: number;
  
  /** Enable dismiss button */
  dismissible?: boolean;
  
  /** Toast position override */
  position?: ToastPosition;
  
  /** Action button */
  action?: {
    label: string;
    onClick$: QRL<() => void>;
  };
  
  /** Custom icon */
  icon?: JSX.Element;
  
  /** Enable swipe to dismiss */
  enableSwipeGesture?: boolean;
  
  /** Swipe direction */
  swipeDirection?: 'horizontal' | 'vertical' | 'both';
  
  /** Enable haptic feedback */
  hapticFeedback?: boolean;
}

type ToastPosition = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right'
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right';
```

#### ToastContainer Props

```tsx
interface ToastContainerProps {
  /** Default position for toasts */
  position?: ToastPosition;
  
  /** Maximum number of visible toasts */
  maxVisible?: number;
  
  /** Gap between toasts */
  gap?: number;
  
  /** Enable stacking animation */
  enableStacking?: boolean;
  
  /** Global toast duration */
  defaultDuration?: number;
  
  /** Enable mobile optimizations */
  mobileOptimized?: boolean;
  
  /** Container z-index */
  zIndex?: number;
}
```

#### Usage Examples

```tsx
// Setup ToastContainer
<ToastContainer 
  position="top-right" 
  maxVisible={5}
  mobileOptimized
/>

// Using the toast hook
const MyComponent = component$(() => {
  const toast = useToast();
  
  const handleSave = $(() => {
    const toastId = toast.info("Saving...", { duration: 0 });
    
    // Simulate async operation
    setTimeout(() => {
      toast.update(toastId, {
        status: 'success',
        message: 'Saved successfully!',
        duration: 3000,
      });
    }, 2000);
  });
  
  return (
    <button onClick$={handleSave}>
      Save Changes
    </button>
  );
});

// Toast with action
toast.warning("Connection lost", {
  action: {
    label: "Retry",
    onClick$: () => reconnect(),
  },
  duration: 0, // Persist until dismissed
});

// Mobile-optimized toast
toast.success("Upload complete", {
  enableSwipeGesture: true,
  swipeDirection: 'horizontal',
  hapticFeedback: true,
  position: 'bottom-center', // Better for mobile
});
```

---

### Dialog Component

Modal dialog with mobile-first responsive behavior and gesture support.

#### Dialog Props

```tsx
interface DialogProps {
  /** Dialog visibility */
  isOpen: boolean;
  
  /** Close callback */
  onClose$?: QRL<() => void>;
  
  /** Dialog size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'responsive';
  
  /** Backdrop variant */
  backdrop?: 'light' | 'medium' | 'heavy' | 'none';
  
  /** Close on backdrop click */
  closeOnBackdropClick?: boolean;
  
  /** Close on Escape key */
  closeOnEsc?: boolean;
  
  /** Disable scroll lock */
  disableScrollLock?: boolean;
  
  /** Animation type */
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'scaleUp';
  
  /** Mobile-specific overrides */
  mobileOverrides?: {
    fullscreen?: boolean;
    safeAreaPadding?: boolean;
    swipeToClose?: boolean;
    hapticFeedback?: boolean;
  };
  
  /** Component ID */
  id?: string;
  
  /** Additional CSS classes */
  class?: string;
}
```

#### Dialog Sub-components

```tsx
// DialogHeader
interface DialogHeaderProps {
  /** Header content alignment */
  align?: 'left' | 'center' | 'right';
  
  /** Show close button */
  showCloseButton?: boolean;
  
  /** Close button label */
  closeButtonLabel?: string;
  
  /** Additional CSS classes */
  class?: string;
}

// DialogBody
interface DialogBodyProps {
  /** Enable scrolling */
  scrollable?: boolean;
  
  /** Maximum height */
  maxHeight?: string;
  
  /** Additional CSS classes */
  class?: string;
}

// DialogFooter
interface DialogFooterProps {
  /** Footer alignment */
  align?: 'left' | 'center' | 'right' | 'between';
  
  /** Additional CSS classes */
  class?: string;
}
```

#### Usage Examples

```tsx
// Basic dialog
<Dialog
  isOpen={isOpen}
  onClose$={() => setIsOpen(false)}
  size="md"
  closeOnBackdropClick
  closeOnEsc
>
  <DialogHeader>
    <h2>Confirm Action</h2>
  </DialogHeader>
  
  <DialogBody>
    <p>Are you sure you want to delete this item?</p>
  </DialogBody>
  
  <DialogFooter align="right">
    <button onClick$={() => setIsOpen(false)}>
      Cancel
    </button>
    <button onClick$={handleDelete}>
      Delete
    </button>
  </DialogFooter>
</Dialog>

// Mobile-optimized dialog
<Dialog
  isOpen={isOpen}
  onClose$={handleClose}
  size="responsive"
  backdrop="heavy"
  mobileOverrides={{
    fullscreen: true,
    safeAreaPadding: true,
    swipeToClose: true,
    hapticFeedback: true,
  }}
>
  <DialogBody scrollable maxHeight="70vh">
    {/* Long content that scrolls */}
  </DialogBody>
</Dialog>

// Form dialog with validation
const FormDialog = component$(() => {
  const isOpen = useSignal(false);
  const formData = useStore({ name: '', email: '' });
  
  return (
    <Dialog
      isOpen={isOpen.value}
      onClose$={() => (isOpen.value = false)}
      size="md"
      disableScrollLock={false}
    >
      <DialogHeader>
        <h2>Create Account</h2>
      </DialogHeader>
      
      <DialogBody>
        <form class="space-y-4">
          <input
            type="text"
            placeholder="Name"
            bind:value={formData.name}
            class="w-full p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            bind:value={formData.email}
            class="w-full p-2 border rounded"
          />
        </form>
      </DialogBody>
      
      <DialogFooter align="between">
        <button
          type="button"
          onClick$={() => (isOpen.value = false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick$={handleSubmit}
          disabled={!formData.name || !formData.email}
        >
          Create Account
        </button>
      </DialogFooter>
    </Dialog>
  );
});
```

---

### Drawer Component

Side panel component with native mobile gesture support and responsive behavior.

#### Drawer Props

```tsx
interface DrawerProps {
  /** Drawer visibility */
  isOpen: boolean;
  
  /** Close callback */
  onClose$?: QRL<() => void>;
  
  /** Drawer placement */
  placement?: 'left' | 'right' | 'top' | 'bottom';
  
  /** Drawer size */
  size?: 'sm' | 'md' | 'lg' | 'full';
  
  /** Backdrop variant */
  backdrop?: 'light' | 'medium' | 'heavy' | 'none';
  
  /** Enable swipe gestures */
  enableSwipeGestures?: boolean;
  
  /** Swipe threshold (0-1) */
  swipeThreshold?: number;
  
  /** Velocity threshold for swipe detection */
  swipeVelocityThreshold?: number;
  
  /** Close on backdrop click */
  closeOnBackdropClick?: boolean;
  
  /** Close on Escape key */
  closeOnEsc?: boolean;
  
  /** Disable scroll lock */
  disableScrollLock?: boolean;
  
  /** Animation duration */
  animationDuration?: number;
  
  /** Gesture configuration */
  gestureConfig?: {
    distanceThreshold?: number;
    velocityThreshold?: number;
    touchStartThreshold?: number;
    enableVisualFeedback?: boolean;
    hapticFeedback?: {
      start?: boolean;
      progress?: boolean;
      complete?: boolean;
    };
  };
  
  /** Component ID */
  id?: string;
  
  /** Additional CSS classes */
  class?: string;
}
```

#### Drawer Sub-components

```tsx
// DrawerHeader
interface DrawerHeaderProps {
  /** Show close button */
  showCloseButton?: boolean;
  
  /** Close button position */
  closeButtonPosition?: 'left' | 'right';
  
  /** Additional CSS classes */
  class?: string;
}

// DrawerContent
interface DrawerContentProps {
  /** Enable padding */
  padding?: boolean;
  
  /** Enable scrolling */
  scrollable?: boolean;
  
  /** Additional CSS classes */
  class?: string;
}

// DrawerFooter
interface DrawerFooterProps {
  /** Footer alignment */
  align?: 'left' | 'center' | 'right' | 'between';
  
  /** Sticky footer */
  sticky?: boolean;
  
  /** Additional CSS classes */
  class?: string;
}
```

#### Usage Examples

```tsx
// Basic drawer
<Drawer
  isOpen={isOpen}
  onClose$={() => setIsOpen(false)}
  placement="right"
  size="md"
>
  <DrawerHeader>
    <h3>Navigation</h3>
  </DrawerHeader>
  
  <DrawerContent>
    <nav>
      <a href="/home">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  </DrawerContent>
</Drawer>

// Mobile-optimized drawer with gestures
<Drawer
  isOpen={isOpen}
  onClose$={handleClose}
  placement="bottom"
  size="lg"
  enableSwipeGestures
  swipeThreshold={0.3}
  gestureConfig={{
    enableVisualFeedback: true,
    hapticFeedback: {
      start: true,
      complete: true,
    },
  }}
>
  <DrawerHeader showCloseButton>
    <h3>Mobile Actions</h3>
  </DrawerHeader>
  
  <DrawerContent scrollable>
    {/* Scrollable content */}
  </DrawerContent>
  
  <DrawerFooter sticky align="center">
    <button onClick$={handleClose}>
      Close
    </button>
  </DrawerFooter>
</Drawer>

// Full-screen drawer
<Drawer
  isOpen={isOpen}
  onClose$={handleClose}
  placement="left"
  size="full"
  backdrop="none"
  enableSwipeGestures
>
  <DrawerContent padding={false}>
    {/* Full-screen content without padding */}
    <div class="h-full flex flex-col">
      <header class="p-4 border-b">Header</header>
      <main class="flex-1 overflow-auto">Main Content</main>
      <footer class="p-4 border-t">Footer</footer>
    </div>
  </DrawerContent>
</Drawer>
```

---

### Popover Component

Contextual overlay component with intelligent positioning and mobile optimizations.

#### Popover Props

```tsx
interface PopoverProps {
  /** Popover visibility */
  isOpen?: boolean;
  
  /** Open state change callback */
  onOpenChange$?: QRL<(open: boolean) => void>;
  
  /** Popover placement */
  placement?: 
    | 'top' | 'top-start' | 'top-end'
    | 'bottom' | 'bottom-start' | 'bottom-end'
    | 'left' | 'left-start' | 'left-end'
    | 'right' | 'right-start' | 'right-end'
    | 'auto';
  
  /** Trigger behavior */
  trigger?: 'click' | 'hover' | 'focus' | 'manual';
  
  /** Popover size */
  size?: 'sm' | 'md' | 'lg';
  
  /** Close on outside click */
  closeOnOutsideClick?: boolean;
  
  /** Close on Escape key */
  closeOnEsc?: boolean;
  
  /** Show arrow */
  showArrow?: boolean;
  
  /** Offset from trigger */
  offset?: number;
  
  /** Mobile strategy */
  mobileStrategy?: 'popover' | 'modal' | 'drawer';
  
  /** Animation type */
  animation?: 'fadeIn' | 'scaleUp' | 'slideUp';
  
  /** Z-index */
  zIndex?: number;
  
  /** Component ID */
  id?: string;
  
  /** Additional CSS classes */
  class?: string;
}
```

#### Popover Sub-components

```tsx
// PopoverTrigger
interface PopoverTriggerProps {
  /** Trigger element type */
  as?: 'button' | 'div' | 'span';
  
  /** Additional CSS classes */
  class?: string;
}

// PopoverContent
interface PopoverContentProps {
  /** Enable padding */
  padding?: boolean;
  
  /** Maximum width */
  maxWidth?: string;
  
  /** Additional CSS classes */
  class?: string;
}

// PopoverArrow
interface PopoverArrowProps {
  /** Arrow size */
  size?: number;
  
  /** Additional CSS classes */
  class?: string;
}
```

#### Usage Examples

```tsx
// Basic popover
<Popover placement="bottom" trigger="click">
  <PopoverTrigger>
    <button>Show Info</button>
  </PopoverTrigger>
  
  <PopoverContent>
    <div class="p-4">
      <h4 class="font-semibold mb-2">Information</h4>
      <p class="text-sm">Additional context or help text.</p>
    </div>
  </PopoverContent>
</Popover>

// Mobile-adaptive popover
<Popover
  placement="auto"
  trigger="click"
  mobileStrategy="modal"
  showArrow
  closeOnOutsideClick
>
  <PopoverTrigger>
    <button>Options</button>
  </PopoverTrigger>
  
  <PopoverContent maxWidth="300px">
    <div class="p-3">
      <button class="block w-full text-left p-2 hover:bg-gray-100">
        Edit
      </button>
      <button class="block w-full text-left p-2 hover:bg-gray-100">
        Share
      </button>
      <button class="block w-full text-left p-2 hover:bg-gray-100 text-red-600">
        Delete
      </button>
    </div>
  </PopoverContent>
</Popover>

// Form popover
const FormPopover = component$(() => {
  const isOpen = useSignal(false);
  const formData = useStore({ comment: '' });
  
  return (
    <Popover
      isOpen={isOpen.value}
      onOpenChange$={(open) => (isOpen.value = open)}
      placement="top"
      closeOnOutsideClick={false}
    >
      <PopoverTrigger>
        <button>Add Comment</button>
      </PopoverTrigger>
      
      <PopoverContent>
        <div class="p-4 w-80">
          <textarea
            placeholder="Add your comment..."
            bind:value={formData.comment}
            class="w-full p-2 border rounded mb-3"
            rows={3}
          />
          <div class="flex justify-end gap-2">
            <button
              onClick$={() => (isOpen.value = false)}
              class="px-3 py-1 text-sm border rounded"
            >
              Cancel
            </button>
            <button
              onClick$={() => {
                handleSubmit(formData.comment);
                isOpen.value = false;
              }}
              class="px-3 py-1 text-sm bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
});
```

---

### PromoBanner Component

Marketing and promotional banner component with rich content support.

#### PromoBanner Props

```tsx
interface PromoBannerProps {
  /** Banner variant */
  variant?: 'default' | 'gradient' | 'image' | 'minimal';
  
  /** Banner size */
  size?: 'sm' | 'md' | 'lg';
  
  /** Banner title */
  title?: string;
  
  /** Banner message */
  message?: string;
  
  /** Background image */
  backgroundImage?: string;
  
  /** Call-to-action button */
  cta?: {
    label: string;
    href?: string;
    onClick$?: QRL<() => void>;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  
  /** Show dismiss button */
  dismissible?: boolean;
  
  /** Dismiss callback */
  onDismiss$?: QRL<() => void>;
  
  /** Banner position */
  position?: 'top' | 'bottom' | 'inline';
  
  /** Enable animations */
  animated?: boolean;
  
  /** Animation type */
  animation?: 'slideDown' | 'fadeIn' | 'bounceIn';
  
  /** Responsive behavior */
  responsive?: {
    hideOnMobile?: boolean;
    mobileLayout?: 'stack' | 'inline';
  };
  
  /** Component ID */
  id?: string;
  
  /** Additional CSS classes */
  class?: string;
}
```

#### Usage Examples

```tsx
// Basic promo banner
<PromoBanner
  title="Special Offer!"
  message="Get 20% off your first purchase with code SAVE20"
  cta={{
    label: "Shop Now",
    href: "/shop",
    variant: "primary",
  }}
  dismissible
  onDismiss$={() => console.log('Banner dismissed')}
/>

// Image background banner
<PromoBanner
  variant="image"
  backgroundImage="/images/promo-bg.jpg"
  title="Summer Sale"
  message="Up to 50% off selected items"
  size="lg"
  cta={{
    label: "Browse Sale",
    onClick$: () => navigateToSale(),
    variant: "outline",
  }}
  animated
  animation="fadeIn"
/>

// Mobile-responsive banner
<PromoBanner
  title="Download Our App"
  message="Get exclusive mobile offers and faster checkout"
  variant="gradient"
  responsive={{
    mobileLayout: "stack",
  }}
  cta={{
    label: "Download",
    onClick$: () => openAppStore(),
  }}
/>

// Minimal notification banner
<PromoBanner
  variant="minimal"
  message="New features available! Check out our latest updates."
  size="sm"
  position="top"
  dismissible
  cta={{
    label: "Learn More",
    href: "/updates",
    variant: "secondary",
  }}
/>
```

---

### ErrorMessage Component

Specialized component for form validation and error display.

#### ErrorMessage Props

```tsx
interface ErrorMessageProps {
  /** Error message text */
  message?: string;
  
  /** Error title */
  title?: string;
  
  /** Error type/severity */
  type?: 'error' | 'warning' | 'info';
  
  /** Component size */
  size?: 'sm' | 'md' | 'lg';
  
  /** Show icon */
  showIcon?: boolean;
  
  /** Custom icon */
  icon?: JSX.Element;
  
  /** Enable dismiss */
  dismissible?: boolean;
  
  /** Auto-dismiss duration */
  autoCloseDuration?: number;
  
  /** Dismiss callback */
  onDismiss$?: QRL<() => void>;
  
  /** Field association (for forms) */
  fieldId?: string;
  
  /** Component ID */
  id?: string;
  
  /** Additional CSS classes */
  class?: string;
}
```

#### Usage Examples

```tsx
// Form field error
<ErrorMessage
  message="Email address is required"
  fieldId="email-input"
  size="sm"
/>

// Validation error with title
<ErrorMessage
  title="Validation Error"
  message="Please check the highlighted fields and try again"
  type="error"
  dismissible
/>

// Warning message
<ErrorMessage
  message="This action cannot be undone"
  type="warning"
  showIcon
  size="md"
/>

// Auto-dismissing info message
<ErrorMessage
  message="Changes saved successfully"
  type="info"
  autoCloseDuration={3000}
  onDismiss$={() => console.log('Message dismissed')}
/>
```

---

## 🔧 Utility Functions

### Theme Utilities

```tsx
// Color utilities
function getStatusColors(
  status: FeedbackStatus,
  variant: FeedbackVariant = "solid"
): string;

function getResponsiveSizeClasses(
  size: FeedbackSize,
  component: "alert" | "toast" | "dialog" | "drawer" = "alert"
): string;

function getIconSizeClasses(size: FeedbackSize): string;

function getTouchTargetClasses(size: FeedbackSize = "md"): string;

// Animation utilities
function getAnimationClasses(
  animation: "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scaleUp"
): string;

function getMobileDrawerAnimation(
  placement: "left" | "right" | "top" | "bottom",
  isVisible: boolean
): string;

// Surface utilities
function getSurfaceElevation(
  elevation: "base" | "elevated" | "depressed",
  theme: "light" | "dark" = "light"
): string;

function getBackdropClasses(
  variant: "light" | "medium" | "heavy"
): string;

// Mobile utilities
function getSafeAreaClasses(position: "top" | "bottom" | "all"): string;

// Class combination utility
function cn(...classes: (string | undefined | null | false)[]): string;
```

### Hook Utilities

```tsx
// Alert hook
function useAlert(options: {
  autoCloseDuration?: number;
  onDismiss$?: QRL<() => void>;
}): {
  state: AlertState;
  handleDismiss$: QRL<() => void>;
};

// Drawer gesture hook
function useSwipeGestures(params: UseSwipeGesturesParams): UseSwipeGesturesReturn;

// Popover positioning hook
function usePopover(options: PopoverOptions): PopoverState;
```

---

## 📱 Mobile-Specific APIs

### Touch Event Handlers

```tsx
// Touch gesture types
interface TouchGestureState {
  isSwping: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  deltaX: number;
  deltaY: number;
  direction: 'left' | 'right' | 'up' | 'down' | null;
  velocity: number;
}

// Swipe gesture handlers
interface SwipeGestureHandlers {
  handleTouchStart$: QRL<(event: TouchEvent) => void>;
  handleTouchMove$: QRL<(event: TouchEvent) => void>;
  handleTouchEnd$: QRL<(event: TouchEvent) => void>;
}
```

### Responsive Configuration

```tsx
// Mobile configuration
interface MobileConfig {
  minTouchTargetSize: number;
  touchTargetPadding: number;
  swipeThreshold: number;
  velocityThreshold: number;
  reducedMotionFallback: boolean;
  hardwareAcceleration: boolean;
  respectSafeAreas: boolean;
  safeAreaPadding: number;
  passiveListeners: boolean;
  throttleScrollEvents: boolean;
}

// Breakpoint definitions
interface Breakpoints {
  mobile: number;    // 0px - 767px
  tablet: number;    // 768px - 1023px
  desktop: number;   // 1024px - 1279px
  xl: number;        // 1280px+
}
```

---

## 🎨 Type Definitions

### Core Types

```tsx
// Status types
type FeedbackStatus = "info" | "success" | "warning" | "error";
type FeedbackVariant = "solid" | "outline" | "subtle";
type FeedbackSize = "sm" | "md" | "lg";

// Animation types
type AnimationType = 
  | "fadeIn" 
  | "slideUp" 
  | "slideDown" 
  | "slideLeft" 
  | "slideRight" 
  | "scaleUp";

// Position types
type Position = 
  | "top-left" 
  | "top-center" 
  | "top-right"
  | "bottom-left" 
  | "bottom-center" 
  | "bottom-right";

type Placement = 
  | "top" | "top-start" | "top-end"
  | "bottom" | "bottom-start" | "bottom-end"
  | "left" | "left-start" | "left-end"
  | "right" | "right-start" | "right-end"
  | "auto";

// Theme types
interface ColorScale {
  50: string; 100: string; 200: string; 300: string; 400: string;
  500: string; 600: string; 700: string; 800: string; 900: string;
  surface: string;
  dark: ColorScale;
}

interface SizeConfig {
  padding: string;
  fontSize: string;
  lineHeight: number;
  minTouchTarget: number;
}
```

### Component State Types

```tsx
// Alert state
interface AlertState {
  isVisible: boolean;
  isMounted: boolean;
  isClosing: boolean;
}

// Toast state
interface ToastItem {
  id: string;
  status: FeedbackStatus;
  message: string;
  title?: string;
  duration: number;
  dismissible: boolean;
  position: Position;
  createdAt: number;
  action?: ToastAction;
}

// Dialog state
interface DialogState {
  isOpen: boolean;
  isMounted: boolean;
  scrollLocked: boolean;
}

// Drawer state
interface DrawerState {
  isOpen: boolean;
  isMounted: boolean;
  swipeProgress: number;
  isSwipping: boolean;
}
```

---

This API reference provides comprehensive documentation for all components, hooks, utilities, and types in the Core Feedback Components system. For specific usage examples and advanced patterns, refer to the individual component documentation and example files.