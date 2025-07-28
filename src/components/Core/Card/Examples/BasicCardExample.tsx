import { component$ } from "@builder.io/qwik";
import { Card } from "../Card";

/**
 * BasicCardExample - Demonstrates simple card usage with basic content
 *
 * This example shows:
 * - Basic card with default styling
 * - Simple text content
 * - Minimal configuration
 */
export const BasicCardExample = component$(() => {
  return (
    <div class="space-y-6 p-4">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Basic Card Examples
      </h2>

      {/* Simple card with text content */}
      <Card>
        <h3 class="mb-2 text-lg font-semibold">Welcome to Our Platform</h3>
        <p class="text-gray-600 dark:text-gray-400">
          This is a basic card component with simple text content. Cards are
          versatile containers that can hold various types of content while
          maintaining a consistent visual style.
        </p>
      </Card>

      {/* Card with header */}
      <Card hasHeader>
        <div q:slot="header">
          <h3 class="text-lg font-semibold">Card with Header</h3>
        </div>
        <p class="text-gray-600 dark:text-gray-400">
          This card includes a header section that's visually separated from the
          main content. Headers are perfect for titles or important metadata.
        </p>
      </Card>

      {/* Card with footer */}
      <Card hasFooter>
        <div class="mb-4">
          <h3 class="mb-2 text-lg font-semibold">Latest Update</h3>
          <p class="text-gray-600 dark:text-gray-400">
            We've released new features to improve your experience. Check out
            the documentation for more details on how to use these enhancements.
          </p>
        </div>
        <div q:slot="footer">
          <span class="text-sm text-gray-500 dark:text-gray-400">
            Published on {new Date().toLocaleDateString()}
          </span>
        </div>
      </Card>

      {/* Card with header, footer and actions */}
      <Card hasHeader hasFooter hasActions>
        <div q:slot="header">
          <h3 class="text-lg font-semibold">Complete Card Example</h3>
        </div>

        <div class="space-y-3">
          <p class="text-gray-600 dark:text-gray-400">
            This demonstrates a card with all available slots: header, content,
            footer, and actions.
          </p>
          <ul class="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-400">
            <li>Header for titles and metadata</li>
            <li>Main content area for primary information</li>
            <li>Footer for supplementary details</li>
            <li>Actions for interactive elements</li>
          </ul>
        </div>

        <div q:slot="footer">
          <span class="text-sm text-gray-500 dark:text-gray-400">
            Last modified: 2 hours ago
          </span>
        </div>

        <div q:slot="actions">
          <button class="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            Edit
          </button>
          <button class="text-sm text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            Share
          </button>
        </div>
      </Card>

      {/* Card with custom spacing using noPadding */}
      <Card noPadding>
        <div class="bg-gradient-to-r from-primary-50 to-primary-100 p-8 dark:from-primary-900 dark:to-primary-800">
          <h3 class="mb-2 text-lg font-semibold">Custom Padding Example</h3>
          <p class="text-gray-700 dark:text-gray-300">
            Using the noPadding prop allows for custom spacing and full-width
            content like gradients.
          </p>
        </div>
      </Card>
    </div>
  );
});
