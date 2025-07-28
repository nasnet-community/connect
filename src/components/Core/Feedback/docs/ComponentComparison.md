# Component Comparison Guide

This guide helps you choose the right feedback component for your specific use case, with detailed comparisons and decision trees.

## 🤔 Quick Decision Tree

```
Need to show feedback to the user?
├── Is it temporary/dismissible?
│   ├── Should it overlay content?
│   │   ├── System-wide notification → **Toast**
│   │   └── Contextual information → **Popover**
│   └── Should it be inline with content?
│       ├── Form validation → **ErrorMessage**
│       └── General notification → **Alert**
├── Need user interaction/decision?
│   ├── Side panel/navigation → **Drawer**
│   └── Modal overlay → **Dialog**
└── Marketing/promotional content → **PromoBanner**
```

## 📊 Component Comparison Matrix

| Component | Purpose | Position | Dismissible | Interactive | Mobile Optimized | Best For |
|-----------|---------|----------|-------------|-------------|------------------|----------|
| **Alert** | Inline notifications | Static in flow | Optional | Limited | ✅ Touch targets | Status messages, warnings |
| **Toast** | Temporary notifications | Overlay (fixed) | Auto/Manual | Limited | ✅ Swipe gestures | Success/error feedback |
| **Dialog** | Modal interactions | Overlay (centered) | Manual | Full | ✅ Fullscreen mobile | Confirmations, forms |
| **Drawer** | Side panels | Overlay (edge) | Manual | Full | ✅ Native gestures | Navigation, detailed info |
| **Popover** | Contextual info | Relative to trigger | Auto/Manual | Limited | ✅ Mobile strategy | Tooltips, quick actions |
| **PromoBanner** | Marketing content | Top/bottom/inline | Optional | CTA buttons | ✅ Responsive layout | Promotions, announcements |
| **ErrorMessage** | Form validation | Inline with field | Optional | None | ✅ Touch-friendly | Form errors, validation |

## 🎯 Detailed Use Case Analysis

### Alert vs Toast vs ErrorMessage

#### When to use **Alert**
```tsx
// ✅ Use Alert for:
// - Inline status messages that are part of the content flow
// - Information that should remain visible until dismissed
// - Messages related to the current page/context

// Page-level status
<Alert status="info" title="System Maintenance">
  Scheduled maintenance will occur tonight from 2-4 AM EST.
</Alert>

// Section-level warning
<Alert status="warning" dismissible>
  Your subscription expires in 3 days. 
  <a href="/billing">Renew now</a>
</Alert>

// Success confirmation that stays visible
<Alert status="success" title="Profile Updated" autoCloseDuration={5000}>
  Your profile information has been saved successfully.
</Alert>
```

#### When to use **Toast**
```tsx
// ✅ Use Toast for:
// - Temporary notifications that don't interrupt workflow
// - System-wide feedback (saves, errors, confirmations)
// - Actions that happen in the background

const toast = useToast();

// Action feedback
const handleSave = $(() => {
  saveData();
  toast.success("Changes saved successfully!");
});

// Background process notification
const handleUpload = $(() => {
  uploadFile();
  toast.info("File upload started", {
    action: {
      label: "View Progress",
      onClick$: () => showProgress(),
    }
  });
});

// Error that doesn't block workflow
const handleApiError = $(() => {
  toast.error("Unable to sync. Will retry automatically.", {
    duration: 4000,
  });
});
```

#### When to use **ErrorMessage**
```tsx
// ✅ Use ErrorMessage for:
// - Form validation errors
// - Field-specific problems
// - Errors that require user action to resolve

// Form field validation
<div>
  <input 
    type="email" 
    id="email"
    class={emailError ? "border-red-500" : ""}
  />
  {emailError && (
    <ErrorMessage
      message="Please enter a valid email address"
      fieldId="email"
      size="sm"
    />
  )}
</div>

// Multiple validation errors
<ErrorMessage
  title="Form Validation Failed"
  message="Please correct the errors below and try again"
  type="error"
  dismissible
/>

// Field-specific warning
<ErrorMessage
  message="This username is already taken"
  type="warning"
  showIcon
/>
```

### Dialog vs Drawer vs Popover

#### When to use **Dialog**
```tsx
// ✅ Use Dialog for:
// - Modal workflows that require full attention
// - Confirmations for destructive actions
// - Forms that create/edit important data
// - Content that needs to block interaction with the page

// Confirmation dialog
<Dialog isOpen={showDelete} onClose$={() => setShowDelete(false)}>
  <DialogHeader>
    <h2>Delete Account</h2>
  </DialogHeader>
  <DialogBody>
    <p>Are you sure you want to delete your account? This action cannot be undone.</p>
  </DialogBody>
  <DialogFooter>
    <button onClick$={() => setShowDelete(false)}>Cancel</button>
    <button onClick$={handleDelete} class="btn-danger">Delete</button>
  </DialogFooter>
</Dialog>

// Important form
<Dialog isOpen={showCreateProject} size="lg">
  <DialogHeader>
    <h2>Create New Project</h2>
  </DialogHeader>
  <DialogBody>
    <ProjectForm onSubmit$={handleCreate} />
  </DialogBody>
</Dialog>

// Critical information
<Dialog isOpen={showTerms} size="responsive">
  <DialogHeader>
    <h2>Terms of Service Update</h2>
  </DialogHeader>
  <DialogBody scrollable maxHeight="60vh">
    <TermsContent />
  </DialogBody>
  <DialogFooter>
    <button onClick$={handleAccept}>Accept Terms</button>
  </DialogFooter>
</Dialog>
```

#### When to use **Drawer**
```tsx
// ✅ Use Drawer for:
// - Navigation menus
// - Detailed information panels
// - Secondary workflows that don't block main content
// - Mobile-first sliding panels

// Mobile navigation
<Drawer
  isOpen={showNav}
  onClose$={() => setShowNav(false)}
  placement="left"
  enableSwipeGestures
>
  <DrawerHeader>
    <h3>Menu</h3>
  </DrawerHeader>
  <DrawerContent>
    <Navigation />
  </DrawerContent>
</Drawer>

// Product details
<Drawer
  isOpen={showDetails}
  placement="right"
  size="lg"
  enableSwipeGestures
>
  <DrawerHeader>
    <h3>Product Details</h3>
  </DrawerHeader>
  <DrawerContent scrollable>
    <ProductInfo product={selectedProduct} />
  </DrawerContent>
  <DrawerFooter>
    <button onClick$={addToCart}>Add to Cart</button>
  </DrawerFooter>
</Drawer>

// Filter panel
<Drawer
  isOpen={showFilters}
  placement="bottom"
  size="md"
  enableSwipeGestures
>
  <DrawerContent>
    <FilterForm onApply$={handleFilterApply} />
  </DrawerContent>
</Drawer>
```

#### When to use **Popover**
```tsx
// ✅ Use Popover for:
// - Contextual help or information
// - Quick actions menus
// - Small forms or inputs
// - Tooltips with rich content

// Help tooltip
<Popover placement="top" trigger="hover">
  <PopoverTrigger>
    <button class="help-icon">?</button>
  </PopoverTrigger>
  <PopoverContent>
    <div class="p-3 max-w-xs">
      <p class="text-sm">
        This field accepts email addresses in the format: user@domain.com
      </p>
    </div>
  </PopoverContent>
</Popover>

// Actions menu
<Popover placement="bottom-end" trigger="click">
  <PopoverTrigger>
    <button>⋯</button>
  </PopoverTrigger>
  <PopoverContent>
    <div class="py-1">
      <button class="block w-full text-left px-3 py-2 hover:bg-gray-100">
        Edit
      </button>
      <button class="block w-full text-left px-3 py-2 hover:bg-gray-100">
        Share
      </button>
      <button class="block w-full text-left px-3 py-2 hover:bg-gray-100 text-red-600">
        Delete
      </button>
    </div>
  </PopoverContent>
</Popover>

// Quick form
<Popover placement="bottom" trigger="click" mobileStrategy="modal">
  <PopoverTrigger>
    <button>Add Note</button>
  </PopoverTrigger>
  <PopoverContent>
    <div class="p-4 w-80">
      <textarea 
        placeholder="Enter your note..."
        class="w-full p-2 border rounded mb-2"
        rows={3}
      />
      <div class="flex justify-end gap-2">
        <button class="btn-secondary">Cancel</button>
        <button class="btn-primary">Save</button>
      </div>
    </div>
  </PopoverContent>
</Popover>
```

## 🎨 Visual Design Considerations

### Information Hierarchy

```tsx
// ✅ Correct hierarchy: Most important to least important
// 1. Dialog - Blocks everything, requires immediate attention
<Dialog isOpen={criticalError}>
  <DialogBody>Critical system error detected</DialogBody>
</Dialog>

// 2. Toast - Important but non-blocking
toast.error("Failed to save changes");

// 3. Alert - Important page-level information
<Alert status="warning" title="Maintenance Notice">
  System will be down for maintenance tonight
</Alert>

// 4. ErrorMessage - Field-level validation
<ErrorMessage message="Required field" />

// 5. Popover - Contextual help
<Popover><PopoverContent>Help text</PopoverContent></Popover>
```

### Color and Status Consistency

```tsx
// ✅ Consistent status usage across components
const statusExample = {
  // Success - completed actions, confirmations
  success: {
    alert: <Alert status="success" title="Profile saved" />,
    toast: () => toast.success("Upload complete"),
    error: <ErrorMessage type="success" message="Validation passed" />,
  },
  
  // Error - failures, critical issues
  error: {
    alert: <Alert status="error" title="Connection failed" />,
    toast: () => toast.error("Unable to delete item"),
    error: <ErrorMessage type="error" message="Invalid input" />,
  },
  
  // Warning - cautions, potential issues
  warning: {
    alert: <Alert status="warning" title="Storage almost full" />,
    toast: () => toast.warning("Unsaved changes"),
    error: <ErrorMessage type="warning" message="Password strength: weak" />,
  },
  
  // Info - neutral information, tips
  info: {
    alert: <Alert status="info" title="New features available" />,
    toast: () => toast.info("Sync in progress"),
    error: <ErrorMessage type="info" message="Optional field" />,
  },
};
```

## 📱 Mobile-Specific Decisions

### Screen Size Considerations

```tsx
// Mobile-first component selection
const MobileAwareExample = component$(() => {
  const isMobile = useSignal(false);
  
  useVisibleTask$(() => {
    isMobile.value = window.innerWidth < 768;
  });
  
  return (
    <>
      {isMobile.value ? (
        // ✅ Mobile: Use Drawer for better UX
        <Drawer
          isOpen={showDetails}
          placement="bottom"
          enableSwipeGestures
        >
          <DrawerContent>
            <DetailView />
          </DrawerContent>
        </Drawer>
      ) : (
        // ✅ Desktop: Use Dialog for modal experience
        <Dialog isOpen={showDetails} size="lg">
          <DialogBody>
            <DetailView />
          </DialogBody>
        </Dialog>
      )}
    </>
  );
});
```

### Touch vs Mouse Interactions

```tsx
// Touch-optimized component choices
const TouchOptimizedMenu = component$(() => {
  return (
    <>
      {/* ✅ Mobile: Drawer with swipe gestures */}
      <div class="block md:hidden">
        <Drawer
          isOpen={showMenu}
          placement="left"
          enableSwipeGestures
          size="md"
        >
          <DrawerContent>
            <TouchFriendlyMenu />
          </DrawerContent>
        </Drawer>
      </div>
      
      {/* ✅ Desktop: Popover with hover */}
      <div class="hidden md:block">
        <Popover trigger="hover" placement="bottom">
          <PopoverTrigger>
            <button>Menu</button>
          </PopoverTrigger>
          <PopoverContent>
            <CompactMenu />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
});
```

## 🔄 Component Combinations

### Layered Feedback

```tsx
// ✅ Combining components for comprehensive feedback
const LayeredFeedbackExample = component$(() => {
  const toast = useToast();
  
  return (
    <div>
      {/* 1. Page-level alert for general status */}
      <Alert status="info" title="Beta Feature">
        You're using a beta feature. 
        <Popover placement="right" trigger="click">
          <PopoverTrigger>
            <button class="underline">Learn more</button>
          </PopoverTrigger>
          <PopoverContent>
            <div class="p-3">
              <p>Beta features may have limited functionality.</p>
            </div>
          </PopoverContent>
        </Popover>
      </Alert>
      
      {/* 2. Form with field-level validation */}
      <form>
        <div>
          <input type="email" />
          <ErrorMessage message="Invalid email format" />
        </div>
        
        <button
          onClick$={() => {
            // 3. Action feedback via toast
            toast.success("Form submitted successfully!");
          }}
        >
          Submit
        </button>
      </form>
      
      {/* 4. Critical actions use dialog */}
      <Dialog isOpen={showConfirm}>
        <DialogHeader>Confirm Submission</DialogHeader>
        <DialogBody>
          Are you sure you want to submit this form?
        </DialogBody>
        <DialogFooter>
          <button onClick$={() => setShowConfirm(false)}>
            Cancel
          </button>
          <button onClick$={handleSubmit}>
            Confirm
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  );
});
```

### Progressive Disclosure

```tsx
// ✅ Using components for progressive disclosure
const ProgressiveDisclosureExample = component$(() => {
  return (
    <div>
      {/* 1. Start with subtle hint */}
      <Alert status="info" variant="subtle" size="sm">
        Need help? Click the help icon for more information.
      </Alert>
      
      {/* 2. Contextual help via popover */}
      <div class="flex items-center gap-2">
        <input type="password" />
        <Popover placement="right" trigger="click">
          <PopoverTrigger>
            <button class="help-icon">?</button>
          </PopoverTrigger>
          <PopoverContent>
            <div class="p-3 max-w-xs">
              <p class="text-sm mb-2">Password requirements:</p>
              <ul class="text-xs space-y-1">
                <li>• At least 8 characters</li>
                <li>• Include uppercase and lowercase</li>
                <li>• Include numbers and symbols</li>
              </ul>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      {/* 3. Detailed help via drawer */}
      <button
        onClick$={() => setShowDetailedHelp(true)}
        class="text-sm underline"
      >
        View detailed security guide
      </button>
      
      <Drawer
        isOpen={showDetailedHelp}
        onClose$={() => setShowDetailedHelp(false)}
        placement="right"
        size="lg"
      >
        <DrawerHeader>
          <h3>Password Security Guide</h3>
        </DrawerHeader>
        <DrawerContent scrollable>
          <SecurityGuide />
        </DrawerContent>
      </Drawer>
    </div>
  );
});
```

## 🚫 Anti-Patterns to Avoid

### ❌ Wrong Component Choices

```tsx
// ❌ Don't use Dialog for simple confirmations
<Dialog isOpen={showSimpleConfirm}>
  <DialogBody>Are you sure?</DialogBody>
</Dialog>

// ✅ Use Alert or Toast for simple confirmations
<Alert
  status="warning"
  title="Confirm Action"
  dismissible
  onDismiss$={handleCancel}
>
  Are you sure you want to continue?
  <button onClick$={handleConfirm}>Yes, continue</button>
</Alert>

// ❌ Don't use multiple overlapping modals
<Dialog isOpen={dialog1}>
  <DialogBody>
    First dialog
    <Dialog isOpen={dialog2}>  {/* ❌ Modal on modal */}
      <DialogBody>Second dialog</DialogBody>
    </Dialog>
  </DialogBody>
</Dialog>

// ✅ Use progressive disclosure instead
<Dialog isOpen={primaryDialog}>
  <DialogBody>
    First step content
    <button onClick$={() => goToNextStep()}>
      Next Step
    </button>
  </DialogBody>
</Dialog>

// ❌ Don't use Toast for critical errors that need user action
toast.error("Your account has been suspended. Contact support.");

// ✅ Use Dialog or Alert for critical issues
<Alert status="error" title="Account Suspended" dismissible={false}>
  Your account has been suspended. 
  <a href="/contact">Contact support</a> to resolve this issue.
</Alert>
```

### ❌ Poor Information Architecture

```tsx
// ❌ Don't mix different feedback levels inconsistently
<div>
  <Dialog isOpen={true}>  {/* ❌ Blocking modal for minor info */}
    <DialogBody>File uploaded successfully</DialogBody>
  </Dialog>
</div>

// ✅ Match feedback level to information importance
const handleUpload = $(() => {
  uploadFile();
  toast.success("File uploaded successfully");  // ✅ Non-blocking feedback
});

// ❌ Don't stack too many feedback components
<div>
  <Alert status="error" title="Multiple Errors" />
  <Alert status="warning" title="Warning Message" />
  <Alert status="info" title="Information" />
  <ErrorMessage message="Field error" />
  {/* User overwhelmed with feedback */}
</div>

// ✅ Prioritize and group related feedback
<div>
  <Alert status="error" title="Form Submission Failed" dismissible>
    Please correct the errors below and try again.
  </Alert>
  
  {/* Individual field errors */}
  <form>
    <div>
      <input type="email" />
      <ErrorMessage message="Invalid email" />
    </div>
  </form>
</div>
```

## 📋 Decision Checklist

Use this checklist when choosing feedback components:

### Purpose & Context
- [ ] What type of information am I conveying? (status, error, confirmation, help)
- [ ] How critical is this information? (critical, important, nice-to-know)
- [ ] Does it require immediate user attention?
- [ ] Is it related to a specific field/action or general?

### User Experience
- [ ] Should this block the user's workflow?
- [ ] How long should this be visible?
- [ ] Does the user need to interact with it?
- [ ] Will it work well on mobile devices?

### Technical Considerations
- [ ] Is this triggered by user action or system event?
- [ ] Do I need to stack multiple instances?
- [ ] Does it need to persist across page changes?
- [ ] Are there accessibility requirements?

### Content & Design
- [ ] How much content needs to be displayed?
- [ ] Does it need custom styling or actions?
- [ ] Should it be dismissible?
- [ ] Does it need animations or transitions?

## 🎯 Summary Recommendations

| Scenario | Recommended Component | Alternative | Notes |
|----------|----------------------|-------------|-------|
| **Form validation error** | ErrorMessage | Alert (if general) | Use with proper field association |
| **Action success** | Toast | Alert (if persistent) | Auto-dismiss for better UX |
| **Critical system error** | Alert + Dialog | Alert only | Use Dialog if action required |
| **Help/tooltip** | Popover | Drawer (mobile) | Consider mobile strategy |
| **Confirmation** | Dialog | Alert (simple) | Match complexity to action importance |
| **Navigation menu** | Drawer | Popover (desktop) | Enable gestures on mobile |
| **Marketing content** | PromoBanner | Alert | Use for promotional messaging |
| **Temporary notification** | Toast | Alert | Use for non-blocking feedback |

---

**Need more specific guidance?** Check out the individual component documentation for detailed usage examples and the [Best Practices Guide](./BestPractices.md) for design patterns.