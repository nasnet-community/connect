import { component$ } from '@builder.io/qwik';
import Box from '../Box';
import { OverviewTemplate } from '~/components/Docs/templates';

export default component$(() => {
  return (
    <OverviewTemplate>
      <div class="space-y-6">
        <h2 class="text-xl font-semibold">Introduction</h2>
        <p>
          Box is the most fundamental layout component in the Connect design system. 
          It serves as a wrapper component that provides a systematic way to style elements 
          with theme-aware props related to padding, margin, borders, background, and more.
        </p>

        <h2 class="text-xl font-semibold mt-8">Key Features</h2>
        <ul class="list-disc list-inside space-y-2 ml-4">
          <li>
            <span class="font-medium">Polymorphic Component:</span>{' '}
            Render as any HTML element using the <code>as</code> prop
          </li>
          <li>
            <span class="font-medium">Spacing Control:</span>{' '}
            Consistent padding and margin with design tokens
          </li>
          <li>
            <span class="font-medium">Border Styling:</span>{' '}
            Configurable border width, style, color, and radius
          </li>
          <li>
            <span class="font-medium">Background Colors:</span>{' '}
            Theme-aware background colors that adapt to dark mode
          </li>
          <li>
            <span class="font-medium">Shadow Options:</span>{' '}
            Configurable box-shadow with design tokens
          </li>
          <li>
            <span class="font-medium">Layout Control:</span>{' '}
            Options for full width and height behavior
          </li>
          <li>
            <span class="font-medium">Accessibility:</span>{' '}
            Support for ARIA attributes and semantic roles
          </li>
        </ul>

        <h2 class="text-xl font-semibold mt-8">When to use</h2>
        <ul class="list-disc list-inside space-y-2 ml-4">
          <li>When you need a container with consistent spacing</li>
          <li>When you need to group related elements together</li>
          <li>When you need to apply borders, backgrounds, or shadows</li>
          <li>As a building block for more complex layouts</li>
          <li>To create cards, panels, or sections with consistent styling</li>
        </ul>

        <h2 class="text-xl font-semibold mt-8">When not to use</h2>
        <ul class="list-disc list-inside space-y-2 ml-4">
          <li>When you need specific layout behavior (use Grid, Flex, or other layout components)</li>
          <li>For complex interactive components (use specific components like Card, Dialog, etc.)</li>
          <li>When you need significant custom styling (consider extending Box or creating a new component)</li>
        </ul>

        <h2 class="text-xl font-semibold mt-8">Basic Example</h2>
        <div class="mt-4 border rounded-md p-6 bg-gray-50 dark:bg-gray-800">
          <Box 
            padding="md"
            backgroundColor="surface" 
            borderWidth="normal" 
            borderColor="primary" 
            borderRadius="md"
            shadow="md"
          >
            <p>A simple box with padding, border, and shadow</p>
          </Box>
        </div>
      </div>
    </OverviewTemplate>
  );
});
