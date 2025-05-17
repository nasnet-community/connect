// import { Drawer } from './Drawer';
// import { useSignal } from '@builder.io/qwik';

// export default {
//   title: 'Core/Feedback/Drawer',
//   component: Drawer,
//   parameters: {
//     docs: {
//       description: {
//         component: `
// ## Drawer Component

// A drawer is a panel that slides in from the edge of the screen. It can be used for navigation, forms, filter controls, or any content that needs to be accessible without leaving the current page.

// ### Features

// - Multiple placement options: left, right, top, bottom
// - Various size options: xs, sm, md, lg, xl, full
// - Focus management for accessibility
// - Keyboard navigation support (Escape to close)
// - Dark mode support
// - Customizable styling
// - Optional overlay with click-to-close
//         `,
//       },
//     },
//   },
//   argTypes: {
//     isOpen: {
//       control: 'boolean',
//       description: 'Whether the drawer is open',
//       defaultValue: false,
//     },
//     placement: {
//       control: 'select',
//       options: ['left', 'right', 'top', 'bottom'],
//       description: 'The placement of the drawer',
//       defaultValue: 'right',
//     },
//     size: {
//       control: 'select',
//       options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
//       description: 'The size of the drawer',
//       defaultValue: 'md',
//     },
//     hasOverlay: {
//       control: 'boolean',
//       description: 'Whether to show an overlay behind the drawer',
//       defaultValue: true,
//     },
//     closeOnOverlayClick: {
//       control: 'boolean',
//       description: 'Whether to close the drawer when the overlay is clicked',
//       defaultValue: true,
//     },
//     closeOnEsc: {
//       control: 'boolean',
//       description: 'Whether to close the drawer when Escape key is pressed',
//       defaultValue: true,
//     },
//     trapFocus: {
//       control: 'boolean',
//       description: 'Whether to trap focus within the drawer while it\'s open',
//       defaultValue: true,
//     },
//     hasCloseButton: {
//       control: 'boolean',
//       description: 'Whether to show a close button in the drawer',
//       defaultValue: true,
//     },
//     disableAnimation: {
//       control: 'boolean',
//       description: 'Whether to disable animations for the drawer',
//       defaultValue: false,
//     },
//     customSize: {
//       control: 'text',
//       description: 'Custom width/height for the drawer (will override size)',
//     },
//   },
// };

// // Default drawer story
// export const Default = {
//   render: (args: any) => {
//     const isOpen = useSignal(true);
//     return (
//       <div>
//         <Drawer 
//           {...args}
//           isOpen={isOpen.value}
//           onClose$={() => isOpen.value = false}
//         >
//           <div q:slot="header">Drawer Title</div>
//           <div class="space-y-4">
//             <p>This is the default drawer configuration.</p>
//             <p>Drawers are useful for displaying additional content without leaving the current page.</p>
//             <ul class="list-disc pl-5 space-y-2">
//               <li>Provide easy access to related content</li>
//               <li>Maintain context of the current page</li>
//               <li>Great for mobile interfaces</li>
//             </ul>
//           </div>
//           <div q:slot="footer" class="flex justify-end">
//             <button 
//               class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
//               onClick$={() => isOpen.value = false}
//             >
//               Close
//             </button>
//           </div>
//         </Drawer>
//         <div class="p-4">
//           <button
//             onClick$={() => isOpen.value = true}
//             class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
//           >
//             Open Drawer
//           </button>
//         </div>
//       </div>
//     );
//   },
//   args: {
//     placement: 'right',
//     size: 'md',
//     hasOverlay: true,
//     closeOnOverlayClick: true,
//     closeOnEsc: true,
//     trapFocus: true,
//     hasCloseButton: true,
//     disableAnimation: false,
//   },
// };

// // Left placement drawer
// export const LeftDrawer = {
//   ...Default,
//   args: {
//     ...Default.args,
//     placement: 'left',
//   },
// };

// // Right placement drawer
// export const RightDrawer = {
//   ...Default,
//   args: {
//     ...Default.args,
//     placement: 'right',
//   },
// };

// // Top placement drawer
// export const TopDrawer = {
//   ...Default,
//   args: {
//     ...Default.args,
//     placement: 'top',
//   },
// };

// // Bottom placement drawer
// export const BottomDrawer = {
//   ...Default,
//   args: {
//     ...Default.args,
//     placement: 'bottom',
//   },
// };

// // Size variants
// export const SizeVariants = {
//   render: () => {
//     const isXsOpen = useSignal(false);
//     const isSmOpen = useSignal(false);
//     const isMdOpen = useSignal(false);
//     const isLgOpen = useSignal(false);
//     const isXlOpen = useSignal(false);
//     const isFullOpen = useSignal(false);
    
//     return (
//       <div class="space-y-4 p-4">
//         <div class="flex flex-wrap gap-3">
//           <button
//             onClick$={() => isXsOpen.value = true}
//             class="px-4 py-2 bg-primary-500 text-white rounded-md"
//           >
//             XS Size
//           </button>
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
        
//         <Drawer isOpen={isXsOpen.value} onClose$={() => isXsOpen.value = false} size="xs">
//           <div q:slot="header">XS Size</div>
//           <div>Extra Small Drawer Content</div>
//         </Drawer>
        
//         <Drawer isOpen={isSmOpen.value} onClose$={() => isSmOpen.value = false} size="sm">
//           <div q:slot="header">SM Size</div>
//           <div>Small Drawer Content</div>
//         </Drawer>
        
//         <Drawer isOpen={isMdOpen.value} onClose$={() => isMdOpen.value = false} size="md">
//           <div q:slot="header">MD Size</div>
//           <div>Medium Drawer Content</div>
//         </Drawer>
        
//         <Drawer isOpen={isLgOpen.value} onClose$={() => isLgOpen.value = false} size="lg">
//           <div q:slot="header">LG Size</div>
//           <div>Large Drawer Content</div>
//         </Drawer>
        
//         <Drawer isOpen={isXlOpen.value} onClose$={() => isXlOpen.value = false} size="xl">
//           <div q:slot="header">XL Size</div>
//           <div>Extra Large Drawer Content</div>
//         </Drawer>
        
//         <Drawer isOpen={isFullOpen.value} onClose$={() => isFullOpen.value = false} size="full">
//           <div q:slot="header">Full Size</div>
//           <div>Full Width/Height Drawer Content</div>
//         </Drawer>
//       </div>
//     );
//   },
// };

// // Without overlay
// export const WithoutOverlay = {
//   ...Default,
//   args: {
//     ...Default.args,
//     hasOverlay: false,
//   },
// };

// // With custom style
// export const CustomStyled = {
//   ...Default,
//   args: {
//     ...Default.args,
//     drawerClass: 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white',
//     customSize: '350px',
//   },
// };

// // With form
// export const WithForm = {
//   render: () => {
//     const isOpen = useSignal(false);
    
//     return (
//       <div class="p-4">
//         <button
//           onClick$={() => isOpen.value = true}
//           class="px-4 py-2 bg-primary-500 text-white rounded-md"
//         >
//           Open Form Drawer
//         </button>
        
//         <Drawer 
//           isOpen={isOpen.value} 
//           onClose$={() => isOpen.value = false}
//           size="md"
//         >
//           <div q:slot="header">Contact Form</div>
          
//           <form class="space-y-4">
//             <div>
//               <label for="name" class="block text-sm font-medium mb-1">Name</label>
//               <input
//                 id="name"
//                 type="text"
//                 class="w-full px-3 py-2 border border-gray-300 rounded-md"
//               />
//             </div>
            
//             <div>
//               <label for="email" class="block text-sm font-medium mb-1">Email</label>
//               <input
//                 id="email"
//                 type="email"
//                 class="w-full px-3 py-2 border border-gray-300 rounded-md"
//               />
//             </div>
            
//             <div>
//               <label for="message" class="block text-sm font-medium mb-1">Message</label>
//               <textarea
//                 id="message"
//                 rows={4}
//                 class="w-full px-3 py-2 border border-gray-300 rounded-md"
//               ></textarea>
//             </div>
//           </form>
          
//           <div q:slot="footer" class="flex justify-end gap-3">
//             <button
//               type="button"
//               class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md"
//               onClick$={() => isOpen.value = false}
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               class="px-4 py-2 text-white bg-primary-500 rounded-md"
//               onClick$={() => isOpen.value = false}
//             >
//               Submit
//             </button>
//           </div>
//         </Drawer>
//       </div>
//     );
//   },
// };

// // For accessibility testing
// export const AccessibilityTest = {
//   ...Default,
//   args: {
//     ...Default.args,
//     ariaLabel: 'Test Drawer',
//     trapFocus: true,
//     closeOnEsc: true,
//   },
// };
