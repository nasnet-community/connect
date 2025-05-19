export { default as ContainerOverview } from './Overview';
export { default as ContainerExamples } from './Examples';
export { default as ContainerAPIReference } from './APIReference';
export { default as ContainerUsage } from './Usage';
export { default as ContainerPlayground } from './Playground';

export const componentIntegration = `
The Container component can be easily integrated into any Qwik application. Import the component from your components directory and use it to constrain content width and provide consistent spacing.

Basic usage:
\`\`\`tsx
import { component$ } from '@builder.io/qwik';
import { Container } from '~/components/Core/Layout/Container';

export default component$(() => {
  return (
    <Container maxWidth="lg" paddingX="md">
      <h1 class="text-2xl font-bold">Page Title</h1>
      <p class="mt-4">
        This content will be constrained to a maximum width of 512px on large screens
        and have consistent horizontal padding.
      </p>
    </Container>
  );
});
\`\`\`

Fluid container with custom padding:
\`\`\`tsx
import { component$ } from '@builder.io/qwik';
import { Container } from '~/components/Core/Layout/Container';

export default component$(() => {
  return (
    <Container maxWidth="fluid" paddingX="lg" paddingY="xl">
      <div class="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-8 text-white">
        <h2 class="text-3xl font-bold">Full-width Section</h2>
        <p class="mt-4">
          This content spans the full width of its parent, but maintains consistent 
          padding around the edges.
        </p>
      </div>
    </Container>
  );
});
\`\`\`
`;

export const customization = `
The Container component can be customized through its props and CSS classes to adapt to different design requirements.

Key customization areas:
- **Width Constraints**: Choose from predefined max-width sizes or fluid/full options
- **Padding Control**: Set consistent horizontal and vertical spacing
- **Alignment**: Center content or align it to the edge of the viewport
- **Responsiveness**: Use fixed width for consistent sizing or responsive behavior
- **Visual Styling**: Apply custom background, borders, and other styles with classes

Example with custom styling:
\`\`\`tsx
import { component$ } from '@builder.io/qwik';
import { Container } from '~/components/Core/Layout/Container';

export default component$(() => {
  return (
    <div class="space-y-8">
      {/* Container with custom background and shadow */}
      <Container 
        maxWidth="md" 
        paddingX="md" 
        paddingY="md"
        class="bg-white dark:bg-gray-800 shadow-lg rounded-lg"
      >
        <h2 class="text-xl font-semibold">Styled Container</h2>
        <p class="mt-2">Content with custom visual styling</p>
      </Container>
      
      {/* Container with custom border styling */}
      <Container 
        maxWidth="sm" 
        class="border-2 border-primary-500 rounded-lg overflow-hidden"
      >
        <div class="bg-primary-50 dark:bg-primary-900/20 p-4">
          <h3 class="text-lg font-medium">Highlighted Container</h3>
          <p class="mt-2">Content with custom border styling</p>
        </div>
      </Container>
    </div>
  );
});
\`\`\`

For more complex use cases, you can create custom container variants:

\`\`\`tsx
import { component$, Slot, type QwikIntrinsicElements } from '@builder.io/qwik';
import { Container } from '~/components/Core/Layout/Container';

export interface CardContainerProps extends QwikIntrinsicElements['div'] {
  title?: string;
}

export const CardContainer = component$<CardContainerProps>((props) => {
  const { title, ...rest } = props;
  
  return (
    <Container 
      maxWidth="md" 
      paddingX="none" 
      class="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
      {...rest}
    >
      {title && (
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-medium">{title}</h3>
        </div>
      )}
      <div class="p-6">
        <Slot />
      </div>
    </Container>
  );
});
\`\`\`
`;
