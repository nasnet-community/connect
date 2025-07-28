import { component$ } from "@builder.io/qwik";
import { Heading } from "../Heading";

/**
 * Truncation Example - Demonstrates text truncation options
 */
export const TruncationExample = component$(() => {
  const longTitle = "This is an extremely long heading that would normally wrap to multiple lines and potentially break the layout of cards, sidebars, or other constrained containers";
  const _mediumTitle = "This is a moderately long heading that demonstrates multi-line truncation";

  return (
    <div class="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div class="space-y-4">
        <Heading level={2}>Text Truncation Examples</Heading>
        
        <p class="text-gray-600 dark:text-gray-400">
          Control how long headings behave in constrained spaces with truncation options.
        </p>
      </div>

      {/* Single Line Truncation */}
      <div class="space-y-4">
        <Heading level={3} class="text-lg">Single Line Truncation</Heading>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Without Truncation */}
          <div class="p-4 border border-gray-200 dark:border-gray-700 rounded">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Without truncation:</p>
            <div class="max-w-xs">
              <Heading level={4} weight="semibold">
                {longTitle}
              </Heading>
            </div>
          </div>

          {/* With Truncation */}
          <div class="p-4 border border-gray-200 dark:border-gray-700 rounded">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">With single-line truncation:</p>
            <div class="max-w-xs">
              <Heading level={4} weight="semibold" truncate>
                {longTitle}
              </Heading>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-line Truncation */}
      <div class="space-y-4">
        <Heading level={3} class="text-lg">Multi-line Truncation</Heading>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 border border-gray-200 dark:border-gray-700 rounded">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">2 lines max:</p>
            <div class="max-w-xs">
              <Heading level={4} weight="semibold" truncate maxLines={2}>
                {longTitle}
              </Heading>
            </div>
          </div>

          <div class="p-4 border border-gray-200 dark:border-gray-700 rounded">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">3 lines max:</p>
            <div class="max-w-xs">
              <Heading level={4} weight="semibold" truncate maxLines={3}>
                {longTitle}
              </Heading>
            </div>
          </div>

          <div class="p-4 border border-gray-200 dark:border-gray-700 rounded">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">4 lines max:</p>
            <div class="max-w-xs">
              <Heading level={4} weight="semibold" truncate maxLines={4}>
                {longTitle}
              </Heading>
            </div>
          </div>
        </div>
      </div>

      {/* Card Examples */}
      <div class="space-y-4">
        <Heading level={3} class="text-lg">Real-world Card Examples</Heading>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Blog Card */}
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
            <div class="h-32 bg-gradient-to-br from-primary-400 to-secondary-400"></div>
            <div class="p-4">
              <Heading level={4} weight="semibold" truncate maxLines={2} class="mb-2">
                The Complete Guide to Building Scalable Applications with Modern Technologies and Best Practices
              </Heading>
              <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                Learn how to build applications that can handle millions of users...
              </p>
              <div class="mt-3 flex items-center gap-2 text-xs text-gray-500">
                <span>5 min read</span>
                <span>•</span>
                <span>Tech</span>
              </div>
            </div>
          </div>

          {/* Product Card */}
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
            <div class="h-32 bg-gradient-to-br from-success-400 to-info-400"></div>
            <div class="p-4">
              <Heading level={4} weight="semibold" truncate class="mb-2">
                Ultra Professional Wireless Noise-Cancelling Headphones with Premium Sound Quality
              </Heading>
              <Heading level={5} color="primary" weight="bold" class="mb-2">
                $299.99
              </Heading>
              <div class="flex items-center gap-1 text-xs text-yellow-500">
                ★★★★★ <span class="text-gray-500">(128 reviews)</span>
              </div>
            </div>
          </div>

          {/* User Card */}
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
            <div class="p-4">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-12 h-12 bg-gradient-to-br from-accent-400 to-primary-400 rounded-full"></div>
                <div class="flex-1 min-w-0">
                  <Heading level={5} weight="semibold" truncate>
                    Dr. Alexandra Thompson-Williams PhD
                  </Heading>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Senior Software Engineer</p>
                </div>
              </div>
              <Heading level={6} color="secondary" truncate maxLines={2} class="mb-2">
                "Building the future of technology through innovative solutions and collaborative teamwork"
              </Heading>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Examples */}
      <div class="space-y-4">
        <Heading level={3} class="text-lg">Mobile-Optimized Examples</Heading>
        
        <div class="space-y-3">
          {/* Navigation Item */}
          <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded">
            <div class="flex-1 min-w-0 mr-3">
              <Heading level={6} weight="medium" truncate>
                Advanced Configuration Settings and Preferences Management
              </Heading>
            </div>
            <span class="text-gray-400">→</span>
          </div>

          {/* Notification */}
          <div class="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
            <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div class="flex-1 min-w-0">
              <Heading level={6} weight="semibold" truncate maxLines={2}>
                System maintenance scheduled for tonight: Expect temporary service interruptions
              </Heading>
              <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">2 hours ago</p>
            </div>
          </div>

          {/* Chat Message */}
          <div class="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded">
            <div class="w-8 h-8 bg-green-500 rounded-full flex-shrink-0"></div>
            <div class="flex-1 min-w-0">
              <Heading level={6} weight="medium" truncate>
                Sarah Johnson shared a very important document that requires your immediate attention
              </Heading>
              <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Just now</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded">
        <p class="text-sm text-yellow-700 dark:text-yellow-300">
          <strong>⚡ Performance Tip:</strong> Use truncation in lists, cards, and mobile interfaces to maintain consistent layouts and improve scanning.
        </p>
      </div>
    </div>
  );
});

export default TruncationExample;