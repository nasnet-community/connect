import { component$ } from "@builder.io/qwik";
import { Text } from "../Text";

/**
 * Overview documentation for the Text component
 * 
 * The Text component is a versatile typography element that provides
 * consistent styling for all body text, labels, captions, and inline content.
 */
export const Overview = component$(() => {
  return (
    <div class="space-y-8 p-6">
      {/* Introduction */}
      <section class="space-y-4">
        <Text variant="body" as="h1" size="2xl" weight="bold" class="text-3xl md:text-4xl lg:text-5xl">
          Text Component
        </Text>
        
        <Text variant="paragraph" size="base" class="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          The Text component is the foundation of readable content in your application. It provides
          comprehensive typography controls with semantic variants, responsive sizing, and accessible
          design patterns. From body text to code snippets, the Text component handles all non-heading
          textual content with consistency and flexibility.
        </Text>
      </section>

      {/* Key Features */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl">
          Key Features
        </Text>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-surface-light-secondary dark:bg-surface-dark-secondary rounded-lg p-4">
            <Text variant="label" color="accent" weight="medium" class="text-lg mb-2">
              🎨 Rich Variants
            </Text>
            <Text variant="body" size="sm" color="secondary">
              Body, paragraph, caption, label, code, and quote variants for different content types
            </Text>
          </div>
          
          <div class="bg-surface-light-secondary dark:bg-surface-dark-secondary rounded-lg p-4">
            <Text variant="label" color="accent" weight="medium" class="text-lg mb-2">
              📐 Flexible Sizing
            </Text>
            <Text variant="body" size="sm" color="secondary">
              Six size options (xs to 2xl) with full responsive breakpoint support
            </Text>
          </div>
          
          <div class="bg-surface-light-secondary dark:bg-surface-dark-secondary rounded-lg p-4">
            <Text variant="label" color="accent" weight="medium" class="text-lg mb-2">
              🎯 Smart Truncation
            </Text>
            <Text variant="body" size="sm" color="secondary">
              Single and multi-line text truncation with configurable line limits
            </Text>
          </div>
          
          <div class="bg-surface-light-secondary dark:bg-surface-dark-secondary rounded-lg p-4">
            <Text variant="label" color="accent" weight="medium" class="text-lg mb-2">
              ⚡ Interactive Support
            </Text>
            <Text variant="body" size="sm" color="secondary">
              Built-in click handlers with hover states for interactive text elements
            </Text>
          </div>
        </div>
      </section>

      {/* Text Variants Preview */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl">
          Text Variants
        </Text>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
          <div class="space-y-2">
            <Text variant="body" weight="medium">Body Text (Default)</Text>
            <Text variant="body" color="secondary">
              Standard body text for general content and descriptions
            </Text>
          </div>
          
          <div class="space-y-2">
            <Text variant="paragraph" weight="medium">Paragraph Text</Text>
            <Text variant="paragraph" color="secondary">
              Paragraph text renders as &lt;p&gt; element for semantic content blocks
            </Text>
          </div>
          
          <div class="space-y-2">
            <Text variant="caption" weight="medium">Caption Text</Text>
            <Text variant="caption" color="secondary">
              Smaller text for captions, metadata, and supplementary information
            </Text>
          </div>
          
          <div class="space-y-2">
            <Text variant="label" weight="medium">Label Text</Text>
            <Text variant="label" color="secondary">
              Medium weight text for form labels and UI element descriptions
            </Text>
          </div>
          
          <div class="space-y-2">
            <Text variant="code" weight="medium">Code Text</Text>
            <Text variant="code" color="secondary">
              Monospace text with background for inline code snippets
            </Text>
          </div>
          
          <div class="space-y-2">
            <Text variant="quote" weight="medium">Quote Text</Text>
            <Text variant="quote" color="secondary">
              Styled blockquote text with left border and italic formatting
            </Text>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl">
          Common Use Cases
        </Text>
        
        <div class="space-y-3">
          <div class="border-l-4 border-primary-500 pl-4">
            <Text variant="label" weight="medium" class="text-lg mb-1">Content Body Text</Text>
            <Text variant="caption" color="secondary">
              Main readable content in articles, descriptions, and documentation
            </Text>
          </div>
          
          <div class="border-l-4 border-primary-500 pl-4">
            <Text variant="label" weight="medium" class="text-lg mb-1">Form Labels & Captions</Text>
            <Text variant="caption" color="secondary">
              Input labels, helper text, error messages, and field descriptions
            </Text>
          </div>
          
          <div class="border-l-4 border-primary-500 pl-4">
            <Text variant="label" weight="medium" class="text-lg mb-1">UI Metadata</Text>
            <Text variant="caption" color="secondary">
              Timestamps, user names, status indicators, and data annotations
            </Text>
          </div>
          
          <div class="border-l-4 border-primary-500 pl-4">
            <Text variant="label" weight="medium" class="text-lg mb-1">Interactive Elements</Text>
            <Text variant="caption" color="secondary">
              Clickable text, links, tags, and action-triggered content
            </Text>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl">
          Best Practices
        </Text>
        
        <ul class="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
          <li class="flex items-start gap-2">
            <Text color="success" class="mt-0.5">✓</Text>
            <Text>Choose appropriate variants based on content semantics (body vs paragraph vs caption)</Text>
          </li>
          <li class="flex items-start gap-2">
            <Text color="success" class="mt-0.5">✓</Text>
            <Text>Use responsive sizing for optimal readability across devices</Text>
          </li>
          <li class="flex items-start gap-2">
            <Text color="success" class="mt-0.5">✓</Text>
            <Text>Apply consistent color schemes - primary for main content, secondary for supporting text</Text>
          </li>
          <li class="flex items-start gap-2">
            <Text color="success" class="mt-0.5">✓</Text>
            <Text>Implement truncation for dynamic content that might overflow containers</Text>
          </li>
          <li class="flex items-start gap-2">
            <Text color="success" class="mt-0.5">✓</Text>
            <Text>Use the 'as' prop when the semantic element differs from the visual styling</Text>
          </li>
        </ul>
      </section>

      {/* Quick Example */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl">
          Quick Example
        </Text>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
          <Text 
            variant="paragraph"
            responsiveSize={{
              base: "base",
              md: "lg"
            }}
            weight="normal"
            color="primary"
          >
            This is a responsive paragraph that adapts to screen size while maintaining readability.
          </Text>
          
          <Text variant="caption" color="secondary" weight="medium">
            Supporting caption text with secondary color
          </Text>
          
          <Text 
            variant="code" 
            color="accent"
            onClick$={() => console.log('Code clicked')}
          >
            Interactive code snippet with click handler
          </Text>
          
          <Text 
            variant="body" 
            truncate 
            maxLines={2}
            class="max-w-xs"
          >
            This text will be truncated after two lines to maintain layout consistency in constrained containers.
          </Text>
        </div>
      </section>
    </div>
  );
});