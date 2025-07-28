import { component$ } from "@builder.io/qwik";

export const Overview = component$(() => {
  return (
    <div class="space-y-6">
      <section>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">
          Modal Component
        </h1>
        <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          The Modal component is a versatile dialog overlay that displays content above the page,
          requiring user interaction before returning to the main content. Built on the native HTML
          <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">&lt;dialog&gt;</code>
          element for superior accessibility and keyboard navigation.
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          Key Features
        </h2>
        <ul class="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
          <li>
            <strong>Accessible by Design:</strong> Built on native dialog element with full ARIA support and focus management
          </li>
          <li>
            <strong>Mobile Optimized:</strong> Fullscreen mode on mobile devices with automatic safe area handling
          </li>
          <li>
            <strong>Theme Support:</strong> Full light and dark mode support using semantic design system tokens
          </li>
          <li>
            <strong>Flexible Sizing:</strong> Five size variants from small to fullscreen with responsive behavior
          </li>
          <li>
            <strong>Motion Accessibility:</strong> Respects user's reduced motion preferences automatically
          </li>
          <li>
            <strong>Focus Management:</strong> Enhanced focus trapping with customizable initial focus targets
          </li>
          <li>
            <strong>Touch Friendly:</strong> All interactive elements meet accessibility touch target requirements
          </li>
          <li>
            <strong>Responsive Design:</strong> Adapts seamlessly across all device sizes with smart breakpoints
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          When to Use
        </h2>
        <div class="space-y-3 text-gray-700 dark:text-gray-300">
          <p>Use the Modal component when you need to:</p>
          <ul class="space-y-1 list-disc list-inside ml-4">
            <li>Display important information that requires user acknowledgment</li>
            <li>Show forms that need focused user attention</li>
            <li>Present confirmation dialogs for critical actions</li>
            <li>Display media content in an overlay</li>
            <li>Create wizards or multi-step processes</li>
          </ul>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          Design Principles
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 border border-border-DEFAULT dark:border-border-dark rounded-lg">
            <h3 class="font-semibold text-gray-900 dark:text-gray-50 mb-2">
              Accessibility First
            </h3>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Every interaction is keyboard navigable with proper focus management and ARIA attributes.
            </p>
          </div>
          <div class="p-4 border border-border-DEFAULT dark:border-border-dark rounded-lg">
            <h3 class="font-semibold text-gray-900 dark:text-gray-50 mb-2">
              Mobile Experience
            </h3>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Optimized for touch with fullscreen support and safe area considerations.
            </p>
          </div>
          <div class="p-4 border border-border-DEFAULT dark:border-border-dark rounded-lg">
            <h3 class="font-semibold text-gray-900 dark:text-gray-50 mb-2">
              Performance
            </h3>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Minimal DOM manipulation with efficient animation and transition handling.
            </p>
          </div>
          <div class="p-4 border border-border-DEFAULT dark:border-border-dark rounded-lg">
            <h3 class="font-semibold text-gray-900 dark:text-gray-50 mb-2">
              Flexibility
            </h3>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Highly customizable with multiple variants and configuration options.
            </p>
          </div>
        </div>
      </section>

      <section class="bg-info-50 dark:bg-info-900/20 p-4 rounded-lg">
        <h3 class="font-semibold text-info-900 dark:text-info-200 mb-2">
          Migration Note
        </h3>
        <p class="text-sm text-info-800 dark:text-info-300">
          This Modal component has been enhanced with all the features previously available only in the Dialog component.
          It now includes improved accessibility, mobile optimization, and theme support while maintaining backward
          compatibility with existing implementations.
        </p>
      </section>
    </div>
  );
});