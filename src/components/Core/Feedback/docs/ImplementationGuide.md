# Implementation Guide

Complete step-by-step guide for implementing the enhanced Core Feedback Components in your Qwik application with mobile-first design and advanced features.

## 🚀 Quick Start Implementation

### Step 1: Project Setup

```bash
# Ensure you have Qwik setup with TypeScript
npm create qwik@latest my-app
cd my-app

# Install additional dependencies if needed
npm install @builder.io/qwik @builder.io/qwik-city
```

### Step 2: Import Core Components

```tsx
// src/components/ui/feedback.ts
// Create a centralized export file for your app
export {
  Alert,
  Toast,
  ToastContainer,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerFooter,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PromoBanner,
  ErrorMessage,
  useToast,
} from "~/components/Core/Feedback";
```

### Step 3: Root Setup

```tsx
// src/root.tsx
import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { ToastContainer } from "./components/ui/feedback";

import "./global.css";

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        
        {/* Add ToastContainer at the root level */}
        <ToastContainer
          position="top-right"
          maxVisible={5}
          mobileOptimized
        />
        
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
```

### Step 4: CSS Setup

```css
/* src/global.css */

/* Include theme CSS variables */
:root {
  /* Feedback component colors */
  --feedback-info-50: #f0f9ff;
  --feedback-info-100: #e0f2fe;
  --feedback-info-500: #0ea5e9;
  --feedback-info-800: #075985;
  
  --feedback-success-50: #f0fdf4;
  --feedback-success-100: #dcfce7;
  --feedback-success-500: #22c55e;
  --feedback-success-800: #166534;
  
  --feedback-warning-50: #fffbeb;
  --feedback-warning-100: #fef3c7;
  --feedback-warning-500: #f59e0b;
  --feedback-warning-800: #92400e;
  
  --feedback-error-50: #fef2f2;
  --feedback-error-100: #fee2e2;
  --feedback-error-500: #ef4444;
  --feedback-error-800: #991b1b;
  
  /* Mobile-specific variables */
  --feedback-touch-target-min: 44px;
  --feedback-safe-area-top: env(safe-area-inset-top, 0px);
  --feedback-safe-area-bottom: env(safe-area-inset-bottom, 0px);
  --feedback-safe-area-left: env(safe-area-inset-left, 0px);
  --feedback-safe-area-right: env(safe-area-inset-right, 0px);
}

/* Dark mode overrides */
[data-theme="dark"] {
  --feedback-info-100: #0c4a6e;
  --feedback-info-800: #e0f2fe;
  /* ... other dark mode colors */
}

/* Mobile breakpoints */
@media (max-width: 767px) {
  .mobile\:block { display: block; }
  .mobile\:hidden { display: none; }
  /* Add mobile-specific utilities */
}

@media (min-width: 768px) {
  .tablet\:block { display: block; }
  .tablet\:hidden { display: none; }
  /* Add tablet-specific utilities */
}

@media (min-width: 1024px) {
  .desktop\:block { display: block; }
  .desktop\:hidden { display: none; }
  /* Add desktop-specific utilities */
}

/* Safe area utilities */
.p-safe {
  padding-top: var(--feedback-safe-area-top);
  padding-right: var(--feedback-safe-area-right);
  padding-bottom: var(--feedback-safe-area-bottom);
  padding-left: var(--feedback-safe-area-left);
}

.pt-safe { padding-top: var(--feedback-safe-area-top); }
.pb-safe { padding-bottom: var(--feedback-safe-area-bottom); }

/* Animation classes */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slide-down {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes scale-up {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.animate-fade-in { animation: fade-in 200ms ease-out; }
.animate-slide-up { animation: slide-up 200ms ease-out; }
.animate-slide-down { animation: slide-down 200ms ease-out; }
.animate-scale-up { animation: scale-up 200ms ease-out; }

/* Backdrop blur utilities */
.backdrop-blur-sm { backdrop-filter: blur(4px); }
.backdrop-blur-md { backdrop-filter: blur(8px); }
.backdrop-blur-lg { backdrop-filter: blur(12px); }
```

## 🎯 Common Implementation Patterns

### Pattern 1: Form with Validation

```tsx
// src/components/forms/ContactForm.tsx
import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { Alert, ErrorMessage, useToast } from "../ui/feedback";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactForm = component$(() => {
  const toast = useToast();
  const isSubmitting = useSignal(false);
  const showSuccess = useSignal(false);
  
  const formData = useStore<FormData>({
    name: '',
    email: '',
    message: '',
  });
  
  const errors = useStore<FormErrors>({});
  
  const validateForm = $(() => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    // Update errors store
    Object.assign(errors, newErrors);
    
    return Object.keys(newErrors).length === 0;
  });
  
  const handleSubmit = $(async (event: SubmitEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please correct the errors below");
      return;
    }
    
    isSubmitting.value = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success
      showSuccess.value = true;
      toast.success("Message sent successfully!");
      
      // Reset form
      Object.assign(formData, { name: '', email: '', message: '' });
      Object.assign(errors, {});
      
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      isSubmitting.value = false;
    }
  });
  
  return (
    <div class="max-w-md mx-auto p-6">
      <h2 class="text-2xl font-bold mb-6">Contact Us</h2>
      
      {/* Success Alert */}
      {showSuccess.value && (
        <Alert
          status="success"
          title="Message Sent!"
          dismissible
          animation="slideDown"
          autoCloseDuration={5000}
          onDismiss$={() => (showSuccess.value = false)}
          class="mb-6"
        >
          We'll get back to you within 24 hours.
        </Alert>
      )}
      
      <form onSubmit$={handleSubmit} class="space-y-4">
        {/* Name Field */}
        <div>
          <label for="name" class="block text-sm font-medium mb-1">
            Name *
          </label>
          <input
            id="name"
            type="text"
            bind:value={formData.name}
            class={[
              "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2",
              errors.name 
                ? "border-red-500 focus:ring-red-500" 
                : "border-gray-300 focus:ring-blue-500"
            ]}
            disabled={isSubmitting.value}
          />
          {errors.name && (
            <ErrorMessage
              message={errors.name}
              fieldId="name"
              size="sm"
            />
          )}
        </div>
        
        {/* Email Field */}
        <div>
          <label for="email" class="block text-sm font-medium mb-1">
            Email *
          </label>
          <input
            id="email"
            type="email"
            bind:value={formData.email}
            class={[
              "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2",
              errors.email 
                ? "border-red-500 focus:ring-red-500" 
                : "border-gray-300 focus:ring-blue-500"
            ]}
            disabled={isSubmitting.value}
          />
          {errors.email && (
            <ErrorMessage
              message={errors.email}
              fieldId="email"
              size="sm"
            />
          )}
        </div>
        
        {/* Message Field */}
        <div>
          <label for="message" class="block text-sm font-medium mb-1">
            Message *
          </label>
          <textarea
            id="message"
            bind:value={formData.message}
            rows={4}
            class={[
              "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2",
              errors.message 
                ? "border-red-500 focus:ring-red-500" 
                : "border-gray-300 focus:ring-blue-500"
            ]}
            disabled={isSubmitting.value}
          />
          {errors.message && (
            <ErrorMessage
              message={errors.message}
              fieldId="message"
              size="sm"
            />
          )}
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting.value}
          class={[
            "w-full py-2 px-4 rounded-md font-medium transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            isSubmitting.value
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          ]}
        >
          {isSubmitting.value ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
});
```

### Pattern 2: Data Management with Feedback

```tsx
// src/components/data/UserList.tsx
import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { 
  Alert, 
  Dialog, 
  DialogHeader, 
  DialogBody, 
  DialogFooter,
  useToast 
} from "../ui/feedback";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const UserList = component$(() => {
  const toast = useToast();
  const users = useStore<User[]>([]);
  const loading = useSignal(false);
  const error = useSignal<string | null>(null);
  const deleteConfirm = useStore({
    isOpen: false,
    user: null as User | null,
  });
  
  const loadUsers = $(async () => {
    loading.value = true;
    error.value = null;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockUsers: User[] = [
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
      ];
      
      users.splice(0, users.length, ...mockUsers);
      
    } catch (err) {
      error.value = 'Failed to load users. Please try again.';
      toast.error('Unable to load user data');
    } finally {
      loading.value = false;
    }
  });
  
  const handleDeleteUser = $(async (user: User) => {
    deleteConfirm.isOpen = true;
    deleteConfirm.user = user;
  });
  
  const confirmDelete = $(async () => {
    if (!deleteConfirm.user) return;
    
    const userToDelete = deleteConfirm.user;
    deleteConfirm.isOpen = false;
    deleteConfirm.user = null;
    
    try {
      // Optimistic update
      const index = users.findIndex(u => u.id === userToDelete.id);
      if (index > -1) {
        users.splice(index, 1);
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success(`${userToDelete.name} has been deleted`);
      
    } catch (err) {
      // Revert optimistic update
      users.push(userToDelete);
      toast.error('Failed to delete user. Please try again.');
    }
  });
  
  const cancelDelete = $(() => {
    deleteConfirm.isOpen = false;
    deleteConfirm.user = null;
  });
  
  // Load users on component mount
  useVisibleTask$(() => {
    loadUsers();
  });
  
  return (
    <div class="max-w-4xl mx-auto p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">User Management</h2>
        <button
          onClick$={loadUsers}
          disabled={loading.value}
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading.value ? "Loading..." : "Refresh"}
        </button>
      </div>
      
      {/* Error State */}
      {error.value && (
        <Alert
          status="error"
          title="Loading Error"
          dismissible
          onDismiss$={() => (error.value = null)}
          class="mb-6"
        >
          {error.value}
          <button
            onClick$={loadUsers}
            class="ml-2 underline hover:no-underline"
          >
            Retry
          </button>
        </Alert>
      )}
      
      {/* Loading State */}
      {loading.value && (
        <Alert
          status="info"
          title="Loading Users..."
          loading
          size="sm"
          variant="subtle"
          class="mb-6"
        />
      )}
      
      {/* User List */}
      {!loading.value && users.length === 0 && !error.value && (
        <Alert
          status="info"
          title="No Users Found"
          variant="subtle"
          class="mb-6"
        >
          No users have been added to the system yet.
        </Alert>
      )}
      
      {users.length > 0 && (
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Role
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-gray-500">
                    {user.email}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {user.role}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick$={() => handleDeleteUser(user)}
                      class="text-red-600 hover:text-red-900 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        isOpen={deleteConfirm.isOpen}
        onClose$={cancelDelete}
        size="md"
        backdrop="medium"
        closeOnBackdropClick={false}
        closeOnEsc
      >
        <DialogHeader>
          <h3 class="text-lg font-semibold text-gray-900">
            Confirm Deletion
          </h3>
        </DialogHeader>
        
        <DialogBody>
          <div class="space-y-3">
            <p class="text-gray-600">
              Are you sure you want to delete the following user?
            </p>
            
            {deleteConfirm.user && (
              <div class="bg-gray-50 rounded-lg p-3">
                <p class="font-medium">{deleteConfirm.user.name}</p>
                <p class="text-sm text-gray-500">{deleteConfirm.user.email}</p>
              </div>
            )}
            
            <Alert
              status="warning"
              variant="subtle"
              size="sm"
            >
              This action cannot be undone.
            </Alert>
          </div>
        </DialogBody>
        
        <DialogFooter>
          <button
            onClick$={cancelDelete}
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick$={confirmDelete}
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete User
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  );
});
```

### Pattern 3: Mobile-First Navigation

```tsx
// src/components/layout/Navigation.tsx
import { component$, useSignal, $ } from "@builder.io/qwik";
import { 
  Drawer, 
  DrawerHeader, 
  DrawerContent,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../ui/feedback";

export const Navigation = component$(() => {
  const mobileMenuOpen = useSignal(false);
  const userMenuOpen = useSignal(false);
  
  const navigationItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'Users', href: '/users', icon: '👥' },
    { label: 'Settings', href: '/settings', icon: '⚙️' },
    { label: 'Reports', href: '/reports', icon: '📈' },
  ];
  
  const userMenuItems = [
    { label: 'Profile', href: '/profile' },
    { label: 'Account Settings', href: '/account' },
    { label: 'Help & Support', href: '/help' },
    { label: 'Sign Out', href: '/logout', danger: true },
  ];
  
  const closeMobileMenu = $(() => {
    mobileMenuOpen.value = false;
  });
  
  return (
    <>
      {/* Desktop Navigation */}
      <nav class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            {/* Logo */}
            <div class="flex items-center">
              <a href="/" class="text-xl font-bold text-gray-900">
                MyApp
              </a>
            </div>
            
            {/* Desktop Menu */}
            <div class="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  <span class="mr-2">{item.icon}</span>
                  {item.label}
                </a>
              ))}
            </div>
            
            {/* User Menu & Mobile Menu Button */}
            <div class="flex items-center space-x-4">
              {/* Desktop User Menu */}
              <div class="hidden md:block">
                <Popover
                  placement="bottom-end"
                  trigger="click"
                  isOpen={userMenuOpen.value}
                  onOpenChange$={(open) => (userMenuOpen.value = open)}
                >
                  <PopoverTrigger>
                    <button class="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                      <img
                        src="/avatar.jpg"
                        alt="User"
                        class="h-8 w-8 rounded-full"
                      />
                      <span>John Doe</span>
                      <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </PopoverTrigger>
                  
                  <PopoverContent>
                    <div class="py-1 w-48">
                      {userMenuItems.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          class={[
                            "block px-4 py-2 text-sm hover:bg-gray-100",
                            item.danger ? "text-red-600" : "text-gray-700"
                          ]}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Mobile Menu Button */}
              <button
                onClick$={() => (mobileMenuOpen.value = true)}
                class="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Navigation Drawer */}
      <Drawer
        isOpen={mobileMenuOpen.value}
        onClose$={closeMobileMenu}
        placement="left"
        size="md"
        enableSwipeGestures
        swipeThreshold={0.3}
        backdrop="medium"
      >
        <DrawerHeader>
          <div class="flex items-center space-x-3">
            <img
              src="/avatar.jpg"
              alt="User"
              class="h-10 w-10 rounded-full"
            />
            <div>
              <p class="font-semibold text-gray-900">John Doe</p>
              <p class="text-sm text-gray-500">john@example.com</p>
            </div>
          </div>
        </DrawerHeader>
        
        <DrawerContent>
          <nav class="px-4 py-6 space-y-2">
            {/* Main Navigation */}
            <div class="space-y-1">
              <p class="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">
                Navigation
              </p>
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick$={closeMobileMenu}
                  class="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  <span class="text-lg">{item.icon}</span>
                  <span class="font-medium">{item.label}</span>
                </a>
              ))}
            </div>
            
            <hr class="my-6" />
            
            {/* User Menu */}
            <div class="space-y-1">
              <p class="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">
                Account
              </p>
              {userMenuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick$={closeMobileMenu}
                  class={[
                    "block px-3 py-2 rounded-md font-medium",
                    item.danger 
                      ? "text-red-600 hover:bg-red-50" 
                      : "text-gray-700 hover:bg-gray-100"
                  ]}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </DrawerContent>
      </Drawer>
    </>
  );
});
```

## 🎨 Theme Integration Implementation

### Custom Theme Setup

```tsx
// src/theme/feedback-theme.ts
import type { FeedbackTheme } from "~/components/Core/Feedback/utils/theme";

export const customFeedbackTheme: FeedbackTheme = {
  colors: {
    info: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9', // Primary info color
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      surface: '#fafcff',
      
      dark: {
        50: '#0c4a6e',
        100: '#075985',
        200: '#0369a1',
        300: '#0284c7',
        400: '#0ea5e9',
        500: '#38bdf8',
        600: '#7dd3fc',
        700: '#bae6fd',
        800: '#e0f2fe',
        900: '#f0f9ff',
        surface: '#0a1929',
      }
    },
    // ... other status colors
  },
  
  sizing: {
    sm: {
      padding: '8px 12px',
      fontSize: '14px',
      lineHeight: 1.4,
      minTouchTarget: 44,
    },
    md: {
      padding: '12px 16px',
      fontSize: '16px',
      lineHeight: 1.5,
      minTouchTarget: 44,
    },
    lg: {
      padding: '16px 20px',
      fontSize: '18px',
      lineHeight: 1.6,
      minTouchTarget: 48,
    },
  },
  
  animations: {
    duration: {
      fast: 150,
      normal: 200,
      slow: 300,
    },
    easing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
    transforms: {
      slideUp: 'translateY(20px)',
      slideDown: 'translateY(-20px)',
      scaleUp: 'scale(0.95)',
    },
  },
  
  mobile: {
    breakpoints: {
      mobile: 0,
      tablet: 768,
      desktop: 1024,
      xl: 1280,
    },
    touchTargets: {
      minimum: 44,
      comfortable: 48,
      thumb: 56,
    },
    safeAreas: {
      padding: 16,
      dynamic: true,
    },
  },
};
```

### Theme Provider Implementation

```tsx
// src/components/providers/ThemeProvider.tsx
import { 
  component$, 
  createContextId, 
  useContextProvider, 
  useVisibleTask$,
  Slot,
} from "@builder.io/qwik";
import type { FeedbackTheme } from "~/components/Core/Feedback/utils/theme";
import { customFeedbackTheme } from "~/theme/feedback-theme";

export const ThemeContext = createContextId<FeedbackTheme>('theme-context');

interface ThemeProviderProps {
  theme?: FeedbackTheme;
}

export const ThemeProvider = component$<ThemeProviderProps>(({ 
  theme = customFeedbackTheme 
}) => {
  useContextProvider(ThemeContext, theme);
  
  // Apply CSS custom properties
  useVisibleTask$(() => {
    const root = document.documentElement;
    
    // Apply color variables
    Object.entries(theme.colors).forEach(([status, colors]) => {
      Object.entries(colors).forEach(([shade, color]) => {
        if (typeof color === 'string') {
          root.style.setProperty(`--feedback-${status}-${shade}`, color);
        }
      });
      
      // Apply dark mode colors
      if (colors.dark) {
        Object.entries(colors.dark).forEach(([shade, color]) => {
          root.style.setProperty(`--feedback-${status}-dark-${shade}`, color);
        });
      }
    });
    
    // Apply sizing variables
    Object.entries(theme.sizing).forEach(([size, config]) => {
      root.style.setProperty(`--feedback-size-${size}-padding`, config.padding);
      root.style.setProperty(`--feedback-size-${size}-font-size`, config.fontSize);
      root.style.setProperty(`--feedback-size-${size}-line-height`, config.lineHeight.toString());
    });
    
    // Apply mobile variables
    root.style.setProperty('--feedback-touch-min', `${theme.mobile.touchTargets.minimum}px`);
    root.style.setProperty('--feedback-touch-comfortable', `${theme.mobile.touchTargets.comfortable}px`);
    root.style.setProperty('--feedback-touch-thumb', `${theme.mobile.touchTargets.thumb}px`);
  });
  
  return <Slot />;
});
```

### Using Theme Provider

```tsx
// src/root.tsx
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { customFeedbackTheme } from "./theme/feedback-theme";

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <RouterHead />
      </head>
      <body lang="en">
        <ThemeProvider theme={customFeedbackTheme}>
          <RouterOutlet />
          <ToastContainer position="top-right" />
        </ThemeProvider>
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
```

## 📱 Mobile-Specific Implementation

### Responsive Component Selection

```tsx
// src/hooks/useResponsive.ts
import { useSignal, useVisibleTask$ } from "@builder.io/qwik";

export function useResponsive() {
  const isMobile = useSignal(false);
  const isTablet = useSignal(false);
  const isDesktop = useSignal(false);
  
  useVisibleTask$(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      isMobile.value = width < 768;
      isTablet.value = width >= 768 && width < 1024;
      isDesktop.value = width >= 1024;
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    
    return () => window.removeEventListener('resize', updateSize);
  });
  
  return { isMobile, isTablet, isDesktop };
}

// Usage in component
export const ResponsiveComponent = component$(() => {
  const { isMobile, isDesktop } = useResponsive();
  const showModal = useSignal(false);
  
  return (
    <>
      <button onClick$={() => (showModal.value = true)}>
        Show Details
      </button>
      
      {isMobile.value ? (
        <Drawer
          isOpen={showModal.value}
          onClose$={() => (showModal.value = false)}
          placement="bottom"
          enableSwipeGestures
        >
          <DrawerContent>
            <DetailContent />
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog
          isOpen={showModal.value}
          onClose$={() => (showModal.value = false)}
          size="lg"
        >
          <DialogBody>
            <DetailContent />
          </DialogBody>
        </Dialog>
      )}
    </>
  );
});
```

### Safe Area Implementation

```tsx
// src/components/layout/SafeAreaWrapper.tsx
import { component$, Slot } from "@builder.io/qwik";

interface SafeAreaWrapperProps {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  all?: boolean;
  class?: string;
}

export const SafeAreaWrapper = component$<SafeAreaWrapperProps>(({
  top = false,
  bottom = false,
  left = false,
  right = false,
  all = false,
  class: className,
}) => {
  const safeAreaClasses = [];
  
  if (all) {
    safeAreaClasses.push('p-safe');
  } else {
    if (top) safeAreaClasses.push('pt-safe');
    if (bottom) safeAreaClasses.push('pb-safe');
    if (left) safeAreaClasses.push('pl-safe');
    if (right) safeAreaClasses.push('pr-safe');
  }
  
  return (
    <div class={[...safeAreaClasses, className].filter(Boolean).join(' ')}>
      <Slot />
    </div>
  );
});

// Usage
export const MobileLayout = component$(() => {
  return (
    <SafeAreaWrapper all>
      <header class="bg-blue-600 text-white p-4">
        <h1>App Header</h1>
      </header>
      
      <main class="flex-1 p-4">
        <Slot />
      </main>
      
      <footer class="bg-gray-100 p-4">
        <p>App Footer</p>
      </footer>
    </SafeAreaWrapper>
  );
});
```

## 🧪 Testing Implementation

### Component Testing

```tsx
// src/components/__tests__/ContactForm.test.tsx
import { createDOM } from '@builder.io/qwik/testing';
import { test, expect } from 'vitest';
import { ContactForm } from '../forms/ContactForm';

test('should validate form and show errors', async () => {
  const { screen, userEvent, render } = await createDOM();
  
  await render(<ContactForm />);
  
  // Try to submit empty form
  const submitButton = screen.querySelector('button[type="submit"]');
  await userEvent.click(submitButton);
  
  // Check that error messages appear
  const nameError = screen.querySelector('[data-testid="error-name"]');
  const emailError = screen.querySelector('[data-testid="error-email"]');
  
  expect(nameError?.textContent).toContain('Name is required');
  expect(emailError?.textContent).toContain('Email is required');
});

test('should show success message on valid submission', async () => {
  const { screen, userEvent, render } = await createDOM();
  
  await render(<ContactForm />);
  
  // Fill form with valid data
  const nameInput = screen.querySelector('#name') as HTMLInputElement;
  const emailInput = screen.querySelector('#email') as HTMLInputElement;
  const messageInput = screen.querySelector('#message') as HTMLTextAreaElement;
  
  await userEvent.type(nameInput, 'John Doe');
  await userEvent.type(emailInput, 'john@example.com');
  await userEvent.type(messageInput, 'This is a test message');
  
  // Submit form
  const submitButton = screen.querySelector('button[type="submit"]');
  await userEvent.click(submitButton);
  
  // Wait for success message
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const successAlert = screen.querySelector('[role="alert"]');
  expect(successAlert?.textContent).toContain('Message Sent!');
});
```

### Mobile Gesture Testing

```tsx
// src/components/__tests__/MobileDrawer.test.tsx
import { createDOM } from '@builder.io/qwik/testing';
import { test, expect } from 'vitest';
import { MobileDrawer } from '../MobileDrawer';

// Mock touch events
const createTouchEvent = (type: string, touches: Touch[]) => {
  return new TouchEvent(type, {
    touches: type === 'touchend' ? [] : touches,
    changedTouches: touches,
  });
};

const createTouch = (clientX: number, clientY: number): Touch => {
  return new Touch({
    identifier: 1,
    target: document.body,
    clientX,
    clientY,
  });
};

test('should close drawer on swipe gesture', async () => {
  const { screen, render } = await createDOM();
  
  let isOpen = true;
  const onClose = () => { isOpen = false; };
  
  await render(
    <MobileDrawer 
      isOpen={isOpen} 
      onClose$={onClose}
      enableSwipeGestures 
    />
  );
  
  const drawer = screen.querySelector('[data-testid="drawer"]') as HTMLElement;
  
  // Simulate swipe left gesture
  const startTouch = createTouch(300, 200);
  const endTouch = createTouch(100, 200); // 200px swipe left
  
  drawer.dispatchEvent(createTouchEvent('touchstart', [startTouch]));
  drawer.dispatchEvent(createTouchEvent('touchmove', [endTouch]));
  drawer.dispatchEvent(createTouchEvent('touchend', [endTouch]));
  
  // Wait for gesture processing
  await new Promise(resolve => setTimeout(resolve, 100));
  
  expect(isOpen).toBe(false);
});
```

## 🚀 Production Deployment

### Build Optimization

```tsx
// vite.config.ts
import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';

export default defineConfig(() => {
  return {
    plugins: [
      qwikVite({
        // Enable tree-shaking for feedback components
        entryStrategy: {
          type: 'smart',
        },
      }),
    ],
    
    build: {
      // Optimize for production
      rollupOptions: {
        output: {
          // Separate chunks for feedback components
          manualChunks: {
            'feedback-core': [
              'src/components/Core/Feedback/Alert',
              'src/components/Core/Feedback/Toast',
            ],
            'feedback-overlays': [
              'src/components/Core/Feedback/Dialog',
              'src/components/Core/Feedback/Drawer',
              'src/components/Core/Feedback/Popover',
            ],
          },
        },
      },
    },
    
    // PWA optimizations
    pwa: {
      registerType: 'autoUpdate',
      workbox: {
        // Cache feedback component assets
        runtimeCaching: [
          {
            urlPattern: /\/feedback\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'feedback-components',
            },
          },
        ],
      },
    },
  };
});
```

### Performance Monitoring

```tsx
// src/utils/performance.ts
export const FeedbackPerformanceMonitor = {
  // Track component render times
  measureRender: (componentName: string, renderFn: () => void) => {
    const start = performance.now();
    renderFn();
    const end = performance.now();
    
    console.log(`${componentName} render time: ${end - start}ms`);
    
    // Send to analytics if needed
    if (typeof gtag !== 'undefined') {
      gtag('event', 'timing_complete', {
        name: 'component_render',
        value: Math.round(end - start),
        event_category: 'Performance',
        event_label: componentName,
      });
    }
  },
  
  // Track gesture performance
  measureGesture: (gestureType: string, duration: number) => {
    console.log(`${gestureType} gesture duration: ${duration}ms`);
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'timing_complete', {
        name: 'gesture_performance',
        value: duration,
        event_category: 'Mobile',
        event_label: gestureType,
      });
    }
  },
};
```

### Analytics Integration

```tsx
// src/utils/analytics.ts
export const trackFeedbackInteraction = (
  component: string,
  action: string,
  details?: Record<string, any>
) => {
  // Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: 'Feedback',
      event_label: component,
      custom_parameters: details,
    });
  }
  
  // Custom analytics
  if (typeof analytics !== 'undefined') {
    analytics.track(`Feedback ${action}`, {
      component,
      ...details,
    });
  }
};

// Usage in components
const handleAlertDismiss = $(() => {
  trackFeedbackInteraction('Alert', 'dismiss', {
    status: 'success',
    autoClose: false,
  });
  
  onDismiss$?.();
});
```

This comprehensive implementation guide provides everything you need to successfully implement the enhanced Core Feedback Components in your Qwik application with mobile-first design, proper theming, and production-ready optimizations.