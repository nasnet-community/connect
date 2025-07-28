import { component$, useSignal, $ } from "@builder.io/qwik";
import { Modal, type ModalSize } from "../Modal";
import { Button } from "../../button";

export const ModalSizes = component$(() => {
  const isOpen = useSignal(false);
  const currentSize = useSignal<ModalSize>("md");

  const openModal = $((size: ModalSize) => {
    currentSize.value = size;
    isOpen.value = true;
  });

  const closeModal = $(() => {
    isOpen.value = false;
  });

  const sizeInfo = {
    sm: {
      title: "Small Modal",
      description: "Perfect for simple confirmations, alerts, or quick forms with minimal content.",
      usage: "Use for: Delete confirmations, simple settings, quick notifications",
      maxWidth: "384px (24rem)"
    },
    md: {
      title: "Medium Modal",
      description: "The default modal size, ideal for most use cases with moderate content.",
      usage: "Use for: User forms, settings panels, content previews, general dialogs",
      maxWidth: "448px (28rem)"
    },
    lg: {
      title: "Large Modal",
      description: "Suitable for complex forms, detailed content, or multi-section interfaces.",
      usage: "Use for: Complex forms, detailed views, multi-step processes, rich content",
      maxWidth: "512px (32rem)"
    },
    xl: {
      title: "Extra Large Modal",
      description: "For content-heavy interfaces that need significant screen real estate.",
      usage: "Use for: Data tables, complex dashboards, detailed editing interfaces",
      maxWidth: "576px (36rem)"
    },
    full: {
      title: "Full Width Modal",
      description: "Takes maximum available width with margins, ideal for wide content layouts.",
      usage: "Use for: Wide data displays, image galleries, full-featured interfaces",
      maxWidth: "Full width with 16px margins"
    }
  };

  return (
    <div class="space-y-6 p-6">
      {/* Header */}
      <div class="text-center">
        <h2 class="text-2xl font-bold text-text-DEFAULT dark:text-text-dark-default mb-2">
          Modal Size Variants
        </h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore the different modal sizes available and learn when to use each variant.
          Each size is optimized for different content types and use cases.
        </p>
      </div>

      {/* Size Buttons Grid */}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {(Object.keys(sizeInfo) as ModalSize[]).map((size) => {
          const info = sizeInfo[size];
          return (
            <div
              key={size}
              class="flex flex-col p-4 rounded-lg border border-border-DEFAULT dark:border-border-dark bg-surface-light-DEFAULT dark:bg-surface-dark-secondary"
            >
              <div class="flex-1 mb-4">
                <h3 class="text-lg font-semibold text-text-DEFAULT dark:text-text-dark-default mb-2">
                  {info.title}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {info.description}
                </p>
                <div class="text-xs text-gray-500 dark:text-gray-500 mb-2">
                  <strong>Max Width:</strong> {info.maxWidth}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-500">
                  <strong>{info.usage}</strong>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick$={() => openModal(size)}
              >
                Open {size.toUpperCase()} Modal
              </Button>
            </div>
          );
        })}
      </div>

      {/* Size Comparison Chart */}
      <div class="mt-8 p-6 rounded-lg bg-surface-light-secondary dark:bg-surface-dark-tertiary">
        <h3 class="text-lg font-semibold text-text-DEFAULT dark:text-text-dark-default mb-4">
          Size Comparison Guide
        </h3>
        <div class="space-y-3">
          {(Object.keys(sizeInfo) as ModalSize[]).map((size) => (
            <div key={size} class="flex items-center justify-between py-2 border-b border-border-DEFAULT dark:border-border-dark last:border-b-0">
              <div class="flex items-center space-x-3">
                <span class="inline-flex items-center justify-center w-8 h-8 text-xs font-medium rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                  {size.toUpperCase()}
                </span>
                <span class="font-medium text-text-DEFAULT dark:text-text-dark-default">
                  {sizeInfo[size].title}
                </span>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400">
                {sizeInfo[size].maxWidth}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive Behavior Note */}
      <div class="mt-6 p-4 rounded-lg bg-info-50 dark:bg-info-900/20 border border-info-200 dark:border-info-800">
        <div class="flex items-start space-x-3">
          <svg class="h-5 w-5 text-info-600 dark:text-info-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
          <div>
            <h4 class="text-sm font-medium text-info-800 dark:text-info-200">
              Responsive Behavior
            </h4>
            <p class="text-sm text-info-700 dark:text-info-300 mt-1">
              All modal sizes automatically adapt to smaller screens. On mobile devices, 
              modals use optimal spacing and can be configured to go fullscreen when needed.
              The <code class="px-1 py-0.5 bg-info-100 dark:bg-info-800 rounded text-xs">fullscreenOnMobile</code> prop 
              can be enabled for better mobile experience.
            </p>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      <Modal
        isOpen={isOpen.value}
        onClose={closeModal}
        size={currentSize.value}
        title={sizeInfo[currentSize.value].title}
        hasFooter={true}
      >
        <div class="space-y-4">
          <div class="p-4 rounded-lg bg-surface-light-secondary dark:bg-surface-dark-tertiary">
            <h4 class="font-semibold text-text-DEFAULT dark:text-text-dark-default mb-2">
              Current Size: {currentSize.value.toUpperCase()}
            </h4>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">
              {sizeInfo[currentSize.value].description}
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <strong class="text-gray-900 dark:text-gray-50">Max Width:</strong>
                <br />
                <span class="text-gray-600 dark:text-gray-400">
                  {sizeInfo[currentSize.value].maxWidth}
                </span>
              </div>
              <div>
                <strong class="text-gray-900 dark:text-gray-50">Best For:</strong>
                <br />
                <span class="text-gray-600 dark:text-gray-400">
                  {sizeInfo[currentSize.value].usage.replace("Use for: ", "")}
                </span>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <p class="text-gray-600 dark:text-gray-400">
              This is sample content to demonstrate how the modal appears at different sizes. 
              The content area adjusts automatically to accommodate the modal's dimensions.
            </p>
            
            <div class="flex flex-wrap gap-2">
              {(Object.keys(sizeInfo) as ModalSize[]).map((size) => (
                <button
                  key={size}
                  class={[
                    "px-3 py-1 text-xs rounded-full border transition-colors",
                    currentSize.value === size
                      ? "bg-primary-100 text-primary-800 border-primary-300 dark:bg-primary-900 dark:text-primary-200 dark:border-primary-700"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                  ].join(" ")}
                  onClick$={() => {
                    currentSize.value = size;
                  }}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div q:slot="footer" class="flex justify-end space-x-3">
          <Button variant="outline" onClick$={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick$={closeModal}>
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
});