import { component$, useSignal, $ } from "@builder.io/qwik";
import { Modal } from "../Modal";

/**
 * Accessibility Showcase Example
 * 
 * Demonstrates the enhanced accessibility features including:
 * - ARIA attributes and screen reader support
 * - Focus management with initial focus control
 * - Reduced motion support
 * - Mobile-optimized touch targets
 * - Safe area handling
 * - Semantic design system tokens
 */
export const AccessibilityShowcase = component$(() => {
  const isOpen = useSignal(false);
  const formData = useSignal({
    name: "",
    email: "",
    feedback: "",
    rating: "5"
  });

  const handleSubmit = $(() => {
    console.log("Accessibility form submitted:", formData.value);
    isOpen.value = false;
    // Reset form
    formData.value = {
      name: "",
      email: "",
      feedback: "",
      rating: "5"
    };
  });

  const handleCancel = $(() => {
    isOpen.value = false;
    // Reset form
    formData.value = {
      name: "",
      email: "",
      feedback: "",
      rating: "5"
    };
  });

  return (
    <div class="p-6 space-y-6">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-text-DEFAULT dark:text-text-dark-default">
          Accessibility Showcase
        </h2>
        
        <div class="bg-success-50 dark:bg-success-900/20 p-4 rounded-lg">
          <h3 class="font-semibold text-success-900 dark:text-success-100 mb-2">
            Enhanced Accessibility Features
          </h3>
          <ul class="text-sm text-success-800 dark:text-success-200 space-y-1">
            <li>• Focus automatically moves to the first form field when opened</li>
            <li>• Full ARIA support with proper labeling and descriptions</li>
            <li>• Safe area insets for notched mobile devices</li>
            <li>• Motion respects user's reduced motion preferences</li>
            <li>• Touch targets meet 44px minimum requirement</li>
            <li>• Uses semantic design system tokens throughout</li>
          </ul>
        </div>

        <button
          onClick$={() => {
            isOpen.value = true;
          }}
          class="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-surface-dark-secondary"
        >
          Open Accessible Modal
        </button>
      </div>

      <Modal
        isOpen={isOpen.value}
        onClose={handleCancel}
        title="Accessibility Feedback Form"
        size="lg"
        fullscreenOnMobile={true}
        initialFocusElement="[data-initial-focus]"
        ariaDescription="Provide feedback about the accessibility features of this modal component"
        hasFooter={true}
        animationVariant="scale"
      >
        <div class="space-y-6">
          <div class="bg-info-50 dark:bg-info-900/20 p-4 rounded-lg">
            <h4 class="font-medium text-info-900 dark:text-info-100 mb-2">
              Accessibility Testing Instructions
            </h4>
            <ul class="text-sm text-info-800 dark:text-info-200 space-y-1">
              <li>• Try using only keyboard navigation (Tab, Shift+Tab, Enter, Escape)</li>
              <li>• Test with a screen reader if available</li>
              <li>• Notice how focus automatically moves to the first input</li>
              <li>• Observe safe area handling on mobile devices</li>
            </ul>
          </div>

          <form class="space-y-5">
            <div>
              <label 
                for="accessibility-name" 
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Full Name *
              </label>
              <input
                id="accessibility-name"
                data-initial-focus
                type="text"
                value={formData.value.name}
                onInput$={(e) => {
                  formData.value = {
                    ...formData.value,
                    name: (e.target as HTMLInputElement).value
                  };
                }}
                placeholder="Enter your full name"
                class="w-full px-3 py-2 border border-border-DEFAULT dark:border-border-dark rounded-lg bg-surface-light-DEFAULT dark:bg-surface-dark-secondary text-text-DEFAULT dark:text-text-dark-default placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
                aria-describedby="name-help"
              />
              <p id="name-help" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Your name will be used to personalize the feedback
              </p>
            </div>

            <div>
              <label 
                for="accessibility-email" 
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email Address *
              </label>
              <input
                id="accessibility-email"
                type="email"
                value={formData.value.email}
                onInput$={(e) => {
                  formData.value = {
                    ...formData.value,
                    email: (e.target as HTMLInputElement).value
                  };
                }}
                placeholder="Enter your email address"
                class="w-full px-3 py-2 border border-border-DEFAULT dark:border-border-dark rounded-lg bg-surface-light-DEFAULT dark:bg-surface-dark-secondary text-text-DEFAULT dark:text-text-dark-default placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
                aria-describedby="email-help"
              />
              <p id="email-help" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                We'll use this to follow up on your feedback
              </p>
            </div>

            <div>
              <label 
                for="accessibility-rating" 
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Accessibility Rating
              </label>
              <select
                id="accessibility-rating"
                value={formData.value.rating}
                onChange$={(e) => {
                  formData.value = {
                    ...formData.value,
                    rating: (e.target as HTMLSelectElement).value
                  };
                }}
                class="w-full px-3 py-2 border border-border-DEFAULT dark:border-border-dark rounded-lg bg-surface-light-DEFAULT dark:bg-surface-dark-secondary text-text-DEFAULT dark:text-text-dark-default focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                aria-describedby="rating-help"
              >
                <option value="5">5 - Excellent accessibility</option>
                <option value="4">4 - Good accessibility</option>
                <option value="3">3 - Average accessibility</option>
                <option value="2">2 - Poor accessibility</option>
                <option value="1">1 - Very poor accessibility</option>
              </select>
              <p id="rating-help" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Rate the overall accessibility experience
              </p>
            </div>

            <div>
              <label 
                for="accessibility-feedback" 
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Detailed Feedback *
              </label>
              <textarea
                id="accessibility-feedback"
                value={formData.value.feedback}
                onInput$={(e) => {
                  formData.value = {
                    ...formData.value,
                    feedback: (e.target as HTMLTextAreaElement).value
                  };
                }}
                placeholder="Share your thoughts on the accessibility features..."
                rows={4}
                class="w-full px-3 py-2 border border-border-DEFAULT dark:border-border-dark rounded-lg bg-surface-light-DEFAULT dark:bg-surface-dark-secondary text-text-DEFAULT dark:text-text-dark-default placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                required
                aria-describedby="feedback-help"
              />
              <p id="feedback-help" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Include specific details about keyboard navigation, screen reader compatibility, etc.
              </p>
            </div>

            <div class="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
              <h4 class="font-medium text-primary-900 dark:text-primary-100 mb-2">
                Touch Target Accessibility
              </h4>
              <p class="text-sm text-primary-800 dark:text-primary-200">
                All interactive elements in this modal meet the minimum 44px touch target size 
                recommended by WCAG guidelines for mobile accessibility.
              </p>
            </div>
          </form>
        </div>
        
        <div q:slot="footer" class="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            onClick$={handleCancel}
            class="px-4 py-2 text-gray-700 dark:text-gray-300 bg-surface-light-DEFAULT dark:bg-surface-dark-secondary border border-border-DEFAULT dark:border-border-dark rounded-lg hover:bg-surface-light-secondary dark:hover:bg-surface-dark-tertiary transition-colors order-2 sm:order-1 min-h-[44px]"
          >
            Cancel
          </button>
          <button
            onClick$={handleSubmit}
            class="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors order-1 sm:order-2 min-h-[44px]"
          >
            Submit Feedback
          </button>
        </div>
      </Modal>
    </div>
  );
});

export default AccessibilityShowcase;