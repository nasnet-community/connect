import { component$, useSignal, $ } from "@builder.io/qwik";
import { Modal } from "../Modal";

export const Examples = component$(() => {
  // State for different modal examples
  const basicModal = useSignal(false);
  const confirmModal = useSignal(false);
  const formModal = useSignal(false);
  const mediaModal = useSignal(false);
  const customModal = useSignal(false);

  return (
    <div class="space-y-8">
      <section>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">
          Examples
        </h1>
        <p class="text-lg text-gray-700 dark:text-gray-300">
          Explore various Modal component implementations and use cases.
        </p>
      </section>

      {/* Example Grid */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Modal Example */}
        <div class="border border-border-DEFAULT dark:border-border-dark rounded-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
            Basic Modal
          </h3>
          <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Simple modal with title and content
          </p>
          <button
            onClick$={() => (basicModal.value = true)}
            class="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
          >
            Open Basic Modal
          </button>
        </div>

        {/* Confirmation Modal Example */}
        <div class="border border-border-DEFAULT dark:border-border-dark rounded-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
            Confirmation Dialog
          </h3>
          <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Modal with action buttons in footer
          </p>
          <button
            onClick$={() => (confirmModal.value = true)}
            class="px-4 py-2 bg-error-500 hover:bg-error-600 text-white rounded-lg transition-colors"
          >
            Delete Item
          </button>
        </div>

        {/* Form Modal Example */}
        <div class="border border-border-DEFAULT dark:border-border-dark rounded-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
            Form Modal
          </h3>
          <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Fullscreen on mobile with form inputs
          </p>
          <button
            onClick$={() => (formModal.value = true)}
            class="px-4 py-2 bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg transition-colors"
          >
            Open Form
          </button>
        </div>

        {/* Media Modal Example */}
        <div class="border border-border-DEFAULT dark:border-border-dark rounded-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
            Media Gallery
          </h3>
          <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Large modal for media content
          </p>
          <button
            onClick$={() => (mediaModal.value = true)}
            class="px-4 py-2 bg-info-500 hover:bg-info-600 text-white rounded-lg transition-colors"
          >
            View Gallery
          </button>
        </div>

        {/* Custom Styled Modal Example */}
        <div class="border border-border-DEFAULT dark:border-border-dark rounded-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
            Custom Styled
          </h3>
          <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Heavily customized appearance
          </p>
          <button
            onClick$={() => (customModal.value = true)}
            class="px-4 py-2 bg-success-500 hover:bg-success-600 text-white rounded-lg transition-colors"
          >
            Open Custom Modal
          </button>
        </div>
      </div>

      {/* Modal Implementations */}
      
      {/* Basic Modal */}
      <Modal
        isOpen={basicModal.value}
        onClose={$(() => { basicModal.value = false; })}
        title="Welcome to Our App"
        size="md"
      >
        <div class="space-y-4">
          <p class="text-gray-700 dark:text-gray-300">
            This is a basic modal implementation with standard features. It includes a header with a title,
            a close button, and body content.
          </p>
          <p class="text-gray-700 dark:text-gray-300">
            The modal automatically handles focus management, keyboard navigation, and backdrop clicks.
          </p>
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        isOpen={confirmModal.value}
        onClose={$(() => { confirmModal.value = false; })}
        title="Delete Confirmation"
        size="sm"
        hasFooter={true}
        backdropVariant="dark"
      >
        <div class="space-y-4">
          <p class="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete this item? This action cannot be undone.
          </p>
        </div>
        <div q:slot="footer" class="flex gap-3">
          <button
            onClick$={() => (confirmModal.value = false)}
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick$={() => {
              // Handle delete action
              confirmModal.value = false;
            }}
            class="px-4 py-2 bg-error-500 hover:bg-error-600 text-white rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </Modal>

      {/* Form Modal */}
      <Modal
        isOpen={formModal.value}
        onClose={$(() => { formModal.value = false; })}
        title="Create New Project"
        size="lg"
        hasFooter={true}
        fullscreenOnMobile={true}
        initialFocusElement="#project-name"
        ariaDescription="Create a new project by filling out the form"
      >
        <form class="space-y-6">
          <div>
            <label for="project-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Project Name
            </label>
            <input
              id="project-name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter project name"
            />
          </div>
          
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Describe your project"
            />
          </div>
          
          <div>
            <label for="visibility" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Visibility
            </label>
            <select
              id="visibility"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option>Public</option>
              <option>Private</option>
              <option>Team Only</option>
            </select>
          </div>
        </form>
        
        <div q:slot="footer" class="flex gap-3 justify-end">
          <button
            onClick$={() => (formModal.value = false)}
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick$={() => {
              // Handle form submission
              formModal.value = false;
            }}
            class="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
          >
            Create Project
          </button>
        </div>
      </Modal>

      {/* Media Modal */}
      <Modal
        isOpen={mediaModal.value}
        onClose={$(() => { mediaModal.value = false; })}
        title="Photo Gallery"
        size="xl"
        animationVariant="fade"
        elevation="high"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <span class="text-gray-500 dark:text-gray-400">Image 1</span>
          </div>
          <div class="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <span class="text-gray-500 dark:text-gray-400">Image 2</span>
          </div>
          <div class="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <span class="text-gray-500 dark:text-gray-400">Image 3</span>
          </div>
          <div class="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <span class="text-gray-500 dark:text-gray-400">Image 4</span>
          </div>
        </div>
      </Modal>

      {/* Custom Styled Modal */}
      <Modal
        isOpen={customModal.value}
        onClose={$(() => { customModal.value = false; })}
        size="md"
        hasHeader={false}
        centered={false}
        animationVariant="slide"
        backdropVariant="light"
        elevation="none"
        class="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20"
      >
        <div class="p-8 text-center">
          <div class="w-16 h-16 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
            Success!
          </h3>
          <p class="text-gray-700 dark:text-gray-300 mb-6">
            Your changes have been saved successfully.
          </p>
          <button
            onClick$={() => (customModal.value = false)}
            class="px-6 py-2 bg-success-500 hover:bg-success-600 text-white rounded-lg transition-colors"
          >
            Continue
          </button>
        </div>
      </Modal>

      {/* Code Example Section */}
      <section class="mt-12 space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          Live Code Examples
        </h2>
        <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
            View the source code for these examples in the Examples folder:
          </p>
          <ul class="space-y-2 text-sm font-mono">
            <li class="text-gray-700 dark:text-gray-300">
              • BasicModal.tsx - Simple modal implementation
            </li>
            <li class="text-gray-700 dark:text-gray-300">
              • ModalSizes.tsx - All size variants demonstration
            </li>
            <li class="text-gray-700 dark:text-gray-300">
              • MobileFullscreenModal.tsx - Mobile optimization example
            </li>
            <li class="text-gray-700 dark:text-gray-300">
              • ResponsiveModalSizes.tsx - Responsive behavior showcase
            </li>
            <li class="text-gray-700 dark:text-gray-300">
              • ModalAdvancedFeatures.tsx - Advanced features demo
            </li>
            <li class="text-gray-700 dark:text-gray-300">
              • AccessibilityShowcase.tsx - Comprehensive accessibility features demonstration
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
});