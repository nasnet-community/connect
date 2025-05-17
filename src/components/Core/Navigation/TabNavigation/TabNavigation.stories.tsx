// import { $, component$ } from "@builder.io/qwik";
// import { useSignal } from "@builder.io/qwik";
// import { TabNavigation } from "./TabNavigation";
// import { HiHomeOutline, HiUserOutline, HiCogOutline, HiBellOutline } from "@qwikest/icons/heroicons";

// // Use alternative types for Storybook since @storybook/qwik might not be available
// type Meta<T> = {
//   title: string;
//   component: T;
//   tags?: string[];
//   argTypes?: Record<string, any>;
// };

// type StoryObj<T> = {
//   args?: Record<string, any>;
//   render?: (args: Record<string, any>) => any;
// };

// const meta: Meta<typeof TabNavigation> = {
//   title: "Core/Navigation/TabNavigation",
//   component: TabNavigation,
//   tags: ["autodocs"],
//   argTypes: {
//     size: {
//       control: { type: "select" },
//       options: ["sm", "md", "lg"],
//     },
//     variant: {
//       control: { type: "select" },
//       options: ["underline", "pills", "boxed", "minimal"],
//     },
//     align: {
//       control: { type: "select" },
//       options: ["left", "center", "right"],
//     },
//     fullWidth: { control: "boolean" },
//     showIcons: { control: "boolean" },
//     animated: { control: "boolean" },
//   },
// };

// export default meta;
// type Story = StoryObj<typeof TabNavigation>;

// /**
//  * Basic TabNavigation with state
//  */
// const TabNavigationWithState = component$<{
//   variant?: "underline" | "pills" | "boxed" | "minimal";
//   size?: "sm" | "md" | "lg";
//   showIcons?: boolean;
//   align?: "left" | "center" | "right";
//   fullWidth?: boolean;
//   animated?: boolean;
// }>(({
//   variant = "underline",
//   size = "md",
//   showIcons = true,
//   align = "left",
//   fullWidth = false,
//   animated = true,
// }) => {
//   const activeTab = useSignal("home");
  
//   const tabs = [
//     { id: "home", label: "Home", icon: <HiHomeOutline /> },
//     { id: "profile", label: "Profile", icon: <HiUserOutline /> },
//     { id: "notifications", label: "Notifications", icon: <HiBellOutline />, count: 5 },
//     { id: "settings", label: "Settings", icon: <HiCogOutline /> },
//     { id: "disabled", label: "Disabled", disabled: true },
//   ];
  
//   return (
//     <div class="space-y-4">
//       <TabNavigation
//         tabs={tabs}
//         activeTab={activeTab.value}
//         onSelect$={$((tabId) => {
//           activeTab.value = tabId;
//         })}
//         variant={variant}
//         size={size}
//         showIcons={showIcons}
//         align={align}
//         fullWidth={fullWidth}
//         animated={animated}
//       />
      
//       <div class="p-4 border border-border rounded-md dark:border-border-dark">
//         <p class="text-sm">Active tab: <span class="font-medium">{activeTab.value}</span></p>
//       </div>
//     </div>
//   );
// });

// /**
//  * Default TabNavigation story
//  */
// export const Default: Story = {
//   render: (args: Record<string, any>) => (
//     <TabNavigationWithState 
//       variant={args.variant}
//       size={args.size}
//       showIcons={args.showIcons}
//       align={args.align}
//       fullWidth={args.fullWidth}
//       animated={args.animated}
//     />
//   ),
//   args: {
//     variant: "underline",
//     size: "md",
//     showIcons: true,
//     align: "left",
//     fullWidth: false,
//     animated: true,
//   },
// };

// /**
//  * Tab variants
//  */
// export const Variants: Story = {
//   render: () => (
//     <div class="space-y-8">
//       <div>
//         <h3 class="mb-2 text-sm font-medium">Underline</h3>
//         <TabNavigationWithState variant="underline" />
//       </div>
      
//       <div>
//         <h3 class="mb-2 text-sm font-medium">Pills</h3>
//         <TabNavigationWithState variant="pills" />
//       </div>
      
//       <div>
//         <h3 class="mb-2 text-sm font-medium">Boxed</h3>
//         <TabNavigationWithState variant="boxed" />
//       </div>
      
//       <div>
//         <h3 class="mb-2 text-sm font-medium">Minimal</h3>
//         <TabNavigationWithState variant="minimal" />
//       </div>
//     </div>
//   ),
// };

// /**
//  * Size variants
//  */
// export const Sizes: Story = {
//   render: () => (
//     <div class="space-y-8">
//       <div>
//         <h3 class="mb-2 text-sm font-medium">Small</h3>
//         <TabNavigationWithState size="sm" />
//       </div>
      
//       <div>
//         <h3 class="mb-2 text-sm font-medium">Medium</h3>
//         <TabNavigationWithState size="md" />
//       </div>
      
//       <div>
//         <h3 class="mb-2 text-sm font-medium">Large</h3>
//         <TabNavigationWithState size="lg" />
//       </div>
//     </div>
//   ),
// };

// /**
//  * Alignment options
//  */
// export const Alignment: Story = {
//   render: () => (
//     <div class="space-y-8">
//       <div>
//         <h3 class="mb-2 text-sm font-medium">Left Aligned (Default)</h3>
//         <TabNavigationWithState align="left" />
//       </div>
      
//       <div>
//         <h3 class="mb-2 text-sm font-medium">Center Aligned</h3>
//         <TabNavigationWithState align="center" />
//       </div>
      
//       <div>
//         <h3 class="mb-2 text-sm font-medium">Right Aligned</h3>
//         <TabNavigationWithState align="right" />
//       </div>
      
//       <div>
//         <h3 class="mb-2 text-sm font-medium">Full Width</h3>
//         <TabNavigationWithState fullWidth={true} />
//       </div>
//     </div>
//   ),
// };

// /**
//  * Custom example
//  */
// export const Custom: Story = {
//   render: () => {
//     const activeTab = useSignal("overview");
    
//     const tabs = [
//       { 
//         id: "overview", 
//         label: "Overview", 
//         icon: <span class="text-blue-500">📊</span>,
//         "data-analytics": "overview-tab"
//       },
//       { 
//         id: "documents", 
//         label: "Documents", 
//         icon: <span class="text-yellow-500">📄</span>,
//         count: 12,
//         "data-analytics": "documents-tab"
//       },
//       { 
//         id: "settings", 
//         label: "Settings", 
//         icon: <span class="text-purple-500">⚙️</span>,
//         "data-analytics": "settings-tab"
//       },
//     ];
    
//     return (
//       <div class="space-y-6">
//         <div class="border border-border dark:border-border-dark rounded-lg p-4 bg-surface-secondary/30 dark:bg-surface-dark-secondary/30">
//           <TabNavigation
//             tabs={tabs}
//             activeTab={activeTab.value}
//             onSelect$={$((tabId) => {
//               activeTab.value = tabId;
//             })}
//             variant="boxed"
//             size="md"
//             aria-label="Project sections"
//           />
          
//           <div class="p-4 mt-2 bg-surface-primary dark:bg-surface-dark-primary rounded-md">
//             {activeTab.value === "overview" && (
//               <div>
//                 <h3 class="text-lg font-medium">Project Overview</h3>
//                 <p class="mt-2 text-text-secondary dark:text-text-dark-secondary">
//                   This is the project overview content.
//                 </p>
//               </div>
//             )}
            
//             {activeTab.value === "documents" && (
//               <div>
//                 <h3 class="text-lg font-medium">Project Documents</h3>
//                 <p class="mt-2 text-text-secondary dark:text-text-dark-secondary">
//                   You have 12 documents in this project.
//                 </p>
//               </div>
//             )}
            
//             {activeTab.value === "settings" && (
//               <div>
//                 <h3 class="text-lg font-medium">Project Settings</h3>
//                 <p class="mt-2 text-text-secondary dark:text-text-dark-secondary">
//                   Configure your project settings here.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   },
// };

// /**
//  * Dark mode demonstration
//  */
// export const DarkMode: Story = {
//   render: () => (
//     <div class="p-6 bg-surface-dark-primary text-text-dark-primary rounded-md">
//       <div class="space-y-8">
//         <div>
//           <h3 class="mb-2 text-sm font-medium">Underline (Dark)</h3>
//           <TabNavigationWithState variant="underline" />
//         </div>
        
//         <div>
//           <h3 class="mb-2 text-sm font-medium">Pills (Dark)</h3>
//           <TabNavigationWithState variant="pills" />
//         </div>
        
//         <div>
//           <h3 class="mb-2 text-sm font-medium">Boxed (Dark)</h3>
//           <TabNavigationWithState variant="boxed" />
//         </div>
//       </div>
//     </div>
//   ),
// };
