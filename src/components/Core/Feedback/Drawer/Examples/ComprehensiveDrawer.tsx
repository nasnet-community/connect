import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { Drawer } from "../Drawer";
import { Button } from "~/components/Core";

/**
 * Comprehensive example showcasing all enhanced Drawer features:
 * - Touch gestures and swipe to close
 * - Responsive sizing with theme utilities
 * - Mobile-optimized animations
 * - Backdrop blur effects
 * - Surface elevation
 * - Safe area support
 */
export const ComprehensiveDrawer = component$(() => {
  const isOpen = useSignal(false);
  
  const settings = useStore({
    placement: "bottom" as "left" | "right" | "top" | "bottom",
    size: "md" as "sm" | "md" | "lg",
    backdropBlur: "medium" as "light" | "medium" | "heavy",
    enableSwipeGestures: true,
    showDragHandle: true,
    mobileAnimation: true,
  });

  const openDrawer = $(() => {
    isOpen.value = true;
  });

  const closeDrawer = $(() => {
    isOpen.value = false;
  });

  return (
    <div class="flex flex-col gap-6">
      {/* Controls */}
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold mb-4">Drawer Configuration</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Placement */}
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Placement
            </label>
            <select
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={settings.placement}
              onChange$={(e) => {
                settings.placement = (e.target as HTMLSelectElement).value as any;
              }}
            >
              <option value="bottom">Bottom</option>
              <option value="right">Right</option>
              <option value="left">Left</option>
              <option value="top">Top</option>
            </select>
          </div>

          {/* Size */}
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Responsive Size
            </label>
            <select
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={settings.size}
              onChange$={(e) => {
                settings.size = (e.target as HTMLSelectElement).value as any;
              }}
            >
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
            </select>
          </div>

          {/* Backdrop Blur */}
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Backdrop Blur
            </label>
            <select
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={settings.backdropBlur}
              onChange$={(e) => {
                settings.backdropBlur = (e.target as HTMLSelectElement).value as any;
              }}
            >
              <option value="light">Light</option>
              <option value="medium">Medium</option>
              <option value="heavy">Heavy</option>
            </select>
          </div>
        </div>

        {/* Toggle Options */}
        <div class="mt-4 space-y-3">
          <label class="flex items-center">
            <input
              type="checkbox"
              checked={settings.enableSwipeGestures}
              onChange$={(e) => {
                settings.enableSwipeGestures = (e.target as HTMLInputElement).checked;
              }}
              class="mr-2"
            />
            <span class="text-sm text-gray-700 dark:text-gray-300">
              Enable swipe gestures
            </span>
          </label>

          <label class="flex items-center">
            <input
              type="checkbox"
              checked={settings.showDragHandle}
              onChange$={(e) => {
                settings.showDragHandle = (e.target as HTMLInputElement).checked;
              }}
              class="mr-2"
            />
            <span class="text-sm text-gray-700 dark:text-gray-300">
              Show drag handle (mobile)
            </span>
          </label>

          <label class="flex items-center">
            <input
              type="checkbox"
              checked={settings.mobileAnimation}
              onChange$={(e) => {
                settings.mobileAnimation = (e.target as HTMLInputElement).checked;
              }}
              class="mr-2"
            />
            <span class="text-sm text-gray-700 dark:text-gray-300">
              Mobile-optimized animations
            </span>
          </label>
        </div>

        <Button
          onClick$={openDrawer}
          variant="primary"
          class="mt-4 w-full md:w-auto"
        >
          Open Enhanced Drawer
        </Button>
      </div>

      {/* Enhanced Drawer */}
      <Drawer
        isOpen={isOpen.value}
        onClose$={closeDrawer}
        placement={settings.placement}
        responsiveSize={settings.size}
        backdropBlur={settings.backdropBlur}
        enableSwipeGestures={settings.enableSwipeGestures}
        showDragHandle={settings.showDragHandle}
        mobileAnimation={settings.mobileAnimation}
        swipeThreshold={0.3}
      >
        <div q:slot="header">
          <h2 class="text-xl font-bold">Enhanced Drawer</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {settings.placement} placement • {settings.size} size • {settings.backdropBlur} blur
          </p>
        </div>

        <div class="p-6 space-y-6">
          {/* Feature Overview */}
          <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
            <h3 class="font-semibold text-lg mb-3 text-blue-900 dark:text-blue-100">
              🚀 Enhanced Features
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <div class={`w-2 h-2 rounded-full ${settings.enableSwipeGestures ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span>Touch gestures</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class={`w-2 h-2 rounded-full ${settings.showDragHandle ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span>Drag handle</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Responsive sizing</span>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Backdrop blur</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Surface elevation</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class={`w-2 h-2 rounded-full ${settings.mobileAnimation ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span>Mobile animations</span>
                </div>
              </div>
            </div>
          </div>

          {/* Touch Gestures Guide */}
          {settings.enableSwipeGestures && (
            <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
              <h4 class="font-medium text-amber-900 dark:text-amber-100 mb-2">
                📱 Touch Gestures
              </h4>
              <p class="text-sm text-amber-800 dark:text-amber-200">
                Swipe {
                  settings.placement === "bottom" ? "down" :
                  settings.placement === "top" ? "up" :
                  settings.placement === "left" ? "left" : "right"
                } to close this drawer on mobile devices.
              </p>
            </div>
          )}

          {/* Theme Integration */}
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 class="font-medium mb-3">🎨 Theme Integration</h4>
            <div class="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p class="text-gray-500 dark:text-gray-400 mb-1">Surface Elevation</p>
                <p class="font-mono">elevated</p>
              </div>
              <div>
                <p class="text-gray-500 dark:text-gray-400 mb-1">Backdrop Blur</p>
                <p class="font-mono">{settings.backdropBlur}</p>
              </div>
              <div>
                <p class="text-gray-500 dark:text-gray-400 mb-1">Safe Areas</p>
                <p class="font-mono">supported</p>
              </div>
              <div>
                <p class="text-gray-500 dark:text-gray-400 mb-1">Animations</p>
                <p class="font-mono">60fps</p>
              </div>
            </div>
          </div>

          {/* Sample Content */}
          <div class="space-y-4">
            <h4 class="font-medium">Sample Content</h4>
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} class="flex items-center gap-3 p-3 bg-white dark:bg-gray-700 rounded-lg">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {i + 1}
                </div>
                <div>
                  <p class="font-medium">Item {i + 1}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Sample content item with description
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div q:slot="footer" class="flex justify-between items-center">
          <span class="text-xs text-gray-500 dark:text-gray-400">
            Enhanced with theme utilities
          </span>
          <div class="flex gap-2">
            <Button
              onClick$={closeDrawer}
              variant="ghost"
              size="sm"
            >
              Cancel
            </Button>
            <Button
              onClick$={closeDrawer}
              variant="primary"
              size="sm"
            >
              Done
            </Button>
          </div>
        </div>
      </Drawer>

      {/* Feature Documentation */}
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold mb-4">Implementation Details</h3>
        
        <div class="space-y-4 text-sm">
          <div>
            <h4 class="font-medium text-green-600 dark:text-green-400 mb-1">✅ Touch Gesture Support</h4>
            <p class="text-gray-600 dark:text-gray-400">
              Native-like swipe gestures with velocity detection and customizable thresholds.
            </p>
          </div>

          <div>
            <h4 class="font-medium text-green-600 dark:text-green-400 mb-1">✅ Responsive Design</h4>
            <p class="text-gray-600 dark:text-gray-400">
              Uses theme utilities for consistent responsive behavior across devices.
            </p>
          </div>

          <div>
            <h4 class="font-medium text-green-600 dark:text-green-400 mb-1">✅ Mobile Optimization</h4>
            <p class="text-gray-600 dark:text-gray-400">
              Bottom sheet behavior on mobile with safe area support and drag handles.
            </p>
          </div>

          <div>
            <h4 class="font-medium text-green-600 dark:text-green-400 mb-1">✅ Theme Integration</h4>
            <p class="text-gray-600 dark:text-gray-400">
              Leverages surface elevation, backdrop blur, and animation utilities from the theme system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ComprehensiveDrawer;