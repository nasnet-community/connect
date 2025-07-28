import { component$ } from "@builder.io/qwik";

export const APIReference = component$(() => {
  return (
    <div class="space-y-8">
      <section>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">
          API Reference
        </h1>
        <p class="text-lg text-gray-700 dark:text-gray-300">
          Complete reference for all Modal component props and configurations.
        </p>
      </section>

      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-50">Props</h2>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Prop
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Default
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {/* Required Props */}
              <tr class="bg-primary-50 dark:bg-primary-900/20">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-50">
                  isOpen*
                </td>
                <td class="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  boolean
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  -
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Controls whether the modal is visible
                </td>
              </tr>
              <tr class="bg-primary-50 dark:bg-primary-900/20">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-50">
                  onClose*
                </td>
                <td class="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  QRL&lt;() =&gt; void&gt;
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  -
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Handler called when modal is closed
                </td>
              </tr>

              {/* Display Props */}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-50">
                  size
                </td>
                <td class="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  'sm' | 'md' | 'lg' | 'xl' | 'full'
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  'md'
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Modal size variant
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-50">
                  title
                </td>
                <td class="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  string
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  -
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Title text for the modal header
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-50">
                  centered
                </td>
                <td class="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  boolean
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  true
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Whether to center the modal vertically
                </td>
              </tr>

              {/* Behavior Props */}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-50">
                  closeOnBackdropClick
                </td>
                <td class="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  boolean
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  true
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Whether clicking outside closes the modal
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-50">
                  preventScroll
                </td>
                <td class="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  boolean
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  true
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Whether to prevent page scrolling when modal is open
                </td>
              </tr>

              {/* Section Props */}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-50">
                  hasHeader
                </td>
                <td class="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  boolean
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  true
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Whether to show the header section
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-50">
                  hasCloseButton
                </td>
                <td class="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  boolean
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  true
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Whether to show a close button in the header
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-50">
                  hasFooter
                </td>
                <td class="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  boolean
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  false
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Whether to show the footer section
                </td>
              </tr>

              {/* Mobile Props */}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-50">
                  fullscreenOnMobile
                </td>
                <td class="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  boolean
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  false
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Enable fullscreen mode on mobile devices
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-50">
                  mobileBreakpoint
                </td>
                <td class="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  'mobile' | 'tablet'
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  'mobile'
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Breakpoint for fullscreen behavior
                </td>
              </tr>

              {/* Style Props */}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-50">
                  backdropVariant
                </td>
                <td class="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  'light' | 'medium' | 'dark'
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  'medium'
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Backdrop darkness variant
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-50">
                  elevation
                </td>
                <td class="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  'none' | 'low' | 'medium' | 'high' | 'elevated'
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  'elevated'
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Shadow elevation level
                </td>
              </tr>

              {/* Animation Props */}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-50">
                  disableAnimation
                </td>
                <td class="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  boolean
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  false
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Disable animations for reduced motion
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-50">
                  animationVariant
                </td>
                <td class="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  'fade' | 'scale' | 'slide'
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  'scale'
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Animation variant for modal entrance/exit
                </td>
              </tr>

              {/* Accessibility Props */}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-50">
                  ariaDescription
                </td>
                <td class="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  string
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  -
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  ARIA description for the modal
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-50">
                  closeButtonAriaLabel
                </td>
                <td class="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  string
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  'Close modal'
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Custom close button aria-label
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-50">
                  initialFocusElement
                </td>
                <td class="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  string
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  -
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  CSS selector for element to focus when modal opens
                </td>
              </tr>

              {/* Advanced Props */}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-50">
                  onOpenChange
                </td>
                <td class="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  PropFunction&lt;(isOpen: boolean) =&gt; void&gt;
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  -
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Callback when open state changes
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-50">
                  zIndex
                </td>
                <td class="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  number
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  1050
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Z-index for modal stacking
                </td>
              </tr>

              {/* CSS Props */}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-50">
                  class
                </td>
                <td class="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  string
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  -
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Additional CSS classes for the modal container
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-50">
                  backdropClass
                </td>
                <td class="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  string
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  -
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Additional CSS classes for the backdrop
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-50">Slots</h2>
        
        <div class="space-y-4">
          <div class="border border-border-DEFAULT dark:border-border-dark rounded-lg p-4">
            <h3 class="font-mono text-lg text-gray-900 dark:text-gray-50 mb-2">default</h3>
            <p class="text-gray-700 dark:text-gray-300">
              Main content of the modal. Placed in the body section.
            </p>
          </div>
          
          <div class="border border-border-DEFAULT dark:border-border-dark rounded-lg p-4">
            <h3 class="font-mono text-lg text-gray-900 dark:text-gray-50 mb-2">title</h3>
            <p class="text-gray-700 dark:text-gray-300">
              Custom title content. Used when you need more than simple text for the title.
            </p>
          </div>
          
          <div class="border border-border-DEFAULT dark:border-border-dark rounded-lg p-4">
            <h3 class="font-mono text-lg text-gray-900 dark:text-gray-50 mb-2">footer</h3>
            <p class="text-gray-700 dark:text-gray-300">
              Footer content, typically used for action buttons. Only rendered when <code class="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-1 rounded">hasFooter</code> is true.
            </p>
          </div>
        </div>
      </section>

      <section class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-3">
          TypeScript Support
        </h3>
        <pre class="bg-gray-900 text-gray-50 p-4 rounded overflow-x-auto">
          <code>{`import type { ModalProps } from '~/components/Core/Modal';

// All props are fully typed
const modalProps: ModalProps = {
  isOpen: true,
  onClose: $(() => console.log('closed')),
  size: 'lg',
  fullscreenOnMobile: true,
  // ... other props
};`}</code>
        </pre>
      </section>
    </div>
  );
});