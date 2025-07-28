import { component$ } from "@builder.io/qwik";
import { UsageTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const installation = `
// Import the Box component
import Box from '~/components/Core/Layout/Box';
`;

  const basicUsage = `
// Basic Box
<Box
  padding="md"
  backgroundColor="surface"
  borderRadius="md"
  borderWidth="thin"
  borderColor="primary"
  shadow="md"
>
  This is a basic box with padding, background, border, and shadow.
</Box>

// Box as a different HTML element
<Box
  as="section"
  padding="lg"
  backgroundColor="surface-alt"
  borderRadius="lg"
  role="region"
  aria-label="Featured content"
>
  <h2>Featured Section</h2>
  <p>This box renders as a section element with accessibility attributes.</p>
</Box>

// Box with custom spacing
<Box
  padding={{
    top: 'lg',
    bottom: 'lg',
    x: 'md'
  }}
  margin={{
    top: 'xl',
    bottom: 'xl',
    x: 'auto'
  }}
  backgroundColor="surface"
  shadow="lg"
  borderRadius="md"
>
  This box has custom padding and margin configurations.
</Box>
`;

  const advancedUsage = `
// Box with responsive styling (using Tailwind classes)
<Box
  padding="md"
  backgroundColor="surface"
  borderRadius="md"
  class="md:w-2/3 lg:w-1/2 mx-auto"
>
  This box has responsive width.
</Box>

// Box for card-like UI elements
<Box
  padding="lg"
  backgroundColor="surface"
  borderRadius="lg"
  shadow="md"
  class="hover:shadow-xl transition-shadow duration-300"
>
  <h3 class="text-lg font-semibold">Card Title</h3>
  <p class="mt-2">This box is styled like a card with hover effects.</p>
  <button class="mt-4 px-4 py-2 bg-primary text-white rounded">Action</button>
</Box>

// Nested boxes for layout
<Box
  padding="lg"
  backgroundColor="surface-alt"
  borderRadius="xl"
>
  <h2 class="text-xl font-bold mb-4">Container Title</h2>
  
  <Box
    padding="md"
    backgroundColor="surface"
    borderRadius="md"
    borderWidth="thin"
    class="mb-4"
  >
    <h3 class="font-medium">Section 1</h3>
    <p>Content for section 1</p>
  </Box>
  
  <Box
    padding="md"
    backgroundColor="surface"
    borderRadius="md"
    borderWidth="thin"
  >
    <h3 class="font-medium">Section 2</h3>
    <p>Content for section 2</p>
  </Box>
</Box>

// Box with full dimensions
<Box
  padding="md"
  backgroundColor="primary"
  fullWidth={true}
  fullHeight={true}
  class="text-white flex items-center justify-center"
  style={{ height: '200px' }}
>
  This box takes up the full width and height of its container.
</Box>
`;

  const dos = [
    "Use Box for general-purpose containers that need theme-aware styling",
    'Use the appropriate HTML element via the "as" prop for proper semantics',
    "Add ARIA attributes when changing the element type from div to maintain accessibility",
    "Use the theme-aware props like padding, margin, and colors for consistent styling",
    "Nest Box components to create complex layouts",
    "Combine with other layout components like Grid or Flex for advanced layouts",
    "Use custom classes for specific styling needs that aren't covered by the component props",
  ];

  const donts = [
    "Avoid using Box for complex interactive components (use more specific components instead)",
    "Don't use excessive nesting of Box components as it can lead to DOM bloat",
    "Avoid using inline styles when theme-aware props are available",
    "Don't use Box when a more specific layout component would be more appropriate",
    "Avoid creating extremely complex styling through props; consider creating a custom component instead",
    'Don\'t set contradicting props (e.g., setting both borderWidth="none" and borderColor="primary")',
    "Avoid using Box merely as a div wrapper when no styling is needed",
  ];

  return (
    <UsageTemplate
      installation={installation}
      basicUsage={basicUsage}
      advancedUsage={advancedUsage}
      dos={dos}
      donts={donts}
    >
      <p>
        Box is a foundational layout component that provides a consistent way to
        apply spacing, backgrounds, borders, and other styling. It forms the
        building block for more complex layouts and UI elements in your
        application.
      </p>

      <p class="mt-4">
        The Box component is highly versatile and can be used for a wide range
        of UI needs, from simple containers to more complex card-like
        interfaces. It uses theme-aware props to ensure consistent styling
        across your application.
      </p>
    </UsageTemplate>
  );
});
