# Migration Guide: v2.x to v3.0

This guide helps you upgrade your existing Feedback components to the new v3.0 enhanced version with mobile-first design and advanced theme integration.

## 🚨 Breaking Changes Overview

| Component | Changes | Impact | Action Required |
|-----------|---------|---------|-----------------|
| **Alert** | New size variants, theme props | Low | Update prop names |
| **Toast** | New positioning system | Medium | Update ToastContainer setup |
| **Dialog** | Mobile-first responsive behavior | Low | Test mobile layouts |
| **Drawer** | New gesture system | Medium | Enable/configure gestures |
| **Theme** | Unified theme system | High | Update color references |

## 📋 Pre-Migration Checklist

- [ ] **Backup your current implementation**
- [ ] **Review component usage** across your application
- [ ] **Test mobile layouts** before upgrading
- [ ] **Check theme customizations** for breaking changes
- [ ] **Update TypeScript types** if using custom interfaces

## 🔄 Component-by-Component Migration

### Alert Component

#### Before (v2.x)
```tsx
// Old Alert component
<Alert
  type="success"
  closable
  showIcon
  className="my-alert"
>
  Success message
</Alert>
```

#### After (v3.0)
```tsx
// New enhanced Alert component
<Alert
  status="success"           // ✅ Changed: type → status
  dismissible               // ✅ Changed: closable → dismissible
  icon                      // ✅ Changed: showIcon → icon (boolean)
  size="md"                 // ✅ New: responsive sizing
  variant="solid"           // ✅ New: theme variants
  animation="fadeIn"        // ✅ New: animation options
  class="my-alert"          // ✅ Changed: className → class (Qwik)
>
  Success message
</Alert>
```

#### Migration Steps
1. **Update prop names**:
   ```tsx
   // Find and replace across your codebase
   type → status
   closable → dismissible
   showIcon → icon
   className → class
   ```

2. **Add new responsive features**:
   ```tsx
   // Enhanced with mobile-first features
   <Alert
     status="success"
     dismissible
     size="md"              // Responsive sizing
     autoCloseDuration={5000} // Auto-dismiss
     animation="slideDown"   // Smooth animations
   >
     Your content
   </Alert>
   ```

### Toast Component

#### Before (v2.x)
```tsx
// Old toast usage
import { message } from "antd"; // Example old system

message.success("Operation successful!");
```

#### After (v3.0)
```tsx
// New toast system with mobile optimization
import { useToast, ToastContainer } from "~/components/Core/Feedback";

// 1. Add ToastContainer to your app root
<ToastContainer 
  position="top-right"    // Mobile-aware positioning
  maxVisible={5}          // Stack management
/>

// 2. Use the enhanced toast hook
const MyComponent = component$(() => {
  const toast = useToast();
  
  return (
    <button
      onClick$={() => {
        toast.success("Operation successful!", {
          duration: 4000,        // Mobile-friendly timing
          dismissible: true,     // Swipe to dismiss
          position: "top-center" // Override global position
        });
      }}
    >
      Save Changes
    </button>
  );
});
```

#### Migration Steps
1. **Replace old toast system**:
   ```tsx
   // Remove old imports
   - import { message } from "antd";
   - import { toast } from "react-toastify";
   
   // Add new import
   + import { useToast } from "~/components/Core/Feedback";
   ```

2. **Add ToastContainer**:
   ```tsx
   // In your root component (src/root.tsx)
   import { ToastContainer } from "~/components/Core/Feedback";
   
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

3. **Update usage patterns**:
   ```tsx
   // Old pattern
   message.success("Done!");
   message.error("Failed!");
   
   // New pattern
   const toast = useToast();
   toast.success("Done!");
   toast.error("Failed!");
   ```

### Dialog Component

#### Before (v2.x)
```tsx
// Old dialog
<Modal
  visible={isOpen}
  onCancel={handleClose}
  title="Confirm Action"
  width={600}
>
  <p>Are you sure?</p>
</Modal>
```

#### After (v3.0)
```tsx
// New mobile-first dialog
import { 
  Dialog, 
  DialogHeader, 
  DialogBody, 
  DialogFooter 
} from "~/components/Core/Feedback";

<Dialog
  isOpen={isOpen}                    // ✅ Changed: visible → isOpen
  onClose$={handleClose}             // ✅ Changed: onCancel → onClose$
  size="responsive"                  // ✅ New: auto mobile fullscreen
  backdrop="medium"                  // ✅ New: backdrop blur options
  closeOnBackdropClick              // ✅ New: accessibility features
  closeOnEsc
>
  <DialogHeader>
    <h2>Confirm Action</h2>          {/* ✅ Structured header */}
  </DialogHeader>
  
  <DialogBody>
    <p>Are you sure?</p>
  </DialogBody>
  
  <DialogFooter>                     {/* ✅ Structured footer */}
    <button onClick$={handleClose}>Cancel</button>
    <button onClick$={handleConfirm}>Confirm</button>
  </DialogFooter>
</Dialog>
```

#### Migration Steps
1. **Update component structure**:
   ```tsx
   // Replace single Modal with structured Dialog
   <Dialog>
     <DialogHeader>Title content</DialogHeader>
     <DialogBody>Main content</DialogBody>
     <DialogFooter>Action buttons</DialogFooter>
   </Dialog>
   ```

2. **Update props**:
   ```tsx
   visible → isOpen
   onCancel → onClose$
   width → size (with responsive options)
   ```

### Drawer Component

#### Before (v2.x)
```tsx
// Old drawer
<Drawer
  open={isOpen}
  onClose={handleClose}
  placement="right"
  width={400}
>
  <div>Drawer content</div>
</Drawer>
```

#### After (v3.0)
```tsx
// New gesture-enabled drawer
import { 
  Drawer, 
  DrawerHeader, 
  DrawerContent, 
  DrawerFooter 
} from "~/components/Core/Feedback";

<Drawer
  isOpen={isOpen}                    // ✅ Changed: open → isOpen
  onClose$={handleClose}             // ✅ Updated for Qwik
  placement="right"                  // ✅ Same placement options
  size="md"                          // ✅ New: responsive sizing
  enableSwipeGestures               // ✅ New: mobile gestures
  backdrop="medium"                  // ✅ New: backdrop options
>
  <DrawerHeader>
    <h3>Navigation</h3>              {/* ✅ Structured header */}
  </DrawerHeader>
  
  <DrawerContent>
    <div>Enhanced drawer content</div>
  </DrawerContent>
  
  <DrawerFooter>                     {/* ✅ Optional footer */}
    <button onClick$={handleClose}>Close</button>
  </DrawerFooter>
</Drawer>
```

#### Migration Steps
1. **Enable mobile gestures**:
   ```tsx
   <Drawer
     enableSwipeGestures             // Native swipe to close
     swipeThreshold={0.4}           // Customize sensitivity
   >
   ```

2. **Update size system**:
   ```tsx
   // Old fixed width
   width={400}
   
   // New responsive sizes
   size="sm"   // Mobile: full, Tablet: 320px, Desktop: 384px
   size="md"   // Mobile: full, Tablet: 384px, Desktop: 448px
   size="lg"   // Mobile: full, Tablet: 448px, Desktop: 512px
   ```

## 🎨 Theme System Migration

### Before (v2.x)
```tsx
// Old theme approach - scattered styling
<Alert className="bg-green-100 text-green-800 border-green-200" />
```

### After (v3.0)
```tsx
// New unified theme system
<Alert
  status="success"      // Automatic theme colors
  variant="solid"       // solid | outline | subtle
  size="md"            // Responsive sizing
/>
```

#### Theme Migration Steps

1. **Remove manual color classes**:
   ```tsx
   // ❌ Remove manual styling
   - <Alert className="bg-red-100 text-red-800" />
   
   // ✅ Use semantic status
   + <Alert status="error" variant="solid" />
   ```

2. **Update custom themes**:
   ```tsx
   // Create theme configuration
   const customTheme = {
     colors: {
       info: {
         100: '#e0f2fe',
         800: '#0c4a6e',
         // ... complete color palette
       }
     }
   };
   ```

3. **Use theme utilities**:
   ```tsx
   import { getStatusColors, getResponsiveSizeClasses } from "../utils/theme";
   
   // In custom components
   const statusClasses = getStatusColors("success", "outline");
   const sizeClasses = getResponsiveSizeClasses("md", "alert");
   ```

## 📱 Mobile-First Considerations

### Responsive Behavior Changes

#### Before (v2.x)
```tsx
// Old: Same appearance on all devices
<Dialog width={600}>
  Content that might be too wide on mobile
</Dialog>
```

#### After (v3.0)
```tsx
// New: Automatically responsive
<Dialog size="responsive">
  {/* 
    - Mobile: Fullscreen with safe area padding
    - Tablet: Modal with appropriate max-width
    - Desktop: Traditional modal dialog
  */}
  Content that adapts to screen size
</Dialog>
```

### Touch Target Updates

All interactive elements now meet mobile accessibility standards:

```tsx
// Automatic touch-friendly sizing
<Alert dismissible /> // Close button is 44x44px minimum
<Toast dismissible />  // Swipe gesture + touch targets
```

## 🧪 Testing Your Migration

### 1. **Component Checklist**
```tsx
// Test each migrated component
const TestSuite = component$(() => {
  return (
    <div class="p-4 space-y-4">
      {/* Alert variations */}
      <Alert status="info" dismissible size="sm" />
      <Alert status="success" dismissible size="md" />
      <Alert status="warning" dismissible size="lg" />
      <Alert status="error" dismissible variant="outline" />
      
      {/* Toast functionality */}
      <button onClick$={() => toast.success("Test toast")}>
        Test Toast
      </button>
      
      {/* Dialog responsiveness */}
      <Dialog isOpen={testDialog} size="responsive">
        <DialogBody>Test content</DialogBody>
      </Dialog>
      
      {/* Drawer gestures */}
      <Drawer isOpen={testDrawer} enableSwipeGestures>
        <DrawerContent>Test drawer</DrawerContent>
      </Drawer>
    </div>
  );
});
```

### 2. **Mobile Testing**
- [ ] Test on actual devices (iOS/Android)
- [ ] Verify touch targets are adequate (44px minimum)
- [ ] Check swipe gestures work smoothly
- [ ] Ensure safe area support on notched devices
- [ ] Test in both portrait and landscape orientations

### 3. **Theme Testing**
```tsx
// Test theme switching
const ThemeTest = component$(() => {
  return (
    <div>
      {/* Light theme */}
      <div data-theme="light">
        <Alert status="info" title="Light theme test" />
      </div>
      
      {/* Dark theme */}
      <div data-theme="dark">
        <Alert status="info" title="Dark theme test" />
      </div>
    </div>
  );
});
```

## 🔧 Automated Migration Tools

### Find and Replace Script

```bash
# Use these regex patterns for bulk updates

# Alert component props
find . -name "*.tsx" -type f -exec sed -i 's/type="/status="/g' {} \;
find . -name "*.tsx" -type f -exec sed -i 's/closable/dismissible/g' {} \;
find . -name "*.tsx" -type f -exec sed -i 's/showIcon/icon/g' {} \;

# Dialog component props
find . -name "*.tsx" -type f -exec sed -i 's/visible="/isOpen="/g' {} \;
find . -name "*.tsx" -type f -exec sed -i 's/onCancel="/onClose$="/g' {} \;

# Drawer component props
find . -name "*.tsx" -type f -exec sed -i 's/open="/isOpen="/g' {} \;
```

### TypeScript Migration Helper

```tsx
// Add this to help catch migration issues
type LegacyAlertProps = {
  type: "info" | "success" | "warning" | "error";
  closable?: boolean;
  showIcon?: boolean;
  className?: string;
};

// This will show TypeScript errors for old props
const migrationHelper = (props: LegacyAlertProps) => {
  console.warn("Update to new Alert props:", {
    status: props.type,          // type → status
    dismissible: props.closable, // closable → dismissible
    icon: props.showIcon,        // showIcon → icon
    class: props.className,      // className → class
  });
};
```

## 🚨 Common Migration Issues

### Issue 1: Toast Not Appearing
**Problem**: Toasts don't show after migration
**Solution**: Ensure ToastContainer is added to app root
```tsx
// Missing ToastContainer
<App /> // ❌ No toasts will appear

// Fixed
<App>
  <ToastContainer position="top-right" /> {/* ✅ Add this */}
</App>
```

### Issue 2: Dialog Too Wide on Mobile
**Problem**: Dialog appears full-width instead of modal
**Solution**: Use responsive size option
```tsx
// Fixed width - doesn't adapt
<Dialog width={600} /> // ❌

// Responsive sizing
<Dialog size="responsive" /> // ✅
```

### Issue 3: Gestures Not Working
**Problem**: Swipe gestures don't work on Drawer
**Solution**: Enable gesture support explicitly
```tsx
// Missing gesture config
<Drawer isOpen={true} /> // ❌

// Enable gestures
<Drawer isOpen={true} enableSwipeGestures /> // ✅
```

### Issue 4: Theme Colors Not Applied
**Problem**: Components don't use theme colors
**Solution**: Use status props instead of manual classes
```tsx
// Manual styling - theme unaware
<Alert className="bg-red-100 text-red-800" /> // ❌

// Theme-aware status
<Alert status="error" variant="solid" /> // ✅
```

## 📊 Migration Timeline

### Week 1: Preparation
- [ ] Review current component usage
- [ ] Set up testing environment
- [ ] Create component inventory

### Week 2: Core Migration
- [ ] Migrate Alert components
- [ ] Set up Toast system
- [ ] Update basic Dialog usage

### Week 3: Advanced Features
- [ ] Enable mobile gestures
- [ ] Implement theme system
- [ ] Test responsive behavior

### Week 4: Polish & Testing
- [ ] Mobile device testing
- [ ] Performance optimization
- [ ] Documentation updates

## 🎯 Post-Migration Benefits

After completing the migration, you'll have:

✅ **Mobile-first design** with responsive behavior  
✅ **Touch-optimized interactions** with gesture support  
✅ **Unified theme system** with automatic dark mode  
✅ **Enhanced accessibility** with WCAG 2.1 AA compliance  
✅ **Better performance** with optimized animations  
✅ **Improved developer experience** with better TypeScript support  

## 🆘 Getting Help

**Need assistance with migration?**
- **Check examples** in each component's Examples folder
- **Review API docs** in the docs folder
- **Test with provided** playground components
- **Common issues** are covered in [TroubleshootingGuide.md](./TroubleshootingGuide.md)

**Migration Support:**
- Component-specific migration notes in each component's folder
- Interactive examples to compare old vs new behavior
- TypeScript definitions to catch breaking changes

---

**Ready to migrate?** Start with the [Getting Started Guide](./GettingStarted.md) to understand the new component system, then work through each component systematically.