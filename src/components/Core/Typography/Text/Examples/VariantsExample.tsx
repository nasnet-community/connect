import { component$ } from "@builder.io/qwik";
import { Text } from "../Text";

/**
 * Variants Example - Demonstrates all text variants and their use cases
 */
export const VariantsExample = component$(() => {
  return (
    <div class="space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div class="space-y-4">
        <Text variant="body" size="lg" weight="semibold">Text Variants Example</Text>
        
        <Text color="secondary">
          This example showcases all available text variants and their typical use cases in real-world applications.
        </Text>
      </div>

      {/* Body Variant */}
      <div class="space-y-4">
        <Text variant="label" weight="semibold" color="accent">Body Text</Text>
        <div class="space-y-3 border-l-4 border-blue-500 pl-4">
          <Text variant="body">
            This is body text, perfect for general content and descriptions. It's the default variant 
            and provides excellent readability for longer passages of text.
          </Text>
          <Text variant="body" size="sm">
            Body text can also be rendered in smaller sizes for secondary information or space-constrained areas.
          </Text>
        </div>
      </div>

      {/* Paragraph Variant */}
      <div class="space-y-4">
        <Text variant="label" weight="semibold" color="accent">Paragraph Text</Text>
        <div class="border-l-4 border-green-500 pl-4">
          <Text variant="paragraph">
            Paragraph text is semantically rendered as a &lt;p&gt; element and is ideal for blocks of content. 
            It provides proper spacing and semantic meaning for screen readers and SEO.
          </Text>
          <Text variant="paragraph" class="mt-3">
            Multiple paragraphs create natural content flow and are perfect for articles, 
            descriptions, and any multi-paragraph content.
          </Text>
        </div>
      </div>

      {/* Caption Variant */}
      <div class="space-y-4">
        <Text variant="label" weight="semibold" color="accent">Caption Text</Text>
        <div class="border border-gray-200 dark:border-gray-700 rounded p-4">
          <div class="w-full h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded mb-2"></div>
          <Text variant="caption">
            Caption text is perfect for image descriptions, metadata, timestamps, and supplementary information. 
            It's rendered smaller with muted colors for hierarchy.
          </Text>
        </div>
      </div>

      {/* Label Variant */}
      <div class="space-y-4">
        <Text variant="label" weight="semibold" color="accent">Label Text</Text>
        <div class="space-y-4 border-l-4 border-yellow-500 pl-4">
          <div class="space-y-2">
            <Text variant="label">Username</Text>
            <div class="p-2 border border-gray-300 dark:border-gray-600 rounded">john.doe</div>
          </div>
          <div class="space-y-2">
            <Text variant="label">Email Address</Text>
            <div class="p-2 border border-gray-300 dark:border-gray-600 rounded">john@example.com</div>
          </div>
          <Text variant="caption" color="tertiary">
            Label text is designed for form labels, section headers, and categorization.
          </Text>
        </div>
      </div>

      {/* Code Variant */}
      <div class="space-y-4">
        <Text variant="label" weight="semibold" color="accent">Code Text</Text>
        <div class="space-y-3 border-l-4 border-red-500 pl-4">
          <Text variant="paragraph">
            Use <Text variant="code">npm install</Text> to install dependencies, then run{" "}
            <Text variant="code">npm run dev</Text> to start the development server.
          </Text>
          <Text variant="paragraph">
            The <Text variant="code">component$()</Text> function is used to define Qwik components 
            with automatic serialization boundaries.
          </Text>
          <Text variant="code" as="div" class="p-3 bg-gray-50 dark:bg-gray-900 rounded">
            const MyComponent = component$(()=&gt; &#123;{"\n"}
            {"  "}return &lt;div&gt;Hello World&lt;/div&gt;;{"\n"}
            &#125;);
          </Text>
        </div>
      </div>

      {/* Quote Variant */}
      <div class="space-y-4">
        <Text variant="label" weight="semibold" color="accent">Quote Text</Text>
        <div class="space-y-4">
          <Text variant="quote">
            "The best way to predict the future is to create it. Design systems provide the foundation 
            for consistent, scalable user experiences."
          </Text>
          <Text variant="quote" size="sm">
            "Good typography is invisible. Great typography is unforgettable."
          </Text>
        </div>
      </div>

      {/* Interactive Text */}
      <div class="space-y-4">
        <Text variant="label" weight="semibold" color="accent">Interactive Text</Text>
        <div class="space-y-2 border-l-4 border-indigo-500 pl-4">
          <Text 
            variant="body" 
            color="accent" 
            onClick$={() => alert('Text clicked!')}
          >
            This text is clickable and shows hover effects
          </Text>
          <Text variant="caption" color="tertiary">
            Click the text above to see the interaction
          </Text>
        </div>
      </div>

      <div class="mt-8 p-4 bg-gray-100 dark:bg-gray-900 rounded">
        <Text size="sm" color="tertiary">
          <Text weight="semibold">🎯 Best Practice:</Text> Choose variants based on semantic meaning and visual hierarchy. 
          Use body/paragraph for content, labels for categorization, captions for metadata, 
          code for technical references, and quotes for emphasized statements.
        </Text>
      </div>
    </div>
  );
});

export default VariantsExample;