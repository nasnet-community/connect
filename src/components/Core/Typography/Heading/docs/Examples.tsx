import { component$ } from "@builder.io/qwik";
import { Heading } from "../Heading";

/**
 * Examples showcase for the Heading component
 * 
 * Interactive examples demonstrating various use cases and configurations
 */
export const Examples = component$(() => {
  return (
    <div class="space-y-12 p-6">
      {/* Header */}
      <section class="space-y-4">
        <Heading level={1} class="text-3xl md:text-4xl">
          Heading Examples
        </Heading>
        
        <p class="text-base text-gray-700 dark:text-gray-300">
          Explore different configurations and use cases for the Heading component.
        </p>
      </section>

      {/* Heading Levels */}
      <section class="space-y-4">
        <Heading level={2} class="text-2xl md:text-3xl mb-4">
          Heading Levels
        </Heading>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
          <Heading level={1}>Heading Level 1 (h1)</Heading>
          <Heading level={2}>Heading Level 2 (h2)</Heading>
          <Heading level={3}>Heading Level 3 (h3)</Heading>
          <Heading level={4}>Heading Level 4 (h4)</Heading>
          <Heading level={5}>Heading Level 5 (h5)</Heading>
          <Heading level={6}>Heading Level 6 (h6)</Heading>
        </div>

        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <p class="text-sm text-blue-700 dark:text-blue-300">
            <strong>Note:</strong> Each level has appropriate default sizing following a typographic scale.
          </p>
        </div>
      </section>

      {/* Font Weights */}
      <section class="space-y-4">
        <Heading level={2} class="text-2xl md:text-3xl mb-4">
          Font Weights
        </Heading>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
          <Heading level={3} weight="light">Light Weight (300)</Heading>
          <Heading level={3} weight="normal">Normal Weight (400)</Heading>
          <Heading level={3} weight="medium">Medium Weight (500)</Heading>
          <Heading level={3} weight="semibold">Semibold Weight (600) - Default</Heading>
          <Heading level={3} weight="bold">Bold Weight (700)</Heading>
          <Heading level={3} weight="extrabold">Extrabold Weight (800)</Heading>
        </div>
      </section>

      {/* Color Variants */}
      <section class="space-y-4">
        <Heading level={2} class="text-2xl md:text-3xl mb-4">
          Color Variants
        </Heading>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
          <Heading level={3} color="primary">Primary Color (Default)</Heading>
          <Heading level={3} color="secondary">Secondary Color</Heading>
          <Heading level={3} color="tertiary">Tertiary Color</Heading>
          <Heading level={3} color="accent">Accent Color</Heading>
          <Heading level={3} color="success">Success Color</Heading>
          <Heading level={3} color="warning">Warning Color</Heading>
          <Heading level={3} color="error">Error Color</Heading>
          <Heading level={3} color="info">Info Color</Heading>
          
          <div class="bg-gray-800 dark:bg-gray-200 p-4 rounded">
            <Heading level={3} color="inverse">Inverse Color (for dark backgrounds)</Heading>
          </div>
        </div>
      </section>

      {/* Text Alignment */}
      <section class="space-y-4">
        <Heading level={2} class="text-2xl md:text-3xl mb-4">
          Text Alignment
        </Heading>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
          <div class="border-l-4 border-gray-300 dark:border-gray-600 pl-4">
            <Heading level={3} align="left">Left Aligned (Default)</Heading>
          </div>
          
          <div class="border-r-4 border-l-4 border-gray-300 dark:border-gray-600 px-4">
            <Heading level={3} align="center">Center Aligned</Heading>
          </div>
          
          <div class="border-r-4 border-gray-300 dark:border-gray-600 pr-4">
            <Heading level={3} align="right">Right Aligned</Heading>
          </div>
        </div>
      </section>

      {/* Responsive Sizing */}
      <section class="space-y-4">
        <Heading level={2} class="text-2xl md:text-3xl mb-4">
          Responsive Sizing
        </Heading>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-6">
          <div>
            <Heading 
              responsiveSize={{
                base: 4,  // h4 on mobile
                md: 2,    // h2 on tablet
                lg: 1     // h1 on desktop
              }}
              weight="bold"
            >
              Responsive Heading (Resize Window)
            </Heading>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Mobile: h4 → Tablet: h2 → Desktop: h1
            </p>
          </div>

          <div>
            <Heading 
              responsiveSize={{
                base: 6,
                sm: 5,
                md: 4,
                lg: 3,
                xl: 2
              }}
              color="accent"
            >
              Full Responsive Range
            </Heading>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Adapts across all breakpoints
            </p>
          </div>
        </div>
      </section>

      {/* Text Truncation */}
      <section class="space-y-4">
        <Heading level={2} class="text-2xl md:text-3xl mb-4">
          Text Truncation
        </Heading>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-6">
          <div class="max-w-md">
            <Heading level={3} truncate>
              This is a very long heading that will be truncated with an ellipsis when it exceeds the container width
            </Heading>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Single line truncation
            </p>
          </div>

          <div class="max-w-md">
            <Heading level={3} truncate maxLines={2}>
              This is a very long heading that will be truncated after two lines. It demonstrates how multi-line truncation works with the line-clamp utility. The text will show an ellipsis after the second line.
            </Heading>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Multi-line truncation (2 lines)
            </p>
          </div>
        </div>
      </section>

      {/* Semantic vs Visual */}
      <section class="space-y-4">
        <Heading level={2} class="text-2xl md:text-3xl mb-4">
          Semantic vs Visual Styling
        </Heading>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-6">
          <div>
            <Heading level={2} as="h1">
              Visually h2, Semantically h1
            </Heading>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Uses h1 tag but styled as h2 (useful for design consistency)
            </p>
          </div>

          <div>
            <Heading level={4} as="h2" color="accent">
              Visually h4, Semantically h2
            </Heading>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Uses h2 tag but styled as h4 (maintains document outline)
            </p>
          </div>

          <div>
            <Heading level={1} as="div" weight="light">
              Visually h1, Semantically div
            </Heading>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Uses div tag but styled as h1 (for non-heading content)
            </p>
          </div>
        </div>
      </section>

      {/* Combined Examples */}
      <section class="space-y-4">
        <Heading level={2} class="text-2xl md:text-3xl mb-4">
          Real-World Examples
        </Heading>
        
        <div class="space-y-6">
          {/* Card Header */}
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <Heading level={3} weight="bold" color="primary" truncate>
              {"Card Title with Icon 🎯"}
            </Heading>
            <p class="text-gray-600 dark:text-gray-400 mt-2">
              Example of a card header with emoji and truncation
            </p>
          </div>

          {/* Section Header */}
          <div class="border-b border-gray-200 dark:border-gray-700 pb-4">
            <Heading 
              level={2} 
              weight="semibold"
              responsiveSize={{ base: 3, md: 2 }}
              class="flex items-center gap-2"
            >
              {"▸ Section Header with Accent"}
            </Heading>
          </div>

          {/* Error Message */}
          <div class="bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg p-4">
            <Heading level={4} color="error" weight="medium">
              {"⚠️ Error: Action Required"}
            </Heading>
          </div>

          {/* Success Banner */}
          <div class="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg p-4">
            <Heading level={4} color="success" weight="medium" align="center">
              {"✅ Operation Completed Successfully"}
            </Heading>
          </div>
        </div>
      </section>
    </div>
  );
});