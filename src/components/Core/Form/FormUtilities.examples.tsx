// import { component$, $ } from '@builder.io/qwik';
// import { Form } from './Form/Form';
// import { FormLabel } from './FormLabel/FormLabel';
// import { FormHelperText } from './FormHelperText/FormHelperText';
// import { FormErrorMessage } from './FormErrorMessage/FormErrorMessage';

// /**
//  * Example component showcasing enhanced form utilities with different styles, states, and configurations
//  */
// export const FormUtilitiesExamples = component$(() => {
//   return (
//     <div class="space-y-12">
//       <section>
//         <h2 class="text-xl font-semibold mb-4">Enhanced Form Labels</h2>
//         <FormLabelExamples />
//       </section>

//       <section>
//         <h2 class="text-xl font-semibold mb-4">Enhanced Helper Text</h2>
//         <FormHelperTextExamples />
//       </section>

//       <section>
//         <h2 class="text-xl font-semibold mb-4">Enhanced Error Messages</h2>
//         <FormErrorMessageExamples />
//       </section>

//       <section>
//         <h2 class="text-xl font-semibold mb-4">Comprehensive Form Example</h2>
//         <ComprehensiveFormExample />
//       </section>
//     </div>
//   );
// });

// /**
//  * Examples of enhanced FormLabel component
//  */
// export const FormLabelExamples = component$(() => {
//   return (
//     <div class="grid grid-cols-2 gap-6">
//       <div class="space-y-4">
//         <h3 class="text-lg font-medium mb-2">Size Variants</h3>
//         <div>
//           <FormLabel size="sm" for="small-label">Small Label</FormLabel>
//           <input id="small-label" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
//         </div>
//         <div>
//           <FormLabel size="md" for="medium-label">Medium Label (Default)</FormLabel>
//           <input id="medium-label" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
//         </div>
//         <div>
//           <FormLabel size="lg" for="large-label">Large Label</FormLabel>
//           <input id="large-label" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
//         </div>
//       </div>

//       <div class="space-y-4">
//         <h3 class="text-lg font-medium mb-2">State Variants</h3>
//         <div>
//           <FormLabel required for="required-label">Required Label</FormLabel>
//           <input id="required-label" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" required />
//         </div>
//         <div>
//           <FormLabel disabled for="disabled-label">Disabled Label</FormLabel>
//           <input id="disabled-label" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100" disabled />
//         </div>
//         <div>
//           <FormLabel error for="error-label">Error Label</FormLabel>
//           <input id="error-label" type="text" class="w-full px-3 py-2 border border-red-300 rounded-md" />
//         </div>
//         <div>
//           <FormLabel success for="success-label">Success Label</FormLabel>
//           <input id="success-label" type="text" class="w-full px-3 py-2 border border-green-300 rounded-md" />
//         </div>
//         <div>
//           <FormLabel warning for="warning-label">Warning Label</FormLabel>
//           <input id="warning-label" type="text" class="w-full px-3 py-2 border border-yellow-300 rounded-md" />
//         </div>
//       </div>

//       <div class="space-y-4">
//         <h3 class="text-lg font-medium mb-2">Accessibility Features</h3>
//         <div>
//           <FormLabel srOnly for="sr-only-label">Screen Reader Only Label</FormLabel>
//           <input id="sr-only-label" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Input with visually hidden label" />
//         </div>
//         <div>
//           <FormLabel id="custom-id-label" for="custom-id">Label with Custom ID</FormLabel>
//           <input id="custom-id" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" aria-labelledby="custom-id-label" />
//         </div>
//       </div>
//     </div>
//   );
// });

// /**
//  * Examples of enhanced FormHelperText component
//  */
// export const FormHelperTextExamples = component$(() => {
//   // Sample SVG icon for helper text
//   const InfoIcon = (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="16"
//       height="16"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       stroke-width="2"
//       stroke-linecap="round"
//       stroke-linejoin="round"
//     >
//       <circle cx="12" cy="12" r="10"></circle>
//       <line x1="12" y1="16" x2="12" y2="12"></line>
//       <line x1="12" y1="8" x2="12.01" y2="8"></line>
//     </svg>
//   );

//   return (
//     <div class="grid grid-cols-2 gap-6">
//       <div class="space-y-4">
//         <h3 class="text-lg font-medium mb-2">Size Variants</h3>
//         <div>
//           <input id="helper-sm" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
//           <FormHelperText size="sm">Small helper text with additional guidance</FormHelperText>
//         </div>
//         <div>
//           <input id="helper-md" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
//           <FormHelperText size="md">Medium helper text (Default)</FormHelperText>
//         </div>
//         <div>
//           <input id="helper-lg" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
//           <FormHelperText size="lg">Large helper text</FormHelperText>
//         </div>
//       </div>

//       <div class="space-y-4">
//         <h3 class="text-lg font-medium mb-2">State Variants</h3>
//         <div>
//           <input id="helper-default" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
//           <FormHelperText>Default helper text</FormHelperText>
//         </div>
//         <div>
//           <input id="helper-disabled" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100" disabled />
//           <FormHelperText disabled>Disabled helper text</FormHelperText>
//         </div>
//         <div>
//           <input id="helper-error" type="text" class="w-full px-3 py-2 border border-red-300 rounded-md" />
//           <FormHelperText error>Error helper text</FormHelperText>
//         </div>
//         <div>
//           <input id="helper-success" type="text" class="w-full px-3 py-2 border border-green-300 rounded-md" />
//           <FormHelperText success>Success helper text</FormHelperText>
//         </div>
//         <div>
//           <input id="helper-warning" type="text" class="w-full px-3 py-2 border border-yellow-300 rounded-md" />
//           <FormHelperText warning>Warning helper text</FormHelperText>
//         </div>
//       </div>

//       <div class="space-y-4">
//         <h3 class="text-lg font-medium mb-2">With Icons</h3>
//         <div>
//           <input id="helper-icon" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
//           <FormHelperText icon={InfoIcon}>Helper text with icon</FormHelperText>
//         </div>
//         <div>
//           <input id="helper-icon-error" type="text" class="w-full px-3 py-2 border border-red-300 rounded-md" />
//           <FormHelperText icon={InfoIcon} error>Error helper text with icon</FormHelperText>
//         </div>
//         <div>
//           <input id="helper-icon-success" type="text" class="w-full px-3 py-2 border border-green-300 rounded-md" />
//           <FormHelperText icon={InfoIcon} success>Success helper text with icon</FormHelperText>
//         </div>
//       </div>

//       <div class="space-y-4">
//         <h3 class="text-lg font-medium mb-2">Spacing Options</h3>
//         <div>
//           <input id="helper-default-margin" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
//           <FormHelperText>Helper text with default top margin</FormHelperText>
//         </div>
//         <div>
//           <input id="helper-no-margin" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
//           <FormHelperText hasTopMargin={false}>Helper text without top margin</FormHelperText>
//         </div>
//       </div>
//     </div>
//   );
// });

// /**
//  * Examples of enhanced FormErrorMessage component
//  */
// export const FormErrorMessageExamples = component$(() => {
//   // Sample SVG icon for error message
//   const AlertIcon = (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="16"
//       height="16"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       stroke-width="2"
//       stroke-linecap="round"
//       stroke-linejoin="round"
//     >
//       <circle cx="12" cy="12" r="10"></circle>
//       <line x1="12" y1="8" x2="12" y2="12"></line>
//       <line x1="12" y1="16" x2="12.01" y2="16"></line>
//     </svg>
//   );

//   return (
//     <div class="grid grid-cols-2 gap-6">
//       <div class="space-y-4">
//         <h3 class="text-lg font-medium mb-2">Size Variants</h3>
//         <div>
//           <input id="error-sm" type="text" class="w-full px-3 py-2 border border-red-300 rounded-md" />
//           <FormErrorMessage size="sm">Small error message</FormErrorMessage>
//         </div>
//         <div>
//           <input id="error-md" type="text" class="w-full px-3 py-2 border border-red-300 rounded-md" />
//           <FormErrorMessage size="md">Medium error message (Default)</FormErrorMessage>
//         </div>
//         <div>
//           <input id="error-lg" type="text" class="w-full px-3 py-2 border border-red-300 rounded-md" />
//           <FormErrorMessage size="lg">Large error message</FormErrorMessage>
//         </div>
//       </div>

//       <div class="space-y-4">
//         <h3 class="text-lg font-medium mb-2">With Icons</h3>
//         <div>
//           <input id="error-icon" type="text" class="w-full px-3 py-2 border border-red-300 rounded-md" />
//           <FormErrorMessage icon={AlertIcon}>Error message with icon</FormErrorMessage>
//         </div>
//         <div>
//           <input id="error-icon-animate" type="text" class="w-full px-3 py-2 border border-red-300 rounded-md" />
//           <FormErrorMessage icon={AlertIcon} animate>Animated error message with icon</FormErrorMessage>
//         </div>
//       </div>

//       <div class="space-y-4">
//         <h3 class="text-lg font-medium mb-2">Animation Options</h3>
//         <div>
//           <input id="error-animate" type="text" class="w-full px-3 py-2 border border-red-300 rounded-md" />
//           <FormErrorMessage animate>Animated error message (Default)</FormErrorMessage>
//         </div>
//         <div>
//           <input id="error-no-animate" type="text" class="w-full px-3 py-2 border border-red-300 rounded-md" />
//           <FormErrorMessage animate={false}>Non-animated error message</FormErrorMessage>
//         </div>
//       </div>

//       <div class="space-y-4">
//         <h3 class="text-lg font-medium mb-2">Accessibility Features</h3>
//         <div>
//           <input id="error-a11y" type="text" class="w-full px-3 py-2 border border-red-300 rounded-md" aria-describedby="error-a11y-msg" />
//           <FormErrorMessage id="error-a11y-msg" role="alert">Error message with accessibility attributes</FormErrorMessage>
//         </div>
//       </div>
//     </div>
//   );
// });

// /**
//  * Comprehensive Form Example showing all enhanced form utilities working together
//  */
// export const ComprehensiveFormExample = component$(() => {
//   const handleSubmit$ = $((values: Record<string, any>) => {
//     return new Promise<void>((resolve) => {
//       setTimeout(() => {
//         resolve();
//       }, 1000);
//     });
//   });

//   // Sample icons
//   const InfoIcon = (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="16"
//       height="16"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       stroke-width="2"
//       stroke-linecap="round"
//       stroke-linejoin="round"
//     >
//       <circle cx="12" cy="12" r="10"></circle>
//       <line x1="12" y1="16" x2="12" y2="12"></line>
//       <line x1="12" y1="8" x2="12.01" y2="8"></line>
//     </svg>
//   );

//   const AlertIcon = (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="16"
//       height="16"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       stroke-width="2"
//       stroke-linecap="round"
//       stroke-linejoin="round"
//     >
//       <circle cx="12" cy="12" r="10"></circle>
//       <line x1="12" y1="8" x2="12" y2="12"></line>
//       <line x1="12" y1="16" x2="12.01" y2="16"></line>
//     </svg>
//   );

//   return (
//     <div class="max-w-xl mx-auto">
//       <Form
//         onSubmit$={handleSubmit$}
//         validateOnChange={true}
//         validateOnBlur={true}
//         validateOnSubmit={true}
//       >
//         {/* Custom form field with enhanced FormLabel */}
//         <div class="mb-4">
//           <FormLabel
//             for="username"
//             size="md"
//             required
//           >
//             Username
//           </FormLabel>
//           <input
//             id="username"
//             name="username"
//             type="text"
//             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//             required
//           />
//           <FormHelperText
//             icon={InfoIcon}
//             size="sm"
//           >
//             Choose a unique username that will be visible to others
//           </FormHelperText>
//         </div>

//         {/* Email field with validation and error message */}
//         <div class="mb-4">
//           <FormLabel
//             for="email"
//             size="md"
//             required
//           >
//             Email Address
//           </FormLabel>
//           <input
//             id="email"
//             name="email"
//             type="email"
//             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//             required
//           />
//           <FormHelperText>
//             We'll never share your email with anyone else
//           </FormHelperText>
//           <FormErrorMessage
//             id="email-error"
//             icon={AlertIcon}
//             animate
//           >
//             Please enter a valid email address
//           </FormErrorMessage>
//         </div>

//         {/* Password field with strength indicator */}
//         <div class="mb-4">
//           <FormLabel
//             for="password"
//             size="md"
//             required
//           >
//             Password
//           </FormLabel>
//           <input
//             id="password"
//             name="password"
//             type="text"
//             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//             required
//           />
//           <FormHelperText
//             icon={InfoIcon}
//           >
//             Password must be at least 8 characters with uppercase, lowercase, and numbers
//           </FormHelperText>
//         </div>

//         {/* Example of a disabled field */}
//         <div class="mb-4">
//           <FormLabel
//             for="autoUsername"
//             disabled
//           >
//             Auto-generated Username
//           </FormLabel>
//           <input
//             id="autoUsername"
//             name="autoUsername"
//             type="text"
//             class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
//             disabled
//             value="user_12345"
//           />
//           <FormHelperText disabled>
//             This username is automatically generated and cannot be changed
//           </FormHelperText>
//         </div>

//         {/* Example of a field with success state */}
//         <div class="mb-4">
//           <FormLabel
//             for="referral"
//             success
//           >
//             Referral Code
//           </FormLabel>
//           <input
//             id="referral"
//             name="referral"
//             type="text"
//             class="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//             value="FRIEND50"
//           />
//           <FormHelperText success>
//             Valid referral code applied! You'll get 50% off your first month.
//           </FormHelperText>
//         </div>

//         {/* Example of a field with warning state */}
//         <div class="mb-4">
//           <FormLabel
//             for="plan"
//             warning
//           >
//             Subscription Plan
//           </FormLabel>
//           <select
//             id="plan"
//             name="plan"
//             class="w-full px-3 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
//           >
//             <option value="free">Free Plan</option>
//             <option value="basic">Basic Plan ($10/month)</option>
//             <option value="pro">Pro Plan ($20/month)</option>
//           </select>
//           <FormHelperText
//             warning
//             icon={InfoIcon}
//           >
//             Your current plan has limited features. Consider upgrading for full access.
//           </FormHelperText>
//         </div>

//         {/* Form submission buttons */}
//         <div class="flex justify-end gap-3 mt-6">
//           <button
//             type="reset"
//             class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md"
//           >
//             Reset
//           </button>
//           <button
//             type="submit"
//             class="px-4 py-2 text-white bg-blue-600 rounded-md"
//           >
//             Create Account
//           </button>
//         </div>
//       </Form>
//     </div>
//   );
// });

// export default FormUtilitiesExamples;
