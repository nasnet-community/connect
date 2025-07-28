import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";
import { CodeBlock } from "~/components/Core/Typography/CodeDisplay";

export default component$(() => {
  return (
    <OverviewTemplate
      title="Grid"
      description="A powerful layout component for creating two-dimensional grid layouts based on CSS Grid."
    >
      <p>
        The Grid component is a powerful layout primitive for creating
        two-dimensional grid layouts based on CSS Grid. It provides a simple API
        for creating complex layouts with consistent spacing, responsive
        behavior, and alignment control.
      </p>

      <h2 class="mb-4 mt-8 text-xl font-semibold">Key Features</h2>
      <ul class="list-disc space-y-2 pl-6">
        <li>Create responsive grid layouts with intuitive props</li>
        <li>Control column and row counts with standard values (1-12)</li>
        <li>Auto-fill and auto-fit modes for dynamic grid layouts</li>
        <li>Customize gap spacing between grid items</li>
        <li>Adjust alignment of items within the grid</li>
        <li>
          Precise control over grid item placement with the GridItem component
        </li>
        <li>Support for custom grid templates for advanced layouts</li>
      </ul>

      <h2 class="mb-4 mt-8 text-xl font-semibold">When To Use</h2>
      <ul class="list-disc space-y-2 pl-6">
        <li>Creating card layouts, image galleries, or dashboards</li>
        <li>Building responsive page layouts with multiple columns</li>
        <li>Arranging form elements in a grid</li>
        <li>Creating complex, area-based layouts with precise control</li>
        <li>Any scenario where you need a two-dimensional layout system</li>
      </ul>

      <h2 class="mb-4 mt-8 text-xl font-semibold">Basic Example</h2>
      <p class="mb-4">
        Here's a simple example of the Grid component in action:
      </p>
      <CodeBlock
        code={`<Grid columns="3" gap="md">
  <div class="bg-primary text-white p-4 rounded-md">Item 1</div>
  <div class="bg-primary text-white p-4 rounded-md">Item 2</div>
  <div class="bg-primary text-white p-4 rounded-md">Item 3</div>
  <div class="bg-primary text-white p-4 rounded-md">Item 4</div>
  <div class="bg-primary text-white p-4 rounded-md">Item 5</div>
  <div class="bg-primary text-white p-4 rounded-md">Item 6</div>
</Grid>`}
        language="tsx"
      />

      <h2 class="mb-4 mt-8 text-xl font-semibold">Responsive Grid Example</h2>
      <p class="mb-4">
        The Grid component supports responsive layouts using breakpoint-specific
        props:
      </p>
      <CodeBlock
        code={`<Grid 
  columns={{ base: "1", md: "2", lg: "3" }} 
  gap="md"
>
  <div class="bg-primary text-white p-4 rounded-md">Item 1</div>
  <div class="bg-primary text-white p-4 rounded-md">Item 2</div>
  <div class="bg-primary text-white p-4 rounded-md">Item 3</div>
</Grid>`}
        language="tsx"
      />

      <h2 class="mb-4 mt-8 text-xl font-semibold">With GridItem</h2>
      <p class="mb-4">
        Use the GridItem component for precise control over grid cell placement:
      </p>
      <CodeBlock
        code={`<Grid columns="3" rows="3" gap="md">
  <GridItem colSpan={2} rowSpan={2} class="bg-primary text-white p-4 rounded-md">
    Spans 2x2
  </GridItem>
  <GridItem class="bg-secondary text-white p-4 rounded-md">
    Regular cell
  </GridItem>
  <GridItem colStart={2} colEnd={4} class="bg-success text-white p-4 rounded-md">
    Spans column 2-3
  </GridItem>
</Grid>`}
        language="tsx"
      />
    </OverviewTemplate>
  );
});
