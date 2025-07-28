import { component$, useSignal, $ } from "@builder.io/qwik";
import { Modal } from "../Modal";

/**
 * Main Modal example showcasing common use cases and patterns.
 * This is the primary example file that demonstrates essential Modal functionality.
 */
export const ModalExample = component$(() => {
  // State management for different modal types
  const basicModal = useSignal(false);
  const confirmModal = useSignal(false);
  const formModal = useSignal(false);
  const fullscreenModal = useSignal(false);

  // Form state for the form modal
  const formData = useSignal({
    name: "",
    email: "",
    message: "",
    newsletter: false,
  });

  const handleFormSubmit = $(() => {
    console.log("Form submitted:", formData.value);
    formModal.value = false;
    // Reset form
    formData.value = {
      name: "",
      email: "",
      message: "",
      newsletter: false,
    };
  });

  const handleDelete = $(() => {
    console.log("Item deleted");
    confirmModal.value = false;
  });

  return (
    <div class="space-y-8 p-8">
      <section>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">
          Modal Component Examples
        </h1>
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Common Modal patterns and implementations for real-world use cases.
        </p>
      </section>

      {/* Example Trigger Buttons */}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick$={() => (basicModal.value = true)}
          class="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
        >
          Info Modal
        </button>
        
        <button
          onClick$={() => (confirmModal.value = true)}
          class="px-6 py-3 bg-error-600 hover:bg-error-700 text-white rounded-lg transition-colors font-medium"
        >
          Delete Confirmation
        </button>
        
        <button
          onClick$={() => (formModal.value = true)}
          class="px-6 py-3 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg transition-colors font-medium"
        >
          Contact Form
        </button>
        
        <button
          onClick$={() => (fullscreenModal.value = true)}
          class="px-6 py-3 bg-success-600 hover:bg-success-700 text-white rounded-lg transition-colors font-medium"
        >
          Mobile Fullscreen
        </button>
      </div>

      {/* Basic Information Modal */}
      <Modal
        isOpen={basicModal.value}
        onClose={$(() => { basicModal.value = false; })}
        title="Welcome to Modal Component"
        size="md"
        ariaDescription="Information about the Modal component features"
      >
        <div class="space-y-4">
          <p class="text-gray-700 dark:text-gray-300">
            This Modal component provides a flexible and accessible way to display overlay content.
            It includes features like:
          </p>
          <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Full keyboard navigation support</li>
            <li>Screen reader accessibility</li>
            <li>Mobile-optimized touch interactions</li>
            <li>Customizable sizes and styles</li>
            <li>Animation support with reduced motion awareness</li>
          </ul>
          <div class="p-4 bg-info-50 dark:bg-info-900/20 rounded-lg">
            <p class="text-sm text-info-800 dark:text-info-300">
              💡 Try pressing Escape to close this modal, or click outside the modal area.
            </p>
          </div>
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        isOpen={confirmModal.value}
        onClose={$(() => { confirmModal.value = false; })}
        title="Confirm Deletion"
        size="sm"
        hasFooter={true}
        backdropVariant="dark"
        elevation="high"
        ariaDescription="Confirmation dialog for deleting an item"
      >
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-error-100 dark:bg-error-900/30 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-error-600 dark:text-error-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.084 19c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-gray-900 dark:text-gray-50">Delete Item</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">This action cannot be undone</p>
            </div>
          </div>
          <p class="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete this item? All associated data will be permanently removed.
          </p>
        </div>
        
        <div q:slot="footer" class="flex gap-3 justify-end">
          <button
            onClick$={() => { confirmModal.value = false; }}
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick$={handleDelete}
            class="px-4 py-2 bg-error-600 hover:bg-error-700 text-white rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </Modal>

      {/* Form Modal */}
      <Modal
        isOpen={formModal.value}
        onClose={$(() => { formModal.value = false; })}
        title="Contact Us"
        size="lg"
        hasFooter={true}
        initialFocusElement="#contact-name"
        ariaDescription="Contact form to send us a message"
      >
        <form class="space-y-6" onSubmit$={(e) => {
          e.preventDefault();
          handleFormSubmit();
        }}>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="contact-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name *
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={formData.value.name}
                onInput$={(e) => {
                  formData.value = {
                    ...formData.value,
                    name: (e.target as HTMLInputElement).value
                  };
                }}
                class="w-full px-3 py-2 border border-border-DEFAULT dark:border-border-dark rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Your full name"
              />
            </div>
            
            <div>
              <label for="contact-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email *
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={formData.value.email}
                onInput$={(e) => {
                  formData.value = {
                    ...formData.value,
                    email: (e.target as HTMLInputElement).value
                  };
                }}
                class="w-full px-3 py-2 border border-border-DEFAULT dark:border-border-dark rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
          </div>
          
          <div>
            <label for="contact-message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message *
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              value={formData.value.message}
              onInput$={(e) => {
                formData.value = {
                  ...formData.value,
                  message: (e.target as HTMLTextAreaElement).value
                };
              }}
              class="w-full px-3 py-2 border border-border-DEFAULT dark:border-border-dark rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Tell us how we can help you..."
            />
          </div>
          
          <div class="flex items-center gap-2">
            <input
              id="newsletter"
              type="checkbox"
              checked={formData.value.newsletter}
              onChange$={(e) => {
                formData.value = {
                  ...formData.value,
                  newsletter: (e.target as HTMLInputElement).checked
                };
              }}
              class="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
            />
            <label for="newsletter" class="text-sm text-gray-700 dark:text-gray-300">
              Subscribe to our newsletter for updates
            </label>
          </div>
        </form>
        
        <div q:slot="footer" class="flex gap-3 justify-end">
          <button
            type="button"
            onClick$={() => (formModal.value = false)}
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick$={handleFormSubmit}
            class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            Send Message
          </button>
        </div>
      </Modal>

      {/* Mobile Fullscreen Modal */}
      <Modal
        isOpen={fullscreenModal.value}
        onClose={$(() => { fullscreenModal.value = false; })}
        title="Mobile Experience"
        size="lg"
        fullscreenOnMobile={true}
        mobileBreakpoint="tablet"
        hasFooter={true}
        ariaDescription="Demonstration of mobile fullscreen modal behavior"
      >
        <div class="space-y-6">
          <div class="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
            <h3 class="font-medium text-primary-900 dark:text-primary-200 mb-2">
              📱 Mobile Fullscreen Feature
            </h3>
            <p class="text-sm text-primary-800 dark:text-primary-300">
              On mobile and tablet devices, this modal automatically expands to fullscreen for optimal usability.
              This is particularly useful for forms, detailed content, or when you need maximum screen real estate.
            </p>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-4 border border-border-DEFAULT dark:border-border-dark rounded-lg">
              <h4 class="font-medium text-gray-900 dark:text-gray-50 mb-2">Benefits</h4>
              <ul class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Maximum screen utilization</li>
                <li>• Better touch interaction</li>
                <li>• Reduced scrolling conflicts</li>
                <li>• Immersive experience</li>
              </ul>
            </div>
            
            <div class="p-4 border border-border-DEFAULT dark:border-border-dark rounded-lg">
              <h4 class="font-medium text-gray-900 dark:text-gray-50 mb-2">Use Cases</h4>
              <ul class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Complex forms</li>
                <li>• Media galleries</li>
                <li>• Data tables</li>
                <li>• Multi-step wizards</li>
              </ul>
            </div>
          </div>
          
          <div class="space-y-4">
            <p class="text-gray-700 dark:text-gray-300">
              Try resizing your browser window or viewing this on a mobile device to see the fullscreen behavior in action.
              The modal will automatically adapt to provide the best experience for each screen size.
            </p>
          </div>
        </div>
        
        <div q:slot="footer" class="flex gap-3 justify-end">
          <button
            onClick$={() => (fullscreenModal.value = false)}
            class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            Got it!
          </button>
        </div>
      </Modal>
    </div>
  );
});