// import { Popover, PopoverContent, PopoverTrigger } from './Popover';
// import { useSignal } from '@builder.io/qwik';
// import type { StoryObj } from '@storybook/html';

// export default {
//   title: 'Core/Feedback/Popover',
//   component: 'div',  // Using a placeholder element as component
//   parameters: {
//     docs: {
//       description: {
//         component: `
// ## Popover Component

// A popover is a non-modal dialog that displays contextual information or UI controls when triggered by a user action. It typically appears next to the element that triggered it.

// ### Features

// - Multiple placement options (12 positions)
// - Various size options (sm, md, lg)
// - Different trigger behaviors (click, hover, focus, manual)
// - Accessibility support with ARIA attributes and keyboard navigation
// - Focus management for better user experience
// - Customizable arrow and styling
// - Rich content support
//         `,
//       },
//     },
//   },
//   argTypes: {
//     placement: {
//       control: 'select',
//       options: [
//         'top', 'top-start', 'top-end',
//         'right', 'right-start', 'right-end',
//         'bottom', 'bottom-start', 'bottom-end',
//         'left', 'left-start', 'left-end'
//       ],
//       description: 'The placement of the popover relative to the trigger element',
//       defaultValue: 'bottom',
//     },
//     trigger: {
//       control: 'select',
//       options: ['click', 'hover', 'focus', 'manual'],
//       description: 'The trigger behavior that causes the popover to open',
//       defaultValue: 'click',
//     },
//     size: {
//       control: 'select',
//       options: ['sm', 'md', 'lg'],
//       description: 'The size of the popover',
//       defaultValue: 'md',
//     },
//     hasArrow: {
//       control: 'boolean',
//       description: 'Whether the popover has an arrow pointing to the trigger',
//       defaultValue: true,
//     },
//     offset: {
//       control: 'number',
//       description: 'Custom offset from the trigger element (in pixels)',
//       defaultValue: 8,
//     },
//     closeOnOutsideClick: {
//       control: 'boolean',
//       description: 'Whether the popover should close when clicking outside of it',
//       defaultValue: true,
//     },
//     closeOnEsc: {
//       control: 'boolean',
//       description: 'Whether the popover should close when Escape key is pressed',
//       defaultValue: true,
//     },
//     usePortal: {
//       control: 'boolean',
//       description: 'Whether the popover should be rendered in a portal at the end of the document body',
//       defaultValue: true,
//     },
//     openDelay: {
//       control: 'number',
//       description: 'Delay in milliseconds before showing the popover (for hover trigger)',
//       defaultValue: 200,
//     },
//     closeDelay: {
//       control: 'number',
//       description: 'Delay in milliseconds before hiding the popover (for hover trigger)',
//       defaultValue: 200,
//     },
//     disableAnimation: {
//       control: 'boolean',
//       description: 'Whether animations should be disabled',
//       defaultValue: false,
//     },
//     gapInPx: {
//       control: 'number',
//       description: 'The gap between the popover and its trigger element',
//       defaultValue: 8,
//     },
//     zIndex: {
//       control: 'number',
//       description: 'The z-index of the popover',
//       defaultValue: 1000,
//     },
//   },
// } as const;

// type Story = StoryObj<typeof Popover>;

// // Default popover story
// export const Default = {
//   render: (args: any) => {
//     return (
//       <div class="p-8 flex justify-center">
//         <Popover {...args}>
//           <PopoverTrigger>
//             <button class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
//               Click me
//             </button>
//           </PopoverTrigger>
//           <PopoverContent>
//             <div class="p-1">
//               <h4 class="font-semibold">Popover Title</h4>
//               <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
//                 This is a basic popover with default settings.
//               </p>
//             </div>
//           </PopoverContent>
//         </Popover>
//       </div>
//     );
//   },
//   args: {
//     placement: 'bottom',
//     trigger: 'click',
//     size: 'md',
//     hasArrow: true,
//     offset: 8,
//     closeOnOutsideClick: true,
//     closeOnEsc: true,
//     usePortal: true,
//     openDelay: 200,
//     closeDelay: 200,
//     disableAnimation: false,
//     gapInPx: 8,
//     zIndex: 1000,
//   },
// };

// // Placement variants
// export const PlacementVariants = {
//   render: () => {
//     return (
//       <div class="grid grid-cols-4 gap-8 p-8">
//         {[
//           'top', 'top-start', 'top-end', 
//           'right', 'right-start', 'right-end',
//           'bottom', 'bottom-start', 'bottom-end',
//           'left', 'left-start', 'left-end'
//         ].map((placement) => (
//           <div key={placement} class="flex justify-center">
//             <Popover placement={placement as any}>
//               <PopoverTrigger>
//                 <button class="px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors">
//                   {placement}
//                 </button>
//               </PopoverTrigger>
//               <PopoverContent>
//                 <div class="p-1">
//                   <p class="text-sm">Placement: <strong>{placement}</strong></p>
//                 </div>
//               </PopoverContent>
//             </Popover>
//           </div>
//         ))}
//       </div>
//     );
//   },
// };

// // Size variants
// export const SizeVariants = {
//   render: () => {
//     return (
//       <div class="flex gap-8 p-8 justify-center">
//         {['sm', 'md', 'lg'].map((size) => (
//           <Popover key={size} size={size as any}>
//             <PopoverTrigger>
//               <button class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
//                 {size.toUpperCase()} Size
//               </button>
//             </PopoverTrigger>
//             <PopoverContent>
//               <div class="p-1">
//                 <h4 class="font-semibold">Size: {size.toUpperCase()}</h4>
//                 <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
//                   This popover uses the {size} size variant.
//                 </p>
//                 {size === 'lg' && (
//                   <p class="mt-2 text-xs text-gray-500">
//                     Large popovers are ideal for complex content and forms.
//                   </p>
//                 )}
//               </div>
//             </PopoverContent>
//           </Popover>
//         ))}
//       </div>
//     );
//   },
// };

// // Trigger behaviors
// export const TriggerBehaviors = {
//   render: () => {
//     const isOpen = useSignal(false);
    
//     return (
//       <div class="flex gap-8 p-8 justify-center">
//         <Popover trigger="click">
//           <PopoverTrigger>
//             <button class="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors">
//               Click Trigger
//             </button>
//           </PopoverTrigger>
//           <PopoverContent>
//             <div class="p-1">
//               <h4 class="font-semibold">Click Trigger</h4>
//               <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
//                 This popover opens when you click the trigger.
//               </p>
//             </div>
//           </PopoverContent>
//         </Popover>
        
//         <Popover trigger="hover">
//           <PopoverTrigger>
//             <button class="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors">
//               Hover Trigger
//             </button>
//           </PopoverTrigger>
//           <PopoverContent>
//             <div class="p-1">
//               <h4 class="font-semibold">Hover Trigger</h4>
//               <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
//                 This popover opens when you hover over the trigger.
//               </p>
//             </div>
//           </PopoverContent>
//         </Popover>
        
//         <Popover trigger="focus">
//           <PopoverTrigger>
//             <button class="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors">
//               Focus Trigger
//             </button>
//           </PopoverTrigger>
//           <PopoverContent>
//             <div class="p-1">
//               <h4 class="font-semibold">Focus Trigger</h4>
//               <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
//                 This popover opens when the trigger receives focus.
//               </p>
//             </div>
//           </PopoverContent>
//         </Popover>
        
//         <div class="flex flex-col gap-2 items-center">
//           <Popover trigger="manual" isOpen={isOpen.value}>
//             <PopoverTrigger>
//               <button class="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors">
//                 Manual Trigger
//               </button>
//             </PopoverTrigger>
//             <PopoverContent>
//               <div class="p-1">
//                 <h4 class="font-semibold">Manual Trigger</h4>
//                 <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
//                   This popover is controlled manually.
//                 </p>
//               </div>
//             </PopoverContent>
//           </Popover>
//           <div class="flex gap-2 mt-2">
//             <button 
//               onClick$={() => isOpen.value = true}
//               class="px-2 py-1 text-xs bg-green-500 text-white rounded"
//             >
//               Open
//             </button>
//             <button 
//               onClick$={() => isOpen.value = false}
//               class="px-2 py-1 text-xs bg-red-500 text-white rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   },
// };

// // With/Without Arrow
// export const ArrowVariants = {
//   render: () => {
//     return (
//       <div class="flex gap-8 p-8 justify-center">
//         <Popover hasArrow={true}>
//           <PopoverTrigger>
//             <button class="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors">
//               With Arrow
//             </button>
//           </PopoverTrigger>
//           <PopoverContent>
//             <div class="p-1">
//               <h4 class="font-semibold">With Arrow</h4>
//               <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
//                 This popover has an arrow pointing to the trigger.
//               </p>
//             </div>
//           </PopoverContent>
//         </Popover>
        
//         <Popover hasArrow={false}>
//           <PopoverTrigger>
//             <button class="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors">
//               Without Arrow
//             </button>
//           </PopoverTrigger>
//           <PopoverContent>
//             <div class="p-1">
//               <h4 class="font-semibold">Without Arrow</h4>
//               <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
//                 This popover does not have an arrow.
//               </p>
//             </div>
//           </PopoverContent>
//         </Popover>
//       </div>
//     );
//   },
// };

// // Rich Content Example
// export const RichContent = {
//   render: () => {
//     return (
//       <div class="p-8 flex justify-center">
//         <Popover size="lg">
//           <PopoverTrigger>
//             <button class="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors">
//               User Profile
//             </button>
//           </PopoverTrigger>
//           <PopoverContent>
//             <div class="p-3">
//               <h4 class="font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">
//                 User Profile
//               </h4>
//               <div class="flex items-start gap-4">
//                 <div class="bg-gray-200 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-gray-600 dark:text-gray-300">
//                   JD
//                 </div>
//                 <div class="flex-1">
//                   <div class="space-y-1">
//                     <p class="font-medium">John Doe</p>
//                     <p class="text-sm text-gray-600 dark:text-gray-400">john.doe@example.com</p>
//                     <p class="text-sm text-gray-500 dark:text-gray-400">
//                       Product Designer
//                     </p>
//                   </div>
//                   <div class="flex gap-2 mt-3">
//                     <button class="px-3 py-1 text-sm bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-100 rounded">
//                       View Profile
//                     </button>
//                     <button class="px-3 py-1 text-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100 rounded">
//                       Message
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div class="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
//                 <p class="text-xs text-gray-500 dark:text-gray-400">
//                   Last active: 10 minutes ago
//                 </p>
//               </div>
//             </div>
//           </PopoverContent>
//         </Popover>
//       </div>
//     );
//   },
// };

// // Form Content Example
// export const FormContent = {
//   render: () => {
//     return (
//       <div class="p-8 flex justify-center">
//         <Popover size="lg" placement="bottom-start">
//           <PopoverTrigger>
//             <button class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
//               Quick Search
//             </button>
//           </PopoverTrigger>
//           <PopoverContent>
//             <div class="p-3">
//               <h4 class="font-semibold mb-3">Search Users</h4>
//               <div class="space-y-3">
//                 <div>
//                   <label for="search" class="block text-sm font-medium mb-1">
//                     Search
//                   </label>
//                   <input
//                     id="search"
//                     type="text"
//                     class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700"
//                     placeholder="Type to search..."
//                   />
//                 </div>
//                 <div>
//                   <label for="filter" class="block text-sm font-medium mb-1">
//                     Filter by
//                   </label>
//                   <select
//                     id="filter"
//                     class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700"
//                   >
//                     <option>All Users</option>
//                     <option>Administrators</option>
//                     <option>Moderators</option>
//                     <option>Regular Users</option>
//                   </select>
//                 </div>
//                 <div class="flex justify-end pt-2">
//                   <button class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
//                     Search
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </PopoverContent>
//         </Popover>
//       </div>
//     );
//   },
// };

// // Accessibility Testing
// export const AccessibilityTest = {
//   render: () => {
//     return (
//       <div class="p-8 flex justify-center">
//         <Popover 
//           ariaLabel="Information about accessibility"
//           closeOnEsc={true}
//         >
//           <PopoverTrigger ariaLabel="Open accessibility information">
//             <button class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
//               Accessibility Info
//             </button>
//           </PopoverTrigger>
//           <PopoverContent>
//             <div class="p-1">
//               <h4 class="font-semibold">Accessibility Features</h4>
//               <ul class="text-sm text-gray-600 dark:text-gray-300 mt-2 space-y-1 list-disc pl-5">
//                 <li>Properly labeled with ARIA</li>
//                 <li>Keyboard navigable</li>
//                 <li>Escape key dismisses popover</li>
//                 <li>Focus is managed appropriately</li>
//               </ul>
//             </div>
//           </PopoverContent>
//         </Popover>
//       </div>
//     );
//   },
// };
