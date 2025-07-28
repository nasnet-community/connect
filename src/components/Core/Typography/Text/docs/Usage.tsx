import { component$ } from "@builder.io/qwik";
import { Text } from "../Text";

/**
 * Usage documentation for the Text component
 * 
 * Implementation patterns and guidelines for effective use
 */
export const Usage = component$(() => {
  return (
    <div class="space-y-8 p-6">
      {/* Header */}
      <section class="space-y-4">
        <Text variant="body" as="h1" size="2xl" weight="bold" class="text-3xl md:text-4xl">
          Text Usage Guide
        </Text>
        
        <Text variant="paragraph" color="secondary">
          Comprehensive patterns and guidelines for implementing the Text component effectively
          in your application with best practices for accessibility, performance, and design consistency.
        </Text>
      </section>

      {/* Basic Usage */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl">
          Basic Usage
        </Text>

        <div class="space-y-6">
          <div>
            <Text variant="label" weight="medium" class="mb-3 block">Simple Text Content</Text>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-3">
              <div class="bg-white dark:bg-gray-800 p-4 rounded border">
                <Text variant="body">Default body text for general content</Text>
              </div>
              <Text variant="code" class="block text-sm">
                {`<Text variant="body">Default body text for general content</Text>`}
              </Text>
            </div>
          </div>

          <div>
            <Text variant="label" weight="medium" class="mb-3 block">Paragraph Content</Text>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-3">
              <div class="bg-white dark:bg-gray-800 p-4 rounded border">
                <Text variant="paragraph">
                  This is paragraph text that renders as a semantic &lt;p&gt; element.
                  Use this for longer content blocks and when semantic meaning matters.
                </Text>
              </div>
              <Text variant="code" class="block text-sm">
                {`<Text variant="paragraph">
  This is paragraph text that renders as a semantic <p> element.
  Use this for longer content blocks and when semantic meaning matters.
</Text>`}
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* Text Variants */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl">
          Choosing the Right Variant
        </Text>

        <div class="space-y-6">
          <div>
            <Text variant="label" weight="medium" class="mb-3 block">Content Text</Text>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <Text variant="caption" color="tertiary">Use body for:</Text>
                  <ul class="space-y-1 text-sm">
                    <li>• General text content</li>
                    <li>• Inline text elements</li>
                    <li>• Short descriptions</li>
                  </ul>
                </div>
                <div class="space-y-2">
                  <Text variant="caption" color="tertiary">Use paragraph for:</Text>
                  <ul class="space-y-1 text-sm">
                    <li>• Longer content blocks</li>
                    <li>• Article content</li>
                    <li>• Semantic paragraphs</li>
                  </ul>
                </div>
              </div>
              <Text variant="code" class="block text-sm">
                {`// For general content
<Text variant="body">Short description or inline text</Text>

// For content blocks
<Text variant="paragraph">
  Longer paragraph content that needs semantic meaning...
</Text>`}
              </Text>
            </div>
          </div>

          <div>
            <Text variant="label" weight="medium" class="mb-3 block">UI Elements</Text>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="space-y-2">
                  <Text variant="caption" color="tertiary">Labels:</Text>
                  <ul class="space-y-1 text-sm">
                    <li>• Form labels</li>
                    <li>• UI descriptions</li>
                    <li>• Action text</li>
                  </ul>
                </div>
                <div class="space-y-2">
                  <Text variant="caption" color="tertiary">Captions:</Text>
                  <ul class="space-y-1 text-sm">
                    <li>• Image captions</li>
                    <li>• Metadata</li>
                    <li>• Timestamps</li>
                  </ul>
                </div>
                <div class="space-y-2">
                  <Text variant="caption" color="tertiary">Code:</Text>
                  <ul class="space-y-1 text-sm">
                    <li>• Inline code</li>
                    <li>• API endpoints</li>
                    <li>• File names</li>
                  </ul>
                </div>
              </div>
              <Text variant="code" class="block text-sm">
                {`<Text variant="label">Form Field Label</Text>
<Text variant="caption">Additional help text</Text>
<Text variant="code">npm install package-name</Text>`}
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Design */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl">
          Responsive Typography
        </Text>

        <div class="space-y-6">
          <div>
            <Text variant="label" weight="medium" class="mb-3 block">Mobile-First Approach</Text>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-3">
              <Text variant="body" color="secondary" class="block">
                Start with mobile sizes and scale up for larger screens:
              </Text>
              <Text variant="code" class="block text-sm">
                {`<Text 
  variant="body"
  responsiveSize={{
    base: "sm",    // Mobile: 14px
    md: "base",    // Tablet: 16px  
    lg: "lg"       // Desktop: 18px
  }}
>
  Responsive text content
</Text>`}
              </Text>
            </div>
          </div>

          <div>
            <Text variant="label" weight="medium" class="mb-3 block">Content Scaling Patterns</Text>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-3">
                  <Text variant="caption" color="tertiary">Conservative Scaling</Text>
                  <Text variant="code" class="text-xs">
                    {`responsiveSize={{
  base: "base",
  lg: "lg"
}}`}
                  </Text>
                  <Text variant="caption" color="secondary">
                    Subtle size increase for body text
                  </Text>
                </div>
                <div class="space-y-3">
                  <Text variant="caption" color="tertiary">Aggressive Scaling</Text>
                  <Text variant="code" class="text-xs">
                    {`responsiveSize={{
  base: "sm",
  md: "lg", 
  lg: "xl"
}}`}
                  </Text>
                  <Text variant="caption" color="secondary">
                    Significant scaling for emphasis
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color and Hierarchy */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl">
          Color Hierarchy & Accessibility
        </Text>

        <div class="space-y-6">
          <div>
            <Text variant="label" weight="medium" class="mb-3 block">Content Hierarchy</Text>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <div class="space-y-3">
                <Text variant="body" color="primary" weight="medium">Primary Content</Text>
                <Text variant="body" color="secondary">Secondary supporting information</Text>
                <Text variant="body" color="tertiary">Tertiary details and metadata</Text>
                <Text variant="body" color="subtle">Very subtle or inactive content</Text>
              </div>
              <Text variant="code" class="block text-sm">
                {`<Text color="primary">Main content (highest contrast)</Text>
<Text color="secondary">Supporting content</Text>
<Text color="tertiary">Metadata and details</Text>
<Text color="subtle">Inactive or very low priority</Text>`}
              </Text>
            </div>
          </div>

          <div>
            <Text variant="label" weight="medium" class="mb-3 block">Semantic Colors</Text>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <Text variant="body" color="success">✅ Success State</Text>
                  <Text variant="body" color="warning">⚠️ Warning State</Text>
                </div>
                <div class="space-y-2">
                  <Text variant="body" color="error">❌ Error State</Text>
                  <Text variant="body" color="info">ℹ️ Information State</Text>
                </div>
              </div>
              <Text variant="code" class="block text-sm">
                {`<Text color="success">Operation completed successfully</Text>
<Text color="warning">Please review before proceeding</Text>
<Text color="error">Unable to complete action</Text>
<Text color="info">Additional information available</Text>`}
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* Form Integration */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl">
          Form Integration
        </Text>

        <div class="space-y-6">
          <div>
            <Text variant="label" weight="medium" class="mb-3 block">Form Field Pattern</Text>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <div class="bg-white dark:bg-gray-800 p-4 rounded border space-y-3">
                <Text variant="label" weight="medium" as="label">
                  Email Address
                </Text>
                <div class="p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700">
                  <Text variant="body" color="tertiary">user@example.com</Text>
                </div>
                <Text variant="caption" color="secondary">
                  We'll never share your email with third parties
                </Text>
              </div>
              <Text variant="code" class="block text-sm">
                {`<Text variant="label" weight="medium" as="label">
  Email Address
</Text>
<input type="email" />
<Text variant="caption" color="secondary">
  We'll never share your email with third parties
</Text>`}
              </Text>
            </div>
          </div>

          <div>
            <Text variant="label" weight="medium" class="mb-3 block">Validation Messages</Text>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <div class="space-y-3">
                <div class="bg-success-50 dark:bg-success-900/20 p-3 rounded border border-success-200 dark:border-success-800">
                  <Text variant="caption" color="success" weight="medium">
                    ✅ Valid email format
                  </Text>
                </div>
                <div class="bg-error-50 dark:bg-error-900/20 p-3 rounded border border-error-200 dark:border-error-800">
                  <Text variant="caption" color="error" weight="medium">
                    ❌ Please enter a valid email address
                  </Text>
                </div>
              </div>
              <Text variant="code" class="block text-sm">
                {`<Text variant="caption" color="success" weight="medium">
  ✅ Valid email format
</Text>
<Text variant="caption" color="error" weight="medium">
  ❌ Please enter a valid email address
</Text>`}
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Elements */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl">
          Interactive Text Elements
        </Text>

        <div class="space-y-6">
          <div>
            <Text variant="label" weight="medium" class="mb-3 block">Clickable Text</Text>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <div class="space-y-3">
                <Text 
                  variant="body" 
                  color="accent"
                  onClick$={() => alert('Action triggered!')}
                >
                  Click me for action
                </Text>
                <Text 
                  variant="caption" 
                  color="secondary"
                  decoration="underline"
                  onClick$={() => console.log('More info clicked')}
                >
                  Learn more →
                </Text>
              </div>
              <Text variant="code" class="block text-sm">
                {`<Text 
  variant="body" 
  color="accent"
  onClick$={() => handleAction()}
>
  Click me for action
</Text>`}
              </Text>
            </div>
          </div>

          <div>
            <Text variant="label" weight="medium" class="mb-3 block">Link-Style Text</Text>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <div class="space-y-2">
                <Text variant="body" color="primary">
                  Read our{" "}
                  <Text 
                    variant="body" 
                    color="accent" 
                    decoration="underline"
                    as="span"
                    onClick$={() => alert('Privacy policy opened')}
                  >
                    privacy policy
                  </Text>
                  {" "}for more information.
                </Text>
              </div>
              <Text variant="code" class="block text-sm">
                {`<Text variant="body" color="primary">
  Read our{" "}
  <Text 
    variant="body" 
    color="accent" 
    decoration="underline"
    as="span"
    onClick$={() => openPrivacyPolicy()}
  >
    privacy policy
  </Text>
  {" "}for more information.
</Text>`}
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* Layout and Spacing */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl">
          Layout and Spacing
        </Text>

        <div class="space-y-6">
          <div>
            <Text variant="label" weight="medium" class="mb-3 block">Text Truncation</Text>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <div class="max-w-xs space-y-3">
                <div>
                  <Text variant="caption" color="tertiary" class="block mb-1">Single Line</Text>
                  <Text variant="body" truncate maxLines={1}>
                    This text will be truncated with ellipsis when it's too long
                  </Text>
                </div>
                <div>
                  <Text variant="caption" color="tertiary" class="block mb-1">Two Lines</Text>
                  <Text variant="body" truncate maxLines={2}>
                    This text will be truncated after two lines when the content exceeds the available space
                  </Text>
                </div>
              </div>
              <Text variant="code" class="block text-sm">
                {`<Text variant="body" truncate maxLines={1}>
  Single line truncation
</Text>
<Text variant="body" truncate maxLines={2}>
  Multi-line truncation
</Text>`}
              </Text>
            </div>
          </div>

          <div>
            <Text variant="label" weight="medium" class="mb-3 block">Text Alignment in Layouts</Text>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <div class="grid grid-cols-3 gap-4 text-center">
                <div class="bg-white dark:bg-gray-800 p-3 rounded">
                  <Text variant="body" align="left">Left aligned</Text>
                </div>
                <div class="bg-white dark:bg-gray-800 p-3 rounded">
                  <Text variant="body" align="center">Center aligned</Text>
                </div>
                <div class="bg-white dark:bg-gray-800 p-3 rounded">
                  <Text variant="body" align="right">Right aligned</Text>
                </div>
              </div>
              <Text variant="code" class="block text-sm">
                {`<Text variant="body" align="left">Left aligned</Text>
<Text variant="body" align="center">Center aligned</Text>  
<Text variant="body" align="right">Right aligned</Text>`}
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Considerations */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl">
          Performance Best Practices
        </Text>

        <div class="space-y-4">
          <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <Text variant="label" weight="medium" color="success" class="mb-3 block">
              ✅ Do This
            </Text>
            <ul class="space-y-2">
              <li class="flex items-start gap-2">
                <Text color="success" class="mt-0.5">•</Text>
                <Text variant="body">Use appropriate text variants for semantic meaning</Text>
              </li>
              <li class="flex items-start gap-2">
                <Text color="success" class="mt-0.5">•</Text>
                <Text variant="body">Implement responsive sizing for better mobile experience</Text>
              </li>
              <li class="flex items-start gap-2">
                <Text color="success" class="mt-0.5">•</Text>
                <Text variant="body">Use truncation for dynamic content in constrained layouts</Text>
              </li>
              <li class="flex items-start gap-2">
                <Text color="success" class="mt-0.5">•</Text>
                <Text variant="body">Choose color variants that provide sufficient contrast</Text>
              </li>
            </ul>
          </div>

          <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
            <Text variant="label" weight="medium" color="error" class="mb-3 block">
              ❌ Avoid This
            </Text>
            <ul class="space-y-2">
              <li class="flex items-start gap-2">
                <Text color="error" class="mt-0.5">•</Text>
                <Text variant="body">Using Text for headings instead of the Heading component</Text>
              </li>
              <li class="flex items-start gap-2">
                <Text color="error" class="mt-0.5">•</Text>
                <Text variant="body">Over-using interactive text elements without clear purpose</Text>
              </li>
              <li class="flex items-start gap-2">
                <Text color="error" class="mt-0.5">•</Text>
                <Text variant="body">Mixing too many font weights in the same content block</Text>
              </li>
              <li class="flex items-start gap-2">
                <Text color="error" class="mt-0.5">•</Text>
                <Text variant="body">Using subtle colors for primary content (accessibility issue)</Text>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Common Patterns */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl">
          Common Implementation Patterns
        </Text>

        <div class="space-y-6">
          <div>
            <Text variant="label" weight="medium" class="mb-3 block">Card Content</Text>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-3">
                <Text variant="body" weight="semibold" size="lg">Card Title</Text>
                <Text variant="paragraph" color="secondary">
                  Card description with supporting information about the content.
                </Text>
                <Text variant="caption" color="tertiary">
                  Last updated 2 hours ago
                </Text>
              </div>
            </div>
          </div>

          <div>
            <Text variant="label" weight="medium" class="mb-3 block">Status Messages</Text>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-3">
              <div class="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded p-4">
                <Text variant="body" color="success" weight="medium">
                  ✅ Your settings have been saved successfully.
                </Text>
              </div>
              <div class="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 rounded p-4">
                <Text variant="body" color="warning" weight="medium">
                  ⚠️ Some features may not work correctly.
                </Text>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});