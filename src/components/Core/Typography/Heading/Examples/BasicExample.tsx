import { component$ } from "@builder.io/qwik";
import { Heading } from "../Heading";

/**
 * Basic Example - Demonstrates fundamental Heading usage
 */
export const BasicExample = component$(() => {
  return (
    <div class="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div class="space-y-4">
        <Heading level={1}>Basic Heading Example</Heading>
        
        <p class="text-gray-600 dark:text-gray-400">
          This example shows the basic usage of the Heading component with different levels.
        </p>
      </div>

      <div class="space-y-3 border-l-4 border-primary-500 pl-4">
        <Heading level={1}>Page Title (h1)</Heading>
        <Heading level={2}>Section Title (h2)</Heading>
        <Heading level={3}>Subsection Title (h3)</Heading>
        <Heading level={4}>Card Title (h4)</Heading>
        <Heading level={5}>Small Title (h5)</Heading>
        <Heading level={6}>Tiny Title (h6)</Heading>
      </div>

      <div class="mt-6 p-4 bg-gray-100 dark:bg-gray-900 rounded">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          <strong>💡 Tip:</strong> Each heading level has a predefined size that follows a consistent typographic scale.
        </p>
      </div>
    </div>
  );
});

export default BasicExample;