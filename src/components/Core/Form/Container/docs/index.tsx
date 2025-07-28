export { default as Overview } from "./Overview";
export { default as Examples } from "./Examples";
export { default as APIReference } from "./APIReference";
export { default as Usage } from "./Usage";
export { default as Playground } from "./Playground";

export const componentIntegration = `
The Container component can be easily integrated into any Qwik application. Import the component from your components directory and use it to organize form sections.

Basic usage:
\`\`\`tsx
import { component$ } from '@builder.io/qwik';
import { Container } from '~/components/Core/Form/Container';

export default component$(() => {
  return (
    <Container 
      title="Personal Information" 
      description="Please provide your personal details."
    >
      <div class="grid gap-4">
        <div>
          <label for="name">Name</label>
          <input type="text" id="name" />
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" />
        </div>
      </div>
    </Container>
  );
});
\`\`\`

With footer slot for actions:
\`\`\`tsx
import { component$ } from '@builder.io/qwik';
import { Container } from '~/components/Core/Form/Container';

export default component$(() => {
  return (
    <Container title="Form with Actions">
      <div class="space-y-4">
        {/* Form content */}
      </div>
      
      <div q:slot="footer" class="flex justify-end gap-2 pt-4 border-t">
        <button class="px-4 py-2 bg-gray-200">Cancel</button>
        <button class="px-4 py-2 bg-primary-600 text-white">Submit</button>
      </div>
    </Container>
  );
});
\`\`\`
`;

export const customization = `
The Container component can be customized through its props and CSS classes to adapt to different design requirements.

Key customization areas:
- **Title and Description**: Customize the header area with title and description text
- **Borders**: Toggle the border with the \`bordered\` prop
- **Custom Styling**: Apply additional CSS classes with the \`class\` prop
- **Content Layout**: Organize content within the Container using standard HTML and CSS

Example with custom styling:
\`\`\`tsx
import { component$ } from '@builder.io/qwik';
import { Container } from '~/components/Core/Form/Container';

export default component$(() => {
  return (
    <div class="space-y-6">
      {/* Custom background color */}
      <Container 
        title="Profile Settings" 
        class="bg-blue-50 dark:bg-blue-900/20"
      >
        {/* Container content */}
      </Container>
      
      {/* Borderless container with custom padding */}
      <Container 
        title="Privacy Settings" 
        bordered={false}
        class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg"
      >
        {/* Container content */}
      </Container>
    </div>
  );
});
\`\`\`

For more complex customization needs, you can create wrapped components that extend the Container's functionality:

\`\`\`tsx
import { component$, Slot } from '@builder.io/qwik';
import { Container } from '~/components/Core/Form/Container';

export const FormSection = component$<{
  title: string;
  description?: string;
  required?: boolean;
}>((props) => {
  return (
    <Container 
      title={props.title + (props.required ? ' *' : '')}
      description={props.description}
      class={props.required ? 'border-primary-300 dark:border-primary-700' : ''}
    >
      <Slot />
      <div q:slot="footer" class="flex justify-end">
        <Slot name="actions" />
      </div>
    </Container>
  );
});
\`\`\`
`;
