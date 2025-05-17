// import { $, component$ } from "@builder.io/qwik";
// // Use alternative types for Storybook since @storybook/qwik might not be available
// type Meta<Props> = {
//   title: string;
//   component: Props;
//   tags?: string[];
//   argTypes?: Record<string, any>;
// };
// type StoryObj<Props> = {
//   args?: Record<string, any>;
//   render?: (args: Record<string, any>) => any;
// };
// import { Toggle } from "./Toggle";
// import { useSignal } from "@builder.io/qwik";

// const meta: Meta<typeof Toggle> = {
//   title: "Core/Toggle",
//   component: Toggle,
//   tags: ["autodocs"],
//   argTypes: {
//     size: {
//       control: { type: "select" },
//       options: ["sm", "md", "lg"],
//     },
//     labelPosition: {
//       control: { type: "select" },
//       options: ["left", "right"],
//     },
//     checked: { control: "boolean" },
//     disabled: { control: "boolean" },
//     required: { control: "boolean" },
//     label: { control: "text" },
//   },
// };

// export default meta;
// type Story = StoryObj<typeof Toggle>;

// /**
//  * A wrapper component that manages toggle state internally
//  */
// const ToggleWithState = component$<{
//   initialChecked: boolean;
//   label: string;
//   labelPosition?: "left" | "right";
//   size?: "sm" | "md" | "lg";
//   disabled?: boolean;
//   required?: boolean;
// }>(({ 
//   initialChecked, 
//   label, 
//   labelPosition,
//   size,
//   disabled,
//   required,
// }) => {
//   const checked = useSignal(initialChecked);
  
//   return (
//     <Toggle 
//       checked={checked.value} 
//       onChange$={$((value) => {
//         checked.value = value;
//       })}
//       label={label}
//       labelPosition={labelPosition}
//       size={size}
//       disabled={disabled}
//       required={required}
//     />
//   );
// });

// /**
//  * Default Toggle story showing a basic toggle with label
//  */
// export const Default: Story = {
//   render: (args: any) => (
//     <ToggleWithState 
//       initialChecked={args.checked || false} 
//       label={args.label || "Enable feature"} 
//       labelPosition={args.labelPosition}
//       size={args.size}
//       disabled={args.disabled}
//       required={args.required}
//     />
//   ),
//   args: {
//     checked: false,
//     label: "Enable feature",
//     size: "md",
//     disabled: false,
//     required: false,
//   },
// };

// /**
//  * Toggle sizes demonstration
//  */
// export const Sizes: Story = {
//   render: () => (
//     <div class="flex flex-col gap-4">
//       <div class="flex items-center gap-2">
//         <span class="w-10 text-sm">Small:</span>
//         <ToggleWithState 
//           initialChecked={false} 
//           label="Small toggle" 
//           size="sm"
//         />
//       </div>
//       <div class="flex items-center gap-2">
//         <span class="w-10 text-sm">Medium:</span>
//         <ToggleWithState 
//           initialChecked={false} 
//           label="Medium toggle" 
//           size="md"
//         />
//       </div>
//       <div class="flex items-center gap-2">
//         <span class="w-10 text-sm">Large:</span>
//         <ToggleWithState 
//           initialChecked={false} 
//           label="Large toggle" 
//           size="lg"
//         />
//       </div>
//     </div>
//   ),
// };

// /**
//  * Toggle with label positions
//  */
// export const LabelPositions: Story = {
//   render: () => (
//     <div class="flex flex-col gap-4">
//       <ToggleWithState 
//         initialChecked={false} 
//         label="Label on right" 
//         labelPosition="right"
//       />
//       <ToggleWithState 
//         initialChecked={false} 
//         label="Label on left" 
//         labelPosition="left"
//       />
//     </div>
//   ),
// };

// /**
//  * Toggle variants demonstration
//  */
// export const Variants: Story = {
//   render: () => (
//     <div class="flex flex-col gap-4">
//       <div class="flex items-center gap-4">
//         <ToggleWithState 
//           initialChecked={false} 
//           label="Unchecked" 
//         />
//         <ToggleWithState 
//           initialChecked={true} 
//           label="Checked" 
//         />
//       </div>
//       <div class="flex items-center gap-4">
//         <ToggleWithState 
//           initialChecked={false} 
//           label="Disabled unchecked" 
//           disabled={true}
//         />
//         <ToggleWithState 
//           initialChecked={true} 
//           label="Disabled checked" 
//           disabled={true}
//         />
//       </div>
//       <div class="flex items-center gap-4">
//         <ToggleWithState 
//           initialChecked={false} 
//           label="Required" 
//           required={true}
//         />
//       </div>
//     </div>
//   ),
// };

// /**
//  * Dark mode demonstration
//  */
// export const DarkMode: Story = {
//   render: () => (
//     <div class="p-6 bg-surface-dark-primary text-text-dark-primary rounded-md">
//       <div class="flex flex-col gap-4">
//         <ToggleWithState 
//           initialChecked={false} 
//           label="Unchecked (Dark Mode)" 
//         />
//         <ToggleWithState 
//           initialChecked={true} 
//           label="Checked (Dark Mode)" 
//         />
//         <ToggleWithState 
//           initialChecked={false} 
//           label="Disabled (Dark Mode)" 
//           disabled={true}
//         />
//       </div>
//     </div>
//   ),
// };

// /**
//  * Toggle in a form context
//  */
// export const FormContext: Story = {
//   render: () => {
//     const formSubmitted = useSignal(false);
//     const enableNotifications = useSignal(false);
//     const enableUpdates = useSignal(true);
    
//     return (
//       <form
//         preventdefault:submit
//         onSubmit$={() => {
//           formSubmitted.value = true;
//         }}
//         class="p-4 border border-border rounded-md max-w-md"
//       >
//         <div class="space-y-4">
//           <h3 class="text-lg font-medium">Notification Settings</h3>
          
//           <div class="space-y-2">
//             <Toggle
//               checked={enableNotifications.value}
//               onChange$={$((value) => {
//                 enableNotifications.value = value;
//               })}
//               label="Enable notifications"
//               name="notifications"
//             />
            
//             <Toggle
//               checked={enableUpdates.value}
//               onChange$={$((value) => {
//                 enableUpdates.value = value;
//               })}
//               label="Receive product updates"
//               name="updates"
//             />
//           </div>
          
//           <button
//             type="submit"
//             class="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
//           >
//             Save Settings
//           </button>
          
//           {formSubmitted.value && (
//             <div class="mt-4 p-2 bg-success-50 text-success-700 rounded">
//               <p>Form submitted with values:</p>
//               <ul class="list-disc pl-5">
//                 <li>Notifications: {enableNotifications.value ? "On" : "Off"}</li>
//                 <li>Updates: {enableUpdates.value ? "On" : "Off"}</li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </form>
//     );
//   },
// };
