// import { $, component$ } from "@builder.io/qwik";
// import { useSignal } from "@builder.io/qwik";
// import { PasswordField } from "./PasswordField";

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

// const meta: Meta<typeof PasswordField> = {
//   title: "Core/Form/PasswordField",
//   component: PasswordField,
//   tags: ["autodocs"],
//   argTypes: {
//     size: {
//       control: { type: "select" },
//       options: ["sm", "md", "lg"],
//     },
//     disabled: { control: "boolean" },
//     required: { control: "boolean" },
//     showStrength: { control: "boolean" },
//     autoValidate: { control: "boolean" },
//     initiallyVisible: { control: "boolean" },
//     label: { control: "text" },
//     placeholder: { control: "text" },
//     helperText: { control: "text" },
//     error: { control: "text" },
//   },
// };

// export default meta;
// type Story = StoryObj<typeof PasswordField>;

// /**
//  * A wrapper component that manages password state internally
//  */
// const PasswordFieldWithState = component$<{
//   label?: string;
//   placeholder?: string;
//   size?: "sm" | "md" | "lg";
//   disabled?: boolean;
//   required?: boolean;
//   error?: string;
//   helperText?: string;
//   showStrength?: boolean;
//   autoValidate?: boolean;
//   initiallyVisible?: boolean;
// }>(({ 
//   label = "Password",
//   placeholder = "Enter your password",
//   size,
//   disabled,
//   required,
//   error,
//   helperText,
//   showStrength,
//   autoValidate,
//   initiallyVisible,
// }) => {
//   const password = useSignal("");
  
//   return (
//     <PasswordField 
//       value={password.value}
//       onValueChange$={$((value) => {
//         password.value = value;
//       })}
//       label={label}
//       placeholder={placeholder}
//       size={size}
//       disabled={disabled}
//       required={required}
//       error={error}
//       helperText={helperText}
//       showStrength={showStrength}
//       autoValidate={autoValidate}
//       initiallyVisible={initiallyVisible}
//     />
//   );
// });

// /**
//  * Default PasswordField story
//  */
// export const Default: Story = {
//   render: (args: Record<string, any>) => (
//     <div class="max-w-md">
//       <PasswordFieldWithState 
//         label={args.label}
//         placeholder={args.placeholder}
//         size={args.size}
//         disabled={args.disabled}
//         required={args.required}
//         error={args.error}
//         helperText={args.helperText}
//         showStrength={args.showStrength}
//         autoValidate={args.autoValidate}
//         initiallyVisible={args.initiallyVisible}
//       />
//     </div>
//   ),
//   args: {
//     label: "Password",
//     placeholder: "Enter your password",
//     size: "md",
//     disabled: false,
//     required: false,
//     error: "",
//     helperText: "Password must be at least 8 characters",
//     showStrength: false,
//     autoValidate: false,
//     initiallyVisible: false,
//   },
// };

// /**
//  * Password field sizes
//  */
// export const Sizes: Story = {
//   render: () => (
//     <div class="max-w-md space-y-4">
//       <PasswordFieldWithState 
//         label="Small Password Field"
//         size="sm"
//       />
//       <PasswordFieldWithState 
//         label="Medium Password Field"
//         size="md"
//       />
//       <PasswordFieldWithState 
//         label="Large Password Field"
//         size="lg"
//       />
//     </div>
//   ),
// };

// /**
//  * Password field variants
//  */
// export const Variants: Story = {
//   render: () => (
//     <div class="max-w-md space-y-4">
//       <PasswordFieldWithState 
//         label="Required Password"
//         required={true}
//       />
//       <div>
//         {/* Using the base component directly for the disabled with initial value case */}
//         <PasswordField 
//           label="Disabled Password"
//           disabled={true}
//           value="password123"
//           onValueChange$={$(() => {})}
//         />
//       </div>
//       <PasswordFieldWithState 
//         label="With Helper Text"
//         helperText="Use at least 8 characters with a mix of letters, numbers & symbols"
//       />
//       <PasswordFieldWithState 
//         label="With Error"
//         error="Password is too weak"
//       />
//     </div>
//   ),
// };

// /**
//  * Password field with strength indicator
//  */
// export const WithStrengthIndicator: Story = {
//   render: () => {
//     const password = useSignal("");
    
//     return (
//       <div class="max-w-md space-y-6">
//         <div>
//           <h3 class="mb-2 text-sm font-medium">Password with Strength Indicator</h3>
//           <PasswordField 
//             value={password.value}
//             onValueChange$={$((value) => {
//               password.value = value;
//             })}
//             label="Create Password"
//             showStrength={true}
//             helperText="Try different passwords to see the strength indicator change"
//           />
//         </div>
        
//         <div class="p-3 bg-surface-secondary dark:bg-surface-dark-secondary rounded">
//           <p class="text-sm font-medium mb-1">Try these examples:</p>
//           <ul class="text-xs space-y-1 list-disc pl-4">
//             <li>
//               <button 
//                 onClick$={() => { password.value = "password"; }}
//                 class="text-primary-500 hover:underline"
//               >
//                 password
//               </button> 
//               <span class="text-text-muted ml-2">(Weak)</span>
//             </li>
//             <li>
//               <button 
//                 onClick$={() => { password.value = "Password123"; }}
//                 class="text-primary-500 hover:underline"
//               >
//                 Password123
//               </button>
//               <span class="text-text-muted ml-2">(Medium)</span>
//             </li>
//             <li>
//               <button 
//                 onClick$={() => { password.value = "P@ssw0rd!23"; }}
//                 class="text-primary-500 hover:underline"
//               >
//                 P@ssw0rd!23
//               </button>
//               <span class="text-text-muted ml-2">(Strong)</span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     );
//   },
// };

// /**
//  * Initially visible password
//  */
// export const InitiallyVisible: Story = {
//   render: () => (
//     <div class="max-w-md">
//       <PasswordFieldWithState 
//         label="Initially Visible Password"
//         initiallyVisible={true}
//         helperText="This password field is initially set to show the password"
//       />
//     </div>
//   ),
// };

// /**
//  * Dark mode demonstration
//  */
// export const DarkMode: Story = {
//   render: () => (
//     <div class="p-6 bg-surface-dark-primary text-text-dark-primary rounded-md max-w-md">
//       <div class="space-y-4">
//         <PasswordFieldWithState 
//           label="Password (Dark Mode)"
//           placeholder="Enter your password"
//         />
//         <PasswordFieldWithState 
//           label="With Strength Indicator"
//           showStrength={true}
//         />
//         <PasswordFieldWithState 
//           label="With Error"
//           error="Password is required"
//         />
//       </div>
//     </div>
//   ),
// };
