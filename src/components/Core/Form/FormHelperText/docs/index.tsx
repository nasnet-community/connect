export { default as Overview } from "./Overview";
export { default as Examples } from "./Examples";
export { default as APIReference } from "./APIReference";
export { default as Usage } from "./Usage";
export { default as Playground } from "./Playground";

export const componentIntegration = `
The FormHelperText component can be easily integrated into any Qwik application. Import the component from your components directory and provide the necessary props.

Basic usage:
\`\`\`tsx
import { component$ } from '@builder.io/qwik';
import { FormHelperText } from '~/components/Core/Form/FormHelperText';

export default component$(() => {
  return (
    <div>
      <label for="email">Email</label>
      <input 
        id="email"
        type="email"
        aria-describedby="email-helper"
      />
      <FormHelperText id="email-helper">
        We'll never share your email with anyone else
      </FormHelperText>
    </div>
  );
});
\`\`\`

With error state:
\`\`\`tsx
import { component$ } from '@builder.io/qwik';
import { FormHelperText } from '~/components/Core/Form/FormHelperText';

export default component$(() => {
  return (
    <div>
      <label for="password">Password</label>
      <input 
        id="password"
        type="password"
        aria-describedby="password-helper"
        aria-invalid="true"
      />
      <FormHelperText 
        id="password-helper"
        error
      >
        Password must be at least 8 characters
      </FormHelperText>
    </div>
  );
});
\`\`\`
`;

export const customization = `
The FormHelperText component can be customized through various props to adapt to different design requirements and states.

Key customization areas:
- **Size**: Choose from 'sm', 'md', or 'lg' to match your form's design
- **State Styling**: Apply states like error, success, warning, or disabled
- **Icons**: Add appropriate icons to enhance visual communication
- **Accessibility**: Make helper text screen reader only with the srOnly prop
- **Spacing**: Control top margin with the hasTopMargin prop
- **Custom Classes**: Apply additional CSS classes for further styling

Example with icon and custom state:
\`\`\`tsx
import { component$ } from '@builder.io/qwik';
import { FormHelperText } from '~/components/Core/Form/FormHelperText';

export default component$(() => {
  return (
    <div class="space-y-4">
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" />
        <FormHelperText 
          icon={<span class="i-lucide-info w-4 h-4" />}
        >
          We'll use this for account verification
        </FormHelperText>
      </div>
      
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" />
        <FormHelperText 
          warning
          icon={<span class="i-lucide-alert-triangle w-4 h-4" />}
        >
          Your password should include special characters
        </FormHelperText>
      </div>
      
      <div>
        <label for="phone">Phone</label>
        <input id="phone" type="tel" />
        <FormHelperText size="sm">
          Format: (XXX) XXX-XXXX
        </FormHelperText>
      </div>
    </div>
  );
});
\`\`\`
`;
