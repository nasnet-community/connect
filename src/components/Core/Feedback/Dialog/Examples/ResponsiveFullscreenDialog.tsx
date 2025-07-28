import { component$, useSignal } from "@builder.io/qwik";
import { Dialog } from "~/components/Core/Feedback/Dialog";
import { DialogBody } from "~/components/Core/Feedback/Dialog/DialogBody";
import { DialogFooter } from "~/components/Core/Feedback/Dialog/DialogFooter";

/**
 * Responsive Fullscreen Dialog examples showcasing mobile-optimized behavior.
 * 
 * Features demonstrated:
 * - Automatic fullscreen on mobile devices
 * - Responsive sizing across breakpoints
 * - Safe area support for notched devices
 * - Touch-optimized interactions
 */
export const ResponsiveFullscreenDialog = component$(() => {
  const isBasicOpen = useSignal(false);
  const isFormOpen = useSignal(false);
  const isScrollableOpen = useSignal(false);
  const selectedSize = useSignal<"sm" | "md" | "lg" | "xl">("md");

  return (
    <div class="space-y-6">
      <div class="mb-4">
        <h3 class="text-lg font-semibold mb-2">Responsive Dialog Behavior</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Dialogs automatically adapt to screen size - fullscreen on mobile, 
          centered modal on larger screens.
        </p>
      </div>

      {/* Size Selector */}
      <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Dialog Size (Desktop Only)
        </label>
        <div class="flex flex-wrap gap-2">
          {(["sm", "md", "lg", "xl"] as const).map((size) => (
            <button
              key={size}
              onClick$={() => selectedSize.value = size}
              class={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                selectedSize.value === size
                  ? "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100"
                  : "bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              } border border-gray-300 dark:border-gray-600`}
            >
              {size.toUpperCase()}
            </button>
          ))}
        </div>
        <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
          📱 Size settings are ignored on mobile - dialogs always go fullscreen
        </p>
      </div>

      {/* Dialog Triggers */}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Basic Responsive Dialog */}
        <button
          onClick$={() => isBasicOpen.value = true}
          class="p-4 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary-400 transition-colors"
        >
          <div class="text-center">
            <span class="text-2xl mb-2 block">📱</span>
            <span class="font-medium block">Basic Responsive</span>
            <span class="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
              Fullscreen on mobile
            </span>
          </div>
        </button>

        {/* Form Dialog */}
        <button
          onClick$={() => isFormOpen.value = true}
          class="p-4 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary-400 transition-colors"
        >
          <div class="text-center">
            <span class="text-2xl mb-2 block">📝</span>
            <span class="font-medium block">Form Dialog</span>
            <span class="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
              Mobile-optimized form
            </span>
          </div>
        </button>

        {/* Scrollable Content */}
        <button
          onClick$={() => isScrollableOpen.value = true}
          class="p-4 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary-400 transition-colors"
        >
          <div class="text-center">
            <span class="text-2xl mb-2 block">📜</span>
            <span class="font-medium block">Long Content</span>
            <span class="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
              Scrollable with safe areas
            </span>
          </div>
        </button>
      </div>

      {/* Basic Responsive Dialog */}
      <Dialog
        isOpen={isBasicOpen.value}
        onClose$={() => isBasicOpen.value = false}
        size={selectedSize.value}
        title="Responsive Dialog"
        fullscreenOnMobile={true}
      >
        <DialogBody>
          <div class="space-y-4">
            <p class="text-gray-600 dark:text-gray-400">
              This dialog automatically becomes fullscreen on mobile devices 
              while maintaining a centered modal appearance on larger screens.
            </p>
            
            <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-2">
                Current View
              </h4>
              <p class="text-sm text-blue-700 dark:text-blue-300">
                <span class="mobile:inline tablet:hidden desktop:hidden">
                  📱 Mobile View - Fullscreen dialog
                </span>
                <span class="mobile:hidden tablet:inline desktop:hidden">
                  📱 Tablet View - Centered modal
                </span>
                <span class="mobile:hidden tablet:hidden desktop:inline">
                  💻 Desktop View - Centered modal with {selectedSize.value} size
                </span>
              </p>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <button
            onClick$={() => isBasicOpen.value = false}
            class="w-full mobile:w-full tablet:w-auto px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            Close Dialog
          </button>
        </DialogFooter>
      </Dialog>

      {/* Form Dialog */}
      <Dialog
        isOpen={isFormOpen.value}
        onClose$={() => isFormOpen.value = false}
        size={selectedSize.value}
        title="Mobile-Optimized Form"
        fullscreenOnMobile={true}
      >
        <DialogBody>
          <form class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                rows={4}
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="Your message..."
              />
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <div class="flex flex-col-reverse mobile:flex-col-reverse tablet:flex-row gap-2 w-full tablet:w-auto">
            <button
              onClick$={() => isFormOpen.value = false}
              class="w-full tablet:w-auto px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick$={() => isFormOpen.value = false}
              class="w-full tablet:w-auto px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
            >
              Submit
            </button>
          </div>
        </DialogFooter>
      </Dialog>

      {/* Scrollable Content Dialog */}
      <Dialog
        isOpen={isScrollableOpen.value}
        onClose$={() => isScrollableOpen.value = false}
        size={selectedSize.value}
        title="Scrollable Content"
        fullscreenOnMobile={true}
      >
        <DialogBody>
          <div class="space-y-4">
            <p class="text-gray-600 dark:text-gray-400">
              This dialog demonstrates proper scrolling behavior with safe area 
              support for devices with notches or gesture bars.
            </p>
            
            {/* Generate long content */}
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Section {i + 1}
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
              </div>
            ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <button
            onClick$={() => isScrollableOpen.value = false}
            class="w-full mobile:w-full tablet:w-auto px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            Close Dialog
          </button>
        </DialogFooter>
      </Dialog>

      {/* Responsive Guidelines */}
      <div class="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
          <span>📐</span>
          Responsive Dialog Guidelines
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div>
            <h5 class="font-medium text-gray-800 dark:text-gray-200 mb-1">Mobile Behavior</h5>
            <ul class="space-y-1">
              <li>• Fullscreen presentation</li>
              <li>• Safe area padding for notches</li>
              <li>• Bottom-anchored animations</li>
              <li>• Touch-optimized spacing</li>
            </ul>
          </div>
          <div>
            <h5 class="font-medium text-gray-800 dark:text-gray-200 mb-1">Desktop Behavior</h5>
            <ul class="space-y-1">
              <li>• Centered modal presentation</li>
              <li>• Configurable sizes (sm, md, lg, xl)</li>
              <li>• Scale-up animation</li>
              <li>• Click-outside to close</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});