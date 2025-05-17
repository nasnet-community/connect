// import { component$ } from '@builder.io/qwik';
// import { Meta, StoryObj } from 'storybook-framework-qwik';
// import { Pagination } from './index';
// import { PaginationProps } from './Pagination.types';
// import { useSignal } from '@builder.io/qwik';

// const meta: Meta<typeof Pagination> = {
//   title: 'Core/Navigation/Pagination',
//   component: Pagination,
//   tags: ['autodocs'],
//   argTypes: {
//     currentPage: { control: 'number', defaultValue: 1 },
//     totalItems: { control: 'number', defaultValue: 100 },
//     itemsPerPage: { control: 'number', defaultValue: 10 },
//     maxVisiblePages: { control: 'number', defaultValue: 5 },
//     showItemRange: { control: 'boolean', defaultValue: true },
//     size: { 
//       control: 'select', 
//       options: ['sm', 'md', 'lg'],
//       defaultValue: 'md'
//     },
//     variant: {
//       control: 'select',
//       options: ['default', 'outlined', 'minimal'],
//       defaultValue: 'default'
//     },
//     showPageInput: { control: 'boolean', defaultValue: false },
//   },
// };

// export default meta;
// type Story = StoryObj<typeof Pagination>;

// // Basic pagination example
// export const Basic: Story = {
//   args: {
//     totalItems: 100,
//     itemsPerPage: 10,
//   },
//   render: (args: PaginationProps) => {
//     const currentPage = useSignal(1);
    
//     return (
//       <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded">
//         <Pagination
//           {...args}
//           currentPage={currentPage}
//         />
//       </div>
//     );
//   },
// };

// // Size variants
// export const SizeVariants: Story = {
//   render: component$(() => {
//     const page = useSignal(1);
    
//     return (
//       <div class="space-y-6">
//         <div>
//           <h3 class="text-lg font-semibold mb-2">Small Size</h3>
//           <Pagination
//             currentPage={page}
//             totalItems={100}
//             size="sm"
//           />
//         </div>
        
//         <div>
//           <h3 class="text-lg font-semibold mb-2">Medium Size (Default)</h3>
//           <Pagination
//             currentPage={page}
//             totalItems={100}
//             size="md"
//           />
//         </div>
        
//         <div>
//           <h3 class="text-lg font-semibold mb-2">Large Size</h3>
//           <Pagination
//             currentPage={page}
//             totalItems={100}
//             size="lg"
//           />
//         </div>
//       </div>
//     );
//   }),
// };

// // Style variants
// export const StyleVariants: Story = {
//   render: component$(() => {
//     const page = useSignal(1);
    
//     return (
//       <div class="space-y-6">
//         <div>
//           <h3 class="text-lg font-semibold mb-2">Default Style</h3>
//           <Pagination
//             currentPage={page}
//             totalItems={100}
//             variant="default"
//           />
//         </div>
        
//         <div>
//           <h3 class="text-lg font-semibold mb-2">Outlined Style</h3>
//           <Pagination
//             currentPage={page}
//             totalItems={100}
//             variant="outlined"
//           />
//         </div>
        
//         <div>
//           <h3 class="text-lg font-semibold mb-2">Minimal Style</h3>
//           <Pagination
//             currentPage={page}
//             totalItems={100}
//             variant="minimal"
//           />
//         </div>
//       </div>
//     );
//   }),
// };

// // With page input
// export const WithPageInput: Story = {
//   render: component$(() => {
//     const page = useSignal(1);
    
//     return (
//       <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded">
//         <Pagination
//           currentPage={page}
//           totalItems={100}
//           showPageInput={true}
//         />
//       </div>
//     );
//   }),
// };

// // Different page counts
// export const PageCounts: Story = {
//   render: component$(() => {
//     const fewPages = useSignal(1);
//     const manyPages = useSignal(5);
    
//     return (
//       <div class="space-y-6">
//         <div>
//           <h3 class="text-lg font-semibold mb-2">Few Pages (30 items)</h3>
//           <Pagination
//             currentPage={fewPages}
//             totalItems={30}
//             itemsPerPage={10}
//           />
//         </div>
        
//         <div>
//           <h3 class="text-lg font-semibold mb-2">Many Pages (250 items)</h3>
//           <Pagination
//             currentPage={manyPages}
//             totalItems={250}
//             itemsPerPage={10}
//           />
//         </div>
//       </div>
//     );
//   }),
// };

// // Different max visible pages
// export const MaxVisiblePages: Story = {
//   render: component$(() => {
//     const page = useSignal(5);
    
//     return (
//       <div class="space-y-6">
//         <div>
//           <h3 class="text-lg font-semibold mb-2">3 Visible Pages</h3>
//           <Pagination
//             currentPage={page}
//             totalItems={200}
//             maxVisiblePages={3}
//           />
//         </div>
        
//         <div>
//           <h3 class="text-lg font-semibold mb-2">5 Visible Pages (Default)</h3>
//           <Pagination
//             currentPage={page}
//             totalItems={200}
//             maxVisiblePages={5}
//           />
//         </div>
        
//         <div>
//           <h3 class="text-lg font-semibold mb-2">7 Visible Pages</h3>
//           <Pagination
//             currentPage={page}
//             totalItems={200}
//             maxVisiblePages={7}
//           />
//         </div>
//       </div>
//     );
//   }),
// };

// // Custom labels
// export const CustomLabels: Story = {
//   render: component$(() => {
//     const page = useSignal(1);
    
//     return (
//       <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded">
//         <Pagination
//           currentPage={page}
//           totalItems={100}
//           showPageInput={true}
//           labels={{
//             previous: 'Prev',
//             next: 'Next',
//             goToPage: 'Jump to',
//             itemRange: '{start}-{end} of {total} results'
//           }}
//         />
//       </div>
//     );
//   }),
// };

// // In context example
// export const InContext: Story = {
//   render: component$(() => {
//     const page = useSignal(2);
    
//     return (
//       <div class="p-6 bg-white dark:bg-gray-800 rounded-md shadow">
//         <div class="mb-4">
//           <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Products</h1>
//           <p class="text-gray-700 dark:text-gray-300">Browse our collection of products.</p>
//         </div>
        
//         {/* Mock product grid */}
//         <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//           {Array.from({ length: 6 }).map((_, i) => (
//             <div key={i} class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
//               <div class="bg-gray-200 dark:bg-gray-700 w-full h-32 rounded-md mb-3"></div>
//               <h3 class="font-medium text-gray-900 dark:text-white">Product {i + 1 + ((page.value - 1) * 6)}</h3>
//               <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">Product description goes here.</p>
//             </div>
//           ))}
//         </div>
        
//         <Pagination
//           currentPage={page}
//           totalItems={42}
//           itemsPerPage={6}
//           showItemRange={true}
//         />
//       </div>
//     );
//   }),
// };

// // RTL support
// export const RTLSupport: Story = {
//   render: component$(() => {
//     const page = useSignal(1);
    
//     return (
//       <div dir="rtl" class="p-4 bg-gray-50 dark:bg-gray-800 rounded">
//         <p class="mb-2 text-sm text-right">RTL pagination (for Arabic, Hebrew, etc.)</p>
//         <Pagination
//           currentPage={page}
//           totalItems={100}
//           labels={{
//             previous: 'السابق',
//             next: 'التالي',
//             itemRange: 'عرض {start}-{end} من {total} العناصر'
//           }}
//         />
//       </div>
//     );
//   }),
// };
