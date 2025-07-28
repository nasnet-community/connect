import { component$, useSignal, $ } from "@builder.io/qwik";
import { Modal } from "../Modal";

/**
 * MobileFullscreenModal Example
 * 
 * Demonstrates the fullscreen mobile modal feature which is particularly
 * beneficial for forms and complex content on mobile devices.
 * 
 * Features showcased:
 * - fullscreenOnMobile: true
 * - mobileBreakpoint options (mobile, tablet)
 * - Form content with multiple fields
 * - Footer with action buttons
 * - Safe area handling
 * - Initial focus management
 */
export const MobileFullscreenModal = component$(() => {
  const isOpen = useSignal(false);
  const mobileBreakpoint = useSignal<"mobile" | "tablet">("mobile");
  const formData = useSignal({
    name: "",
    email: "",
    message: "",
    category: "",
    priority: "medium"
  });

  const handleSubmit = $(() => {
    console.log("Form submitted:", formData.value);
    isOpen.value = false;
    // Reset form
    formData.value = {
      name: "",
      email: "",
      message: "",
      category: "",
      priority: "medium"
    };
  });

  const handleCancel = $(() => {
    isOpen.value = false;
    // Reset form
    formData.value = {
      name: "",
      email: "",
      message: "",
      category: "",
      priority: "medium"
    };
  });

  return (
    <div class="p-6 space-y-6">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-text-DEFAULT dark:text-text-dark-default">
          Mobile Fullscreen Modal Example
        </h2>
        
        <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Why Fullscreen Mobile Modals?
          </h3>
          <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Provides maximum screen real estate for forms</li>
            <li>• Eliminates viewport scrolling issues</li>
            <li>• Better touch targets and interaction areas</li>
            <li>• Consistent experience across different mobile devices</li>
            <li>• Proper safe area handling for notched devices</li>
          </ul>
        </div>

        <div class="space-y-3">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Mobile Breakpoint (when fullscreen activates)
          </label>
          <select
            value={mobileBreakpoint.value}
            onChange$={(e) => {
              mobileBreakpoint.value = (e.target as HTMLSelectElement).value as any;
            }}
            class="block w-48 px-3 py-2 border border-border-DEFAULT dark:border-border-dark rounded-md bg-surface-light-DEFAULT dark:bg-surface-dark-secondary text-text-DEFAULT dark:text-text-dark-default">
            <option value="mobile">mobile (640px)</option>
            <option value="tablet">tablet (768px)</option>
          </select>
        </div>

        <button
          onClick$={() => {
            isOpen.value = true;
          }}
          class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Open Contact Form Modal
        </button>
      </div>

      <Modal
        isOpen={isOpen.value}
        onClose={handleCancel}
        title="Contact Support"
        fullscreenOnMobile={true}
        mobileBreakpoint={mobileBreakpoint.value}
        initialFocusElement="[data-focus-first]"
      >
        <div class="space-y-6">
          <div class="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
            <p class="text-sm text-amber-800 dark:text-amber-200">
              <strong>Mobile Optimization:</strong> On devices smaller than {mobileBreakpoint.value} 
              breakpoint, this modal becomes fullscreen to provide the best user experience 
              for form completion.
            </p>
          </div>

          <form class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name *
              </label>
              <input
                data-focus-first
                type="text"
                value={formData.value.name}
                onInput$={(e) => {
                  formData.value = {
                    ...formData.value,
                    name: (e.target as HTMLInputElement).value
                  };
                }}
                placeholder="Enter your full name"
                class="w-full px-3 py-2 border border-border-DEFAULT dark:border-border-dark rounded-lg bg-surface-light-DEFAULT dark:bg-surface-dark-secondary text-text-DEFAULT dark:text-text-dark-default placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.value.email}
                onInput$={(e) => {
                  formData.value = {
                    ...formData.value,
                    email: (e.target as HTMLInputElement).value
                  };
                }}
                placeholder="Enter your email address"
                class="w-full px-3 py-2 border border-border-DEFAULT dark:border-border-dark rounded-lg bg-surface-light-DEFAULT dark:bg-surface-dark-secondary text-text-DEFAULT dark:text-text-dark-default placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                value={formData.value.category}
                onChange$={(e) => {
                  formData.value = {
                    ...formData.value,
                    category: (e.target as HTMLSelectElement).value
                  };
                }}
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a category</option>
                <option value="technical">Technical Support</option>
                <option value="billing">Billing Question</option>
                <option value="feature">Feature Request</option>
                <option value="bug">Bug Report</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Priority Level
              </label>
              <div class="space-y-2">
                {["low", "medium", "high", "urgent"].map((priority) => (
                  <label key={priority} class="flex items-center">
                    <input
                      type="radio"
                      name="priority"
                      value={priority}
                      checked={formData.value.priority === priority}
                      onChange$={(e) => {
                        if ((e.target as HTMLInputElement).checked) {
                          formData.value = {
                            ...formData.value,
                            priority
                          };
                        }
                      }}
                      class="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <span class="text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {priority}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message *
              </label>
              <textarea
                value={formData.value.message}
                onInput$={(e) => {
                  formData.value = {
                    ...formData.value,
                    message: (e.target as HTMLTextAreaElement).value
                  };
                }}
                placeholder="Describe your issue or question in detail..."
                rows={4}
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                required
              />
            </div>

            <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 class="font-medium text-green-900 dark:text-green-100 mb-2">
                Mobile UX Benefits
              </h4>
              <ul class="text-sm text-green-800 dark:text-green-200 space-y-1">
                <li>• Fullscreen provides maximum space for this complex form</li>
                <li>• No scrolling conflicts with page behind modal</li>
                <li>• Touch targets are properly sized and spaced</li>
                <li>• Keyboard navigation works seamlessly</li>
                <li>• Safe area insets are respected on notched devices</li>
              </ul>
            </div>
          </form>
        </div>
        
        <div q:slot="footer" class="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            onClick$={handleCancel}
            class="px-4 py-2 text-gray-700 dark:text-gray-300 bg-surface-light-DEFAULT dark:bg-surface-dark-secondary border border-border-DEFAULT dark:border-border-dark rounded-lg hover:bg-surface-light-secondary dark:hover:bg-surface-dark-tertiary transition-colors order-2 sm:order-1">
            Cancel
          </button>
          <button
            onClick$={handleSubmit}
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors order-1 sm:order-2"
          >
            Send Message
          </button>
        </div>
      </Modal>
    </div>
  );
});

export default MobileFullscreenModal;