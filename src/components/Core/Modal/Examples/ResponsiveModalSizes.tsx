import { component$, useSignal, $ } from "@builder.io/qwik";
import { Modal } from "../Modal";

/**
 * ResponsiveModalSizes - Demonstrates modal behavior across different screen sizes
 * 
 * This example showcases:
 * - How modals adapt to different viewport sizes
 * - Responsive content layout within modals
 * - Breakpoint-aware sizing and positioning
 * - Mobile-first design considerations
 * - Fullscreen behavior on mobile devices
 */
export const ResponsiveModalSizes = component$(() => {
  const isSmallModalOpen = useSignal(false);
  const isMediumModalOpen = useSignal(false);
  const isLargeModalOpen = useSignal(false);
  const isFullModalOpen = useSignal(false);
  const isMobileFullscreenOpen = useSignal(false);
  const isResponsiveContentOpen = useSignal(false);

  // Simulated viewport size for demonstration (in real app, you'd use window.innerWidth)
  const viewportWidth = useSignal(1024);

  const getViewportLabel = (width: number) => {
    if (width < 640) return "Mobile (< 640px)";
    if (width < 768) return "Large Mobile (640-767px)";
    if (width < 1024) return "Tablet (768-1023px)";
    if (width < 1280) return "Small Desktop (1024-1279px)";
    return "Large Desktop (≥ 1280px)";
  };

  return (
    <div class="space-y-8 p-6">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">
          Responsive Modal Sizes
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Explore how modals adapt to different screen sizes with responsive layouts, 
          mobile-first design, and accessibility features.
        </p>
      </div>

      {/* Viewport Size Indicator */}
      <div class="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 p-6 rounded-xl border border-primary-200 dark:border-primary-800">
        <div class="text-center mb-4">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">
            Current Viewport Simulation
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            Adjust the width to see how modals respond to different screen sizes
          </p>
        </div>
        
        <div class="flex flex-col items-center space-y-4">
          <div class="flex items-center space-x-4 w-full max-w-md">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[60px]">
              360px
            </span>
            <input
              type="range"
              min="360"
              max="1920"
              step="10"
              value={viewportWidth.value}
              onInput$={(e) => {
                viewportWidth.value = parseInt((e.target as HTMLInputElement).value);
              }}
              class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[70px]">
              1920px
            </span>
          </div>
          
          <div class="text-center">
            <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {viewportWidth.value}px
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              {getViewportLabel(viewportWidth.value)}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Size Examples */}
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Small Modal */}
        <div class="bg-surface-light-secondary dark:bg-surface-dark-secondary p-6 rounded-lg border border-border-DEFAULT dark:border-border-dark">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
            Small Modal
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Perfect for confirmations, alerts, and simple forms.
          </p>
          <div class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <strong>Breakpoint behavior:</strong>
            <ul class="list-disc list-inside mt-1 space-y-1">
              <li>Mobile: Full width with padding</li>
              <li>Tablet+: max-w-sm (384px)</li>
            </ul>
          </div>
          <button
            onClick$={() => isSmallModalOpen.value = true}
            class="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Open Small Modal
          </button>
        </div>

        {/* Medium Modal */}
        <div class="bg-surface-light-secondary dark:bg-surface-dark-secondary p-6 rounded-lg border border-border-DEFAULT dark:border-border-dark">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
            Medium Modal
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Ideal for most content, forms, and detailed information.
          </p>
          <div class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <strong>Breakpoint behavior:</strong>
            <ul class="list-disc list-inside mt-1 space-y-1">
              <li>Mobile: Full width with padding</li>
              <li>Tablet+: max-w-md (448px)</li>
            </ul>
          </div>
          <button
            onClick$={() => isMediumModalOpen.value = true}
            class="w-full bg-secondary-500 hover:bg-secondary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Open Medium Modal
          </button>
        </div>

        {/* Large Modal */}
        <div class="bg-surface-light-secondary dark:bg-surface-dark-secondary p-6 rounded-lg border border-border-DEFAULT dark:border-border-dark">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
            Large Modal
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Great for complex forms, data tables, and rich content.
          </p>
          <div class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <strong>Breakpoint behavior:</strong>
            <ul class="list-disc list-inside mt-1 space-y-1">
              <li>Mobile: Full width with padding</li>
              <li>Tablet+: max-w-lg (512px)</li>
            </ul>
          </div>
          <button
            onClick$={() => isLargeModalOpen.value = true}
            class="w-full bg-success-500 hover:bg-success-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Open Large Modal
          </button>
        </div>

        {/* Full Modal */}
        <div class="bg-surface-light-secondary dark:bg-surface-dark-secondary p-6 rounded-lg border border-border-DEFAULT dark:border-border-dark">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
            Full Modal
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Uses full viewport width with responsive margins.
          </p>
          <div class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <strong>Breakpoint behavior:</strong>
            <ul class="list-disc list-inside mt-1 space-y-1">
              <li>All sizes: Full width with margins</li>
              <li>Responsive padding: 1rem → 4rem</li>
            </ul>
          </div>
          <button
            onClick$={() => isFullModalOpen.value = true}
            class="w-full bg-warning-500 hover:bg-warning-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Open Full Modal
          </button>
        </div>

        {/* Mobile Fullscreen */}
        <div class="bg-surface-light-secondary dark:bg-surface-dark-secondary p-6 rounded-lg border border-border-DEFAULT dark:border-border-dark">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
            Mobile Fullscreen
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Fullscreen on mobile, normal sizing on desktop.
          </p>
          <div class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <strong>Breakpoint behavior:</strong>
            <ul class="list-disc list-inside mt-1 space-y-1">
              <li>Mobile: Fullscreen overlay</li>
              <li>Tablet+: max-w-lg (512px)</li>
            </ul>
          </div>
          <button
            onClick$={() => isMobileFullscreenOpen.value = true}
            class="w-full bg-error-500 hover:bg-error-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Open Mobile Fullscreen
          </button>
        </div>

        {/* Responsive Content */}
        <div class="bg-surface-light-secondary dark:bg-surface-dark-secondary p-6 rounded-lg border border-border-DEFAULT dark:border-border-dark">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
            Responsive Content
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Demonstrates responsive grid layouts within modals.
          </p>
          <div class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <strong>Features:</strong>
            <ul class="list-disc list-inside mt-1 space-y-1">
              <li>CSS Grid responsive layout</li>
              <li>Responsive images and text</li>
              <li>Breakpoint-aware content</li>
            </ul>
          </div>
          <button
            onClick$={() => isResponsiveContentOpen.value = true}
            class="w-full bg-info-500 hover:bg-info-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Open Responsive Content
          </button>
        </div>
      </div>

      {/* Responsive Guidelines */}
      <div class="bg-gradient-to-r from-info-50 to-primary-50 dark:from-info-950 dark:to-primary-950 p-6 rounded-xl border border-info-200 dark:border-info-800">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
          Responsive Design Guidelines
        </h2>
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-gray-50 mb-2">
              Mobile Considerations
            </h3>
            <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Use fullscreen modals for complex content on mobile</li>
              <li>• Ensure touch targets are at least 44px × 44px</li>
              <li>• Consider safe area insets for modern devices</li>
              <li>• Optimize for thumb navigation zones</li>
              <li>• Use larger text sizes on smaller screens</li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-gray-50 mb-2">
              Desktop Considerations
            </h3>
            <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Center modals for optimal focus</li>
              <li>• Use shadows and blurred backdrops for depth</li>
              <li>• Maintain reasonable maximum widths</li>
              <li>• Support keyboard navigation</li>
              <li>• Consider multiple monitor setups</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal Implementations */}

      {/* Small Modal */}
      <Modal
        isOpen={isSmallModalOpen.value}
        onClose={$(() => { isSmallModalOpen.value = false; })}
        size="sm"
        title="Small Modal Example"
        hasFooter={true}
      >
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-400">
            This is a small modal perfect for confirmations, alerts, or simple forms. 
            Notice how it maintains readability while staying compact.
          </p>
          <div class="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
            <h4 class="font-medium text-primary-900 dark:text-primary-100 mb-2">
              Small Modal Best Practices:
            </h4>
            <ul class="text-sm text-primary-700 dark:text-primary-300 space-y-1">
              <li>• Keep content concise and focused</li>
              <li>• Use for single actions or confirmations</li>
              <li>• Ensure text remains readable on all devices</li>
            </ul>
          </div>
        </div>
        <div q:slot="footer" class="flex space-x-3">
          <button
            onClick$={() => isSmallModalOpen.value = false}
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick$={() => isSmallModalOpen.value = false}
            class="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors duration-200"
          >
            Confirm
          </button>
        </div>
      </Modal>

      {/* Medium Modal */}
      <Modal
        isOpen={isMediumModalOpen.value}
        onClose={$(() => { isMediumModalOpen.value = false; })}
        size="md"
        title="Medium Modal Example"
        hasFooter={true}
      >
        <div class="space-y-6">
          <p class="text-gray-600 dark:text-gray-400">
            Medium modals are perfect for most use cases, providing a good balance 
            between content space and screen real estate.
          </p>
          
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="bg-secondary-50 dark:bg-secondary-900/20 p-4 rounded-lg">
              <h4 class="font-medium text-secondary-900 dark:text-secondary-100 mb-2">
                Form Example
              </h4>
              <div class="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
            
            <div class="bg-success-50 dark:bg-success-900/20 p-4 rounded-lg">
              <h4 class="font-medium text-success-900 dark:text-success-100 mb-2">
                Information Panel
              </h4>
              <p class="text-sm text-success-700 dark:text-success-300">
                This layout works well for forms, information panels, 
                and moderate amounts of content.
              </p>
            </div>
          </div>
        </div>
        <div q:slot="footer" class="flex flex-col-reverse sm:flex-row sm:justify-end space-y-2 space-y-reverse sm:space-y-0 sm:space-x-3">
          <button
            onClick$={() => isMediumModalOpen.value = false}
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick$={() => isMediumModalOpen.value = false}
            class="px-4 py-2 text-sm font-medium text-white bg-secondary-500 hover:bg-secondary-600 rounded-lg transition-colors duration-200"
          >
            Save Changes
          </button>
        </div>
      </Modal>

      {/* Large Modal */}
      <Modal
        isOpen={isLargeModalOpen.value}
        onClose={$(() => { isLargeModalOpen.value = false; })}
        size="lg"
        title="Large Modal Example"
        hasFooter={true}
      >
        <div class="space-y-6">
          <p class="text-gray-600 dark:text-gray-400">
            Large modals are ideal for complex forms, data tables, and rich content 
            that needs more space to breathe.
          </p>
          
          <div class="grid gap-6 md:grid-cols-3">
            <div class="md:col-span-2 space-y-4">
              <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Complex Form Layout
                </h4>
                <div class="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="First Name"
                    class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <textarea
                  placeholder="Message"
                  rows={3}
                  class="mt-4 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                ></textarea>
              </div>
            </div>
            
            <div class="space-y-4">
              <div class="bg-info-50 dark:bg-info-900/20 p-4 rounded-lg">
                <h4 class="font-medium text-info-900 dark:text-info-100 mb-2">
                  Quick Stats
                </h4>
                <div class="space-y-2 text-sm text-info-700 dark:text-info-300">
                  <div class="flex justify-between">
                    <span>Total Users:</span>
                    <span class="font-medium">1,234</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Active Today:</span>
                    <span class="font-medium">567</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Conversion:</span>
                    <span class="font-medium">23.4%</span>
                  </div>
                </div>
              </div>
              
              <div class="bg-warning-50 dark:bg-warning-900/20 p-4 rounded-lg">
                <h4 class="font-medium text-warning-900 dark:text-warning-100 mb-2">
                  Notice
                </h4>
                <p class="text-sm text-warning-700 dark:text-warning-300">
                  Large modals provide excellent space for complex layouts 
                  while maintaining usability.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div q:slot="footer" class="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            <span>Auto-saved 2 minutes ago</span>
          </div>
          <div class="flex space-x-3">
            <button
              onClick$={() => isLargeModalOpen.value = false}
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick$={() => isLargeModalOpen.value = false}
              class="px-4 py-2 text-sm font-medium text-white bg-success-500 hover:bg-success-600 rounded-lg transition-colors duration-200"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </Modal>

      {/* Full Modal */}
      <Modal
        isOpen={isFullModalOpen.value}
        onClose={$(() => { isFullModalOpen.value = false; })}
        size="full"
        title="Full Width Modal Example"
        hasFooter={true}
      >
        <div class="space-y-8">
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Full-width modals utilize the entire viewport width with responsive margins, 
            perfect for dashboard-like interfaces and comprehensive forms.
          </p>
          
          <div class="grid gap-6 lg:grid-cols-4 md:grid-cols-2">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                class="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 p-6 rounded-lg border border-primary-200 dark:border-primary-800"
              >
                <div class="w-12 h-12 bg-primary-500 rounded-lg mb-4 flex items-center justify-center">
                  <span class="text-white font-semibold">{i + 1}</span>
                </div>
                <h4 class="font-semibold text-gray-900 dark:text-gray-50 mb-2">
                  Feature {i + 1}
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  This card demonstrates how content scales beautifully in full-width modals 
                  across different screen sizes.
                </p>
              </div>
            ))}
          </div>
          
          <div class="bg-gradient-to-r from-info-50 to-success-50 dark:from-info-900/20 dark:to-success-900/20 p-6 rounded-lg border border-info-200 dark:border-info-800">
            <h4 class="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
              Responsive Layout Showcase
            </h4>
            <div class="grid gap-4 md:grid-cols-3">
              <div class="md:col-span-2">
                <h5 class="font-medium text-gray-900 dark:text-gray-50 mb-2">
                  Main Content Area
                </h5>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  This area demonstrates how content flows naturally in full-width modals. 
                  The layout automatically adjusts to different screen sizes while maintaining 
                  readability and visual hierarchy.
                </p>
                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h6 class="font-medium text-gray-900 dark:text-gray-50 mb-2">Content Block</h6>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Full-width modals are excellent for complex interfaces that need maximum 
                    screen real estate while maintaining modal context.
                  </p>
                </div>
              </div>
              <div class="space-y-4">
                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h6 class="font-medium text-gray-900 dark:text-gray-50 mb-2">Sidebar Content</h6>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Sidebars work great in full-width modals for secondary information.
                  </p>
                </div>
                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h6 class="font-medium text-gray-900 dark:text-gray-50 mb-2">Quick Actions</h6>
                  <div class="flex flex-col space-y-2">
                    <button class="px-3 py-1 text-xs bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 rounded">
                      Action 1
                    </button>
                    <button class="px-3 py-1 text-xs bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300 rounded">
                      Action 2
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div q:slot="footer" class="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Full-width modals provide maximum flexibility for complex interfaces
          </div>
          <div class="flex space-x-3">
            <button
              onClick$={() => isFullModalOpen.value = false}
              class="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
            >
              Close
            </button>
            <button
              onClick$={() => isFullModalOpen.value = false}
              class="px-6 py-2 text-sm font-medium text-white bg-warning-500 hover:bg-warning-600 rounded-lg transition-colors duration-200"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </Modal>

      {/* Mobile Fullscreen Modal */}
      <Modal
        isOpen={isMobileFullscreenOpen.value}
        onClose={$(() => { isMobileFullscreenOpen.value = false; })}
        size="lg"
        title="Mobile Fullscreen Modal"
        fullscreenOnMobile={true}
        hasFooter={true}
      >
        <div class="space-y-6">
          <div class="bg-gradient-to-r from-error-50 to-warning-50 dark:from-error-900/20 dark:to-warning-900/20 p-4 rounded-lg border border-error-200 dark:border-error-800">
            <h4 class="font-medium text-error-900 dark:text-error-100 mb-2">
              Mobile Fullscreen Behavior
            </h4>
            <p class="text-sm text-error-700 dark:text-error-300">
              This modal automatically becomes fullscreen on mobile devices (≤ 767px) 
              while maintaining normal sizing on larger screens.
            </p>
          </div>
          
          <div class="space-y-4">
            <h4 class="font-semibold text-gray-900 dark:text-gray-50">
              Mobile-Optimized Content
            </h4>
            <p class="text-gray-600 dark:text-gray-400">
              When designing for mobile fullscreen modals, consider:
            </p>
            
            <div class="grid gap-4 sm:grid-cols-2">
              <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h5 class="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Touch-Friendly Interface
                </h5>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Larger touch targets (min 44px)</li>
                  <li>• Thumb-friendly navigation zones</li>
                  <li>• Clear visual hierarchy</li>
                  <li>• Accessible color contrast</li>
                </ul>
              </div>
              
              <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h5 class="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Performance Considerations
                </h5>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Optimized animations</li>
                  <li>• Reduced motion support</li>
                  <li>• Safe area insets</li>
                  <li>• Viewport considerations</li>
                </ul>
              </div>
            </div>
            
            <div class="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h5 class="font-medium text-gray-900 dark:text-gray-100 mb-4">
                Example Mobile Form
              </h5>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your mobile number"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    placeholder="6-digit code"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <button class="w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200">
                  Verify Mobile Number
                </button>
              </div>
            </div>
          </div>
        </div>
        <div q:slot="footer" class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
          <button
            onClick$={() => isMobileFullscreenOpen.value = false}
            class="w-full sm:w-auto px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick$={() => isMobileFullscreenOpen.value = false}
            class="w-full sm:w-auto px-6 py-3 text-sm font-medium text-white bg-error-500 hover:bg-error-600 rounded-lg transition-colors duration-200"
          >
            Continue
          </button>
        </div>
      </Modal>

      {/* Responsive Content Modal */}
      <Modal
        isOpen={isResponsiveContentOpen.value}
        onClose={$(() => { isResponsiveContentOpen.value = false; })}
        size="xl"
        title="Responsive Content Layout"
        hasFooter={true}
      >
        <div class="space-y-8">
          <div class="text-center">
            <h4 class="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">
              Advanced Responsive Grid Layout
            </h4>
            <p class="text-gray-600 dark:text-gray-400">
              This modal demonstrates how to create responsive layouts that adapt 
              to different screen sizes within modal containers.
            </p>
          </div>
          
          {/* Hero Section with Responsive Image */}
          <div class="relative bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl overflow-hidden">
            <div class="absolute inset-0 bg-black/20"></div>
            <div class="relative p-8 text-center text-white">
              <h5 class="text-2xl font-bold mb-2">Responsive Hero Section</h5>
              <p class="text-primary-100 max-w-2xl mx-auto">
                Hero sections within modals can be fully responsive, adapting their 
                layout and content based on available space.
              </p>
            </div>
          </div>
          
          {/* Responsive Grid Content */}
          <div class="grid gap-6 lg:grid-cols-12">
            {/* Main Content Area */}
            <div class="lg:col-span-8 space-y-6">
              <div class="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h5 class="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">
                  Responsive Article Content
                </h5>
                <div class="prose prose-sm dark:prose-invert max-w-none">
                  <p>
                    This content area demonstrates how text and media can flow responsively 
                    within modal layouts. The typography scales appropriately, and the 
                    layout adjusts based on available space.
                  </p>
                  <p>
                    On smaller screens, this content stacks vertically, while on larger 
                    screens it utilizes a multi-column layout for optimal readability.
                  </p>
                </div>
                
                {/* Image Gallery Grid */}
                <div class="mt-6">
                  <h6 class="font-medium text-gray-900 dark:text-gray-50 mb-3">
                    Responsive Image Grid
                  </h6>
                  <div class="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div
                        key={i}
                        class="aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-lg border border-primary-200 dark:border-primary-800 flex items-center justify-center"
                      >
                        <span class="text-sm font-medium text-primary-600 dark:text-primary-400">
                          {i + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Data Table Responsive */}
              <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h5 class="text-lg font-semibold text-gray-900 dark:text-gray-50">
                    Responsive Data Table
                  </h5>
                </div>
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Name
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Role
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {Array.from({ length: 5 }, (_, i) => (
                        <tr key={i}>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                            User {i + 1}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300">
                              Active
                            </span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            Editor
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button class="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300">
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div class="lg:col-span-4 space-y-6">
              <div class="bg-info-50 dark:bg-info-900/20 p-6 rounded-lg border border-info-200 dark:border-info-800">
                <h5 class="font-semibold text-info-900 dark:text-info-100 mb-4">
                  Responsive Sidebar
                </h5>
                <p class="text-sm text-info-700 dark:text-info-300 mb-4">
                  This sidebar adapts its position and layout based on screen size. 
                  On mobile, it stacks below the main content.
                </p>
                
                <div class="space-y-4">
                  <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-info-200 dark:border-info-700">
                    <h6 class="font-medium text-gray-900 dark:text-gray-100 mb-2">
                      Quick Stats
                    </h6>
                    <div class="space-y-2 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">Views:</span>
                        <span class="font-medium text-gray-900 dark:text-gray-100">2,543</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">Clicks:</span>
                        <span class="font-medium text-gray-900 dark:text-gray-100">1,234</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">CTR:</span>
                        <span class="font-medium text-gray-900 dark:text-gray-100">48.5%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-info-200 dark:border-info-700">
                    <h6 class="font-medium text-gray-900 dark:text-gray-100 mb-3">
                      Recent Activity
                    </h6>
                    <div class="space-y-3">
                      {Array.from({ length: 3 }, (_, i) => (
                        <div key={i} class="flex items-start space-x-3">
                          <div class="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                          <div class="flex-1 min-w-0">
                            <p class="text-sm text-gray-900 dark:text-gray-100">
                              Activity {i + 1}
                            </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                              {i + 1} hour{i !== 0 ? 's' : ''} ago
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="bg-warning-50 dark:bg-warning-900/20 p-6 rounded-lg border border-warning-200 dark:border-warning-800">
                <h5 class="font-semibold text-warning-900 dark:text-warning-100 mb-3">
                  Mobile Layout Tips
                </h5>
                <ul class="text-sm text-warning-700 dark:text-warning-300 space-y-2">
                  <li>• Content stacks vertically on mobile</li>
                  <li>• Tables become horizontally scrollable</li>
                  <li>• Touch targets are properly sized</li>
                  <li>• Typography scales for readability</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div q:slot="footer" class="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Responsive content adapts to any screen size
          </div>
          <div class="flex flex-col-reverse sm:flex-row space-y-2 space-y-reverse sm:space-y-0 sm:space-x-3">
            <button
              onClick$={() => isResponsiveContentOpen.value = false}
              class="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
            >
              Close
            </button>
            <button
              onClick$={() => isResponsiveContentOpen.value = false}
              class="px-6 py-2 text-sm font-medium text-white bg-info-500 hover:bg-info-600 rounded-lg transition-colors duration-200"
            >
              Export Layout
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
});

export default ResponsiveModalSizes;