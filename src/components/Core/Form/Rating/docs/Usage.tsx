import { component$ } from "@builder.io/qwik";

/**
 * Rating Component Usage Guidelines
 * 
 * Best practices, accessibility guidelines, and usage patterns
 * for the Rating component.
 */

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h1 class="mb-4 text-3xl font-bold text-text-default dark:text-text-dark-default">
          Usage Guidelines
        </h1>
        <p class="text-lg text-text-secondary dark:text-text-dark-secondary">
          Best practices and guidelines for implementing the Rating component effectively 
          and accessibly in your applications.
        </p>
      </div>

      {/* Basic Usage */}
      <div>
        <h2 class="mb-4 text-2xl font-semibold text-text-default dark:text-text-dark-default">
          Basic Usage
        </h2>
        <div class="space-y-6">
          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              Controlled Component
            </h3>
            <p class="mb-4 text-text-secondary dark:text-text-dark-secondary">
              Use controlled mode when you need to manage the rating state externally or integrate with forms.
            </p>
            <div class="rounded-lg bg-gray-900 p-4">
              <pre class="text-sm text-gray-100 overflow-x-auto">
                <code>{`import { component$, useSignal } from "@builder.io/qwik";
import { Rating } from "~/components/Core/Form/Rating";

export default component$(() => {
  const rating = useSignal(3);

  return (
    <Rating
      value={rating.value}
      onValueChange$={(value) => {
        rating.value = value || 0;
        console.log("Rating changed to:", value);
      }}
      label="Product Rating"
      helperText="Rate this product from 1 to 5 stars"
    />
  );
});`}</code>
              </pre>
            </div>
          </div>

          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              Uncontrolled Component
            </h3>
            <p class="mb-4 text-text-secondary dark:text-text-dark-secondary">
              Use uncontrolled mode for simple cases where you only need to handle the final value.
            </p>
            <div class="rounded-lg bg-gray-900 p-4">
              <pre class="text-sm text-gray-100 overflow-x-auto">
                <code>{`<Rating
  defaultValue={0}
  onChange$={(event, value) => {
    // Handle form submission or final value
    submitRating(value);
  }}
  label="Service Rating"
  name="service_rating"
/>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div>
        <h2 class="mb-4 text-2xl font-semibold text-text-default dark:text-text-dark-default">
          Best Practices
        </h2>
        <div class="grid gap-6 md:grid-cols-2">
          <div class="space-y-4">
            <div class="rounded-lg border border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-950 p-4">
              <h3 class="mb-2 text-lg font-medium text-success-800 dark:text-success-200">
                ✓ Do's
              </h3>
              <ul class="space-y-2 text-sm text-success-700 dark:text-success-300">
                <li>• Always provide a clear label describing what is being rated</li>
                <li>• Use consistent rating scales across your application</li>
                <li>• Provide helper text to explain the rating scale</li>
                <li>• Consider using custom labels for better context</li>
                <li>• Use half-star precision for more granular feedback</li>
                <li>• Include keyboard navigation for accessibility</li>
                <li>• Show validation errors clearly and immediately</li>
                <li>• Use appropriate size for the context (mobile vs desktop)</li>
              </ul>
            </div>
          </div>

          <div class="space-y-4">
            <div class="rounded-lg border border-error-200 dark:border-error-800 bg-error-50 dark:bg-error-950 p-4">
              <h3 class="mb-2 text-lg font-medium text-error-800 dark:text-error-200">
                ✗ Don'ts
              </h3>
              <ul class="space-y-2 text-sm text-error-700 dark:text-error-300">
                <li>• Don't use ratings without clear context or labels</li>
                <li>• Don't mix different rating scales in the same interface</li>
                <li>• Don't make ratings required without good reason</li>
                <li>• Don't use too many rating levels (more than 10)</li>
                <li>• Don't ignore keyboard and screen reader accessibility</li>
                <li>• Don't use ratings for binary choices (use toggle instead)</li>
                <li>• Don't auto-submit forms on rating change</li>
                <li>• Don't use custom icons that are unclear or confusing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility Guidelines */}
      <div>
        <h2 class="mb-4 text-2xl font-semibold text-text-default dark:text-text-dark-default">
          Accessibility Guidelines
        </h2>
        <div class="space-y-6">
          <div class="rounded-lg border border-info-200 dark:border-info-800 bg-info-50 dark:bg-info-950 p-6">
            <h3 class="mb-3 text-lg font-medium text-info-800 dark:text-info-200">
              Screen Reader Support
            </h3>
            <div class="space-y-4">
              <div>
                <h4 class="mb-2 text-sm font-medium text-info-800 dark:text-info-200">
                  Provide Meaningful Labels
                </h4>
                <div class="rounded-lg bg-gray-900 p-3">
                  <pre class="text-sm text-gray-100">
                    <code>{`// Good - Clear and descriptive
<Rating 
  label="Rate the quality of customer service"
  aria-label="Service quality rating from 1 to 5 stars"
/>

// Bad - Vague or missing labels
<Rating />
<Rating label="Rating" />`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h4 class="mb-2 text-sm font-medium text-info-800 dark:text-info-200">
                  Use Descriptive Helper Text
                </h4>
                <div class="rounded-lg bg-gray-900 p-3">
                  <pre class="text-sm text-gray-100">
                    <code>{`<Rating
  label="Product Quality"
  helperText="Rate from 1 star (poor) to 5 stars (excellent)"
  labels={["Poor", "Fair", "Good", "Very Good", "Excellent"]}
/>`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-lg border border-warning-200 dark:border-warning-800 bg-warning-50 dark:bg-warning-950 p-6">
            <h3 class="mb-3 text-lg font-medium text-warning-800 dark:text-warning-200">
              Keyboard Navigation
            </h3>
            <div class="space-y-4">
              <p class="text-sm text-warning-700 dark:text-warning-300">
                The Rating component supports full keyboard navigation. Ensure users can:
              </p>
              <ul class="space-y-2 text-sm text-warning-700 dark:text-warning-300">
                <li>• Reach the component via Tab navigation</li>
                <li>• Use arrow keys to change the rating value</li>
                <li>• Use number keys to jump to specific ratings</li>
                <li>• Clear the rating using Delete/Backspace (if allowClear is enabled)</li>
                <li>• Understand the current value through screen reader announcements</li>
              </ul>
            </div>
          </div>

          <div class="rounded-lg border border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-950 p-6">
            <h3 class="mb-3 text-lg font-medium text-success-800 dark:text-success-200">
              Color and Contrast
            </h3>
            <div class="space-y-4">
              <p class="text-sm text-success-700 dark:text-success-300">
                Ensure sufficient contrast and don't rely solely on color to convey information:
              </p>
              <div class="rounded-lg bg-gray-900 p-3">
                <pre class="text-sm text-gray-100">
                  <code>{`// Good - Combines color with shape/text
<Rating
  showValue={true}  // Shows numeric value
  labels={["Poor", "Fair", "Good", "Very Good", "Excellent"]}
/>

// Consider for custom icons
const CheckIcon = () => (
  <svg>✓</svg> // Clear visual indicator beyond just color
);`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Integration */}
      <div>
        <h2 class="mb-4 text-2xl font-semibold text-text-default dark:text-text-dark-default">
          Form Integration
        </h2>
        <div class="space-y-6">
          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              Validation and Error Handling
            </h3>
            <div class="rounded-lg bg-gray-900 p-4">
              <pre class="text-sm text-gray-100 overflow-x-auto">
                <code>{`import { component$, useSignal, $ } from "@builder.io/qwik";

export default component$(() => {
  const rating = useSignal(0);
  const error = useSignal("");

  const validateRating = $((value: number | null) => {
    if (!value || value < 3) {
      error.value = "Please rate at least 3 stars";
      return false;
    }
    error.value = "";
    return true;
  });

  return (
    <Rating
      value={rating.value}
      onValueChange$={(value) => {
        rating.value = value || 0;
        validateRating(value);
      }}
      label="Service Quality"
      error={error.value}
      required
      helperText={!error.value ? "Rate your experience" : undefined}
    />
  );
});`}</code>
              </pre>
            </div>
          </div>

          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              Form Submission
            </h3>
            <div class="rounded-lg bg-gray-900 p-4">
              <pre class="text-sm text-gray-100 overflow-x-auto">
                <code>{`<form onSubmit$={handleSubmit}>
  <Rating
    name="product_rating"  // Will be included in form data
    label="Product Rating"
    required
    onValueChange$={(value) => {
      formData.productRating = value;
    }}
  />
  
  <button type="submit">Submit Review</button>
</form>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Design */}
      <div>
        <h2 class="mb-4 text-2xl font-semibold text-text-default dark:text-text-dark-default">
          Responsive Design
        </h2>
        <div class="space-y-6">
          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              Mobile Optimization
            </h3>
            <div class="space-y-4">
              <p class="text-text-secondary dark:text-text-dark-secondary">
                Consider using larger sizes and touch-friendly spacing for mobile devices:
              </p>
              <div class="rounded-lg bg-gray-900 p-4">
                <pre class="text-sm text-gray-100 overflow-x-auto">
                  <code>{`// Mobile-optimized rating
<Rating
  size="lg"  // Larger for easier touch interaction
  precision={1}  // Full stars only for simpler mobile UX
  label="Rate this app"
  showValue={true}  // Clear feedback on selection
/>`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              Responsive Sizing
            </h3>
            <div class="rounded-lg bg-gray-900 p-4">
              <pre class="text-sm text-gray-100 overflow-x-auto">
                <code>{`// Responsive approach using CSS classes
<div class="rating-container">
  <Rating
    size="sm"  // Default size
    class="md:rating-md lg:rating-lg"  // Larger on bigger screens
    label="Your Rating"
  />
</div>

// Or conditionally based on screen size
const isMobile = useSignal(false);

<Rating
  size={isMobile.value ? "lg" : "md"}
  precision={isMobile.value ? 1 : 0.5}
/>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Considerations */}
      <div>
        <h2 class="mb-4 text-2xl font-semibold text-text-default dark:text-text-dark-default">
          Performance Considerations
        </h2>
        <div class="space-y-6">
          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              Event Handling
            </h3>
            <div class="space-y-4">
              <p class="text-text-secondary dark:text-text-dark-secondary">
                Use appropriate event handlers to avoid unnecessary re-renders:
              </p>
              <div class="rounded-lg bg-gray-900 p-4">
                <pre class="text-sm text-gray-100 overflow-x-auto">
                  <code>{`// Good - Debounced or final value handling
const debouncedUpdate = $(debounce((value: number) => {
  // Expensive operation
  updateServerRating(value);
}, 500));

<Rating
  onValueChange$={(value) => {
    localRating.value = value; // Immediate UI update
  }}
  onChange$={(event, value) => {
    debouncedUpdate(value); // Debounced server update
  }}
/>

// Avoid - Expensive operations on every change
<Rating
  onValueChange$={(value) => {
    updateServerRating(value); // Called on every hover/change
  }}
/>`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              Large Lists</h3>
            <div class="space-y-4">
              <p class="text-text-secondary dark:text-text-dark-secondary">
                When displaying many ratings, consider virtualization or lazy loading:
              </p>
              <div class="rounded-lg bg-gray-900 p-4">
                <pre class="text-sm text-gray-100 overflow-x-auto">
                  <code>{`// For read-only ratings in lists
{reviews.map((review) => (
  <Rating
    key={review.id}
    value={review.rating}
    readOnly={true}  // Prevents unnecessary event listeners
    size="sm"        // Smaller for list display
    showValue={true} // Quick visual reference
  />
))}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testing Guidelines */}
      <div>
        <h2 class="mb-4 text-2xl font-semibold text-text-default dark:text-text-dark-default">
          Testing Guidelines
        </h2>
        <div class="space-y-6">
          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              Accessibility Testing
            </h3>
            <ul class="space-y-2 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• Test with screen readers (NVDA, JAWS, VoiceOver)</li>
              <li>• Verify keyboard navigation works completely</li>
              <li>• Check color contrast meets WCAG guidelines</li>
              <li>• Ensure focus indicators are visible</li>
              <li>• Test with high contrast and reduced motion settings</li>
            </ul>
          </div>

          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              Functional Testing
            </h3>
            <ul class="space-y-2 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• Test all precision levels (0.5 and 1)</li>
              <li>• Verify form integration and submission</li>
              <li>• Test validation and error states</li>
              <li>• Check hover and focus behaviors</li>
              <li>• Test with different max values and custom icons</li>
              <li>• Verify read-only and disabled states</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});