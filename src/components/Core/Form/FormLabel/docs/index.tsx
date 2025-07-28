export { default as Overview } from "./Overview";
export { default as Examples } from "./Examples";
export { default as APIReference } from "./APIReference";
export { default as Usage } from "./Usage";
export { default as Playground } from "./Playground";

export const componentIntegration = `
The FormLabel component can be easily integrated into any Qwik application. Import the component from your components directory and provide the necessary props.

Basic usage:
\`\`\`tsx
import { component$ } from '@builder.io/qwik';
import { FormLabel } from '~/components/Core/Form/FormLabel';

export default component$(() => {
  return (
    <div>
      <FormLabel for="username">Username</FormLabel>
      <input id="username" type="text" />
    </div>
  );
});
\`\`\`

With required field:
\`\`\`tsx
import { component$ } from '@builder.io/qwik';
import { FormLabel } from '~/components/Core/Form/FormLabel';

export default component$(() => {
  return (
    <div>
      <FormLabel for="email" required>Email Address</FormLabel>
      <input id="email" type="email" required />
    </div>
  );
});
\`\`\`
`;

export const customization = `
The FormLabel component can be customized through various props to adapt to different design requirements and states.

Key customization areas:
- **Size**: Choose from 'sm', 'md', or 'lg' to match your form's design
- **State Styling**: Apply states like error, success, warning, or disabled
- **Accessibility**: Make labels screen reader only with the srOnly prop
- **Custom Classes**: Apply additional CSS classes for further styling

Example with different states:
\`\`\`tsx
import { component$ } from '@builder.io/qwik';
import { FormLabel } from '~/components/Core/Form/FormLabel';

export default component$(() => {
  return (
    <div class="space-y-4">
      <div>
        <FormLabel for="name">Name</FormLabel>
        <input id="name" type="text" />
      </div>
      
      <div>
        <FormLabel for="email" error>Email (Error)</FormLabel>
        <input 
          id="email" 
          type="email" 
          class="border-error" 
          aria-invalid="true"
        />
      </div>
      
      <div>
        <FormLabel for="phone" success>Phone (Success)</FormLabel>
        <input 
          id="phone" 
          type="tel" 
          class="border-success" 
        />
      </div>
      
      <div>
        <FormLabel for="search" srOnly>Search</FormLabel>
        <input 
          id="search" 
          type="search" 
          placeholder="Search..." 
        />
      </div>
    </div>
  );
});
\`\`\`
`;
