import { component$, useSignal, $ } from "@builder.io/qwik";
import { Modal } from "../Modal";

/**
 * BasicModal Example
 * 
 * Demonstrates a simple modal implementation with:
 * - Basic open/close functionality
 * - Standard title and content
 * - Mobile-friendly touch targets
 * - Proper TypeScript typing
 */
export const BasicModal = component$(() => {
  const isModalOpen = useSignal(false);

  const handleOpenModal = $(() => {
    isModalOpen.value = true;
  });

  const handleCloseModal = $(() => {
    isModalOpen.value = false;
  });

  return (
    <div class="p-6 space-y-4">
      <div class="text-center">
        <h2 class="text-2xl font-semibold text-text-DEFAULT dark:text-text-dark-default mb-4">
          Basic Modal Example
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Click the button below to open a simple modal dialog.
        </p>
        
        <button
          type="button"
          onClick$={handleOpenModal}
          class={[
            "inline-flex items-center justify-center",
            "px-6 py-3 rounded-lg font-medium",
            "bg-primary-600 hover:bg-primary-700",
            "text-white transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
            "dark:focus:ring-offset-surface-dark-secondary",
            // Mobile-friendly touch target
            "min-h-[44px] min-w-[120px]",
            "active:scale-95 transform transition-transform"
          ].join(" ")}
        >
          Open Modal
        </button>
      </div>

      <Modal
        isOpen={isModalOpen.value}
        onClose={handleCloseModal}
        title="Basic Modal Example"
        size="md"
        centered={true}
        closeOnBackdropClick={true}
        hasCloseButton={true}
        hasHeader={true}
        hasFooter={false}
        ariaDescription="A simple modal example showing basic functionality"
      >
        <div class="space-y-4">
          <p class="text-text-DEFAULT dark:text-text-dark-default leading-relaxed">
            This is a basic modal example that demonstrates the core functionality 
            of the Modal component. It includes:
          </p>
          
          <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>A clear title in the header</li>
            <li>Simple content area with text</li>
            <li>Close button in the top-right corner</li>
            <li>Click outside to close functionality</li>
            <li>Keyboard escape key support</li>
            <li>Mobile-friendly responsive design</li>
          </ul>

          <div class="mt-6 p-4 bg-surface-light-secondary dark:bg-surface-dark-tertiary rounded-lg border border-border-DEFAULT dark:border-border-dark">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              <strong>Tip:</strong> You can close this modal by clicking the X button, 
              pressing the Escape key, or clicking outside the modal area.
            </p>
          </div>

          <div class="flex justify-end mt-6">
            <button
              type="button"
              onClick$={handleCloseModal}
              class={[
                "inline-flex items-center justify-center",
                "px-4 py-2 rounded-lg font-medium",
                "bg-surface-light-tertiary hover:bg-surface-light-quaternary dark:bg-surface-dark-tertiary dark:hover:bg-surface-dark-quaternary",
                "text-text-DEFAULT dark:text-text-dark-default transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
                "dark:focus:ring-offset-surface-dark-secondary",
                // Mobile-friendly touch target
                "min-h-[44px] min-w-[80px]"
              ].join(" ")}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
});

export default BasicModal;