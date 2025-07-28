import { component$, useSignal, $ } from "@builder.io/qwik";
import { Modal, type ModalSize, type BackdropVariant, type AnimationVariant, type Elevation } from "../Modal";

export const Playground = component$(() => {
  // Modal state
  const isOpen = useSignal(false);
  
  // Configuration states
  const size = useSignal<ModalSize>("md");
  const hasHeader = useSignal(true);
  const hasFooter = useSignal(false);
  const hasCloseButton = useSignal(true);
  const closeOnBackdropClick = useSignal(true);
  const centered = useSignal(true);
  const preventScroll = useSignal(true);
  const fullscreenOnMobile = useSignal(false);
  const backdropVariant = useSignal<BackdropVariant>("medium");
  const elevation = useSignal<Elevation>("elevated");
  const animationVariant = useSignal<AnimationVariant>("scale");
  const disableAnimation = useSignal(false);
  const customTitle = useSignal("Playground Modal");
  const customContent = useSignal("This is a customizable modal. Try changing the settings on the right!");
  
  const handleClose = $(() => {
    isOpen.value = false;
  });

  return (
    <div class="space-y-8">
      <section>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">
          Interactive Playground
        </h1>
        <p class="text-lg text-gray-700 dark:text-gray-300">
          Experiment with different Modal configurations in real-time.
        </p>
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview Section */}
        <div class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-50">
            Preview
          </h2>
          <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 min-h-[200px] flex items-center justify-center bg-gray-50 dark:bg-gray-800">
            <button
              onClick$={() => (isOpen.value = true)}
              class="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors text-lg font-medium"
            >
              Open Modal
            </button>
          </div>
          
          {/* Code Output */}
          <div class="mt-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
              Generated Code
            </h3>
            <pre class="bg-gray-900 text-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`<Modal
  isOpen={${isOpen.value}}
  onClose={handleClose}${hasHeader.value ? `
  title="${customTitle.value}"` : ''}
  size="${size.value}"${hasHeader.value === false ? `
  hasHeader={false}` : ''}${hasFooter.value ? `
  hasFooter={true}` : ''}${hasCloseButton.value === false ? `
  hasCloseButton={false}` : ''}${closeOnBackdropClick.value === false ? `
  closeOnBackdropClick={false}` : ''}${centered.value === false ? `
  centered={false}` : ''}${preventScroll.value === false ? `
  preventScroll={false}` : ''}${fullscreenOnMobile.value ? `
  fullscreenOnMobile={true}` : ''}${backdropVariant.value !== "medium" ? `
  backdropVariant="${backdropVariant.value}"` : ''}${elevation.value !== "elevated" ? `
  elevation="${elevation.value}"` : ''}${animationVariant.value !== "scale" ? `
  animationVariant="${animationVariant.value}"` : ''}${disableAnimation.value ? `
  disableAnimation={true}` : ''}
>
  ${customContent.value}${hasFooter.value ? `
  
  <div q:slot="footer">
    <button class="px-4 py-2 bg-primary-500 text-white rounded">
      Action
    </button>
  </div>` : ''}
</Modal>`}</code>
            </pre>
          </div>
        </div>

        {/* Controls Section */}
        <div class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-50">
            Configuration
          </h2>
          
          {/* Content Controls */}
          <div class="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 class="font-medium text-gray-900 dark:text-gray-50">Content</h3>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                value={customTitle.value}
                onInput$={(e) => (customTitle.value = (e.target as HTMLInputElement).value)}
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Body Content
              </label>
              <textarea
                value={customContent.value}
                onInput$={(e) => (customContent.value = (e.target as HTMLTextAreaElement).value)}
                rows={3}
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50"
              />
            </div>
          </div>

          {/* Size & Layout Controls */}
          <div class="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 class="font-medium text-gray-900 dark:text-gray-50">Size & Layout</h3>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Size
              </label>
              <select
                value={size.value}
                onChange$={(e) => (size.value = (e.target as HTMLSelectElement).value as ModalSize)}
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
                <option value="full">Full Width</option>
              </select>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <label class="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={centered.value}
                  onChange$={(e) => (centered.value = (e.target as HTMLInputElement).checked)}
                  class="rounded border-gray-300 dark:border-gray-600"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">Centered</span>
              </label>
              
              <label class="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={fullscreenOnMobile.value}
                  onChange$={(e) => (fullscreenOnMobile.value = (e.target as HTMLInputElement).checked)}
                  class="rounded border-gray-300 dark:border-gray-600"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">Fullscreen Mobile</span>
              </label>
            </div>
          </div>

          {/* Feature Controls */}
          <div class="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 class="font-medium text-gray-900 dark:text-gray-50">Features</h3>
            
            <div class="grid grid-cols-2 gap-4">
              <label class="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={hasHeader.value}
                  onChange$={(e) => (hasHeader.value = (e.target as HTMLInputElement).checked)}
                  class="rounded border-gray-300 dark:border-gray-600"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">Has Header</span>
              </label>
              
              <label class="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={hasFooter.value}
                  onChange$={(e) => (hasFooter.value = (e.target as HTMLInputElement).checked)}
                  class="rounded border-gray-300 dark:border-gray-600"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">Has Footer</span>
              </label>
              
              <label class="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={hasCloseButton.value}
                  onChange$={(e) => (hasCloseButton.value = (e.target as HTMLInputElement).checked)}
                  class="rounded border-gray-300 dark:border-gray-600"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">Close Button</span>
              </label>
              
              <label class="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={closeOnBackdropClick.value}
                  onChange$={(e) => (closeOnBackdropClick.value = (e.target as HTMLInputElement).checked)}
                  class="rounded border-gray-300 dark:border-gray-600"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">Backdrop Close</span>
              </label>
              
              <label class="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={preventScroll.value}
                  onChange$={(e) => (preventScroll.value = (e.target as HTMLInputElement).checked)}
                  class="rounded border-gray-300 dark:border-gray-600"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">Prevent Scroll</span>
              </label>
              
              <label class="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={disableAnimation.value}
                  onChange$={(e) => (disableAnimation.value = (e.target as HTMLInputElement).checked)}
                  class="rounded border-gray-300 dark:border-gray-600"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">No Animation</span>
              </label>
            </div>
          </div>

          {/* Style Controls */}
          <div class="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 class="font-medium text-gray-900 dark:text-gray-50">Styling</h3>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Backdrop Variant
              </label>
              <select
                value={backdropVariant.value}
                onChange$={(e) => (backdropVariant.value = (e.target as HTMLSelectElement).value as BackdropVariant)}
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50"
              >
                <option value="light">Light</option>
                <option value="medium">Medium</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Elevation
              </label>
              <select
                value={elevation.value}
                onChange$={(e) => (elevation.value = (e.target as HTMLSelectElement).value as Elevation)}
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50"
              >
                <option value="none">None</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="elevated">Elevated</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Animation Variant
              </label>
              <select
                value={animationVariant.value}
                onChange$={(e) => (animationVariant.value = (e.target as HTMLSelectElement).value as AnimationVariant)}
                disabled={disableAnimation.value}
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 disabled:opacity-50"
              >
                <option value="fade">Fade</option>
                <option value="scale">Scale</option>
                <option value="slide">Slide</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Actual Modal */}
      <Modal
        isOpen={isOpen.value}
        onClose={handleClose}
        title={hasHeader.value ? customTitle.value : undefined}
        size={size.value}
        hasHeader={hasHeader.value}
        hasFooter={hasFooter.value}
        hasCloseButton={hasCloseButton.value}
        closeOnBackdropClick={closeOnBackdropClick.value}
        centered={centered.value}
        preventScroll={preventScroll.value}
        fullscreenOnMobile={fullscreenOnMobile.value}
        backdropVariant={backdropVariant.value}
        elevation={elevation.value}
        animationVariant={animationVariant.value}
        disableAnimation={disableAnimation.value}
      >
        <div class="space-y-4">
          <p class="text-gray-700 dark:text-gray-300">{customContent.value}</p>
          <div class="p-4 bg-info-50 dark:bg-info-900/20 rounded-lg">
            <p class="text-sm text-info-800 dark:text-info-300">
              This modal is configured with the settings you selected. Try changing them to see how the modal behaves!
            </p>
          </div>
          
          {/* Enhanced Features Demo */}
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div class="p-3 bg-surface-light-secondary dark:bg-surface-dark-tertiary rounded-lg">
              <h4 class="font-semibold text-text-DEFAULT dark:text-text-dark-default text-sm mb-2">
                🎯 Accessibility Features
              </h4>
              <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li>• ARIA attributes automatically applied</li>
                <li>• Focus management with native dialog</li>
                <li>• Keyboard navigation support</li>
                <li>• Screen reader compatibility</li>
              </ul>
            </div>
            
            <div class="p-3 bg-surface-light-secondary dark:bg-surface-dark-tertiary rounded-lg">
              <h4 class="font-semibold text-text-DEFAULT dark:text-text-dark-default text-sm mb-2">
                📱 Mobile Optimizations
              </h4>
              <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Safe area insets handled automatically</li>
                <li>• Touch target size optimization</li>
                <li>• Responsive breakpoint controls</li>
                <li>• Fullscreen mobile experience</li>
              </ul>
            </div>
            
            <div class="p-3 bg-surface-light-secondary dark:bg-surface-dark-tertiary rounded-lg">
              <h4 class="font-semibold text-text-DEFAULT dark:text-text-dark-default text-sm mb-2">
                🎨 Theme Integration
              </h4>
              <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Semantic design system tokens</li>
                <li>• Automatic dark mode support</li>
                <li>• Consistent color patterns</li>
                <li>• System theme detection</li>
              </ul>
            </div>
            
            <div class="p-3 bg-surface-light-secondary dark:bg-surface-dark-tertiary rounded-lg">
              <h4 class="font-semibold text-text-DEFAULT dark:text-text-dark-default text-sm mb-2">
                ⚡ Motion Preferences
              </h4>
              <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Reduced motion support</li>
                <li>• Smooth animation options</li>
                <li>• User preference respect</li>
                <li>• Performance optimized</li>
              </ul>
            </div>
          </div>
        </div>
        
        {hasFooter.value && (
          <div q:slot="footer" class="flex gap-3">
            <button
              onClick$={handleClose}
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick$={handleClose}
              class="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
});