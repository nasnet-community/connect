// import { $, component$ } from "@builder.io/qwik";
// import { useSignal } from "@builder.io/qwik";
// import { Radio } from "./Radio";
// import { RadioGroup } from "./RadioGroup";

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

// const meta: Meta<typeof Radio> = {
//   title: "Core/Radio",
//   component: Radio,
//   tags: ["autodocs"],
//   argTypes: {
//     size: {
//       control: { type: "select" },
//       options: ["sm", "md", "lg"],
//     },
//     disabled: { control: "boolean" },
//     checked: { control: "boolean" },
//     required: { control: "boolean" },
//     label: { control: "text" },
//   },
// };

// export default meta;
// type Story = StoryObj<typeof Radio>;

// /**
//  * A wrapper component that manages radio state internally
//  */
// const RadioWithState = component$<{
//   name: string;
//   value: string;
//   initialChecked?: boolean;
//   label: string;
//   size?: "sm" | "md" | "lg";
//   disabled?: boolean;
//   required?: boolean;
// }>(({ 
//   name,
//   value,
//   initialChecked = false, 
//   label, 
//   size,
//   disabled,
//   required,
// }) => {
//   const checked = useSignal(initialChecked);
  
//   return (
//     <Radio 
//       name={name}
//       value={value}
//       checked={checked.value} 
//       onChange$={$(() => {
//         checked.value = true;
//       })}
//       label={label}
//       size={size}
//       disabled={disabled}
//       required={required}
//     />
//   );
// });

// /**
//  * Default Radio button story
//  */
// export const Default: Story = {
//   render: (args: Record<string, any>) => (
//     <RadioWithState 
//       name={args.name || "radio-default"}
//       value={args.value || "option1"}
//       initialChecked={args.checked || false} 
//       label={args.label || "Radio option"} 
//       size={args.size}
//       disabled={args.disabled}
//       required={args.required}
//     />
//   ),
//   args: {
//     name: "radio-default",
//     value: "option1",
//     checked: false,
//     label: "Radio option",
//     size: "md",
//     disabled: false,
//     required: false,
//   },
// };

// /**
//  * Radio sizes demonstration
//  */
// export const Sizes: Story = {
//   render: () => (
//     <div class="flex flex-col gap-4">
//       <div class="flex items-center gap-2">
//         <span class="w-16 text-sm">Small:</span>
//         <RadioWithState 
//           name="radio-size" 
//           value="small"
//           initialChecked={true} 
//           label="Small radio" 
//           size="sm"
//         />
//       </div>
//       <div class="flex items-center gap-2">
//         <span class="w-16 text-sm">Medium:</span>
//         <RadioWithState 
//           name="radio-size" 
//           value="medium"
//           initialChecked={false} 
//           label="Medium radio" 
//           size="md"
//         />
//       </div>
//       <div class="flex items-center gap-2">
//         <span class="w-16 text-sm">Large:</span>
//         <RadioWithState 
//           name="radio-size" 
//           value="large"
//           initialChecked={false} 
//           label="Large radio" 
//           size="lg"
//         />
//       </div>
//     </div>
//   ),
// };

// /**
//  * Radio variants demonstration
//  */
// export const States: Story = {
//   render: () => (
//     <div class="flex flex-col gap-4">
//       <RadioWithState 
//         name="radio-state" 
//         value="unchecked"
//         initialChecked={false} 
//         label="Unchecked" 
//       />
//       <RadioWithState 
//         name="radio-state" 
//         value="checked"
//         initialChecked={true} 
//         label="Checked" 
//       />
//       <RadioWithState 
//         name="radio-state" 
//         value="disabled"
//         initialChecked={false} 
//         label="Disabled unchecked" 
//         disabled={true}
//       />
//       <RadioWithState 
//         name="radio-state" 
//         value="disabled-checked"
//         initialChecked={true} 
//         label="Disabled checked" 
//         disabled={true}
//       />
//       <RadioWithState 
//         name="radio-state" 
//         value="required"
//         initialChecked={false} 
//         label="Required" 
//         required={true}
//       />
//     </div>
//   ),
// };

// /**
//  * RadioGroup story
//  */
// export const Group: Story = {
//   render: () => {
//     const selectedValue = useSignal("apple");
    
//     return (
//       <div class="space-y-8">
//         <div>
//           <h3 class="text-sm font-medium mb-2">Vertical Layout (Default)</h3>
//           <RadioGroup
//             name="fruits"
//             value={selectedValue.value}
//             onChange$={$((value) => {
//               selectedValue.value = value;
//             })}
//             label="Choose your favorite fruit"
//             helperText="Select the one you enjoy most"
//             options={[
//               { value: "apple", label: "Apple" },
//               { value: "banana", label: "Banana" },
//               { value: "orange", label: "Orange" },
//               { value: "grape", label: "Grape", disabled: true }
//             ]}
//           />
//           <div class="mt-2 p-2 bg-surface-secondary dark:bg-surface-dark-secondary rounded">
//             Selected: <span class="font-medium">{selectedValue.value}</span>
//           </div>
//         </div>
        
//         <div>
//           <h3 class="text-sm font-medium mb-2">Horizontal Layout</h3>
//           <RadioGroup
//             name="colors"
//             value="blue"
//             label="Choose a color"
//             direction="horizontal"
//             options={[
//               { value: "red", label: "Red" },
//               { value: "blue", label: "Blue" },
//               { value: "green", label: "Green" }
//             ]}
//           />
//         </div>
        
//         <div>
//           <h3 class="text-sm font-medium mb-2">With Error State</h3>
//           <RadioGroup
//             name="payment"
//             value=""
//             label="Payment Method"
//             required={true}
//             error="Please select a payment method"
//             options={[
//               { value: "credit", label: "Credit Card" },
//               { value: "paypal", label: "PayPal" },
//               { value: "bank", label: "Bank Transfer" }
//             ]}
//           />
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
//       <div class="space-y-4">
//         <h3 class="text-md font-medium mb-2">Radio in Dark Mode</h3>
//         <div class="space-y-2">
//           <RadioWithState 
//             name="dark-mode" 
//             value="unchecked"
//             initialChecked={false} 
//             label="Unchecked (Dark Mode)" 
//           />
//           <RadioWithState 
//             name="dark-mode" 
//             value="checked"
//             initialChecked={true} 
//             label="Checked (Dark Mode)" 
//           />
//           <RadioWithState 
//             name="dark-mode" 
//             value="disabled"
//             initialChecked={false} 
//             label="Disabled (Dark Mode)" 
//             disabled={true}
//           />
//         </div>
        
//         <div class="mt-6">
//           <RadioGroup
//             name="darkmode-group"
//             value="option2"
//             label="Radio Group in Dark Mode"
//             options={[
//               { value: "option1", label: "Option 1" },
//               { value: "option2", label: "Option 2" },
//               { value: "option3", label: "Option 3" }
//             ]}
//           />
//         </div>
//       </div>
//     </div>
//   ),
// };
