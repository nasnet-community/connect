import { component$ } from "@builder.io/qwik";
import { Heading } from "../Heading";

/**
 * Color Variants Example - Demonstrates different color options and use cases
 */
export const ColorVariantsExample = component$(() => {
  return (
    <div class="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div class="space-y-4">
        <Heading level={2}>Color Variants</Heading>
        
        <p class="text-gray-600 dark:text-gray-400">
          Different color variants for various contexts and semantic meaning.
        </p>
      </div>

      {/* Primary Colors */}
      <div class="space-y-4">
        <Heading level={3} class="text-lg">Primary Colors</Heading>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 border border-gray-200 dark:border-gray-700 rounded">
            <Heading level={4} color="primary" weight="semibold">
              Primary Heading
            </Heading>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Default color for main headings
            </p>
          </div>

          <div class="p-4 border border-gray-200 dark:border-gray-700 rounded">
            <Heading level={4} color="secondary" weight="semibold">
              Secondary Heading
            </Heading>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Less prominent, supporting headings
            </p>
          </div>

          <div class="p-4 border border-gray-200 dark:border-gray-700 rounded">
            <Heading level={4} color="tertiary" weight="semibold">
              Tertiary Heading
            </Heading>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Subtle headings for minimal emphasis
            </p>
          </div>

          <div class="p-4 border border-gray-200 dark:border-gray-700 rounded">
            <Heading level={4} color="accent" weight="semibold">
              Accent Heading
            </Heading>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Brand color for special emphasis
            </p>
          </div>
        </div>
      </div>

      {/* Status Colors */}
      <div class="space-y-4">
        <Heading level={3} class="text-lg">Status Colors</Heading>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded">
            <Heading level={4} color="success" weight="semibold">
              ✅ Success Message
            </Heading>
            <p class="text-sm text-success-700 dark:text-success-300 mt-1">
              Operation completed successfully
            </p>
          </div>

          <div class="p-4 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded">
            <Heading level={4} color="error" weight="semibold">
              ❌ Error Alert
            </Heading>
            <p class="text-sm text-error-700 dark:text-error-300 mt-1">
              Something went wrong
            </p>
          </div>

          <div class="p-4 bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 rounded">
            <Heading level={4} color="warning" weight="semibold">
              ⚠️ Warning Notice
            </Heading>
            <p class="text-sm text-warning-700 dark:text-warning-300 mt-1">
              Please review this action
            </p>
          </div>

          <div class="p-4 bg-info-50 dark:bg-info-900/20 border border-info-200 dark:border-info-800 rounded">
            <Heading level={4} color="info" weight="semibold">
              ℹ️ Information
            </Heading>
            <p class="text-sm text-info-700 dark:text-info-300 mt-1">
              Here's something you should know
            </p>
          </div>
        </div>
      </div>

      {/* Dark Backgrounds */}
      <div class="space-y-4">
        <Heading level={3} class="text-lg">Inverse Colors</Heading>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-6 bg-gray-900 dark:bg-gray-100 rounded">
            <Heading level={4} color="inverse" weight="bold">
              Inverse Color
            </Heading>
            <p class="text-gray-300 dark:text-gray-700 text-sm mt-1">
              Perfect for dark backgrounds
            </p>
          </div>

          <div class="p-6 bg-primary-600 rounded">
            <Heading level={4} color="inverse" weight="bold">
              On Brand Background
            </Heading>
            <p class="text-primary-100 text-sm mt-1">
              High contrast on colored backgrounds
            </p>
          </div>
        </div>
      </div>

      {/* Real-world Examples */}
      <div class="space-y-4">
        <Heading level={3} class="text-lg">Real-world Use Cases</Heading>
        
        <div class="space-y-4">
          {/* Dashboard Card */}
          <div class="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
            <div class="flex items-center justify-between">
              <Heading level={5} color="secondary" weight="medium">
                Dashboard Widget
              </Heading>
              <span class="text-xs text-gray-500">Last updated</span>
            </div>
            <Heading level={3} color="primary" weight="bold" class="mt-2">
              $12,345
            </Heading>
          </div>

          {/* Alert Banner */}
          <div class="p-4 bg-warning-50 dark:bg-warning-900/20 border-l-4 border-warning-500 rounded">
            <Heading level={4} color="warning" weight="semibold">
              Maintenance Notice
            </Heading>
            <p class="text-warning-700 dark:text-warning-300 text-sm mt-1">
              System will be down for maintenance on Sunday
            </p>
          </div>

          {/* Feature Highlight */}
          <div class="p-6 bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-lg">
            <Heading level={3} color="accent" weight="bold" align="center">
              🚀 New Feature Available
            </Heading>
            <p class="text-center text-gray-700 dark:text-gray-300 mt-2">
              Check out our latest enhancement
            </p>
          </div>
        </div>
      </div>

      <div class="mt-6 p-4 bg-gray-100 dark:bg-gray-900 rounded">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          <strong>🎨 Design Tip:</strong> Use semantic colors to convey meaning and status. All colors are designed to work in both light and dark themes.
        </p>
      </div>
    </div>
  );
});

export default ColorVariantsExample;