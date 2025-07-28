import { component$ } from "@builder.io/qwik";
import { Text } from "../Text";

/**
 * Examples showcase for the Text component
 * 
 * Interactive examples demonstrating various use cases and configurations
 */
export const Examples = component$(() => {
  return (
    <div class="space-y-12 p-6">
      {/* Header */}
      <section class="space-y-4">
        <Text variant="body" as="h1" size="2xl" weight="bold" class="text-3xl md:text-4xl">
          Text Examples
        </Text>
        
        <Text variant="paragraph" size="base" color="secondary">
          Explore different configurations and use cases for the Text component.
        </Text>
      </section>

      {/* Text Variants */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl mb-4">
          Text Variants
        </Text>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-6">
          <div class="space-y-2">
            <Text variant="label" weight="medium" size="sm" color="tertiary">Body Variant</Text>
            <Text variant="body">
              This is the default body text variant. It renders as a span element and is perfect for general purpose text content.
            </Text>
          </div>

          <div class="space-y-2">
            <Text variant="label" weight="medium" size="sm" color="tertiary">Paragraph Variant</Text>
            <Text variant="paragraph">
              This is paragraph text that renders as a &lt;p&gt; element. Use this for semantic paragraph blocks and longer content sections.
            </Text>
          </div>

          <div class="space-y-2">
            <Text variant="label" weight="medium" size="sm" color="tertiary">Caption Variant</Text>
            <Text variant="caption">
              This is caption text - smaller and more subtle, perfect for image captions, metadata, and supplementary information.
            </Text>
          </div>

          <div class="space-y-2">
            <Text variant="label" weight="medium" size="sm" color="tertiary">Label Variant</Text>
            <Text variant="label">
              This is label text with medium font weight, ideal for form labels and UI element descriptions.
            </Text>
          </div>

          <div class="space-y-2">
            <Text variant="label" weight="medium" size="sm" color="tertiary">Code Variant</Text>
            <Text variant="code">
              const example = "This is inline code with monospace font and background styling";
            </Text>
          </div>

          <div class="space-y-2">
            <Text variant="label" weight="medium" size="sm" color="tertiary">Quote Variant</Text>
            <Text variant="quote">
              This is quote text with italic styling and a left border, perfect for blockquotes and emphasized content.
            </Text>
          </div>
        </div>

        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <Text variant="caption" color="info">
            Note: Each variant has appropriate semantic HTML elements and styling defaults.
          </Text>
        </div>
      </section>

      {/* Font Sizes */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl mb-4">
          Font Sizes
        </Text>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
          <Text variant="body" size="xs">Extra Small Text (xs) - 12px</Text>
          <Text variant="body" size="sm">Small Text (sm) - 14px</Text>
          <Text variant="body" size="base">Base Text (base) - 16px - Default</Text>
          <Text variant="body" size="lg">Large Text (lg) - 18px</Text>
          <Text variant="body" size="xl">Extra Large Text (xl) - 20px</Text>
          <Text variant="body" size="2xl">2X Large Text (2xl) - 24px</Text>
        </div>
      </section>

      {/* Font Weights */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl mb-4">
          Font Weights
        </Text>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
          <Text variant="body" weight="light" size="lg">Light Weight (300)</Text>
          <Text variant="body" weight="normal" size="lg">Normal Weight (400) - Default</Text>
          <Text variant="body" weight="medium" size="lg">Medium Weight (500)</Text>
          <Text variant="body" weight="semibold" size="lg">Semibold Weight (600)</Text>
          <Text variant="body" weight="bold" size="lg">Bold Weight (700)</Text>
          <Text variant="body" weight="extrabold" size="lg">Extrabold Weight (800)</Text>
        </div>
      </section>

      {/* Color Variants */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl mb-4">
          Color Variants
        </Text>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
          <Text variant="body" color="primary" size="lg">Primary Color (Default) - Main content</Text>
          <Text variant="body" color="secondary" size="lg">Secondary Color - Supporting text</Text>
          <Text variant="body" color="tertiary" size="lg">Tertiary Color - Subtle text</Text>
          <Text variant="body" color="subtle" size="lg">Subtle Color - Very light text</Text>
          <Text variant="body" color="accent" size="lg">Accent Color - Brand highlights</Text>
          <Text variant="body" color="success" size="lg">Success Color - Positive states</Text>
          <Text variant="body" color="warning" size="lg">Warning Color - Caution states</Text>
          <Text variant="body" color="error" size="lg">Error Color - Error states</Text>
          <Text variant="body" color="info" size="lg">Info Color - Informational states</Text>
          
          <div class="bg-gray-800 dark:bg-gray-200 p-4 rounded">
            <Text variant="body" color="inverse" size="lg">Inverse Color - For dark backgrounds</Text>
          </div>
        </div>
      </section>

      {/* Text Alignment */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl mb-4">
          Text Alignment
        </Text>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
          <div class="border-l-4 border-gray-300 dark:border-gray-600 pl-4">
            <Text variant="body" align="left" size="lg">Left Aligned Text (Default)</Text>
          </div>
          
          <div class="border-r-4 border-l-4 border-gray-300 dark:border-gray-600 px-4">
            <Text variant="body" align="center" size="lg">Center Aligned Text</Text>
          </div>
          
          <div class="border-r-4 border-gray-300 dark:border-gray-600 pr-4">
            <Text variant="body" align="right" size="lg">Right Aligned Text</Text>
          </div>
        </div>
      </section>

      {/* Text Transformations */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl mb-4">
          Text Transformations
        </Text>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
          <Text variant="body" transform="none" size="lg">Normal Text (no transformation)</Text>
          <Text variant="body" transform="uppercase" size="lg">Uppercase Text Transformation</Text>
          <Text variant="body" transform="lowercase" size="lg">LOWERCASE TEXT TRANSFORMATION</Text>
          <Text variant="body" transform="capitalize" size="lg">capitalize each word transformation</Text>
        </div>
      </section>

      {/* Text Decorations */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl mb-4">
          Text Decorations
        </Text>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
          <Text variant="body" decoration="none" size="lg">No decoration (default)</Text>
          <Text variant="body" decoration="underline" size="lg">Underlined text decoration</Text>
          <Text variant="body" decoration="line-through" size="lg">Strike-through text decoration</Text>
        </div>
      </section>

      {/* Font Styling */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl mb-4">
          Font Styling
        </Text>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
          <Text variant="body" italic={false} size="lg">Normal font style (default)</Text>
          <Text variant="body" italic={true} size="lg">Italic font style</Text>
          <Text variant="body" monospace={false} size="lg">Default font family</Text>
          <Text variant="body" monospace={true} size="lg">Monospace font family</Text>
          <Text variant="body" italic={true} monospace={true} size="lg">Italic monospace combination</Text>
        </div>
      </section>

      {/* Responsive Sizing */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl mb-4">
          Responsive Sizing
        </Text>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-6">
          <div>
            <Text 
              variant="body"
              responsiveSize={{
                base: "sm",   // Small on mobile
                md: "lg",     // Large on tablet
                lg: "xl"      // Extra large on desktop
              }}
              weight="semibold"
            >
              Responsive Text (Resize Window to See Changes)
            </Text>
            <Text variant="caption" color="secondary" class="mt-2 block">
              Mobile: sm → Tablet: lg → Desktop: xl
            </Text>
          </div>

          <div>
            <Text 
              variant="body"
              responsiveSize={{
                base: "xs",
                sm: "sm",
                md: "base",
                lg: "lg",
                xl: "xl",
                "2xl": "2xl"
              }}
              color="accent"
            >
              Full Responsive Range
            </Text>
            <Text variant="caption" color="secondary" class="mt-2 block">
              Adapts across all breakpoints: xs → sm → base → lg → xl → 2xl
            </Text>
          </div>
        </div>
      </section>

      {/* Text Truncation */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl mb-4">
          Text Truncation
        </Text>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-6">
          <div class="max-w-md">
            <Text variant="label" weight="medium" size="sm" color="tertiary" class="block mb-2">
              Single Line Truncation
            </Text>
            <Text variant="body" truncate maxLines={1} size="lg">
              This is a very long text that will be truncated with an ellipsis when it exceeds the container width because it's just too long to fit
            </Text>
          </div>

          <div class="max-w-md">
            <Text variant="label" weight="medium" size="sm" color="tertiary" class="block mb-2">
              Two Line Truncation
            </Text>
            <Text variant="body" truncate maxLines={2} size="lg">
              This is a very long text that will be truncated after two lines. It demonstrates how multi-line truncation works with the line-clamp utility. The text will show an ellipsis after the second line when the content exceeds the specified number of lines.
            </Text>
          </div>

          <div class="max-w-md">
            <Text variant="label" weight="medium" size="sm" color="tertiary" class="block mb-2">
              Three Line Truncation
            </Text>
            <Text variant="body" truncate maxLines={3} size="lg">
              This is an even longer text example that will be truncated after three lines. This demonstrates how the line-clamp utility can be used for longer content blocks while still maintaining a clean layout. The truncation happens smoothly with an ellipsis indicator, and the container maintains its intended dimensions regardless of the original content length.
            </Text>
          </div>
        </div>
      </section>

      {/* Interactive Elements */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl mb-4">
          Interactive Elements
        </Text>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
          <Text 
            variant="body" 
            color="accent" 
            size="lg"
            onClick$={() => alert('Text clicked!')}
          >
            Clickable Text with Hover Effect
          </Text>
          
          <Text 
            variant="code" 
            color="info"
            onClick$={() => console.log('Code snippet clicked')}
          >
            console.log('Interactive code snippet');
          </Text>
          
          <Text 
            variant="label" 
            color="success"
            decoration="underline"
            onClick$={() => alert('Label action triggered')}
          >
            Action Label with Underline
          </Text>
        </div>

        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <Text variant="caption" color="info">
            Note: Interactive text automatically gets cursor-pointer and hover:underline styles.
          </Text>
        </div>
      </section>

      {/* Semantic Elements */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl mb-4">
          Semantic vs Visual Styling
        </Text>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-6">
          <div>
            <Text variant="body" as="strong" weight="bold" size="lg">
              Visually body text, semantically &lt;strong&gt;
            </Text>
            <Text variant="caption" color="secondary" class="mt-2 block">
              Uses strong tag for semantic importance
            </Text>
          </div>

          <div>
            <Text variant="caption" as="time" color="tertiary">
              2024-01-15T10:30:00Z
            </Text>
            <Text variant="caption" color="secondary" class="mt-2 block">
              Uses time tag for semantic datetime
            </Text>
          </div>

          <div>
            <Text variant="code" as="pre" class="block whitespace-pre-wrap">
{`function example() {
  return "Multi-line code";
}`}
            </Text>
            <Text variant="caption" color="secondary" class="mt-2 block">
              Uses pre tag for preformatted text
            </Text>
          </div>

          <div>
            <Text variant="body" as="figcaption" color="secondary" align="center">
              Figure 1: Example image caption
            </Text>
            <Text variant="caption" color="secondary" class="mt-2 block">
              Uses figcaption tag for image descriptions
            </Text>
          </div>
        </div>
      </section>

      {/* Real-World Examples */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl mb-4">
          Real-World Examples
        </Text>
        
        <div class="space-y-6">
          {/* Article Content */}
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <Text variant="body" size="lg" weight="semibold" class="mb-3">
              Article Title
            </Text>
            <Text variant="paragraph" class="mb-4 leading-relaxed">
              This is the main article content using paragraph variant. It provides good readability
              with appropriate line height and spacing. Perfect for longer form content like blog posts,
              documentation, and articles.
            </Text>
            <Text variant="caption" color="tertiary">
              Published on January 15, 2024 by John Doe
            </Text>
          </div>

          {/* Form Example */}
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <Text variant="label" weight="medium" class="block mb-2">
              Email Address
            </Text>
            <div class="mb-2 p-3 border border-gray-300 dark:border-gray-600 rounded">
              <Text variant="body" color="tertiary">user@example.com</Text>
            </div>
            <Text variant="caption" color="secondary">
              We'll never share your email address with third parties.
            </Text>
          </div>

          {/* Status Messages */}
          <div class="space-y-3">
            <div class="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg p-4">
              <Text variant="body" color="success" weight="medium">
                ✅ Success: Your changes have been saved successfully.
              </Text>
            </div>
            
            <div class="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 rounded-lg p-4">
              <Text variant="body" color="warning" weight="medium">
                ⚠️ Warning: Please review your input before proceeding.
              </Text>
            </div>
            
            <div class="bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg p-4">
              <Text variant="body" color="error" weight="medium">
                ❌ Error: Unable to process your request. Please try again.
              </Text>
            </div>
          </div>

          {/* Code Documentation */}
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <Text variant="label" weight="medium" class="mb-3">
              API Usage Example
            </Text>
            <Text variant="code" class="block mb-3">
              import { Text } from "~/components/Core/Typography";
            </Text>
            <Text variant="caption" color="secondary" class="mb-3">
              Basic import statement for the Text component
            </Text>
            <Text variant="code" class="block">
              &lt;Text variant="body" color="primary"&gt;Hello World&lt;/Text&gt;
            </Text>
          </div>
        </div>
      </section>
    </div>
  );
});