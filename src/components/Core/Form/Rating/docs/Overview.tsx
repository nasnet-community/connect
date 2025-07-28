import { component$ } from "@builder.io/qwik";

/**
 * Rating Component Overview
 * 
 * A comprehensive rating component that allows users to provide feedback
 * using star ratings with extensive customization and accessibility features.
 */

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h1 class="mb-4 text-3xl font-bold text-text-default dark:text-text-dark-default">
          Rating Component
        </h1>
        <p class="text-lg text-text-secondary dark:text-text-dark-secondary">
          A flexible and accessible rating component that allows users to select numeric values 
          using stars or custom icons with support for half-star precision, keyboard navigation, 
          and comprehensive form integration.
        </p>
      </div>

      {/* Key Features */}
      <div>
        <h2 class="mb-4 text-2xl font-semibold text-text-default dark:text-text-dark-default">
          Key Features
        </h2>
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              Rating Precision
            </h3>
            <ul class="space-y-2 text-text-secondary dark:text-text-dark-secondary">
              <li class="flex items-start space-x-2">
                <span class="text-primary-600 dark:text-primary-400">•</span>
                <span>Full star ratings (1, 2, 3, 4, 5)</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-primary-600 dark:text-primary-400">•</span>
                <span>Half-star precision (0.5, 1.5, 2.5, etc.)</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-primary-600 dark:text-primary-400">•</span>
                <span>Customizable maximum rating values</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-primary-600 dark:text-primary-400">•</span>
                <span>Optional clear functionality</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              Customization
            </h3>
            <ul class="space-y-2 text-text-secondary dark:text-text-dark-secondary">
              <li class="flex items-start space-x-2">
                <span class="text-primary-600 dark:text-primary-400">•</span>
                <span>Custom icons (hearts, thumbs, any SVG)</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-primary-600 dark:text-primary-400">•</span>
                <span>Multiple size variants (sm, md, lg)</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-primary-600 dark:text-primary-400">•</span>
                <span>Custom text labels for each rating</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-primary-600 dark:text-primary-400">•</span>
                <span>Configurable hover and focus states</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              Accessibility
            </h3>
            <ul class="space-y-2 text-text-secondary dark:text-text-dark-secondary">
              <li class="flex items-start space-x-2">
                <span class="text-primary-600 dark:text-primary-400">•</span>
                <span>Full keyboard navigation support</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-primary-600 dark:text-primary-400">•</span>
                <span>ARIA slider pattern implementation</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-primary-600 dark:text-primary-400">•</span>
                <span>Screen reader announcements</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-primary-600 dark:text-primary-400">•</span>
                <span>Focus management and indicators</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              Form Integration
            </h3>
            <ul class="space-y-2 text-text-secondary dark:text-text-dark-secondary">
              <li class="flex items-start space-x-2">
                <span class="text-primary-600 dark:text-primary-400">•</span>
                <span>Controlled and uncontrolled modes</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-primary-600 dark:text-primary-400">•</span>
                <span>Validation states and error messages</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-primary-600 dark:text-primary-400">•</span>
                <span>Hidden input for form submissions</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-primary-600 dark:text-primary-400">•</span>
                <span>Required field validation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div>
        <h2 class="mb-4 text-2xl font-semibold text-text-default dark:text-text-dark-default">
          Common Use Cases
        </h2>
        <div class="grid gap-4 md:grid-cols-3">
          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
            <h3 class="mb-2 text-lg font-medium text-text-default dark:text-text-dark-default">
              Product Reviews
            </h3>
            <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
              Customer feedback and product ratings in e-commerce applications with detailed review systems.
            </p>
          </div>

          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
            <h3 class="mb-2 text-lg font-medium text-text-default dark:text-text-dark-default">
              Service Feedback
            </h3>
            <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
              User satisfaction surveys and service quality ratings for restaurants, hotels, and services.
            </p>
          </div>

          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
            <h3 class="mb-2 text-lg font-medium text-text-default dark:text-text-dark-default">
              Content Rating
            </h3>
            <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
              Article ratings, video likes, content quality assessment, and user preference collection.
            </p>
          </div>

          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
            <h3 class="mb-2 text-lg font-medium text-text-default dark:text-text-dark-default">
              Skill Assessment
            </h3>
            <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
              Self-assessment forms, competency ratings, and skill level evaluations in educational platforms.
            </p>
          </div>

          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
            <h3 class="mb-2 text-lg font-medium text-text-default dark:text-text-dark-default">
              Difficulty Levels
            </h3>
            <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
              Game difficulty selection, exercise intensity levels, and complexity indicators.
            </p>
          </div>

          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
            <h3 class="mb-2 text-lg font-medium text-text-default dark:text-text-dark-default">
              Priority Setting
            </h3>
            <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
              Task prioritization, importance rankings, and urgency level selection in productivity apps.
            </p>
          </div>
        </div>
      </div>

      {/* Design Principles */}
      <div>
        <h2 class="mb-4 text-2xl font-semibold text-text-default dark:text-text-dark-default">
          Design Principles
        </h2>
        <div class="space-y-4">
          <div class="rounded-lg border border-info-200 dark:border-info-800 bg-info-50 dark:bg-info-950 p-4">
            <h3 class="mb-2 text-lg font-medium text-info-800 dark:text-info-200">
              Intuitive Interaction
            </h3>
            <p class="text-info-700 dark:text-info-300">
              The rating component follows familiar star rating patterns that users understand immediately, 
              with clear visual feedback for hover, focus, and selection states.
            </p>
          </div>

          <div class="rounded-lg border border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-950 p-4">
            <h3 class="mb-2 text-lg font-medium text-success-800 dark:text-success-200">
              Accessibility First
            </h3>
            <p class="text-success-700 dark:text-success-300">
              Built with screen readers and keyboard navigation in mind, ensuring all users can 
              interact with ratings regardless of their input method or assistive technology.
            </p>
          </div>

          <div class="rounded-lg border border-warning-200 dark:border-warning-800 bg-warning-50 dark:bg-warning-950 p-4">
            <h3 class="mb-2 text-lg font-medium text-warning-800 dark:text-warning-200">
              Flexible Customization
            </h3>
            <p class="text-warning-700 dark:text-warning-300">
              Supports various rating scales, custom icons, and visual styles while maintaining 
              consistent behavior and accessibility standards across all configurations.
            </p>
          </div>
        </div>
      </div>

      {/* Browser Support */}
      <div>
        <h2 class="mb-4 text-2xl font-semibold text-text-default dark:text-text-dark-default">
          Browser Support
        </h2>
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
          <p class="mb-3 text-text-secondary dark:text-text-dark-secondary">
            The Rating component is compatible with all modern browsers and provides graceful degradation:
          </p>
          <ul class="grid gap-2 md:grid-cols-2 text-sm text-text-secondary dark:text-text-dark-secondary">
            <li>• Chrome 90+ (full feature support)</li>
            <li>• Firefox 88+ (full feature support)</li>
            <li>• Safari 14+ (full feature support)</li>
            <li>• Edge 90+ (full feature support)</li>
            <li>• iOS Safari 14+ (touch optimized)</li>
            <li>• Chrome Mobile 90+ (touch optimized)</li>
          </ul>
        </div>
      </div>

      {/* Performance */}
      <div>
        <h2 class="mb-4 text-2xl font-semibold text-text-default dark:text-text-dark-default">
          Performance Characteristics
        </h2>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
            <h3 class="mb-2 text-lg font-medium text-text-default dark:text-text-dark-default">
              Optimized Rendering
            </h3>
            <ul class="space-y-1 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• Minimal DOM updates during interactions</li>
              <li>• Efficient event handling with delegation</li>
              <li>• Smooth animations with CSS transitions</li>
              <li>• Lazy rendering for large rating scales</li>
            </ul>
          </div>

          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
            <h3 class="mb-2 text-lg font-medium text-text-default dark:text-text-dark-default">
              Bundle Impact
            </h3>
            <ul class="space-y-1 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• Lightweight component (~3KB gzipped)</li>
              <li>• No external dependencies</li>
              <li>• Tree-shakeable exports</li>
              <li>• Optimized for code splitting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});