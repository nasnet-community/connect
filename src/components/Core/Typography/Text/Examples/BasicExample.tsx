import { component$ } from "@builder.io/qwik";
import { Text } from "../Text";

/**
 * Basic Example - Demonstrates fundamental Text usage with sizes, weights, and alignments
 */
export const BasicExample = component$(() => {
  return (
    <div class="space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div class="space-y-4">
        <Text variant="body" size="lg" weight="semibold">Basic Text Example</Text>
        
        <Text color="secondary">
          This example shows the basic usage of the Text component with different sizes, weights, and alignments.
        </Text>
      </div>

      {/* Text Sizes */}
      <div class="space-y-4">
        <Text variant="label" weight="semibold" color="accent">Text Sizes</Text>
        <div class="space-y-2 border-l-4 border-blue-500 pl-4">
          <Text size="2xl">Extra Large Text (2xl)</Text>
          <Text size="xl">Large Text (xl)</Text>
          <Text size="lg">Medium Large Text (lg)</Text>
          <Text size="base">Base Text (base)</Text>
          <Text size="sm">Small Text (sm)</Text>
          <Text size="xs">Extra Small Text (xs)</Text>
        </div>
      </div>

      {/* Font Weights */}
      <div class="space-y-4">
        <Text variant="label" weight="semibold" color="accent">Font Weights</Text>
        <div class="space-y-2 border-l-4 border-green-500 pl-4">
          <Text weight="light">Light Weight</Text>
          <Text weight="normal">Normal Weight</Text>
          <Text weight="medium">Medium Weight</Text>
          <Text weight="semibold">Semibold Weight</Text>
          <Text weight="bold">Bold Weight</Text>
          <Text weight="extrabold">Extra Bold Weight</Text>
        </div>
      </div>

      {/* Text Alignment */}
      <div class="space-y-4">
        <Text variant="label" weight="semibold" color="accent">Text Alignment</Text>
        <div class="space-y-3 border border-gray-200 dark:border-gray-700 rounded p-4">
          <Text align="left">Left aligned text (default)</Text>
          <Text align="center">Center aligned text</Text>
          <Text align="right">Right aligned text</Text>
        </div>
      </div>

      {/* Text Transformations */}
      <div class="space-y-4">
        <Text variant="label" weight="semibold" color="accent">Text Transformations</Text>
        <div class="space-y-2 border-l-4 border-purple-500 pl-4">
          <Text transform="none">Normal text transformation</Text>
          <Text transform="uppercase">UPPERCASE TEXT TRANSFORMATION</Text>
          <Text transform="lowercase">lowercase text transformation</Text>
          <Text transform="capitalize">Capitalize Text Transformation</Text>
        </div>
      </div>

      {/* Text Decorations */}
      <div class="space-y-4">
        <Text variant="label" weight="semibold" color="accent">Text Decorations & Styles</Text>
        <div class="space-y-2 border-l-4 border-red-500 pl-4">
          <Text decoration="none">Normal text without decoration</Text>
          <Text decoration="underline">Underlined text</Text>
          <Text decoration="line-through">Strikethrough text</Text>
          <Text italic>Italic text style</Text>
          <Text monospace>Monospace font family</Text>
        </div>
      </div>

      <div class="mt-8 p-4 bg-gray-100 dark:bg-gray-900 rounded">
        <Text size="sm" color="tertiary">
          <Text weight="semibold">💡 Tip:</Text> The Text component provides a comprehensive set of typography options 
          while maintaining consistent spacing and readability across your application.
        </Text>
      </div>
    </div>
  );
});

export default BasicExample;