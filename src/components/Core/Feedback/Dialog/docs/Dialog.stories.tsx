// import { Dialog, DialogHeader, DialogBody, DialogFooter } from './Dialog';
// import { useSignal, $, component$ } from '@builder.io/qwik';
// import type { StoryObj } from '@storybook/html';

// export default {
//   title: 'Core/Feedback/Dialog',
//   component: 'div', // Using a placeholder element as component
//   parameters: {
//     docs: {
//       description: {
//         component: `
// ## Dialog Component

// A dialog (or modal) is an overlay that requires user interaction. It creates a mode that disables the main content and focuses the user's attention on a message or action.

// ### Features

// - Multiple size options (sm, md, lg, xl, full)
// - Vertical centering options
// - Focus trapping and management for accessibility
// - Customizable parts with header, body, and footer components
// - Dark mode support
// - Backdrop click handling
// - Keyboard navigation (Escape to close)
// - ARIA-compliant for screen readers
//         `,
//       },
//     },
//   },
//   argTypes: {
//     size: {
//       control: 'select',
//       options: ['sm', 'md', 'lg', 'xl', 'full'],
//       description: 'The size of the dialog',
//       defaultValue: 'md',
//     },
//     closeOnOutsideClick: {
//       control: 'boolean',
//       description: 'Whether to close the dialog when clicking outside',
//       defaultValue: true,
//     },
//     closeOnEsc: {
//       control: 'boolean',
//       description: 'Whether to close the dialog when pressing Escape key',
//       defaultValue: true,
//     },
//     hasCloseButton: {
//       control: 'boolean',
//       description: 'Whether the dialog should display the close button in the header',
//       defaultValue: true,
//     },
//     initialFocus: {
//       control: 'boolean',
//       description: 'Whether to initially focus the first focusable element in the dialog',
//       defaultValue: true,
//     },
//     trapFocus: {
//       control: 'boolean',
//       description: 'Whether to trap focus within the dialog',
//       defaultValue: true,
//     },
//     isCentered: {
//       control: 'boolean',
//       description: 'Whether the dialog is centered vertically',
//       defaultValue: true,
//     },
//     disableAnimation: {
//       control: 'boolean',
//       description: 'Whether to disable all animations',
//       defaultValue: false,
//     },
//     scrollable: {
//       control: 'boolean',
//       description: 'Whether to use a scrollable content area',
//       defaultValue: true,
//     },
//     hasBackdrop: {
//       control: 'boolean',
//       description: 'Whether the dialog should have a backdrop',
//       defaultValue: true,
//     },
//     zIndex: {
//       control: 'number',
//       description: 'CSS z-index for the dialog',
//       defaultValue: 1050,
//     },
//   },
// } as const;

// type Story = StoryObj<typeof Dialog>;

// // Wrapper component to properly use Qwik hooks
// // Properly define the Qwik component for the default dialog demo
// const DefaultDialogDemo = component$((props: any) => {
//   const isOpen = useSignal(true);
  
//   return (
//     <div>
//       <button
//         onClick$={() => isOpen.value = true}
//         class="px-4 py-2 bg-primary-500 text-white rounded-md"
//       >
//         Open Dialog
//       </button>
      
//       <Dialog
//         {...props}
//         isOpen={isOpen.value}
//         onClose$={() => isOpen.value = false}
//       >
//           <DialogHeader onClose$={() => isOpen.value = false}>
//             <h3 class="text-lg font-medium text-gray-900 dark:text-white">
//               Dialog Title
//             </h3>
//           </DialogHeader>
//           <DialogBody>
//             <p>This is a basic dialog with default configuration.</p>
//             <p class="mt-2">Dialogs are useful for displaying content that requires the user's attention or interaction.</p>
//           </DialogBody>
//           <DialogFooter>
//             <button
//               onClick$={() => isOpen.value = false}
//               class="px-4 py-2 bg-primary-500 text-white rounded-md"
//             >
//               Close
//             </button>
//           </DialogFooter>
//         </Dialog>
//       </div>
//     );
// });

// // Define the Default story with correct structure
// export const Default = {
//   render: (args: any) => <DefaultDialogDemo {...args} />,
//   args: {
//     size: 'md',
//     closeOnOutsideClick: true,
//     closeOnEsc: true,
//     hasCloseButton: true,
//     initialFocus: true,
//     trapFocus: true,
//     isCentered: true,
//     disableAnimation: false,
//     scrollable: true,
//     hasBackdrop: true,
//     zIndex: 1050,
//   },
// };

// // Without header and footer
// export const SimpleDialog = {
//   render: () => {
//     const isOpen = useSignal(false);
    
//     return (
//       <div>
//         <button
//           onClick$={() => isOpen.value = true}
//           class="px-4 py-2 bg-primary-500 text-white rounded-md"
//         >
//           Open Simple Dialog
//         </button>
        
//         <Dialog
//           isOpen={isOpen.value}
//           onClose$={() => isOpen.value = false}
//           title="Simple Dialog"
//         >
//           <DialogBody>
//             <p>This is a simple dialog with just a title prop and body content.</p>
//             <p class="mt-2">Using the title prop automatically creates a header with a close button.</p>
            
//             <div class="mt-4 flex justify-end">
//               <button
//                 onClick$={() => isOpen.value = false}
//                 class="px-4 py-2 bg-primary-500 text-white rounded-md"
//               >
//                 Close
//               </button>
//             </div>
//           </DialogBody>
//         </Dialog>
//       </div>
//     );
//   },
// };

// // Size variants
// export const SizeVariants = {
//   render: () => {
//     const isSmOpen = useSignal(false);
//     const isMdOpen = useSignal(false);
//     const isLgOpen = useSignal(false);
//     const isXlOpen = useSignal(false);
//     const isFullOpen = useSignal(false);
    
//     return (
//       <div class="space-y-4">
//         <div class="flex flex-wrap gap-3">
//           <button
//             onClick$={() => isSmOpen.value = true}
//             class="px-4 py-2 bg-primary-500 text-white rounded-md"
//           >
//             SM Size
//           </button>
//           <button
//             onClick$={() => isMdOpen.value = true}
//             class="px-4 py-2 bg-primary-500 text-white rounded-md"
//           >
//             MD Size
//           </button>
//           <button
//             onClick$={() => isLgOpen.value = true}
//             class="px-4 py-2 bg-primary-500 text-white rounded-md"
//           >
//             LG Size
//           </button>
//           <button
//             onClick$={() => isXlOpen.value = true}
//             class="px-4 py-2 bg-primary-500 text-white rounded-md"
//           >
//             XL Size
//           </button>
//           <button
//             onClick$={() => isFullOpen.value = true}
//             class="px-4 py-2 bg-primary-500 text-white rounded-md"
//           >
//             Full Size
//           </button>
//         </div>
        
//         <Dialog
//           isOpen={isSmOpen.value}
//           onClose$={() => isSmOpen.value = false}
//           size="sm"
//         >
//           <DialogHeader onClose$={() => isSmOpen.value = false}>
//             <h3 class="text-lg font-medium">SM Size Dialog</h3>
//           </DialogHeader>
//           <DialogBody>
//             <p>This is a small dialog suitable for simple alerts and confirmations.</p>
//           </DialogBody>
//           <DialogFooter>
//             <button
//               onClick$={() => isSmOpen.value = false}
//               class="px-4 py-2 bg-primary-500 text-white rounded-md"
//             >
//               Close
//             </button>
//           </DialogFooter>
//         </Dialog>
        
//         <Dialog
//           isOpen={isMdOpen.value}
//           onClose$={() => isMdOpen.value = false}
//           size="md"
//         >
//           <DialogHeader onClose$={() => isMdOpen.value = false}>
//             <h3 class="text-lg font-medium">MD Size Dialog</h3>
//           </DialogHeader>
//           <DialogBody>
//             <p>This is a medium dialog suitable for most common use cases.</p>
//           </DialogBody>
//           <DialogFooter>
//             <button
//               onClick$={() => isMdOpen.value = false}
//               class="px-4 py-2 bg-primary-500 text-white rounded-md"
//             >
//               Close
//             </button>
//           </DialogFooter>
//         </Dialog>
        
//         <Dialog
//           isOpen={isLgOpen.value}
//           onClose$={() => isLgOpen.value = false}
//           size="lg"
//         >
//           <DialogHeader onClose$={() => isLgOpen.value = false}>
//             <h3 class="text-lg font-medium">LG Size Dialog</h3>
//           </DialogHeader>
//           <DialogBody>
//             <p>This is a large dialog suitable for forms and more complex content.</p>
//           </DialogBody>
//           <DialogFooter>
//             <button
//               onClick$={() => isLgOpen.value = false}
//               class="px-4 py-2 bg-primary-500 text-white rounded-md"
//             >
//               Close
//             </button>
//           </DialogFooter>
//         </Dialog>
        
//         <Dialog
//           isOpen={isXlOpen.value}
//           onClose$={() => isXlOpen.value = false}
//           size="xl"
//         >
//           <DialogHeader onClose$={() => isXlOpen.value = false}>
//             <h3 class="text-lg font-medium">XL Size Dialog</h3>
//           </DialogHeader>
//           <DialogBody>
//             <p>This is an extra large dialog suitable for rich content.</p>
//           </DialogBody>
//           <DialogFooter>
//             <button
//               onClick$={() => isXlOpen.value = false}
//               class="px-4 py-2 bg-primary-500 text-white rounded-md"
//             >
//               Close
//             </button>
//           </DialogFooter>
//         </Dialog>
        
//         <Dialog
//           isOpen={isFullOpen.value}
//           onClose$={() => isFullOpen.value = false}
//           size="full"
//         >
//           <DialogHeader onClose$={() => isFullOpen.value = false}>
//             <h3 class="text-lg font-medium">Full Size Dialog</h3>
//           </DialogHeader>
//           <DialogBody>
//             <p>This is a full-width dialog that takes almost the entire screen.</p>
//           </DialogBody>
//           <DialogFooter>
//             <button
//               onClick$={() => isFullOpen.value = false}
//               class="px-4 py-2 bg-primary-500 text-white rounded-md"
//             >
//               Close
//             </button>
//           </DialogFooter>
//         </Dialog>
//       </div>
//     );
//   },
// };

// // Form dialog
// export const FormDialog = {
//   render: () => {
//     const isOpen = useSignal(false);
//     const formState = useSignal({
//       name: '',
//       email: '',
//       message: ''
//     });
    
//     const handleSubmit$ = $(() => {
//       alert(`Form submitted with values:\nName: ${formState.value.name}\nEmail: ${formState.value.email}\nMessage: ${formState.value.message}`);
//       isOpen.value = false;
//     });
    
//     return (
//       <div>
//         <button
//           onClick$={() => isOpen.value = true}
//           class="px-4 py-2 bg-primary-500 text-white rounded-md"
//         >
//           Open Form Dialog
//         </button>
        
//         <Dialog
//           isOpen={isOpen.value}
//           onClose$={() => isOpen.value = false}
//           size="md"
//           closeOnOutsideClick={false}
//         >
//           <DialogHeader onClose$={() => isOpen.value = false}>
//             <h3 class="text-lg font-medium">Contact Form</h3>
//           </DialogHeader>
//           <DialogBody>
//             <form id="contact-form" preventdefault:submit class="space-y-4">
//               <div>
//                 <label for="name" class="block text-sm font-medium mb-1">
//                   Name
//                 </label>
//                 <input
//                   id="name"
//                   type="text"
//                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
//                   value={formState.value.name}
//                   onInput$={(_, el) => formState.value = { ...formState.value, name: el.value }}
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label for="email" class="block text-sm font-medium mb-1">
//                   Email
//                 </label>
//                 <input
//                   id="email"
//                   type="email"
//                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
//                   value={formState.value.email}
//                   onInput$={(_, el) => formState.value = { ...formState.value, email: el.value }}
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label for="message" class="block text-sm font-medium mb-1">
//                   Message
//                 </label>
//                 <textarea
//                   id="message"
//                   rows={4}
//                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
//                   value={formState.value.message}
//                   onInput$={(_, el) => formState.value = { ...formState.value, message: el.value }}
//                   required
//                 ></textarea>
//               </div>
//             </form>
//           </DialogBody>
//           <DialogFooter>
//             <div class="flex justify-end gap-3">
//               <button
//                 type="button"
//                 class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
//                 onClick$={() => isOpen.value = false}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
//                 onClick$={handleSubmit$}
//               >
//                 Submit
//               </button>
//             </div>
//           </DialogFooter>
//         </Dialog>
//       </div>
//     );
//   },
// };

// // Confirmation dialog
// export const ConfirmationDialog = {
//   render: () => {
//     const isOpen = useSignal(false);
//     const result = useSignal<string | null>(null);
    
//     const handleConfirm$ = $(() => {
//       result.value = 'Confirmed';
//       isOpen.value = false;
//     });
    
//     const handleCancel$ = $(() => {
//       result.value = 'Cancelled';
//       isOpen.value = false;
//     });
    
//     return (
//       <div>
//         <button
//           onClick$={() => isOpen.value = true}
//           class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
//         >
//           Delete Item
//         </button>
        
//         {result.value && (
//           <div class={`mt-4 p-3 rounded-md ${result.value === 'Confirmed' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}`}>
//             Action {result.value}: {result.value === 'Confirmed' ? 'Item has been deleted' : 'Operation cancelled'}
//           </div>
//         )}
        
//         <Dialog
//           isOpen={isOpen.value}
//           onClose$={() => isOpen.value = false}
//           size="sm"
//           closeOnOutsideClick={false}
//         >
//           <DialogHeader onClose$={() => isOpen.value = false}>
//             <h3 class="text-lg font-medium">Confirm Deletion</h3>
//           </DialogHeader>
//           <DialogBody>
//             <div class="flex items-start">
//               <div class="flex-shrink-0 text-red-500">
//                 <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                 </svg>
//               </div>
//               <div class="ml-3">
//                 <p class="text-sm text-gray-700 dark:text-gray-300">
//                   Are you sure you want to delete this item? This action cannot be undone.
//                 </p>
//               </div>
//             </div>
//           </DialogBody>
//           <DialogFooter>
//             <div class="flex justify-end gap-3">
//               <button
//                 type="button"
//                 class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
//                 onClick$={handleCancel$}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
//                 onClick$={handleConfirm$}
//               >
//                 Delete
//               </button>
//             </div>
//           </DialogFooter>
//         </Dialog>
//       </div>
//     );
//   },
// };

// // Accessibility testing
// export const AccessibilityTest = {
//   render: () => {
//     const isOpen = useSignal(false);
    
//     return (
//       <div>
//         <button
//           onClick$={() => isOpen.value = true}
//           class="px-4 py-2 bg-primary-500 text-white rounded-md"
//         >
//           Open Accessible Dialog
//         </button>
        
//         <Dialog
//           isOpen={isOpen.value}
//           onClose$={() => isOpen.value = false}
//           ariaLabel="Accessibility Test Dialog"
//           ariaDescription="This dialog showcases accessibility features for screen readers and keyboard users"
//           initialFocus={true}
//           trapFocus={true}
//           closeOnEsc={true}
//         >
//           <DialogHeader onClose$={() => isOpen.value = false}>
//             <h3 class="text-lg font-medium">Accessibility Features</h3>
//           </DialogHeader>
//           <DialogBody>
//             <ul class="space-y-2 list-disc pl-5">
//               <li>ARIA labeling for screen readers</li>
//               <li>Focus management for keyboard users</li>
//               <li>Focus trapping within the dialog</li>
//               <li>Close with Escape key</li>
//               <li>Proper ARIA roles and attributes</li>
//               <li>Background page scrolling is disabled</li>
//             </ul>
//             <div class="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded">
//               <p class="text-sm">Try navigating with Tab key to experience focus trapping</p>
//             </div>
//           </DialogBody>
//           <DialogFooter>
//             <button
//               onClick$={() => isOpen.value = false}
//               class="px-4 py-2 bg-primary-500 text-white rounded-md"
//             >
//               Close
//             </button>
//           </DialogFooter>
//         </Dialog>
//       </div>
//     );
//   },
// };
