import { component$ } from '@builder.io/qwik';
import { CodeBlock, OverviewTemplate } from '~/components/Docs/templates';

export default component$(() => {
  return (
    <OverviewTemplate
      title="Flex"
      description="A flexible layout component for creating complex UI arrangements using CSS Flexbox."
    >
      <p>
        The Flex component provides a powerful interface for creating flexible
        layouts using CSS Flexbox. It offers full control over direction,
        alignment, wrapping, and spacing with responsive variants for different
        viewport sizes.
      </p>

      <h2 class="text-xl font-semibold mt-8 mb-4">Key Features</h2>
      <ul class="list-disc pl-6 space-y-2">
        <li>Responsive flex direction, alignment, and spacing</li>
        <li>Intuitive props that map directly to CSS Flexbox properties</li>
        <li>Support for RTL (right-to-left) layouts</li>
        <li>Configurable gap spacing between flex items</li>
        <li>Polymorphic component that can render as any HTML element</li>
      </ul>

      <h2 class="text-xl font-semibold mt-8 mb-4">When to Use</h2>
      <ul class="list-disc pl-6 space-y-2">
        <li>Creating row or column-based layouts</li>
        <li>Building navigation bars and menus</li>
        <li>Distributing space between elements</li>
        <li>Centering content horizontally and vertically</li>
        <li>Creating responsive layouts that adapt to different screen sizes</li>
      </ul>

      <h2 class="text-xl font-semibold mt-8 mb-4">Basic Example</h2>
      <CodeBlock
        code={`
import { component$ } from '@builder.io/qwik';
import { Flex } from '~/components/Core/Layout/Flex';

export default component$(() => {
  return (
    <Flex justify="between" align="center" gap="md">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Flex>
  );
});
      `}
      />
    </OverviewTemplate>
  );
});
