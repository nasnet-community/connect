export { default as Overview } from './Overview';
export { default as Examples } from './Examples';
export { default as APIReference } from './APIReference';
export { default as Usage } from './Usage';
export { default as Playground } from './Playground';

export const componentIntegration = `
The FormErrorMessage component can be easily integrated into any Qwik application. Import the component from your components directory and use it to display validation errors for form fields.

Basic usage:
\`\`\`tsx
import { component$ } from '@builder.io/qwik';
import { FormErrorMessage } from '~/components/Core/Form/FormErrorMessage';

export default component$(() => {
  return (
    <div>
      <label for="email">Email</label>
      <input 
        id="email"
        type="email"
        aria-invalid="true"
        aria-describedby="email-error"
      />
      <FormErrorMessage id="email-error">
        Please enter a valid email address
      </FormErrorMessage>
    </div>
  );
});
\`\`\`

With icon and animation:
\`\`\`tsx
import { component$ } from '@builder.io/qwik';
import { FormErrorMessage } from '~/components/Core/Form/FormErrorMessage';

export default component$(() => {
  return (
    <div>
      <label for="password">Password</label>
      <input 
        id="password"
        type="password"
        aria-invalid="true"
        aria-describedby="password-error"
      />
      <FormErrorMessage 
        id="password-error"
        animate
        icon={<span class="i-lucide-x-circle w-4 h-4" />}
      >
        Password must be at least 8 characters long
      </FormErrorMessage>
    </div>
  );
});
\`\`\`
`;

export const customization = `
The FormErrorMessage component can be customized through various props to adapt to different design requirements and use cases.

Key customization areas:
- **Size**: Choose from 'sm', 'md', or 'lg' to match your form's design
- **Icons**: Add appropriate icons to enhance visual communication
- **Animation**: Enable animation to draw attention to new errors
- **Spacing**: Control top margin with the hasTopMargin prop
- **Custom Classes**: Apply additional CSS classes for further styling

Example with different sizes and custom icons:
\`\`\`tsx
import { component$ } from '@builder.io/qwik';
import { FormErrorMessage } from '~/components/Core/Form/FormErrorMessage';

export default component$(() => {
  return (
    <div class="space-y-4">
      <div>
        <input id="field1" type="text" aria-invalid="true" aria-describedby="error-1" />
        <FormErrorMessage 
          id="error-1"
          size="sm"
          icon={<span class="i-lucide-alert-triangle w-3 h-3" />}
        >
          This field is required
        </FormErrorMessage>
      </div>
      
      <div>
        <input id="field2" type="text" aria-invalid="true" aria-describedby="error-2" />
        <FormErrorMessage 
          id="error-2"
          size="md"
          icon={<span class="i-lucide-x-circle w-4 h-4" />}
        >
          Please enter a valid phone number
        </FormErrorMessage>
      </div>
      
      <div>
        <input id="field3" type="text" aria-invalid="true" aria-describedby="error-3" />
        <FormErrorMessage 
          id="error-3"
          size="lg"
          animate
          icon={<span class="i-lucide-alert-octagon w-5 h-5" />}
        >
          This username is already taken
        </FormErrorMessage>
      </div>
    </div>
  );
});
\`\`\`
`; 